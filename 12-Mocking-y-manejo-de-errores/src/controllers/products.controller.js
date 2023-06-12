import {productService} from "../services/products.service.js";





export async function getAllProducts(req, res) {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1
  const category = req.query.category 
  const status = req.query.status 
  const sort = req.query.sort
  try {
    const products = await productService.getAllProducts(
      limit,
      page,
      category,
      status,
      sort
    );
    res.json(products);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

export async function getProductById(req, res) {
  const { id } = req.params;
  try {
    const product = await productService.getProductById(id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

export async function createProduct(req, res) {
  const product = req.body;
  try {
    const createdProduct = await productService.createProduct(product);
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function updateProduct(req, res) {
  const { id } = req.params;
  const product = req.body;
  try {
    const updatedProduct = await productService.updateProduct(id, product);
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteProduct(req, res) {
  const { id } = req.params;
  try {
    const deletedProduct = await productService.deleteProduct(id);
    res.json(deletedProduct);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}