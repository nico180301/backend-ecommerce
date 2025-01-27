import { Router } from "express";
<<<<<<< HEAD
import {createCart, readCart, readCartId, addProdInCart ,updateCart, deleteCart} from "../../controllers/index.js"
=======
import {createCart, readCart, readCartByID, addProdInCart ,updateCart, deleteCart} from "../../controllers/index.js"
>>>>>>> cb7667791fc38662d1a7bc084a9f9bed63dcf0fd
const cartsRouter = Router();

cartsRouter.post("/", createCart);

cartsRouter.get("/", readCart);

<<<<<<< HEAD
cartsRouter.get("/:cid", readCartId);
=======
cartsRouter.get("/:cid", readCartByID);
>>>>>>> cb7667791fc38662d1a7bc084a9f9bed63dcf0fd

cartsRouter.post("/:idCart/product/:idProd", addProdInCart);

cartsRouter.put("/:idCart/product/:idProd", updateCart);

cartsRouter.delete("/:cid", deleteCart);

export default cartsRouter;
