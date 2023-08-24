import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ImSearch } from "react-icons/im";
import { MdLibraryAdd } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";

const Providers = () => {

    const [data, setData]=useState([])
    const [filter, setFilter]=useState([])
    const [datosEditar, setDatosEditar] = useState([])
    const [actualizar, setActualizar] = useState(1)
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
    const handleNew = (registro)=>{
        console.log('alta en front: '+registro.name)
        console.log(registro)
        axios.post('http://localhost:8081/providernew', registro)
        .then(res=>{

            console.log(res)
            console.log('registro de alta en front')
            setActualizar(actualizar*(-1))
        })
        .catch(err=>{
            console.log(err)
        })

    }
    const handleDelete = (registro)=>{
        console.log('en handleDelete eliminacion id :'+registro.idproviders)
        axios.delete(`http://localhost:8081/providerdelete/${registro.idproviders}`)
        .then(res=>{
            console.log('se elimino registro en el front id: '+registro.idproviders)
            setActualizar(actualizar*(-1))
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const handleEdit = (registro)=>{
        //editar en base de datos
        console.log('edit en front: '+registro.idproviders)
        console.log(registro)
        axios.put(`http://localhost:8081/updateprovider/${registro.idproviders}`, registro)
        .then(res=>{
            console.log('registro actualizado en front')
            console.log(res)
            const datosEditados = data.map(d=>{
                if(d.idproviders===registro.idproviders){
                    return registro
                }
                return d
            })
            setData(datosEditados)
            setActualizar(actualizar*(-1))

        })
        .catch(err=>console.log(err))

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
                        <th scope="col">FACTURA</th>
                        
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
                                <td>{d.idproviders}</td>                            
                                <td>{d.name}</td>                            
                                <td>{d.businessname}</td>                            
                                <td>{d.cuit}</td>                            
                                <td>{d.iibb}</td>                            
                                <td>{d.tem}</td>                            
                                <td>{d.iva}</td>                            
                                <td>{d.gan}</td>                            
                                <td>{d.suss}</td>                            
                                <td>{d.factura}</td>                            
                                                            
                            </tr>
                        )
                    )}
                </tbody>    
            </table>
        </div>
        {/*modal para ver datos */}
        <div className="modal fade" id="staticBackdropEliminar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Formulario de Eliminacion</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <h3>ELIMINAR este registro!!!!</h3>
                <div className="d-flex flex-column mb-3">
                   
                    <input name='name' placeholder='cargar piso' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.name}></input>
                    <input name='businessnme' placeholder='cargar oficina' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.businessname}></input>
                    <input name='cuit' placeholder='cargar marca' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.cuit}></input>
                    
                </div>
                
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button onClick={()=>{handleDelete(datosEditar)}} type="button" className="btn btn-danger" data-bs-dismiss="modal">Delete</button>
            </div>
            </div>
        </div>
        </div>
        {/*modal para altas datos */}
        <div className="modal fade" id="staticBackdropAlta" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Formulario de Alta</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <div className="d-flex flex-column mb-3">           
                <input name='name' placeholder='cargar name' className='form-control rounded-3 mb-1' onChange={handleChange} ></input>
                <input name='businessname' placeholder='cargar businessname' className='form-control rounded-3 mb-1' onChange={handleChange} ></input>
                <input name='cuit' placeholder='cargar cuit' className='form-control rounded-3 mb-1' onChange={handleChange} ></input>
                <input name='iibb' placeholder='cargar iibb' className='form-control rounded-3 mb-1' onChange={handleChange} ></input>
                <input name='tem' placeholder='cargar tem' className='form-control rounded-3 mb-1' onChange={handleChange} ></input>
                <input name='iva' placeholder='cargar iva' className='form-control rounded-3 mb-1' onChange={handleChange} ></input>
                <input name='gan' placeholder='cargar gan' className='form-control rounded-3 mb-1' onChange={handleChange} ></input>
                <input name='suss' placeholder='cargar suss' className='form-control rounded-3 mb-1' onChange={handleChange} ></input>
                <input name='factura' placeholder='cargar factura' className='form-control rounded-3 mb-1' onChange={handleChange}></input>
                <input name='cellphone' placeholder='cargar cellphone' className='form-control rounded-3 mb-1' onChange={handleChange} ></input>
                <input name='address' placeholder='cargar address' className='form-control rounded-3 mb-1' onChange={handleChange} ></input>
                <input name='cbu' placeholder='cargar cbu' className='form-control rounded-3 mb-1' onChange={handleChange} ></input>
                <input name='dataupdate' placeholder='cargar dataupdate' className='form-control rounded-3 mb-1' onChange={handleChange} ></input>
                </div>
                
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button onClick={()=>{handleNew(datosEditar)}} type="button" className="btn btn-info" data-bs-dismiss="modal">Alta</button>
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
                <input name='name' placeholder='cargar piso' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.name}></input>
                <input name='businessname' placeholder='cargar oficina' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.businessname}></input>
                <input name='cuit' placeholder='cargar marca' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.cuit}></input>
                <input name='iibb' placeholder='cargar modelo' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.iibb}></input>
                <input name='tem' placeholder='cargar toner' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.tem }></input>
                <input name='iva' placeholder='cargar utilidad' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.iva}></input>
                <input name='gan' placeholder='cargar observacion' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.gan}></input>
                <input name='suss' placeholder='cargar fecha' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.suss}></input>
                <input name='factura' placeholder='cargar fecha' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.factura}></input>
                <input name='cellphone' placeholder='cargar numero serie' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.cellphone}></input>
                <input name='address' placeholder='cargar fecha baja' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.address}></input>
                <input name='cbu' placeholder='cargar direccion ip' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.cbu}></input>
                <input name='dataupdate' placeholder='cargar empresa prestadora' className='form-control rounded-3 mb-1' onChange={handleChange} value={datosEditar.dateupdate}></input>
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
                   
                    <input name='name' placeholder='cargar piso' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.name}></input>
                    <input name='businessnme' placeholder='cargar oficina' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.businessname}></input>
                    <input name='cuit' placeholder='cargar marca' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.cuit}></input>
                    <input name='iibb' placeholder='cargar modelo' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.iibb}></input>
                    <input name='tem' placeholder='cargar toner' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.tem }></input>
                    <input name='iva' placeholder='cargar utilidad' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.iva}></input>
                    <input name='gan' placeholder='cargar observacion' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.gan}></input>
                    <input name='suss' placeholder='cargar fecha' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.suss}></input>
                    <input name='factura' placeholder='cargar fecha' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.factura}></input>
                    <input name='celphone' placeholder='cargar numero serie' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.cellphone}></input>
                    <input name='address' placeholder='cargar fecha baja' className='form-control rounded-3 mb-1'  defaultValue={datosEditar.address}></input>
                    <input name='cbu' placeholder='cargar direccion ip' className='form-control rounded-3 mb-1' defaultValue={datosEditar.cbu}></input>
                    <input name='dateupdate' placeholder='cargar empresa prestadora' className='form-control rounded-3 mb-1' defaultValue={datosEditar.dateupdate}></input>
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
