import { Router } from "express";
import { prodService } from "../../services/product.service.js";  // Elimina productsManager e importa prodService

const productsRouter = Router();

productsRouter.get("/products", async (req, res, next) => {
    try {
        const products = await prodService.readProducts();  // Usa prodService para leer productos
        return res.render("products", { products });
    } catch (error) {
        return next(error);
    }
});

productsRouter.get("/addproducts", async (req, res, next) => {
    try {
        const products = await prodService.readProducts();  // Usa prodService para leer productos
        return res.render("addProducts", { products });
    } catch (error) {
        return next(error);
    }
});

productsRouter.get("/prueba", async (req, res, next) => {
    try {
        return res.render("prueba");
    } catch (error) {
        return next(error);
    }
});

export default productsRouter;
