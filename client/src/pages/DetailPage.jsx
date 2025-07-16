import { useParams } from 'react-router'
//import {products} from '../data.js'

function DetailPage(){
     const {slug}=useParams();
     

     const item = products.find((item)=>item.slug==slug);

     
    return(
      <div className="container">
        <p>Category:{item.category}</p>
         <img style = {{width:'200px'}}src={item.image} alt="" />
         <h1>{item.title}</h1>
         <p>{item.description}</p>
         <h5>Price:{item.price}</h5>
        <button to="#" className="btn btn-primary">Go somewhere</button>
      </div>
     
    )
}
export default DetailPage
  

