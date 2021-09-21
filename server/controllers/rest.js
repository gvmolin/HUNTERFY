const session = require('express-session')
const { searchTable, insertNewUser, getUsers, selectUser, editRank2, addOnDatabase, searchLogs } = require('../models/pgfunctions')
const isAuth = require('../models/is-auth')
pgProgram = require('../models/pgfunctions')

module.exports = app => {
     //GETS----------------------->
    app.get('/', (req, res) => {
        res.render('index.ejs')
        console.log(req.session.isAuth)
    })

    app.get('/app', isAuth, (req, res) => {
        res.render('app.ejs')
        console.log(req.session.isAuth)
    })

    app.get('/manager', (req, res) => {
        res.render('manager.ejs')
    })
    
    app.get('/register', (req, res) => {
        res.render('register.ejs')
    })

    app.get('/searchbyuser', (req, res) => {
        res.render('searchbyuser.ejs')
    })

    app.get('/userlogs', (req,res) => {
        res.render('userlogs.ejs')
    })

    app.get('/allusers', (req, res) => {
        res.render('getallusers.ejs')
    })

    app.get('/searchbyrankone', (req, res) => {
        res.render('searchbyrankone.ejs')
    })

    app.get('/manager/login', (req, res) => {
        res.render('manager-login-page.ejs')
    })

    //POSTS----------------------->
    app.post('/register', (req, res)=>{
        try{
            pgProgram.insertNewUser(req, res)
            
        }
        catch(error){console.log(error)}
    })

	app.post('/app', (req) => {
	    console.log(req.body)
        try{
	        pgProgram.addOnDatabase(req)
        }
        catch(error){
	        console.log(error)
	    }
    })

	app.post('/searchbyuser', async(req,res) => {
        try{
            const userDate = await req.body
            pgProgram.searchTableByUser(userDate.user, userDate.date, res)
        }
            catch(error){
            console.log(error)
	    }
    })
    
    app.post('/', async(req,res) => {
        const resultado = await pgProgram.selectUser(req, res)
        console.log(resultado)
        if(req.body.user !== resultado.username){
            console.log('incorrect user')
        }else{
            if(req.body.pass !== resultado.password){
                console.log('incorrect password')
            }else{
                req.session.isAuth = true
                await pgProgram.add2Log(req.body.user);
                res.send('OK')
            }
        }
    })

    app.post('/editrank', async(req,res) => {
        editRank2(req, res)
    })

    app.post('/userlogs', (req, res) => {
        pgProgram.searchLogs(req, res)
    })

    app.post('/allusers', (req, res) => {
        pgProgram.allUsers(res)
    })

    app.post('/seachbyrankone', async(req, res) => {
        try{
            const rankDate = await req.body
            pgProgram.searchTableByRankOne(rankDate.rank, rankDate.date, res)
        }
            catch(error){
            console.log(error)
	    }
    })
}
//