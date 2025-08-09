import mongoose from "mongoose";

 const CategorySchema = new mongoose.Schema({

     title:{
      type:String,
      required:[true,'Category title is required'],
      trim:true
     },
      image:{
        public_id:String,
        secure_url:String
      },
      isPublic:{
        type:Boolean,
        default:false,
      }    
 },{
  timestamps:true,
 });

   export  const Category = mongoose.model('Category',CategorySchema)
   export default Category