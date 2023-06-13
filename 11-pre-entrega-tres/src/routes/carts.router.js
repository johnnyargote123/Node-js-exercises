import { Router } from "express";
import { authorizeUser } from "../middlewares/auth.js";
import {
  getAllCarts,
  getCartById,
  createCart,
  addProductToCart,
  removeProductFromCart,
  deleteCartById,
  updateCart,
  updateProductQuantity,
  purchaseCart
} from "../controllers/carts.controller.js";

const router = Router();

router.get("/", authorizeUser(["USER"]), getAllCarts);

router.get("/:id", authorizeUser(["USER"]), getCartById);

router.post("/", authorizeUser(["USER"]), createCart);

router.post("/:cid/product/:pid", authorizeUser(["USER"]), addProductToCart);


router.post('/:cid/purchase', purchaseCart);

router.delete("/:cid/products/:pid", removeProductFromCart);

router.delete("/:cid", authorizeUser(["USER"]),  deleteCartById);

router.put("/:cid", authorizeUser(["USER"]), updateCart);

router.put("/:cid/products/:pid", authorizeUser(["USER"]),  updateProductQuantity);


export default router;