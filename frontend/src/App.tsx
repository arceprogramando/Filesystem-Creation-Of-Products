import { useEffect, useState } from 'react';
import './App.css';

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  code: string;
  stock: number;
};

function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch('http://localhost:8080/');
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <h1 className="text-center">Productos</h1>
      <div className="flex justify-center flex-wrap gap-4">
        {products.map((product: Product) => (
          <div className="product-card flex flex-col gap-4">
            <div key={product.id}>Titulo: {product.title}</div>
            <p>Descripción: {product.description}</p>
            <p>Precio:{Math.round(product.price * 100) / 100}</p>
            <p>Stock: {product.stock}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
