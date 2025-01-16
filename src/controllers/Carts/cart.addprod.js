import cartsManager from "../../daos/fs/Manager/CartsManager.js";

export const addProdInCart = async (req, res) => {
  try {
    const { idProd } = req.params;
    const { idCart } = req.params;
    const response = await cartsManager.addProdInCart(idCart, idProd);
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
