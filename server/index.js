const customExpress = require("./config/customExpress")
const dbClient = require("./database/connectionPG")
const tables = require('./database/pgTables')
require('dotenv/config');
const app = customExpress()

dbClient.connect(error => {
    if(error){
        console.log(console.log(error))
    }
    else{
        console.log('conectado no banco de dados <-----------')
        //tables.init(dbClient)
    }
})
app.listen(process.env.PORT, ()=> console.log(`servidor rodando na porta ${process.env.PORT} <-----------`))////////////


