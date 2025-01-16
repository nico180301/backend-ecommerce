//import productsManager from "../../src/daos/fs/Manager/ProductsManager.js";
import { prodService } from "../../src/services/product.service.js";

const socketCb = async (socketServer) => {
  socketServer.on("connection", async (socket) => {
    console.log("Client socket connected: " + socket.id);

    // Emitir la lista de productos cuando el cliente se conecte
    //const products = await productsManager.readProducts();
    const products = await prodService.readProducts();
    socket.emit("productList", products);
    //socketServer.emit("productList", await productsManager.readProducts());

    // Captura el emit del cliente, crea el producto, y luego lo emite a todos los clientes
    socket.on("newProd", async (prod) => {
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
      socketServer.emit("productList", products);
    });

    // Detectar la desconexión de un cliente
    socket.on("disconnect", () => {
      console.log("Client socket disconnected: " + socket.id);
    });
  });
};
export default socketCb;
