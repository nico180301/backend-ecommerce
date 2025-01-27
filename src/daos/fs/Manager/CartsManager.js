import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import productsManager from "./ProductsManager.js";

class CartManager {
  constructor() {
    this.path = "./src/daos/fs/data/carts.json";
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

  async readCarts(status) {
    try {
      let carts = await fs.promises.readFile(this.path, "utf-8");
      carts = JSON.parse(carts);
      status && (carts = carts.filter((each) => each.state === status));
      if (!carts) {
        new Error("Fail at reading array.");
      } else {
        return carts;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async createCart() {
    try {
      const cart = {
        id: uuidv4(),
        products: [],
      };
      const carts = await this.readCarts();
      carts.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async readCartsId(id) {
    try {
      const carts = await this.readCarts();
      return carts.find((each) => each.id === id);
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async addProdInCart(idCart, idProd) {
    try {
      const prodExists = await productsManager.readProductId(idProd);
      if (!prodExists) throw new Error("Product not exists");
      let cartsFile = await this.readCarts();
      const cartExists = await this.readCartsId(idCart);
      if (!cartExists) throw new Error("Cart not exists");
      const existsProdInCart = cartExists.products.find(
        (prod) => prod.id === idProd
      );
      if (!existsProdInCart) {
        const product = {
          id: idProd,
          quantity: 1,
        };
        cartExists.products.push(product);
      } else existsProdInCart.quantity += 1;

      const updatedCarts = cartsFile.map((cart) => {
        if (cart.id === idCart) return cartExists;
        return cart;
      });

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(updatedCarts, null, 2)
      );
      return cartExists;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateCart(idCart, idProd, action) {
    try {
      const prodExists = await productsManager.readProductId(idProd);
      if (!prodExists) throw new Error("Product does not exist");

      let cartsFile = await this.readCarts();
      const cartExists = await this.readCartsId(idCart);
      if (!cartExists) throw new Error("Cart does not exist");

      const existsProdInCart = cartExists.products.find(
        (prod) => prod.id === idProd
      );
      if (!existsProdInCart) {
        throw new Error("Product not found in cart");
      }

      // Si se pide eliminar el producto
      if (action === "remove") {
        cartExists.products = cartExists.products.filter(
          (prod) => prod.id !== idProd
        );
      }
      // Si se pide disminuir la cantidad
      else if (action === "decrease") {
        if (existsProdInCart.quantity > 1) {
          existsProdInCart.quantity -= 1; // Disminuir cantidad
        } else {
          cartExists.products = cartExists.products.filter(
            (prod) => prod.id !== idProd
          ); // Eliminar producto
        }
      } else {
        throw new Error("Invalid action");
      }

      // Actualizar el archivo con los cambios
      const updatedCarts = cartsFile.map((cart) => {
        if (cart.id === idCart) return cartExists; // Actualizar carrito existente
        return cart; // Retornar el resto sin cambios
      });

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(updatedCarts, null, 2)
      );
      return cartExists; // Retornar el carrito actualizado
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteCart(id) {
    try {
      const carts = await this.readCarts();
      const cart = carts.find((each) => each.id === id);
      if (!cart) {
        const error = new Error("Cart does not exist.");
        error.statusCode = 404;
        throw error;
      } else {
        const deleteCart = carts.filter((each) => each.id !== id);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(deleteCart, null, 2)
        );
        console.log("Deleted cart with id: " + id);
        return { id };
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}

const cartsManager = new CartManager();
export default cartsManager;
