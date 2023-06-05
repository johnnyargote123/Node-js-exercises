import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";
import { uploader } from "../utils.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", uploader.array("thumbnails", 5), createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;