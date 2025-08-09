import Category from '../models/category.model.js'
import multer from 'multer';
import path from 'path';




 export  const createNewCategory = async (req,res)=>{
     console.log("Hello from the server")
     const { title, isPublic } = req.body;
   const image = req.file;
      console.log(image);


     res.json({
     message:' Create Categories endpoint called',
       
   })
  }
 
 export  const getAllCategories = async(req,res)=>{
    //const qData = req.query
    const Categories = await Category.find({})
    //console.log(qData)
     await Category.find({})

     res.json( Categories)
  }
  export  const getCategoryById = async(req,res)=>{
   const {id} = req.params;
    const Category = await  Category.findById(id)

     res.json({
      message:'Single Category endpoint called',
      Category
     })
   
  }
   export  const updateCategory = async(req,res)=>{
      const {id} = req.params;
     const data = req.body
     await Category.findByIdAndUpdate(id,data)
     res.json({message:'Single Category endpoint called'})
  }
   export  const deleteCategory = async(req,res)=>{
      const{id}= req.params;
      await Category.findByIdAndDelete(id)
     res.json({message:'Delete endpoint called'})
  }

  //CRUD operation