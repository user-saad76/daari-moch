import express from 'express'
  const  app = express()
  import 'dotenv/config'
 import productRoutes from './routes/product.routes.js'
 import CategoryRoutes from './routes/category.routes.js'
 import bodyParser from 'body-parser'
import { connectDB } from './config/db.js'
import cors from 'cors';

  const port  = process.env.PORT ||5000
  connectDB().catch((e)=>console.log("Error in connection",e));

  


  app.use(cors())
  app.use(bodyParser.json())
  app.use( productRoutes)
   app.use( CategoryRoutes)
   app.use(express.urlencoded({ extended: true }));
 

  app.listen(port ,()=>{
    console.log(`Server is running on port ${port}`)
  })
  