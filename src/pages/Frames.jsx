import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

function Frames() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load products from the backend
    axios
      .get("/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2 className="page-title">Our Frame Collection</h2>

      {loading && <p className="loading">Loading products...</p>}

      {!loading && products.length === 0 && (
        <p className="no-data">
          No products available yet. Please check back soon!
        </p>
      )}

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Frames;
