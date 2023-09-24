import { useEffect } from 'react'
import axios  from 'axios'
import React from 'react'


const Fondo = () => {
    useEffect(()=>{
        axios('http://localhost:8081/fondo')
        .then(res=>{
            console.log(res.data)
            
            console.log('datos de printer extraidos')
            
        })
        .catch(err=>console.log('error en el axios front: '+err))

    },[])
  return (
    <div>
        <h1>Fondo</h1>
      
    </div>
  )
}

export default Fondo
