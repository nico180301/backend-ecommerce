import { Router } from "express";
import productsManager from "../../Managers/ProductsManager.js"

const productRouter = Router()

productRouter.get("/", async (req, res) => {
    try {
      const prods = await productsManager.getAll();
      res.status(200).json(prods);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  productRouter.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const prod = await productsManager.getById(id);
      res.status(200).json(prod);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });
  
  productRouter.post("/", async (req, res) => {
    try {
      const prod = await productsManager.create(req.body);
      res.status(201).json(prod);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  productRouter.delete("/", async (req, res) => {
    try {
      await productsManager.deleteAll();
      res.json({ message: "products deleted ok" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  productRouter.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const prodDel = await productsManager.delete(id);
      res.status(200).json({ message: `product id: ${prodDel.id} deleted ok` });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });
  
  productRouter.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const prodUpd = await productsManager.update(req.body, id);
      res.status(200).json(prodUpd);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  export default productRouter;