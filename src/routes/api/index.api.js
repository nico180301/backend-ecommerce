import { Router } from "express";
<<<<<<< HEAD
=======
import { authRouter } from "./auth.api.js";
>>>>>>> cb7667791fc38662d1a7bc084a9f9bed63dcf0fd
import usersRouter from "./users.api.js"
import productRouter from "./products.api.js";
import cartsRouter from "./carts.api.js";

const apiRouter = Router();

<<<<<<< HEAD
=======
apiRouter.use("/auth", authRouter);
>>>>>>> cb7667791fc38662d1a7bc084a9f9bed63dcf0fd
apiRouter.use("/users",usersRouter);
apiRouter.use("/products", productRouter)
apiRouter.use("/carts", cartsRouter)

export default apiRouter