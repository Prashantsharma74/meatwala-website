import React from "react";
import Navbar from "../components/Navbar";
import Delivery from "../components/delivery";
import Footer from "../components/Footer";
import FooterMobileMenu from "../components/FooterMobileMenu";
import { Link } from "react-router-dom";
const Selectaddress = () => {
  return (
    <>
      {/* Header section start */}
      <Navbar />
      {/* Header Section end */}
      <section className="section-t-space mytabb overflow-hidden pt-120">
        {/* <div className="container text-center">
      <div className="tab">
        <div>
          <Link className="tablinks active">
            <p>
              <i className="fa fa-motorcycle" /> Delivery
            </p>{" "}
            <p className="smtext">35 - 50 Min</p>
          </Link>
          <Link className="tablinks">
            <p>
              <i className="fa fa-shopping-bag" aria-hidden="true" /> Collection{" "}
            </p>{" "}
            <p className="smtext">15 - 25 Min</p>
          </Link>
        </div>
      </div>
    </div> */}
        <Delivery />
      </section>
      <section className="page-head-section">
        <div className="container page-heading">
          <h2 className="h3 mb-3 text-white text-center">Select Address</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb flex-lg-nowrap justify-content-center justify-content-lg-star">
              <li className="breadcrumb-item">
                <Link href="index.html">
                  <i className="ri-home-line" />
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Select Address
              </li>
            </ol>
          </nav>
        </div>
      </section>
      {/*  account section starts */}
      <section className="account-section section-b-space pt-0">
        <div className="container">
          <div className="layout-sec">
            <div className="row g-lg-4 g-4">
              <div className="col-lg-8">
                <div className="address-section">
                  <div className="title">
                    <div className="loader-line" />
                    <h3>Select Saved Address</h3>
                    <h6>
                      You’ve add some address before, You can select one of
                      below.
                    </h6>
                  </div>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="address-box">
                        <div className="address-title">
                          <div className="d-flex align-items-center gap-2">
                            <i className="ri-home-4-fill icon" />
                            <h6>Home</h6>
                          </div>
                          <Link
                            href="#edit-address"
                            className="edit-btn"
                            data-bs-toggle="modal"
                          >
                            Edit
                          </Link>
                        </div>
                        <div className="address-details">
                          <h6>
                            93, Songbird Cir, Blackville, South Carolina,
                            USA-29817
                          </h6>
                          <h6 className="phone-number">+33 (907) 555-0101</h6>
                          <div className="form-check form-check-reverse option-section">
                            <label className="btn gray-btn rounded-2 mt-0">
                              {" "}
                              <input
                                className="form-check-input me-1"
                                type="radio"
                                name="flexRadioDefault"
                                id={1}
                              />{" "}
                              <span>Select Address </span>{" "}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="address-box">
                        <div className="address-title">
                          <div className="d-flex align-items-center gap-2">
                            <i className="ri-briefcase-4-fill icon" />
                            <h6>Office</h6>
                          </div>
                          <Link
                            href="#edit-address"
                            className="edit-btn"
                            data-bs-toggle="modal"
                          >
                            Edit
                          </Link>
                        </div>
                        <div className="address-details">
                          <h6>
                            13th St, matrail Cir, Vitactall Beige, New York,
                            USA-10011
                          </h6>
                          <h6 className="phone-number">+33 (907) 555-1235</h6>
                          <div className="form-check form-check-reverse option-section">
                            <label className="btn gray-btn rounded-2 mt-0">
                              {" "}
                              <input
                                className="form-check-input me-1"
                                type="radio"
                                name="flexRadioDefault"
                                id={2}
                              />{" "}
                              <span>Select Address </span>{" "}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="address-box">
                        <div className="address-title">
                          <div className="d-flex align-items-center gap-2">
                            <i className="ri-account-circle-fill icon" />
                            <h6>Other</h6>
                          </div>
                          <Link
                            href="#edit-address"
                            className="edit-btn"
                            data-bs-toggle="modal"
                          >
                            Edit
                          </Link>
                        </div>
                        <div className="address-details">
                          <h6>
                            703, W 156th st, Cross Road, Elizabeth Barcus Way,
                            USA-95540
                          </h6>
                          <h6 className="phone-number">+33 (907) 555-3456</h6>
                          <div className="form-check form-check-reverse option-section">
                            <label className="btn gray-btn rounded-2 mt-0">
                              {" "}
                              <input
                                className="form-check-input me-1"
                                type="radio"
                                name="flexRadioDefault"
                                id={1}
                              />{" "}
                              <span>Select Address </span>{" "}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="address-box new-address-box">
                        <Link
                          href="#address-details"
                          className="btn theme-outline rounded-2"
                          data-bs-toggle="modal"
                        >
                          Add New Address
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="order-summery-section sticky-top">
                  <div className="checkout-detail">
                    <ul>
                      <li>
                        <div className="horizontal-product-box">
                          <div className="product-content">
                            <div className="d-flex align-items-center justify-content-between">
                              <h5>Ultimate Loaded Nacho Fiesta</h5>
                              <h6 className="product-price">£20</h6>
                            </div>
                            <h6 className="ingredients-text">
                              Hot Nacho Chips
                            </h6>
                            <div className="d-flex align-items-center justify-content-between mt-md-2 mt-1 gap-1">
                              <h6 className="place">Serve 1</h6>
                              <div className="plus-minus">
                                <i className="ri-subtract-line sub" />
                                <input
                                  type="number"
                                  defaultValue={1}
                                  min={1}
                                  max={10}
                                />
                                <i className="ri-add-line add" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="horizontal-product-box">
                          <div className="product-content">
                            <div className="d-flex align-items-center justify-content-between">
                              <h5>Smoked Salmon Bagel</h5>
                              <h6 className="product-price">£40</h6>
                            </div>
                            <h6 className="ingredients-text">Smoked Biscuit</h6>
                            <div className="d-flex align-items-center justify-content-between mt-md-2 mt-1 gap-1">
                              <h6 className="place">Serve 2</h6>
                              <div className="plus-minus">
                                <i className="ri-subtract-line sub" />
                                <input
                                  type="number"
                                  defaultValue={1}
                                  min={1}
                                  max={10}
                                />
                                <i className="ri-add-line add" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="horizontal-product-box">
                          <div className="product-content">
                            <div className="d-flex align-items-center justify-content-between">
                              <h5>Cranberry Club Sandwich</h5>
                              <h6 className="product-price">£50</h6>
                            </div>
                            <h6 className="ingredients-text">Vegetables</h6>
                            <div className="d-flex align-items-center justify-content-between mt-md-2 mt-1 gap-1">
                              <h6 className="place">Serve 3</h6>
                              <div className="plus-minus">
                                <i className="ri-subtract-line sub" />
                                <input
                                  type="number"
                                  defaultValue={1}
                                  min={1}
                                  max={10}
                                />
                                <i className="ri-add-line add" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <h5 className="bill-details-title fw-semibold dark-text">
                      Bill Details
                    </h5>
                    <div className="sub-total">
                      <h6 className="content-color fw-normal">Sub Total</h6>
                      <h6 className="fw-semibold">£110</h6>
                    </div>
                    <div className="sub-total">
                      <h6 className="content-color fw-normal">
                        Delivery Charge (2 Miles)
                      </h6>
                      <h6 className="fw-semibold success-color">Free</h6>
                    </div>
                    <div className="sub-total">
                      <h6 className="content-color fw-normal">
                        Discount (10%)
                      </h6>
                      <h6 className="fw-semibold">£10</h6>
                    </div>
                    <div className="grand-total">
                      <h6 className="fw-semibold dark-text">To Pay</h6>
                      <h6 className="fw-semibold amount">£100</h6>
                    </div>
                    <Link
                      href="payment.html"
                      className="btn theme-btn restaurant-btn rounded-2 w-100"
                    >
                      CHECKOUT
                    </Link>
                    <img
                      className="dots-design"
                      src="assets/images/svg/dots-design.svg"
                      alt="dots"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* account section end */}
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
      {/* add-card modal starts */}
      <div
        className="modal address-details-modal fade"
        id="address-details"
        tabIndex={-1}
        aria-labelledby="addModalAdress"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addModalAdress">
                Address Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="inputFirstname" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputFirstname"
                    placeholder="Enter your fist name"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputLastname" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputLastname"
                    placeholder="Enter your last name"
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="inputAddress" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder="Enter your address"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputCity" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputCity"
                    placeholder="Enter your city"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputCountry" className="form-label">
                    Country
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputCountry"
                    placeholder="Enter your country"
                  />
                </div>
                <div className="col-md-8">
                  <label htmlFor="inputPhone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="inputPhone"
                    placeholder="Enter your number"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputZip" className="form-label">
                    Zip
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputZip"
                    placeholder="Enter your zip"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <Link
                href="javascript:void();"
                className="btn gray-btn mt-0"
                data-bs-dismiss="modal"
              >
                CANCEL
              </Link>
              <Link href="address-book.html" className="btn theme-btn mt-0">
                SUBMIT
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* add-card modal end */}
      {/* edit address modal starts */}
      <div
        className="modal address-details-modal fade"
        id="edit-address"
        tabIndex={-1}
        aria-labelledby="exampleModalAdress"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalAdress">
                Address Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="editFirstname" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editFirstname"
                    defaultValue="Smith"
                    placeholder="Enter your fist name"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="editLastname" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editLastname"
                    defaultValue="Jones"
                    placeholder="Enter your last name"
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="editAddress" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editAddress"
                    defaultValue="93, Songbird Cir, Blackville,"
                    placeholder="Enter your address"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="editCity" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editCity"
                    defaultValue="South Carolina"
                    placeholder="Enter your city"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="editCountry" className="form-label">
                    Country
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editCountry"
                    defaultValue="USA"
                    placeholder="Enter your country"
                  />
                </div>
                <div className="col-md-8">
                  <label htmlFor="editPhone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="editPhone"
                    defaultValue="+33 (907) 555-0101"
                    placeholder="Enter your number"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="editZip" className="form-label">
                    Zip
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editZip"
                    defaultValue={29817}
                    placeholder="Enter your zip"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <Link
                href="javascript:void();"
                className="btn gray-btn mt-0"
                data-bs-dismiss="modal"
              >
                CANCEL
              </Link>
              <Link href="address-book.html" className="btn theme-btn mt-0">
                SUBMIT
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* edit address modal end */}
      {/* tap to top start */}
      <button className="scroll scroll-to-top">
        <i className="ri-arrow-up-s-line arrow" />
      </button>
      {/* tap to top end */}
      {/* responsive space */}
      <div className="responsive-space" />
      {/* responsive space */}
      {/* bootstrap js */}
      {/* footer accordion js */}
      {/* loader js */}
      {/* swiper js */}
      {/* script js */}
    </>
  );
};

export default Selectaddress;
