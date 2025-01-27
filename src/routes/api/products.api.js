import { Router } from "express";

import uploader from "../../middlewares/multer.mid.js";

import {createProduct, readProduct, readProductId, updateProduct, deleteProduct} from "../../controllers/index.js"

const productsRouter = Router();




productsRouter.post("/",uploader.single("photo"), createProduct);


productsRouter.get("/", readProduct);

productsRouter.get("/:id", readProductId);

productsRouter.put("/:id", updateProduct);

productsRouter.delete("/:id", deleteProduct);

export default productsRouter;
