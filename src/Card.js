import React from "react";
import { card, cardText } from "./styles/cardsWrapper";


const Card = (props)=>{
    // const checkType = (event)=>{
    //     if(event.target.checked){
    //       console.log('checked')
    //     }else{
    //       console.log('nothing happened')
    //     }
    // }
    return (
    <div className="card" style={card}>
    <div >
      <input type="checkbox" id={props.product.id} onClick={(event)=>props.onClick(event.target.id, event.target.checked)}/>
      <h6 style={cardText}className="card-subtitle">{props.product.sku}</h6>
      <h5 style={cardText} className="card-title">{props.product.name}</h5>
      <h6 style={cardText} className="card-subtitle">{props.product.price} ($)</h6>
      <h6 style={cardText} className="card-subtitle">{props.product.description_name} : {props.product.description_number} </h6>

    </div>
  </div>    
    )

} 

export default Card;