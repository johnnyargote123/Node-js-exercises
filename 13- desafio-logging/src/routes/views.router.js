import express from "express";
import {
  getChat,
  getRegister,
  getLogin,
  getCartPersonal,
  getHome,
  getRealTimeProducts,
  getProduct,
  getCurrentUser
} from "../controllers/views.controller.js";
import { checkLogged, checkLogin } from "../middlewares/auth.js";
import { authorizeUser } from "../middlewares/auth.js";
const router = express.Router();

router.get("/chat",checkLogin,authorizeUser(["USER"]), getChat);

router.get("/register", checkLogged, getRegister);

router.get("/login", checkLogged, getLogin);

router.get("/cart-personal", checkLogin, getCartPersonal);

router.get("/", checkLogin, getHome);

router.get("/current", checkLogin ,getCurrentUser )

router.get("/realtimeproducts", getRealTimeProducts);

router.get("/product/:id", checkLogin, getProduct);



export default router;