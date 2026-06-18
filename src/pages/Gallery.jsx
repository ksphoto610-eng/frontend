import React, { useState, useEffect } from "react";
import axios from "axios";

function Gallery() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We use product images for the gallery
    axios
      .get("/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching gallery:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2 className="page-title">Our Gallery</h2>

      <p style={{ textAlign: "center", padding: "15px", color: "#555" }}>
        Take a look at some of our beautiful frame work!
      </p>

      {loading && <p className="loading">Loading gallery...</p>}

      {!loading && products.length === 0 && (
        <p className="no-data">Gallery is empty. Check back soon!</p>
      )}

      <div className="gallery-grid">
        {products.map((product) => (
          <div key={product._id} className="gallery-item">
            <img src={product.image} alt={product.title} />
          </div>
        ))}
      </div>

      <div style={{ padding: "20px", textAlign: "center" }}>
        <p style={{ color: "#777", fontSize: "14px" }}>
          Want to get your photos framed like these? Contact us!
        </p>
      </div>
    </div>
  );
}

export default Gallery;
