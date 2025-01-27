import { Router } from "express";

//import usersRouter from "./users.view.js";
import productsRouter from "./products.view.js"

const viewRouter = Router();


//viewRouter.use("/users", usersRouter)
viewRouter.use("/",productsRouter)

viewRouter.get("/", (req, res, next) => {
    try {
        return res.render("index");
    } catch (error) {
        return next(error);
    }
});

export default viewRouter;
