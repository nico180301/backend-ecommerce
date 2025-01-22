//import cartsManager from "../../daos/fs/Manager/CartsManager.js";
import { cartService } from "../../services/cart.service.js";

export const addProdInCart = async (req, res) => {
  try {
    const { idProd } = req.params;
    const { idCart } = req.params;
    const response = await cartService.addProdInCart(idCart, idProd);
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
