import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import bookingCancel from "../assets/cancel.png"
const Confirmorder = () => {
  
  
  return (
<>
  {/* Header section start */}
<Navbar/>
  {/* Header Section end */}
  <section className="section-t-space mytabb overflow-hidden pt-120">
    <div className="container text-center">
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
    </div>
  </section>
  <section className="page-head-section">
    <div className="container page-heading">
      <h2 className="h3 mb-3 text-white text-center">Booking Cancel</h2>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb flex-lg-nowrap justify-content-center justify-content-lg-star">
          <li className="breadcrumb-item">
            <Link href="index.html">
              <i className="ri-home-line" />
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
          Booking Cancel
          </li>
        </ol>
      </nav>
    </div>
  </section>
  {/*  account section starts */}
  <section className="account-section section-b-space pt-0">
    <div className="container">
      <div className="layout-sec">
        <div className="row justify-content-center g-lg-4 g-4">
          <div className="col-lg-9">
            <div className="account-part confirm-part">
              <img
                className="img-fluid account-img w-25"
                src={bookingCancel}
                alt="confirm"
              />
              <h3>Oops, Something Went Wrong!</h3>
              <p>
              We couldn’t complete your order at this time. Please check your details or try again later.
              </p>
              <div className="account-btn d-flex justify-content-center gap-2">
              <Link to={'/'}>

                <button className="btn theme-btn mt-0">
                  Back to Home
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
<Footer/>
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
          <Link href="#" className="btn theme-btn mt-0" data-bs-dismiss="modal">
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
  )
}

export default Confirmorder