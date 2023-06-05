import ProductManagerDB from "../../dao/dbManager/productManager.js";
import CartManagerDB from "../../dao/dbManager/cartManager.js";
import MessageManagerDB from "../../dao/dbManager/messageManager.js";

class ViewsRepository {
  constructor() {
    this.productManagerDB = new ProductManagerDB();
    this.cartManagerDB = new CartManagerDB();
    this.messageManagerDB = new MessageManagerDB();
  }

  async getMessages() {
    return await this.messageManagerDB.getMessages();
  }

  async getCarts() {
    return await this.cartManagerDB.getCarts();
  }

  async getProductPage(page, limit, category, status, sort) {
    return await this.productManagerDB.getProductPage(
      page,
      limit,
      category,
      status,
      sort
    );
  }

  async getProduct() {
    return await this.productManagerDB.getProduct();
  }

  async getProductById(productId) {
    return await this.productManagerDB.getProductById(productId);
  }
}

export const viewsRepository = new ViewsRepository;