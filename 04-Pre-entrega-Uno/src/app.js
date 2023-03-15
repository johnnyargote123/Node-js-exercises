import express from "express";
import productRouter from "./routes/products.router.js";
import cardRouter from "./routes/carts.router.js"

const app = express()

app.use(express.json())

app.use("/api/products/", productRouter)
app.use("/api/carts/", cardRouter)

app.listen(8080, () => {
    console.log("Listening on port 8080")
})

