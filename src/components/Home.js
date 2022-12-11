import React from "react";
import Card from '../Card';
import Header from '../Header';
import Footer from '../Footer';
import { cardsWrapper } from "../styles/cardsWrapper";
import { btnsWrapper } from "../styles/btnWrapper";
import {Link} from 'react-router-dom';




const Home = (props) =>{


    return (
        <>
            <Header h1={'Product List'}/>
            <div style={btnsWrapper}>
              <Link to={'/add'}>  
                  <button className='green-btn button' id={'ADD'}>{'ADD'}</button>
              </Link>
              <button className='green-btn button' id={'MASS DELETE'} onClick={props.handleDeleteClick}>{'MASS DELETE'}</button>
            </div>
            <div style={cardsWrapper}>
                {props.products.map((product) =>{
                  return  <Card product={product} onClick={props.handleCardClick} />
                })}
            </div>
            <Footer />
        </>
    )
}

export default Home
