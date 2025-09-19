 import  json from 'body-parser';
import Product from '../models/products.model.js'
 export  const createNewProduct = async (req,res)=>{
     const data = req.body;


     console.log("+++++++++++++++++", data);
     
      
     const images = req.files;
     

     const mainImage = {
      public_id: images.mainImage[0].filename,
      secure_url: images.mainImage[0].path
     }
       const galleryImages = images.galleryImages.map((imgObj)=>{
         return {
            public_id:imgObj.filename,
            secure_url:imgObj.path
         }
      })
      //  console.log("data------",data)

       data.mainImage = mainImage
       data.galleryImages = galleryImages
       


       console.log('data', data);
       

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
  export const getProductBySlug = async(req, res)=>{
    const {slug} = req.params;
    
    const product = await Product.find({slug});
    
    res.json({
        message:'Single product endpoint called',
        product
 });
}
  //CRUD operation