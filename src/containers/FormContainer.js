import React, { useState, useEffect } from "react";
import {useForm} from 'react-hook-form'
import {useNavigate} from "react-router-dom";
import Form from "../components/Form";

const FormContainer = () =>{
    const navigate = useNavigate();
    const [skus, setSkus] = useState({});

    // const prodType = watch('productType');
    // const userSku = watch('SKU');
    // const hints= [
    //     'Please, provide dimension in Mb',
    //     'Please, provide dimensions in HxWxLx format.',
    //     'Please, provide dimension in Kg'
    // ]


    
    useEffect(()=>{ 
      const fetchData = async (endpoint, setter)=>{
        try{
          const response = await fetch(endpoint,
          {
            mode: 'cors'
          });
          const fetchedData = await response.json();
          setter(fetchedData[0]);
    
      }catch(error){
        console.log('error: '+ error);}
      }
    
      fetchData('https://test-task-skubidu.000webhostapp.com/skus', setSkus);
    
    }, []);

    const checkSku = (prType, formSku)=>{
        prType = prType ? prType.toLowerCase(): '';
        if(formSku!=='' && (prType==='dvd'||prType==='book'||prType==='furniture')){
            if(skus[prType]===''){
                setSkus(formSku)
                return true
            }
            else{
                if(skus[prType]!==formSku){
                errors.productType = {type: 'skuValidation'}
                return false
                }else{
                    return true
                }
            }

        }
    }

    const postDataOnServer = async(data) =>{
        const headers = new Headers({
            "Content-Type": "application/x-www-form-urlencoded"
          });
          const urlencoded = new URLSearchParams(data);
          const opts = {
            method: 'POST',
            mode: 'cors',
            headers: headers,
            body: urlencoded,
          };
        try{
            await fetch('https://test-task-skubidu.000webhostapp.com/create', opts);
            }
        catch(error){
            console.log('error:' + error);
        }
        navigate('/');

    }

    const onsubmit = (data) =>{
        console.log(data);
        data.dvd = skus.dvd;
        data.book = skus.book;
        data.furniture = skus.furniture;        
        console.log(data);
        postDataOnServer(data);
 
    }


return <Form onsubmit={onsubmit} 
             checkSku={checkSku} 
             hints={hints} 
             prodType={prodType} 
             userSku={userSku}
             />;
}
export default FormContainer;