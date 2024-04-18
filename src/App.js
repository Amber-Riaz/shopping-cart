import React, { useState } from 'react';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cancel from "./pages/Cancel";
import Store from "./pages/Store";
import Success from "./pages/Success";
import LoginPage from "./pages/LoginPage"; // Import the LoginPage component
import { Container } from "react-bootstrap";
import CartProvider from './CartContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      <CartProvider>
      <Container>
        <BrowserRouter>
          <Routes>
            <Route
              index
              element={
                <LoginPage
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              }
            />
            {isAuthenticated && <Route path="/" element={<Navigate to="/store" />} />}
            <Route path="/store" element={<Store />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          </Routes>
        </BrowserRouter>
      </Container>
      </CartProvider>
    </div>
  );
}

export default App;

