import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  
  category: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  stockQuantity: {
    type: Number,
    required:true // Default to zero if not specified
  },
  
}, );
const Product = mongoose.model("Product", productSchema);
export default Product;