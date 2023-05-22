import {viewsRepository} from "../dao/repositories/views.repository.js";



export async function getChat(req, res) {
  const messages = await viewsRepository.getMessages();
  return res.render("messages");
}

export function getRegister(req, res) {
  res.render("register");
}

export function getLogin(req, res) {
  res.render("login");
}

export async function getCartPersonal(req, res) {
  const carts = await viewsRepository.getCarts();
  const cartsWithOwnProperties = carts.map((cart) => {
    return {
      _id: cart._id,
      products: cart.products.map((productCart) => {
        return {
          product: productCart.product,
          quantity: productCart.quantity,
          _id: productCart._id,
        };
      }),
    };
  });

  res.render("cart", {
    productsId$: cartsWithOwnProperties,
    style: "index.css",
  });
}

export async function getHome(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const category = req.query.category || null;
  const status = req.query.status || null;
  const sort = req.query.sort || null;

  const products = await viewsRepository.getProductPage(
    page,
    limit,
    category,
    status,
    sort
  );
  const productsWithOwnProperties = products.docs.map((product) => {
    return {
      id: product.id,
      status: product.status,
      title: product.title,
      stock: product.stock,
      category: product.category,
      description: product.description,
      code: product.code,
      price: product.price,
    };
  });

  res.render("home", {
    products$: productsWithOwnProperties,
    currentPage: page,
    totalPages: products.totalPages,
    hasNextPage: products.hasNextPage,
    hasPrevPage: products.hasPrevPage,
    nextPage: page + 1,
    prevPage: page - 1,
    user: req.session.user,
    style: "index.css",
  });
}

export async function getRealTimeProducts(req, res) {
  const products = await viewsRepository.getProduct();
  const productsWithOwnProperties = products.map((product) => {
    return {
      id: product.id,
      status: product.status,
      title: product.title,
      stock: product.stock,
      category: product.category,
      description: product.description,
      code: product.code,
      price: product.price,
    };
  });
  res.render("realTimeProducts", {
    products$: productsWithOwnProperties,
    style: "index.css",
  });
}

export async function getProduct(req, res) {
  const productId = req.params.id;
  if (productId) {
    const product = await viewsRepository.getProductById(productId);

    const productWithOwnProperties = {
      id: product?.id,
      status: product?.status,
      title: product?.title,
      stock: product?.stock,
      category: product?.category,
      description: product?.description,
      code: product?.code,
      price: product?.price,
    };

    res.render("product", {
      productsId$: productWithOwnProperties,
      style: "index.css",
    });
  }
}