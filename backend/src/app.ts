import express, { Request, Response } from 'express';
import ProductManager from './ProductManager';
import cors from 'cors'


const app = express();

app.use(cors({
  origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Escuchando en puerto: http://localhost:${PORT}`);
});

const productManager = new ProductManager('./files/products.json');

app.get('/', async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const products = await productManager.getProducts();
    if (limit) return res.json(products.slice(0, limit));
    return res.json(products);
  } catch (error) {
    return res.status(404).json({ error: (error as Error).message });
  }
});

app.get('/:pId', async (req: Request, res: Response) => {
  const { pId } = req.params; 
  try {
    const productId = parseInt(pId);

    if (isNaN(productId)) {
      return res.status(400).json({
        status: 'BAD REQUEST',
        error: 'El ID proporcionado no es válido',
      });
    }

    const product = await productManager.getProductById(productId);

    if (product) return res.json(product);
    

    return res.status(404).json({
      status: 'NOT FOUND',
      error: 'El producto no existe',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'INTERNAL SERVER ERROR',
      error: `Error al obtener el producto con el id ${pId} solicitado`,
    });
  }
});
  
