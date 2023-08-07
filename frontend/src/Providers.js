import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ImSearch } from "react-icons/im";
import { MdLibraryAdd } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";

const Providers = () => {

    const [data, setData]=useState([])
    const [filter, setFilter]=useState([])
    const [datosEditar, setDatosEditar] = useState([])
    const handleDatos = (data)=>{
        setDatosEditar( prev=>({
            ...prev,
            ...data
        }))
        //console.log(data)
        console.log(datosEditar)
    }
    const handleChange = (event)=>{
        //editar en el cambio tiempo real
        setDatosEditar(prev=>({
            ...prev,
            [event.target.name]: [event.target.value]
        }))
        console.log('valor: '+event.target.value)
    }
    const handleEdit = (registro)=>{
        //editar en base de datos
        /*console.log('edit en front: '+registro.idprinter)
        console.log(registro)
        axios.put(`http://localhost:8085/updateprinter/${registro.idprinter}`, registro)
        .then(res=>{
            console.log('registro actualizado en front')
            console.log(res)
            setData(data.map(d=>{
                if(d.idprinter===registro.idprinter){
                    return registro
                }
                return d
            }))
        })
        .catch(err=>console.log(err))*/

    }
    const handleSearch = (event)=>{
        //console.log('antes del handle: '+event.target.value.toString())
        if(event.target.value.toString().length > 1){
            setFilter(
                data.filter(d=>d.name.toLowerCase().includes(event.target.value.toLowerCase()))
            )

            //console.log('dentro del handle: '+event.target.value.toString())
           // console.log('dentro del handle filter: ')
            //console.log(data.filter(d=>d.name.toLowerCase().includes(event.target.value.toLowerCase())))
        }else{
            setFilter(data)
        }
    }

    useEffect(()=>{
        axios('http://localhost:8081/providers')
        .then(res=>{
            console.log(res.data)
            const midata = res.data
            setData(midata)
            setFilter(midata)
        })
        .catch(err=>console.log('error providers desde fornt'))
        axios('http://localhost:8081/providerscols')
        .then(res=>{
            const fieldc = res.data.map(field=>field.Field)
            //console.log(res.data)
            console.log(fieldc)
        })
        .catch(err=>console.log('error providerscols desde fornt'))
    },[])
  return (
    <>
        <div className='mt-3'>
            <div className="container input-group mb-3">
                <span className="input-group-text"><ImSearch /></span>
                <div className="form-floating">
                    <input onChange={handleSearch} type="text" className="form-control" id="floatingInputGroup1" placeholder="Username" />
                    <label htmlFor="floatingInputGroup1">Name</label>
                </div>
                <span className="input-group-text"><MdLibraryAdd className=''/></span>
            </div>
            <table className="table table-dark table-striped table-hover">
                <thead>
                    <tr>                    
                        <th scope="col">Accion</th>
                        <th scope="col">id</th>
                        <th scope="col">Name Fantasy</th>
                        <th scope="col">Business Name</th>
                        <th scope="col">Cuil</th>
                        <th scope="col">IIBB</th>
                        <th scope="col">TEM</th>
                        <th scope="col">IVA</th>
                        <th scope="col">GAN</th>
                        <th scope="col">SUSS</th>
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
                                        {<button 
                                            onClick={()=>{
                                                handleDatos(d)
                                                //setDatosEditar(d)
                                                //console.log(d)
                                            }}
                                            className="btn btn-light "
                                            data-bs-toggle="modal" data-bs-target="#staticBackdropEditar">
                                                <AiOutlineEdit />
                                        </button>}
                                </td >                  
                                <td>{d.idproviders}</td>                            
                                <td>{d.name}</td>                            
                                <td>{d.businessname}</td>                            
                                <td>{d.cuit}</td>                            
                                <td>{d.iibb}</td>                            
                                <td>{d.tem}</td>                            
                                <td>{d.iva}</td>                            
                                <td>{d.gan}</td>                            
                                <td>{d.suss}</td>                            
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
                <input name='piso' placeholder='cargar piso' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.piso}></input>
                <input name='oficina' placeholder='cargar oficina' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.oficina}></input>
                <input name='marca' placeholder='cargar marca' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.marca}></input>
                <input name='modelo' placeholder='cargar modelo' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.modelo}></input>
                <input name='toner' placeholder='cargar toner' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.toner }></input>
                <input name='utilidad' placeholder='cargar utilidad' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.utilidad}></input>
                <input name='obs' placeholder='cargar observacion' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.obs}></input>
                <input name='fecha' placeholder='cargar fecha' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.fecha}></input>
                <input name='numeroserie' placeholder='cargar numero serie' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.numeroserie}></input>
                <input name='fechabaja' placeholder='cargar fecha baja' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.fechabaja}></input>
                <input name='direccionip' placeholder='cargar direccion ip' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.direccionip}></input>
                <input name='empresa' placeholder='cargar empresa prestadora' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.empresa}></input>
                </div>
                
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button onClick={()=>{handleEdit(datosEditar)}} type="button" className="btn btn-info" data-bs-dismiss="modal">Edit</button>
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
                    {/*<div className='row'>
                        <label className='col-sm-2 col-form-label'>Piso:</label>
                                    <div className='col-sm-10'>*/}
                            <input name='piso' placeholder='cargar piso' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.piso}></input>
                        {/*</div>
                    </div> */}
                <input name='oficina' placeholder='cargar oficina' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.oficina}></input>
                <input name='marca' placeholder='cargar marca' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.marca}></input>
                <input name='modelo' placeholder='cargar modelo' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.modelo}></input>
                <input name='toner' placeholder='cargar toner' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.toner }></input>
                <input name='utilidad' placeholder='cargar utilidad' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.utilidad}></input>
                <input name='obs' placeholder='cargar observacion' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.obs}></input>
                <input name='fecha' placeholder='cargar fecha' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.fecha}></input>
                <input name='numeroserie' placeholder='cargar numero serie' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.numeroserie}></input>
                <input name='fechabaja' placeholder='cargar fecha baja' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.fechabaja}></input>
                <input name='direccionip' placeholder='cargar direccion ip' className='form-control rounded-3 mb-1' defaultValue={datosEditar.direccionip}></input>
                <input name='empresa' placeholder='cargar empresa prestadora' className='form-control rounded-3 mb-1' defaultValue={datosEditar.empresa}></input>
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

export default Providers
