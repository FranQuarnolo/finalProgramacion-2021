import express from 'express';
import mongoose from 'mongoose';
import data from './data.js';
import userRouter from './routers/userRouter.js';

const app = express();
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/comicstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});


app.use('/api/users', userRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.get('/', (req, res) => {
    res.send('Servidor Listo!');
  });

app.get('/api/productos', (req, res) => {
  res.send(data.productos);
});

app.get('/api/productos/:id', (req, res) => {
  const producto = data.productos.find((x) => x._id === req.params.id);
  if (producto) {
    res.send(producto);
  } else {
    res.status(404).send({ message: 'Producto No Encontrado' });
  }
});




const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Iniciando servidor en el puerto: ${port}`);
});