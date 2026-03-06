import React,{useEffect} from "react";
import Navbar from "../components/Navbar";
import Delivery from "../components/delivery";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
const Payment = () => {
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);
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
          <h2 className="h3 mb-3 text-white text-center">Payment</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb flex-lg-nowrap justify-content-center justify-content-lg-star">
              <li className="breadcrumb-item">
                <Link href="index.html">
                  <i className="ri-home-line" />
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Payment
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
                <div className="payment-section">
                  <div className="title mb-0">
                    <div className="loader-line" />
                    <h3>Choose Payment Method</h3>
                    <h6>There are many Types of Payment Method</h6>
                  </div>
                  <div
                    className="accordion payment-accordion"
                    id="accordionExample"
                  >
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Credit / Debit Card
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <form className="row g-3">
                            <div className="col-12">
                              <label
                                htmlFor="inputCardnumber"
                                className="form-label"
                              >
                                Card Number
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="inputCardnumber"
                                placeholder="Enter your card number"
                              />
                            </div>
                            <div className="col-12">
                              <label
                                htmlFor="inputCardholdername"
                                className="form-label"
                              >
                                Card Holder Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="inputCardholdername"
                                placeholder="Enter Holder name"
                              />
                            </div>
                            <div className="col-sm-6">
                              <label
                                htmlFor="inputAddress"
                                className="form-label"
                              >
                                Exp. Date
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                id="inputAddress"
                              />
                            </div>
                            <div className="col-sm-6">
                              <label htmlFor="inputCity" className="form-label">
                                CVV
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="inputCity"
                                placeholder="Enter your cvv"
                              />
                            </div>
                            <div className="buttons">
                              <Link
                                href="payment.html"
                                className="btn gray-btn mt-0"
                              >
                                CANCEL
                              </Link>
                              <Link
                                href="payment.html"
                                className="btn theme-btn mt-0"
                              >
                                SUBMIT
                              </Link>
                            </div>
                          </form>
                          <ul className="card-list">
                            <li>
                              <div className="form-check form-check-reverse">
                                <label
                                  className="form-check-label"
                                  htmlFor="flexRadioDefault01"
                                >
                                  <img
                                    className="img-fluid img"
                                    src="assets/images/icons/svg/mastercard.svg"
                                    alt="mastercard"
                                  />
                                  <span className="card-name dark-text">
                                    Mastercard <span>**** **** 4586 </span> |
                                    Expires on <span> 12/24</span>
                                  </span>
                                </label>
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id="flexRadioDefault01"
                                  defaultChecked=""
                                />
                              </div>
                            </li>
                            <li>
                              <div className="form-check form-check-reverse">
                                <label
                                  className="form-check-label"
                                  htmlFor="flexRadioDefault02"
                                >
                                  <img
                                    className="img-fluid img"
                                    src="assets/images/icons/svg/mastercard.svg"
                                    alt="mastercard"
                                  />
                                  <span className="card-name dark-text">
                                    Mastercard <span>**** **** 4586 </span> |
                                    Expires on <span> 12/24</span>
                                  </span>
                                </label>
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id="flexRadioDefault02"
                                  defaultChecked=""
                                />
                              </div>
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
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          Pay by UPI
                        </button>
                      </h2>
                      <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <ul className="card-list">
                            <li>
                              <div className="form-check form-check-reverse">
                                <label
                                  className="form-check-label"
                                  htmlFor="flexRadioDefault1"
                                >
                                  <img
                                    className="img-fluid img"
                                    src="https://zeevector.com/wp-content/uploads/PayPal-Symbol.png"
                                    alt="mastercard"
                                  />
                                  <span className="card-name dark-text">
                                    Pay Pal
                                  </span>
                                </label>
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id="flexRadioDefault1"
                                  defaultChecked=""
                                />
                              </div>
                            </li>
                            <li>
                              <div className="form-check form-check-reverse">
                                <label
                                  className="form-check-label"
                                  htmlFor="flexRadioDefault3"
                                >
                                  <img
                                    className="img-fluid img"
                                    src="assets/images/icons/svg/google-pay.svg"
                                    alt="mastercard"
                                  />
                                  <span className="card-name dark-text">
                                    Google Pay
                                  </span>
                                </label>
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id="flexRadioDefault3"
                                />
                              </div>
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
                          data-bs-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          Cash Payment
                        </button>
                      </h2>
                      <div
                        id="collapseThree"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <ul className="card-list">
                            <li>
                              <div className="form-check form-check-reverse">
                                <label
                                  className="form-check-label"
                                  htmlFor="cashRadio"
                                >
                                  <span className="card-name dark-text">
                                    Cash on Delivery
                                  </span>
                                </label>
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id="cashRadio"
                                  defaultChecked=""
                                />
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div class="payment-list-box">
                          <div class="form-check d-flex justify-content-between ps-0 w-100">
                              <label class="form-check form-check-reverse" for="flexRadioDefault4">Cash On
                                  Delivery</label>
                              <input class="form-check-input" type="radio" name="flexRadioDefault4">
                          </div>
                      </div> */}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="order-summery-section sticky-top">
                  <div className="checkout-detail">
                    <div className="cart-address-box">
                      <div className="add-img">
                        <img
                          className="img-fluid img"
                          src="assets/images/home.png"
                          alt="rp1"
                        />
                      </div>
                      <div className="add-content">
                        <div className="d-flex align-items-center justify-content-between">
                          <h5 className="dark-text deliver-place">
                            Deliver to : Home
                          </h5>
                          <Link
                            href="select-address.html"
                            className="change-add"
                          >
                            Change
                          </Link>
                        </div>
                        <h6 className="address mt-2 content-color">
                          932 Pittwater Rd, Sydney, New South Wales, 2099
                        </h6>
                      </div>
                    </div>
                    <h3 className="fw-semibold dark-text checkout-title">
                      Order Summery
                    </h3>
                    <ul>
                      <li>
                        <div className="horizontal-product-box">
                          <div className="product-content">
                            <div className="d-flex align-items-center justify-content-between">
                              <h5>Ultimate Loaded Nacho Fiesta</h5>
                              <h6 className="product-price">£40</h6>
                            </div>
                            <h6 className="ingredients-text">
                              Hot Nacho Chips
                            </h6>
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
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="horizontal-product-box">
                          <div className="product-content">
                            <div className="d-flex align-items-center justify-content-between">
                              <h5>Cranberry Club Sandwich</h5>
                              <h6 className="product-price">£40</h6>
                            </div>
                            <h6 className="ingredients-text">Vegetables</h6>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div className="promo-code position-relative">
                      <input
                        type="email"
                        className="form-control code-form-control"
                        placeholder="Enter promo code"
                      />
                      <Link href="#" className="btn theme-btn apply-btn mt-0">
                        APPLY
                      </Link>
                    </div>
                    <h5 className="fw-semibold dark-text pt-3 pb-3">
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
                      <h6 className="fw-semibold dark-text">Total</h6>
                      <h6 className="fw-semibold amount">£100</h6>
                    </div>
                    <Link to={"/ConfirmOrder"}>
                      <button className="btn theme-btn restaurant-btn w-100 rounded-2">
                        PAY NOW
                      </button>
                    </Link>
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
      <div className="mobile-menu d-md-none d-block mobile-cart">
        <ul>
          <li className="active">
            <Link href="index.html" className="menu-box">
              <i className="ri-home-4-line" />
              <span>Home</span>
            </Link>
          </li>
          <li className="mobile-category">
            <Link href="" className="menu-box">
              <i className="fa fa-cutlery mb-2 pt-1" />
              <span>Dining</span>
            </Link>
          </li>
          <li>
            <Link href="history.html" className="menu-box">
              <i className="ri-apps-line" />
              <span>History</span>
            </Link>
          </li>
          <li>
            <Link href="setting.html" className="menu-box">
              <i className="fa fa-user mb-2 pt-1" />
              <span>Setting</span>
            </Link>
          </li>
        </ul>
      </div>
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

export default Payment;
