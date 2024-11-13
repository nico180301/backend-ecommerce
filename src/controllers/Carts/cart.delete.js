import cartsManager from "../../Manager/CartsManager.js";

export const deleteCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cartDel = await cartsManager.deleteCart(cid);
    res.status(200).json({ message: `Cart id: ${cartDel.id} deleted ok` });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
