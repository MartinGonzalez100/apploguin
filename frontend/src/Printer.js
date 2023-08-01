import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";

const Printer = () => {
    const [data, setData] = useState([])
    const [datosEditar, setDatosEditar] = useState({
        idprinter:0,
        piso:'',
        oficina:'',
        marca:'',
        modelo:'',
        toner:'',
        utilidad:'',
        obs:'',
        fecha:'',
        numeroserie:'',
        fechabaja:'',
        direccionip:'',
        empresa:''
    })
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
        console.log('edit en front: '+registro.idprinter)
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
        .catch(err=>console.log(err))

    }
    useEffect(()=>{
        axios('http://localhost:8085/printer')
        .then(res=>{
            console.log(res.data)
            setData(res.data)
            console.log('datos de printer extraidos')
            
        })
        .catch(err=>console.log('error en el axios front: '+err))

    },[])
  return (
    <>
        <div className='container'>
            <h2>Inventario de Impresoras</h2>
                <table className="table table-hover table-striped">
                    <thead>
                        <tr>
                        <th scope="col">Accion</th>
                        <th scope="col">piso</th>
                        <th scope="col">oficina</th>
                        <th scope="col">marca</th>
                        <th scope="col">modelo</th>
                        <th scope="col">empresa</th>
                        <th scope="col">toner</th>
                        <th scope="col">utilidad</th>                    
                        <th scope="col">obs</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        data.map((d,i)=>(
                            <tr key={i}>            
                                <td>
                                    <button 
                                        onClick={()=>{
                                            handleDatos(d)                                            
                                        }}
                                        className="btn btn-light"
                                        data-bs-toggle="modal" data-bs-target="#staticBackdropVer">
                                            <AiOutlineEye />
                                    </button>
                                    <button 
                                        onClick={()=>{
                                            handleDatos(d)
                                            //setDatosEditar(d)
                                            //console.log(d)
                                        }}
                                        className="btn btn-light"
                                        data-bs-toggle="modal" data-bs-target="#staticBackdropEditar">
                                            <AiOutlineEdit />
                                    </button>
                                </td>
                                <td>{d.piso}</td>
                                <td>{d.oficina}</td>                            
                                <td>{d.marca}</td>                            
                                <td>{d.modelo}</td>                            
                                <td>{d.empresa}</td>                            
                                <td>{d.toner}</td>                            
                                <td>{d.utilidad}</td>                            
                                <td>{d.obs}</td>                            
                            </tr>
                        ))}            
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

export default Printer
