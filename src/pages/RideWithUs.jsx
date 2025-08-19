import React, { useEffect, useRef, useState } from "react";
import { BsPiggyBank } from "react-icons/bs";
import { Link } from "react-router-dom";
import { MdOutlineSchedule } from "react-icons/md";
import { AiOutlineInsurance } from "react-icons/ai";
import Footer from "../components/Footer";
import FooterMobileMenu from "../components/FooterMobileMenu";
import Navbar from "../components/Navbar";
import RideWithUsForm from "../components/RideWithUs/RideWithUsForm";
import image2 from "../assets/deliveryboymeatwala.jpeg";
import order from "../assets/meat_right.png";
import order1 from "../assets/dileverymeatwala.jpeg";
import { Helmet } from "react-helmet-async";

function RideWithUs() {
  const galleryRef = useRef(null);
  const galleryRef1 = useRef(null);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (galleryRef1.current) {
        // Scroll to the left by 160 pixels
        galleryRef1.current.scrollBy({ left: -160, behavior: "smooth" });

        // Check if we've reached the leftmost end
        if (galleryRef1.current.scrollLeft <= 0) {
          // Reset to the rightmost position without animation for a continuous effect
          const maxScrollRight =
            galleryRef1.current.scrollWidth - galleryRef1.current.clientWidth;
          galleryRef1.current.scrollTo({
            left: maxScrollRight,
            behavior: "auto",
          });
        }
      }
    }, 3000);
  }, []);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (galleryRef.current) {
        const maxScrollLeft =
          galleryRef.current.scrollWidth - galleryRef.current.clientWidth;
        if (galleryRef.current.scrollLeft >= maxScrollLeft) {
          galleryRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          galleryRef.current.scrollBy({ left: 160, behavior: "smooth" });
        }
      }
    }, 3000); // Adjust timing as needed

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div>
      <>
        <Helmet>
          <title>Become a Meatwala Rider – Deliver Fresh Halal Meat</title>
          <meta
            name="description"
            content="Earn money delivering halal meat orders in your city. Join the Meatwala delivery team and start earning today!"
          />
        </Helmet>
        {/* Header section start */}
        <Navbar text={"ride"} />
        {/* Header Section end */}
        {/* home section start */}
        <RideWithUsForm />
        {/* home section end */}
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="mt-3"
        >
          <div
            className="faq-title"
            style={{
              padding: "10px 20px",
            }}
          >
            {" "}
            <h3 style={{ fontWeight: "bold", fontSize: "20px" }}>
              Drive Your Earnings with Meatwala, Earn Cash on Your Schedule
            </h3>
          </div>
        </div>
        {/* Featured Restaurants section starts */}
        <section className="restaurant-list section-b-space ratio3_2">
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <img src={`${image2}`} style={{ width: "100%" }} />
              </div>
              <div className="col-lg-7 pl-3">
                <h1 style={{ fontSize: 20 }}>Earn fast and keep more</h1>
                <p className="mt-3">
                  {" "}
                  Get paid per delivery, enjoy competitive rates, and keep 100%
                  of your tips. We offer weekly payments so you receive your
                  earnings without delays.
                </p>

                <h1 style={{ fontSize: 20, marginTop: "10px" }}>
                  Work when you want
                </h1>

                <p className="mt-3">
                  {" "}
                  You decide when and where you work. Whether it’s a few hours
                  or a full shift, you set your schedule.
                </p>
                <h1 style={{ fontSize: 20, marginTop: "10px" }}>
                  Local support and easy sign-up
                </h1>

                <p className="mt-3">
                  {" "}
                  Join a rider-friendly platform that values your time. Our
                  fast-tracked application process gets you started quickly so
                  you can hit the road and start earning.
                </p>
                <h1 style={{ fontSize: 20, marginTop: "10px" }}>
                  Be part of a growing community
                </h1>

                <p className="mt-3">
                  {" "}
                  Meatwala connects local halal meat butchers with customers,
                  and you’ll play a key role in ensuring halal meat delivery is
                  smooth and efficient.
                </p>
                {/* <div className="mt-3">
            <p className="mb-3">
              <i className="fa fa-dot-circle-o" /> Quick and easy application
              process
            </p>
            <p className="mb-3">
              <i className="fa fa-dot-circle-o" /> Deliver when it suits you
            </p>
            <p className="mb-3">
              <i className="fa fa-dot-circle-o" /> Enjoy weekly earnings
            </p>
            <p className="mb-3">
              <i className="fa fa-dot-circle-o" /> Exclusive deals for couriers
            </p>
          </div> */}
              </div>
            </div>
          </div>
        </section>
        <section className="restaurant-list section-b-space banner-section ratio3_2">
          <div className="container">
            <div className="popular-restaurant  ratio3_2 mb-2">
              <div className="title title-sm mt-0">
                <h2
                  style={{
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    width: "100%",
                    padding: "0 10px",
                    // textAlign: "center",
                    fontSize: window.innerWidth < 768 ? "24px" : "32px",
                  }}
                >
                  Start Your Journey with Meatwala Today!
                </h2>

                <div className="loader-line" />
              </div>
            </div>
            <div className="row h-100 justify-content-center">
              <div className="col-md-4 pt-4 px-md-2 px-lg-3">
                <div className="card h-100 card-span">
                  <div className="card-body d-flex flex-column justify-content-around">
                    <div
                      className="text-center"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <div style={{ width: "100px" }}>
                        {" "}
                        {/* Or use any preferred width */}
                        <img
                          src={order}
                          alt="Requirements Icon"
                          style={{ width: "75px", height: "75px" }}
                        />
                      </div>
                      <h5 className="mt-4 mb-3">Sign up online </h5>
                    </div>
                    <p>Fill out our quick and easy application form</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 pt-4 px-md-2 px-lg-3">
                <div className="card h-100 card-span">
                  <div className="card-body d-flex flex-column justify-content-around">
                    <div
                      className="text-center"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <div style={{ width: "100px" }}>
                        {" "}
                        {/* Or use any preferred width */}
                        <img
                          src={order}
                          alt="Requirements Icon"
                          style={{ width: "75px", height: "75px" }}
                        />
                      </div>
                      <h5 className="mt-4 mb-3">Upload your documents</h5>
                    </div>
                    <p>
                      Provide proof of right to work, ID, and vehicle details
                      (if applicable).
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 pt-4 px-md-2 px-lg-3">
                <div className="card h-100 card-span">
                  <div
                    className="card-body d-flex flex-column"
                    style={{ justifyContent: "space-between" }}
                  >
                    <div
                      className="text-center"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <div style={{ width: "100px" }}>
                        {" "}
                        {/* Or use any preferred width */}
                        <img
                          src={order}
                          alt="Requirements Icon"
                          style={{ width: "75px", height: "75px" }}
                        />
                      </div>
                      <h5 className="mt-4 mb-3">Start earning </h5>
                    </div>
                    <p>
                      Get onboarded, accept delivery requests, and start making
                      money!
                    </p>
                  </div>
                </div>
              </div>
              <h3 className="mt-4">
                Join the Meatwala rider team today and start earning!
              </h3>
            </div>
          </div>
        </section>

        {/* featured Restaurants section end */}
        <section className="section-b-space">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="card  text-white py-4 py-sm-0">
                  <img
                    className="w-100"
                    // style={{height:"90vh"}}
                    src={order1}
                    alt="video"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* end of .container*/}
        </section>
        {/* testimonial section starts */}
        {/* <section className="section-b-space testimonial-section banner-section">
          <div className="container">
            <div className="faq-title">
              <h2>Our Client Feedback</h2>
            </div>
            <div className="swiper testimonial mb-xl-5 mb-sm-4 mb-3">
              <div className="swiper-wrapper" ref={galleryRef} style={{ display: "flex", overflowX: "auto", overflow: "hidden" }}>
                <div className="swiper-slide" style={{ width: "40%" }}>
                  <div className="testimonial-box">
                    <img className="img-fluid comma-icon" src="assets/images/icons/commas.png" alt="commas" />
                    <div className="testimonial-content">
                      <p>
                        I was so impressed with my breakfast this morning! I tried the
                        Fried Green Tomato Benedict and my boyfriend got the Crab
                        Cakes Benedict.
                      </p>
                      <div className="testi-bottom">
                        <img className="img-fluid img" src="assets/images/icons/p1.png" alt="p1" />
                        <h5 className="fw-semibold dark-text mt-2">Gunjan Puri</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide" style={{ width: "40%" }}>
                  <div className="testimonial-box">
                    <img className="img-fluid comma-icon" src="assets/images/icons/commas.png" alt="commas" />
                    <div className="testimonial-content">
                      <p>
                        We both finished our whole plates and were so impressed with
                        the quality of the food and the short amount of time it took
                        to receive it.
                      </p>
                      <div className="testi-bottom">
                        <img className="img-fluid img" src="assets/images/icons/p2.png" alt="p2" />
                        <h5 className="fw-semibold dark-text mt-2">Emily James</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide" style={{ width: "40%" }}>
                  <div className="testimonial-box">
                    <img className="img-fluid comma-icon" src="assets/images/icons/commas.png" alt="commas" />
                    <div className="testimonial-content">
                      <p>
                        This is always our breakfast stop before heading home from
                        vacation. Always delicious. Always great service. Always worth
                        the stop.
                      </p>
                      <div className="testi-bottom">
                        <img className="img-fluid img" src="assets/images/icons/p3.png" alt="p3" />
                        <h5 className="fw-semibold dark-text mt-2">Alexa Diaz</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide" style={{ width: "40%" }}>
                  <div className="testimonial-box">
                    <img className="img-fluid comma-icon" src="assets/images/icons/commas.png" alt="commas" />
                    <div className="testimonial-content">
                      <p>
                        The absolute best red sauce. Whether on Pizza or Pasta, it’s
                        honestly delicious. Portions are huge and the staff is
                        extremely friendly and courteous.
                      </p>
                      <div className="testi-bottom">
                        <img className="img-fluid img" src="assets/images/icons/p4.png" alt="p4" />
                        <h5 className="fw-semibold dark-text mt-2">Nicole Cooper</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide" style={{ width: "40%" }}>
                  <div className="testimonial-box">
                    <img className="img-fluid comma-icon" src="assets/images/icons/commas.png" alt="commas" />
                    <div className="testimonial-content">
                      <p>
                        It was a fantastic breakfast. Like a delicious homestyle rural
                        savoury breakfast. I enjoyed the entire experience and strongly
                        suggest this spot for a meal on the cape.
                      </p>
                      <div className="testi-bottom">
                        <img className="img-fluid img" src="assets/images/icons/p5.png" alt="p5" />
                        <h5 className="fw-semibold dark-text mt-2">Makenna Clark</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper testimonial dir-rtl" ref={galleryRef1} >
              <div className="swiper-wrapper" >
                <div className="swiper-slide" style={{ width: "40%" }}>
                  <div className="testimonial-box">
                    <img
                      className="img-fluid comma-icon"
                      src="assets/images/icons/commas.png"
                      alt="commas"
                    />
                    <div className="testimonial-content">
                      <p>
                        I was so impressed with my breakfast this morning! I tried the
                        Fried Green Tomato Benedict and my boyfriend got the Crab
                        Cakes Benedict
                      </p>
                      <div className="testi-bottom">
                        <img
                          className="img-fluid img"
                          src="assets/images/icons/p1.png"
                          alt="p1"
                        />
                        <h5 className="fw-semibold dark-text mt-2">Gunjan Puri</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide" style={{ width: "40%" }}>
                  <div className="testimonial-box">
                    <img
                      className="img-fluid comma-icon"
                      src="assets/images/icons/commas.png"
                      alt="commas"
                    />
                    <div className="testimonial-content">
                      <p>
                        We both finished our whole plates and were so impressed with
                        the quality of the food and the short amount of time it took
                        to receive it.
                      </p>
                      <div className="testi-bottom">
                        <img
                          className="img-fluid img"
                          src="assets/images/icons/p2.png"
                          alt="p1"
                        />
                        <h5 className="fw-semibold dark-text mt-2">Maggie Martin</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide" style={{ width: "40%" }}>
                  <div className="testimonial-box">
                    <img
                      className="img-fluid comma-icon"
                      src="assets/images/icons/commas.png"
                      alt="commas"
                    />
                    <div className="testimonial-content">
                      <p>
                        This is always our breakfast stop before heading home from
                        vacation. Always delicious. Always great service. Always worth
                        the stop.
                      </p>
                      <div className="testi-bottom">
                        <img
                          className="img-fluid img"
                          src="assets/images/icons/p3.png"
                          alt="p1"
                        />
                        <h5 className="fw-semibold dark-text mt-2">Amina James</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide" style={{ width: "40%" }}>
                  <div className="testimonial-box">
                    <img
                      className="img-fluid comma-icon"
                      src="assets/images/icons/commas.png"
                      alt="commas"
                    />
                    <div className="testimonial-content">
                      <p>
                        The absolute best red sauce. Weather on Pizza or Pasta, it’s
                        honestly delicious. Portions are huge and the staff is
                        extremely friendly and courteous.
                      </p>
                      <div className="testi-bottom">
                        <img
                          className="img-fluid img"
                          src="assets/images/icons/p4.png"
                          alt="p1"
                        />
                        <h5 className="fw-semibold dark-text mt-2">Hailey Jackson</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide" style={{ width: "40%" }}>
                  <div className="testimonial-box">
                    <img
                      className="img-fluid comma-icon"
                      src="assets/images/icons/commas.png"
                      alt="commas"
                    />
                    <div className="testimonial-content">
                      <p>
                        It was a fantastic breakfast. Like a delicious homestyle rural
                        savoury breakfast. I enjoyed the entire experience and
                        strongly suggests this spot for a meal on the cape.
                      </p>
                      <div className="testi-bottom">
                        <img
                          className="img-fluid img"
                          src="assets/images/icons/p5.png"
                          alt="p1"
                        />
                        <h5 className="fw-semibold dark-text mt-2">Logan Ross</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        {/* testimonial section end */}
        {/* faq section starts */}
        <section className="section-b-space">
          <div className="container">
            <div className="faq-title">
              <h2>(FAQs)</h2>
            </div>
            <div className="row">
              <div className="col-xl-4">
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
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseOne"
                        aria-expanded="true"
                        aria-controls="flush-collapseOne"
                      >
                        How do I sign up to become a courier with Meatwala?
                      </button>
                    </h2>
                    <div
                      id="flush-collapseOne"
                      className="accordion-collapse collapse show"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        Simply complete our super fast application process
                        online, and you'll be ready to start earning in no time.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseTwo"
                        aria-expanded="false"
                        aria-controls="flush-collapseTwo"
                      >
                        What are the requirements to become a delivery rider?
                      </button>
                    </h2>
                    <div
                      id="flush-collapseTwo"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        <ul>
                          <li>
                            <strong>Age 18+ & Right to Work:</strong> You must
                            be at least 18 years old and have the legal right to
                            work in the UK.
                          </li>
                          <li>
                            <strong>A Smartphone:</strong> You'll need an iPhone
                            with iOS 10+ or an Android device with version 5+ to
                            use our app.
                          </li>
                          <li>
                            <strong>A Vehicle:</strong> Have access to a
                            bicycle, e-bike, scooter, motorcycle, or car along
                            with a valid license and appropriate insurance.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseThree"
                        aria-expanded="false"
                        aria-controls="flush-collapseThree"
                      >
                        What types of vehicles are accepted?
                      </button>
                    </h2>
                    <div
                      id="flush-collapseThree"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        We welcome bicycles, e-bikes, scooters, motorcycles, and
                        cars. Choose what suits you best.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseFour"
                        aria-expanded="false"
                        aria-controls="flush-collapseFour"
                      >
                        How does payment work?
                      </button>
                    </h2>
                    <div
                      id="flush-collapseFour"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        We offer competitive fees for each delivery and pay you
                        weekly so you can enjoy your earnings faster. Plus, you
                        keep 100% of your tips; everything you earn is yours.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseFive"
                        aria-expanded="false"
                        aria-controls="flush-collapseFive"
                      >
                        How flexible are the working hours?
                      </button>
                    </h2>
                    <div
                      id="flush-collapseFive"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        You have complete flexibility to choose when and how
                        much you work. Fit deliveries around your lifestyle and
                        commitments.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseSix"
                        aria-expanded="false"
                        aria-controls="flush-collapseSix"
                      >
                        Is there support available if I have questions or
                        issues?
                      </button>
                    </h2>
                    <div
                      id="flush-collapseSix"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        Yes, our local support team and always-available Help
                        Centre are here to assist you whenever you need help.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseSeven"
                        aria-expanded="false"
                        aria-controls="flush-collapseSeven"
                      >
                        How fast is the application process?
                      </button>
                    </h2>
                    <div
                      id="flush-collapseSeven"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        We've streamlined our application process to be super
                        fast, so you can start earning without delay.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseEight"
                        aria-expanded="false"
                        aria-controls="flush-collapseEight"
                      >
                        What makes Meatwala different from other delivery
                        platforms?
                      </button>
                    </h2>
                    <div
                      id="flush-collapseEight"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        Meatwala is a community-focused app dedicated to helping
                        our local area thrive. By joining us, you're supporting
                        local businesses and becoming part of a vibrant
                        community.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* faq section end */}
        {/* featured Restaurants section end */}
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
                <Link href="#!" className="current-location">
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
                <Link href="#!" className="recent-location">
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
        <button className="scroll scroll-to-top">
          <i className="ri-arrow-up-s-line arrow" />
        </button>
        {/* tap to top end */}
        {/* responsive space */}
        {/* responsive space */}
        {/* bootstrap js */}
        {/* footer accordion js */}
        {/* loader js */}
        {/* swiper js */}
        {/* script js */}
      </>
    </div>
  );
}

export default RideWithUs;
