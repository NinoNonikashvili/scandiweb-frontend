import React, {useState, useEffect} from "react";
import {json, Link} from 'react-router-dom';
import Card from './Card';
import Header from './Header';
import Footer from './Footer';
import { cardsWrapper } from "./styles/cardsWrapper";


const Home = (props) =>{
/* 1.display header(pass data for btn names and destination as props) and footer
   2.receive data as props
   3.map over it, pass to create card component and pass data to it.
*/
    const [checkedCards, setCheckedCard] = useState([]);
    console.log('rendered');
    const [products, setProducts] = useState(
        [{
          'id':'1',
          'name': 'sds',
          'price': '232',
          'descriptionName': 'size',
          'descriptionNumber': '23'
        }]
      );
      
      
      useEffect(()=>{ 
        const fetchData = async (endpoint, setter)=>{
          try{
            const response = await fetch(endpoint,
            {
              mode: 'cors'
            });
            const fetchedData = await response.json();
            setter(fetchedData);
      
        }catch(error){
          console.log('error: '+ error);}
        }
      
        fetchData('https://scandiweb-backend-production.up.railway.app/', setProducts);
        // fetchData('http://localhost:2020/skus', setSkus);
       
      
      }, [checkedCards]);
    const handleCardClick = (id, state)=>{
        console.log('triggered checkboxClick', id, state)
        if(state){
            console.log(checkedCards);
            setCheckedCard((prevIds)=>{
                return [...prevIds, id]
            })
            console.log('triggered checked state')
        }else{
            console.log(checkedCards, id, state)
            console.log(checkedCards.filter((i)=>i!==id))
                setCheckedCard(checkedCards.filter((i)=>i!==id))

            
            console.log('triggered clear')
        }

    }
    const deleteDataOnServer = async(dataToSend) =>{

        //   const data = JSON.stringify({data: [dataToSend]});

        try{
           await fetch('https://scandiweb-backend-production.up.railway.app/delete', {
            method: 'POST',
            body: dataToSend,
            mode: 'cors'
           })
        }
            
        catch(error){
            console.log('error:' + error);
        }

    }
    const handleDeleteClick = ()=>{
        //delete products from db
        deleteDataOnServer(checkedCards);
        setCheckedCard(()=>{
            return []
        });
    }
    // console.log(props.products);
    // console.log(checkedCards);

    return (
        <>
            <Header h1={'Product List'} btn1={{name:'ADD', destination: '/add', onClick:''}} btn2={{name:'MASS DELETE', destination:'', onClick: handleDeleteClick }}  />
            <div className="cardsWrapper" style={cardsWrapper}>
                {products.map((product) =>{
                  return  <Card product={product} onClick={handleCardClick} />
                })}
            </div>
            <Footer />
        </>
    )
}

export default Home