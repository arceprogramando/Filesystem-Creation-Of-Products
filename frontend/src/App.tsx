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
      <h1>Productos</h1>
      {products.map((product: Product) => (
        <>
          <div key={product.id}>{product.title}</div>
          <p>{product.description}</p>
          <p>{product.price}</p>
        </>
      ))}
    </>
  );
}

export default App;
