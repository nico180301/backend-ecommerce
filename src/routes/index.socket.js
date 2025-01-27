import { prodService } from "../../src/services/product.service.js";

const socketCb = async (socketServer) => {
  socketServer.on("connection", async (socket) => {
    console.log("Client socket connected: " + socket.id);

    // Emitir la lista de productos cuando el cliente se conecte
    const products = await prodService.readProducts();
    socket.emit("productList", products);

    // Captura el emit del cliente, crea el producto, y luego lo emite a todos los clientes
    socket.on("newProd", async (prod) => {
      await prodService.createProduct(prod);
      const products = await prodService.readProducts();
      socketServer.emit("productList", products);
    });

    socket.on("deleteProd", async ({ _id }) => {
      await prodService.deleteProduct(_id);
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
