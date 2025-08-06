 import {Product} from '../models/products.model.js'
 export  const createNewProduct = async (req,res)=>{
     const data = req.body;

     await Product.create(data)

     res.json({
      message:' Create Products endpoint called',
       data:data
   })
  }
 
 export  const getAllProducts = async(req,res)=>{
    //const qData = req.query
    const products = await Product.find({})
    //console.log(qData)
     await Product.find({})

     res.json( products)
  }
  export  const getProductById = async(req,res)=>{
   const {id} = req.params;
    const product = await  Product.findById(id)

     res.json({
      message:'Single product endpoint called',
      product
     })
   
  }
   export  const updateProduct = async(req,res)=>{
      const {id} = req.params;
     const data = req.body
     await Product.findByIdAndUpdate(id,data)
     res.json({message:'Single product endpoint called'})
  }
   export  const deleteProduct = async(req,res)=>{
      const{id}= req.params;
      await Product.findByIdAndDelete(id)
     res.json({message:'Delete endpoint called'})
  }

  //CRUD operation