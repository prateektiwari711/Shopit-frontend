import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;
const Sellers = () => {
  const navigate = useNavigate();
  const [sellers, setSellers] = useState([]);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Please login first!");
      navigate("/login");
      return;
    }
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/seller`, {
        headers: { Authorization: token },
      });
      setSellers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching sellers:", err);
      alert("Failed to fetch sellers");
    }
  };

  const filteredSellers = sellers.filter(
    (s) =>
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="d-flex justify-content-center align-items-start"
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
          maxWidth: "70vw",
          backgroundColor: "#1e1e1e",
          borderRadius: "1rem",
          padding: "2rem",
          border: "none",
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "#28a745" }}>
          Sellers
        </h2>

        <button
          className="btn mb-3 w-100"
          style={{ backgroundColor: "#28a745", color: "#fff" }}
          onClick={() =>
            navigate("/add-seller", { state: { refresh: fetchSellers } })
          }
        >
          Add Seller
        </button>

        <input
          type="text"
          className="form-control mb-3 bg-dark text-light"
          placeholder="🔍 Search seller..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div>
          {Array.isArray(filteredSellers) && filteredSellers.length > 0 ? (
            filteredSellers.map((seller) => (
              <div
                key={seller._id}
                className="mb-3 p-3"
                style={{ backgroundColor: "#2a2a2a", borderRadius: "0.5rem" }}
              >
                <h5 style={{ color: "#28a745" }}>{seller.name}</h5>
                <div className="d-flex gap-2">
                  <button
                    className="btn"
                    style={{ backgroundColor: "#28a745", color: "#fff" }}
                    onClick={() =>
                      navigate("/place-order", { state: { seller } })
                    }
                  >
                    Place Order
                  </button>
                  <a
                    href={seller.siteAddress}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{ backgroundColor: "#28a745", color: "#fff" }}
                  >
                    Visit Site
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: "#ccc" }}>No sellers found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sellers;
