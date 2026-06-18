import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  // Don't show header on admin pages
  const isAdminPage = location.pathname.startsWith("/admin");

  if (isAdminPage) {
    return (
      <div className="header">
        <div className="logo">
          <h1>🖼️ KS Digital Studio</h1>
          <p>Admin Panel</p>
        </div>
        <nav>
          <Link to="/">Go to Website</Link>
          <Link to="/admin/dashboard">Dashboard</Link>
        </nav>
      </div>
    );
  }

  return (
    <div className="header">
      <div className="logo">
        <h1>🖼️ KS Digital Studio</h1>
        <p>Photo Frames & Digital Prints</p>
      </div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/frames">Frames</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/admin">Admin</Link>
      </nav>
    </div>
  );
}

export default Header;
