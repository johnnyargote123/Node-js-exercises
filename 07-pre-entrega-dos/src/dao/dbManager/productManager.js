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
      const objectId = new mongoose.Types.ObjectId(codeId);
      const product = await productModel.findOne(objectId);
      if (!product) {
        throw new Error(`El producto con id ${codeId} no se encontró`);
      }
 


      // valores que se desean cambiar
      product.title = title === undefined ? product.title: title;
      product.description = description === undefined ? product.description : description;
      product.code = code === undefined ?  product.code : code;
      product.price = price === undefined ?  product.price: code;
      product.thumbnail = thumbnail === undefined ? product.thumbnail: thumbnail ;
      product.status = status === undefined ?  product.status: status;
      product.stock = stock === undefined ? product.stock: stock;
      product.category = category === undefined ? product.category: category;

      // actualiza el producto
      const updatedProduct = await product.save();
      return updatedProduct;
    } catch (error) {
      console.error(error);
    }
  };


  deleteProductId = async (codeId) => {

    const objectId = new mongoose.Types.ObjectId(codeId);
    const deletedProduct = await productModel.findById(objectId);
    
    if (!deletedProduct) {
      throw new Error(`El producto ${codeId} no existe, no se puede borrar.`);
    }
    else{
       await productModel.findOneAndDelete(objectId);
       socket.io.emit("remove-product", objectId)
    }
    
    return deletedProduct;
  };
}
