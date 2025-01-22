import BaseService from "./base.service.js";
import { userDao } from "../daos/mongodb/users.dao.js";
import { cartDao } from "../daos/mongodb/cart.dao.js";
import { CustomError } from "../utils/error.custom.js";

class UserService extends BaseService {
  constructor() {
    super(userDao);
  }
  async createUser(userData) {
    try {
      const user = await userDao.create(userData);
      if (!user) {
        throw new CustomError("Error creating user", 500);
      }
      const cart = await cartDao.createCart({ user: user._id, products: [] });
      console.log(cart);
      if (!cart) {
        throw new CustomError("Error creating cart", 500);
      }
      user.cart = cart._id;
      await user.save();
      console.log("User and cart created:", user, cart);
      return user;
    } catch (error) {
      throw error;
    }
  }
  
  async readUser() {
    try {
      const user = await userDao.readAll();
      if (!user) {
        throw new CustomError("Error getting user", 500);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
  async readUserById(id) {
    try {
      const user = await userDao.readById(id);
      if (!user) {
        throw new CustomError("Error getting user", 500);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
  async updateUser(id, userData) {
    try {
      const user = await userDao.update(id, userData);
      if (!user) {
        throw new CustomError("Error updating user", 500);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
  async deleteUser(id) {
    try {
      const user = await userDao.readById(id);
      if (!user) {
        throw new CustomError("Error finding user", 500);
      }

      console.log("Cart associated with user:", user.cart);
      if (user.cart) {
        console.log(`Deleting cart with ID: ${user.cart}`);
        await cartDao.delete(user.cart);
      }
      const deleteUser = await userDao.delete(id);
      if (!deleteUser) {
        throw new CustomError("Error deleting user", 500);
      }
      console.log("User and cart deleted for user ID:", id);
      return deleteUser;
    } catch (error) {
      throw error;
    }
  }
}

export const userService = new UserService();
