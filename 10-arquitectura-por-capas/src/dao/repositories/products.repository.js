import ProductManager from "../../dao/fileManager/producManager.js";
import ProductManagerDB from "../../dao/dbManager/productManager.js";

const manager = new ProductManager();
const managerDB = new ProductManagerDB();

 class ProductRepository {
  async getAllProducts(limit, page, category, status, sort) {
    try {
      if (isNaN(limit)) {
        return { status: "Error", message: "Invalid value for limit" };
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

      return { status: "success", payload: { ...products, ...payload } };
    } catch (error) {
      return { status: "Error", message: "There are no products registered" };
    }
  }

   async getProductById(productId) {
    try {
      const consulta = await managerDB.getProductById(productId);
      if (consulta) {
        return { status: "success", payload: consulta };
      } else {
        return {
          status: "Error",
          message: `Not found this product ID: ${productId}`,
        };
      }
    } catch (error) {
      return {
        status: "Error",
        message: `Not found this product ID: ${productId}`,
      };
    }
  }

   async createProduct(product, files) {
    try {
      if (
        !product.title ||
        !product.description ||
        !product.code ||
        !product.price ||
        !product.status ||
        !product.stock ||
        !product.category
      ) {
        return {
          status: "Error",
          error: "incomplete values or file not uploaded",
        };
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
        return { status: "Error", error: "value of object repeat" };
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

      return {
        status: "Success",
        message: `Product created: ${createdProduct}`,
      };
    } catch (error) {
      console.log(error);
      return { status: "Error", error: "Error creating product" };
    }
  }

  async updateProduct(productId, product) {
    try {
      const consulta = await managerDB.getProduct();
      const productIndex = consulta.findIndex((p) => p._id == productId);
      if (productIndex === -1) {
        return { status: "Error", message: "Product not found" };
      }

      if (product.id) {
        return { status: "Error", message: "Cannot update product ID" };
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

      return { status: "OK", message: "Product successfully updated" };
    } catch (error) {
      return { status: "Error", error: "Incomplete values" };
    }
  }

   async deleteProduct(productId) {
    try {
      const consulta = await managerDB.getProduct();
      const productIndex = consulta.findIndex((p) => p._id == productId);
      if (productIndex === -1) {
        return { status: "Error", message: "Product does not exist" };
      }

      await managerDB.deleteProductId(productId);

      return { status: "Success", message: "Product successfully deleted" };
    } catch (error) {
      return { status: "Error", message: "Product does not exist" };
    }
  }
}

export const productsRepository = new ProductRepository()