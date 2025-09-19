import { useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import { CartContext } from '../App';
import { useContext } from 'react';
import { Link } from 'react-router-dom';


function ProductCard({ product }) {

   const {cart,setCart} =  useContext(CartContext)
   
   //console.log("Before imutation",cart)
   const handleAddToCart=(p)=>{

    const foundItem = cart.find((i)=>i._id==p._id)
    if(!foundItem){
       p.qty = 1
        setCart([...cart,p])
    }
    
  
   }
  return (
  <div className="col-lg-4">
      <div className="card " >
      <img src={product.image} className="card-img-top" alt="..." />
      <div className="card-body">
        <Link to={`/product/${product.slug}`}><h5 className="card-title">{product.title }</h5></Link>
        <p className="card-text">Price.{product.price}</p>
        <button href="#" className="btn btn-primary" disabled = {cart.find((i)=>i._id==product._id)?true:false} onClick={()=>handleAddToCart(product)} >ADD TO CART </button>
       
         <Rating readonly = {true} allowFraction = {true} initialValue={product.rating.rate}/>

      </div>
    </div>

  </div>
  )
}
export default ProductCard