import { promises as fs } from 'fs';

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async getProducts() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            const products = JSON.parse(data);
            return products;
        } catch (error) {
            throw new Error('Error al obtener los productos');
        }
    }

    async getProductById(pid) {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            const products = JSON.parse(data);
            const product = products.find((p) => p.id === pid);
            return product;
        } catch (error) {
            throw new Error('Error al obtener el producto');
        }
    }
}

export default ProductManager;