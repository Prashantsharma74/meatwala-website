import React, { useState } from "react";
import { Link } from "react-router-dom";
import FooterMobileMenu from "../components/FooterMobileMenu";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import WholesaleForm from "../components/WholesaleForm";
import suportedImage1 from "../assets/wholesalemeatwala.jpeg";
import suportedImage2 from "../assets/supportedmeatwala.jpeg";
import Contents from "../components/SupportedByBites/contents";
import { Helmet } from "react-helmet-async";
const SupportedByBites = () => {
  return (
    <>
      <Helmet>
        <title>Wholesale Halal Meat Supply – Bulk Orders for Businesses</title>
        <meta
          name="description"
          content="Need bulk halal meat for your restaurant or business? Order wholesale halal meat at competitive prices with reliable supply."
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
          padding: "0",
          margin: "0",
        }}
      >
        <div
          style={{
            backgroundImage: `url(${suportedImage1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "400px",
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
            Wholesale Halal Meat – Fresh, Reliable & Delivered to Your
            Restaurant!
          </h2>
        </div>
        <div className="faq-title">
          <h3
            style={{
              fontSize: "20px",
              color: "black",
            }}
          >
            Order premium halal meat in bulk with hassle-free delivery and
            unbeatable prices.
          </h3>
        </div>
      </section>

      {/* home section end */}
      {/* Featured Restaurants section starts */}
      <div className="restaurant-list  ratio3_2">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <img src={`${suportedImage2}`} style={{ width: "100%" }} />
            </div>
            <div className="col-lg-6">
              <div className="pt-7">
                <h1 style={{ fontSize: 24 }}>
                  Wholesale Halal Meat for Restaurants{" "}
                </h1>
                <p className="mt-3">
                  Meatwala offers premium halal meat at wholesale prices,
                  ensuring that restaurants, caterers, and food businesses get
                  top-quality meat delivered without hassle. Whether you need
                  fresh halal meat in bulk or custom cuts, our service is
                  designed to provide convenience, reliability, and competitive
                  pricing.
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
                What We Offer
              </h2>
              {/* <p style={{ fontSize: "16px", color: "#555" }}>
                At High Wycombe Bites, we are committed to supporting local
                projects that make a positive difference in our community. We
                welcome applications from organisations, charities, and
                initiatives across High Wycombe that align with our goals of
                supporting our community.
              </p> */}
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
                  <h5 style={{ fontWeight: 600 }}>Fresh Beef & Lamb </h5>
                  <p style={{ color: "#555" }}>
                    Prime cuts, minced options, and specialty selections.
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
                  <h5 style={{ fontWeight: 600 }}>Quality Chicken </h5>
                  <p style={{ color: "#555" }}>
                    Whole, fillets, wings, and portioned packs.
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
                  <h5 style={{ fontWeight: 600 }}>Custom Butchering </h5>
                  <p style={{ color: "#555" }}>
                    Choose from a variety of cuts and packaging options to match
                    your restaurant’s needs.
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
                  <h5 style={{ fontWeight: 600 }}>Fast & Reliable Delivery </h5>
                  <p style={{ color: "#555" }}>
                    Stay stocked with hassle-free halal meat delivery whenever
                    you need it.
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
                How to Get Started?
              </h2>
              {/* <p style={{ fontSize: "16px", color: "#555" }}>
                At High Wycombe Bites, we’re committed to supporting community
                organisations, sports teams, and charitable causes that make a
                positive impact in High Wycombe. If you have a project or
                initiative you’d like to nominate, simply submit your entry
                using the form at the bottom of this page.
              </p> */}
            </div>
          </div>

          {/* Cards Section */}
          <div className="row justify-content-center">
            {/* <div className="col-lg-6 col-md-3 mb-4">
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
                  <h5 style={{ fontWeight: 600 }}>Sign Up </h5>
                  <p style={{ color: "#555" }}>
                    Register your restaurant with Meatwala’s wholesale program.
                  </p>
                </div>
              </div>
            </div> */}
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
                  <h5 style={{ fontWeight: 600 }}>Place Your Order</h5>
                  <p style={{ color: "#555" }}>
                    Select from a wide range of halal meat options customised to
                    your menu.
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
                  <h5 style={{ fontWeight: 600 }}>Get It Delivered</h5>
                  <p style={{ color: "#555" }}>
                    Receive fresh meat directly to your kitchen, on time and
                    hassle-free.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <Contents/> */}

          <WholesaleForm />

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
      {/* <div className="">
        <div className="container">
          <div className="row" style={{ textAlign: "center" }}>
            <div className="col-lg-12">
              <h2 style={{ marginBottom: "1.5rem", fontWeight: 700 }}>
                We’ll Contact You If Successful
              </h2>
            </div>
          </div> */}

      {/* <form>
            <div className="row  justify-content-center">
              <div className="col-xl-12">
                <p>
                  Should you be lucky enough to be approved for funding, a
                  member of the Meatwala team will be in touch as quickly as
                  they can. Sadly, we are not able to respond to every
                  application that’s made due to the high number of requests
                  that we receive.
                </p>
              </div> */}
      {/* <div className="col-xl-12 mt-5 text-center">
                                <button className="btn theme-btn mt-3" onClick={handlePopUp}>
                                    Apply Today
                                </button>
                            </div> */}
      {/* </div>
          </form> */}
      {/* </div>
      </div> */}
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
