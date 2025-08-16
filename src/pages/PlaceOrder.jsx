import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const PlaceOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { seller } = location.state || {};
  const [lowStock, setLowStock] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [openOrder, setOpenOrder] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Please login first!");
      return;
    }

    fetchLowStock();
    fetchOrders();
  }, [seller]);

  const fetchLowStock = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/stock/check-stock`, {
        headers: { Authorization: token },
      });

      if (Array.isArray(res.data)) {
        const low = res.data.filter((item) => item.quantity < 5);
        setLowStock(low);
      } else {
        setLowStock([]);
      }
    } catch (err) {
      console.error("❌ Failed to fetch low-stock items", err);
    }
  };

  const fetchOrders = async () => {
    try {
      if (!seller?._id || !seller.user) {
        console.warn("⚠️ Missing seller or buyer info in seller object");
        return;
      }

      const buyerId = seller.user;
      console.log("📌 Using buyer ID from seller:", buyerId);

      const res = await axios.get(`${backendURL}/api/order`, {
        headers: { Authorization: token },
      });

      console.log("📡 Fetched all orders:", res.data);

      const allOrders = Array.isArray(res.data)
        ? res.data
        : res.data.orders || [];

      const filtered = allOrders.filter(
        (order) =>
          order.seller?._id === seller._id && order.buyer?._id === buyerId
      );

      console.log("🔹 Filtered orders for this seller & buyer:", filtered);

      setOrders(filtered);
      setOrderPlaced(filtered.length > 0);

      if (filtered.length === 0) {
        console.warn(
          `⚠️ No orders found for buyer ${buyerId} with seller ${seller._id}`
        );
      }
    } catch (err) {
      console.error("❌ Error while fetching orders:", err);
    }
  };

  const handleChange = (index, field, value) => {
    const updatedItems = [...lowStock];
    updatedItems[index][field] = value;
    setLowStock(updatedItems);
  };

  const handlePlaceOrder = async () => {
    if (lowStock.length === 0) {
      alert("No low-stock items to order.");
      return;
    }

    setLoading(true);
    try {
      const itemsToSend = lowStock.map(({ itemName, quantity, _id }) => ({
        _id,
        itemName,
        quantity,
      }));

      const res = await axios.post(
        `${backendURL}/api/order/place-order`,
        { sellerId: seller?._id, items: itemsToSend },
        { headers: { Authorization: token } }
      );

      if (res.data.success) {
        alert(res.data.message);
        setLowStock([]);
        setOrderPlaced(true);
        fetchOrders();
      } else {
        alert("Failed to place order.");
      }
    } catch (err) {
      console.error("❌ Error sending order:", err);
      alert("Error sending order to seller.");
    } finally {
      setLoading(false);
    }
  };

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
          maxWidth: "600px",
          backgroundColor: "#1e1e1e",
          borderRadius: "1rem",
          padding: "2rem",
          border: "none",
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "#28a745" }}>
          Seller :- {seller?.name || "Seller"}
        </h2>

        <div>
          {lowStock.length === 0 ? (
            <p style={{ color: "#ccc" }}>
              All items are in sufficient quantity.
            </p>
          ) : (
            lowStock.map((item, index) => (
              <div
                key={item._id}
                className="mb-3 p-3"
                style={{ backgroundColor: "#2a2a2a", borderRadius: "0.5rem" }}
              >
                <input
                  type="text"
                  className="form-control mb-2 bg-dark text-white"
                  value={item.itemName}
                  onChange={(e) =>
                    handleChange(index, "itemName", e.target.value)
                  }
                  placeholder="Item Name"
                />
                <input
                  type="number"
                  className="form-control mb-2 bg-dark text-white"
                  value={item.quantity}
                  onChange={(e) =>
                    handleChange(index, "quantity", parseInt(e.target.value))
                  }
                  placeholder="Quantity"
                />
              </div>
            ))
          )}
          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              Back
            </button>
            <button
              className="btn btn-success"
              onClick={handlePlaceOrder}
              disabled={loading || lowStock.length === 0}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>

        <h3 className="mt-5 mb-3" style={{ color: "#28a745" }}>
          Orders Placed with {seller?.name}
        </h3>
        {orders.length === 0 ? (
          <p style={{ color: "#ccc" }}>No orders placed yet.</p>
        ) : (
          <div>
            {orders.map((order) => (
              <div
                key={order._id}
                className="mb-3 p-3"
                style={{ backgroundColor: "#2a2a2a", borderRadius: "0.5rem" }}
              >
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    setOpenOrder(openOrder === order._id ? null : order._id)
                  }
                >
                  <span style={{ color: "#fff" }}>
                    Order on {new Date(order.createdAt).toLocaleString()}
                  </span>
                  <span style={{ color: "#28a745" }}>
                    {openOrder === order._id ? "▲" : "▼"}
                  </span>
                </div>
                {openOrder === order._id && (
                  <div className="mt-3">
                    <ul className="list-unstyled">
                      {order.items.map((it) => (
                        <li
                          key={it._id}
                          style={{ color: "#ccc", marginBottom: "5px" }}
                        >
                          {it.itemName} — {it.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceOrder;
