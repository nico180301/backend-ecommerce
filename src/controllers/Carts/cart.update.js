//import cartsManager from "../../daos/fs/Manager/CartsManager.js";
import { cartService } from "../../services/cart.service.js";
export const updateCart = async(req,res)=>{
    try {
        const { idCart, idProd } = req.params;
        const { action } = req.body; // Esperando que se pase 'action' en el cuerpo de la solicitud
    
        const response = await cartService.updateCart(idCart, idProd, action);
        res.json(response);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}