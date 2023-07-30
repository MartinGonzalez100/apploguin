import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ImSearch } from "react-icons/im";
import { MdLibraryAdd } from "react-icons/md";

const Providers = () => {

    const [data, setData]=useState([])
    const [filter, setFilter]=useState([])

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
    <div className=''>
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
  )
}

export default Providers
