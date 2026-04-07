import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DetailsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [record, setRecord] = useState(state?.record);
  const [duration, setDuration] = useState(record?.chargingDuration);
  const [timing, setTiming] = useState(record?.slotTiming);

  const handleUpdate = async () => {
    // Business Rule: Update only if status is active 
    if (record.status !== 'active') {
      navigate('/status', { state: { success: false, message: "Update not permitted: Booking is not active." } });
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/update/${record._id}`, {
        chargingDuration: duration,
        slotTiming: timing
      });
      navigate('/status', { state: { success: true, message: "Booking updated successfully!" } });
    } catch (error) {
      navigate('/status', { state: { success: false, message: "Update failed." } });
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Booking Details</h2>
      <p><strong>Customer:</strong> {record.customerName}</p>
      <p><strong>Status:</strong> {record.status}</p>
      
      <h3>Update Fields</h3>
      <label>Charging Duration (mins): </label>
      <input 
        type="number" 
        value={duration} 
        onChange={(e) => setDuration(e.target.value)}
        disabled={record.status !== 'active'} // UI Business Rule implementation [cite: 29]
      /><br /><br />
      
      <label>Slot Timing: </label>
      <input 
        type="text" 
        value={timing} 
        onChange={(e) => setTiming(e.target.value)} 
        disabled={record.status !== 'active'} 
      /><br /><br />
      
      <button onClick={handleUpdate}>Update Record</button>
    </div>
  );
};

export default DetailsPage;