import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import AddProduct from './AddProduct';
import HomeContainer from './containers/HomeContainer';


const AppContainer = () =>{
 

  return (
    // basename={process.env.PUBLIC_URL} add before push
    <BrowserRouter basename={process.env.PUBLIC_URL} >
      <Routes>
          <Route path='/' element={<HomeContainer/>} />
          <Route path='/add' element={<AddProduct/>}/>
      </Routes>
    </BrowserRouter>
  )
}




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppContainer />);

