import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check admin login
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/admin");
      return;
    }

    // Load orders
    axios
      .get("/api/orders")
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error loading orders:", err);
        setLoading(false);
      });
  }, []);

  async function deleteOrder(id) {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`/api/orders/${id}`);
        setOrders(orders.filter((o) => o._id !== id));
        alert("Order deleted!");
      } catch (error) {
        alert("Error deleting order. Please try again.");
      }
    }
  }

  if (loading) {
    return <p className="loading">Loading orders...</p>;
  }

  return (
    <div className="orders-page">
      <Link to="/admin/dashboard" className="back-link">
        ← Back to Dashboard
      </Link>

      <h2>📦 Customer Orders</h2>
      <p style={{ color: "#777", marginBottom: "20px", fontSize: "14px" }}>
        Total Orders: <strong>{orders.length}</strong>
      </p>

      {orders.length === 0 ? (
        <p className="no-data">No orders received yet.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Customer Name</th>
                <th>Phone</th>
                <th>Product</th>
                <th>Size</th>
                <th>Price</th>
                <th>Address</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order.customerName}</td>
                  <td>
                    <a
                      href={`https://wa.me/91${order.phone}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#25d366" }}
                    >
                      {order.phone}
                    </a>
                  </td>
                  <td>{order.productName}</td>
                  <td>{order.size}</td>
                  <td>₹{order.price}</td>
                  <td>{order.address}</td>
                  <td>
                    {new Date(order.createdAt).toLocaleDateString("en-IN")}
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteOrder(order._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Orders;
