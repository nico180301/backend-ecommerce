//import usersManager from "../Manager/UserManager.js";
import productsManager from "../Manager/ProductsManager.js";

const socketCb = async (socket) => {
  console.log("Client socket connected: " + socket.id);

  socket.on('disconect', ()=>{
    console.log('Client socket disconnected', socket.id);
  });

  socket.on("addProduct", (products) => {
    console.log(`--> ${products} agregado`)
  });

  socketCb.emit('product', await productsManager.readProducts());
};



export default socketCb;
