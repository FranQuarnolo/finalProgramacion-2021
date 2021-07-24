import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from "./routers/userRouter.js";
import productRouter from './routers/productoRouter.js';


dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/comicstore", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use("/api/users", userRouter);
app.use("/api/productos", productRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.get("/", (req, res) => {
  res.send("Servidor Listo!");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Iniciando servidor en el puerto: ${port}`);
});
