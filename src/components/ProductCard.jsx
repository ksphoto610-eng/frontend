import React, { useState } from "react";
import axios from "axios";

function ProductCard({ product }) {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderData, setOrderData] = useState({
    customerName: "",
    phone: "",
    address: "",
  });
  const [message, setMessage] = useState("");

  // When user clicks "Order Now" button
  function handleOrderClick() {
    setShowOrderForm(true);
  }

  // When user types in the order form
  function handleChange(e) {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  }

  // When user submits the order
  async function handleSubmitOrder(e) {
    e.preventDefault();

    try {
      await axios.post("/api/orders", {
        customerName: orderData.customerName,
        phone: orderData.phone,
        productName: product.title,
        size: product.size,
        price: product.price,
        address: orderData.address,
      });

      setMessage("Order placed successfully! We will contact you soon.");
      setOrderData({ customerName: "", phone: "", address: "" });

      // Close the form after 2 seconds
      setTimeout(() => {
        setShowOrderForm(false);
        setMessage("");
      }, 2000);
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    }
  }

  // WhatsApp order button
  function handleWhatsApp() {
    const phone = "919876543210"; // Change this to your WhatsApp number
    const text = `Hello! I want to order:\nProduct: ${product.title}\nSize: ${product.size}\nPrice: ₹${product.price}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  }

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <div className="card-body">
        <h3>{product.title}</h3>
        <p className="size">Size: {product.size}</p>
        <p className="price">₹{product.price}</p>
        <p className="desc">{product.description}</p>

        <button className="order-btn" onClick={handleOrderClick}>
          🛒 Order Now
        </button>

        <button
          className="order-btn"
          onClick={handleWhatsApp}
          style={{ marginTop: "8px", backgroundColor: "#25d366" }}
        >
          📱 WhatsApp Order
        </button>
      </div>

      {/* Order Form Popup */}
      {showOrderForm && (
        <div className="overlay">
          <div className="order-modal">
            <h3>Place Order - {product.title}</h3>

            {message && <p className="success-msg">{message}</p>}

            <form onSubmit={handleSubmitOrder}>
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  name="customerName"
                  value={orderData.customerName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={orderData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <textarea
                  name="address"
                  value={orderData.address}
                  onChange={handleChange}
                  placeholder="Enter your delivery address"
                  required
                />
              </div>

              <div style={{ marginBottom: "15px", fontSize: "14px", color: "#555" }}>
                <p>Product: <strong>{product.title}</strong></p>
                <p>Size: <strong>{product.size}</strong></p>
                <p>Price: <strong>₹{product.price}</strong></p>
              </div>

              <div className="modal-btns">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowOrderForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="place-btn">
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
