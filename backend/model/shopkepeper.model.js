import mongoose from "mongoose";
const shopkeeperSchema = new mongoose.Schema({
  
  name: {  
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,     
  },
    phone: {    
        type: Number,
        required: true,
    },
    address: {  
        type: String,
        required: true,
    },
    shop_keeper:{
        type: Boolean,
        default: true, // Default to true if not specified
    }
});
const Shopkeeper = mongoose.model("Shopkeeper", shopkeeperSchema);
export default Shopkeeper;