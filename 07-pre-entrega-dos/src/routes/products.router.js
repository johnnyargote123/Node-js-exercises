import { Router } from "express";
import ProductManager from "../dao/fileManager/producManager.js";
import ProductManagerDB from "../dao/dbManager/productManager.js";
import { uploader } from "../utils.js";

const router = Router();
const manager = new ProductManager();
const managerDB = new ProductManagerDB();

router.get("/", async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1
    const category = req.query.category 
    const status = req.query.status 
    const sort = req.query.sort

    if (isNaN(limit)) {
      return res
        .status(400)
        .send({ status: "Error", message: "Invalid value for limit" });
    }

      const products = await managerDB.getProductPage(page, limit, category, status, sort);
      const payload = {
        totalPages: products.totalPages,
        totalDocs: products.totalDocs,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage:products.hasPrevPage,
        hasNextPage:products.hasNextPage
      }
      


      if (products.hasPrevPage) {
        payload.prevLink = `/products?page=${products.prevPage}`;
      }
  
      if (products.hasNextPage) {
        payload.nextLink = `/products?page=${products.nextPage}`;
      }

      return res.status(200).send({ status: "success", payload: { ...products, ...payload } });
    
  } catch (error) {
    return res
      .status(404)
      .send({ status: "Error", message: "There are no products registered" });
  }
});

router.get("/:id", async(req, res) => {

  try {
    let consulta = await managerDB.getProductById(req.params.id)
    if(consulta){
      res.status(200).send({status: "success", payload: consulta})
    }
    else{
      return res.status(404).send({status: "Error", message: `Not found this product ID :${req.params.id}`})
    }

  } catch (error) {
    return res.status(404).send({status: "Error", message: `Not found this product ID :${req.params.id}`})
  }

})

router.post("/", uploader.array("thumbnails", 5), async (req, res) => {
  try {
    let product = req.body;
    const files = req.files;

    if (
      !product.title ||
      !product.description ||
      !product.code ||
      !product.price ||
      !product.status ||
      !product.stock ||
      !product.category
    ) {
      return res
        .status(400)
        .send({
          status: "Error",
          error: "incomplete values or file not uploaded",
        });
    }

    product.thumbnails = [];

    if (files) {
      files.forEach((file) => {
        const imageUrl = `http://localhost:8080/images/${file.filename}`;
        product.thumbnails.push(imageUrl);
      });
    }

    let consulta = await managerDB.getProduct();
    if (consulta.find((v) => v.code === product.code)) {
      return res
        .status(400)
        .send({ status: "Error", error: "value of object repeat" });
    }

    

    let crearProducto = await managerDB.addProduct(
      product.title,
      product.description,
      product.code,
      Number(product.price),
      JSON.stringify(product.thumbnails),
      Boolean(product.status),
      Number(product.stock),
      product.category
    );

    return res
      .status(201)
      .send({
        status: "Success",
        meessage: `Product created ${crearProducto}`,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ status: "Error", error: "Error creating product" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    let consulta = await managerDB.getProduct();
    const userId = req.params.id;
    let product = req.body;

    const userIndex = consulta.findIndex((u) => u._id == userId);
    if (userIndex === -1) {
      return res
        .status(404)
        .send({ status: "Error", message: "Product not found" });
    }

    if (product.id) {
      return res
        .status(400)
        .send({ status: "Error", message: "Cannot update product id" });
    }
    let crearProducto = await managerDB.updateProductById(
      userId,
      product.title,
      product.description,
      product.code,
      product.price,
      product.thumbnails,
      product.status,
      product.stock,
      product.category
    );
    return res
      .status(200)
      .send({ status: "OK", message: "Product succesfully updated" });
  } catch (error) {
    return res
      .status(400)
      .send({ status: "Error", error: "incomplete values" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
  let consulta = await managerDB.getProduct();
  const userId = req.params.id;

  const userIndex = consulta.findIndex((u) => u._id == userId);
  console.log(userIndex)
  if (userIndex == -1) {
    return res.status(404).send({ status: "Error", message: "Product does not exist" });
  }
  else{

    let eliminarProducto = await managerDB.deleteProductId(userId);

    return res
      .status(200)
      .send({ status: "Succes", message: "Product succesfully deleted" });
  }
} catch (error) {
  return res.status(404).send({ status: "Error", message: "Product does not exist" });
}
});





export default router;
