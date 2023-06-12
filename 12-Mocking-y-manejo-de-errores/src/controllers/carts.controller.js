import { cartService } from "../services/carts.service.js";
import {productService} from "../services/products.service.js";
import {ticketService} from "../services/ticket.service.js";
export const getAllCarts = async (req, res) => {
  try {
    const carts = await cartService.getAllCarts();
    res.json(carts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCartById = async (req, res) => {
  const id  = req.params.id
  try {
    const cart = await cartService.getCartById(id);
    res.json(cart);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const createCart = async (req, res) => {
  try {
    const cart = await cartService.createCart();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Can not create Cart" });
  }
};

export const addProductToCart = async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = Number(req.body.quantity);
  try {
    const updatedCart = await cartService.addProductToCart(cartId, productId, quantity);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: `Can not add product to cart ${cartId}` });
  }
};

export const removeProductFromCart = async (req, res) => {
  const { cartId, productId } = req.params;
  try {
    const result = await cartService.removeProductFromCart(cartId, productId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: `Could not remove product (${productId}) from cart (${cartId})` });
  }
};

export const deleteCartById = async (req, res) => {
  const cartId = req.params.cid;
  try {
    const result = await cartService.deleteCartById(cartId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: `An error occurred while deleting the cart (${cartId})` });
  }
};

export const updateCart = async (req, res) => {
  const cartId = req.params.cid;
  const products = req.body.products;
  try {
    const updatedCart = await cartService.updateCart(cartId, products);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: "There was an error updating the cart" });
  }
};

export const updateProductQuantity = async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity;
  try {
    const updatedProduct = await cartService.updateProductQuantity(cartId, productId, quantity);
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the product quantity" });
  }

  
};

export const purchaseCart = async (req, res) => {
  const cartId = req.params.cid;
  console.log(cartId, )

    const cart = await cartService.getCartById(cartId);
    const productsToPurchase = [];

  
  for (const cartProduct of cart.products) {
    const { product, quantity } = cartProduct;
    //console.log(product)
     // console.log(product._id)
     //console.log(quantity , 'cantidad')
    const availableStock = await productService.getAvailableStock(product._id);
    //console.log(availableStock, 'stock')
    if (availableStock >= quantity) {
      console.log('holi')
      // Restar el stock del producto y continuar con la compra
      const upStock = await productService.updateStock(product._id, availableStock - quantity);
    } else {
      // No hay suficiente stock para el producto
      productsToPurchase.push(product._id);
    }
  }



    // Generar un ticket con los datos de la compra
    const ticket = await ticketService.generateTicket(cartId, req.session.user.email);
  console.log(ticket, 'ticket')
    if (productsToPurchase.length > 0) {
      // Actualizar el carrito para contener solo los productos que no pudieron comprarse
      const failedProducts = cart.products.filter((cartProduct) => productsToPurchase.includes(cartProduct.product._id));
      cart.products = failedProducts;
      await cart.save();
    } else {
      // Vaciar el carrito, ya que todos los productos se pudieron comprar
      cart.products = [];
      await cart.save();
    }

    res.json({ ticket, failedProducts: productsToPurchase });

};