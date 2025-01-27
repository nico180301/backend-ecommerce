import { Router } from "express";
<<<<<<< HEAD
import productsManager from "../../Manager/ProductsManager.js";
=======
//import productsManager from "../../daos/fs/Manager/ProductsManager.js";
import { prodService } from "../../services/product.service.js";
>>>>>>> cb7667791fc38662d1a7bc084a9f9bed63dcf0fd


const productsRouter = Router();

productsRouter.get("/products",async(req,res,next)=>{
    try {
<<<<<<< HEAD
        const products= await productsManager.readProducts()
=======
        //const products= await productsManager.readProducts()
        const products= await prodService.readProducts()
>>>>>>> cb7667791fc38662d1a7bc084a9f9bed63dcf0fd
        return res.render("products",{products})
    } catch (error) {
        return next(error);
    }
})

productsRouter.get("/addproducts", async(req,res,next)=>{
    try {
<<<<<<< HEAD
        const products = await productsManager.readProducts()
=======
        //const products = await productsManager.readProducts()
        const products = await prodService.readProducts()
>>>>>>> cb7667791fc38662d1a7bc084a9f9bed63dcf0fd
        return res.render("addProducts", {products})
    } catch (error) {
        return next(error);
    }
})
<<<<<<< HEAD
productsRouter.get("/prueba", async(req,res,next)=>{
    try {
        return res.render("prueba")
    } catch (error) {
        return next(error);
    }
})


=======
>>>>>>> cb7667791fc38662d1a7bc084a9f9bed63dcf0fd

export default productsRouter