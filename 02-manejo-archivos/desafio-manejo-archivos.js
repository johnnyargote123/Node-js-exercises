import fs from "fs"

export default class ProductManager  {

    constructor(){
        this.path = "./files/Productos.json"
        this.products = []
 
    }

    getProduct = async() => {
        if(fs.existsSync(this.path || !this.products)){
            const data = await fs.promises.readFile(this.path, "utf-8")
            const result = JSON.parse(data)
            return result
        }
        else{
            return this.products
        }
      };

      addProduct = async(title, description, price, thumbnail, code, stock) => {

        const productos = await this.getProduct()

        const product = {
            id: this.products.length + 1,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
          };

          const findCode = productos.find((v) => v.code === code);
          if (!findCode) {
            this.#productValueUndefined(
              product.title,
              product.description,
              product.price,
              product.thumbnail,
              product.code,
              product.stock,
              product
            );
            return product

        }
        if (findCode) {
          console.log("------------------------------------->")
          console.log("No se puede repetir el codigo:", code );
        }

      }


      #productValueUndefined = async(
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        product
      ) => {
        if (
          title != undefined &&
          description != undefined &&
          price != undefined &&
          thumbnail != undefined  &&
          code != undefined &&
          stock != undefined 
        ) {
          const productos = await this.getProduct()

        if(productos.length === 0){
            product.id = 1
        }

        else{
            product.id = productos[productos.length - 1].id + 1
        }

        productos.push(product)

        await fs.promises.writeFile(this.path, JSON.stringify(productos, null, "\t"))
          
        } else {
          Object.prototype.getKey = function (value) {
            for (let key in this) {
              if (this[key] == value) {
                return key;
              }
            }
          };
          console.log("------------------------------------------>");
          console.log("ERROR: Deben llenarse todos los campos del producto");
          console.log(
            `El valor faltante es: ${product.getKey(undefined)?.toUpperCase()}`
          );
        }
      };

      getProductById = async(codeId) => {
        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, "utf-8")
            const result = JSON.parse(data)
            const findCode = result.find((v) => v.id === codeId);

            if(!findCode){

              return  console.error(`Producto ${codeId} no encontrado`)
            }        
            else{
              const filterResult = result.filter((v) => v.id === codeId)
              return filterResult
            }

           
        }

      }

      UpdateProducId = async(codeId,title, description, price, thumbnail, code, stock) => {
        const data = await fs.promises.readFile(this.path, "utf-8")
        const result = JSON.parse(data)
        const index = result.findIndex((v) => v.id === codeId)

        if(index === -1){
          console.error(`No se encontro el producto ${codeId}  a actualizar`)
          return 
        }
        else{
                 // valores que se desean cambiar
        result[index].title = title
        result[index].description = description
        result[index].price = price
        result[index].thumbnail = thumbnail
        result[index].code = code
        result[index].stock = stock


        // modelo del producto a actualizar
        const updatedProduct = {
            id: result[index].id,
            title: result[index].title,
            description: result[index].description,
            price: result[index].price,
            thumbnail: result[index].thumbnail,
            code: result[index].code,
            stock: result[index].stock
        };

               // validacion de existencia del producto a actualizar 
               if (index !== -1) {
                result[index] = updatedProduct;
              } else {
                throw new Error(`El producto con id ${codeId} no se encontro`);
              }
            
            await fs.promises.writeFile(this.path, JSON.stringify(result, null, "\t"))
            return updatedProduct
 
        }

      }

    deleteProductId = async(codeId) => {
        const data = await fs.promises.readFile(this.path, "utf-8")
        const result = JSON.parse(data)
        const ProducToDelete = result.find((v) => v.id === codeId)


        if (!ProducToDelete) {
            console.log(`El producto ${codeId} no existe asi que no se puede borrar`)
          }
          else{
            result.splice(result.indexOf(ProducToDelete), 1)
            await fs.promises.writeFile(this.path, JSON.stringify(result, null, "\t"))
            return ProducToDelete
          }
    }

}