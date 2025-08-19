import React from "react";
import logo from "../assets/meatnewfeb.png";
import { Link } from "react-router-dom";

const MobileViewAppDownload = () => {
  return (
    <div
      className="banner-app d-flex w-100"
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        zIndex: "1000",
        padding: "10px 15px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        border: "none",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div className="logo">
        <div className="d-flex" style={{ flexDirection: "column" }}>
          <span style={{ fontSize: "12px", fontWeight: "bold" }}>
            Don't miss out!
          </span>
          <p className="text-sm text-black" style={{ margin: "0" }}>
            Get the app for exclusive benefits
          </p>
        </div>
      </div>
      <a
        target="_blank"
        href="https://apps.apple.com/us/app/meatwala/id6742139486"
        className="btn hover-effect theme-btn"
        style={{ marginLeft: "auto" }} // Push button to the right
      >
        GET APP
      </a>
    </div>
  );
};

export default MobileViewAppDownload;
