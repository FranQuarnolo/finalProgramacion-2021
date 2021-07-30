import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Producto from '../models/productModel.js';
import { isAdmin, isAuth } from '../utils.js';

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

productoRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const producto = new Producto({
      name: 'Nombre X' + Date.now(),
      pages: 0,
      category: 'categoria X',
      image: '/images/product-1.jpg',
      price: 0,
      stock: 0,
      editorial: "Editorial fantasma",
      rating: 0,
      numReviews: 0,
      description: 'Descripcion de ejemplo',
    });
    const createdProduct = await producto.save();
    res.send({ message: 'Producto Creado Correctamente!', producto: createdProduct });
  })
);

export default productoRouter;