import { Router } from "express";
<<<<<<< HEAD
=======
import uploader from "../../middlewares/multer.mid.js";
>>>>>>> cb7667791fc38662d1a7bc084a9f9bed63dcf0fd
import {createProduct, readProduct, readProductId, updateProduct, deleteProduct} from "../../controllers/index.js"

const productsRouter = Router();

<<<<<<< HEAD
productsRouter.post("/", createProduct);
=======
productsRouter.post("/",uploader.single("photo"), createProduct);
>>>>>>> cb7667791fc38662d1a7bc084a9f9bed63dcf0fd

productsRouter.get("/", readProduct);

productsRouter.get("/:id", readProductId);

productsRouter.put("/:id", updateProduct);

productsRouter.delete("/:id", deleteProduct);

export default productsRouter;
