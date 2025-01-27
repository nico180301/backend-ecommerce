//import productsManager from "../../daos/fs/Manager/ProductsManager.js";
import { prodService } from "../../services/product.service.js";

export const readProduct = async (req, res) => {
  try {
    //const prods = await productsManager.readProducts();
    const prods = await prodService.readProducts();
    res.status(200).json(prods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
