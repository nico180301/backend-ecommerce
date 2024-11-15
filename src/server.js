import express from "express";

import { engine } from "express-handlebars";

import __dirname from "./utils.js";

import morgan from "morgan";

import indexRouter from "./routes/index.routes.js";
import errorHandler from "./middlewares/errorHandler.mid.js";
import pathHandler from "./middlewares/pathHandler.mid.js";
import path from "path";

import { createServer } from 'http';
import { Server } from "socket.io";
import socketCb from "./routes/index.socket.js";

//http server
const server = express();
const httpServer = createServer(server)
const socketServer = new Server(httpServer);

socketServer.on("conection", socketCb)

const PORT = 8080;
httpServer.listen(PORT, (req, res)=>{
    console.log(`Servidor funcionando en el puerto: ${PORT}`);
})

//template engine
server.engine("handlebars", engine());
server.set("views", __dirname + "/views");
server.set("view engine", "handlebars");

server.use(express.static(path.join(__dirname + "/public")));

//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));

//endpoints
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);
