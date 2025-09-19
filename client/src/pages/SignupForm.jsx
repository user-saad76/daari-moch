import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePost } from "../hook/usePost";
import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthProvider";

// Validation schema
const schema = z
  .object({
    fullname: z.string().min(3, "Full name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    repeatPassword: z.string(),
    phone: z
      .string()
      .regex(/^\d{10,15}$/, "Phone must be between 10 and 15 digits"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
  });

export default function SignupForm() {

 const {user,error:userError,loading:userloading} = useAuth()
  
  if(userloading)  return <p>Loading....</p>;
  if(user && user?.fullname) return <Navigate to = "/"/>

   const {postData,response,error,loading} = usePost('http://localhost:7000/users/signup')


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit =  async (data) => {
    //console.log("Form Data:", data);
     await postData(data)
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h4 className="mb-4 text-center">Signup</h4>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Full Name */}
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.fullname ? "is-invalid" : ""}`}
                    {...register("fullname")}
                  />
                  {errors.fullname && (
                    <div className="invalid-feedback">{errors.fullname.message}</div>
                  )}
                </div>

                {/* Email */}
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    {...register("email")}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email.message}</div>
                  )}
                </div>

                {/* Password */}
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    {...register("password")}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password.message}</div>
                  )}
                </div>

                {/* Repeat Password */}
                <div className="form-group">
                  <label>Repeat Password</label>
                  <input
                    type="password"
                    className={`form-control ${errors.repeatPassword ? "is-invalid" : ""}`}
                    {...register("repeatPassword")}
                  />
                  {errors.repeatPassword && (
                    <div className="invalid-feedback">{errors.repeatPassword.message}</div>
                  )}
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">{errors.phone.message}</div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
