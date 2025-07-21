import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("token", res.data.token);
      setMsg("Login successful");
      navigate("/dashboard");
    } catch (error) {
      setMsg(error.response?.data?.message || "LogIn Failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 vw-100"
      style={{ backgroundColor: "#151515" }}
    >
      <div
        className="card border-0 rounded-4 p-3"
        style={{
          backgroundColor: "#1a1a1a",
          color: "#ffffff",
          width: "100%",
          maxWidth: "420px",
        }}
      >
        <div className="card-body text-center">
          <form autoComplete="off" onSubmit={handleLogin}>
            <h1 className="h4 mb-3 text-light">Welcome to Shopit</h1>
            <p className="text-light mb-4">Log in to manage your inventory</p>

            {msg && <div className="alert alert-info">{msg}</div>}

            <div className="mb-3 text-start">
              <label htmlFor="email" className="form-label text-light">
                Email address
              </label>
              <input
                type="email"
                className="form-control bg-dark text-light border-0"
                id="email"
                name="email"
                onChange={handleChange}
                style={{
                  borderBottom: "2px solid #198754",
                  backgroundColor: "#212121",
                }}
              />
            </div>

            <div className="mb-3 text-start">
              <label htmlFor="password" className="form-label text-light">
                Password
              </label>
              <input
                type="password"
                className="form-control bg-dark text-light border-0"
                id="password"
                name="password"
                onChange={handleChange}
                autoComplete="current-password"
                style={{
                  borderBottom: "2px solid #198754",
                  backgroundColor: "#212121",
                }}
              />
            </div>

            <div className="form-check text-start mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberMe"
              />
              <label
                className="form-check-label text-light"
                htmlFor="rememberMe"
              >
                Remember me
              </label>
            </div>

            <button
              className="w-100 btn btn-lg"
              type="submit"
              style={{
                backgroundColor: "#198754",
                color: "#151515",
                border: "none",
              }}
            >
              LogIn
            </button>

            <p className="mt-5 mb-3 text-grey small">© 2025 Shopit Inc.</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
