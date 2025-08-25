import React from 'react';
import './App.css';
import 'primeicons/primeicons.css'; 
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../src/venderDashboard/components/forms/login';
import Register from '../src/venderDashboard/components/forms/register';
import AddFirm from '../src/venderDashboard/components/forms/addFirm';
import AddProduct from '../src/venderDashboard/components/forms/addproduct'
import Dashboard from '../src/venderDashboard/components/forms/dashboard';
import Allproducts from '../src/venderDashboard/components/Allproduct'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
       
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="addFirm" element={<AddFirm />} />
          <Route path="addProduct" element={<AddProduct />} />
          <Route path="products" element={<Allproducts />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;

