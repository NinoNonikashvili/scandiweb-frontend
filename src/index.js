import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './Home';
import AddProduct from './AddProduct';




const AppContainer = () =>{
/*1. fetch data from server 
  2. check if data has skus, save them in object and pass to addProduct as props
  3. pass whole data to home to display as props
*/
// const [skus, setSkus] = useState(
//     {
//     dvd: '123abc',
//     book: '',
//     furniture: ''
//   }
//   );


// useEffect(()=>{ 
//   const fetchData = async (endpoint, setter)=>{
//     try{
//       const response = await fetch(endpoint,
//       {
//         mode: 'cors'
//       });
//       const fetchedData = await response.json();
//       setter(fetchedData);

//   }catch(error){
//     console.log('error: '+ error);}
//   }

//   fetchData('http://localhost:2020/', setData);
//   // fetchData('http://localhost:2020/skus', setSkus);
 

// }, []);

// console.log('sku list:');
// console.log(skus);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/add' element={<AddProduct/>}/>
      </Routes>
    </BrowserRouter>
  )
}




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppContainer />);

