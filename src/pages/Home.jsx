import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load offers from the backend
    axios
      .get("/api/offers")
      .then((res) => {
        setOffers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching offers:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <h2>Welcome to KS Digital Studio</h2>
        <p>
          Beautiful photo frames, canvas prints, and digital art for your home
          and office. High quality printing with fast delivery!
        </p>
        <Link to="/frames" className="hero-btn">
          View Our Frames
        </Link>
      </div>

      {/* Offers Section */}
      <div className="offers-section">
        <h2>🎉 Special Offers</h2>

        {loading && <p className="loading">Loading offers...</p>}

        {!loading && offers.length === 0 && (
          <p className="no-data">No offers available right now. Check back later!</p>
        )}

        <div className="offers-grid">
          {offers.map((offer) => (
            <div key={offer._id} className="offer-card">
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
              <p className="valid-date">Valid until: {offer.validDate}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-box">
            <div className="icon">🖼️</div>
            <h3>Premium Frames</h3>
          </div>
          <div className="feature-box">
            <div className="icon">🚀</div>
            <h3>Fast Delivery</h3>
          </div>
          <div className="feature-box">
            <div className="icon">💰</div>
            <h3>Best Prices</h3>
          </div>
          <div className="feature-box">
            <div className="icon">⭐</div>
            <h3>Top Quality</h3>
          </div>
          <div className="feature-box">
            <div className="icon">📞</div>
            <h3>24/7 Support</h3>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>© 2024 KS Digital Studio. All rights reserved.</p>
        <p>📍 Kovilpatti, Tamil Nadu | 📞 +91 98765 43210</p>
      </div>
    </div>
  );
}

export default Home;
