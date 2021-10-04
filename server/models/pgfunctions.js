const dbClient = require('../database/connectionPG')

class pgProgram{
    addOnDatabase(user, req, res){
        var terreno = req.body	    
        let insertQuery = 
        `
        INSERT INTO public."2021-data"(
            username, 
            parcelid, 
            gisimg, 
            gislink, 
            floodzoneimg, 
            floodzonetext, 
            mapsimg, 
            mapslink, 
            streetviewimg, 
            marketvalue, 
            latitude, 
            longitude, 
            acres, 
            adress, 
            n1adress, 
            n2adress, 
            n3adress, 
            n4adress, 
            rank1, 
            obs1,
	        taxowned,
            state,
            county
            )

            VALUES (
            '${terreno.userinfo[0].username}', 
            '${terreno.parcelid}', 
            '${terreno.gis[0].gisimg}', 
            '${terreno.gis[0].gislink}', 
            '${terreno.floodzone[0].floodzoneimg}', 
            '${terreno.floodzone[0].floodzonetext}', 
            '${terreno.maps[0].mapsimg}', 
            '${terreno.maps[0].mapslink}', 
            '${terreno.streetview[0].streetviewimg}', 
            '${terreno.marketvalue}', 
            '${terreno.latitude}', 
            '${terreno.longitude}', 
            '${terreno.acres}', 
            '${terreno.adress}', 
            '${terreno.adressn1}', 
            '${terreno.adressn2}', 
            '${terreno.adressn3}', 
            '${terreno.adressn4}', 
            '${terreno.rank}', 
            '${terreno.obs}',
	        '${terreno.taxowned}',
            '${terreno.state}',
            '${terreno.county}'
            );
        `

        dbClient.query(insertQuery, (err, result)=>{
            if(!err){
                console.log(terreno.userinfo[0].username, 'Insertion was successful. Parcel:', terreno.parcelid)
                res.send({"message":"insert"})
            }
            else{ console.log(terreno.userinfo[0].username, err.message, terreno.parcelid) }
        })
        dbClient.end;
    }

    editDB(user, req, res){   
        var newInfo = req.body	    
        var date = new Date()
        var yyyymmdd = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`
        var editQuery = `
            UPDATE public."2021-data"
	        SET 
            username2 = '${newInfo.userinfo[0].username}',
            dateandtime2 = '${date}',
            date2 = ${yyyymmdd},
            gisimg='${newInfo.gis[0].gisimg}',
            gislink='${newInfo.gis[0].gislink}', 
            floodzoneimg='${newInfo.floodzone[0].floodzoneimg}', 
            floodzonetext='${newInfo.floodzone[0].floodzonetext}', 
            mapsimg='${newInfo.maps[0].mapsimg}', 
            mapslink='${newInfo.maps[0].mapslink}', 
            streetviewimg='${newInfo.streetview[0].streetview}', 
            marketvalue='${newInfo.marketvalue}', 
            latitude='${newInfo.longitude}', 
            longitude='${newInfo.longitude}', 
            acres='${newInfo.acres}', 
            adress='${newInfo.adress}', 
            n1adress='${newInfo.adressn1}', 
            n2adress='${newInfo.adressn2}', 
            n3adress='${newInfo.adressn3}', 
            n4adress='${newInfo.adressn4}', 
            rank1='${newInfo.rank}', 
            obs1='${newInfo.obs}',  
            taxowned='${newInfo.taxowned}'
    
	        WHERE parcelid = '${newInfo.parcelid}';
        `
        dbClient.query(editQuery, (err, result)=>{
            if(!err){
                console.log(newInfo.userinfo[0].username, 'Edit was successful. Parcel:', newInfo.parcelid)
                res.send({"message":"edit"})
            }
            else{ console.log(user, 'erro durante edit', newInfo.parcelid, err) }
        })
        dbClient.end
    }

    async searchTableByUser(user, date, res){
        const searchQuery = `
		SELECT parcelid, gisimg, gislink, floodzoneimg, floodzonetext, mapsimg, mapslink, streetviewimg, marketvalue, latitude, longitude, acres, adress, n1adress, n2adress, n3adress, n4adress, rank1, obs1, rank2, userrank2, obs2, rank3, userrank3, obs3, item_id, dateandtime, taxowned, county, state, username
	    FROM public."2021-data"
		WHERE "username" = '${user}' AND date = '${date}'
        OR "username2" = '${user}' AND date2 = '${date}';
	    `
        try {
            const result = await dbClient.query(searchQuery)
            dbClient.end;
            return result
        }
        catch(err){console.log(err)
        }
    }

    searchTableByRank(rank, date, ranktype, res){
        const searchQuery = `
		SELECT parcelid, gisimg, gislink, floodzoneimg, floodzonetext, mapsimg, mapslink, streetviewimg, marketvalue, latitude, longitude, acres, adress, n1adress, n2adress, n3adress, n4adress, rank1, obs1, rank2, userrank2, obs2, rank3, userrank3, obs3, item_id, dateandtime, taxowned, county, state, username
	    FROM public."2021-data"
		WHERE "${ranktype}" = '${rank}' AND date = '${date}';
	    `
        dbClient.query(searchQuery, (error, result) => {
            if(error){
                console.log(error)
            }
            else{		    
	            res.send(result.rows)  
            }
            
        })
        dbClient.end
    }

    async searchByCounty(county, res){
        const searchQuery = `
		SELECT parcelid, gisimg, gislink, floodzoneimg, floodzonetext, mapsimg, mapslink, streetviewimg, marketvalue, latitude, longitude, acres, adress, n1adress, n2adress, n3adress, n4adress, rank1, obs1, rank2, userrank2, obs2, rank3, userrank3, obs3, item_id, dateandtime, taxowned, county, state, username
	    FROM public."2021-data"
		WHERE "county" = '${county}';
	    `
        try{
            const result = await dbClient.query(searchQuery)
            dbClient.end;
            return result.rows
        }
        catch(err){console.log(err)}
        dbClient.end
    }

    async searchByChecked(){
        const searchQuery = `
		SELECT parcelid, gisimg, gislink, floodzoneimg, floodzonetext, mapsimg, mapslink, streetviewimg, marketvalue, latitude, longitude, acres, adress, n1adress, n2adress, n3adress, n4adress, rank1, obs1, rank2, userrank2, obs2, rank3, userrank3, obs3, item_id, dateandtime, taxowned, county, state, username
	    FROM public."2021-data"
		WHERE "buyopt" = 'true';
	    `
        try{
            const result = await dbClient.query(searchQuery)
            dbClient.end;
            return result
        }
        catch(err){console.log(err)}
        dbClient.end
    }

    async searchByParcel(parcel, res){
        const searchQuery = `
		SELECT parcelid,
        gisimg, 
        gislink, 
        floodzoneimg, 
        floodzonetext, 
        mapsimg, 
        mapslink, 
        streetviewimg, 
        marketvalue, 
        latitude, 
        longitude, 
        acres, 
        adress, 
        n1adress, 
        n2adress, 
        n3adress, 
        n4adress, 
        rank1, 
        obs1, 
        rank2, 
        userrank2, 
        obs2, 
        rank3, 
        userrank3, 
        obs3, 
        item_id, 
        dateandtime, 
        taxowned, 
        user, 
        state, 
        county,
        username
	    FROM public."2021-data"
		WHERE "parcelid" = '${parcel}';
	    `
        try {
            const result = await dbClient.query(searchQuery)
            dbClient.end;
            return result.rows[0]
        }
        catch(err){console.log(err)
        }
        dbClient.end
    }

    insertNewUser(req, res){
        var user = req.body	    
        let insertQuery = 
        `
        INSERT INTO public.userinfo(
            username, password, supervisor)
            VALUES ('${user.newusername}', '${user.newpassword}', '${user.supervisor}');
        `

        dbClient.query(insertQuery, (err, result)=>{
            if(!err){
                console.log('Insertion was successful')
                res.send(result.rows)
            }
            else{ console.log(err.message) }
        })
        dbClient.end;
    }

    getUsers(req, res){
        const sql = 'select * from public.userinfo'
        dbClient.query(sql, (error, result) => {
            if(error){
                console.log(error)
            }
            else{
                res.send(result.rows)
            }
        })   
        dbClient.end;
    }
    
    async selectUser(req, res){
        var user = req.body	    
        let insertQuery = `
		SELECT username, password
	    FROM public.userinfo
	    WHERE username = '${user.user}';
        `
        try {
            const result = await dbClient.query(insertQuery)
            dbClient.end;
            return result.rows[0]
        }
        catch(err){console.log(err)
        }
    }

    async selectManager(req, res){
        var user = req.body	    
        let insertQuery = `
		SELECT username, password
	    FROM public.managerinfo
	    WHERE username = '${user.user}';
        `
        try {
            const result = await dbClient.query(insertQuery)
            dbClient.end;
            return result.rows[0]
        }
        catch(err){console.log(err)}
    }

    editRank2(req, res){
        var rank2 = req.body
        let insertQuery = `
            UPDATE public."2021-data"
            SET rank2='${rank2.rank2}', userrank2='${rank2.userrank2}', obs2='${rank2.obs2}'
            WHERE parcelid='${rank2.parcelid}';  
        `
        dbClient.query(insertQuery, (err, result)=>{
            if(!err){
            console.log("rank2 updated on DB")
            }
            else{console.log(err.message)}
        })
    }

    editRank3(req, res){
        var rank3 = req.body
        console.log(rank3.buyopt)
        let insertQuery = `
            UPDATE public."2021-data"
            SET rank3='${rank3.rank3}', userrank3='${rank3.userrank3}', obs3='${rank3.obs3}', buyopt='${rank3.buyopt}'
            WHERE parcelid='${rank3.parcelid}';  
        `
        dbClient.query(insertQuery, (err, result)=>{
            if(!err){
            console.log("rank3 updated on DB")
            res.send()
            }
            else{console.log(err.message)}
        })
    }

    async add2Log(user, usertype, logtype){   
        let insertQuery = `
        INSERT INTO public.userlogs(
            username, usertype, logtype)
            VALUES ('${user}', '${usertype}', '${logtype}');
        `
        dbClient.query(insertQuery, (err, result)=>{
            if(!err){
                console.log(user, 'log added', logtype)
            }
            else{ console.log(err.message) }
        })
        dbClient.end;
    }

    searchLogs(user, req, res){
        const searchQuery = `
        SELECT username, usertype, logtype, "timestamp", log_id
        FROM public.userlogs
        WHERE "username" = '${user}'
        ORDER BY log_id DESC;
	    `
        dbClient.query(searchQuery, (error, result) => {
            if(error){
                console.log(error)
            }
            else{   
	            res.send(result.rows)
                console.log('usuarios buscados')  
            }
        })
        dbClient.end
    }

    allUsers(res){
        const searchQuery = `
            SELECT username, password, supervisor, creationdate
            FROM public.userinfo;  
	    `
        dbClient.query(searchQuery, (error, result) => {
            if(error){
                console.log(error)
            }
            else{		    
	            res.send(result.rows)
                console.log('todos os usuarios buscados')  
            }
        })
        dbClient.end
    }

    async searchForMetrics(user){
        const searchQuery = `
        SELECT parcelid, rank1, rank2, rank3, dateandtime, username
        FROM public."2021-data"
        WHERE "username"= '${user}' OR "username2"='${user}';
        `
        try{
            const result = await dbClient.query(searchQuery)
            dbClient.end;
            return result.rows
        }
        catch(err){console.log(err)}
    }
}

module.exports = new pgProgram
