import { cartService } from "../services/carts.service.js";


export const getAllCarts = async (req, res) => {
  try {
    const carts = await cartService.getAllCarts();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCartById = async (req, res) => {
  const { id } = req.params;
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
  const { cartId, productId, quantity } = req.body;
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
  const { cartId } = req.params;
  try {
    const result = await cartService.deleteCartById(cartId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: `An error occurred while deleting the cart (${cartId})` });
  }
};

export const updateCart = async (req, res) => {
  const { cartId } = req.params;
  const { products } = req.body;
  try {
    const updatedCart = await cartService.updateCart(cartId, products);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: "There was an error updating the cart" });
  }
};

export const updateProductQuantity = async (req, res) => {
  const { cartId, productId } = req.params;
  const { quantity } = req.body;
  try {
    const updatedProduct = await cartService.updateProductQuantity(cartId, productId, quantity);
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the product quantity" });
  }
};
