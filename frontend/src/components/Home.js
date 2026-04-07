import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h1>EV Charging Management System</h1>
    <nav>
      <Link to="/search" style={{ fontSize: '20px' }}>Search and Update Bookings</Link>
    </nav>
  </div>
);

export default Home;