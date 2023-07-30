import React, { useState, useEffect } from "react";
import axios from "axios";
import Edit from "./Edit";
import Title from './Title'
//import { useNavigate } from 'react-router-dom'

const View = () => {
  const [values, setValues] = useState([]);
  const [ids, setIds] = useState("");
  const [datoEditar, setDatoEditar] = useState({
    id:'',
    name: "",
    email: "",
    password: "",
  });
  const [pssw, setPssw]=useState({
    password:'',
    password2:''
  })
  const resetPssw = ()=>{
    setPssw(password=>({
      ...password,
      password:'',
      password2:''}))
  }
  const updateValues = ()=>{}
    
  const handleChange = (event) => {
    setDatoEditar((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
    
  };

  const handleChangePssw = (event)=>{
    setPssw(prev=>({
      ...prev,
      [event.target.name]:[event.target.value]
    }))
    console.log(event.target.name+'-'+ event.target.value)
  }
  const handleEditPssw = ()=>{
    if(validatePssw()){
      console.log('contrasseña validada: '+validatePssw())
      axios.put(`http://localhost:8081/updatepssw/${datoEditar.id}`,pssw)
      .then(res=>{
        console.log('en front end se edito el id '+datoEditar.id)
        //setValues(values)
        //resetPssw()
        //console.log('luego de blanquear contrasena'+pssw.password.toString()+'-'+pssw.password2.toString())
      })
      .catch(err=>console.log(err))
    } else{
      console.log('contraseña no validada')
      console.log('contrasena: '+pssw.password.toString()+'-'+pssw.password2.toString())

    }
  }
  const validatePssw = ()=>{
   // console.log('contraseña pssw: '+pssw.password.toString()+'-'+pssw.password2.toString().length)
    if((pssw.password.toString().length+pssw.password2.toString().length > 5 ) && pssw.password.toString().length > 2 && pssw.password2.toString().length > 2){
      //console.log('validando contraseña: '+(pssw.password.toString().length+pssw.password2.toString().length))
      if(pssw.password.toString() ===pssw.password2.toString()){
        return true
      }else{
        return false
      }
    }else{
      return false
    }
  }

  const handleEdit = ()=>{
    //console.log(datoEditar)
    axios.put(`http://localhost:8081/update/${datoEditar.id}`, datoEditar)
    .then(res=>{      
      setValues(values.map(value=>{
        //console.log('antes del if: '+value.id+datoEditar.id)
        if(value.id === datoEditar.id){
          //console.log('entro al if if: '+value.id+datoEditar.id)
          return {
            ...value,
            id:datoEditar.id,
            username:datoEditar.name,
            email:datoEditar.email,
            password:datoEditar.password
            
          }
        }
        //console.log('no entro en if')
        return value
    }))
      console.log('edit en el server')
      console.log(res)
    })
    .catch(err=>console.log(err))
  }

  const [dato, setDato] = useState({
    name: "",
    email: "",
    password: "",
  });

  //const navigate = useNavigate()

  const handleIds = (data) => {
    setIds(data);
    //console.log('se guardo el id: '+data)
  };

  const handleDelete = (data) => {
    //const ids = data
    //console.log('id en front: '+ids)
    axios
      .delete(`http://localhost:8081/del/${data}`)
      .then((res) => {
        //navigate('/view',{replace:true})
        {
          /*con la siguiente linea logramos actualizar la pagina al momento */
        }
        setValues(values.filter((value) => value.id !== data));
        console.log({ RegistroEliminadoFront: res });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch("http://localhost:8081/view")
      .then((res) => res.json())
      .then((data) => {
        setValues(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
    //funcion para titulos proximamente
    /*axios.get('http://localhost:8081/tit')
        .then(res=>console.log(res))
        .catch(err=>console.log(err))*/
  }, []);
  return (
    <>
      
      <table className="table table-hover container ">
        <thead>
          <tr className="table-dark">
            <th scope="col">Name</th>
            <th scope="col">Email</th>

            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="">
          {values.map((d, i) => (
            <tr key={i} className="table-light">
              <td className="">{d.username}</td>
              <td className="">{d.email}</td>

              <td className="fd-flex justify-content-center align-items-center">
                <button
                  onClick={() => handleIds(d.id)}
                  className="btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdropEliminar"
                >
                  X
                </button>
                <button
                  onClick={() =>
                    setDatoEditar({
                      id: d.id,
                      name: d.username,
                      email: d.email,
                      password: d.password,
                    })
                  }
                  type="button"
                  className="btn btn-info m-1"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Editar
                </button>
                <button
                  onClick={() =>
                    setDatoEditar({
                      id: d.id,
                      name: d.username,
                      email: d.email,
                      password: d.password,
                    })
                  }
                  type="button"
                  className="btn btn-warning"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdropPssw"
                >
                  Pssw
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* modal para editar pssw con id*/}
      <div
        className="modal fade"
        id="staticBackdropPssw"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Formaulario de Actualizacion de Contraseña
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex justify-content-center align-items-center max-vh-100">
                <div className="d-flex flex-column mb-3 vw-100">
                  
                  <input
                    className="form-control rounded-3 mb-2"
                    type="password"
                    name="password"
                    
                    onChange={handleChangePssw}
                  />
                  <input
                    className=" form-control rounded-3"
                    type="password"
                    name="password2"
                    
                    onChange={handleChangePssw}
                  />
                  
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button 
                onClick={handleEditPssw} 
                type="submit" 
                className="btn btn-primary"
                data-bs-dismiss="modal">
                Edit Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* modal para el editar*/}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Formaulario de Edicion
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex justify-content-center align-items-center max-vh-100">
                <div className="d-flex flex-column mb-3 vw-100">
                  
                  <input
                    className="form-control rounded-3 mb-2"
                    type="text"
                    name="name"
                    value={datoEditar.name}
                    onChange={handleChange}
                  />
                  <input
                    className=" form-control rounded-3"
                    type="email"
                    name="email"
                    value={datoEditar.email}
                    onChange={handleChange}
                  />
                  
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button 
                onClick={handleEdit} 
                type="submit" 
                className="btn btn-primary"
                data-bs-dismiss="modal">
                Edit Data
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* trabajando modal para el eliminar*/}
      <div
        className="modal fade"
        id="staticBackdropEliminar"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Eliminacion!!
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h3>¿Eliminar datos?</h3>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={() => handleDelete(ids)}
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Delete Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default View;
