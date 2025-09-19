import express from 'express'
import { createNewProduct,getAllProducts,getProductById, updateProduct,deleteProduct,getProductBySlug } from '../controllers/products.controller.js'
import upload from '../utils/multer.js'
import { isAuthenticated ,isAuthorized } from '../middleware/auth.middleware.js'
 const  app = express()
 const router = express.Router()
 

router.route('/products/add').post( isAuthenticated,
  upload.fields([
    { name: 'mainImage', maxCount: 1 },         // Single main image
    { name: 'galleryImages', maxCount: 5 }     // Multiple gallery images
  ]),
  createNewProduct
);
router.route('/products/:slug').get(getProductBySlug)
 router.route('/products').get(getAllProducts)
 router.route('/product/:id').get(getProductById)
  router.route('/product/update/:id').put( isAuthenticated ,isAuthorized, updateProduct)
  router.route('/product/delete/:id').delete( isAuthenticated,isAuthorized , deleteProduct)
  

 export default router

 