import DaoMongoDB from "./mongo.dao.js";
import { cartModel } from "./models/cart.model.js";
import { Error } from "mongoose";

class CartDaoMongoDB extends DaoMongoDB {
  constructor() {
    super(cartModel);
  }
  async createCart(cartData) {
    try {
      const cart = await cartModel.create(cartData);
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }
  async readCart() {
    try {
      const cart = await cartModel.find();
      return cart;
    } catch (error) {
      throw new Error("Cart not found");
    }
  }
  

  async readCartByID(id) {
    try {
      const cart = await cartModel.findById(id);

      if (!cart) {
        throw new Error("Cart not found");
      }
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateCart(id, cartData) {
    try {
      const cart = await cartModel.findByIdAndUpdate(id, cartData, {
        new: true,
      });
      if (!cart) {
        throw new Error("Cart not found", 404);
      }
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async clearCart(id) {
    try {
      const cart = await cartModel.findByIdAndUpdate(
        id,
        { products: [] },
        { new: true }
      );
      if (!cart) throw new Error("Cart not found");
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteCart(id) {
    try {
      const cart = await cartModel.findByIdAndDelete(id);
      if (!cart) {
        throw new Error("Error deleting cart", 500);
      }
      console.log(`Cart deleted:${id}`);
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const cartDao = new CartDaoMongoDB();
