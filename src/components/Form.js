import React, { useState, useEffect } from "react";
import {useForm} from 'react-hook-form'
import { Link, useNavigate } from "react-router-dom";
import { btnsWrapper } from "../styles/btnWrapper";

const Form = () => {
    const navigate = useNavigate();
    const [skus, setSkus] = useState({dvd: '', book: '', furniture: ''});
    const [products, setProducts] = useState([]);
    const {register, formState:{errors}, handleSubmit, watch, getValues, trigger} = useForm({
        mode: 'all'
    });
    const prodType = watch('productType');
    const userSku = watch('SKU');
 

    const hints= [
        'Please, provide dimension in Mb',
        'Please, provide dimensions in HxWxLx format.',
        'Please, provide dimension in Kg'
    ]

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
      }, []);

      useEffect(()=>{
        let dvdSku = products.find((product) =>{
          return product.unit==='Mb'
        })
        let bookSku = products.find((product)=>{
          return product.unit === 'Kg'
        })
        let furnitureSku = products.find((product)=>{
          return product.unit === 'Cm'
        })
  
        if(dvdSku){
          setSkus((prevState)=>({
            ...prevState,
            dvd: dvdSku.sku
          }))
        }
        if(bookSku){
          setSkus((prevState)=>({
            ...prevState,
            book: bookSku.sku
          }))
        }
        if(furnitureSku){
          setSkus((prevState)=>({
            ...prevState,
            furniture: furnitureSku.sku
          }))
        }
      }, [products])



    const checkSku = (prType, formSku)=>{
        prType = prType ? prType.toLowerCase(): '';
        console.log(skus);
        if(formSku!=='' && (prType==='dvd'||prType==='book'||prType==='furniture')){
            console.log(skus[prType]);
            if(skus[prType]===''){
                console.log('update skus with value for this product')
                return true
            }
            else{
                console.log('values: '+skus[prType], formSku )
                if(skus[prType]!==formSku){
                    console.log('sku already exists')
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
        postDataOnServer(data);
    }


    return(

        <form onSubmit={handleSubmit(onsubmit)} id='product_form'>
            <div className="mb-3">
            <label className="form-label">SKU</label>
                <input 
                    className="form-control"
                    name='SKU' 
                    type='text' 
                    id='sku' 
                    placeholder='SKU'
                    onKeyUp={()=> {
                        trigger('productType')
                      }}
                    {...register('SKU', {required: 'required field', maxLength:10 })}/>
                    {errors.SKU && errors.SKU.type==='maxLength' && <p>{'max 10 chars'}</p>}
                    {errors.SKU && <div className="form-text text-error">{errors.SKU.message}</div>}           
            </div>
            <div className="mb-3">
            <label className="form-label">Name</label>
                <input
                    className="form-control"
                    name='name' 
                    type='text' 
                    id='name' 
                    placeholder='Name'
                    {...register('name', {required: 'required field'})} />
                    {errors.name && <div className="form-text text-error">{errors.name.message}</div>}              

            
            </div>
            <div className="mb-3">
            <label form-label>Price ($)</label>
                <input
                    className="form-control"
                    name='price' 
                    type='number' 
                    id='price' 
                    placeholder='Price'
                    {...register('price', {required: 'required field'})} />   
                    {errors.price && <div className="form-text text-error">{errors.price.message}</div>}              
            
            </div>
            <select className="form-select typeSelect" id='productType' {...register('productType', {validate: {
               typeValidation: (value) => (value==='DVD'||value==='Book'||value==='Furniture'),
               skuValidation: () => (checkSku(prodType, userSku))}})}>
                <option disabled={true} selected={true} hidden={true}>choose product type</option>
                <option value='DVD'>DVD</option>
                <option value='Book'>Book</option>
                <option value='Furniture'>Furniture</option>
            </select>
            
            {errors.productType && errors.productType.type==='typeValidation' && <div className="form-text text-error">{'choose type'}</div>}
            {errors.productType && errors.productType.type==='skuValidation' && <div className="form-text text-error">{'SKU already exists for this product'}</div>}
            { watch('productType')==='DVD' && (
            <>
                <div className="mb-3">
                <label className="form-label">Size (MB)
                    <input
                        className="form-control"
                        name='size'
                        type='number'
                        id='size'
                        placeholder=""
                        {...register("size", {required: 'required field'})} />
                        {errors.size && <div className="form-text text-error">{errors.size.message}</div>}
                </label>
                <div className="form-text">{hints[0]}</div>
                </div>
            </>
            )}
            { watch('productType')==='Furniture' && (
                <>  <div className="mb-3">
                    <label className="form-label">Height (CM)
                        <input
                        className="form-control"
                        name='height'
                        type='number'
                        id='height'
                        placeholder=""
                        {...register("height", {required: 'required field'})} />
                        {errors.height && <div className="form-text text-error">{errors.height.message}</div>}
                    </label>
                    </div>
                    <div className="mb-3">
                    <label className="form-label">Width (CM)
                        <input 
                        className="form-control"
                        name='width'
                        type='number'
                        id='width'
                        placeholder=""
                        {...register("width", {required: 'required field'})} />
                        {errors.width && <div className="form-text text-error">{errors.width.message}</div>}                        
                    </label>
                    </div>
                    <div className="mb-3">
                    <label className="form-label">Length (CM)
                        <input
                        className="form-control"
                        name='length'
                        type='number'
                        id='length'
                        placeholder=""
                        {...register("length", {required: 'required field'})} />
                        {errors.length && <div className="form-text text-error">{errors.length.message}</div>} 
                    </label>
                    </div>
                    <div className="form-text">{hints[1]}</div>
                    
                </>
            )}
            { watch('productType')==='Book' && (
                <>
                    <div className="mb-3">
                    <label className="form-label">Weight (KG)
                        <input
                        className="form-control"
                        name='book'
                        type='number'
                        id='weight'
                        placeholder=""
                        {...register("weight", {required: 'required field'})} />
                        {errors.book && <div className="form-text text-error">{errors.book.message}</div>}
                    </label>
                    <div className="form-text">{hints[2]}</div>
                    </div>
                </>
            )

            } 
            <div style={btnsWrapper}>
                 <input 
                    type='submit'
                    className="button red-btn" 
                    value='Save'
                    disabled={
                        Object.keys(errors).length===0 ? false:true
                    }
                    />
                <Link to='/'>
                    <button className="button green-btn">Cancel</button>
                </Link>
            </div>
            
        </form>
    



    )
}

export default Form
