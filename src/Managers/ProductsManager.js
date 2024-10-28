import fs from "fs";
import crypto from "crypto";

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

  async create(data) {
    try {
      if (!data.title) {
        throw new Error("Not created product. Please complete TITLE.");
      } else {
        const product = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo:
            data.photo ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9FfpvUvCBmocfYGwa-EdrH-GEnOaAfmS3aQ&usqp=CAU",
          category: data.category || "plastico",
          price: data.price || 1,
          stock: data.stock || 1,
        };

        let products = await fs.promises.readFile(this.path, "utf-8");
        products = JSON.parse(products);
        products.push(product);
        console.log("Product created succesfully.");
        products = JSON.stringify(products, null, 2);
        await fs.promises.writeFile(this.path, products);
        return product;
      }
    } catch (error) {
      throw error;
    }
  }
  async read(cat) {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      cat && (products = products.filter((each) => each.category === cat));
      if (!products) {
        new Error("Error at reading array.");
      } else {
        return products;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async readOne(id) {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      let product = products.find((each) => each.id === id);
      console.log(product);
      if (!product) {
        throw new Error("Product does not exist.");
      } else {
        console.log(product);
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, data) {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      let product = products.find((each) => each.id === id);
      if (product) {
        for (let prop in data) {
          product[prop] = data[prop];
        }
        products = JSON.stringify(products, null, 2);
        await fs.promises.writeFile(this.path, products);
        return product;
      } else {
        const error = new Error("Not product found.");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      let product = products.find((each) => each.id === id);
      if (!product) {
        const error = new Error("Product does not exist.");
        error.statusCode = 404;
        throw error;
      } else {
        let filtered = products.filter((each) => each.id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        console.log("Deleted " + id + " product.");
        return product;
      }
    } catch (error) {
      throw error;
    }
  }
}

const productsManager = new ProductManager();
export default productsManager;