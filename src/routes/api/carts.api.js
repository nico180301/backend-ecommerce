import { Router } from "express";
import cartsManager from "../../Managers/CartsManager.js";

const cartRouter = Router();

cartRouter.post("/", async (req, res) => {
    try {
      res.json(await cartsManager.createCart());
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });
  
  cartRouter.get("/:idCart", async (req, res) => {
    try {
      const { idCart } = req.params;
      res.json(await cartsManager.getCartById(idCart));
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

  cartRouter.post("/:idCart/product/:idProd", async (req, res) => {
    try {
        const { idProd } = req.params;
        const { idCart } = req.params;
        const response = await cartsManager.saveProdToCart(idCart, idProd);
        res.json(response);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

export default cartRouter