import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const CustomerManagement: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState<Customer | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleAddSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if name already exists
    const nameExists = customers.some(customer => customer.name === name);
    if (nameExists) {
      alert('This name already exists');
      return;
    }

    // Check if mail already exists
    const mailExists = customers.some(customer => customer.email === email);
    if (mailExists) {
      alert('This mail already exists');
      return;
    }

    const newCustomer: Customer = {
      id: customers.length + 1,
      name: name,
      email: email,
      phone: phone,
    };
    setCustomers([...customers, newCustomer]);
    setName('');
    setEmail('');
    setPhone('');
    setShowAddModal(false);
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if name already exists
    const nameExists = customers.some(customer => customer.name === name);
    if (nameExists) {
      alert('This name already exists');
      return;
    }

    // Check if mail already exists
    const mailExists = customers.some(customer => customer.email === email);
    if (mailExists) {
      alert('This mail already exists');
      return;
    }

    if (!customerToEdit) return;
    const updatedCustomer = { ...customerToEdit, name, email, phone };
    const index = customers.findIndex(c => c.id === customerToEdit.id);
    const updatedCustomers = [...customers];
    updatedCustomers[index] = updatedCustomer;
    setCustomers(updatedCustomers);
    setShowEditModal(false);
  };

  const handleDelete = (id: number) => {
    const updatedCustomers = customers.filter(c => c.id !== id);
    setCustomers(updatedCustomers);
  };

  return (
    <div>
      <h1>Customer Management</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => {
                    setCustomerToEdit(customer);
                    setName(customer.name);
                    setEmail(customer.email);
                    setPhone(customer.phone);
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(customer.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="success" onClick={() => setShowAddModal(true)}>
        Add Customer
      </Button>

      <Link to="/order">
        <Button variant="primary">Place Order</Button>
      </Link>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="tel" placeholder="Enter phone number" value={phone} onChange={e => setPhone(e.target.value)} required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="formBasicPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="tel" placeholder="Enter phone number" value={phone} onChange={e => setPhone(e.target.value)} required />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CustomerManagement;
