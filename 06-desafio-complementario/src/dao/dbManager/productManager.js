import { productModel } from "../../models/product.model.js";
import socket from "../../socket.js";
import mongoose from 'mongoose';
export default class ProducManager {
  constructor() {}

  getProduct = async () => {
    try {
      const products = await productModel.find();
      return products;
    } catch (error) {
      console.error(error);
    }
  };

  addProduct = async (
    title,
    description,
    code,
    price,
    thumbnail,
    status,
    stock,
    category
  ) => {
    try {
      const productos = await productModel.find();
      const findCode = productos.find((v) => v.code === code);

      if (!findCode) {
        const newProduct = new productModel({
          title,
          description,
          code,
          price,
          thumbnail,
          status,
          stock,
          category,
        });

        await newProduct.save();
        socket.io.emit("add-product", newProduct);
      } else {
        console.log("No se puede repetir el codigo:", code);
      }
    } catch (error) {
      console.error(error);
    }
  };

  getProductById = async (codeId) => {
    try {
        const objectId = new mongoose.Types.ObjectId(codeId);
      const product = await productModel.findById(objectId);

      if (product) {
        return product;
      } else {
        throw new Error(`Producto ${codeId} no encontrado`);
      }
    } catch (error) {
      console.error(error);
    }
  };

   updateProductById = async (codeId, title, description, code, price, thumbnail, status, stock, category) => {
    try {
      const product = await productModel.findOne({ code: codeId });
      if (!product) {
        throw new Error(`El producto con id ${codeId} no se encontró`);
      }
  
      // valores que se desean cambiar
      product.title = title || product.title;
      product.description = description || product.description;
      product.code = code || product.code;
      product.price = price || product.price;
      product.thumbnail = thumbnail || product.thumbnail;
      product.status = status || product.status;
      product.stock = stock || product.stock;
      product.category = category || product.category;
  
      // actualiza el producto
      const updatedProduct = await product.save();
      return updatedProduct;
    } catch (error) {
      console.error(error);
    }
  };


  deleteProductId = async (codeId) => {
    const deletedProduct = await productModel.findOneAndDelete({ code: codeId });
    
    if (!deletedProduct) {
      throw new Error(`El producto ${codeId} no existe, no se puede borrar.`);
    }
    
    return deletedProduct;
  };
}
