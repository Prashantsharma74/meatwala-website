import React, { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FooterMobileMenu from "../components/FooterMobileMenu";
// import MainImage from "../assets/images/partner.jpg";
import MainImage from "../assets/images/partner.jpeg";
import Euro from "../assets/EuroImage.png";
import Globe from "../assets/globe.png";
import Rest1 from "../assets/1.jpg";
import Rest2 from "../assets/2.jpg";
import Rest3 from "../assets/3.jpg";
import Rest4 from "../assets/4.jpg";
import Rest5 from "../assets/5.jpg";
import Rest6 from "../assets/6.jpg";
import Rest7 from "../assets/7.jpg";
import ResForm from "../components/RestaurantForm";
import { Helmet } from "react-helmet-async";
const AddRestaurant = () => {
  const sliderRef = useRef(null);
  // const autoScrollRef = useRef(null);
  // const isUserInteracting = useRef(false);

  // useEffect(() => {
  //   const slider = sliderRef.current;
  //   if (!slider) return;

  //   let scrollAmount = 0;
  //   const speed = 0.5;

  //   autoScrollRef.current = setInterval(() => {
  //     if (isUserInteracting.current) return;

  //     scrollAmount += speed;
  //     slider.scrollLeft = scrollAmount;

  //     if (scrollAmount >= slider.scrollWidth / 2) {
  //       scrollAmount = 0;
  //     }
  //   }, 16);

  //   return () => clearInterval(autoScrollRef.current);
  // }, []);

  // const scrollLeft = () => {
  //   if (!sliderRef.current) return;

  //   isUserInteracting.current = true;

  //   sliderRef.current.scrollBy({
  //     left: -300,
  //     behavior: "smooth",
  //   });

  //   setTimeout(() => {
  //     isUserInteracting.current = false;
  //   }, 1000);
  // };

  // const scrollRight = () => {
  //   if (!sliderRef.current) return;

  //   isUserInteracting.current = true;

  //   sliderRef.current.scrollBy({
  //     left: 300,
  //     behavior: "smooth",
  //   });

  //   setTimeout(() => {
  //     isUserInteracting.current = false;
  //   }, 1000);
  // };

  // const scrollLeft = () => {
  //   if (!sliderRef.current) return;

  //   sliderRef.current.scrollBy({
  //     left: -300, // ek click = ek step
  //     behavior: "smooth",
  //   });
  // };

  // const scrollRight = () => {
  //   if (!sliderRef.current) return;

  //   sliderRef.current.scrollBy({
  //     left: 300,
  //     behavior: "smooth",
  //   });
  // };

  const scrollLeft = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.scrollBy({ left: -300, behavior: "smooth" });

    // agar start ke paas aa gaye ho, to end se continue
    if (slider.scrollLeft <= 0) {
      slider.scrollLeft = slider.scrollWidth / 2;
    }
  };

  const scrollRight = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.scrollBy({ left: 300, behavior: "smooth" });

    // agar half se aage gaye ho, to start se continue
    if (slider.scrollLeft >= slider.scrollWidth / 2) {
      slider.scrollLeft = 0;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>
          Join Meatwala – Partner with Us & Grow Your Butcher Business
        </title>
        <meta
          name="description"
          content="Are you a halal butcher or grocery store? Partner with Meatwala to reach more customers & increase sales with online halal meat orders."
        />
      </Helmet>
      <Navbar />
      <section
        id="home"
        className="home-add-rest  home2 section-b-space overflow-hidden"
        style={{
          display: "block",
          // position: "relative",
          backgroundImage: `url(${MainImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          // backgroundAttachment: "fixed",
          backgroundBlendMode: "overlay",
          // backgroundColor: "rgba(0,0,0,0.5)",
          // padding: "0px 40px",
          width: "100%",
        }}
      >
        <div
          // className="mobile-background"
          style={{
            // position: "absolute",
            width: "100%",
            height: "100%",
          }}
        />
        <div className="container">
          <div className="row">
            <div
              className="col-lg-7 position-relative"
              style={{ padding: "0px 60px" }}
            >
              <div
                className="p-2"
                style={{
                  color: "#ffffff",
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                }}
              >
                <h2 className="mb-3 h2-mobile ">
                  The UK's #1 App for Halal Meat Delivery!
                </h2>
                <p className="mb-4">
                  Partner with Meatwala and take your butcher shop online, built
                  for the future of meat.
                </p>
              </div>
              <button
                className="btn hover-effect theme-btn mt-3"
                data-bs-toggle="modal"
                data-bs-target="#registrationModal"
              >
                Become a Partner
              </button>
            </div>
            <div className="col-lg-5 col-12"></div>
          </div>
        </div>
      </section>
      {/* home section end */}
      {/* Featured Restaurants section starts */}
      <div className="restaurant-list mt-4 ratio3_2">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-3 mt-3 text-center">
              <img
                className="responsive-euro-img"
                src={Euro}
                style={{ width: "100%" }}
              />
            </div>
            <div className="col-lg-7 mt-3">
              <div className="p-3">
                <h3 className="mt-3" style={{ fontWeight: "600px" }}>
                  Reach More Customers Locally
                </h3>
                <p className="mt-3">
                  By joining Meatwala, your butcher shop gets exposure to
                  thousands of potential customers looking for halal Meat near
                  you. Offer exclusive deals and attract more loyal customers
                  through our trusted platform.{" "}
                </p>
                <h3 className="mt-4" style={{ fontWeight: "600px" }}>
                  Turn Visitors into Repeat Buyers{" "}
                </h3>
                <p className="mt-3">
                  Meatwala provides you with insights and tools to build
                  customer loyalty. From promotional discounts to seamless
                  ordering experiences, we help halal meat butchers locally grow
                  their repeat business.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="restaurant-list  banner-section  ratio3_2">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7">
                <div className="p-3">
                  <h1 style={{ fontSize: 24 }}>
                    Boost Your Sales & Online Presence{" "}
                  </h1>
                  <h3 className="mt-3" style={{ fontWeight: "600px" }}>
                    Increase Orders & Maximise Profits
                  </h3>
                  <p className="mt-3">
                    Partnering with Meatwala means reaching a broader audience
                    for your halal meat delivery in your local area. Our
                    butchers see increased online orders and higher customer
                    retention by offering reliable home delivery and collection
                    services.{" "}
                  </p>
                  <h3 className="mt-3" style={{ fontWeight: "600px" }}>
                    Enhanced Visibility for Your Business
                  </h3>
                  <p className="mt-3">
                    Get your butcher shop listed on Meatwala and benefit from
                    targeted marketing campaigns that position your store in
                    front of local customers actively searching for halal meat
                    butchers.{" "}
                  </p>
                </div>
              </div>
              <div className="col-lg-3">
                <img
                  src="https://www.digitalutilization.com/static/img/vector-smart.png"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </div>
        </div> */}
      <div className="restaurant-list banner-section ratio3_2">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            {/* Image first on mobile, second on desktop */}
            <div className="col-12 col-lg-3 order-1 order-lg-2 mb-4 mb-lg-0 text-center">
              <img
                src={Globe}
                alt="Grow your online presence"
                className="img-fluid responsive-euro-img1"
              />
            </div>

            {/* Text second on mobile, first on desktop */}
            <div className="col-12 col-lg-7 order-2 order-lg-1">
              <div className="p-3">
                <h3
                  // style={{ fontSize: 24 }}
                  className="mt-3"
                  style={{ fontWeight: "600px" }}
                >
                  Boost Your Sales & Online Presence
                </h3>
                <p className="mt-3">
                  Partnering with Meatwala means reaching a broader audience for
                  your halal meat delivery in your local area. Our butchers see
                  increased online orders and higher customer retention by
                  offering reliable home delivery and collection services.
                </p>
                {/* <h3 className="mt-3" style={{ fontWeight: "600px" }}>
                  Enhanced Visibility for Your Business
                </h3> */}
                <h3 className="mt-3">Enhanced Visibility for Your Business</h3>
                <p className="mt-3">
                  Get your butcher shop listed on Meatwala and benefit from
                  targeted marketing campaigns that position your store in front
                  of local customers actively searching for halal meat butchers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="restaurant-list pt-5 section-b-space ratio3_2">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-3 text-center">
              <img
                className="responsive-euro-img"
                src="https://static.vecteezy.com/system/resources/previews/023/743/925/non_2x/scooter-with-delivery-man-flat-cartoon-character-fast-courier-restaurant-food-service-mail-delivery-service-a-postal-employee-the-determination-of-geolocation-using-electronic-device-free-png.png"
                style={{ width: "100%" }}
              />
            </div>
            <div className="col-lg-7">
              <div className="mt-5">
                {/* <h1 className="mb-3" style={{ fontSize: 24 }}>Why Partner with Meatwala?</h1> */}
                {/* <h1
  className="mb-3"
  style={{
    fontSize: "26px",
    fontWeight: 500, // medium, NOT bold
    letterSpacing: "0.5px",
    color: "#222",
    position: "relative"
  }}
>
  Why Partner with Meatwala?
</h1> */}

                {/* <h1
                  className="mb-3"
                  style={{
                    fontSize: "26px",
                    fontWeight: 500,
                    color: "#222",
                    paddingBottom: "8px",
                    borderBottom: "2px solid #e5e5e5",
                  }}
                >
                  Why Partner with Meatwala?
                </h1> */}
                <h1
                  className="mb-3"
                  style={{
                    fontSize: "26px",
                    fontWeight: 500,
                    color: "#222",
                    paddingBottom: "8px",
                    borderBottom: "2px solid #e5e5e5",
                    display: "inline-block",
                  }}
                >
                  Why Partner with Meatwala?
                </h1>

                <h3 className="mt-1" style={{ fontWeight: "600px" }}>
                  Free Website for Your Butcher Shop
                </h3>
                <p className="mt-1">
                  We will create a professional website for your business at no
                  cost.{" "}
                </p>
                <h3 className="mt-3" style={{ fontWeight: "600px" }}>
                  Free Order Pad to Receive Online Orders
                </h3>
                <p className="mt-1">
                  Manage your orders seamlessly with a device provided by
                  us.{" "}
                </p>
                <h3 className="mt-3" style={{ fontWeight: "600px" }}>
                  Increased Visibility
                </h3>
                <p className="mt-1">
                  Get listed on our platform and reach thousands of potential
                  customers.{" "}
                </p>
                {/* <h3 className="mt-3" style={{ fontWeight: "600px" }}>
                  Marketing Support
                </h3>
                <p className="mt-1">
                  Receive promotional materials to help grow your business.{" "}
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* featured Restaurants section end */}
      {/* faq section starts */}
      <div className="section-b-space">
        <div className="container">
          <div className="faq-title">
            <h1
              className="mb-3"
              style={{
                fontSize: "26px",
                fontWeight: 500,
                color: "#222",
                paddingBottom: "8px",
                borderBottom: "2px solid #e5e5e5",
                display: "inline-block",
              }}
            >
              Join Meatwala in Just a Few Steps!
            </h1>
            {/* <h2 className="mb-3">Join Meatwala in Just a Few Steps!</h2> */}
            <p>Let’s boost your business together</p>
          </div>
          <div className="row">
            <div className="col-xl-4 mt-2">
              <div className="card" style={{ height: 250 }}>
                <div className="card-body text-center">
                  <img
                    src="https://server-php-8-3.technorizen.com/amitendra/food-latest/img/restaurant.png"
                    className="mb-2"
                  />
                  <h5 style={{ fontWeight: "500" }}>
                    Submit Your Business Details
                  </h5>
                  <p>Provide your shop’s basic information</p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 mt-2">
              <div className="card" style={{ height: 250 }}>
                <div className="card-body text-center">
                  <img
                    src="https://server-php-8-3.technorizen.com/amitendra/food-latest/img/id.png"
                    className="mb-2"
                  />
                  <h5 style={{ fontWeight: "500" }}>Complete Verification </h5>
                  <p>Share required documents for approval</p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 mt-2">
              <div className="card" style={{ height: 250 }}>
                <div className="card-body text-center">
                  <img
                    src="https://server-php-8-3.technorizen.com/amitendra/food-latest/img/track.png"
                    className="mb-2"
                  />
                  <h5 style={{ fontWeight: "500" }}>Start Selling Online</h5>
                  <p>Upload products and start getting orders</p>
                </div>
              </div>
            </div>
            <div className="partner-strip">
              <p className="partner-heading">
                Join the UK’s #1 fastest growing halal meat delivery platform.
              </p>

              {/* <div className="partner-slider">
                <div className="partner-track">
                  <div className="partner-group">
                    <img src={Rest1} alt="restaurant-1" />
                    <img src={Rest2} alt="restaurant-1" />
                    <img src={Rest3} alt="restaurant-1" />
                    <img src={Rest4} alt="restaurant-1" />
                    <img src={Rest5} alt="restaurant-1" />
                    <img src={Rest6} alt="restaurant-1" />
                    <img src={Rest7} alt="restaurant-1" />
                  </div>
                </div>
              </div> */}
              {/* <div className="partner-slider" ref={sliderRef}>
                <div className="partner-track" >
                  <div className="partner-group">
                    <img src={Rest1} alt="restaurant-1" />
                    <img src={Rest2} alt="restaurant-2" />
                    <img src={Rest3} alt="restaurant-3" />
                    <img src={Rest4} alt="restaurant-4" />
                    <img src={Rest5} alt="restaurant-5" />
                    <img src={Rest6} alt="restaurant-6" />
                    <img src={Rest7} alt="restaurant-7" />
                  </div>

                  <div className="partner-group">
                    <img src={Rest1} alt="restaurant-1" />
                    <img src={Rest2} alt="restaurant-2" />
                    <img src={Rest3} alt="restaurant-3" />
                    <img src={Rest4} alt="restaurant-4" />
                    <img src={Rest5} alt="restaurant-5" />
                    <img src={Rest6} alt="restaurant-6" />
                    <img src={Rest7} alt="restaurant-7" />
                  </div>
                </div>
              </div> */}
              {/* <div className="partner-slider-wrapper">
                <button className="slider-arrow left" onClick={scrollLeft}>
                  ‹
                </button>

                <div className="partner-slider" ref={sliderRef}>
                  <div className="partner-track">
                    <div className="partner-group">
                      <img src={Rest1} />
                      <img src={Rest2} />
                      <img src={Rest3} />
                      <img src={Rest4} />
                      <img src={Rest5} />
                      <img src={Rest6} />
                      <img src={Rest7} />
                    </div>

                    <div className="partner-group">
                      <img src={Rest1} />
                      <img src={Rest2} />
                      <img src={Rest3} />
                      <img src={Rest4} />
                      <img src={Rest5} />
                      <img src={Rest6} />
                      <img src={Rest7} />
                    </div>
                  </div>
                </div>

                <button className="slider-arrow right" onClick={scrollRight}>
                  ›
                </button>
              </div> */}
              <div className="partner-slider-wrapper">
                <button className="slider-arrow left" onClick={scrollLeft}>
                  ‹
                </button>

                <div className="partner-slider" ref={sliderRef}>
                  <div className="partner-track">
                    <div className="partner-group">
                      <img src={Rest1} />
                      <img src={Rest2} />
                      <img src={Rest3} />
                      <img src={Rest4} />
                      <img src={Rest5} />
                      <img src={Rest6} />
                      <img src={Rest7} />
                    </div>

                    {/* duplicate group optional */}
                    <div className="partner-group">
                      <img src={Rest1} />
                      <img src={Rest2} />
                      <img src={Rest3} />
                      <img src={Rest4} />
                      <img src={Rest5} />
                      <img src={Rest6} />
                      <img src={Rest7} />
                    </div>
                  </div>
                </div>

                {/* RIGHT ARROW */}
                <button className="slider-arrow right" onClick={scrollRight}>
                  ›
                </button>
              </div>
            </div>
            <div className="col-xl-12  text-center">
              {/* <h3 className="mt-3" style={{ fontWeight: "600px" }}>
                Simple to get started
              </h3>
              <p className="mt-3">
                Join Meatwala and grow your halal meat business
              </p> */}
              <button
                className="btn hover-effect theme-btn mt-3"
                data-bs-toggle="modal"
                data-bs-target="#registrationModal"
              >
                Become a Partner
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* faq section end */}
      <ResForm />
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
      <button className="scroll scroll-to-top">
        <i className="ri-arrow-up-s-line arrow" />
      </button>
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

export default AddRestaurant;
