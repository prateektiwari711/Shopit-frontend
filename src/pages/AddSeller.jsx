import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const backendURL = import.meta.env.VITE_BACKEND_URL;

function AddSeller() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [siteAddress, setSiteAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in!");
      return navigate("/login");
    }

    if (!name || !email || !siteAddress) {
      return alert("All fields are required");
    }

    try {
      const res = await axios.post(
        `${backendURL}/api/seller`,
        { name, email, siteAddress },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      alert("Seller added successfully!");
      setName("");
      setEmail("");
      setSiteAddress("");
      navigate("/sellers");
    } catch (err) {
      console.error(err.response || err);
      const message = err.response?.data?.message || "Error adding seller";
      alert(message);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "#121212",
        minHeight: "100vh",
        width: "100%",
        padding: "20px",
      }}
    >
      <div
        className="card shadow-lg w-100"
        style={{
          maxWidth: "500px",
          backgroundColor: "#1e1e1e",
          borderRadius: "1rem",
          padding: "2rem",
          border: "none",
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "#28a745" }}>
          Add Seller
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-light">Name</label>
            <input
              type="text"
              className="form-control bg-dark text-white border-0"
              placeholder="Enter seller name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ borderRadius: "8px" }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Email</label>
            <input
              type="email"
              className="form-control bg-dark text-white border-0"
              placeholder="Enter seller email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderRadius: "8px" }}
            />
          </div>
          <div className="mb-4">
            <label className="form-label text-light">Website Address</label>
            <input
              type="text"
              className="form-control bg-dark text-white border-0"
              placeholder="Enter website address"
              value={siteAddress}
              onChange={(e) => setSiteAddress(e.target.value)}
              required
              style={{ borderRadius: "8px" }}
            />
          </div>
          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "#28a745",
              color: "#fff",
              borderRadius: "8px",
              fontWeight: "500",
              fontSize: "1.1rem",
            }}
          >
            Add Seller
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddSeller;
