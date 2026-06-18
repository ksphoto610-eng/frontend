import React from "react";

function Contact() {
  function handleWhatsApp() {
    const phone = "919876543210"; // Change to your number
    const text = "Hello! I want to know more about your frames.";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  }

  return (
    <div>
      <h2 className="page-title">Contact Us</h2>

      <div className="contact-page">
        <h2>Get In Touch</h2>

        <div className="contact-info">
          <p>
            <span>🏪 Shop Name: </span> KS Digital Studio
          </p>
          <p>
            <span>📍 Address: </span> Main Road, Kovilpatti, Tamil Nadu - 628501
          </p>
          <p>
            <span>📞 Phone: </span> +91 98765 43210
          </p>
          <p>
            <span>📱 WhatsApp: </span> +91 98765 43210
          </p>
          <p>
            <span>📧 Email: </span> ksdigitalstudio@gmail.com
          </p>
          <p>
            <span>🕐 Working Hours: </span> Mon-Sat, 9:00 AM - 7:00 PM
          </p>
        </div>

        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noreferrer"
          className="whatsapp-big-btn"
        >
          📱 Chat on WhatsApp
        </a>

        <div
          style={{
            marginTop: "25px",
            padding: "15px",
            backgroundColor: "#f0f0f0",
            borderRadius: "6px",
          }}
        >
          <p style={{ fontSize: "14px", color: "#666", textAlign: "center" }}>
            You can also visit our shop directly. We are happy to help you choose
            the perfect frame for your photos!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
