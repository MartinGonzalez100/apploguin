
import './App.css';
import Login from './Login';
import Singup from './Singup';
import Home from './Home';
import View from './View'
import Title from './Title'
import Providers from './Providers'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Title />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Singup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/view' element={<View />} />
        <Route path='/home' element={<Home />} />
        <Route path='/title' element={<Title />} />
        <Route path='/providers' element={<Providers />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
