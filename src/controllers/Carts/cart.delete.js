
//import cartsManager from "../../daos/fs/Manager/CartsManager.js";
import { cartService } from "../../services/cart.service.js";


export const deleteCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cartDel = await cartService.deleteCart(cid);

    res.status(200).json({ message: `Cart id: ${cartDel.id} deleted ok` });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
