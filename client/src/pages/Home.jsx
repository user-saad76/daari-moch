import React,{useState,useEffect} from "react";
import ProductCard from "../components/ProductCard";
import Carousel from "../components/Carousel";
import Features from "../components/Features";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import SpecialOffers from "../components/SpecialOffers";
import RecentProducts from "../components/RecentProducts";
import Footer from "../components/Footer";
import { useFetch } from "../hook/useFetch";
//import { products } from "../data";

function Home({categories}) {

  //const [products,setProducts] = useState([])

   const {data:products , error, loading} = useFetch('http://localhost:7000/products')
 
  ///  const getProductsFromAPI = async()=>{
      ///  const res =   await fetch('http://localhost:7000/products')
       //  const data =  await res.json()
        //setProducts(data)
       
   // }

   // useEffect(()=>{
         // getProductsFromAPI()   
   // },[])

   
  return (
     <>
       <Carousel/>
       <Features/>
       <Categories  categories={categories}/>
       <FeaturedProducts products = {products}/>
       <SpecialOffers/>
       <RecentProducts/>
       
     </>  
  )
}

export default Home;