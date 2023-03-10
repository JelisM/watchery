import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import HomePage from '../HomePage/HomePage'
import NavBar from "../../components/NavBar/NavBar";
export default function App() {
  const [ user, setUser ] = useState(getUser())

  return (
    <main className="App">
      {
        user ?
        <>
          
          <Routes>
            <Route path="/orders/new" element={<HomePage user={user} />} />
            <Route path="/orders" element={<OrderHistoryPage user={user} />} />
            <Route path="/*" element={<Navigate to="/orders/new" />} />
          </Routes>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}


