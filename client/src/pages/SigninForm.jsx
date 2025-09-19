import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePost } from "../hook/usePost";
import { useNavigate } from "react-router";
import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthProvider";


// ✅ Zod schema for validation
const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
});


export default function SigninForm() {
  const {user,error:userError,loading:userloading} = useAuth()
  
  if(userloading)  return <p>Loading....</p>;
  if(user && user?.fullname) return <Navigate to = "/"/>



  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
    mode: "onTouched",
  });

 const  navigate = useNavigate()
 const {postData,response,error,loading} = usePost('http://localhost:7000/users/signin')
   
   console.log(response)
   console.log(error)

  const onSubmit =  async (data) => {
    //console.log("Form Data:", data);
      await postData(data)
      //navigate('/')
      window.location.href = '/'
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Sign In</h3>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    id="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="Enter your email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email.message}
                    </div>
                  )}
                </div>

                {/* Password */}
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    placeholder="Enter your password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">
                      {errors.password.message}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
