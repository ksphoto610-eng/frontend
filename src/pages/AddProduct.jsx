import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

function AddProduct() {
  const navigate = useNavigate();
  const { id } = useParams(); // If id exists, we are editing

  const isEditing = id ? true : false;

  const [formData, setFormData] = useState({
    title: "",
    size: "",
    price: "",
    image: "",
    description: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Check admin login
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/admin");
      return;
    }

    // If editing, load the product data
    if (isEditing) {
      axios
        .get(`/api/products`)
        .then((res) => {
          const product = res.data.find((p) => p._id === id);
          if (product) {
            setFormData({
              title: product.title,
              size: product.size,
              price: product.price,
              image: product.image,
              description: product.description,
            });
          }
        })
        .catch((err) => {
          console.log("Error loading product:", err);
        });
    }
  }, [id]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      if (isEditing) {
        // Update existing product
        await axios.put(`/api/products/${id}`, formData);
        setMessage("Product updated successfully!");
      } else {
        // Create new product
        await axios.post("/api/products", formData);
        setMessage("Product added successfully!");
        // Clear form after adding
        setFormData({ title: "", size: "", price: "", image: "", description: "" });
      }

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

      <h2>{isEditing ? "Edit Product" : "Add New Product"}</h2>

      {message && <p className="success-msg">{message}</p>}
      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Wooden Photo Frame 8x10"
            required
          />
        </div>

        <div className="form-group">
          <label>Size</label>
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
            placeholder="e.g. 8x10 inch"
            required
          />
        </div>

        <div className="form-group">
          <label>Price (₹)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g. 299"
            required
          />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Paste image URL here"
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the product..."
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          {isEditing ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
