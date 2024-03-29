import CartManager from "../../dao/fileManager/cartManager.js";
import ProductManagerDB from "../../dao/dbManager/productManager.js";
import CartManagerDB from "../../dao/dbManager/cartManager.js";

// Crea instancias de los gestores de acceso a datos
const cartManager = new CartManager();
const productManagerDB = new ProductManagerDB();
const cartManagerDB = new CartManagerDB();

// Repositorio para la entidad "Cart"
 class CartRepository {
  async getAllCarts() {
    try {
      let consulta = await cartManagerDB.getCarts();

      if (consulta.length === 0) {
        throw new Error("There are no carts registered");
      }

      return consulta;
    } catch (error) {
      throw new Error("Internal server error");
    }
  }

  async getCartById(id) {
    try {
      const consulta = await cartManagerDB.getCartById(id);
      if (consulta && consulta.id !== -1) {
        return consulta;
      }
      throw new Error(`Cart not found: ${id}`);
    } catch (error) {
      throw new Error("Internal server error");
    }
  }

  async createCart() {
    try {
      let consulta = await cartManagerDB.createCarts();
      return consulta;
    } catch (error) {
      throw new Error("Can not create Cart");
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const consultaCart = await cartManagerDB.getCartById(cartId);
      const consultaProduct = await productManagerDB.getProductById(productId);

      if (!consultaCart || !consultaProduct) {
        throw new Error(`Cart (${cartId}) or product (${productId}) not found`);
      }

      const agregarProductoCarrito = await cartManagerDB.addProductToCart(
        cartId,
        productId,
        quantity
      );
      return agregarProductoCarrito;
    } catch (error) {
      throw new Error(`Can not add product to cart ${cartId}`);
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
      const result = await cartManagerDB.removeProductFromCart(cartId, productId);

      if (result === null) {
        throw new Error(`An error occurred while removing the product (${productId}) from the cart (${cartId})`);
      }

      return result;
    } catch (error) {
      throw new Error(`Could not remove product (${productId}) from cart (${cartId})`);
    }
  }

  async deleteCartById(cartId) {
    try {
      const result = await cartManagerDB.deleteCartById(cartId);

      if (!result) {
        throw new Error(`Cart not found (${cartId})`);
      }

      return result;
    } catch (error) {
      throw new Error(`An error occurred while deleting the cart (${cartId})`);
    }
  }

  async updateCart(cartId, products) {
    try {
      const updatedCart = await cartManagerDB.updateCart(cartId, products);

      if (!updatedCart) {
        throw new Error(`Cart not found (${cartId})`);
      }

      return updatedCart;
    } catch (error) {
      throw new Error("There was an error updating the cart");
    }
  }

  async updateProductQuantity(cartId, productId, quantity) {
    try {
      const updatedProduct = await cartManagerDB.updateProductQuantity(
        cartId,
        productId,
        quantity
      );

      if (!updatedProduct) {
        throw new Error(`Could not update product (${productId}) from cart (${cartId})`);
      }

      return updatedProduct;
    } catch (error) {
      throw new Error("An error occurred while updating the product quantity");
    }
  }
}

export const cartsRepository = new CartRepository()