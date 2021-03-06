require('dotenv/config');
const Client = require('pg').Client
const dbClient = new Client({
    dialect:'postgres',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    define:{
        timestamps:true,
        underscored:true,
    },
})

module.exports = dbClient
