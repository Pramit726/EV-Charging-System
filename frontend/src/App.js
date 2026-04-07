import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SearchForm from './components/SearchForm';
import DetailsPage from './components/DetailsPage';
import StatusPage from './components/StatusPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchForm />} />
          <Route path="/details" element={<DetailsPage />} />
          <Route path="/status" element={<StatusPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;