import { productsRepository } from "../dao/repositories/products.repository.js";

class ProductService {
  async getAllProducts(limit, page, category, status, sort) {
    try {
      const products = await productsRepository.getAllProducts(
        limit,
        page,
        category,
        status,
        sort
      );
      return products;
    } catch (error) {
      throw new Error("There are no products registered");
    }
  }

  async getProductById(id) {
    try {
      const product = await productsRepository.getProductById(id);
      if (product) {
        return product;
      } else {
        throw new Error(`Not found this product ID: ${id}`);
      }
    } catch (error) {
      throw new Error(`Not found this product ID: ${id}`);
    }
  }

  async createProduct(product) {
    try {
      const createdProduct = await productsRepository.createProduct(product);
      return createdProduct;
    } catch (error) {
      throw new Error("Error creating product");
    }
  }

  async updateProduct(id, product) {
    try {
      const updatedProduct = await productsRepository.updateProduct(
        id,
        product
      );
      return updatedProduct;
    } catch (error) {
      throw new Error("Incomplete values");
    }
  }

  async deleteProduct(id) {
    try {
      const deletedProduct = await productsRepository.deleteProduct(id);
      return deletedProduct;
    } catch (error) {
      throw new Error("Product does not exist");
    }
  }
}

export const productService = new ProductService();
