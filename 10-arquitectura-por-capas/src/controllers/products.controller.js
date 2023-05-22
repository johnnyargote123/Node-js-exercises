import ProductManager from "../dao/fileManager/producManager.js";
import ProductManagerDB from "../dao/dbManager/productManager.js";

const manager = new ProductManager();
const managerDB = new ProductManagerDB();

// Controlador para obtener todos los productos
export async function getAllProducts(req, res) {
  try {
    // Obtener los parámetros de consulta
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const category = req.query.category;
    const status = req.query.status;
    const sort = req.query.sort;

    if (isNaN(limit)) {
      return res
        .status(400)
        .send({ status: "Error", message: "Invalid value for limit" });
    }

    const products = await managerDB.getProductPage(
      page,
      limit,
      category,
      status,
      sort
    );
    const payload = {
      totalPages: products.totalPages,
      totalDocs: products.totalDocs,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
    };

    if (products.hasPrevPage) {
      payload.prevLink = `/products?page=${products.prevPage}`;
    }

    if (products.hasNextPage) {
      payload.nextLink = `/products?page=${products.nextPage}`;
    }

    return res
      .status(200)
      .send({ status: "success", payload: { ...products, ...payload } });
  } catch (error) {
    return res
      .status(404)
      .send({ status: "Error", message: "There are no products registered" });
  }
}

// Controlador para obtener un producto por su ID
export async function getProductById(req, res) {
  try {
    const consulta = await managerDB.getProductById(req.params.id);
    if (consulta) {
      return res.status(200).send({ status: "success", payload: consulta });
    } else {
      return res
        .status(404)
        .send({ status: "Error", message: `Not found this product ID: ${req.params.id}` });
    }
  } catch (error) {
    return res
      .status(404)
      .send({ status: "Error", message: `Not found this product ID: ${req.params.id}` });
  }
}

// Controlador para crear un nuevo producto
export async function createProduct(req, res) {
  try {
    const product = req.body;
    const files = req.files;

    if (
      !product.title ||
      !product.description ||
      !product.code ||
      !product.price ||
      !product.status ||
      !product.stock ||
      !product.category
    ) {
      return res
        .status(400)
        .send({ status: "Error", error: "incomplete values or file not uploaded" });
    }

    const thumbnails = [];
    if (files) {
      files.forEach((file) => {
        const imageUrl = `http://localhost:8080/images/${file.filename}`;
        thumbnails.push(imageUrl);
      });
    }

    const existingProduct = await managerDB.getProduct();
    if (existingProduct.find((v) => v.code === product.code)) {
      return res
        .status(400)
        .send({ status: "Error", error: "value of object repeat" });
    }

    const createdProduct = await managerDB.addProduct(
      product.title,
      product.description,
      product.code,
      Number(product.price),
      JSON.stringify(thumbnails),
      Boolean(product.status),
      Number(product.stock),
      product.category
    );

    return res
      .status(201)
      .send({ status: "Success", message: `Product created: ${createdProduct}` });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ status: "Error", error: "Error creating product" });
  }
}

// Controlador para actualizar un producto existente
export async function updateProduct(req, res) {
  try {
    const consulta = await managerDB.getProduct();
    const productId = req.params.id;
    const product = req.body;

    const productIndex = consulta.findIndex((p) => p._id == productId);
    if (productIndex === -1) {
      return res
        .status(404)
        .send({ status: "Error", message: "Product not found" });
    }

    if (product.id) {
      return res
        .status(400)
        .send({ status: "Error", message: "Cannot update product ID" });
    }

    await managerDB.updateProductById(
      productId,
      product.title,
      product.description,
      product.code,
      product.price,
      product.thumbnails,
      product.status,
      product.stock,
      product.category
    );

    return res
      .status(200)
      .send({ status: "OK", message: "Product successfully updated" });
  } catch (error) {
    return res
      .status(400)
      .send({ status: "Error", error: "Incomplete values" });
  }
}

// Controlador para eliminar un producto existente
export async function deleteProduct(req, res) {
  try {
    const consulta = await managerDB.getProduct();
    const productId = req.params.id;

    const productIndex = consulta.findIndex((p) => p._id == productId);
    if (productIndex === -1) {
      return res
        .status(404)
        .send({ status: "Error", message: "Product does not exist" });
    }

    await managerDB.deleteProductId(productId);

    return res
      .status(200)
      .send({ status: "Success", message: "Product successfully deleted" });
  } catch (error) {
    return res
      .status(404)
      .send({ status: "Error", message: "Product does not exist" });
  }
}