import express from "express"
import  ProductManager from "./producManager.js";
const app = express()
const manager = new ProductManager()



    let consulta = await manager.getProduct()



    app.get("/products", (req,res) => {

        const limit = req.query.limit

        if(!limit){
            res.send(consulta)
        }

        const limitNum = parseInt(limit)
        const limitDataCosulta = consulta.slice(0, limitNum)
        res.send(limitDataCosulta)
    })


    app.get("/products/:pid", (req, res) => {
        const idProducto = req.params.pid
        const producto = consulta.find((u) => u.id === idProducto)
        if(!producto) return res.send({ error: "usuario no encontrado"})
        res.send(producto)
    
    }) 

    app.listen(8082, () => {
        console.log("Servidor arriba en el puerto 8082")
    })
