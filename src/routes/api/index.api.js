import { Router } from "express";
import usersRouter from "./users.api.js"
import productRouter from "./products.api.js";
import cartsRouter from "./carts.api.js";

const apiRouter = Router();

apiRouter.use("/users",usersRouter);
apiRouter.use("/products", productRouter)
apiRouter.use("/carts", cartsRouter)

export default apiRouter