import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaSave, FaTimes, FaTrash } from "react-icons/fa";

const CheckStock = () => {
  const [stock, setStock] = useState([]);
  const [search, setSearch] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [updatedItem, setUpdatedItem] = useState({
    itemName: "",
    quantity: "",
    price: "",
  });

  const token = localStorage.getItem("token");

  const fetchStock = async () => {
    try {
      const res = await axios.get(
        "https://stockit-backend-9ug9.onrender.com/api/stock/check-stock",
        { headers: { Authorization: token } }
      );
      setStock(res.data);
    } catch (err) {
      alert("Error fetching stock");
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(
        `https://stockit-backend-9ug9.onrender.com/api/stock/delete/${id}`,
        {
          headers: { Authorization: token },
        }
      );
      fetchStock();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item._id);
    setUpdatedItem({
      itemName: item.itemName,
      quantity: item.quantity,
      price: item.price,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://stockit-backend-9ug9.onrender.com/api/stock/update/${editingItem}`,
        {
          ...updatedItem,
          quantity: parseInt(updatedItem.quantity),
          price: parseFloat(updatedItem.price),
        },
        { headers: { Authorization: token } }
      );
      setEditingItem(null);
      fetchStock();
    } catch (err) {
      alert("Update failed");
    }
  };

  const filteredStock = search.trim()
    ? stock.filter((item) =>
        item.itemName.toLowerCase().includes(search.toLowerCase())
      )
    : stock;

  return (
    <div
      className="d-flex flex-column align-items-center px-3"
      style={{
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "#fff",
        width: "100%",
        paddingTop: "40px",
      }}
    >
      <h1 className="text-success mb-4 text-center">Check Stock</h1>

      <input
        type="text"
        className="form-control bg-dark text-white mb-4 w-100 w-md-50"
        style={{ maxWidth: "500px", borderRadius: "12px" }}
        placeholder="🔍 Search by item name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="w-100" style={{ maxWidth: "800px" }}>
        {filteredStock.length === 0 ? (
          <div className="text-center text-white fs-5 mt-4">No items found</div>
        ) : (
          filteredStock.map((item) => (
            <div
              key={item._id}
              className="card mb-3 p-3"
              style={{
                backgroundColor: "#1e1e1e",
                borderRadius: "16px",
                border: "1px solid #333",
                color: "white",
              }}
            >
              {editingItem === item._id ? (
                <form onSubmit={handleUpdate}>
                  <div className="row g-3 align-items-center">
                    <div className="col-lg-4 col-md-12">
                      <input
                        type="text"
                        className="form-control bg-dark text-white border-0"
                        value={updatedItem.itemName}
                        onChange={(e) =>
                          setUpdatedItem({
                            ...updatedItem,
                            itemName: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="col-lg-2 col-md-6">
                      <input
                        type="number"
                        className="form-control bg-dark text-white border-0"
                        value={updatedItem.quantity}
                        onChange={(e) =>
                          setUpdatedItem({
                            ...updatedItem,
                            quantity: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="col-lg-2 col-md-6">
                      <input
                        type="number"
                        className="form-control bg-dark text-white border-0"
                        value={updatedItem.price}
                        onChange={(e) =>
                          setUpdatedItem({
                            ...updatedItem,
                            price: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="col-lg-4 d-flex gap-2 mt-2 mt-lg-0">
                      <button
                        className="btn btn-success w-100 d-flex align-items-center justify-content-center gap-1 shadow-sm"
                        type="submit"
                        title="Save"
                      >
                        <FaSave />
                        <span className="d-none d-md-inline">Save</span>
                      </button>
                      <button
                        className="btn btn-secondary w-100 d-flex align-items-center justify-content-center gap-1 shadow-sm"
                        onClick={() => setEditingItem(null)}
                        title="Cancel"
                      >
                        <FaTimes />
                        <span className="d-none d-md-inline">Cancel</span>
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <>
                  <div className="row align-items-center">
                    <div className="col-lg-4 col-md-12 fw-bold text-uppercase">
                      {item.itemName}
                    </div>
                    <div className="col-lg-2 col-md-4">
                      Qty: {item.quantity}
                    </div>
                    <div className="col-lg-2 col-md-4">₹{item.price}</div>
                    <div className="col-lg-4 col-md-4 d-flex gap-2 mt-2 mt-lg-0 justify-content-end">
                      <button
                        className="btn btn-success btn-sm d-flex align-items-center justify-content-center px-3 shadow-sm rounded-circle"
                        title="Edit"
                        onClick={() => handleEditClick(item)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-danger btn-sm d-flex align-items-center justify-content-center px-3 shadow-sm rounded-circle"
                        title="Delete"
                        onClick={() => handleDelete(item._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <small className="text-success text-opacity-50">
                    Last Updated:{" "}
                    {!isNaN(new Date(item.lastUpdated))
                      ? new Date(item.lastUpdated).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      : "N/A"}
                  </small>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CheckStock;
