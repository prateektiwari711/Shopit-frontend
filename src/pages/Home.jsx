import React from "react";
import { Link } from "react-router-dom";
import banner from "../assets/banner.png";

function Home() {
  return (
    <div className="position-relative w-100" style={{ minHeight: "100vh" }}>
      <img
        src={banner}
        alt="banner"
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          objectFit: "cover",
          objectPosition: "top",
          zIndex: 0,
          opacity: 0.4,
        }}
      />

      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.9))",
          zIndex: 1,
        }}
      ></div>

      <div
        className="position-relative z-2 d-flex flex-column align-items-center justify-content-center text-light text-center px-4"
        style={{ minHeight: "100vh" }}
      >
        <h1 className="display-4 fw-bold">Welcome to SHOPIT</h1>
        <p className="lead mt-3 mb-4">
          Your ultimate solution to track, manage, and optimize shop stock
          effortlessly.
        </p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link to="/login" className="btn btn-success btn-lg">
            Log In
          </Link>
          <Link to="/signup" className="btn btn-outline-light btn-lg">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
