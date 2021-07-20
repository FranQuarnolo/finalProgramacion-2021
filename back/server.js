import express from 'express';
import data from './data.js';

const app = express();

app.get('/', (req, res) => {
    res.send('Servidor Listo!');
  });

app.get('/api/productos', (req, res) => {
  res.send(data.productos);
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Iniciando servidor en el puerto: ${port}`);
});