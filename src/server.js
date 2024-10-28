import express from 'express';
import userRouter from './routes/api/users.api.js';
import productRouter from './routes/api/products.api.js';
import cartRouter from './routes/api/carts.api.js';

const PORT = 8080;
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)

app.listen(PORT, (req, res)=>{
    console.log(`Servidor funcionando en el puerto: ${PORT}`);
})