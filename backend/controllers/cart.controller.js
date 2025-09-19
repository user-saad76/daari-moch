import Cart from '../models/cart.model.js'
export const addToCart = async (req, res) => {
  const { productId, title: name, price } = req.body; // ✅ expect productId, not _id
  const { userId } = req.params;

  try {
    const cart = await getUserCart(userId);

    // check if product already in cart
    const item = cart.items.find(i => i.productId.toString() === productId);

    if (item) {
      item.qty += 1;
    } else {
      cart.items.push({ productId, name, price, qty: 1 });
    }

    await cart.save();
    res.json({ success: true, items: cart.items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeFromCart =  async(req,res)=>{
    const { productId,userId } = req.params;
    console.log("productID and UserID",{ productId,userId })
  try {
    const cart = await getUserCart(userId);
    cart.items = cart.items.filter(i => i.productId.toString() !== productId);

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
export const clearCart =  async(req,res)=>{
     try {
         const cart = await getUserCart(req.params.userId);
         cart.items = [];
         await cart.save();
         res.json(cart)
    } catch (error) {
         res.status(500).json({ error: error.message });
    }
}
export const updateCart = async (req, res) => {
  try {
    const { id, type } = req.params; // id = cart item's _id
    if (!id || !type) {
      return res.status(400).json({ success: false, message: "Invalid request" });
    }

    // Find the cart that contains this item
    const cart = await Cart.findOne({ "items._id": id });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const item = cart.items.id(id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    if (type === "INCREMENT") {
      item.qty += 1;
    } else if (type === "DECREMENT") {
      if (item.qty > 1) {
        item.qty -= 1;
      }
    }

    await cart.save();

    return res.json({
      success: true,
      items: cart.items,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message:
        error?.message || "Could not update item in the cart, please try again",
    });
  }
};
export const getAllCartItemsByUser =  async(req,res)=>{
      try {
        const {userId} = req.params;
        console.log("+++++++",userId)
       const cartItems = await Cart.findOne({userId})
          res.status(200).json({
         success:true,
           data: cartItems?.items || []
       })
       console.log('cartItems',cartItems);
       
    } catch (error) {
        console.log(error) 
       res.json({
         success:false,
         message:error?.message ||'Could not get items to the cart,Please try again'
       }) 
    }
}
export const getSingleCartItem =  async(req,res)=>{
     try {
        const {id} = req.params 
        const cartItem = await Cart.findById(id)
         res.status(201).json({
         success:true,
          cartItem
       })
    } catch (error) {
        console.log(error) 
       res.json({
         success:false,
         message:error?.message ||'Could not get item to the cart,Please try again'
       })  
    }
}

export const getUserCart =  async(userId)=>{
   let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }
  return cart;
}