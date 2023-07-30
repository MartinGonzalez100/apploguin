import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {
  const [name, setName]= useState('')
  axios.defaults.withCredentials = true
    useEffect(()=>{
        axios.get('http://localhost:8081/view')
        .then(res=>  {
          console.log(res.data.username)
          console.log(res)
          setName(res.data.username)
          })
        .catch(err=> console.log(err))

    }, [])
  return (
    <div>
      <h2>Hola {name}</h2>
    </div>
  )
}

export default Home
