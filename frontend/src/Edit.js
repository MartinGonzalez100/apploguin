import React from "react";
import { useState } from "react";

const Edit = () => {

  const handleChange = (event) => {
    setDato((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  const handleEdit = ()=>{
    console.log(dato)
  }

  const [dato, setDato] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <div className='d-flex flex-column mb-3'>
        <h3>Editando</h3>
      <input type="text" name="name" value={dato.name} onChange={handleChange} />
      <input type="email" name="email" value={dato.email} onChange={handleChange} />
      <input type="password" name="password" value={dato.password} onChange={handleChange} />
      <button onClick={handleEdit}>Actualizar</button>
    </div>
  );
};

export default Edit;
