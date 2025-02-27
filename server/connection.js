// imports
const mysql = require('mysql')
require('dotenv').config()

mysqlInfo = {
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    multipleStatements: true
}
// connection set up
const connection = mysql.createConnection(mysqlInfo)
connection.connect()
module.exports = connection