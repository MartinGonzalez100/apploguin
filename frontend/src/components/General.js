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
    const [updateBalance,setUpdateBalance] = useState({
        initial_amount:1,
        initial_balance:1,
        new_balance:1,
        a_fondo:'000000'
    })
    const [gralName,setGralName]= useState([])
    const [dataProviders,setDataProviders]= useState([])
    const [filter, setFilter]=useState([])
    const [datosEditar, setDatosEditar] = useState([])
    const [actualizar, setActualizar] = useState(1)
    const [saldoFondo, setSaldoFondo] = useState({
        id_fondo:0,
        saldo_fondo:0.0
    })

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
    //*alta de un gasto general, utilizando dataEditar, actualizacion de balance en fondo
    const handleAlta = (registro)=>{
        
        console.log('iniciando Alta en front, name: '+registro.id_providers+' importe_f: '+registro.importe_f)
        console.log('actualizacion de gasto_gral y Fondo.balance')
        console.log('los registros en datosEditar son:')

        console.log(registro)

       axios.post(`http://localhost:8081/gastogralnew`, registro)
        .then(res=>{
            console.log('res del post en el front', res.data)
        })
        .catch(err=>console.log(err))       
        console.log("trabajando alta de gasto_gral!!!!!!")

        axios.put(`http://localhost:8081/fondoupdatebalance/${registro.id_fondo}`, {valor:(registro.saldo_fondo)})
        .then(res=>{
            console.log('fondo actualizado en front')
            console.log(res)            
            setActualizar(actualizar*(-1))
        })
        .catch(err=>console.log(err)) 
        setActualizar(actualizar*(-1))
    }
    //borrar pago
    const handleDeletePay = (registro)=>{
        console.log("registro a eliminar: "+registro.name)
        
        axios.delete(`http://localhost:8081/deletepay/${registro.id}`)
        .then(res=>{
            //se actualiza fondo
            console.log("nuevo fondo: "+registro.saldo_fondo+registro.importe_f)
            //updateBalancedb(1)

            console.log('registro actualizado en front')
            console.log(res)
            //actualiza pagina
        })
        .catch(err=>console.log(err))
        setActualizar(actualizar*(-1))

    }
    //al cambiar campos del formulario ctualizo datosEditar y guardo el valor actual
    const handleChange = (event)=>{
        //si el nombre del campo es a_fondo y se esta tratando de cambiar, no es igual al anterior a_fondo
        if(event.target.name === "a_fondo" & event.target.value !== datosEditar.a_fondo ){
          setUpdateBalance(preBalance=>({
            ...preBalance,
            [event.target.name]: datosEditar.a_fondo
           }))
        }
        //para cualquiero otro campo que no sea a_fondo
        //editar en el cambio tiempo real
        setDatosEditar(prev=>({
            ...prev,
            [event.target.name]: [event.target.value]
        }))
        console.log('handlechange-> name: '+event.target.name+', valor: '+event.target.value)
    }
    
   
    //actualiza el numero de fondo en datosEditar
    const handleChangeNumberFondo = (event)=>{
        //console.log(parseInt(event.target.value)+0)
        setDatosEditar(prev=>({
            ...prev,
            id_fondo: [event.target.value]
        }))
    }
    //desde el nombre de provvedor nos actualiza su id en datosEditar()
    const handleChangeProviders = async (event)=>{
        
        //buscar el id de proveedores
        
        const proveedorEspecifico =  dataProviders.filter(d=>d.name.toLowerCase().includes(event.target.value.toLowerCase()))
        console.log("desde handleChangeProviders el id del prooveedor es: "+proveedorEspecifico[0].idproviders)
        console.log(proveedorEspecifico)   

        //editar en el cambio tiempo real
        await setDatosEditar(prev=>({
            ...prev,
            id_providers: proveedorEspecifico[0].idproviders
        }))
        //console.log('handlechange-> name: '+datosEditar.id_providers+', valor: '+event.target.value)
    }    
    const handleChangeCalculated = (event)=>{
        //editar en el cambio tiempo real
        //console.log("entro a calculado id: "+datosEditar.id_providers)
        const filteredTem = dataProviders.find((provider) => provider.idproviders === parseInt(datosEditar.id_providers, 10));
        //console.log(filteredTem.tem)
        //console.log("datos del event.target.value :"+event.target.value)
        //console.log("datos del updatebalance.initial_amount :"+updateBalance.initial_amount)
        const updateBalanceEnd = updateBalance.initial_amount - event.target.value
        console.log('updatebalance a sumar: '+ updateBalanceEnd)
        console.log('balance actual: '+ updateBalance.initial_balance)
        console.log('balance NUEVO: '+ (updateBalance.initial_balance+updateBalanceEnd))
        setUpdateBalance({
            initial_amount:updateBalance.initial_amount,
            initial_balance:updateBalance.initial_balance,
            new_balance:(updateBalance.initial_balance+updateBalanceEnd)
        })
        
        if([event.target.value]>9999.99){
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
                    -(([event.target.value]/1.21)*filteredTem.suss/100),
                saldo_fondo: updateBalanceEnd+updateBalance.initial_balance
            }))
        }else{
            setDatosEditar(prev=>({
                ...prev,            
                [event.target.name]: [event.target.value],
                desc_tem: 0.0,
                desc_iibb: 0.0,
                desc_iva: 0.0,
                desc_gan: 0.0,
                desc_suss: 0.0,
                importe_pagar: [event.target.value],
                saldo_fondo: updateBalanceEnd+updateBalance.initial_balance
                    
            }))
        }
        
        console.log('valor: '+event.target.value)
    }

    //calculando los datos para el alta, actualiza datosEditar
    const handleChangeCalculatedAlta = (event)=>{
        //editar en el cambio tiempo real
               
        //--se filtra proveedor especifico para tener los descuentosy retenciones del mismo del mismo
        const uneProvider = dataProviders.find((provider) => provider.idproviders === parseInt(datosEditar.id_providers, 10));
     
        //se filtra un fondo especifico para utilizar el balance
        const uneFondo = dataFondo.find((fondo)=>fondo.id=== parseInt(datosEditar.id_fondo,10))
              
        //si el importe facturado es mayor a 9999.99 se calculan retenciones
        if([event.target.value]>9999.99){
            console.log("importe mayores a 9999.99")

            //calculo de retenciones
            const retTem=([event.target.value]*uneProvider.tem/100 < 0.0) ? 0 : [event.target.value]*uneProvider.tem/100
            const retTIibb=([event.target.value]*uneProvider.iibb/100 < 0.0) ? 0 :[event.target.value]*uneProvider.iibb/100
            const retIva=([event.target.value]*uneProvider.iva/100 < 0.0) ? 0 : [event.target.value]*uneProvider.iva/100
            const retGan=(([event.target.value]-67170.0)*uneProvider.gan/100 < 0.0) ? 0 : ([event.target.value]-67170.0)*uneProvider.gan/100
            const retSuss=((([event.target.value]/1.21)*uneProvider.suss/100) < 400.00) ? 0 : ([event.target.value]/1.21)*uneProvider.suss/100
            
            setDatosEditar(prev=>({
                ...prev,            
                [event.target.name]: [event.target.value],
                desc_tem: retTem,
                desc_iibb: retTIibb,
                desc_iva: retIva,
                desc_gan: retGan,
                desc_suss: retSuss,
                importe_pagar: [event.target.value]
                    -retTem
                    -retTIibb
                    -retIva
                    -retGan
                    -retSuss,
                saldo_fondo: uneFondo.balance - [event.target.value]
            }))
        }else{
            console.log("importes inferiores a 9999.99")
            setDatosEditar(prev=>({
                ...prev,            
                [event.target.name]: [event.target.value],
                desc_tem: 0.0,
                desc_iibb: 0.0,
                desc_iva: 0.0,
                desc_gan: 0.0,
                desc_suss: 0.0,
                importe_pagar: [event.target.value],
                saldo_fondo: uneFondo.balance - [event.target.value] 
                    
            }))
        }
        
        //console.log('valor: '+event.target.value)
        //AQUI ALTA EN DB
    }
    const updateBalancedb = (newBackground)=>{
        console.log('updateBalancedb new background :'+ newBackground)
        axios.put(`http://localhost:8081/fondoupdateamounts/${datosEditar.a_fondo}`, {valor:(updateBalance.new_balance)})
        .then(res=>{
            console.log("fondo actualizado en front")
            console.log(res)
        })
        .catch(err=>{
            console.log("error al intentar actualizar balance en fondo front end")
        })
        setActualizar(actualizar*(-1))
    }
    const searchFondo = async (registro)=>{
        console.log('en searchFondo')
        console.log(registro.a_fondo)

        await axios.put('http://localhost:8081/fondofilter', registro)
        .then(res=>{
            console.log('datos de Fondo extraidos con exito')
            console.log(res.data)
            setDataFondo(res.data)            
            
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
    //actualiza datos a editar, son datos de los formularios
    const handleDatos = (data)=>{
        setDatosEditar( prev=>({
            ...prev,
            ...data
        }))
        //console.log(data)
        console.log(datosEditar)
    }
    //actualiza datos a editar, con datos especificos
    const handleDatosDefault = ()=>{
        
        
    }
    //retorna el proveedor de id solicitado en forma de arreglo ejemplo: nameProvider(idbuscado)['businessname']
    const nameProvider = (idprovider)=>{
        if(idprovider){
            const nameProviderId = gralName.find((provider)=>provider.idproviders === idprovider)
            return nameProviderId.businessname
        }
        return ""
    }
    //da formato al tipo moneda
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
        const searchFondo = async ()=>{
            await axios('http://localhost:8081/fondo')
            .then(res=>{
                console.log('sql fondo')
                console.log(res.data)
                setDataFondo(res.data)
            })
            .catch(err=>{
                console.log('error en frontend sql fondo')
            })
        }
        searchFondo()

        const searchViewGralName = async ()=>{
            await axios('http://localhost:8081/viewgralname')
            .then(res=>{
                console.log('sql viewgralname y Filter')
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
                console.log('sql dataGeneral')
                const midata = res.data
                console.log(res.data)
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
                    <button className="btn btn-light " data-bs-toggle="modal" data-bs-target="#staticBackdropAlta" >

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
                        <th scope="col">Tipo</th>
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
                                                setUpdateBalance({initial_amount:d.importe_f, initial_balance:d.saldo_fondo, new_balance:d.saldo_fondo})
                                                //setDatosEditar(d)
                                                searchFondo(d)
                                            }}
                                            className="btn btn-light "
                                            data-bs-toggle="modal" data-bs-target="#staticBackdropEditar">
                                                <AiOutlineEdit />
                                        </button>
                                        {/* Borrar pago */}
                                        <button 
                                            type='button'
                                            onClick={()=>{
                                                handleDatos(d)
                                                /* setUpdateBalance(preUpdateBalance=>({
                                                    ...preUpdateBalance,
                                                    new_balance: datosEditar.saldo_fondo + datosEditar.importe_f
                                                })) */
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
                                <td>{d.type}</td>      
                                <td>{d.name}</td>                            
                                <td>{d.n_factura}</td>                            
                                <td>{new Date(d.f_factura).toLocaleDateString('es-ES', optionsDates)}</td>                            
                                <td>{/*d.importe_f*/currencyFormat(d.importe_f)}</td>                            
                                <td>{/*d.importe_f*/currencyFormat(d.desc_tem+d.desc_iibb+d.desc_iva+d.desc_gan+d.desc_suss)}</td>                            
                                                  
                                <td><strong>{ /*d.importe_pagar*/  currencyFormat(d.importe_pagar)}</strong></td>                            
                                <td>{d.a_fondo}</td>                            
                                <td>{dataFondo.find((f)=>f.id===d.id_fondo).balance} {/*d.saldo_fondo  currencyFormat(d.saldo_fondo)*/ }</td>                            
                                                            
                            </tr>
                        )
                    )}
                </tbody>    
            </table>
        </div>
      {/*modal para alta datos=> pendiente: saldo negativo, carga de alta sin onChange */}
      <div className="modal fade" id="staticBackdropAlta" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Formulario de Alta</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <div className="d-flex flex-column mb-3">  
                    
                    {/* <input name='id_fondo' title='Numero de Libramiento' onChange={handleChange} placeholder='cargar numero libramiento' className='form-control rounded-3 mb-1' type='number'></input>    
                     */}
                    <select id="opcionesFondo" name='id_fondo' title='Seleccionar el numero de libramiento' className='form-control rounded-3 mb-1' onChange={handleChangeNumberFondo} value={datosEditar.id_fondo}>
                        {dataFondo.map((d,i)=>(
                            <option key={i} value={d.id}>{d.id}</option>                                                                      
                        ))}                   
                    </select> 
                    {/* <input name='nameProvider' title='Nombre de proveedor' placeholder='Nombre de Proveedor' className='form-control rounded-3 mb-1'></input> */}
                    <select id="opcionesProveedor" name='id_providers' title='Seleccionar el nombre del proveedor' className='form-control rounded-3 mb-1' onChange={handleChangeProviders}>
                        {dataProviders.map((d,i)=>(
                            <option key={i} value={d.name}>{d.name}</option>                                                                      
                        ))}                   
                    </select>

                    <input name='n_factura' title='Numero de Factura' onChange={handleChange} placeholder='cargar numero factura: numero-numero' className='form-control rounded-3 mb-1'></input>
                    
                    <input title='Fecha de Factura'  name='f_factura' onChange={handleChange} placeholder='cargar fecha de factura' type='date' className='form-control rounded-3 mb-1' ></input>
                    <input title='Importe de Factura'  name='importe_f' placeholder='cargar importe de factura: 10000.00' className='form-control rounded-3 mb-1' onChange={handleChangeCalculatedAlta} style={{ fontWeight: 'bold' }}></input>
                    <input title='Retencion TEM' disabled name='desc_tem' placeholder='cargar retencion tem' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.desc_tem/* currencyFormat(datosEditar.desc_tem) */}></input>
                    <input title='Retencion IIBB' disabled name='desc_iibb' placeholder='cargar retencion iibb' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.desc_iibb/* currencyFormat(datosEditar.desc_iibb) */}></input>
                    <input title='Retencion IVA' disabled name='desc_iva' placeholder='cargar retencion iva' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.desc_iva/* currencyFormat(datosEditar.desc_iva) */}></input>
                    <input title='Retencion GANANCIAS' disabled name='desc_gan' placeholder='cargar retencion ganacia' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.desc_gan/* currencyFormat(datosEditar.desc_gan) */}></input>
                    <input title='Retencion SUSS' disabled name='desc_suss' placeholder='cargar renetcion suss' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.desc_suss/* currencyFormat(datosEditar.desc_suss) */}></input>
                    <input title='Importe a Pagar, Retenciones Descontadas' disabled name='importe_pagar' placeholder='cargar importe a pagar' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.importe_pagar/* currencyFormat(datosEditar.importe_pagar) */}style={{ fontWeight: 'bold' }}></input>
                    <select  id="opcionesFondo" name='a_fondo' title='periodo de fondo: añomes:202401' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.a_fondo}>
                        <option value='202402'>202402</option>
                        <option value='202401'>202401</option>
                        <option value='202312'>202312</option>
                        <option value='202311'>202311</option>
                        <option value='202310'>202310</option>
                        <option value='202309'>202309</option>
                        <option value='202308'>202308</option>                            
                        <option value='202307'>202307</option>                            
                    </select> 
                    <input disabled title='Saldo del Fondo'  name='saldo_fondo' placeholder='cargar saldo de fondo' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.saldo_fondo/*  currencyFormat(datosEditar.saldo_fondo)*/}></input> 
                    
                </div>
                
            </div>
            <div className="modal-footer">
                <button type="button" 
                        className="btn btn-secondary" data-bs-dismiss="modal" 
                        onClick={()=>{setActualizar(actualizar*(-1))
                                      handleDatosDefault()}}>Close</button>
                <button 
                    onClick={()=>{
                        handleAlta(datosEditar)
                        setActualizar(actualizar*(-1))
                        
                        //updateBalancedb(datosEditar.saldo_fondo)
                        //console.log('actualizar datos del fondo')
                    }} 
                    type="button" className="btn btn-info" 
                    data-bs-dismiss="modal">
                        Alta
                </button>
            </div>
            </div>
            </div>
        </div>   
      {/*modal para eliminar datos */}
      <div className="modal fade" id="staticBackdropEliminar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Formulario de Eliminacion</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <h3>Datos del Registro a ELIMINAR!!!!</h3>
                <div className="d-flex flex-column mb-3">
                   
                    <input disabled name='name' title='Nombre' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.name}></input>
                    <input disabled name='n_factura' title='Numero de Factura' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.n_factura}></input>
                    <input disabled name='importe_f' title='Importe de Factura' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.importe_f}></input>
                    
                </div>
                
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button onClick={()=>{handleDeletePay(datosEditar)}} type="button" className="btn btn-danger" data-bs-dismiss="modal">Delete</button>
            </div>
            </div>
        </div>
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
                    {/* <input name='type' title='Fondo o Refuerzo' placeholder='cargar numero factura' className='form-control rounded-3 mb-1' value={datosEditar.type}>
                        
                    </input> */}
                    <select disabled id="opciones" name='type' title='Fondo o Refuerzo' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.type}>
                        <option value='FF'>FF</option>
                        <option value='RF'>RF</option>                            
                    </select>
                    <input disabled name='name' title='Nombre' placeholder='cargar numero factura' className='form-control rounded-3 mb-1' defaultValue={datosEditar.name}></input>
                    <input title='Numero de Factura'  name='n_factura' placeholder='cargar fecha de factura' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.n_factura}></input>
                    <input title='Fecha de Factura'  name='f_factura' placeholder='cargar fecha de factura' className='form-control rounded-3 mb-1' onChange={handleChange} value={formatoFecha(datosEditar.f_factura)}></input>
                    <input title='Importe de Factura'  name='importe_f' placeholder='cargar importe de factura' className='form-control rounded-3 mb-1' onChange={handleChangeCalculated} value={datosEditar.importe_f/*currencyFormat(datosEditar.importe_f)*/}style={{ fontWeight: 'bold' }}></input>
                    <input title='Retencion TEM' disabled name='desc_tem' placeholder='cargar retencion tem' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.desc_tem/* currencyFormat(datosEditar.desc_tem) */}></input>
                    <input title='Retencion IIBB' disabled name='desc_iibb' placeholder='cargar retencion iibb' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.desc_iibb/* currencyFormat(datosEditar.desc_iibb) */}></input>
                    <input title='Retencion IVA' disabled name='desc_iva' placeholder='cargar retencion iva' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.desc_iva/* currencyFormat(datosEditar.desc_iva) */}></input>
                    <input title='Retencion GANANCIAS' disabled name='desc_gan' placeholder='cargar retencion ganacia' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.desc_gan/* currencyFormat(datosEditar.desc_gan) */}></input>
                    <input title='Retencion SUSS' disabled name='desc_suss' placeholder='cargar renetcion suss' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.desc_suss/* currencyFormat(datosEditar.desc_suss) */}></input>
                    <input title='Importe a Pagar, Retenciones Descontadas' disabled name='importe_pagar' placeholder='cargar importe a pagar' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.importe_pagar/* currencyFormat(datosEditar.importe_pagar) */}style={{ fontWeight: 'bold' }}></input>
                    {/* <input title='Periodo de Fondo o Refuerzo'  name='a_fondo' placeholder='cargar mes de fondo' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.a_fondo}></input>
                     */}
                    <select  id="opcionesFondo" name='a_fondo' title='a fondo' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.a_fondo}>
                        <option value='202310'>202310</option>
                        <option value='202309'>202309</option>
                        <option value='202308'>202308</option>                            
                        <option value='202307'>202307</option>                            
                    </select> 
                    <input disabled title='Saldo del Fondo'  name='saldo_fondo' placeholder='cargar saldo de fondo' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.saldo_fondo/*  currencyFormat(datosEditar.saldo_fondo)*/}></input> 
                    
                </div>
                
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button 
                    onClick={()=>{
                        handleEdit(datosEditar)
                        updateBalancedb(datosEditar.saldo_fondo)
                        //console.log('actualizar datos del fondo')
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
                    <input disabled name='id_fondo' placeholder='cargar numero factura' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.id_fondo}></input>
                    <input disabled name='type' placeholder='cargar numero factura' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.type}></input>
                    <input disabled name='name' placeholder='cargar numero factura' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.name}></input>
                    <input disabled name='n_factura' placeholder='cargar numero factura' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.n_factura}></input>
                    <input disabled name='f_factura' placeholder='cargar fecha de factura' className='form-control rounded-3 mb-1' defaultValue={formatoFecha(datosEditar.f_factura)}></input>
                    <input disabled title='Importe Facturado' name='importe_f' placeholder='cargar importe de factura' className='form-control rounded-3 mb-1'  defaultValue={ currencyFormat(datosEditar.importe_f)}style={{ fontWeight: 'bold' }}></input>
                    <input disabled title='TEM' name='desc_tem' placeholder='cargar retencion tem' className='form-control rounded-3 mb-1'  defaultValue={ currencyFormat(datosEditar.desc_tem) }></input>
                    <input disabled title='IIBB' name='desc_iibb' placeholder='cargar retencion iibb' className='form-control rounded-3 mb-1'  defaultValue={ currencyFormat(datosEditar.desc_iibb) }></input>
                    <input disabled title='IVA' name='desc_iva' placeholder='cargar retencion iva' className='form-control rounded-3 mb-1'  defaultValue={currencyFormat(datosEditar.desc_iva) }></input>
                    <input disabled title='GANANCIA' name='desc_gan' placeholder='cargar retencion ganacia' className='form-control rounded-3 mb-1'  defaultValue={ currencyFormat(datosEditar.desc_gan) }></input>
                    <input disabled title='SUSS' name='desc_suss' placeholder='cargar renetcion suss' className='form-control rounded-3 mb-1'  defaultValue={ currencyFormat(datosEditar.desc_suss)}></input>
                    <input disabled title='Importe a Pagar' name='importe_pagar' placeholder='cargar importe a pagar' className='form-control rounded-3 mb-1'  defaultValue={ currencyFormat(datosEditar.importe_pagar)}style={{ fontWeight: 'bold' }}></input>
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
