import express from "express"
import  ProductManager from "./producManager.js";
const app = express()
const manager = new ProductManager()



  



    app.get("/products", async (req,res) => {
        try {

        let consulta = await manager.getProduct()

        const limit = req.query.limit

        if(!limit){
            res.send(consulta)
        }
        else{
            const limitNum = parseInt(limit)
            const limitDataCosulta = consulta.slice(0, limitNum)
            res.send(limitDataCosulta)
        }

        
        } catch (error) {
            console.log(error)
        }
    
    })


    app.get("/products/:pid", async (req, res) => {
        try {
        let consulta = await manager.getProduct()

        const idProducto = req.params.pid
        const producto = consulta.find((u) => u.id === idProducto)
        if(!producto) return res.send({ error: "producto no encontrado"})
        res.send(producto)
    
        

    } catch (error) {
        console.log(error)
    }

    }) 

    app.listen(8082, () => {
        console.log("Servidor arriba en el puerto 8082")
    })
