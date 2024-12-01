import fs from "fs";
import { v4 as uuidv4 } from "uuid";

class ProductManager {
  constructor() {
    this.path = "./src/data/products.json";
    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
      console.log("Created file.");
    } else {
      console.log("File already exists.");
    }
  }

  async readProducts() {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      if (!products) {
        new Error("Error at reading array.");
      } else {
        return products;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createProduct(data) {
    try {
      if (!data.name || !data.category) {
        throw new Error(
          "Not created product. Please complete NAME and CATEGORY."
        );
      } else {
        const product = {
          id: uuidv4(),
          name: data.name,
          photo:
            data.photo ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9FfpvUvCBmocfYGwa-EdrH-GEnOaAfmS3aQ&usqp=CAU",
          category: data.category,
          price: data.price || 1,
          stock: data.stock || 1,
        };
        const products = await this.readProducts();
        const prodExist = products.find((p) => p.id === product.id);
        if (prodExist) throw new Error("product already exists");
        products.push(product);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, 2)
        );
        return product;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async readProductId(id) {
    try {
      const products = await this.readProducts();
      const product = products.find((p) => p.id === id);
      if (!product) {
        throw new Error("Product not found.");
      }
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateProduct(id, data) {
    try {
      const products = await this.readProducts();
      let product = await this.readProductId(id);
      if (!product) {
        const error = new Error("Not product found.");
        error.statusCode = 404;
        throw error;
      }
      product = { ...product, ...data };
      const newProduct = products.filter((prod) => prod.id !== id);
      newProduct.push(product);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(newProduct, null, 2)
      );
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.readProducts();
      const product = await this.readProductId(id);
      if (!product) {
        const error = new Error("Product does not exist.");
        error.statusCode = 404;
        throw error;
      } else {
        const filteredProducts = products.filter((each) => each.id !== id);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(filteredProducts, null, 2)
        );
        console.log("Deleted " + id + " product.");
        return product;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
const productsManager = new ProductManager();
export default productsManager;
