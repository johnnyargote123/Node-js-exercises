
import ProductManager from "../dao/fileManager/producManager.js";
import ProductManagerDB from "../dao/dbManager/productManager.js";
import MessageManagerDB from "../dao/dbManager/messageManager.js";
import { Router } from "express";

const managerDB = new ProductManagerDB();
const messageManagerDB = new MessageManagerDB();
const manager = new ProductManager();
const router = Router();

router.get("/", async (req, res) => {
  let products = await managerDB.getProduct();
  
  //this prevent error in Handlebars
  const productsWithOwnProperties = products.map(product => {
    return {
      id: product.id,
      status: product.status,
      title: product.title,
      stock: product.stock,
      category: product.category,
      description: product.description,
      code: product.code,
      price: product.price
    };
  });
  
  res.render("home", { products$: productsWithOwnProperties, style: "index.css" });
});


//view working with socket -----------------------------------------

router.get("/realtimeproducts", async (req, res) => {
    let products = await managerDB.getProduct();
  //this prevent error in Handlebars
    const productsWithOwnProperties = products.map(product => {
      return {
        id: product.id,
        status: product.status,
        title: product.title,
        stock: product.stock,
        category: product.category,
        description: product.description,
        code: product.code,
        price: product.price
      };
    });
    res.render("realTimeProducts", { products$: productsWithOwnProperties, style: "index.css" });
  });

  router.get("/chat", async (req, res) => {
    const messages = await messageManagerDB.getMessages();
    return res.render("messages");
  });

  export default router;