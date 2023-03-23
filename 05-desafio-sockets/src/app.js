import express from "express";
import productRouter from "./routes/products.router.js";
import cardRouter from "./routes/carts.router.js"
import handlebars from "express-handlebars";
import __dirname from "./utils.js"
import ProductManager from "./producManager.js";
import sass from 'node-sass';
const manager = new ProductManager();

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(`${__dirname}/public`))

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use("/api/products/", productRouter)
app.use("/api/carts/", cardRouter)



app.get("/", async(req, res) => {
    let products = await manager.getProduct();
    res.render("home", {products$: products, style: "index.css"} );
  });


app.listen(8080, () => {
    console.log("Listening on port 8080")
})

