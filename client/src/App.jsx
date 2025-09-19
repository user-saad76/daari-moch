import "./App.css";
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/login";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import NotFound from "./components/NotFound";
import DetailPage from "./pages/DetailPage";
import {createContext} from 'react';
import { useState,useEffect } from "react";
import Contect from "./pages/Contect";
import Topbar from "./components/Topbar";
import Footer from "./components/Footer";
import { useFetch } from "./hook/useFetch";
import SignupForm from "./pages/SignupForm";
import SigninForm from "./pages/SigninForm";
import AuthProvider from "./contexts/AuthProvider";
import Dashboard from "./pages/Dashboard";
import Protected from "./pages/Protected";
import CartProvider from "./contexts/CartProvider";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import OrderCancel from "./pages/OrderCancel";



  export const CartContext = createContext()
 
function App() {

   const [cart,setCart] =  useState(()=>{
    const saved = localStorage.getItem("cart")
    return saved? JSON.parse(saved):[]
   })

   
  
    const {data:categories ,error, loading}  = useFetch('http://localhost:7000/categories')


   useEffect(()=>{
    const cartFromStorage = JSON.parse(localStorage.getItem('cart'))
  
   setCart( cartFromStorage || [])
   },[])

   useEffect(()=>{
       console.log("Trigged" ,cart)
        
           localStorage.setItem('cart',JSON.stringify(cart))
     
   },[cart])

  return (
    <AuthProvider>
      <CartProvider>
    <BrowserRouter>
      <Topbar />
    <Navbar categories={categories}/>
      <Routes>
          <Route path="/" element={<Home  categories={categories} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Protected><Cart /></Protected>} />
        <Route path="/products/:slug" element={<DetailPage />} />
         <Route path="/contect" element={<Contect />} />
           <Route path="/signin" element={<SigninForm />} />
          <Route path="/signup" element={<SignupForm />} />
           <Route path="/dashboard" element={<Protected><Dashboard/></Protected>} />
            <Route path="/checkout" element={<Protected><Checkout/></Protected>} />
             <Route path="/success" element={<OrderSuccess/>} />
            <Route path="/cancel" element={<Protected><OrderCancel/></Protected>} />
              <Route path="*" element={<NotFound />} />

      </Routes>
       <Footer/>
    </BrowserRouter>
     </CartProvider>
      </AuthProvider>
  );
}

export default App;


// 1- Create a context API in the root file
// 2- Provide the context to the ap using context provider
// 3- provide value that you want to remain available throughout  the app 