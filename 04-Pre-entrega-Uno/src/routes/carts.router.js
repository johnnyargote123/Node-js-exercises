import { Router } from "express";
import CartManager from "../cartManager.js";
const router = Router()
const manager = new CartManager()

// en construccion !

router.get("/", async (req,res) => {

  })

  router.post("/:cid/product/:pid",async (req,res) => {
    try{
      let carts = req.body


      let consulta = await manager.getCart()
      if( consulta.find((v) => v.id === carts.id) ){
        return res.status(400).send({status: "Error", error: "value of object repeat"})
      }
      else{
        let agregarCarrito = await manager.addToCart(1,3)
        return res.status(201).send({status: "Success", meessage: `User created ${agregarCarrito}`})
      }




    }
  
    catch (error) {
     return res.status(404).send({status: "Error", message: "There are not products registered"})
   }
})

  router.post("/",async (req,res) => {

      let create = await manager.createCart()
      return res.status(201).send({status: "Success", meessage: `User created`})


  })

  export default router