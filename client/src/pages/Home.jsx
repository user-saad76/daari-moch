import React,{useState,useEffect} from "react";
import ProductCard from "../components/ProductCard";
import Carousel from "../components/Carousel";
import Features from "../components/Features";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import SpecialOffers from "../components/SpecialOffers";
import RecentProducts from "../components/RecentProducts";
import Footer from "../components/Footer";
//import { products } from "../data";

function Home() {

  const [products,setProducts] = useState([])

  const [min , setMin] = useState(0)
  const [max , setMax] = useState(1000)
 
    const getProductsFromAPI = async()=>{
        const res =   await fetch('http://localhost:7000/products')
         const data =  await res.json()
        setProducts(data)
       
    }

    useEffect(()=>{
          getProductsFromAPI()   
    },[])

    const handleSearch = (e)=>{
        if(e.target.value){
          console.log(e.target.value)
        const searchResult = products.filter((product)=>product.title.toLowerCase().includes(e.target.value.toLowerCase()))
        setProducts(searchResult)
        }
        else{
          getProductsFromAPI();
        }

    }

     const handlerating = (e)=>{
        if(e.target.value){
          console.log(e.target.value)
        const searchResult = products.filter((product)=>product.rating.rate>=e.target.value)
        setProducts(searchResult)
        }
        else{
          getProductsFromAPI();
        }

    }
     const handleprice = (e)=>{
       
        const searchResult = products.filter((product)=>product.price>=min && product.price<=max)
        setProducts(searchResult)
     
      
    }
  return (
     <>
       <Carousel/>
       <Features/>
       <Categories/>
       <FeaturedProducts/>
       <SpecialOffers/>
       <RecentProducts/>
       <Footer/>
     </>  
  )
}

export default Home;

 






   


