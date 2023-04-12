import React, { useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

const products: Product[] = [
  { id: 1, name: 'Product 1', description: 'This is product 1', price: 10.99, category: 'Category 1' },
  { id: 2, name: 'Product 2', description: 'This is product 2', price: 19.99, category: 'Category 2' },
  { id: 3, name: 'Product 3', description: 'This is product 3', price: 5.99, category: 'Category 1' },
];

const ProductList: React.FC = () => {
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const handleCategoryFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(event.target.value);
  };

  const handleProductSelect = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleOrderSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowOrderSummary(true);
  };

  const filteredProducts = categoryFilter ? products.filter(product => product.category === categoryFilter) : products;

  const selectedProductsWithDetails = selectedProducts.map(productId => {
    const product = products.find(p => p.id === productId);
    return { id: product?.id, name: product?.name, price: product?.price };
  });

  const totalPrice = selectedProductsWithDetails.reduce((sum, product) => sum + (product.price || 0), 0);
  const [showOrderSummary, setShowOrderSummary] = useState<boolean>(false);

  return (
    <div>
      <h1>Our products</h1>
      <div>
        <label htmlFor="category-filter">Filter by category:</label>
        <select id="category-filter" value={categoryFilter} onChange={handleCategoryFilterChange}>
          <option value="">All categories</option>
          <option value="Category 1">Category 1</option>
          <option value="Category 2">Category 2</option>
        </select>
      </div>
      <form onSubmit={handleOrderSubmit}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Select</th>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td>
                  <input type="checkbox" checked={selectedProducts.includes(product.id)} onChange={() => handleProductSelect(product.id)} />
                </td>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <button type="submit">Place Order</button>
      </form>

      {showOrderSummary && (
        <div>
          <h2>Order Summary</h2>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {selectedProductsWithDetails.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={2}>Total Price:</td>
                <td>{totalPrice}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ProductList;
