import { useEffect, useState } from 'react'
import axios  from 'axios'
import React from 'react'


const Fondo = () => {
    const [dataFondo,setDataFondo] = useState([])

    // Formatea la fecha en el formato deseado (día/mes/año)
    const optionsDates = { day: 'numeric', month: 'numeric', year: 'numeric' };
    // Formatea tipo moneda
    const currencyFormat = (floatMoney)=>{
      if(floatMoney){
          return floatMoney.toLocaleString('es-AR', {
              style: 'decimal',
              currency: 'ARS', // Moneda argentina (pesos argentinos)
              minimumFractionDigits: 2, // Número mínimo de decimales
            });

      }
      return ""
  }
    useEffect(()=>{
        axios('http://localhost:8081/fondo')
        .then(res=>{
            console.log(res.data)
            setDataFondo(res.data)
            console.log('datos de printer extraidos')
            
        })
        .catch(err=>console.log('error en el axios front: '+err))

    },[])
  return (
    <>
      <div className='mt-3 container'>
        
            
            <table className="table table-dark table-striped table-hover">
                <thead>
                    <tr>                    
                        {/* <th scope="col">ACCION</th> */}
                        <th scope="col">Num</th>
                        
                        <th scope="col">Tipo</th>
                        <th scope="col">Periodo</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Importe</th>
                        <th scope="col">Fondo</th>                        
                        <th scope="col">Seguridad</th>                        
                        <th scope="col">Coop</th>                        
                        <th scope="col">Vianda</th>                        
                        <th scope="col">Otros</th>                        
                        <th scope="col">Balance</th>                        
                        
                    </tr>
                </thead>
                <tbody className='table-light'>
                    {dataFondo.map((d,i)=>(
                            <tr key={i}>  
                                {/* <td className=" ">
                                        <button 
                                            type='button'
                                            onClick={()=>{
                                                handleDatos(d)                                            
                                            }}
                                            className="btn btn-light "
                                            data-bs-toggle="modal" data-bs-target="#staticBackdropVer">
                                                <AiOutlineEye className=''/>
                                        </button>
                                        <button 
                                            type='button'
                                            onClick={()=>{
                                                handleDatos(d)
                                                setUpdateBalance({initial_amount:d.importe_f, initial_balance:d.saldo_fondo, new_balance:d.saldo_fondo})
                                                //setDatosEditar(d)
                                                searchFondo(d)
                                            }}
                                            className="btn btn-light "
                                            data-bs-toggle="modal" data-bs-target="#staticBackdropEditar">
                                                <AiOutlineEdit />
                                        </button>
                                        <button 
                                            type='button'
                                            onClick={()=>{
                                                handleDatos(d)
                                                setUpdateBalance(preUpdateBalance=>({
                                                    ...preUpdateBalance,
                                                    new_balance: datosEditar.saldo_fondo + datosEditar.importe_f
                                                }))
                                                //setDatosEditar(d)
                                                //console.log(d)
                                            }}
                                            className="btn btn-light "
                                            data-bs-toggle="modal" data-bs-target="#staticBackdropEliminar">
                                                <AiOutlineDelete />
                                        </button>
                                </td >  */}                 
                                <td>{d.id}</td>                            
                                <td>{d.type}</td>                            
                                <td>{d.period}</td>    
                                {/* <td>{d.date}</td>  */}
                                <td>{new Date(d.date).toLocaleDateString('es-ES', optionsDates)}</td>                           
                                <td>{currencyFormat(d.importe)}</td>                            
                                <td>{currencyFormat(d.operating_fund)}</td>                            
                                <td>{currencyFormat(d.security)}</td>                            
                                <td>{currencyFormat(d.cooperative)}</td>                            
                                <td>{currencyFormat(d.meal)}</td>                            
                                <td>{currencyFormat(d.others)}</td>                            
                                <td>{currencyFormat(d.balance)}</td>                            
                                {/* <td>{new Date(d.date).toLocaleDateString('es-ES', optionsDates)}</td>                            
                                                      */}                                                    
                            </tr>
                        )
                    )}
                </tbody>    
            </table>
        </div>
    </>
  )
}

export default Fondo
