import cartsManager from "../../Manager/CartsManager.js";

export const updateCart = async(req,res)=>{
    try {
        const { idCart, idProd } = req.params;
        const { action } = req.body; // Esperando que se pase 'action' en el cuerpo de la solicitud
    
        const response = await cartsManager.updateCart(idCart, idProd, action);
        res.json(response);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}