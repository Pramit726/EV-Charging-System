import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchForm = () => {
  const [bookingId, setBookingId] = useState('');
  const [vehicleId, setVehicleId] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    // Client-side validation using JavaScript
    if (!bookingId || !vehicleId) {
      alert("Both Booking ID and Vehicle ID are required!");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/search`, {
        params: { bookingId, vehicleId }
      });
      // If record exists, navigate to details 
      navigate('/details', { state: { record: response.data } });
    } catch (error) {
      // Failure page when record is not found 
      navigate('/status', { state: { success: false, message: "Record not found in database." } });
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Search EV Charging Slot</h2>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Booking ID" value={bookingId} onChange={(e) => setBookingId(e.target.value)} /><br /><br />
        <input type="text" placeholder="Vehicle ID" value={vehicleId} onChange={(e) => setVehicleId(e.target.value)} /><br /><br />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchForm;
