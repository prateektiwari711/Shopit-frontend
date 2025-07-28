import React, { useState } from "react";
import axios from "axios";

const UpdateSales = () => {
  const [itemName, setItemName] = useState("");
  const [quantitySold, setQuantitySold] = useState("");

  const handleSale = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "https://stockit-backend-9ug9.onrender.com/api/stock/update-sales",
        {
          itemName,
          quantity: parseInt(quantitySold),
        },
        { headers: { Authorization: token } }
      );
      alert(res.data.message);
      setItemName("");
      setQuantitySold("");
    } catch (err) {
      alert(err?.response?.data?.message || "Error updating sales. Try again.");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100 p-3"
      style={{
        backgroundColor: "#121212",
        minHeight: "100vh",
        width: "100%",
        padding: "20px",
      }}
    >
      <div
        className="card shadow-lg p-4 w-100"
        style={{
          maxWidth: "450px",
          backgroundColor: "#1e1e1e",
          borderRadius: "1rem",
          border: "none",
        }}
      >
        <h3 className="text-center mb-4 fw-bold" style={{ color: "#28a745" }}>
          Update Sales
        </h3>
        <form onSubmit={handleSale}>
          <div className="mb-3">
            <label className="form-label text-light">Item Name</label>
            <input
              type="text"
              className="form-control bg-dark text-white"
              placeholder="Enter item name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
              style={{ borderRadius: "8px", border: "1px solid #444" }}
            />
          </div>
          <div className="mb-4">
            <label className="form-label text-light">Quantity Sold</label>
            <input
              type="number"
              className="form-control bg-dark text-white"
              placeholder="Enter quantity"
              value={quantitySold}
              onChange={(e) => setQuantitySold(e.target.value)}
              required
              style={{ borderRadius: "8px", border: "1px solid #444" }}
            />
          </div>
          <button
            type="submit"
            className="btn w-100 fw-semibold"
            style={{
              backgroundColor: "#28a745",
              color: "#fff",
              borderRadius: "8px",
              fontSize: "1.05rem",
              transition: "all 0.3s",
            }}
          >
            Update Sales
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateSales;
