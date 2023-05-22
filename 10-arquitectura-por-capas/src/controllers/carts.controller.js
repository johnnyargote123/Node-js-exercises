import {cartsRepository} from "../dao/repositories/cart.repository.js";
import {productsRepository} from "../dao/repositories/products.repository.js";

const cartRepository =  cartsRepository;
const productManagerDB = productsRepository

export async function getAllCarts(req, res) {
  try {
    let consulta = await cartRepository.getAllCarts();

    if (consulta.length === 0) {
      return res
        .status(404)
        .send({ status: "Error", message: "There are no carts registered" });
    }

    return res.status(200).send({ status: "OK", payload: consulta });
  } catch (error) {
    return res
      .status(500)
      .send({ status: "Error", message: "Internal server error" });
  }
}

export async function getCartById(req, res) {
  try {
    const consulta = await cartRepository.getCartById(req.params.id);
    if (consulta && consulta.id !== -1) {
      return res.status(200).send({ status: "OK", payload: consulta });
    }
    return res
      .status(404)
      .send({ status: "Error", message: `Cart not found: ${req.params.id}` });
  } catch (error) {
    return res
      .status(500)
      .send({ status: "Error", message: "Internal server error" });
  }
}

export async function createCart(req, res) {
  try {
    let consulta = await cartRepository.createCart();
    return res.status(200).send({ status: "OK", payload: consulta });
  } catch (error) {
    return res
      .status(400)
      .send({ status: "Error", message: "Can not create Cart" });
  }
}

export async function addProductToCart(req, res) {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = Number(req.body.quantity);

    const consultaCart = await cartRepository.getCartById(cartId);
    const consultaProduct = await productManagerDB.getProductById(productId);

    if (!consultaCart || !consultaProduct) {
      return res.status(400).send({
        status: "Error",
        error: `Cart (${cartId}) or product (${productId}) not found`,
      });
    }

    const agregarProductoCarrito = await cartRepository.addProductToCart(
      cartId,
      productId,
      quantity
    );
    return res.status(200).send({ status: "OK", payload: agregarProductoCarrito });
  } catch (error) {
    console.error(error);
    return res.status(400).send({
      status: "Error",
      error: `Can not add product to cart ${req.params.cid}`,
    });
  }
}

export async function removeProductFromCart(req, res) {
  const { cid, pid } = req.params;

  const result = await cartRepository.removeProductFromCart(cid, pid);

  if (result === null) {
    return res.status(500).send({
      status: "Error",
      error: `An error occurred while removing the product (${pid}) from the cart (${cid})`,
    });
  }

  if (result === true) {
    return res.status(200).send({
      status: "OK",
      payload: result,
      message: `Product (${pid}) removed from cart (${cid}) successfully`,
    });
  } else {
    return res.status(400).send({
      status: "Error",
      error: `Could not remove product (${pid}) from cart (${cid})`,
    });
  }
}

export async function deleteCartById(req, res) {
  const cartId = req.params.cid;
  const result = await cartRepository.deleteCartById(cartId);

  if (!result) {
    return res
      .status(404)
      .send({ status: "Error", error: `Cart not found (${cartId})` });
  } else {
    return res.status(200).send({
      status: "OK",
      payload: result,
      message: `Removed all items from the cart (${cartId})`,
    });
  }
}

export async function updateCart(req, res) {
  try {
    const cartId = req.params.cid;
    const products = req.body.products;

    const updatedCart = await cartRepository.updateCart(cartId, products);

    if (!updatedCart) {
      return res
        .status(404)
        .send({ status: "Error", error: `Cart not found (${cartId})` });
    } else {
      return res.status(200).send({
        status: "OK",
        payload: updatedCart,
        message: `Cart (${cartId}) was updated`,
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ status: "Error", error: "There was an error updating the cart" });
  }
}

export async function updateProductQuantity(req, res) {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity;

  const updatedProduct = await cartRepository.updateProductQuantity(
    cartId,
    productId,
    quantity
  );

  if (!updatedProduct) {
    return res.status(404).send({
      status: "Error",
      error: `Could not update product (${productId}) from cart (${cartId})`,
    });
  } else {
    return res.status(200).send({
      status: "OK",
      payload: updatedProduct,
      message: `The product (${productId}) was successfully updated`,
    });
  }
}