import React from 'react'
import * as z from "zod/v4"; 
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";

function Contect(){

     const ContectSchema = z.object({ 
       name:z.string().max(15,"Name should be 15 caharcters long").min(3, "Please enter atleast 3 characters"),
       email:z.email("Please enter a valid email"),
       message:z.string().max(100, "Too long message,make less than 100 characters")
     });

      const {register,handleSubmit,watch, formState: { errors, touchedFields  }} = useForm({
        resolver: zodResolver(ContectSchema),
        mode:"onBlur",
      })
      const onSubmit = data => console.log(data);
    return(
        <div className='container'>
              <form className="row g-3 w-50 mt-4" onSubmit={handleSubmit(onSubmit)} >
            <div className="col-md-12">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                {...register("name",{required: true})}
                name="name"
                required
              />
               {/*{errors.name && <span style={{color:'red'}}>This field is required</span>} */}
                 {touchedFields.name && errors.name && <p style={{color:'red'}}>{errors.name.message}</p>}
            </div>
             <div className="col-md-12">
              <label htmlFor="inputEmail4" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                {...register("email", { required: true })}
                name="email"
                id="inputEmail4"
               required
              />
              {/* {errors.email && <span style={{color:'red'}}>This field is required</span>}*/}
                { touchedFields.email && errors.email && <p style={{color:'red'}}>{errors.email.message}</p>}
            </div>
              <div className="col-md-12">
              <label htmlFor="message" className="form-label">Message</label>
              <div className ="form-floating">
            <textarea className="form-control" name='message' {...register("message", { required: true })}  placeholder="Leave a comment here" id="floatingTextarea2" style={{height:"100px"}}></textarea>
            <label for="floatingTextarea2">Message</label>
            {/* {errors.message && <span  style={{color:'red'}}>This field is required</span>}*/}
             { touchedFields.message && errors.message && <p style={{color:'red'}}>{errors.message.message}</p>}
             </div>
            </div>
           
           
            <div className="col-12">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
       
    )
}
export default Contect