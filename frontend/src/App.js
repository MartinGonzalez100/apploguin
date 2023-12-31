
import './App.css';
import Login from './Login';
import Singup from './Singup';
import Home from './Home';
import View from './View'
import Title from './Title'
import Providers from './Providers'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Printer from './Printer';
import General from './General';
import Fondo from './Fondo';


function App() {
  return (
    <BrowserRouter>
      {/*<Title />*/}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Singup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/view' element={<View />} />
        <Route path='/home' element={<Home />} />
        <Route path='/title' element={<Title />} />
        <Route path='/providers' element={<Providers />} />
        <Route path='/printer' element={<Printer />} />
        <Route path='/general' element={<General />} />
        <Route path='/fondo' element={<Fondo />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
