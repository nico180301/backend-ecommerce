import { Router } from "express";
<<<<<<< HEAD
//import usersRouter from "./users.view.js";
=======
import usersRouter from "./users.view.js";
>>>>>>> cb7667791fc38662d1a7bc084a9f9bed63dcf0fd
import productsRouter from "./products.view.js"

const viewRouter = Router();

<<<<<<< HEAD
//viewRouter.use("/users", usersRouter)
=======
viewRouter.use("/users", usersRouter)
>>>>>>> cb7667791fc38662d1a7bc084a9f9bed63dcf0fd
viewRouter.use("/",productsRouter)


viewRouter.get("/",(req,res,next)=>{
    try {
        return res.render("index")
    } catch (error) {
        return next(error)
    }
})

export default viewRouter;