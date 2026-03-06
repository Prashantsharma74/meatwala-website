import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FooterMobileMenu from '../components/FooterMobileMenu'
const favourate = () => {
  return (
<>
  {/* Header section start */}
<Navbar/>
  {/* Header Section end */}
  <section className="section-t-space section-b-space mytabb overflow-hidden pt-120">
    <div className="container text-center">
      <div className="tab">
        <div>
          <Link className="tablinks active">
            <i className="fa fa-motorcycle" /> Delivery{" "}
          </Link>
          <Link className="tablinks">
            <i className="fa fa-shopping-bag" aria-hidden="true" /> Collection
          </Link>
        </div>
      </div>
    </div>
  </section>
  <section className="page-head-section">
    <div className="container page-heading">
      <h2 className="h3 mb-3 text-white text-center">Favourite Restaurants</h2>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb flex-lg-nowrap justify-content-center justify-content-lg-star">
          <li className="breadcrumb-item">
            <Link href="index.html">
              <i className="ri-home-line" />
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Favourite Restaurants
          </li>
        </ol>
      </nav>
    </div>
  </section>
  {/* profile section starts */}
  <section className="profile-section section-b-space">
    <div className="container">
      <div className="row g-3">
        <div className="col-lg-3">
          <div className="profile-sidebar sticky-top">
            <div className="profile-cover">
              <img
                className="img-fluid profile-pic"
                src="assets/images/icons/p5.png"
                alt="profile"
              />
            </div>
            <div className="profile-name">
              <h5 className="user-name">Mark Jecno</h5>
              <h6>test@gmail.com</h6>
            </div>
            <ul className="profile-list">
              <li>
                <i className="ri-user-3-line" />
                <Link href="setting.html">Profile</Link>
              </li>
              <li>
                <i className="ri-shopping-bag-3-line" />
                <Link href="my-history.html">My History</Link>
              </li>
              <li>
                <i className="ri-map-pin-line" />
                <Link href="address-book.html">Adddress Book</Link>
              </li>
              <li className="active">
                <i className="fa fa-heart" />
                <Link href="favourite.html">Favourite Restaurant</Link>
              </li>
              <li>
                <i className="ri-question-line" />
                <Link href="#">Help</Link>
              </li>
              <li>
                <i className="ri-logout-box-r-line" />
                <Link href="log-out">Log Out</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-9">
          <div className="change-profile-content">
            <div className="title">
              <div className="loader-line" />
              <h3>Profile</h3>
            </div>
            <ul className="profile-details-list">
              <li>
                <div className="profile-content">
                  <div className="d-flex align-items-center gap-sm-2 gap-1">
                    <i className="ri-user-3-fill" />
                    <span>Name :</span>
                  </div>
                  <h6>Mark Jecno</h6>
                </div>
                <Link
                  href="#name"
                  className="btn theme-outline"
                  data-bs-toggle="modal"
                >
                  Edit
                </Link>
              </li>
              <li>
                <div className="profile-content">
                  <div className="d-flex align-items-center gap-sm-2 gap-1">
                    <i className="ri-mail-fill" />
                    <span>Email :</span>
                  </div>
                  <h6>test@gmail.com</h6>
                </div>
              </li>
              <li>
                <div className="profile-content">
                  <div className="d-flex align-items-center gap-sm-2 gap-1">
                    <i className="ri-phone-fill" />
                    <span>Phone Number :</span>
                  </div>
                  <h6>+1 (692)52 - 95555</h6>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* profile section end */}
  {/* footer section starts */}
<Footer/>
  {/* footer section end */}
  {/* mobile fix menu start */}
<FooterMobileMenu/>
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

export default favourate