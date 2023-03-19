import { Router } from "express";
import ProductManager from "../producManager.js";
const router = Router()
const manager = new ProductManager()



  



router.get("/", async (req,res) => {
  try {

  let consulta = await manager.getProduct()

  const limit = req.query.limit

  if(!limit){
      res.send(consulta)
  }
  else{

    if(consulta.find((v) => v.id == parseInt(req.query.limit))){
      const limitNum = parseInt(limit)
      const limitDataCosulta = consulta.slice(0, limitNum)
      res.send(limitDataCosulta)
    }
    else{
      return res.status(404).send({status: "Error", message: "Product not found"})
    }

  }

  
  } catch (error) {
    return res.status(404).send({status: "Error", message: "There are not products registered"})
  }

})


router.get("/:id", async(req, res) => {

  try {
    let consulta = await manager.getProductById(Number(req.params.id))
    res.send(consulta)
  } catch (error) {
    return res.status(404).send({status: "Error", message: `Not found this product:${req.params.id}`})
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
        const imageUrl = `http://localhost:8080/images${file.filename}`;
        product.thumbnails.push(imageUrl);
      });
    }

    let consulta = await manager.getProduct();
    if (consulta.find((v) => v.code === product.code)) {
      return res
        .status(400)
        .send({ status: "Error", error: "value of object repeat" });
    }

    let crearProducto = await manager.addProduct(
      product.title,
      product.description,
      product.code,
      Number(product.price),
      product.thumbnails,
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


router.put("/:id", async(req, res) => {
  try{
  let consulta = await manager.getProduct()
  const userId = req.params.id
  let product = req.body

  const userIndex = consulta.findIndex((u) => u.id == Number(userId))

  if(userIndex === -1){
      return res.status(404).send({status:"Error", message:"Product not found"})
  }

  if(product.id){
      return res.status(400).send({status:"Error", message:"Cannot update product id"})
  }


  let crearProducto = await manager.UpdateProducId(Number(userId), product.title, product.description, product.code, product.price, product.thumbnails ,product.status, product.stock, product.category)
  return res.status(200).send({status: "OK", message: "Product succesfully updated"})
  }catch (error) {
    return res.status(400).send({status: "Error", error: "incomplete values"})
  }


  
})


router.delete("/:id", async(req,res) => {
  let consulta = await manager.getProduct()
  const userId = Number(req.params.id)

  const userIndex = consulta.findIndex((u) => u.id === userId)

  if(userIndex === -1){
    return res.status(404).status({status: "Error", message: "Product does not exist"})
  }

  let eliminarProducto = await manager.deleteProductId(userId) 

  return res.status(200).status({ status: "Succes", message: "Product succesfully deleted"} )
})


export default router