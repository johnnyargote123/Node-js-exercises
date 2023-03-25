
import ProductManager from "../producManager.js";
import { Router } from "express";
const manager = new ProductManager();
const router = Router();



router.get("/", async (req, res) => {
    let products = await manager.getProduct();
    res.render("home", { products$: products, style: "index.css" });
  });


//view working with socket -----------------------------------------

router.get("/realtimeproducts", async (req, res) => {
    let products = await manager.getProduct();
    res.render("realTimeProducts", { products$: products, style: "index.css" });
  });


  export default router;