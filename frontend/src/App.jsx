import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import AddInventory from './pages/addInventory';
import Inventory from './pages/inventory';
import ShipmentTracker from './pages/shipmentTrack';
import Dashboard from './pages/dashboard';
import Signup from './pages/register';
import LandingPage from './pages/landing'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-inventory" element={<AddInventory />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/shipment-tracker" element={<ShipmentTracker />} />
        <Route path="/dashboard" element ={<Dashboard />} />
        <Route path="/register" element ={<Signup/>}/>
        {/* <Route path="/vender-order" element ={<VendorOrder/>}/> */}
      </Routes>
    </Router>
  );
}

export default App;
