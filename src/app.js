import express, { json, urlencoded } from 'express';
import ProductManager from './ProductManager.js';

const app = express();

app.use(json())
app.use(urlencoded({ extended: true }));


const productManager = new ProductManager('./files/products.json');

app.get('/', (req, response) => {
    response.status(200).send('Todo salio bien')
})

app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = await productManager.getProducts();
        console.log(products)
        if (limit) {
            const limitedProducts = products.slice(0, limit);
            res.json(limitedProducts);
        } else {
            res.json(products)
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
})

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
        res.status(500).json({ error: `Error al obtener el producto con el id solicitado` });
    }
});


const PORT = 8080;
app.listen(PORT, () => { console.log(`Listening on port 8080\nhttp://localhost:${PORT}`) }) 