import { Router } from "express";
import {createProduct, readProduct, readProductId, updateProduct, deleteProduct} from "../../controllers/index.js"

const productsRouter = Router();

productsRouter.post("/", createProduct);

productsRouter.get("/", readProduct);

productsRouter.get("/:id", readProductId);

productsRouter.put("/:id", updateProduct);

productsRouter.delete("/:id", deleteProduct);

export default productsRouter;
