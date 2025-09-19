import React, { useState } from "react";
import { useCart } from "../contexts/CartProvider";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../contexts/AuthProvider";
import { loadStripe } from "@stripe/stripe-js";



const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

// ✅ Define Zod schema
const checkoutSchema = z.object({
  fullname: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Enter a valid phone number"),
  address: z.string().min(5, "Address is required"),
  country: z.string().nonempty("Country is required"),
  city: z.string().min(2, "City is required"),
  province: z.string().min(2, "Province is required"),
  zip: z.string().min(3, "ZIP code is required"),
});

const Checkout = () => {
  const { cartState } = useCart();
   const {user} = useAuth()
     const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [shippingCharges] = useState(10);
   

  // ✅ setup react-hook-form with zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullname: user?.fullname || "",
      email: user?.email || "",
    },
  });

  // ✅ handle form submit
  const onSubmit = async(data) =>{
    console.log("Form Data",data)
   try {
      const res = await fetch(`http://localhost:7000/users/update/${user?._id}`, {
        method: "PUT",
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(res)

      if (!res.ok) {
         
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
       
      const result = await res.json();
     // setData(result);
      return result;

    
    } catch (err) {
      setError(err.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  
  }
   

   const items =  cartState.map((item)=>{
       return {
          title:item.title,
           unit_price:item.price,
           qty:item.qty
       }
      })
      console.log("*****",items)

  const handleCheckout = async () => {
  const stripe = await stripePromise;

  try {
    // ✅ Prepare cart items for backend
    const items = cartState.map((item) => ({
      id: item._id,
      title: item.title,
      price: item.price,
      qty: item.qty,
    }));

    // ✅ Call backend to create checkout session
    const response = await fetch("http://localhost:7000/checkout/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }), // send cart items
      credentials: "include",
    });

    const session = await response.json();

    console.log("&&&&&&&&&&&", session);
    

    // ✅ Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error("OOOOOOOOO", result.error.message);
      // alert("Payment failed: " + result.error.message);
    }
  } catch (err) {
    console.error("Error during checkout:", err);
    // alert("Something went wrong while starting checkout.");
  }
};



    // ✅ calculate subtotal
  const subtotal = cartState.reduce((acc, item) => acc + item.price * item.qty, 0);

  // ✅ calculate tax (3%)
  const tax = (subtotal * 3) / 100;

  // ✅ calculate total
  const total = subtotal + tax + shippingCharges;

  

  return (
    <div className="container-fluid">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row px-xl-5">
          {/* Billing Address */}
          <div className="col-lg-8">
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Billing Address</span>
            </h5>
            <div className="bg-light p-30 mb-5">
              <div className="row">
                <div className="col-md-6 form-group">
                  <label>Full Name</label>
                  <input
                  readOnly
                    {...register("fullname")}
                    className="form-control"
                    type="text"
                    placeholder="John"
                  />
                  {errors.fullname && <p className="text-danger">{errors.fullname.message}</p>}
                </div>
                <div className="col-md-6 form-group">
                  <label>E-mail</label>
                  <input 
                  readOnly
                    {...register("email")}
                    className="form-control"
                    type="text"
                    placeholder="example@email.com"
                  />
                  {errors.email && <p className="text-danger">{errors.email.message}</p>}
                </div>
                <div className="col-md-6 form-group">
                  <label>Mobile No</label>
                  <input
                    {...register("mobile")}
                    className="form-control"
                    type="text"
                    placeholder="+123 456 789"
                  />
                  {errors.mobile && <p className="text-danger">{errors.mobile.message}</p>}
                </div>
                <div className="col-md-6 form-group">
                  <label>Full Address</label>
                  <input
                    {...register("address")}
                    className="form-control"
                    type="text"
                    placeholder="123 Street"
                  />
                  {errors.address && <p className="text-danger">{errors.address.message}</p>}
                </div>
                <div className="col-md-6 form-group">
                  <label>Country</label>
                  <select {...register("country")} className="custom-select">
                    <option value="">Select Country</option>
                    <option>United States</option>
                    <option>Afghanistan</option>
                    <option>Albania</option>
                    <option>Algeria</option>
                  </select>
                  {errors.country && <p className="text-danger">{errors.country.message}</p>}
                </div>
                <div className="col-md-6 form-group">
                  <label>City</label>
                  <input
                    {...register("city")}
                    className="form-control"
                    type="text"
                    placeholder="New York"
                  />
                  {errors.city && <p className="text-danger">{errors.city.message}</p>}
                </div>
                <div className="col-md-6 form-group">
                  <label>Province</label>
                  <input
                    {...register("province")}
                    className="form-control"
                    type="text"
                    placeholder="New York"
                  />
                  {errors.province && <p className="text-danger">{errors.province.message}</p>}
                </div>
                <div className="col-md-6 form-group">
                  <label>ZIP Code</label>
                  <input
                    {...register("zip")}
                    className="form-control"
                    type="text"
                    placeholder="123"
                  />
                  {errors.zip && <p className="text-danger">{errors.zip.message}</p>}
                </div>
              </div>
            </div>
            <button className="btn btn-primary px-4" type="submit">
              Save Shipping Details
            </button>
          </div>

          {/* Order Total */}
          <div className="col-lg-4">
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Order Total</span>
            </h5>
            <div className="bg-light p-30 mb-5">
              <div className="border-bottom">
                <h6 className="mb-3">Products</h6>
                {cartState.map((item) => (
                  <div  className="d-flex justify-content-between">
                    <p>{item.title}</p>
                    <p>PKR. {item.price * item.qty}</p>
                  </div>
                ))}
              </div>
              <div className="border-bottom pt-3 pb-2">
                <div className="d-flex justify-content-between mb-3">
                  <h6>Subtotal</h6>
                  <h6>PKR. {subtotal}</h6>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <h6>Tax (3%)</h6>
                  <h6>PKR. {tax}</h6>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <h6 className="font-weight-medium">Shipping</h6>
                  <h6 className="font-weight-medium">PKR. {shippingCharges}</h6>
                </div>
              </div>
              <div className="pt-2">
                <div className="d-flex justify-content-between mt-2">
                  <h5>Total</h5>
                  <h5>PKR. {total}</h5>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="mb-5">
              <h5 className="section-title position-relative text-uppercase mb-3">
                <span className="bg-secondary pr-3">Payment</span>
              </h5>
              <div className="bg-light p-30">
                <div className="form-group">
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      className="custom-control-input"
                      value="directcheck"
                      {...register("payment")}
                      id="directcheck"
                    />
                    <label className="custom-control-label" htmlFor="directcheck">
                     Stripe payment
                    </label>
                  </div>
                </div>
                <div className="form-group mb-4">
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      className="custom-control-input"
                      value="banktransfer"
                      {...register("payment")}
                      id="banktransfer"
                    />
                    <label className="custom-control-label" htmlFor="banktransfer">
                     Cash On Delivery
                    </label>
                  </div>
                </div>
                {errors.payment && <p className="text-danger">{errors.payment.message}</p>}

                <button type="submit" className="btn btn-block btn-primary font-weight-bold py-3" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    );
    };

export default Checkout;
