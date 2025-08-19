import React, { useState, useEffect } from "react";
import "../assets/css/vendors/cookie.css";

// Exported function to get a specific cookie by name
export const getCookie = (name) => {
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const [key, value] = cookies[i].split("=");
    if (key === name) {
      return value;
    }
  }
  return null;
};

// Exported function to set a cookie with name, value, and expiration days
export const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/`;
};

// CookieConsent Component
const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  const buttonStyle = {
    backgroundColor: "rgb(262,63,52)",
    border: "none",
    color: "#fff",
    textDecoration: "underline",
    cursor: "pointer",
    borderRadius: "10px",
    padding: "5px 10px",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "10px",
  };

  // Check cookie on component load
  useEffect(() => {
    const consentCookie = getCookie("cookieAccepted");
    if (!consentCookie) {
      setShowBanner(true);
    }
  }, []);

  // Handle "Accept All" button click
  const handleAccept = () => {
    setCookie("cookieAccepted", "true", 30); // Save cookie for 30 days
    setShowBanner(false);
  };

  // Handle "Necessary Only" button click
  const handleNecessaryOnly = () => {
    setCookie("cookieAccepted", "necessary", 30);
    setShowBanner(false);
  };

  // If banner is not to be shown, return null
  if (!showBanner) {
    return null;
  }

  return (
    <div className="wrapper show">
      <div className="header">
        <i className="bx bx-cookie"></i>
        <h2>Cookie Consent</h2>
      </div>
      <p style={{ margin: "5px 0px 0px 0px", fontSize: "small" }}>
        We use cookies to enhance your experience. By continuing to browse, you
        agree to our use of cookies.
      </p>
      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={handleNecessaryOnly}>
          Necessary Only
        </button>
        <button onClick={handleAccept} style={buttonStyle}>
          Accept All
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
