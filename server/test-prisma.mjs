import { PrismaClient } from '@prisma/client'
import { PrismaTiDBCloud } from '@tidbcloud/prisma-adapter'

const url = "mysql://PKWo3Jkmr7uUi3n.root:T7oTNQlcWVD44keW@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/test?sslaccept=strict"

async function main() {
    try {
        const adapter = new PrismaTiDBCloud({ url })
        const prisma = new PrismaClient({ adapter })
        const count = await prisma.pageConfig.count()
        console.log("Count:", count)
    } catch (e) {
        console.error("Prisma Error:", e)
        console.error("Prisma Error details:", String(e))
    }
}
main()
