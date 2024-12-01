import productsManager from "../../Manager/ProductsManager.js";

export const createProduct = async (req, res) => {
  try {
    const prod = await productsManager.createProduct(req.body);
    res.status(201).json(prod);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
