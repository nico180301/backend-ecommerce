import cartsManager from "../../daos/fs/Manager/CartsManager.js";

export const createCart = async (req, res) => {
  try {
    res.json(await cartsManager.createCart());
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
