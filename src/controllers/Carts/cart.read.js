//import cartsManager from "../../daos/fs/Manager/CartsManager.js";
import { cartService } from "../../services/cart.service.js";

export const readCart = async (req, res) => {
  try {
    const carts = await cartService.readCart();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
