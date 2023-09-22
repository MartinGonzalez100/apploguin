import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { ImSearch } from "react-icons/im";
import { MdLibraryAdd } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";

const General = () => {
    const [dataGeneral,setDataGeneral] = useState([])
    const [dataFondo,setDataFondo] = useState([])
    const [gralName,setGralName]= useState([])
    const [dataProviders,setDataProviders]= useState([])
    const [filter, setFilter]=useState([])
    const [datosEditar, setDatosEditar] = useState([])
    const [actualizar, setActualizar] = useState(1)

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
    const handleEdit = (registro)=>{
        //editar en base de datos
        //console.log('edit en front: '+registro.id)
        //console.log(registro)
        axios.put(`http://localhost:8081/updategeneral/${registro.id}`, registro)
        .then(res=>{
            console.log('registro actualizado en front')
            console.log(res)
            /*const datosEditados = data.map(d=>{
                if(d.id===registro.id){
                    return registro
                }
                return d
            })
            setDataGeneral(datosEditados)*/
            setActualizar(actualizar*(-1))

        })
        .catch(err=>console.log(err))

    }
    const handleChange = (event)=>{
        //editar en el cambio tiempo real
        setDatosEditar(prev=>({
            ...prev,
            [event.target.name]: [event.target.value]
        }))
        console.log('valor: '+event.target.value)
    }
    const handleChangeCalculated = (event)=>{
        //editar en el cambio tiempo real
        console.log("entro a calculado id: "+datosEditar.id_providers)
        const filteredTem = dataProviders.find((provider) => provider.idproviders === parseInt(datosEditar.id_providers, 10));
        console.log(filteredTem.tem)
        setDatosEditar(prev=>({
            ...prev,
            [event.target.name]: [event.target.value],
            desc_tem: [event.target.value]*filteredTem.tem/100,
            desc_iibb: [event.target.value]*filteredTem.iibb/100,
            desc_iva: [event.target.value]*filteredTem.iva/100,
            desc_gan: ([event.target.value]-67170.0)*filteredTem.gan/100,
            desc_suss: ([event.target.value]/1.21)*filteredTem.suss/100,
            importe_pagar: [event.target.value]
                -([event.target.value]*filteredTem.tem/100)
                -([event.target.value]*filteredTem.iibb/100)
                -([event.target.value]*filteredTem.iva/100)
                -(([event.target.value]-67170.0)*filteredTem.gan/100)
                -(([event.target.value]/1.21)*filteredTem.suss/100)
        }))
        console.log('valor: '+event.target.value)
    }
    const searchFondo = async (registro)=>{
        console.log('en searchFondo')
        console.log(registro.a_fondo)

        await axios.put('http://localhost:8081/fondofilter', registro)
        .then(res=>{
            console.log('datos de Fondo extraidos con exito')
            console.log(res.data)
           //setDataFondo(res.data)            
            
        })
        .catch(err=>console.log('error en el axios front: '+err)) 
        
    }
    const handleSearch = (event)=>{
        console.log('antes del handle: '+event.target.value.toString())
        if(event.target.value.toString().length > 1){
            setFilter(
                filter.filter(d=>d.name.toLowerCase().includes(event.target.value.toLowerCase()))
            )

            //console.log('dentro del handle: '+event.target.value.toString())
           console.log('dentro del handle filter: ')
           console.log(filter)
        }else{
            setFilter(gralName)
        }
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
            const nameProviderId = gralName.find((provider)=>provider.idproviders === idprovider)
            return nameProviderId.businessname
        }
        return ""
    }
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
        const searchViewGralName = async ()=>{

            await axios('http://localhost:8081/viewgralname')
            .then(res=>{
                console.log('sql viewgralname ')
                console.log(res.data)
                setGralName(res.data)
                setFilter(res.data)
                //const nombre = dataProviders.find((p)=>p.idproviders===7)
                //console.log('nombre :'+nombre.name)
            })
            .catch(err=>{
                console.log('error en frontend sql viewgralname')
            })
        }
        searchViewGralName()
        const searchGeneralFilter = async ()=>{

            await axios('http://localhost:8081/general')
            .then(res=>{
                //console.log(res.data)
                const midata = res.data
                setDataGeneral(midata)
                //setFilter(midata)
            })
            .catch(err=>{
                console.log('error en frontend sql general')
            })
        }
        searchGeneralFilter()
        const searchProviders = async ()=>{
            await axios('http://localhost:8081/providers')
                .then(res=>{
                    console.log('sql providers')
                    console.log(res.data)
                    const midata = res.data
                    setDataProviders(midata)                    
                })
                .catch(err=>console.log('error providers desde fornt'))
        }
        searchProviders()
    },[actualizar])
  return (
    <>
        <div className='mt-3'>
        <div className="container input-group mb-3">
                <span className="input-group-text"><ImSearch /></span>
                <div className="form-floating">
                    <input onChange={handleSearch} type="text" className="form-control" id="floatingInputGroup1" placeholder="Username" />
                    <label htmlFor="floatingInputGroup1">Name</label>
                </div>
                <span className="input-group-text">
                    <button className="btn btn-light " data-bs-toggle="modal" data-bs-target="#staticBackdropAlta">

                        <MdLibraryAdd className=''/>
                    </button>
                </span>
            </div>
            
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
                        <th scope="col">Retenciones</th>                        
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
                                                       
                                <td>{d.name}</td>                            
                                <td>{d.n_factura}</td>                            
                                <td>{new Date(d.f_factura).toLocaleDateString('es-ES', optionsDates)}</td>                            
                                <td>{/*d.importe_f*/currencyFormat(d.importe_f)}</td>                            
                                <td>{/*d.importe_f*/currencyFormat(d.desc_tem+d.desc_iibb+d.desc_iva+d.desc_gan+d.desc_suss)}</td>                            
                                {/*<td>{d.desc_tem}</td>                            
                                <td>{d.desc_iibb}</td>                            
                                <td>{d.desc_iva}</td>                            
                                <td>{d.desc_gan}</td>                            
                                        <td>{d.desc_suss}</td>      */}                      
                                <td><strong>{ /*d.importe_pagar*/  currencyFormat(d.importe_pagar)}</strong></td>                            
                                <td>{d.a_fondo}</td>                            
                                <td>{/*d.saldo_fondo/**/  currencyFormat(d.saldo_fondo) }</td>                            
                                                            
                            </tr>
                        )
                    )}
                </tbody>    
            </table>
        </div>
      {/*modal para editar datos */}
      <div className="modal fade" id="staticBackdropEditar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Formulario de Edicion</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <div className="d-flex flex-column mb-3">  
                    <input disabled name='name' placeholder='cargar numero factura' className='form-control rounded-3 mb-1' defaultValue={datosEditar.name}></input>
                    <input  name='n_factura' placeholder='cargar fecha de factura' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.n_factura}></input>
                    <input  name='f_factura' placeholder='cargar fecha de factura' className='form-control rounded-3 mb-1' onChange={handleChange} value={formatoFecha(datosEditar.f_factura)}></input>
                    <input  name='importe_f' placeholder='cargar importe de factura' className='form-control rounded-3 mb-1' onChange={handleChangeCalculated} value={datosEditar.importe_f/*currencyFormat(datosEditar.importe_f)*/}></input>
                    <input disabled name='desc_tem' placeholder='cargar retencion tem' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.desc_tem/* currencyFormat(datosEditar.desc_tem) */}></input>
                    <input disabled name='desc_iibb' placeholder='cargar retencion iibb' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.desc_iibb/* currencyFormat(datosEditar.desc_iibb) */}></input>
                    <input disabled name='desc_iva' placeholder='cargar retencion iva' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.desc_iva/* currencyFormat(datosEditar.desc_iva) */}></input>
                    <input disabled name='desc_gan' placeholder='cargar retencion ganacia' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.desc_gan/* currencyFormat(datosEditar.desc_gan) */}></input>
                    <input disabled name='desc_suss' placeholder='cargar renetcion suss' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.desc_suss/* currencyFormat(datosEditar.desc_suss) */}></input>
                    <input disabled name='importe_pagar' placeholder='cargar importe a pagar' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.importe_pagar/* currencyFormat(datosEditar.importe_pagar) */}></input>
                    <input  name='a_fondo' placeholder='cargar mes de fondo' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.a_fondo}></input>
                    <input  name='saldo_fondo' placeholder='cargar saldo de fondo' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.saldo_fondo/*  currencyFormat(datosEditar.saldo_fondo)*/}></input> 
                </div>
                
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button 
                    onClick={()=>{
                        handleEdit(datosEditar)
                        console.log('actualizar datos del fondo')
                    }} 
                    type="button" className="btn btn-info" 
                    data-bs-dismiss="modal">
                        Edit
                </button>
            </div>
            </div>
            </div>
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
                   
                    <input disabled name='name' placeholder='cargar numero factura' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.name}></input>
                    <input disabled name='n_factura' placeholder='cargar numero factura' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.n_factura}></input>
                    <input disabled name='f_factura' placeholder='cargar fecha de factura' className='form-control rounded-3 mb-1' defaultValue={formatoFecha(datosEditar.f_factura)}></input>
                    <input disabled title='Importe Facturado' name='importe_f' placeholder='cargar importe de factura' className='form-control rounded-3 mb-1'  defaultValue={ currencyFormat(datosEditar.importe_f)}></input>
                    <input disabled title='TEM' name='desc_tem' placeholder='cargar retencion tem' className='form-control rounded-3 mb-1'  defaultValue={ currencyFormat(datosEditar.desc_tem) }></input>
                    <input disabled title='IIBB' name='desc_iibb' placeholder='cargar retencion iibb' className='form-control rounded-3 mb-1'  defaultValue={ currencyFormat(datosEditar.desc_iibb) }></input>
                    <input disabled title='IVA' name='desc_iva' placeholder='cargar retencion iva' className='form-control rounded-3 mb-1'  defaultValue={currencyFormat(datosEditar.desc_iva) }></input>
                    <input disabled title='GANANCIA' name='desc_gan' placeholder='cargar retencion ganacia' className='form-control rounded-3 mb-1'  defaultValue={ currencyFormat(datosEditar.desc_gan) }></input>
                    <input disabled title='SUSS' name='desc_suss' placeholder='cargar renetcion suss' className='form-control rounded-3 mb-1'  defaultValue={ currencyFormat(datosEditar.desc_suss)}></input>
                    <input disabled title='Importe a Pagar' name='importe_pagar' placeholder='cargar importe a pagar' className='form-control rounded-3 mb-1'  defaultValue={ currencyFormat(datosEditar.importe_pagar)}></input>
                    <input disabled title='Periodo de Fondo' name='a_fondo' placeholder='cargar mes de fondo' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.a_fondo}></input>
                    <input disabled title='Saldo del Fondo' name='saldo_fondo' placeholder='cargar saldo de fondo' className='form-control rounded-3 mb-1'  defaultValue={/*datosEditar.saldo_fondo/**/ currencyFormat(datosEditar.saldo_fondo) }></input>
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
