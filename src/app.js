import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Escuchando en puerto: http://localhost:${PORT}`);
});

const productManager = new ProductManager('./files/products.json');

app.get('/', async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts();
    if (limit) return res.json(products.slice(0, limit));
    return res.json(products);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

app.get('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(pid);

    if (product) return res.json(product);

    return res.status(404).json({ error: 'El producto no existe' });
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener el producto con el id solicitado' });
  }
});
