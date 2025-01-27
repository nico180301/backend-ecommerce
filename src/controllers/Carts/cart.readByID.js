
//import cartsManager from "../../daos/fs/Manager/CartsManager.js";
import { cartService } from "../../services/cart.service.js";

export const readCartByID = async (req, res) => {
  try {
    const { cid } = req.params;
    res.json(await cartService.readCartByID(cid));

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
