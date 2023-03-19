import { Router } from "express";
import CartManager from "../cartManager.js";
import ProductManager from "../producManager.js";
const router = Router();
const manager = new CartManager();
const productManager = new ProductManager();
// en construccion !

router.get("/", async (req, res) => {
  try {
    let consulta = await manager.getCarts();


    // mensaje de error status 404 si no encuentra ningun usuario en arreglo [users]
    if (consulta.length === 0) {
      return res
        .status(404)
        .send({ status: "Error", message: "There are not carts registered" });
    }

    // mensaje de usuarios encontrados exitosamente status 200
    return res.status(200).send({ status: "OK", payload: consulta });
  } catch (error) {
    return res.status(404).send({status: "Error", message: "There are not carts registered"})
  }
});


router.get("/:id", async(req, res) => {

  try{
    let consulta = await manager.getCartById(Number(req.params.id))


    if(consulta.findIndex((v) => v.id === -1)){
      return res.status(200).send({ status: "OK", payload: consulta });
    }

  } catch (error) {
    return res.status(404).send({status: "Error", message: `Not found this card: ${req.params.id}`})
  }
})


router.post("/", async(req,res) => {
  try{
    let consulta = await manager.createCarts()
    return res.status(200).send({ status: "OK", payload: consulta });
  }catch (error) {
  return res.status(400).send({status: "Error", error: "Can not create Cart"})
}
})


router.post("/:cid/product/:pid", async(req,res) => {

  try{
  const cartId = Number(req.params.cid)
  const productId = Number(req.params.pid)
  const quantity = Number(req.query.quantity)


  let consultaCart = await manager.getCarts()
  let consultaProduct = await  productManager.getProduct()

  const ValidationCart =  consultaCart.findIndex((v) => v.id === cartId)
  const ValidationRpoduct =  consultaProduct.findIndex((v) => v.id === productId)

  if(ValidationCart !== -1 || ValidationRpoduct !== -1 ){


      let agregarProductoCarrito = await manager.AddProductToCard(cartId,productId,quantity)
      return res.status(200).send({ status: "OK", payload: agregarProductoCarrito });


  }
  else{
    return res.status(400).send({status: "Error", error: `Not found  cart: ${req.params.cid} or  product: ${req.params.pid} `})
  }






}catch (error) {

    //return res.status(400).send({status: "Error", error: `Not found ${req.params.cid} or ${req.params.pid} `})
 
  return res.status(400).send({status: "Error", error: `Can not add product to card ${req.params.cid}`})
}

})

export default router;
