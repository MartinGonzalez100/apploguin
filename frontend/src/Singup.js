import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Singup = () => {
  
  const [values, setValues] = useState({
    email:'',
    name:'',
    password:''
  })

  const navigate = useNavigate()

  const handleSubmit =  (e)=>{
      e.preventDefault()
      console.log('los values: '+values.name+'-'+values.email+'-'+values.password)
      axios.post('http://localhost:8081/signup', values)
      .then(res => {
          console.log(res)
          console.log('los values: '+values.name+'-'+values.email+'-'+values.password)
        alert('Usuario cargado con exito!!')
        navigate('/')
    })
    .catch(err => console.log(err))
  }

  const handleChange = (event)=>{
    setValues(prev => ({
      ...prev,
      [event.target.name]: [event.target.value]
    }))
  }

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-26'>
            <form action="" onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='email'>
                        <strong>
                            Name
                        </strong>
                    </label>
                    <input 
                        onChange={handleChange}
                        name='name'
                        type='text'
                        placeholder='Ingresar Name'
                        className='form-control rounded-0' />
                </div>
                <div className='mb-3'>
                    <label htmlFor='email'>
                        <strong>
                            Email
                        </strong>
                    </label>
                    <input 
                        onChange={handleChange}
                        name='email'
                        type='email'
                        placeholder='Ingresar Email'
                        className='form-control rounded-0' />
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'>
                        <strong>
                            Password
                        </strong>
                    </label>
                    <input
                        onChange={handleChange} 
                        name='password'
                        type='password'
                        placeholder='Ingresar Password'
                        className='form-control rounded-0' />
                </div>
                <button                    
                    type='submit'
                    className='btn btn-success w-100 rounded-0 '>
                    Crear Cuenta
                </button>
                <p>Leer Terminos y condiciones</p>
                <Link
                    to={'/'} 
                    className='btn btn-default border bg-light w-100 rounded-0'
                    type='submit'>
                        Log In
                </Link>
            </form>
        </div>
    </div>
  )
}

export default Singup
