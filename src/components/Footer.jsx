// src/components/Footer.jsx
import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Column */}
        <div className="footer-brand">
          <h1>TENDR</h1>
          <p>
            Empowering your celebrations with curated planning and unforgettable
            experiences.
          </p>
          <br />
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:contacttendr@gmail.com">contacttendr@gmail.com</a>
          </p>
          <p>
            <strong>Phone:</strong> +91-9211668427
          </p>
          <p>
            <strong>Address:</strong> DELHI NCR
          </p>
          <button
            className="back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            ↑ Back to Top
          </button>
        </div>

        {/* Services */}
        <div className="footer-col">
          <h3>Services</h3>
          <ul>
            <li><a href="#">Corporate Events</a></li>
            <li><a href="#">Photography</a></li>
            <li><a href="#">Private Parties</a></li>
            <li><a href="#">Decoration</a></li>
            <li><a href="#">Catering</a></li>
            <li><a href="#">DJ</a></li>
          </ul>
        </div>

        {/* Platform */}
        <div className="footer-col">
          <h3>Platform</h3>
          <ul>
            <li><a href="/event-planning">Event Planning</a></li>
          </ul>
        </div>

        {/* Company */}
        <div className="footer-col">
          <h3>Company</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-col">
          <h3>Support</h3>
          <ul>
            <li><a href="/contact-us">Contact Us</a></li>
            <li><a href="/refund-policy">Refund Policy</a></li>
            <li><a href="/cancellation-policy">Cancellation Policy</a></li>
          </ul>
        </div>
      </div>

      {/* Social Media */}
      <div className="footer-social">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF className="icon" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="icon" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaXTwitter className="icon" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn className="icon" />
        </a>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>
          © 2025 tendr. All rights reserved. |{" "}
          <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
}
