import mongoose from "mongoose";

 const CategorySchema = new mongoose.Schema({

      title:String,
      slug:String,
      price: Number,
      description:String,
      category:String,
      image:{
        public_id:String,
        secure_url:String
      },
      
 });

   export  const Category = mongoose.model('Category',CategorySchema)
   export default Category