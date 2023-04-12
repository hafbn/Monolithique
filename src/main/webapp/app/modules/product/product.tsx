import React, { useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

const products: Product[] = [
  { id: 1, name: 'T-shirt', description: 'This is a pink t-shirt', price: 10.99, category: 'Top' },
  { id: 2, name: 'Chemise', description: 'This is a white chemise', price: 19.99, category: 'Top' },
  { id: 3, name: 'Joggers', description: 'This is a type of pants', price: 5.99, category: 'Bottom' },
  { id: 4, name: 'Mini skirt', description: 'This is a type of skirt', price: 5.99, category: 'Bottom' },
  { id: 5, name: 'Ring', description: 'This is a type of accessory', price: 5.99, category: 'Accessory' },
  { id: 6, name: 'Earrings', description: 'This is a type of accessory', price: 5.99, category: 'Accessory' },
  { id: 7, name: 'Chanel', description: 'This is a type of bag', price: 955.99, category: 'Accessory' },
  { id: 8, name: 'Nike', description: 'Nike Air Force 1', price: 155.99, category: 'Shoes' },
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
      {/* <div  style={{ position: 'fixed', left: 0 }}>
        <Sidebar/>
      </div> */}
      <h1>Our products</h1>
      <div>
        <Form>
          <Form.Group controlId="category-filter">
            <Form.Select id="category-filter" value={categoryFilter} onChange={handleCategoryFilterChange}>
              <option value="">All categories</option>
              <option value="Top">Top</option>
              <option value="Bottom">Bottom</option>
              <option value="Accessory">Accessory</option>
              <option value="Shoes">Shoes</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </div>
      <form onSubmit={handleOrderSubmit}>
        <Table className="mt-3" striped bordered hover>
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
        <Button type="submit">Place Order</Button>
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
