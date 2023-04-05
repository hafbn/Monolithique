import React, { useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import './order.scss';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Order {
  id: number;
  customerName: string;
  products: Product[];
  total: number;
}

const Order: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
  ]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customerName, setCustomerName] = useState<string>('');
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [showOrderModal, setShowOrderModal] = useState<boolean>(false);

  const handleProductSelect = (event: React.ChangeEvent<HTMLInputElement>, product: Product) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedProducts([...selectedProducts, product]);
      setTotal(total + product.price);
    } else {
      setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
      setTotal(total - product.price);
    }
  };

  const handleOrderSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newOrder: Order = {
      id: orders.length + 1,
      customerName: customerName,
      products: selectedProducts,
      total: total,
    };
    setOrders([...orders, newOrder]);
    setCustomerName('');
    setSelectedProducts([]);
    setTotal(0);
    setShowOrderModal(false);
  };

  return (
    <div>
      <h1>Place Order</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>
                <Form.Check type="checkbox" onChange={e => handleProductSelect(e, product)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="primary" onClick={() => setShowOrderModal(true)}>
        Place Order
      </Button>

      <Modal show={showOrderModal} onHide={() => setShowOrderModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Place Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleOrderSubmit}>
            <Form.Group controlId="formBasicCustomerName">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter customer name"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicSelectedProducts">
              <Form.Label>Selected Products</Form.Label>
              {selectedProducts.map(product => (
                <div key={product.id}>
                  {product.name} (${product.price})
                </div>
              ))}
            </Form.Group>
            <Form.Group controlId="formBasicTotal">
              <Form.Label>Total</Form.Label>
              <Form.Control type="text" value={`$${total}`} readOnly />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <h1>Orders</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Products</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.products.map(product => product.name).join(', ')}</td>
              <td>${order.total}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Order;
