<<<<<<< HEAD
import productsManager from "../Manager/ProductsManager.js";
=======
//import productsManager from "../../src/daos/fs/Manager/ProductsManager.js";
import { prodService } from "../../src/services/product.service.js";
>>>>>>> cb7667791fc38662d1a7bc084a9f9bed63dcf0fd

const socketCb = async (socketServer) => {
  socketServer.on("connection", async (socket) => {
    console.log("Client socket connected: " + socket.id);

    // Emitir la lista de productos cuando el cliente se conecte
<<<<<<< HEAD
    const products = await productsManager.readProducts();
=======
    //const products = await productsManager.readProducts();
    const products = await prodService.readProducts();
>>>>>>> cb7667791fc38662d1a7bc084a9f9bed63dcf0fd
    socket.emit("productList", products);
    //socketServer.emit("productList", await productsManager.readProducts());

    // Captura el emit del cliente, crea el producto, y luego lo emite a todos los clientes
    socket.on("newProd", async (prod) => {
<<<<<<< HEAD
      await productsManager.createProduct(prod);
      const products = await productsManager.readProducts();
      socketServer.emit("productList", products);
    });

    socket.on("deleteProd", async ({ id }) => {
      await productsManager.deleteProduct(id);
      const products = await productsManager.readProducts();
=======
      //await productsManager.createProduct(prod);
      await prodService.createProduct(prod);
      //const products = await productsManager.readProducts();
      const products = await prodService.readProducts();
      socketServer.emit("productList", products);
    });

    socket.on("deleteProd", async ({ _id }) => {
      //await productsManager.deleteProduct(id);
      await prodService.deleteProduct(_id);
      //const products = await productsManager.readProducts();
      const products = await prodService.readProducts();
>>>>>>> cb7667791fc38662d1a7bc084a9f9bed63dcf0fd
      socketServer.emit("productList", products);
    });

    // Detectar la desconexión de un cliente
    socket.on("disconnect", () => {
      console.log("Client socket disconnected: " + socket.id);
    });
  });
};
export default socketCb;
