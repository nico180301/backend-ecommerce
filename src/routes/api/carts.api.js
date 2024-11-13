import { Router } from "express";
import {createCart, readCart, readCartId, addProdInCart ,updateCart, deleteCart} from "../../controllers/index.js"
const cartsRouter = Router();

cartsRouter.post("/", createCart);

cartsRouter.get("/", readCart);

cartsRouter.get("/:cid", readCartId);

cartsRouter.post("/:idCart/product/:idProd", addProdInCart);

cartsRouter.put("/:idCart/product/:idProd", updateCart);

cartsRouter.delete("/:cid", deleteCart);

export default cartsRouter;
