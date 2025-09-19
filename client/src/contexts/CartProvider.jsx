import React,{createContext, useEffect} from 'react'
import { useState,useContext,useReducer} from 'react'
import {useAuth} from './AuthProvider'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
     case "SET_CART":
      return Array.isArray(action.payload) ? action.payload : [];
     // return action.payload
    case 'ADD_TO_CART': {
      const existing = state.find(item => item._id == action.payload._id);

      console.log("action.payload",action.payload)

      if (existing) {
        return state.map(item =>
          item._id == action.payload._id
            ? { ...item, qty: (item.qty || 1) + 1 }
            : item
        );
      }

      return [...state, { ...action.payload, qty: 1 }];
    }

    case 'REMOVE_FROM_CART':
      return state.filter(item => item.productId !== action.payload);

    case 'CLEAR_CART':
      return [];

    case 'INCREMENT_CART':
      return state.map(item =>
        item._id === action.payload
          ? { ...item, qty: item.qty + 1 }
          : item
      );

    case 'DECREMENT_CART':
      return state.map(item =>
        item._id === action.payload && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      );

    case 'CART_TOTAL': {
      const total = state.reduce(
        (acc, item) => acc + item.price * (item.qty || 1),
        0
      );
      // ⚠️ careful here: state is an array, spreading into an object breaks it
      // Better to return the array + calculate total separately in provider
      return state;
    }

    default:
      return state;
  }
};

function CartProvider({children}){
   // const [cart,setCart] = useState([])
    //const [cartState,dispatch] = useReducer(cartReducer,cart)
     const [cartState, dispatch] = useReducer(cartReducer, []);
      const {user} = useAuth()
    
     const fetchCart = async(userId)=>{
      try {
      const res = await fetch(`http://localhost:7000/cart-items/${userId}`);
          const {data} = await res.json();
         console.log("data from backend", data);
          dispatch({ type: "SET_CART", payload: data || [] });

      } catch (error) {
        console.log("Error fetching cart:",error)
      }
     }

   const addToCart = async (product) => {

    console.log("Checking Quantity",product);
    
  try {
       
  
     const body = {
     productId: product._id,
     title: product.title,
      price: product.price,
     };


    const res = await fetch(`http://localhost:7000/cart/add/${user._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (data.success) {
      dispatch({ type: "SET_CART", payload: data.items });
    }
  } catch (err) {
    console.error("Error adding to cart:", err);
  }
};
 

     const removeFromCart = async(id)=> {
      dispatch({type:'REMOVE_FROM_CART',payload:id})
      const res = await fetch(`http://localhost:7000/cart/delete/${id}/${user._id}`, {
      method: "DELETE",
    });
      console.log("Delete response",res)
     }
     const clearCart = async()=> {
      dispatch({type:'CLEAR_CART'})
        const res = await fetch(`http://localhost:7000/cart/clear/${user._id}`, {
      method: "DELETE",
      credentials:"include"
    });
     }
     // increment qty in DB
  const incrementCart = async (id) => {
    try {
      await fetch(`http://localhost:7000/cart/update/${id}/INCREMENT`, {
        method: "PUT",
      });
      if (user?._id) fetchCart(user._id);
    } catch (err) {
      console.error("Error incrementing cart:", err);
    }
  };

  // decrement qty in DB
  const decrementCart = async (id) => {
    try {
      await fetch(`http://localhost:7000/cart/update/${id}/DECREMENT`, {
        method: "PUT",
      });
      if (user?._id) fetchCart(user._id);
    } catch (err) {
      console.error("Error decrementing cart:", err);
    }
  };

  // get total
  const CartTotal = () =>
    cartState.reduce((acc, item) => acc + item.price * (item.qty || 1), 0);


         useEffect(() => {
         if (user?._id) {
      console.log("inside useEffect ID", user._id);
     fetchCart(user._id);
     }
    }, [user?._id]);   // dependency should include user

  
    










    return(
        <CartContext.Provider value = {{  cartState,addToCart,removeFromCart,clearCart,incrementCart,decrementCart,CartTotal}}>
            {children}
        </CartContext.Provider>
    )
}
export default CartProvider

  export const useCart = () => useContext(CartContext)