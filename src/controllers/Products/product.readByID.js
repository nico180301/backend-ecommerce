import productsManager from "../../Manager/ProductsManager.js";

export const readProductId = async(req, res) =>{
    try {
        const { id } = req.params;
        const prod = await productsManager.readProductId(id);
        res.status(200).json(prod);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
}