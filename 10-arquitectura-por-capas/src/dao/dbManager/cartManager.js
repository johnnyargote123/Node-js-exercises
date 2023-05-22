import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";
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
        const cart = await cartModel.findOne(objectId);
        
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
      

      deleteCartById = async (cartId) => {
        try {
          const cartIdSave = new mongoose.Types.ObjectId(cartId);
          const cart = await cartModel.findById(cartIdSave);
        
          if (!cart) {
            console.error(`No se encontró el carrito ${cartId}`);
            return null;
          }
        
          cart.products = [];
          await cart.save();
        
          console.log(`Se eliminaron todos los productos del carrito ${cartId}`);
          return cart;
        } catch (error) {
          console.error(error);
          return null;
        }
      };
      addProductToCart = async (cartId, productId, quantity) => {
        try {
          const productIdSave = new mongoose.Types.ObjectId(productId);
          const cartIdSave = new mongoose.Types.ObjectId(cartId);
          const cart = await cartModel
            .findById(cartIdSave)
          const product = await productModel.findById(productIdSave);
      
          if (!cart) {
            console.error(`No se encontró el carrito ${cartId} al que desea agregar productos`);
            return null;
          }
      
          if (!product) {
            console.error(`Producto ${productId} no encontrado`);
            return null;
          }
      
          const existingProduct = cart.products.find(
            (product) => product.product._id.toString() === productId
          );
      
          if (existingProduct) {
            existingProduct.quantity += quantity;
            await cart.save();
            return existingProduct;
          } else {
            const newProduct = {
              product: productIdSave,
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

      removeProductFromCart = async (cartId, productId) => {
        try {
          const cartObjectId = new mongoose.Types.ObjectId(cartId);
          const productObjectId = new mongoose.Types.ObjectId(productId);
      
          const cart = await cartModel.findById(cartObjectId);
      
          if (!cart) {
            console.error(`No se encontró el carrito ${cartId} del que desea eliminar el producto`);
            return null;
          }
      
          const existingProductIndex = cart.products.findIndex(
            (product) => product._id.toString() === productId
          );
      
          if (existingProductIndex === -1) {
            console.error(`Producto ${productId} no encontrado en el carrito ${cartId}`);
            return null;
          }
      
          cart.products.splice(existingProductIndex, 1);
          await cart.save();
      
          return true;
        } catch (error) {
          console.error(`Se produjo un error al eliminar el producto del carrito: ${error}`);
          return null;
        }
      };

      updateCart = async (cartId, products) => {
        try {
          const cartIdSave = new mongoose.Types.ObjectId(cartId);
          const cart = await cartModel.findById(cartIdSave);
        
          if (!cart) {
            console.error(`No se encontró el carrito ${cartId}`);
            return null;
          }
        
          const updatedProducts = products.map((product) => {
            return {
              _id: product._id,
              quantity: product.quantity
            };
          });
        
          cart.products = updatedProducts;
          await cart.save();
        
          console.log(`Se actualizó el carrito ${cartId} con los nuevos productos`);
          return cart;
        } catch (error) {
          console.error(error);
          return null;
        }
      };

      updateProductQuantity = async (cartId, productId, quantity) => {
        try {
          const cartObjectId = new mongoose.Types.ObjectId(cartId);
          const productObjectId = new mongoose.Types.ObjectId(productId);
          const cart = await cartModel.findById(cartObjectId);
      
          if (!cart) {
            console.error(`No se encontró el carrito ${cartId}`);
            return null;
          }
      
          const existingProductIndex = cart.products.findIndex(
            (product) => product._id.toString() === productObjectId.toString()
          );
      
          if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity = quantity;
            await cart.save();
            return cart.products[existingProductIndex];
          } else {
            console.error(`Producto ${productId} no encontrado en el carrito ${cartId}`);
            return null;
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      };
    }