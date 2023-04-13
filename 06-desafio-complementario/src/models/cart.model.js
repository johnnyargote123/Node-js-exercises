import mongoose from "mongoose";

const cartCollection = "carts";

const cartproductSchema = new mongoose.Schema({
    _id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true 
    },
  quantity: { 
    type: Number, 
    required: true 
},
});

const cartSchema = new mongoose.Schema({
  products: [{ 
    type: cartproductSchema
}],
});


const cartModel = mongoose.model(cartCollection, cartSchema);


export {cartModel}