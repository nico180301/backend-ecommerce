import BaseService from "./base.service.js";
import { cartDao } from "../daos/mongodb/cart.dao.js";
import { prodDao } from "../daos/mongodb/product.dao.js";
import { CustomError } from "../utils/error.custom.js";

class CartService extends BaseService {
  constructor() {
    super(cartDao);
  }

  async createCart(cartData) {
    try {
      const cart = await cartDao.create(cartData);
      if (!cart) {
        throw new CustomError("Error creating cart", 404);
      }
      return cart;
    } catch (error) {
      throw error;
    }
  }
  async readCart() {
    try {
      const cart = await cartDao.readAll();
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async readCartByID(id) {
    try {
      console.log(`Reading cart with ID: ${id}`);
      const cart = await cartDao.readCartByID(id);
      console.log(cart);
      if (!cart) {
        throw new CustomError("Error reading cart", 404);
      }
      return cart;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async addProdInCart(idCart, idProd) {
    try {
      // Verificar si el producto existe
      const prodExists = await prodDao.readProducts(idProd);
      console.log(prodExists); // Depuración
      if (!prodExists) {
        throw new CustomError("Product does not exist", 404);
      }
  
      // Leer el carrito y verificar si existe
      let cart = await this.readCartByID(idCart);  // Cambié this.readCart a this.readCartByID
      console.log(cart); // Depuración
      if (!cart) {
        throw new CustomError("Cart does not exist", 404);
      }
  
      // Asegurarse de que cart.products exista y sea un array
      if (!Array.isArray(cart.products)) {
        cart.products = [];
      }
  
      // Verificar si el producto ya está en el carrito
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === idProd.toString()
      );
  
      if (productIndex !== -1) {
        // Si el producto ya está en el carrito, incrementa la cantidad
        cart.products[productIndex].quantity += 1;
      } else {
        // Si el producto no está en el carrito, agrégalo con cantidad 1
        cart.products.push({ product: idProd, quantity: 1 });
      }
  
      // Guardar el carrito actualizado usando $set
      const updatedCart = await cartDao.updateCart(idCart, { products: cart.products });  // Quité $set
      console.log(updatedCart); // Depuración
      if (!updatedCart) {
        throw new CustomError("Error updating cart", 500);
      }
  
      return updatedCart;
    } catch (error) {
      throw error;
    }
  }
  
  async updateCart(id, cartData) {
    try {
      const cart = await cartDao.update(id, cartData);
      if (!cart) {
        throw new CustomError("Error updating cart", 404);
      }
      return cart;
    } catch (error) {
      throw error;
    }
  }
  async deleteCart(id){
    try {
        const cart = await cartDao.readById(id);
        if (!cart) {
            throw new CustomError("Error does not exist",404);
        }
        const deleteCart =await cartDao.delete(id);
        if (!deleteCart) {
            throw new CustomError("Error deleting cart",404);
        }
        console.log(`Deleted cart with id: ${id}`); 
        return { id };
        
    } catch (error) {
        throw error
    }
  }
}

export const cartService = new CartService();
