import React, { useState } from "react";
import { Link } from "react-router-dom";
import FooterMobileMenu from "../components/FooterMobileMenu";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SupportedForm from "../components/SupportedByBites/SupportedForm";
import suportedImage1 from "../assets/supportbybitesmeatwala.jpeg";
import suportedImage2 from "../assets/supported2meatwala.jpeg";
import Contents from "../components/SupportedByBites/contents";
import { Helmet } from "react-helmet-async";
const SupportedByBites = () => {
  return (
    <>
      <Helmet>
        <title>Supported by Meatwala – Giving Back to the Community</title>
        <meta
          name="description"
          content="See how Meatwala supports local communities through halal meat donations and charity projects. Join us in making a difference!"
        />
      </Helmet>
      {/* Header section start */}
      <Navbar />
      {/* Header Section end */}
      {/* home section start */}

      <section
        id="home"
        className="home2 section-b-space overflow-hidden"
        style={{
          position: "relative",
          padding: "0", // Remove padding to align with navbar
          margin: "0", // Ensure no margin above the section
        }}
      >
        {/* Image Container */}
        <div
          style={{
            backgroundImage: `url(${suportedImage1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "500px", // Adjust the height as per your design
            position: "relative",
            top: "78px",
          }}
        >
          <div
            className="mobile-background"
            style={{
              background: "#00000061",
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
            }}
          />
        </div>

        {/* Text Section */}
        <div className="faq-title" style={{ paddingTop: "100px" }}>
          <h2 className="text-black">
            Support Global Community Projects with Meatwala, One Order at a
            Time"
          </h2>
        </div>
        <div className="faq-title">
          <h3
            style={{
              fontSize: "20px",
              color: "black",
            }}
          >
            Support global initiatives through Meatwala—every order helps fund
            meaningful projects worldwide.
          </h3>
        </div>
      </section>

      {/* home section end */}
      {/* Featured Restaurants section starts */}
      <div className="restaurant-list  ratio3_2">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <img
                src={`${suportedImage2}`}
                style={{ width: "100%", height: "80%" }}
              />
            </div>
            <div className="col-lg-6">
              <div className="pt-7">
                <h1 style={{ fontSize: 24 }}>
                  Making a Difference, One Order at a Time
                </h1>
                <p className="mt-3">
                  At Meatwala, we believe that supporting communities worldwide
                  goes beyond just delivering fresh halal meat. We are committed
                  to making a real impact by funding and supporting meaningful
                  projects that strengthen societies globally. Every time you
                  place an order, you’re contributing to a bigger
                  mission—helping businesses, charitable initiatives, and
                  sustainability projects thrive across the world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container mt-5">
          <div
            className="row"
            style={{ marginBottom: "3rem", textAlign: "center" }}
          >
            <div className="col-lg-12">
              <h2 style={{ marginBottom: "1.5rem", fontWeight: 700 }}>
                Who’s Eligible?
              </h2>
              <p style={{ fontSize: "16px", color: "#555" }}>
                Meatwala welcomes applications from organisations, charities,
                and community initiatives that align with our mission of making
                a positive global impact. If your project is focused on
                supporting communities in need, we encourage you to apply for
                funding.
              </p>
            </div>
          </div>

          {/* Cards Section */}
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-6 mb-4">
              <div
                className="card"
                style={{
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="card-body" style={{ textAlign: "center" }}>
                  <h5 style={{ fontWeight: 600 }}>
                    Food Banks & Meal Programs{" "}
                  </h5>
                  <p style={{ color: "#555" }}>
                    Voluntary organisations providing food assistance to
                    vulnerable individuals and families worldwide.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 mb-4">
              <div
                className="card"
                style={{
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="card-body" style={{ textAlign: "center" }}>
                  <h5 style={{ fontWeight: 600 }}>
                    Youth & Community Development{" "}
                  </h5>
                  <p style={{ color: "#555" }}>
                    Sports teams, education programs, and community initiatives
                    needing support for growth and sustainability.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 mb-4">
              <div
                className="card"
                style={{
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="card-body" style={{ textAlign: "center" }}>
                  <h5 style={{ fontWeight: 600 }}>
                    Religious & Social Spaces{" "}
                  </h5>
                  <p style={{ color: "#555" }}>
                    Mosques, community centres, or facilities requiring
                    donations to improve services and outreach.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 mb-4">
              <div
                className="card"
                style={{
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="card-body" style={{ textAlign: "center" }}>
                  <h5 style={{ fontWeight: 600 }}>
                    Environmental Initiatives{" "}
                  </h5>
                  <p style={{ color: "#555" }}>
                    Sustainability projects such as tree planting, reducing
                    carbon footprints, and eco-friendly efforts that benefit
                    global communities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          {/* Section Header */}
          <div
            className="row"
            style={{ marginBottom: "3rem", textAlign: "center" }}
          >
            <div className="col-lg-12">
              <h2 style={{ marginBottom: "1.5rem", fontWeight: 700 }}>
                How it Works?
              </h2>
              <p style={{ fontSize: "16px", color: "#555" }}>
                Meatwala is dedicated to supporting initiatives that uplift
                communities worldwide. If you have a project that aligns with
                our mission, follow these simple steps to apply:
              </p>
            </div>
          </div>

          {/* Cards Section */}
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-6 mb-4">
              <div
                className="card"
                style={{
                  height: "100%",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="card-body" style={{ textAlign: "center" }}>
                  <h5 style={{ fontWeight: 600 }}>Submit Your Application </h5>
                  <p style={{ color: "#555" }}>
                    Fill out the form at the bottom of this page with details
                    about your project.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 mb-4">
              <div
                className="card"
                style={{
                  height: "100%",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="card-body" style={{ textAlign: "center" }}>
                  <h5 style={{ fontWeight: 600 }}>Application Review</h5>
                  <p style={{ color: "#555" }}>
                    Our team carefully assesses each submission to determine the
                    impact and feasibility of the project.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 mb-4">
              <div
                className="card"
                style={{
                  height: "100%",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="card-body" style={{ textAlign: "center" }}>
                  <h5 style={{ fontWeight: 600 }}>Funding Allocation</h5>
                  <p style={{ color: "#555" }}>
                    Approved projects receive financial support ranging from
                    £100 to £1500, with exceptional initiatives considered for
                    additional funding.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <Contents/> */}

          <SupportedForm />

          {/* Closing Section */}
          <div className="row">
            <div className="col-lg-12">
              <p
                style={{
                  fontSize: "16px",
                  color: "#555",
                  textAlign: "center",
                  padding: "30px",
                }}
              >
                Thank you for your interest in partnering with Meatwala to make
                a difference in our community. Together, we can create lasting
                positive change.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* faq section starts */}
      <div className="">
        <div className="container">
          <div className="row" style={{ textAlign: "center" }}>
            <div className="col-lg-12">
              <h2 style={{ marginBottom: "1.5rem", fontWeight: 700 }}>
                Find Out If You’re Successful
              </h2>
            </div>
          </div>

          <form>
            <div className="row  justify-content-center">
              <div className="col-xl-12">
                <p>
                  If your application is successful, a member of the Meatwala
                  team will contact you as soon as possible. Due to the high
                  volume of requests, we may not be able to respond to every
                  submission individually. However, rest assured that every
                  request is reviewed with care.
                </p>
              </div>
              <div className="col-xl-12 mt-3">
                <p>
                  Join us in making a lasting difference. Together, we can
                  create a stronger, more global community.
                </p>
              </div>
              {/* <div className="col-xl-12 mt-5 text-center">
                                <button className="btn theme-btn mt-3" onClick={handlePopUp}>
                                    Apply Today
                                </button>
                            </div> */}
            </div>
          </form>
        </div>
      </div>
      {/* faq section end */}
      {/* footer section starts */}
      <Footer />
      {/* footer section end */}
      {/* mobile fix menu start */}
      <FooterMobileMenu />
      {/* mobile fix menu end */}
      {/* location offcanvas start */}
      <div
        className="modal fade location-modal"
        id="location"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">
                <h5 className="fw-semibold">Select a Location</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
            </div>
            <div className="modal-body">
              <div className="search-section">
                <form className="form_search" role="form">
                  <input
                    type="search"
                    placeholder="Search Location"
                    className="nav-search nav-search-field"
                  />
                </form>
              </div>
              <a href="#!" className="current-location">
                <div className="current-address">
                  <i className="ri-focus-3-line focus" />
                  <div>
                    <h5>Use current-location</h5>
                    <h6>Wellington St., Ottawa, Ontario, Canada</h6>
                  </div>
                </div>
                <i className="ri-arrow-right-s-line arrow" />
              </a>
              <h5 className="mt-sm-3 mt-2 fw-medium recent-title dark-text">
                Recent Location
              </h5>
              <a href="#!" className="recent-location">
                <div className="recant-address">
                  <i className="ri-map-pin-line theme-color" />
                  <div>
                    <h5>Bayshore</h5>
                    <h6>kingston St., Ottawa, Ontario, Canada</h6>
                  </div>
                </div>
              </a>
            </div>
            <div className="modal-footer">
              <a href="#" className="btn gray-btn" data-bs-dismiss="modal">
                Close
              </a>
              <a
                href="#"
                className="btn theme-btn mt-0"
                data-bs-dismiss="modal"
              >
                Save
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* location offcanvas end */}
      {/* tap to top start */}
    </>
  );
};

export default SupportedByBites;
