import fs from "fs";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import cartsManager from "./CartsManager.js";

class UserManager {
  constructor() {
    this.path = "./src/data/users.json";
    this.init();
  }

  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
      console.log("Created file.");
    } else {
      console.log("File already exists.");
    }
  }
  #createHash(user) {
    user.salt = crypto.randomBytes(12).toString("hex");
    user.password = crypto
      .createHmac("sha256", user.salt)
      .update(user.password)
      .digest("hex");
  }

  async readUsers(rol) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      rol && (users = users.filter((each) => each.role === rol));
      if (!users) {
        new Error("Fail at reading array.");
      } else {
        return users;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  async createUser(data) {
    try {
      if (!data.email || !data.password) {
        throw new Error(
          "Not created user. Please complete EMAIL and PASSWORD."
        );
      } else {
        const cart = await cartsManager.createCart();
        const user = {
          id: uuidv4(),
          photo:
            data.photo ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRueick0BA5tVSQJFjPJ49GPHAl30OzLnSjvRT_rpGv784YF5bCSHJ7V_qFVQ3aDkM2qlQ&usqp=CAU",
          email: data.email,
          password: data.password,
          role: data.role || "0",
          cart: cart.id,
        };
        let users = await fs.promises.readFile(this.path, "utf-8");
        this.#createHash(user);
        users = JSON.parse(users);
        users.push(user);
        console.log("User created succesfully.");
        users = JSON.stringify(users, null, 2);
        await fs.promises.writeFile(this.path, users);
        return user;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  async readUserId(id) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      let user = users.find((each) => each.id === id);
      console.log(user);
      if (!user) {
        throw new Error("User not found.");
      } else {
        console.log(user);
        return user;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateUser(id, data) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      let user = users.find((each) => each.id === id);
      if (user) {
        for (let prop in data) {
          user[prop] = data[prop];
        }
        if (data.password) {
          user.password = this.#createHash(data.password);
        }
        users = JSON.stringify(users, null, 2);
        await fs.promises.writeFile(this.path, users);
        return user;
      } else {
        const error = new Error("Not user found.");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(id) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      let user = users.find((each) => each.id === id);
      if (!user) {
        const error = new Error("User does not exist.");
        error.statusCode = 404;
        throw error;
      } else {
        await cartsManager.deleteCart(user.cart);
        let filtered = users.filter((each) => each.id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        console.log("Deleted " + id + " user and its cart.");
        return user;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}

const usersManager = new UserManager();
export default usersManager;
