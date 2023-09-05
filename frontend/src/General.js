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
    //retorna fecha en formato dd/mm/aaaa
    const formatoFecha = (fechaSinFormato)=>{
        if(fechaSinFormato){
            const optionsDates = { day: 'numeric', month: 'numeric', year: 'numeric' };
            return new Date(fechaSinFormato).toLocaleDateString('es-ES', optionsDates)
        }
        return ""
    }

    const handleDatos = (data)=>{
        setDatosEditar( prev=>({
            ...prev,
            ...data
        }))
        //console.log(data)
        console.log(datosEditar)
    }
    //retorna el proveedor de id solicitado en forma de arreglo ejemplo: nameProvider(idbuscado)['businessname']
    const nameProvider = (idprovider)=>{
        if(idprovider){
            const nameProviderId = dataProviders.find((provider)=>provider.idproviders === idprovider)
            return nameProviderId.businessname
        }
        return ""
    }
    const currencyFormat = (floatMoney)=>{
        if(floatMoney){
            return floatMoney.toLocaleString('es-AR', {
                style: 'currency',
                currency: 'ARS', // Moneda argentina (pesos argentinos)
                minimumFractionDigits: 2, // Número mínimo de decimales
              });

        }
        return ""
    }

    useEffect(()=>{
        const searchProviders = async ()=>{

            await axios('http://localhost:8081/providers')
            .then(res=>{
                console.log(res.data)
                setDataProviders(res.data)
                //const nombre = dataProviders.find((p)=>p.idproviders===7)
                //console.log('nombre :'+nombre.name)
            })
            .catch(err=>{
                console.log('error en frontend sql providers')
            })
        }
        searchProviders()
        const searchGeneralFilter = async ()=>{

            await axios('http://localhost:8081/general')
            .then(res=>{
                console.log(res.data)
                const midata = res.data
                setDataGeneral(midata)
                setFilter(midata)
            })
            .catch(err=>{
                console.log('error en frontend sql general')
            })
        }
        searchGeneralFilter()
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
                                                       
                                <td>{nameProvider(d.id_providers)}</td>                            
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
      {/*modal para ver datos */}
      <div className="modal fade" id="staticBackdropVer" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Formulario de Informacion</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <div className="d-flex flex-column mb-3">
                   
                    <input name='businessname' placeholder='cargar numero factura' className='form-control rounded-3 mb-1'  defaultValue={nameProvider(datosEditar.id_providers)}></input>
                    <input name='n_factura' placeholder='cargar numero factura' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.n_factura}></input>
                    <input name='f_factura' placeholder='cargar fecha de factura' className='form-control rounded-3 mb-1' defaultValue={formatoFecha(datosEditar.f_factura)}></input>
                    <input name='importe_f' placeholder='cargar importe de factura' className='form-control rounded-3 mb-1'  defaultValue={currencyFormat(datosEditar.importe_f)}></input>
                    <input name='desc_tem' placeholder='cargar retencion tem' className='form-control rounded-3 mb-1'  defaultValue={currencyFormat(datosEditar.desc_tem)}></input>
                    <input name='desc_iibb' placeholder='cargar retencion iibb' className='form-control rounded-3 mb-1'  defaultValue={currencyFormat(datosEditar.desc_iibb)}></input>
                    <input name='desc_iva' placeholder='cargar retencion iva' className='form-control rounded-3 mb-1'  defaultValue={currencyFormat(datosEditar.desc_iva)}></input>
                    <input name='desc_gan' placeholder='cargar retencion ganacia' className='form-control rounded-3 mb-1'  defaultValue={currencyFormat(datosEditar.desc_gan)}></input>
                    <input name='desc_suss' placeholder='cargar renetcion suss' className='form-control rounded-3 mb-1'  defaultValue={currencyFormat(datosEditar.desc_suss)}></input>
                    <input name='importe_pagar' placeholder='cargar importe a pagar' className='form-control rounded-3 mb-1'  defaultValue={currencyFormat(datosEditar.importe_pagar)}></input>
                    <input name='a_fondo' placeholder='cargar mes de fondo' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.a_fondo}></input>
                    <input name='saldo_fondo' placeholder='cargar saldo de fondo' className='form-control rounded-3 mb-1'  defaultValue={currencyFormat(datosEditar.saldo_fondo)}></input>
                </div>
                
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                
            </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default General
