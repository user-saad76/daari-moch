import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    streetAddress: { type: String ,  required: true  },
    city: { type: String ,  required: true },
    state: { type: String , required: true,},
    country: { type: String, required: true },
    postalCode: { type: String,  required: true },
  },
  { _id: false }
);

const paymentInfoSchema = new mongoose.Schema(
  {
    cardHolderName: { type: String },
    cardLast4Digits: { type: String },
    paymentProvider: { type: String }, // e.g., Stripe, PayPal
    providerCustomerId: { type: String },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 6,
    
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["customer", "admin", "moderator"],
      default: "customer",
    },
    avatar: {
      public_id: { type: String },
      secure_url: { type: String },
    },
    address: addressSchema,
    paymentInfo: paymentInfoSchema,
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
      },
    ],
    orderHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
