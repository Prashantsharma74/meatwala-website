import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
// import { getFaq } from '../utils/api'
import FaqCom from "../components/FaqCom";
// import axios from 'axios'
import Delivery from "../components/delivery";
import Footer from "../components/Footer";
import FooterMobileMenu from "../components/FooterMobileMenu";
import bgimg from "../assets/faqs.jpg";
import { Helmet } from "react-helmet-async";

const Faq = () => {
  const [hasFaqData, setHasFaqData] = useState(false);

  const handleFaqStatus = (status) => {
    setHasFaqData(status);
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, []);

  return (
    <>
      <Helmet>
        <title>Meatwala FAQ | Halal Meat Delivery & Butcher Services</title>
        <meta
          name="description"
          content="Have questions about ordering halal meat online? Find answers about delivery, payment, and quality in our FAQ section."
        />
      </Helmet>
      {/* Header section start */}
      <Navbar />
      {/* Header Section end */}
      <section className="section-t-space mytabb overflow-hidden pt-120">
        <Delivery />
      </section>
      <section
        className="page-head-section"
        style={{
          backgroundImage: `url(${bgimg})`,
          backgroundSize: "cover",
          backgroundPosition: "cover",
          backgroundRepeat: "no-repeat",
          height: isMobile ? "auto" : "500px", // Conditional height"
        }}
      >
        <div className="container page-heading">
          {/* <h2 className="h3 mb-3 text-white text-center">FAQ</h2> */}
          <nav aria-label="breadcrumb">
            {/* <ol className="breadcrumb flex-lg-nowrap justify-content-center justify-content-lg-star">
          <li className="breadcrumb-item">
          <Link to={"/"}>
          <i className="ri-home-line" />
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            FAQ
          </li>
        </ol> */}
          </nav>
        </div>
      </section>
      {/* faq section starts */}
      <section className="section-b-space">
        <div className="container">
          <div className="faq-title">
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="row">
            <div className={hasFaqData ? "col-xl-4" : ""}>
              <div className="side-img">
                <img
                  className="img-fluid img"
                  src="assets/images/faq.svg"
                  alt="faq"
                />
              </div>
            </div>
            <div className="col-xl-8">
              <div
                className="accordion accordion-flush help-accordion"
                id="accordionFlushExample"
              >
                <FaqCom onFaqStatusChange={handleFaqStatus} />
              </div>
            </div>
          </div>
        </div>
      </section>
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
              <Link href="" className="current-location">
                <div className="current-address">
                  <i className="ri-focus-3-line focus" />
                  <div>
                    <h5>Use current-location</h5>
                    <h6>Wellington St., Ottawa, Ontario, Canada</h6>
                  </div>
                </div>
                <i className="ri-arrow-right-s-line arrow" />
              </Link>
              <h5 className="mt-sm-3 mt-2 fw-medium recent-title dark-text">
                Recent Location
              </h5>
              <Link href="" className="recent-location">
                <div className="recant-address">
                  <i className="ri-map-pin-line theme-color" />
                  <div>
                    <h5>Bayshore</h5>
                    <h6>kingston St., Ottawa, Ontario, Canada</h6>
                  </div>
                </div>
              </Link>
            </div>
            <div className="modal-footer">
              <Link href="#" className="btn gray-btn" data-bs-dismiss="modal">
                Close
              </Link>
              <Link
                href="#"
                className="btn theme-btn mt-0"
                data-bs-dismiss="modal"
              >
                Save
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* location offcanvas end */}
      {/* tap to top start */}
      {/* <button className="scroll scroll-to-top">
    <i className="ri-arrow-up-s-line arrow" />
  </button> */}
      {/* tap to top end */}
      {/* responsive space */}
      {/* <div className="responsive-space" /> */}
      {/* responsive space */}
      {/* bootstrap js */}
      {/* footer accordion js */}
      {/* loader js */}
      {/* swiper js */}
      {/* script js */}
    </>
  );
};

export default Faq;
