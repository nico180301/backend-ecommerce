import { Router } from "express";

const productsRouter = Router();

productsRouter.get("/products", (req,res)=>{
    res.render("products");
})

export default productsRouter