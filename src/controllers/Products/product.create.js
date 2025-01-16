//import productsManager from "../../daos/fs/Manager/ProductsManager.js";
import { prodService } from "../../services/product.service.js";

export const createProduct = async (req, res) => {
  try {
    //fs
    //const prod = await productsManager.createProduct(req.body);
    const prod = await prodService.createProduct(req.body);
    res.status(201).json(prod);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
