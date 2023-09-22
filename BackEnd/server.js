
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

//const PORT_MYSQL = 3308  //casa
const PORT_MYSQL = 3306   //trabajo

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
    port:`${PORT_MYSQL}`//casa
    //port:'3306'//trabajo

})

app.get('/',(req, res)=>{
   /*db.query(
        'select * from users',
        (err, result)=>{
            if(err) return res.json('error al hacer la consulta')
            return res.json(result)
        }
    )*/
    //console.log(networkInterfaces)
    return res.json(networkInterfaces)
})

//trabajando con fondo
app.get('/fondo',(req, res)=>{
    db.query(
        'select * from fondo order by id desc',
        (err, result)=>{
            if(err) return res.json('error en sql backend')
            return res.json(result)
        }
    )
})
app.put('/fondofilter',(req, res)=>{
    console.log('el fonso a filtrar es ')
    console.log(req.body)
     db.query(
        'select * from fondo where period = ? order by id desc',
        [req.body.a_fondo],
        (err, result)=>{
            if(err) return res.json('error en sql backend')
            return res.json(result)
        }
    ) 
})

//trabajando con viewgralname
app.get('/viewgralname',(req, res)=>{
    db.query(
        'select * from viewgralname order by id desc',
        (err, result)=>{
            if(err) return res.json('error en sql backend')
            return res.json(result)
        }
    )
})
//trabajando con general
app.put('/updategeneral/:id',(req, res)=>{
    console.log("llega al backend id: "+req.params.id
        +" name: "+req.body.name
        +" importe_f: "+req.body.importe_f
        +" importe?pagar: "+req.body.importe_pagar
        +" saldo: "+req.body.saldo_fondo)
    db.query(
        `update gasto_gral set
            id_providers=?,
            n_factura=?,        
            f_factura=?,        
            importe_f=?,        
            desc_tem=?,  
            desc_iibb=?,      
            desc_iva=?,        
            desc_gan=?,        
            desc_suss=?,        
            importe_pagar=?,        
            a_fondo=?,        
            saldo_fondo=? where id=${req.params.id}        
        `,
        [
            req.body.id_providers,
            req.body.n_factura,
            req.body.f_factura,
            req.body.importe_f,
            req.body.desc_tem,
            req.body.desc_iibb,
            req.body.desc_iva,
            req.body.desc_gan,
            req.body.desc_suss,
            req.body.importe_pagar,
            req.body.a_fondo,
            req.body.saldo_fondo            
        ],
        (err,result)=>{
            if(err) return res.json("error al actualizar gasto_gral en el backend")
            return res.json(result)
        }

    )
})

app.get('/general',(req, res)=>{
    db.query(
        'select * from gasto_gral order by id desc',
        (err, result)=>{
            if(err) return res.json('error en sql backend')
            return res.json(result)
        }
    )
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
app.delete('/providerdelete/:id',(req,res)=>{
    console.log('llega al backend id: '+req.params.id)
    db.query(
        `delete from providers where idproviders = ${req.params.id}`,
        (err, result)=>{
            if(err) return res.json('error en backend al borrar providers')
            return res.json(result)
        }
    )
})
app.put('/updateprovider/:id',(req,res)=>{
    console.log("llega al backend id: "+req.params.id+" name: "+req.body.name)
    db.query(
        `update providers set
            name=?,
            businessname=?,        
            cuit=?,        
            tem=?,        
            iibb=?,        
            iva=?,        
            gan=?,        
            suss=?,        
            cellphone=?,        
            address=?,        
            cbu=?,        
            factura=?,        
            dateupdate=? where idproviders=${req.params.id}        
        `,
        [
            req.body.name,
            req.body.businessname,
            req.body.cuit,
            req.body.tem,
            req.body.iibb,
            req.body.iva,
            req.body.gan,
            req.body.suss,
            req.body.cellphone,
            req.body.address,
            req.body.cbu,
            req.body.factura,
            req.body.dateupdate,
        ],
        (err,result)=>{
            if(err) return res.json("error al actualizar providers en el backend")
            return res.json(result)
        }

    )
})
app.post('/providernew',(req, res)=>{
    console.log("datos en el backend: "+req.body.name+"-"+req.body.businessname)
    console.log(req.body)
    
    const values = [
        req.body.name,
        req.body.businessname,
        req.body.cuit,
        req.body.tem,
        req.body.iibb,
        req.body.iva,
        req.body.gan,
        req.body.suss,
        req.body.cellphone,
        req.body.address,
        req.body.cbu,
        req.body.factura,
        req.body.dateupdate         
    ]
    db.query(
        "insert into providers (`name`,`businessname`,`cuit`,`tem`,`iibb`,`iva`,`gan`,`suss`,`cellphone`,`address`,`cbu`,`factura`,`dateupdate`) values (?)", 
        [values],
        (err, result)=>{
            if(err) return res.json('error a dar el alta al los proveedores backend')
            return res.json(result)
        }
    )
})
app.get('/providerscols',(req,res)=>{
    db.query(
        'SHOW COLUMNS from providers',
        (err, result)=>{
            if(err) return res.json('error al listar columnas en back')
            return res.json(result)
        }
    )
})

{/*aqui estalo copiado de printers, uniendo proyectos*/ }

app.get('/printer', (req, res)=>{
    db.query(
        "select * from printer",
        (err, result)=>{
            if(err) return res.json('error al consultar printer en el server')
            return res.json(result)
        }
    )
})
app.put('/updateprinter/:id',(req,res)=>{
    console.log('LLEGAN datos en back: '+req.params.id+req.body.piso+ req.body.oficina)
    db.query(
        `UPDATE printer SET 
            piso= ?, 
            oficina=?,
            marca=?,
            modelo=?,
            toner=?,
            utilidad=?,
            obs=?,
            fecha=?,
            numeroserie=?,
            fechabaja=?,
            direccionip=?,
            empresa=? 
            WHERE idprinter=${req.params.id}`,
        [
            req.body.piso,
            req.body.oficina,
            req.body.marca,
            req.body.modelo,
            req.body.toner,
            req.body.utilidad,
            req.body.obs,
            req.body.fecha,
            req.body.numeroserie,
            req.body.fechabaja,
            req.body.direccionip,
            req.body.empresa
        ],
        (err, result)=>{
            if(err) return res.json('error al actualizar back')
            return res.json({result, dc:req.params.id+req.body.piso+ req.body.oficina})
        }

    )
})



{/*hasta aqui estalo copiado de printers, uniendo proyectos*/ }

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
    console.log('en el back: '+req.body.email)
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