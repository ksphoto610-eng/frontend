import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is logged in
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/admin");
      return;
    }

    // Load products and offers
    loadData();
  }, []);

  async function loadData() {
    try {
      const productRes = await axios.get("/api/products");
      const offerRes = await axios.get("/api/offers");
      setProducts(productRes.data);
      setOffers(offerRes.data);
      setLoading(false);
    } catch (error) {
      console.log("Error loading data:", error);
      setLoading(false);
    }
  }

  async function deleteProduct(id) {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`/api/products/${id}`);
        setProducts(products.filter((p) => p._id !== id));
        alert("Product deleted successfully!");
      } catch (error) {
        alert("Error deleting product. Please try again.");
      }
    }
  }

  async function deleteOffer(id) {
    if (window.confirm("Are you sure you want to delete this offer?")) {
      try {
        await axios.delete(`/api/offers/${id}`);
        setOffers(offers.filter((o) => o._id !== id));
        alert("Offer deleted successfully!");
      } catch (error) {
        alert("Error deleting offer. Please try again.");
      }
    }
  }

  function handleLogout() {
    localStorage.removeItem("isAdmin");
    navigate("/admin");
  }

  if (loading) {
    return <p className="loading">Loading dashboard...</p>;
  }

  return (
    <div className="admin-page">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
        <h2>📊 Admin Dashboard</h2>
        <button onClick={handleLogout} className="admin-btn red">
          Logout
        </button>
      </div>

      {/* Quick Stats */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px", flexWrap: "wrap" }}>
        <div style={{ background: "#1a1a2e", color: "white", padding: "20px 30px", borderRadius: "8px", textAlign: "center" }}>
          <p style={{ fontSize: "32px", fontWeight: "bold", color: "#f0a500" }}>{products.length}</p>
          <p>Total Products</p>
        </div>
        <div style={{ background: "#1a1a2e", color: "white", padding: "20px 30px", borderRadius: "8px", textAlign: "center" }}>
          <p style={{ fontSize: "32px", fontWeight: "bold", color: "#f0a500" }}>{offers.length}</p>
          <p>Active Offers</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="admin-actions">
        <Link to="/admin/add-product" className="admin-btn gold">
          + Add New Product
        </Link>
        <Link to="/admin/add-offer" className="admin-btn green">
          + Add New Offer
        </Link>
        <Link to="/admin/orders" className="admin-btn blue">
          📦 View Orders
        </Link>
      </div>

      {/* Products Table */}
      <h3 style={{ marginBottom: "15px", color: "#1a1a2e" }}>All Products</h3>
      <div className="admin-table-wrap">
        {products.length === 0 ? (
          <p className="no-data">No products added yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Size</th>
                <th>Price</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img src={product.image} alt={product.title} />
                  </td>
                  <td>{product.title}</td>
                  <td>{product.size}</td>
                  <td>₹{product.price}</td>
                  <td>{product.description.substring(0, 40)}...</td>
                  <td>
                    <div className="table-actions">
                      <Link
                        to={`/admin/edit-product/${product._id}`}
                        className="edit-btn"
                      >
                        Edit
                      </Link>
                      <button
                        className="delete-btn"
                        onClick={() => deleteProduct(product._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <hr className="section-divider" />

      {/* Offers Table */}
      <h3 style={{ marginBottom: "15px", color: "#1a1a2e" }}>All Offers</h3>
      <div className="admin-table-wrap">
        {offers.length === 0 ? (
          <p className="no-data">No offers added yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Valid Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <tr key={offer._id}>
                  <td>{offer.title}</td>
                  <td>{offer.description}</td>
                  <td>{offer.validDate}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteOffer(offer._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
