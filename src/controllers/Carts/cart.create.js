//import cartsManager from "../../daos/fs/Manager/CartsManager.js";
import { cartService } from "../../services/cart.service.js";

export const createCart = async (req, res) => {
  try {
    res.json(await cartService.createCart());
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
