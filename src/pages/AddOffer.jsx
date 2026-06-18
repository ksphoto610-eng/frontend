import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function AddOffer() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    validDate: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Check admin login
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/admin");
    }
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await axios.post("/api/offers", formData);
      setMessage("Offer added successfully!");
      setFormData({ title: "", description: "", validDate: "" });

      // Go back to dashboard after 1.5 seconds
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1500);
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="form-page">
      <Link to="/admin/dashboard" className="back-link">
        ← Back to Dashboard
      </Link>

      <h2>Add New Offer</h2>

      {message && <p className="success-msg">{message}</p>}
      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Offer Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. New Year Special Offer"
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="e.g. Get 20% off on all frames above ₹500"
            required
          />
        </div>

        <div className="form-group">
          <label>Valid Until Date</label>
          <input
            type="text"
            name="validDate"
            value={formData.validDate}
            onChange={handleChange}
            placeholder="e.g. 31 December 2024"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Offer
        </button>
      </form>
    </div>
  );
}

export default AddOffer;
