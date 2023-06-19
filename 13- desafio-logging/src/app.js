import express from "express";
import productRouter from "./routes/products.router.js";
import cardRouter from "./routes/carts.router.js";
import viewRouter from "./routes/views.router.js";
import mockingproductsRouter from "./routes/mockingproducts.router.js"
import socket from "./socket.js";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import morgan from "morgan";
import sessionsRouter from "./routes/sessions.router.js";
import config from "./config/config.js";
import database from "./db.js";
import passport from "passport";
import initializePassport from "./auth/passport.js";
import { errorMiddleware } from "./errors/error.middleware.js";
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(morgan("dev"))
app.use(
  session({
    store: MongoStore.create({
        mongoUrl: config.dbUrl,
        ttl: 60,

    }),
    resave: false,
    saveUninitialized: false,
    secret: config.sessionSecret,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());


app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

// conexion con database
database.connect();



app.use("/api/sessions", sessionsRouter);
app.use("/api/products/", productRouter);
app.use("/api/carts/", cardRouter);
app.use("/", viewRouter);
app.use("/api",mockingproductsRouter)
app.use(errorMiddleware)


const httpServer =  app.listen (8080, () => {
  console.log("Listening on port 8080");
});


socket.connect(httpServer);



  


