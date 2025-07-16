import React,{useState,useEffect} from "react";
import ProductCard from "../components/ProductCard";
//import { products } from "../data";

function Home() {

  const [products,setProducts] = useState([])

  const [min , setMin] = useState(0)
  const [max , setMax] = useState(1000)
 
    const getProductsFromAPI = async()=>{
        const res =   await fetch('https://fakestoreapi.com/products')
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
      <div className="container ">
        <input type="search" className="mb-3" onChange={handleSearch}/>
        <button onClick={handleSearch}>Search</button>
        <label htmlFor="">Filter by rating</label>
        <input type="text" onChange={handlerating} />



         <label htmlFor="">Filter by Price</label>
        <input type="text" onChange={(e)=>setMin(e.target.value)}/>
         <input type="text" onChange={(e)=>setMax(e.target.value)} />
         <button onClick={handleprice}>filter Price</button>
        <div className="row">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
  );
}

export default Home;

 






   


