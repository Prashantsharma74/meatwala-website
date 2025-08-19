import React, { useEffect, useState } from 'react'
import { orderHistory,loyalty } from '../utils/api';
import Navbar from '../components/Navbar';
import HistoryCard from '../components/HistoryCard';
import Profileshow from '../components/Profileshow';
import Footer from '../components/Footer';
import FooterMobileMenu from '../components/FooterMobileMenu';
import Delivery from '../components/delivery';

import { Link } from 'react-router-dom';

const Myhistory = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [order, setOrder] = useState([]);
  const callData = async () => {
    const data = {
      // userid: "42",
      userid: storedUser?.userid,
    };
 

    const res = await orderHistory(data);
    if (res.orderhistorydetails) {
      // Sort the orders in descending order by orderid
      const sortedOrders = res.orderhistorydetails.sort((a, b) => b.orderid - a.orderid);
      setOrder(sortedOrders);
    }
  };

  const [totalPoints, setTotalPoints] = useState(0);

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
              <h3>My Order</h3>
            </div>
            {/* <div className="text-center mb-1">
  <p
    style={{
      background: "#dff5ff",
      color: "#000",
      fontSize: 14,
      border: "1px solid rgb(232, 65, 53)",
      borderRadius: 10
    }}
    className="p-2"
  >
    <strong>Loyalty Points:</strong>
    <br /> {totalPoints}
  </p>
</div> */}
</div>

            <ul className="order-box-list">
            {order.map((item) => (
              <HistoryCard key={item?.orderid} item={item} />
            ))}
            
              {/* <li>
                <div className="order-box">
                  <div className="order-box-content">
                    <div className="brand-icon">
                      <img
                        className="img-fluid icon"
                        src="assets/images/icons/brand2.png"
                        alt="brand3"
                      />
                    </div>
                    <div className="order-details">
                      <div className="d-flex align-items-center justify-content-between w-100">
                        <h5 className="brand-name dark-text fw-medium">
                          Mcdonald's
                        </h5>
                        <h6 className="fw-medium content-color text-end">
                          Today, 3:00 PM
                        </h6>
                      </div>
                      <h6 className="fw-medium dark-text">
                        <span className="fw-normal content-color">
                          Transaction Id :
                        </span>
                        #ACB12345458
                      </h6>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mt-sm-3 mt-2">
                    <h6 className="fw-medium dark-text">
                      <span className="fw-normal content-color">
                        Total Amount :
                      </span>
                      £ 40.00
                    </h6>
                    <Link
                      href="#order"
                      className="btn theme-outline details-btn"
                      data-bs-toggle="modal"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </li> */}
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