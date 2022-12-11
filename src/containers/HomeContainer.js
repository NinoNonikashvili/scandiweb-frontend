import React, {useState, useEffect} from "react";
import Home from "../components/Home";

const HomeContainer = () =>{
    const [checkedCards, setCheckedCard] = useState([]);
    console.log('rendered');
    const [products, setProducts] = useState([]);
      
      
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
        fetchData('https://test-task-skubidu.000webhostapp.com/', setProducts);       
      
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
        try{
           await fetch('https://test-task-skubidu.000webhostapp.com/delete', {
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
        setTimeout(()=>{
          setCheckedCard(()=>{
            return []
        });
        }, 1000)

    }
    return <Home products = {products} handleCardClick = {handleCardClick} handleDeleteClick = {handleDeleteClick}/>
}

export default HomeContainer;