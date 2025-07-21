import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AddStock from "./pages/AddStock";
import CheckStock from "./pages/CheckStock";
import UpdateSales from "./pages/UpdateSales";
import { AuthProvider } from "./store/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="d-flex bg-dark">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-stock" element={<AddStock />} />
            <Route path="/check-stock" element={<CheckStock />} />
            <Route path="/update-sales" element={<UpdateSales />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
