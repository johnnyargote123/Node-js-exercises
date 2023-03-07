import  ProductManager from "./desafio-manejo-archivos.js";


//para la importacion se debe agreegar el package json con el codigo [npm init -y]
// luego se debe agregar en package json ["type":"module",] 

const manager = new ProductManager()

const env = async() => {
    let consulta = await manager.getProduct()
    console.log("primeraConsulta---------------------->")
    console.log("------------------------------------->")
    console.log(consulta)

    let title= "Teclado Multimedia Usb Omega Kb-2000"
    let result = await manager.addProduct(
        "Teclado Multimedia Usb Omega Kb-2000",
        "Este teclado Omega es el mejor complemento para hacer todo tipo de actividades. Es cómodo y práctico al momento de redactar documentos, navegar y hacer búsquedas por internet, ya sea en tu trabajo o en la comodidad del hogar.",
        25900,
        "https://http2.mlstatic.com/D_NQ_NP_697288-MCO47769752960_102021-O.webp",
        10,
        40
      )
      console.log("------------------------------------->")
      console.log( `Producto${title} agregado----------> `)
      console.log(result)
    
      let idFilter = 2
    let filterProduct = await manager.getProductById(idFilter)
      if(filterProduct){
      console.log("------------------------------------->")
      console.log(`Producto ${idFilter} encontrado------>`)
      console.log(filterProduct)
      }
      else{
        console.log("------------------------------------->")
      }



let idUpdate = 3
let reuslt2 = await manager.UpdateProducId(idUpdate,"Este tambien lo actualice",
"Este teclado Omega es el mejor complemento para hacer todo tipo de actividades. Es cómodo y práctico al momento de redactar documentos, navegar y hacer búsquedas por internet, ya sea en tu trabajo o en la comodidad del hogar.",
25900,
"https://http2.mlstatic.com/D_NQ_NP_697288-MCO47769752960_102021-O.webp",
9,
40)

if(reuslt2){
      console.log("-------------------------------------------------->")
      console.log(`Consulta con producto ${idUpdate} actualizado----->`)
      console.log(reuslt2)
}
else{
  console.log("------------------------------------->")
}
      let idDelete = 8
    let resultDelete = await manager.deleteProductId(idDelete)

    if(resultDelete){
    console.log("------------------------------------------------->")
    console.log(`Consulta con producto ${idDelete} borrado-------->`)
    console.log(resultDelete)
    }
    else{
      console.log("------------------------------------->")
    }
    console.log("------------------------------------->")
    console.log("consulta final----------------------->")
    console.log(consulta)
}


env()