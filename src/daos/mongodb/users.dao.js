import DaoMongoDB from "./mongo.dao.js";
import { userModel } from "./models/users.model.js";
import { Error } from "mongoose";

class UserDaoMongoDB extends DaoMongoDB {
  constructor() {
    super(userModel);
  }

  async createUser(userData) {
    try {
      const user = await userModel.create(userData);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async readUsers() {
    try {
      const users = await userModel.find().populate('cart');
      return users;
    } catch (error) {
      throw new Error(error);
    }
  }

  async readUsersByID(id) {
    try {
      const users = await userModel.findById(id).populate('cart');
      return users;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateUser(id, userData) {
    try {
      const user = await userModel.findByIdAndUpdate(id, userData);
      if (!user) {
        throw new Error("Error updating user", 500);
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(id) {
    try {
      const user = await userModel.findByIdAndDelete(id);
      if (!user) {
        throw new Error("Error deleting user", 500);
      }
      console.log(`User deleted:${id}`);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
export const userDao = new UserDaoMongoDB();
