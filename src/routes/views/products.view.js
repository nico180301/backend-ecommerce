import { Router } from "express";
import productsManager from "../../Manager/ProductsManager.js";


const productsRouter = Router();

productsRouter.get("/products",async(req,res,next)=>{
    try {
        const products= await productsManager.readProducts()
        return res.render("products",{products})
    } catch (error) {
        return next(error);
    }
})

productsRouter.get("/addproducts", async(req,res,next)=>{
    try {
        const products = await productsManager.readProducts()
        return res.render("addProducts", {products})
    } catch (error) {
        return next(error);
    }
})
productsRouter.get("/prueba", async(req,res,next)=>{
    try {
        return res.render("prueba")
    } catch (error) {
        return next(error);
    }
})



export default productsRouter