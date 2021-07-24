import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Producto from '../models/productModel.js';

const productoRouter = express.Router();

productoRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const products = await Producto.find({});
    res.send(products);
  })
);

productoRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    //Remueve todos los productos y crea otros nuevos
    // await Product.remove({});
    const createdProducts = await Producto.insertMany(data.productos);
    res.send({ createdProducts });
  })
);

productoRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const producto = await Producto.findById(req.params.id);
    if (producto) {
      res.send(producto);
    } else {
      res.status(404).send({ message: 'Producto no encontrado' });
    }
  })
);

export default productoRouter;