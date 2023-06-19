import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";
import { uploader } from "../utils.js";
import { authorizeUser } from "../middlewares/auth.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/",authorizeUser(["ADMIN"]), uploader.array("thumbnails", 5), createProduct);
router.put("/:id",authorizeUser(["ADMIN"]), updateProduct);
router.delete("/:id",authorizeUser(["ADMIN"]), deleteProduct);

export default router;