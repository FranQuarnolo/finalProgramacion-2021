import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Producto from '../models/productModel.js';
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';
import User from '../models/userModel.js';

const productoRouter = express.Router();

productoRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;
    const name = req.query.name || '';
    const category = req.query.category || '';
    const seller = req.query.seller || '';
    const order = req.query.order || '';
    const min = req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max = req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating = req.query.rating && Number(req.query.rating) !== 0 ? Number(req.query.rating) : 0;
    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const sellerFilter = seller ? { seller } : {};
    const categoryFilter = category ? { category } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortOrder = order === 'lowest' ? { price: 1 } : order === 'highest' ? { price: -1 } : order === 'toprated' ? { rating: -1 } : { _id: -1 };
    const count = await Producto.count({
      ...sellerFilter,
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    const products = await Producto.find({
      ...sellerFilter,
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    }).populate('seller', 'seller.name seller.logo')
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    res.send({ products, page, pages: Math.ceil(count / pageSize) });
  })
);

productoRouter.get('/categories', expressAsyncHandler(async (req, res) => {
  const categories = await Producto.find().distinct('category');
  res.send(categories);
}));

productoRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    //Remueve todos los productos y crea otros nuevos
    // await Product.remove({});
    const seller = await User.findOne({ isSeller: true });
    if (seller) {
      const products = data.products.map((producto) => ({
        ...producto,
        seller: seller._id,
      }));
      const createdProducts = await Producto.insertMany(products);
      res.send({ createdProducts });
    } else {
      res
        .status(500)
        .send({ message: 'No se encontro un vendedor. Primero corra: /api/users/seed' });
    }
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
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const producto = new Producto({
      name: 'name' + Date.now(),
      seller: req.user._id,
      pages: 0,
      category: 'categoria X',
      image: '/images/product-x.jpg',
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

productoRouter.put(
  '/:id',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const productoId = req.params.id;
    const producto = await Producto.findById(productoId);
    if (producto) {
      producto.name = req.body.name;
      producto.pages = req.body.pages;
      producto.category = req.body.category;
      producto.image = req.body.image;
      producto.price = req.body.price;
      producto.stock = req.body.stock;
      producto.editorial = req.body.editorial;
      producto.description = req.body.description;
      const updatedProduct = await producto.save();
      res.send({ message: 'Producto Actualizado!', producto: updatedProduct });
    } else {
      res.status(404).send({ message: 'Producto no encontrado' });
    }
  })
);

productoRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const producto = await Producto.findById(req.params.id);
    if (producto) {
      const deleteProduct = await producto.remove();
      res.send({ message: 'Producto Eliminado', producto: deleteProduct });
    } else {
      res.status(404).send({ message: 'Producto no encontrado' });
    }
  })
);


productoRouter.post(
  '/:id/reviews',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productoId = req.params.id;
    const producto = await Producto.findById(productoId);
    if (producto) {
      if (producto.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: 'Oye! Ya realizaste una review de este producto!' });
      }
      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      producto.reviews.push(review);
      producto.numReviews = producto.reviews.length;
      producto.rating =
        producto.reviews.reduce((a, c) => c.rating + a, 0) /
        producto.reviews.length;
      const updatedProduct = await producto.save();
      res.status(201).send({
        message: 'Review Creada!',
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      });
    } else {
      res.status(404).send({ message: 'Producto No Encontrado' });
    }
  })
);

export default productoRouter;