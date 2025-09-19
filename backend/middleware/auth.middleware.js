import jwt from 'jsonwebtoken'
export const  isAuthenticated = async(req,res,next)=>{
  const token = req.cookies["jwt-token"];
   if(!token){
     return res.status(401).json({message:'You are not authenticated'})
   }
   //token verification
      const decoded =  await jwt.verify(token, process.env. JWT_SECRET)
      req.user = decoded;
      next()
     // console.log("+++++++",decoded)

     // jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
 // console.log(decoded) // bar
///});

}
export const isAuthorized = () =>{
  return null
}