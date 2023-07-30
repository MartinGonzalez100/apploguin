
/*const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
*/

/*cambiando type : module en package.json*/

import express from 'express'
import cors from 'cors'
import mysql from 'mysql' 
import md5 from 'md5'

import session from 'express-session'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

//ver ip de pc servidor
import os from 'os'

var networkInterfaces = os.networkInterfaces();




const app = express()

app.use(cors({
  //  origin:["localhost:3000"],
    //methods:["GET","POST"],
    //credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))


const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "",
    database: 'signup',
    port:'3308'
})

app.get('/',(req, res)=>{
   /* db.query(
        'select * from users',
        (err, result)=>{
            if(err) return res.json('error al hacer la consulta')
            return res.json(result)
        }
    )*/
   // console.log(networkInterfaces)
    return res.json(networkInterfaces)
})

//trabajo con providers// trabajando
app.get('/providers',(req, res)=>{
    db.query(
        'select * from providers',
        (err,result)=>{
            if(err) return res.json('error en el select providers')
            return res.json(result)
        }
    )
})

//posible detalle de titulos pero solo si esta en la tabla schema
/*app.get('/tit',(req, res)=>{
    const sql = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = users`;

    db.query(sql, (err, result)=>{
        if(err) return res.json('no se pudo sacar titulos')
        return res.json(result)
    })
})
*/


//trabajo con pssw
app.get('/view', (req, res)=>{
    const sql = "SELECT * FROM users"
    db.query(sql, (err, data)=>{
        //console.log('hola')
        if(err) return res.json(err)
        //return res.json({valid: true, username: req.session.username})
        return res.json(data)
    })
})

app.put('/updatepssw/:id',(req, res)=>{
    console.log('enserver id y pssw: '+ req.params.id+req.body.password)
    db.query(
        `update users set password = ? where id = ${req.params.id}`,
        [md5(req.body.password)],
        (err,result)=>{
            if(err) return res.json('error en update en server')
            return res.json(result)
        }
    )
})

app.put('/update/:id',(req, res)=>{
    console.log(`update en el server :${req.params.id} y los ${req.body.name}`)
    const sql = `update users set username = ?, email=?, password=? where id = ${req.params.id}`
    db.query(sql,[req.body.name, req.body.email, req.body.password],(err, result)=>{
        if(err) return res.json('error en update en servidor')
        return res.json(result)
    })
})

app.delete('/del/:id',(req,res)=>{
    const sql = 'DELETE FROM users WHERE id = ?'
    //console.log('entro al back del2: '+ req.params.id)
    db.query(sql, [req.params.id],(err, result)=>{
        if(err) return res.json({Message:'no se realizo el borrado'})
        return res.json(result)
    })

})

app.post('/signup', (req, res)=>{
    const sql = "INSERT INTO users (`username`,`email`,`password`) VALUES (?)"
    const values = [
        req.body.name,
        req.body.email,
        md5(req.body.password)
    ]
    //console.log("recibido del post :"+req.body.name+req.body.email+req.body.password)
    db.query(sql, [values], (err, result)=>{
        if(err) return res.json({Message: "Error in Node!!"})
        return res.json(result)
    })
})

app.post('/login', (req, res)=>{
    const sql = "SELECT * FROM users where email= ?"
    db.query(sql, [req.body.email], (err, result)=>{
        if(err) return res.json({Message: "error en el db.query"})
        if(result.length > 0) {
            if(result[0].password===md5(req.body.password)){

                req.session.username = result[0].username
    
                return res.json({Exists: true})
            }
        } else {return res.json({Exists: false})}
    })
})




app.listen(8081, ()=>{
    console.log('Servidor Activo!!')
  //  console.log(networkInterfaces);
})