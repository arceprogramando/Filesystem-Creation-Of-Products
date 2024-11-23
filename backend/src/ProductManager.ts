import fs from 'fs/promises';

class ProductManager {
  private filePath: string;

  constructor(filePath: string) {
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

  async getProductById(pid: number) {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      const products = JSON.parse(data);
      const product = products.find((p: { id: number }) => p.id === pid);
      return product;
    } catch (error) {
      throw new Error('Error al obtener los productos');
    }
  }
}

export default ProductManager;
