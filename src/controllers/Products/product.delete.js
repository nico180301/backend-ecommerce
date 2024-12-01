import productsManager from "../../Manager/ProductsManager.js";

export const deleteProduct = async(req, res)=>{
    try {
        const { id } = req.params;
        const prodDel = await productsManager.deleteProduct(id);
        res.status(200).json({ message: `product id: ${prodDel.id} deleted ok` });
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
}