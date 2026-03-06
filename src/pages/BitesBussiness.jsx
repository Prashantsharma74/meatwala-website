import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FooterMobileMenu from '../components/FooterMobileMenu'
import BiteForm from '../components/BitesForm'
import Tshirt from "../assets/redTshirt.jpg"
import Group from "../assets/imageblank.webp"
import Bussiness1 from "../assets/business1.jpg"
import Bussiness2 from "../assets/business2.jpg"

const BitesBussiness = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>

      <>
        {/* Header section start */}
        <Navbar />
        {/* Header Section end */}
        {/* home section start */}
        <section
          id="home"
          className="home-add-rest home2 section-b-space overflow-hidden"
          style={{
            display: "block !important",
            position: "relative",
            backgroundImage:
              "url(https://qul.imgix.net/138daada-4596-466e-8090-91b9f56b2962/520786_sld.jpg)",
            padding: "50px 0px !important"
          }}
        >
          <div
            style={{
              background: "#00000061",
              position: "absolute",
              width: "100%",
              height: "100%"
            }}
          />
          <div className="container">
            <div className="row">
              <div className="col-lg-8 position-relative">
                <h2  className="mb-3 bites-font-add">
                  Get Food From Your Favourite Takeaway Restaurant in Meatwala
                  Delivered Directly to Your Workplace.
                </h2>
                <a href="#contain" className="btn hover-effect theme-btn">
                  Sign Up Today
                </a>
              </div>
              <div className="col-lg-5 col-12"></div>
            </div>
          </div>
        </section>
        {/* home section end */}
        {/* Featured Restaurants section starts */}
        <section className="restaurant-list pt-2 mt-3 section-b-space ratio3_2">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <img
                  src={Tshirt}
                  style={{ width: "100%" }}
                />
              </div>
              <div className="col-lg-6">
                <div className="pt-2 ">
                  <h1 style={{ fontSize: 24 }}>Kiss Goodbye to Lunchtime Stress </h1>
                  <p className="">
                    Fancy bidding farewell to lunchtime stress? Then why not consider
                    enjoying quick, hassle-free ordering from our user-friendly
                    platform?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="restaurant-list pt-2 mt-3 banner-section section-b-space ratio3_2">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="">
                  <h1 style={{ fontSize: 24 }}>
                    Perfect for Group Orders or Individual Cravings{" "}
                  </h1>
                  <p className="">
                    Whether it’s just one person with a need for great takeaway in
                    High Wycombe or many, we can help you treat your team to a
                    delicious break from work.
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <img
                  src={Bussiness1}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="restaurant-list pt-2 section-b-space ratio3_2">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <img
                  src="https://cdn.prod.website-files.com/63f501f2fcfc599ea419f99b/64be97ecd8f2dce843304725_6464817b252a096c8bf08e0a_iStock-1189100251.jpeg"
                  style={{ width: "100%" }}
                />
              </div>
              <div className="col-lg-6">
                <div className="pt-2 mt-3">
                  <h1 style={{ fontSize: 24 }}>
                    Delivered directly to Your Workplace
                  </h1>
                  <p className="mt-3">
                    We make it easy to get food from your favourite takeaway
                    restaurant in High Wycombe delivered fast directly to your
                    workplace. No stress, just great food.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* featured Restaurants section end */}
        <section className="restaurant-list pt-2 mt-3 banner-section section-b-space ratio3_2">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="">
                  <h1 style={{ fontSize: 24 }}>Real-Time Tracking of Your Food </h1>
                  <p className="">
                    No work time will be wasted when waiting for your food, as we
                    offer real-time tracking of your orders, so you know exactly where
                    they are.
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <img
                  src={Bussiness2}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </div>
        </section>
        {/* faq section starts */}
        <BiteForm />
        {/* <section className="section-b-space">
    <div className="container">
      <div className="faq-title">
        <h2 className="mb-3">
          Enter Your Business Email Address <br /> &amp; Sign Up Today.
        </h2>
      </div>
      <form>
        <div className="row  justify-content-center g-4">
          <div className="col-xl-6">
            <input
              type="email"
              className="form-control"
              style={{ height: 50, lineHeight: 28 }}
            />
          </div>
          <div className="col-xl-12 mt-5 text-center">
            <a href="#" className="btn theme-btn mt-3">
              Sign Up Today
            </a>
          </div>
        </div>
      </form>
    </div>
  </section> */}
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
                <a href="#" className="btn theme-btn mt-0" data-bs-dismiss="modal">
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


    </div>
  )
}

export default BitesBussiness