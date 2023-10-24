const express = require('express');
const app = express();
const port = 3000;

// Simular una lista de productos
const productos = [
  { id: 1, nombre: 'Producto 1', precio: 10.99 },
  { id: 2, nombre: 'Producto 2', precio: 19.99 },
  // Agrega más productos aquí
];

// Middleware para procesar datos de formulario
app.use(express.urlencoded({ extended: false }));

// Ruta para mostrar la lista de productos
app.get('/productos', (req, res) => {
  res.send('<h1>Lista de Productos</h1>' +
    '<ul>' +
    productos.map(producto => `<li>${producto.nombre} - $${producto.precio} <a href="/comprar/${producto.id}">Comprar</a></li>`).join('') +
    '</ul>'
  );
});

// Ruta para comprar un producto
app.get('/comprar/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const producto = productos.find(p => p.id === productId);
  if (!producto) {
    res.send('Producto no encontrado');
  } else {
    res.send(`<h1>Comprar ${producto.nombre}</h1>` +
      `<form action="/comprar/${productId}" method="post">` +
      'Cantidad: <input type="number" name="cantidad" value="1" min="1"><br>' +
      '<input type="submit" value="Comprar">' +
      '</form>'
    );
  }
});

// Procesar la solicitud de compra
app.post('/comprar/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const cantidad = parseInt(req.body.cantidad);
  const producto = productos.find(p => p.id === productId);
  if (!producto) {
    res.send('Producto no encontrado');
  } else {
    const total = producto.precio * cantidad;
    res.send(`Has comprado ${cantidad} ${producto.nombre}(s) por un total de $${total.toFixed(2)}. Gracias por tu compra.`);
  }
});

app.listen(port, () => {
  console.log(`Servidor de venta de productos en ejecución en http://localhost:${port}`);
});
