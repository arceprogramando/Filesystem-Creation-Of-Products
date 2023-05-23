import express, { json, urlencoded } from 'express';
import ProductManager from './ProductManager.js';

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

const productManager = new ProductManager();

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

const alumno = [
    {
        nombre: 'Felipe Arce',
        edad: 23,
        gracias: 'gracias por verificar',
    },
];

app.get('/', (req, res) => {
    console.log('REQ', req);
    res.send('Hola World!');
});

app.get('/bienvenida', (req, res) => {
    res.send(alumno);
});

app.get('/personas', (req, res) => {
    const limit = req.query.limit;
    if (limit) {
        res.send(personas.slice(0, limit));
    } else {
        res.send(personas);
    }
});

app.get('/personas/:id', (req, res) => {
    const persona = personas.find((persona) => persona.id == req.params.id);
    if (persona) {
        res.send(persona);
    } else {
        res.status(404).send({ error: 'El producto no existe' });
    }
});

app.listen(8080, () => console.log('Listening on port 8080\nhttp://localhost:8080'));