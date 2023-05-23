import express, { json, urlencoded } from 'express';
import ProductManager from './ProductManager.js';

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

const productManager = new ProductManager('./files/Products.json');

app.get('/', (req, res) => {
    res.send('Hola Tutor!');
});

app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit;

        const products = await productManager.getProducts();

        if (limit) {
            const limitedProducts = products.slice(0, limit);
            res.json(limitedProducts);
        } else {
            res.json(products);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        const pid = req.params.pid;
        const product = await productManager.getProductById(pid);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'El producto no existe' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});



app.listen(8080, () => console.log('Listening on port 8080\nhttp://localhost:8080'));