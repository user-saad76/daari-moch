// multer.js
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinary from './cloudinary.js';

// Set Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ecommerce-16/categories', // Optional folder in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg','webp'],
    public_id: (req, file) => `Category.${Date.now()}`

  
  },
});

const upload = multer({ storage });

export default upload;
