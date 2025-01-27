//import productsManager from "../../daos/fs/Manager/ProductsManager.js";
import { prodService } from "../../services/product.service.js";

export const deleteProduct = async(req, res)=>{
    try {
        const { id } = req.params;
        //const prodDel = await productsManager.deleteProduct(id);
        const prodDel = await prodService.deleteProduct(id);
        res.status(200).json({ message: `product id: ${prodDel.id} deleted ok` });
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
}