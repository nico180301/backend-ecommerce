import { Router } from "express";
//import productsManager from "../../daos/fs/Manager/ProductsManager.js";
import { prodService } from "../../services/product.service.js";


const productsRouter = Router();

productsRouter.get("/products",async(req,res,next)=>{
    try {
        //const products= await productsManager.readProducts()
        const products= await prodService.readProducts()
        return res.render("products",{products})
    } catch (error) {
        return next(error);
    }
})

productsRouter.get("/addproducts", async(req,res,next)=>{
    try {
        //const products = await productsManager.readProducts()
        const products = await prodService.readProducts()
        return res.render("addProducts", {products})
    } catch (error) {
        return next(error);
    }
})

export default productsRouter