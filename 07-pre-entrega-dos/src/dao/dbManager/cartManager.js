import { cartModel } from "../../models/cart.model.js";
import { productModel } from "../../models/product.model.js";
import mongoose from 'mongoose';
export default class cartManager {
    constructor(){}


    getCarts = async () => {
        try {
          const carts = await cartModel.find()
          return carts;
        } catch (error) {
          console.error(error);
          return null;
        }
      };


    createCarts = async () => {
        try {
            const consultaCart = await cartModel.find()
    
            const cart = new cartModel({
                products: this.productsObject
            });
    
            await cart.save();
        } catch (error) {
            console.error(error);
        }
    };
      

    getCartById = async (codeId) => {
        try {
          const objectId = new mongoose.Types.ObjectId(codeId);
          const cart = await cartModel.findById(objectId);
      
          if (!cart) {
            console.error(`Carrito ${codeId} no encontrado`);
            return null;
          }
      
          return [cart];
        } catch (error) {
          console.error(error);
          return null;
        }
      };
      addProductToCart = async (cartId, productId, quantity) => {
        try {
          const productIdSave = new mongoose.Types.ObjectId(productId);
          const cartIdSave = new mongoose.Types.ObjectId(cartId);
          const cart = await cartModel.findById(cartIdSave);
          const product = await productModel.findById(productIdSave);
      
          if (!cart) {
            console.error(`No se encontró el carrito ${cartId} al que desea agregar productos`);
            return null;
          }
      
          if (!product) {
            console.error(`Producto ${productId} no encontrado`);
            return null;
          }
      
          const existingProductIndex = cart.products.findIndex(
            (product) => product._id.toString() === productId
          );
      
          if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity += quantity;
            await cart.save();
            return cart.products[existingProductIndex];
          } else {
            const newProduct = {
              _id: productIdSave,
              quantity: quantity,
            };
            cart.products.push(newProduct);
            await cart.save();
            return newProduct;
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      };
    }