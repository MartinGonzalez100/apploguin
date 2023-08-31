import React, { useEffect, useState } from 'react'
import axios from 'axios'

//import { ImSearch } from "react-icons/im";
//import { MdLibraryAdd } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";

const General = () => {
    const [dataGeneral,setDataGeneral] = useState([])
    const [dataProviders,setDataProviders]= useState([])
    const [filter, setFilter]=useState([])
    const [datosEditar, setDatosEditar] = useState([])

    // Formatea la fecha en el formato deseado (día/mes/año)
    const optionsDates = { day: 'numeric', month: 'numeric', year: 'numeric' };

    const handleDatos = (data)=>{
        setDatosEditar( prev=>({
            ...prev,
            ...data
        }))
        //console.log(data)
        console.log(datosEditar)
    }
    const nameProvider = (idprovider)=>{
        const nameProviderId = dataProviders.find((provider)=>provider.idproviders === idprovider)
        return nameProviderId
    }
    const currencyFormat = (floatMoney)=>{
        return floatMoney.toLocaleString('es-AR', {
            style: 'currency',
            currency: 'ARS', // Moneda argentina (pesos argentinos)
            minimumFractionDigits: 2, // Número mínimo de decimales
          });
    }

    useEffect(()=>{
        axios('http://localhost:8081/general')
        .then(res=>{
            console.log(res.data)
            const midata = res.data
            setDataGeneral(midata)
            setFilter(midata)
        })
        .catch(err=>{
            console.log('error en frontend sql general')
        })
        axios('http://localhost:8081/providers')
        .then(res=>{
            console.log(res.data)
            setDataProviders(res.data)
            //const nombre = dataProviders.find((p)=>p.idproviders===7)
            //console.log('nombre :'+nombre.name)
        })
        .catch(err=>{
            console.log('error en frontend sql providers')
        })
    },[])
  return (
    <>
        <div className='mt-3'>
            
            <table className="table table-dark table-striped table-hover">
                <thead>
                    <tr>                    
                        <th scope="col">ACCION</th>
                        <th scope="col">id</th>
                        
                        <th scope="col">id Prov</th>
                        <th scope="col">Nombre</th>

                        <th scope="col">N FACT</th>
                        <th scope="col">Fecha</th>                        
                        <th scope="col">Importe</th>                        
                        {/*<th scope="col">TEM</th>
                        <th scope="col">IIBB</th>
                        <th scope="col">IVA</th>
                        <th scope="col">GAN</th>
  <th scope="col">SUSS</th>*/}
                        <th scope="col">A Liquidar</th>
                        <th scope="col">Fondo</th>
                        <th scope="col">Saldo</th>
                        
                    </tr>
                </thead>
                <tbody className='table-light'>
                    {filter.map((d,i)=>(
                            <tr key={i}>  
                                <td className=" ">
                                        <button 
                                            onClick={()=>{
                                                handleDatos(d)                                            
                                            }}
                                            className="btn btn-light "
                                            data-bs-toggle="modal" data-bs-target="#staticBackdropVer">
                                                <AiOutlineEye className=''/>
                                        </button>
                                        <button 
                                            onClick={()=>{
                                                handleDatos(d)
                                                //setDatosEditar(d)
                                                //console.log(d)
                                            }}
                                            className="btn btn-light "
                                            data-bs-toggle="modal" data-bs-target="#staticBackdropEditar">
                                                <AiOutlineEdit />
                                        </button>
                                        <button 
                                            onClick={()=>{
                                                handleDatos(d)
                                                //setDatosEditar(d)
                                                //console.log(d)
                                            }}
                                            className="btn btn-light "
                                            data-bs-toggle="modal" data-bs-target="#staticBackdropEliminar">
                                                <AiOutlineDelete />
                                        </button>
                                </td >                  
                                <td>{d.id}</td>                            
                                <td>{d.id_providers}</td>                            
                                <td>{nameProvider(d.id_providers)['businessname']}</td>                            
                                <td>{d.n_factura}</td>                            
                                <td>{new Date(d.f_factura).toLocaleDateString('es-ES', optionsDates)}</td>                            
                                <td>{currencyFormat(d.importe_f)}</td>                            
                                {/*<td>{d.desc_tem}</td>                            
                                <td>{d.desc_iibb}</td>                            
                                <td>{d.desc_iva}</td>                            
                                <td>{d.desc_gan}</td>                            
                                        <td>{d.desc_suss}</td>      */}                      
                                <td>{ currencyFormat(d.importe_pagar)}</td>                            
                                <td>{d.a_fondo}</td>                            
                                <td>{d.saldo_fondo}</td>                            
                                                            
                            </tr>
                        )
                    )}
                </tbody>    
            </table>
        </div>
      
    </>
  )
}

export default General
