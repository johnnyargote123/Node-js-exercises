
import ProductManager from "../dao/fileManager/producManager.js";
import ProductManagerDB from "../dao/dbManager/productManager.js";
import CartManagerDB from "../dao/dbManager/cartManager.js";
import MessageManagerDB from "../dao/dbManager/messageManager.js";
import { checkLogged, checkLogin } from "../middlewares/auth.js";
import { Router } from "express";
const managerDB = new ProductManagerDB();
const messageManagerDB = new MessageManagerDB();
const cartManagerDB = new CartManagerDB()
const manager = new ProductManager();
const router = Router();


router.get("/chat", async (req, res) => {
  const messages = await messageManagerDB.getMessages();
  return res.render("messages");
});

router.get("/register", checkLogged,(req,res) => {
  res.render("register")
})

router.get("/login" ,checkLogged,(req,res) => {
  res.render("login")
})

router.get("/cart-personal",checkLogin, async (req, res) => {
  const carts = await cartManagerDB.getCarts()
  const cartsWithOwnProperties = carts.map(cart => {
    return {
      _id: cart._id,
      products: cart.products.map(productCart => {
        return {
          product: productCart.product,
          quantity: productCart.quantity,
          _id: productCart._id
        }
      })
    };
  });

  res.render("cart", {
    productsId$: cartsWithOwnProperties,
    style: "index.css"
  });

})

router.get("/", checkLogin, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const category = req.query.category || null;
  const status = req.query.status || null;
  const sort = req.query.sort || null;



  const products = await managerDB.getProductPage(page, limit, category, status, sort);
  const productsWithOwnProperties = products.docs.map(product => {
    return {
      id: product.id,
      status: product.status,
      title: product.title,
      stock: product.stock,
      category: product.category,
      description: product.description,
      code: product.code,
      price: product.price
    };
  });


  res.render("home", {
    products$: productsWithOwnProperties,
    currentPage: page,
    totalPages: products.totalPages,
    hasNextPage: products.hasNextPage,
    hasPrevPage: products.hasPrevPage,
    nextPage: page + 1,
    prevPage: page - 1,
    user: req.session.user,
    style: "index.css"
  });


});








//view working with socket -----------------------------------------

router.get("/realtimeproducts", async (req, res) => {
    let products = await managerDB.getProduct();
  //this prevent error in Handlebars
    const productsWithOwnProperties = products.map(product => {
      return {
        id: product.id,
        status: product.status,
        title: product.title,
        stock: product.stock,
        category: product.category,
        description: product.description,
        code: product.code,
        price: product.price
      };
    });
    res.render("realTimeProducts", { products$: productsWithOwnProperties, style: "index.css" });
  });


  router.get("/product/:id",checkLogin, async (req, res) => {
    const productId = req.params.id;
console.log(productId, 'holi')
    if(productId){
    const products = await managerDB.getProductById(productId);
    console.log(products?.title); // Verificar si products se establece correctamente
  
    const productsWithOwnProperties = {
      id: products?.id,
      status: products?.status,
      title: products?.title,
      stock: products?.stock,
      category: products?.category,
      description: products?.description,
      code: products?.code,
      price: products?.price
    };
  
    res.render("product", {
      productsId$: productsWithOwnProperties,
      style: "index.css"
    });
    }
  });
  export default router;