import cartsManager from "../../daos/fs/Manager/CartsManager.js";

export const readCart = async (req, res) => {
  try {
    const carts = await cartsManager.readCarts();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
