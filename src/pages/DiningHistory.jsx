import React, { useEffect, useState } from 'react'
import { DiningHistory,loyalty } from '../utils/api';
import Navbar from '../components/Navbar';
import DiningHistoryCard from '../components/DiningHistoryCard';
import Profileshow from '../components/Profileshow';
import Footer from '../components/Footer';
import FooterMobileMenu from '../components/FooterMobileMenu';
import Delivery from '../components/delivery';

import { Link } from 'react-router-dom';

const Myhistory = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [order, setOrder] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState({ past: [], upcoming: [] });
  const [totalPoints, setTotalPoints] = useState(0);
  const [activeTab, setActiveTab] = useState("Upcoming");
  
  
  const callData = async () => {
    const data = {
      // userid: "42",
      custid: storedUser?.userid,
    };
 

    const res = await DiningHistory(data);
    if(res.bookings){
    setOrder(res.bookings);
    }
  };

 // Utility function to check if a booking is past or upcoming
 const compareDates = (bookingDate) => {
  const currentDate = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format
  return bookingDate < currentDate ? "past" : "upcoming";
};

// Split bookings into past and upcoming based on date
useEffect(() => {
  const past = order
    .filter((item) => compareDates(item.bookingdate) === "past")
    .sort((a, b) => new Date(b.bookingdate) - new Date(a.bookingdate)); // Sort past bookings in descending order

  const upcoming = order
    .filter((item) => compareDates(item.bookingdate) === "upcoming")
    .sort((a, b) => new Date(a.bookingdate) - new Date(b.bookingdate)); // Sort upcoming bookings in ascending order

  setFilteredBookings({ past, upcoming });
}, [order]);



  const points = async () => {
    const data = {
      userid: storedUser?.userid,
    };

    try {
      const response = await loyalty(data);
      if (response.status === "1") {
        const total = response.details.reduce((sum, item) => sum + parseFloat(item.loyaltipoint), 0);
        setTotalPoints(total);
      } else {
        console.error("Error fetching loyalty points:", response.returnmsg);
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };

  useEffect(() => {
    points();
  }, []);


  useEffect(() => {
    callData();
  }, []);
  return (
<>
  {/* Header section start */}
  <Navbar/>
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
    <Delivery/>
  </section>
  <section className="page-head-section">
    <div className="container page-heading">
      <h2 className="h3 mb-3 text-white text-center">My History</h2>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb flex-lg-nowrap justify-content-center justify-content-lg-star">
          <li className="breadcrumb-item">
            <Link href="index.html">
              <i className="ri-home-line" />
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            My History
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
        <Profileshow selected={"History"}/>
        </div>
        <div className="col-lg-9">
          <div className="my-order-content">
          <div class="col-lg-12 d-flex justify-content-between mb-3">

            <div className="title">
              <div className="loader-line" />
              <h3>Your Bookings</h3>
            </div>
          {/* Toggle buttons for Past and Upcoming */}
          <div>
            <button
              className={`btn me-2 ${activeTab === "Past" ? "btn theme-btn" : "btn theme-outline"}`}
              onClick={() => setActiveTab("Past")}
            >
              Past
            </button>
            <button
              className={`btn ${activeTab === "Upcoming" ? "btn theme-btn" : "btn theme-outline"}`}
              onClick={() => setActiveTab("Upcoming")}
            >
              Upcoming
            </button>
          </div>
</div>

<ul className="order-box-list">
                  {(activeTab === "Upcoming" ? filteredBookings.upcoming : filteredBookings.past).map((item) => (
                    <DiningHistoryCard key={item.bookingid} item={item} activeTab={activeTab} />
                  ))}
                </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* profile section end */}
  {/* order details modal starts */}

  {/* order details modal end */}
  {/* footer section starts */}
  <Footer/>
  {/* footer section end */}
  {/* mobile fix menu start */}
  <FooterMobileMenu selected={"History"}/>
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
</>

  )
}

export default Myhistory