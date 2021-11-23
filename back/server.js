import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import path from 'path';
import userRouter from "./routers/userRouter.js";
import productRouter from './routers/productoRouter.js';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/comicstore", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use('/api/uploads', uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/productos", productRouter);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
app.use('/api/ordenes', orderRouter);
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
app.get('/api/config/google', (req, res) => {
  res.send(process.env.GOOGLE_API_KEY || '');
});
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, '/front/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/front/build/index.html'))
);
/* app.get("/", (req, res) => {
  res.send("Servidor Listo!");
}); */

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Iniciando servidor en el puerto: ${port}`);
});
