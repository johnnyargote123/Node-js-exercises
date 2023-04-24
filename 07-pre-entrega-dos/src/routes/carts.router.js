import { Router } from "express";
import CartManager from "../dao/fileManager/cartManager.js";
import ProductManager from "../dao/fileManager/producManager.js";
import ProductManagerDB from "../dao/dbManager/productManager.js";
import CartManagerDB from "../dao/dbManager/cartManager.js";
const router = Router();
//file system
const manager = new CartManager();
const productManager = new ProductManager();
//database
const managerCartDB = new CartManagerDB();
const productManagerDB = new ProductManagerDB();
router.get("/", async (req, res) => {
  try {
    let consulta = await managerCartDB.getCarts();


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
  try {
    const consulta = await managerCartDB.getCartById(req.params.id);
    if (consulta && consulta.id !== -1) {
      return res.status(200).send({ status: "OK", payload: consulta });
    }
    return res.status(404).send({status: "Error", message: `Not found this cart: ${req.params.id}`})
  } catch (error) {
    return res.status(404).send({status: "Error", message: `Not found this cart: ${req.params.id}`})
  }
})




router.post("/", async(req,res) => {
  try{
    let consulta = await managerCartDB.createCarts()
    return res.status(200).send({ status: "OK", payload: consulta });
  }catch (error) {
  return res.status(400).send({status: "Error", error: "Can not create Cart"})
}
})


router.post("/:cid/product/:pid", async(req,res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = Number(req.body.quantity);

    const consultaCart = await managerCartDB.getCartById(cartId);
    const consultaProduct = await productManagerDB.getProductById(productId);

    if (!consultaCart || !consultaProduct) {
      return res.status(400).send({ status: "Error", error: `Not found cart: ${cartId} or product: ${productId}` });
    }

    const agregarProductoCarrito = await managerCartDB.addProductToCart(cartId, productId, quantity);
    return res.status(200).send({ status: "OK", payload: agregarProductoCarrito });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ status: "Error", error: `Can not add product to card ${req.params.cid}` });
  }
});


router.delete('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;

  const result = await managerCartDB.removeProductFromCart(cid, pid);

  if (!result) {
    // Si result es null, significa que ocurrió un error en la función removeProductFromCart
    return res.status(500).send({status: "Error", error: `An error occurred while removing the product ${pid} from the cart` });
  }

  if (result === true) {
    // Si result es true, significa que el producto se eliminó correctamente del carrito
    return res.status(200).send({ status: "OK", payload:result, message: `Product ${pid} removed from cart successfully` });
  } else {
    // Si result no es null ni true, significa que hubo un problema al eliminar el producto del carrito
    return res.status(400).send({status: "Error", error: `Could not remove product ${pid} from cart` });
  }
});

router.delete('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  const result = await managerCartDB.deleteCartById(cartId);
  
  if (!result) {
    res.status(404).send({status: "Error",error: `Cart not found ${cartId}`});
  } else {
    res.status(200).send({status: "OK", payload:result, message:`Removed all items from the cart ${cartId}`});
  }
});

router.put('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const products = req.body.products;
  
    const updatedCart = await managerCartDB.updateCart(cartId, products);
  
    if (!updatedCart) {
      res.status(404).json({status: "Error", error: `Cart not found ${cartId}` });
      return;
    }
    else{
          res.status(200).send({status: "Ok",payload:updatedCart, message:`Cart ${cartId} was update` })
    }
  

  } catch (error) {
    console.error(error);
    res.status(500).send({status: "Error", error: 'There was an error updating the cart' });
  }
});

router.put('/:cid/products/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity;

  const updatedProduct = await managerCartDB.updateProductQuantity(cartId, productId, quantity);

  if (!updatedProduct) {
    return res.status(404).send({status: "Error",error:`Could not update product ${productId} from cart ${cartId}`});
  }
  else{
      return res.status(200).send({status: "Ok",payload:updatedProduct, message:  `the product ${productId} was successfully updated`});
  }


});

export default router;
