import User from '../models/user.model.js'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


 export  const signupUser = async (req,res)=>{
     console.log("Hello from the server")
     const data = req.body;
      console.log("user data",data)
      const hashedPassword = await bcrypt.hash(req.body.password, 10); // ✅

      //const hashedPassword = await bcrypt.hash(data, 10);
      data.password = hashedPassword
      await User.create(data)


     res.json({
     message:'Category has been saved',
       
   })
  }
  export  const signinUser = async (req,res)=>{
     console.log("Hello from the server")
     const {email, password} = req.body;
       const user = await User.findOne({email})
        console.log ( "user",user)
     //console.log(data)
     if(!user || user.length === 0){
      return res.status(404).json({
        sucess:false,
        message:'User not found'
      })
     }

      const isMatched = await bcrypt.compare(password,user.password)
    
      if(!isMatched){
        return res.status(401).json({
        sucess:false,
        message:'Invaild password'
      })
      }
     

      //Sign a JWT Token
       const token = jwt.sign({ id:user._id,
        email:user.email,
         name:user.fullname,
         role:user.role
       },process.env.JWT_SECRET,{ expiresIn:'1h'  })
       res.cookie("jwt-token",token,{httpOnly:true,maxAge:3600000,secure:false,sameSite:"lax"})
       res.json({
     message:' User has been logged in ',
       
   })
  }
 export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // exclude password for safety
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const logout = async (req, res, next) => {
  res.clearCookie("jwt-token", {
    httpOnly: true,
    secure: false,   // set true in production with HTTPS
    sameSite: "lax",
  });

  res.json({
    message: "User has been logged out",
  });
};

 export  const UpdateUser = async (req,res)=>{
     console.log("Hello from the server")
     const data = req.body;
      const {_id} = req.params


      try {

         const userObj = {
        phone:data.mobile,
        address:{
             streetAddress: data.address,
             city: data.city,
              state: data.province,
              country: data.country,
              postalCode: data.zip
        }

      }

        const updated = await User.findByIdAndUpdate(_id,userObj)

     res.json({
     message:'User has been updated',
     user:updated,
     success:true
   })
        
      } catch (error) {
          res.json({
     message:   error?.message||'User has been not updated',
     success:false
   })
      }

     
  }

