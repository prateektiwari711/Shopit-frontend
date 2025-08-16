import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaBoxes, FaChartLine, FaBoxOpen } from "react-icons/fa";

const backendURL = import.meta.env.VITE_BACKEND_URL;

function Dashboard() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return setMsg("Unauthorized");

      try {
        const res = await axios.get(`${backendURL}/api/auth/dashboard`, {
          headers: { Authorization: token },
        });
        setMsg(res.data.message);
      } catch (err) {
        setMsg("Error fetching data");
      }
    };

    fetchData();
  }, []);

  const cards = [
    {
      title: "Add Stock",
      text: "Add new items to your shop’s personal inventory with ease.",
      icon: <FaPlus size={80} />,
      bg: "#198754",
      path: "/add-stock",
    },
    {
      title: "Check Stock",
      text: "Get a detailed view of your available stock and manage it smartly.",
      icon: <FaBoxes size={80} />,
      bg: "#146c43",
      path: "/check-stock",
    },
    {
      title: "Update Sales",
      text: "Update and monitor your product sales and analytics.",
      icon: <FaChartLine size={80} />,
      bg: "#0f5132",
      path: "/update-sales",
    },
    {
      title: "Place Order",
      text: "Place order for items which are less in your stcok",
      icon: <FaBoxOpen size={80} />,
      bg: "#0f5132",
      path: "/sellers",
    },
  ];

  return (
    <div className="container-fluid bg-dark min-vh-100 py-5 px-4 px-lg-5">
      {msg && (
        <h2 className="text-center mb-5 text-light animate-fade-up">{msg}</h2>
      )}

      <div className="row g-4 justify-content-center">
        {cards.map((card, idx) => (
          <div key={idx} className="col-12 col-md-6 col-lg-4">
            <div
              className="card h-100 text-white shadow-lg border-0 p-4 animate-fade-up"
              style={{
                backgroundColor: card.bg,
                borderRadius: "1.5rem",
                cursor: "pointer",
                transition: "transform 0.3s",
              }}
              onClick={() => navigate(card.path)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div className="text-center mb-4">{card.icon}</div>
              <h4 className="text-center fw-bold mb-2">{card.title}</h4>
              <p className="text-center small">{card.text}</p>
              <div className="d-flex justify-content-center mt-auto">
                <button className="btn btn-outline-light px-4 py-2 fw-semibold rounded-pill">
                  Go to {card.title}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
