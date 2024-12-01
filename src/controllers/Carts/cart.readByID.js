import cartsManager from "../../Manager/CartsManager.js";

export const readCartId = async (req, res) => {
  try {
    const { cid } = req.params;
    res.json(await cartsManager.readCartsId(cid));
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
