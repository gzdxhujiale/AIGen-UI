import { connect } from '@tidbcloud/serverless'

const url = "mysql://PKWo3Jkmr7uUi3n.root:T7oTNQlcWVD44keW@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/test?sslaccept=strict"

async function main() {
    try {
        const connection = connect({ url })
        const res = await connection.execute('SELECT 1 as val')
        console.log(res)
    } catch (e) {
        console.error("DB Error:", e)
    }
}
main()
