import React, { useState } from "react";
import axios from "axios";

function AddStock() {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "https://stockit-backend-9ug9.onrender.com/api/stock/add-stock",
        { itemName, price: parseFloat(price), quantity: parseInt(quantity) },
        { headers: { Authorization: token } }
      );
      alert(res.data.message);
      setItemName("");
      setPrice("");
      setQuantity("");
    } catch (err) {
      alert("Error adding stock");
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
          Add Stock
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-light">Item Name</label>
            <input
              type="text"
              className="form-control bg-dark text-white border-0"
              placeholder="Enter item"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
              style={{ borderRadius: "8px" }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Quantity</label>
            <input
              type="number"
              className="form-control bg-dark text-white border-0"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              style={{ borderRadius: "8px" }}
            />
          </div>
          <div className="mb-4">
            <label className="form-label text-light">Price</label>
            <input
              type="number"
              className="form-control bg-dark text-white border-0"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
            Add Stock
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddStock;
