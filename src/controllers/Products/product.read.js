import productsManager from "../../Manager/ProductsManager.js";

export const readProduct = async (req, res) => {
  try {
    const prods = await productsManager.readProducts();
    res.status(200).json(prods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
