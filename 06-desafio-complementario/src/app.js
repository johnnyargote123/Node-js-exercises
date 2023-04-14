import express from "express";
import productRouter from "./routes/products.router.js";
import cardRouter from "./routes/carts.router.js";
import viewRouter from "./routes/views.router.js";
import socket from "./socket.js";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");


app.use(express.json())
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME
const httpServer =  app.listen (8080, () => {
  console.log("Listening on port 8080");
});

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.qdsizsu.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`)


app.use("/api/products/", productRouter);
app.use("/api/carts/", cardRouter);
app.use("/", viewRouter);


socket.connect(httpServer);



  


