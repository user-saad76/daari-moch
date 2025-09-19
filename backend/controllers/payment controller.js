  
import Stripe from 'stripe';
import Order from '../models/order.model.js';
import { OrderBuilder } from '../utils/utils.js';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  export const stripePayment = async(req,res,next)=>{


     try {
        const {items} = req.body;

        console.log("*************", items);
        

        const lineItems = items.map((item)=>{
            return {
                price_data:{
                    currency:"usd",
                    product_data:{
                        name: item.title
                    },
                   unit_amount: item.price * 100
                },
                  quantity: item.qty
            }
           
        })

        console.log("@@@@@@@", lineItems);

        console.log("------req?.user?._id",req?.user?.id)
        
        const session = await stripe.checkout.sessions.create({
         payment_method_types: ["card"],
         success_url: "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "http://localhost:5173/cancel",
          line_items:lineItems ,
          mode: 'payment',
          client_reference_id:req?.user?.id
  });
    
  res.json({id:session.id})


    } catch (error) {
        console.log("$$$$$$$$$$$$$$$$$$4", error)
        res.json({
            message: error?.message ||'SOMETHING WENT WRONG WHILE PAYMENT'
        })  
     }
}
export const confirmOrder = async (req,res,next)=>{
   try {
    const {sessionId} = req.body;
const session = await stripe.checkout.sessions.retrieve(sessionId, {
  expand: ["customer_details"], // optional: get customer details expanded

});


    
   const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, {
     limit: 100,
    });
   

  //res.json({
//  success: true,
//  order: session,     // send Stripe session object instead of orderData
  //lineItems,
  //amount: session.amount_total,
  // discount:session.amount_discount,
  // discription:session.description

//});

    const orderObj =  OrderBuilder(session,  lineItems)
      

      const newOrder = await Order.create(orderObj)
      console.log("new order",newOrder)
      res.json({
        newOrder,success: true,
        order: session,     // send Stripe session object instead of orderData
         lineItems,
       amount: session.amount_total,
       discount:session.amount_discount,
       discription:session.description
      })

   } catch (error) {
    console.log("Session retrive error",error)
     res.json({
       message:error?.message|| "  Order could not be  created .Something went wrong"
      })
   }
}


// session = your checkout.session response
// lineItems = await stripe.checkout.sessions.listLineItems(session.id)










