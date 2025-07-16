import "./App.css";
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/login";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router";
import Cart from "./pages/Cart";
import NotFound from "./components/NotFound";
import DetailPage from "./pages/DetailPage";
import {createContext} from 'react';
import { useState,useEffect } from "react";
import Contect from "./pages/Contect";



  export const CartContext = createContext()
 
function App() {

   const [cart,setCart] =  useState(()=>{
    const saved = localStorage.getItem("cart")
    return saved? JSON.parse(saved):[]
   })

   useEffect(()=>{
    const cartFromStorage = JSON.parse(localStorage.getItem('cart'))
  
   setCart( cartFromStorage || [])
   },[])

   useEffect(()=>{
       console.log("Trigged" ,cart)
        
           localStorage.setItem('cart',JSON.stringify(cart))
     
   },[cart])

   

  return (
    <CartContext.Provider value ={{cart,setCart}}>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
         <Route path="/login" element={<Login />} />
        <Route path="/product/:slug" element={<DetailPage />} />
         <Route path="/contect" element={<Contect />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </CartContext.Provider>
  );
}

export default App;


// 1- Create a context API in the root file
// 2- Provide the context to the ap using context provider
// 3- provide value that you want to remain available throughout  the app 