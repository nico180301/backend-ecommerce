import { Router } from "express";
import {createCart, readCart, readCartByID, addProdInCart ,updateCart, deleteCart} from "../../controllers/index.js"
const cartsRouter = Router();

cartsRouter.post("/", createCart);

cartsRouter.get("/", readCart);

cartsRouter.get("/:cid", readCartByID);

cartsRouter.post("/:idCart/product/:idProd", addProdInCart);

cartsRouter.put("/:idCart/product/:idProd", updateCart);

cartsRouter.delete("/:cid", deleteCart);

export default cartsRouter;
