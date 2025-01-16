//import productsManager from "../../daos/fs/Manager/ProductsManager.js";
import { prodService } from "../../services/product.service.js";
export const readProductId = async(req, res) =>{
    try {
        const { id } = req.params;
        // const prod = await productsManager.readProductId(id);
        const prod = await prodService.readProductId(id);
        res.status(200).json(prod);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
}