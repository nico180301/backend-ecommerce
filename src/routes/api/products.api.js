import { Router } from "express";
import productsManager from "../../Manager/ProductsManager.js";

const productRouter = Router();

productRouter.post("/", async (req, res) => {
  try {
    const prod = await productsManager.createProduct(req.body);
    res.status(201).json(prod);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

productRouter.get("/", async (req, res) => {
  try {
    const prods = await productsManager.readProducts();
    res.status(200).json(prods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

productRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const prod = await productsManager.readProductId(id);
    res.status(200).json(prod);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

productRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const prodUpd = await productsManager.updateProduct(id, req.body);
    res.status(200).json(prodUpd);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

productRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const prodDel = await productsManager.deleteProduct(id);
    res.status(200).json({ message: `product id: ${prodDel.id} deleted ok` });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default productRouter;
