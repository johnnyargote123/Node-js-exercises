import { Router } from "express";
import {
  getAllCarts,
  getCartById,
  createCart,
  addProductToCart,
  removeProductFromCart,
  deleteCartById,
  updateCart,
  updateProductQuantity,
} from "../controllers/carts.controller.js";

const router = Router();

router.get("/", getAllCarts);

router.get("/:id", getCartById);

router.post("/", createCart);

router.post("/:cid/product/:pid", addProductToCart);

router.delete("/:cid/products/:pid", removeProductFromCart);

router.delete("/:cid", deleteCartById);

router.put("/:cid", updateCart);

router.put("/:cid/products/:pid", updateProductQuantity);

export default router;