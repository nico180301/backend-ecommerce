import BaseService from "./base.service.js";
import { prodDao } from "../daos/mongodb/product.dao.js";
import { CustomError } from "../utils/error.custom.js";

class ProductService extends BaseService {
  constructor() {
    super(prodDao);
  }
  async createProduct(productData) {
    try {
      console.log("Creating product:", productData); // Log para depurar
      const product = await prodDao.create(productData);
      if (!product) throw new CustomError("Error creating product", 500);
      console.log("Product created:", product); // Log para depurar
      return product;
    } catch (error) {
      console.error("Error in createProduct:", error); // Log para depurar
      throw error;
    }
  }
  async readProducts(page, limit, query, sort) {
    try {
      const response = await prodDao.readAll(page, limit, query, sort);
      if (!response) throw new CustomError("Error getting products", 500);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async readProductById(id) {
    try {
      const product = await prodDao.readById(id);
      if (!product) throw new CustomError("Error getting product", 500);
      return product;
    } catch (error) {
      throw error;
    }
  }
  async updateProduct(id, productData) {
    try {
      console.log("Updating product with id:", id); // Log para depurar
      const product = await prodDao.update(id, productData);
      if (!product) throw new CustomError("Error updating product", 500);
      console.log("Product updated:", product); // Log para depurar
      return product;
    } catch (error) {
      console.error("Error in updateProduct:", error); // Log para depurar
      throw error;
    }
  }
  async deleteProduct(id) {
    try {
      console.log("Deleting product with id:", id); // Log para depurar
      const product = await prodDao.delete(id);
      if (!product) throw new CustomError("Error deleting product", 500);
      console.log("Product deleted:", product); // Log para depurar
      return product;
    } catch (error) {
      console.error("Error in deleteProduct:", error); // Log para depurar
      throw error;
    }
  }
}
export const prodService = new ProductService();
