import React from 'react';
import { Link } from 'react-router-dom';
import './footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className="bg-light py-3 fixed-bottom ">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <ul className="list-inline mb-0">
              <Link to="/customer">Customer Management</Link> | <Link to="/product">Place Order</Link>
            </ul>
          </div>
          <div className="col-md-6 text-md-right">
            <p className="mb-0">&copy; 2023 FPT. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
