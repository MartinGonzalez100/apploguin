import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import View from './View'
import axios from 'axios'


const Login = () => {

    const [values, setValues]= useState({
        email:'',
        password:''
    })

    const navigate = useNavigate()

    const handleInput = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:8081/login', values)
        .then(res=>{
            if(res.data.Exists){
                navigate('/view')
            }else{
                alert('usuario o contraseña incorrecta')
            }
        })
        .catch(err=>console.log(err))
    }

    const handleChange = (e)=>{
        setValues(prev=>({
            ...prev,
            [e.target.name]:[e.target.value]
        }))
        console.log(values.email)
        console.log(values.password)
    }

   // axios.defaults.withCredentials = true
    
    useEffect(()=>{
        axios.get('http://localhost:8081/')
        .then(res=> console.log(res.data['Wi-Fi'][3].address))
        .catch(err=>console.log(err))
    },[])
  return (
    <>
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-26'>
                <form action="" onSubmit={handleInput}>
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
                        Log in
                    </button>
                    <p>Leer Terminos y condiciones</p>
                    <Link
                        to='/signup' 
                        className='btn btn-default border bg-light w-100 rounded-0'
                        type='submit'>
                        Crear Cuenta
                    </Link>
                </form>
            </div>
        </div>
        
    </>
      
    
  )
}

export default Login
