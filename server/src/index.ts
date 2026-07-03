import { Hono } from 'hono'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { PrismaClient } from '@prisma/client'
import { PrismaTiDBCloud } from '@tidbcloud/prisma-adapter'
import { cors } from 'hono/cors'

type Bindings = {
  DATABASE_URL: string
  CLERK_PUBLISHABLE_KEY: string
  CLERK_SECRET_KEY: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.onError((err, c) => {
  console.error('Global Error:', err)
  return c.json({ error: String(err), message: err.message, stack: err.stack }, 500)
})

app.use('*', cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['POST', 'GET', 'OPTIONS', 'DELETE', 'PUT'],
  maxAge: 600,
}))

// Clerk 鉴权中间件
app.use('*', async (c, next) => {
  const authHandler = clerkMiddleware({
    secretKey: c.env.CLERK_SECRET_KEY,
    publishableKey: c.env.CLERK_PUBLISHABLE_KEY
  })
  return authHandler(c, next)
})

app.use('*', async (c, next) => {
    const auth = getAuth(c)
    console.log('Path:', c.req.path)
    console.log('Auth Header:', c.req.header('authorization') ? 'Present' : 'Missing')
    console.log('User ID:', auth?.userId)
    await next()
})

// 获取带有 Edge Driver 的 Prisma Client
const getPrisma = (env: Bindings) => {
  const adapter = new PrismaTiDBCloud({ url: env.DATABASE_URL })
  return new PrismaClient({ adapter })
}

// ----------------------------------------
// Health Check
// ----------------------------------------
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', message: 'Hono Backend is running on Cloudflare Workers' })
})

app.get('/api/db-test', async (c) => {
  try {
    const prisma = getPrisma(c.env)
    const count = await prisma.pageConfig.count()
    return c.json({ status: 'ok', count })
  } catch (err: any) {
    console.error('DB Test Error:', err)
    return c.json({ error: JSON.stringify(err, Object.getOwnPropertyNames(err)) }, 500)
  }
})

// ----------------------------------------
// AI Chat APIs
// ----------------------------------------
app.get('/api/ai/sessions', async (c) => {
  const auth = getAuth(c)
  if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)
  
  const prisma = getPrisma(c.env)
  try {
    const sessions = await prisma.aiChatSession.findMany({
      where: { user_id: auth.userId },
      orderBy: { updated_at: 'desc' }
    })
    return c.json({ data: sessions })
  } catch (error: any) {
    return c.json({ error: error.message }, 500)
  }
})

app.post('/api/ai/sessions', async (c) => {
  const auth = getAuth(c)
  if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)
  
  const { title } = await c.req.json()
  const prisma = getPrisma(c.env)
  try {
    const session = await prisma.aiChatSession.create({
      data: { user_id: auth.userId, title: title || 'New Chat' }
    })
    return c.json({ data: session })
  } catch (error: any) {
    return c.json({ error: error.message }, 500)
  }
})

app.delete('/api/ai/sessions/:id', async (c) => {
  const auth = getAuth(c)
  if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)
  
  const sessionId = c.req.param('id')
  const prisma = getPrisma(c.env)
  try {
    await prisma.aiChatSession.delete({
      where: { id: sessionId, user_id: auth.userId }
    })
    return c.json({ success: true })
  } catch (error: any) {
    console.error('API Error DELETE /api/ai/sessions/:id:', error)
    return c.json({ error: error.message }, 500)
  }
})

app.get('/api/ai/sessions/:sessionId/messages', async (c) => {
  const auth = getAuth(c)
  if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)
  
  const sessionId = c.req.param('sessionId')
  const prisma = getPrisma(c.env)
  try {
    const session = await prisma.aiChatSession.findUnique({ where: { id: sessionId, user_id: auth.userId } })
    if (!session) return c.json({ error: 'Session not found' }, 404)

    const messages = await prisma.aiChatMessage.findMany({
      where: { session_id: sessionId },
      orderBy: { created_at: 'asc' }
    })
    return c.json({ data: messages })
  } catch (error: any) {
    return c.json({ error: error.message }, 500)
  }
})

app.post('/api/ai/messages', async (c) => {
  const auth = getAuth(c)
  if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)
  
  const { session_id, role, content, config_data, status } = await c.req.json()
  const prisma = getPrisma(c.env)
  try {
    const session = await prisma.aiChatSession.findUnique({ where: { id: session_id, user_id: auth.userId } })
    if (!session) return c.json({ error: 'Session not found' }, 404)

    const message = await prisma.aiChatMessage.create({
      data: {
        session_id, role, content, config_data, status
      }
    })
    
    // Update session timestamp
    await prisma.aiChatSession.update({
      where: { id: session_id },
      data: { updated_at: new Date() }
    })

    return c.json({ data: message })
  } catch (error: any) {
    return c.json({ error: error.message }, 500)
  }
})

// ----------------------------------------
// Config APIs
// ----------------------------------------
app.get('/api/configs/team', async (c) => {
  const auth = getAuth(c)
  if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)
  
  const prisma = getPrisma(c.env)
  try {
    const config = await prisma.teamConfig.findUnique({ where: { user_id: auth.userId } })
    return c.json({ data: config })
  } catch (error: any) {
    console.error('API Error /team:', error)
    return c.json({ error: JSON.stringify(error, Object.getOwnPropertyNames(error)) }, 500)
  }
})

app.post('/api/configs/team', async (c) => {
  const auth = getAuth(c)
  if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)
  
  const { team_config } = await c.req.json()
  const prisma = getPrisma(c.env)
  try {
    const config = await prisma.teamConfig.upsert({
      where: { user_id: auth.userId },
      update: { team_config },
      create: { user_id: auth.userId, team_config }
    })
    return c.json({ data: config })
  } catch (error: any) {
    return c.json({ error: error.message }, 500)
  }
})

app.get('/api/configs/menu', async (c) => {
  const auth = getAuth(c)
  if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)
  
  const prisma = getPrisma(c.env)
  try {
    const config = await prisma.menuConfig.findUnique({ where: { user_id: auth.userId } })
    return c.json({ data: config })
  } catch (error: any) {
    return c.json({ error: error.message }, 500)
  }
})

app.post('/api/configs/menu', async (c) => {
  const auth = getAuth(c)
  if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)
  
  const { menu_config } = await c.req.json()
  const prisma = getPrisma(c.env)
  try {
    const config = await prisma.menuConfig.upsert({
      where: { user_id: auth.userId },
      update: { menu_config },
      create: { user_id: auth.userId, menu_config }
    })
    return c.json({ data: config })
  } catch (error: any) {
    return c.json({ error: error.message }, 500)
  }
})

app.get('/api/configs/pages', async (c) => {
  const auth = getAuth(c)
  if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)
  
  const prisma = getPrisma(c.env)
  try {
    const configs = await prisma.pageConfig.findMany({ where: { user_id: auth.userId } })
    return c.json({ data: configs })
  } catch (error: any) {
    console.error('API Error GET /pages:', error)
    return c.json({ error: JSON.stringify(error, Object.getOwnPropertyNames(error)) }, 500)
  }
})

app.post('/api/configs/pages/sync', async (c) => {
  const auth = getAuth(c)
  if (!auth?.userId) return c.json({ error: 'Unauthorized' }, 401)
  
  const { upsert = [], delete: delTitles = [], deleteAll = false } = await c.req.json()
  const prisma = getPrisma(c.env)
  try {
    // Delete All
    if (deleteAll) {
        await prisma.pageConfig.deleteMany({
            where: { user_id: auth.userId }
        })
    }
    // Delete Specific
    if (delTitles.length > 0) {
        await prisma.pageConfig.deleteMany({
            where: { user_id: auth.userId, title: { in: delTitles } }
        })
    }
    // Upsert
    for (const item of upsert) {
        // Prisma doesn't have multiple field unique constraints in our schema?
        // Wait, schema.prisma only has @id on id. We need to findFirst by user_id & title.
        const existing = await prisma.pageConfig.findFirst({
            where: { user_id: auth.userId, title: item.title }
        })
        if (existing) {
            await prisma.pageConfig.update({
                where: { id: existing.id },
                data: { page_config: item.page_config }
            })
        } else {
            await prisma.pageConfig.create({
                data: { user_id: auth.userId, title: item.title, page_config: item.page_config }
            })
        }
    }
    return c.json({ success: true })
  } catch (error: any) {
    console.error('API Error POST /pages/sync:', error)
    return c.json({ error: JSON.stringify(error, Object.getOwnPropertyNames(error)) }, 500)
  }
})

export default app
