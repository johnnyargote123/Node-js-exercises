import { productDAO } from "../factory.js";


 class ProductRepository {
  async getAllProducts(limit, page, category, status, sort) {
    try {

      const products = await productDAO.getProductPage(
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
      const consulta = await productDAO.getProductById(productId);
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

      const existingProduct = await productDAO.getProduct();
      if (existingProduct.find((v) => v.code === product.code)) {
        return { status: "Error", error: "value of object repeat" };
      }

      const createdProduct = await productDAO.addProduct(
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
      const consulta = await productDAO.getProduct();
      const productIndex = consulta.findIndex((p) => p._id == productId);
      if (productIndex === -1) {
        return { status: "Error", message: "Product not found" };
      }

      if (product.id) {
        return { status: "Error", message: "Cannot update product ID" };
      }

      await productDAO.updateProductById(
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
      const consulta = await productDAO.getProduct();
      const productIndex = consulta.findIndex((p) => p._id == productId);
      if (productIndex === -1) {
        return { status: "Error", message: "Product does not exist" };
      }

      await productDAO.deleteProductId(productId);

      return { status: "Success", message: "Product successfully deleted" };
    } catch (error) {
      return { status: "Error", message: "Product does not exist" };
    }
  }

  async updateStock(productId, newStock) {
    try {
      const updatedProduct = await productDAO.updateStock(productId, newStock);

      if (!updatedProduct) {
        throw new Error("Product not found");
      }

      return updatedProduct;
    } catch (error) {
      throw new Error(`Error updating product stock: ${error.message}`);
    }
  }
}

export const productsRepository = new ProductRepository()