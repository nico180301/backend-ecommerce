import productsManager from "../../Manager/ProductsManager.js";

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const prodUpd = await productsManager.updateProduct(id, req.body);
    res.status(200).json(prodUpd);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
