import fs from "fs"
import ProductManager from "./producManager.js";
const manager = new ProductManager()

export default class CartManager  {
    constructor(){
        this.path = "./files/Cards.json"
        this.carts = []
        this.products = []
 
    }

    getCart = async() => {
        if(fs.existsSync(this.path || !this.carts)){
            const data = await fs.promises.readFile(this.path, "utf-8")
            const result = JSON.parse(data)
            return result
        }
        else{
            return this.carts
        }
      };

createCart = async() => {

  let consultaCarts = await this.getCart()
  const cart = {
    id: this.carts.length + 1,
    products: this.products
  };

  if(consultaCarts.length === 0){
    cart.id = 1
    }

    else{
        cart.id = consultaCarts[consultaCarts.length - 1].id + 1
    }
    consultaCarts.push(cart);
    await fs.promises.writeFile(this.path, JSON.stringify(productos, null, "\t"))
}

 addToCart = async( productId, quantity) => {

    let consultaProducts = await manager.getProduct()
    let consultaCarts = await this.getCart()

    const cart = {
        id: this.carts.length + 1,
        products: this.products
      };

      const product = {
        id: productId,
        quantity: quantity
      }

      const productToAdd = consultaProducts.find(product => product.id === productId)

      if (!productToAdd) {
        throw new Error('Product not found');
      }

      const existingProductIndex = consultaCarts.products.findIndex(product => product.id === productId);


      if (existingProductIndex !== -1) {
        // Product already exists in cart, update quantity
        consultaCarts.products[existingProductIndex].quantity += quantity;
      } else {
        // Product does not exist in cart, add it
        consultaCarts.products.push({
          id: productToAdd.id,
          quantity: quantity
        });
      }

      if(consultaCarts.length === 0){
        cart.id = 1
        }

        else{
            cart.id = consultaCarts[consultaCarts.length - 1].id + 1
        }
        consultaCarts.push(cart);
        await fs.promises.writeFile(this.path, JSON.stringify(productos, null, "\t"))
}

getCartsById = async(codeId) => {
  if(fs.existsSync(this.path)){
      const data = await fs.promises.readFile(this.path, "utf-8")
      const result = JSON.parse(data)
      const findCode = result.find((v) => v.id === codeId);

      if(findCode){
        const filterResult = result.filter((v) => v.id === codeId)
        return filterResult
      }        
      else{
        return  console.error(`Producto ${codeId} no encontrado`)
      }

     
  }

}
}