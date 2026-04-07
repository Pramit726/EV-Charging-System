import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const StatusPage = () => {
  const { state } = useLocation();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', color: state.success ? 'green' : 'red' }}>
      <h1>{state.success ? "Success" : "Operation Failed"}</h1>
      <p>{state.message}</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default StatusPage;