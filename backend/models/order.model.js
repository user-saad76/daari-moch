import mongoose from "mongoose";

const lineItemSchema = new mongoose.Schema({
  productId: { type: String }, // Your internal product ID (optional if you have one)
  stripePriceId: { type: String }, // Stripe price id (e.g., price_123)
  stripeProductId: { type: String }, // Stripe product id (e.g., prod_123)
  name: { type: String, required: true }, // Item name
  description: { type: String }, // Item description (if available)
  quantity: { type: Number, required: true },
  currency: { type: String, required: true },
  amountSubtotal: { type: Number, required: true }, // before tax/discount (in cents)
  amountTotal: { type: Number, required: true }, // after tax/discount (in cents)
});

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Link to your user (optional)
    stripeSessionId: { type: String, required: true },
    stripePaymentIntentId: { type: String },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "canceled"],
      default: "unpaid",
    },
    customerEmail: { type: String },
    customerName: { type: String },
    shippingAddress: {
      line1: { type: String },
      line2: { type: String },
      city: { type: String },
      state: { type: String },
      postal_code: { type: String },
      country: { type: String },
    },
    customer: {
    name: String,
    email: String,
    country: String,
  },
    lineItems: [lineItemSchema], // array of products
    amountSubtotal: { type: Number, required: true },
    amountTotal: { type: Number, required: true },
    currency: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;


