import express from 'express';
import data from './data.js';

const app = express();

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