import { Router } from "express";
import cartsManager from "../../Manager/CartsManager.js";

const cartRouter = Router();

cartRouter.post("/", async (req, res) => {
  try {
    res.json(await cartsManager.createCart());
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

cartRouter.get("/", async (req, res) => {
  try {
    const carts = await cartsManager.readCarts();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

cartRouter.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    res.json(await cartsManager.readCartsId(cid));
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

cartRouter.post("/:idCart/product/:idProd", async (req, res) => {
  try {
    const { idProd } = req.params;
    const { idCart } = req.params;
    const response = await cartsManager.addProdInCart(idCart, idProd);
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

cartRouter.put("/:idCart/product/:idProd", async (req, res) => {
  try {
    const { idCart, idProd } = req.params;
    const { action } = req.body; // Esperando que se pase 'action' en el cuerpo de la solicitud

    const response = await cartsManager.updateCart(idCart, idProd, action);
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

cartRouter.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cartDel = await cartsManager.deleteCart(cid);
    res.status(200).json({ message: `Cart id: ${cartDel.id} deleted ok` });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default cartRouter;
