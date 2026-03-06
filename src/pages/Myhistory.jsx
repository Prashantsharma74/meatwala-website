import React, { useEffect, useState } from "react";
import { orderHistory, loyalty } from "../utils/api";
import Navbar from "../components/Navbar";
import HistoryCard from "../components/HistoryCard";
import Profileshow from "../components/Profileshow";
import Footer from "../components/Footer";
import FooterMobileMenu from "../components/FooterMobileMenu";
import Delivery from "../components/delivery";

import { Link } from "react-router-dom";

const Myhistory = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [order, setOrder] = useState([]);
  const callData = async () => {
    const data = {
      // userid: "42",
      userid: storedUser?.userid,
    };

    const res = await orderHistory(data);
    if (res.orderhistorydetails) {
      const sortedOrders = res.orderhistorydetails.sort(
        (a, b) => b.orderid - a.orderid
      );
      setOrder(sortedOrders);
    }
  };

  const [totalPoints, setTotalPoints] = useState(0);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentHistory = order.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(order.length / itemsPerPage);

  const points = async () => {
    const data = {
      userid: storedUser?.userid,
    };

    try {
      const response = await loyalty(data);
      if (response.status === "1") {
        const total = response.details.reduce(
          (sum, item) => sum + parseFloat(item.loyaltipoint),
          0
        );
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
      <Navbar />
      <section className="section-t-space mytabb overflow-hidden pt-120">
        <Delivery />
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
      <section className="profile-section mt-4 section-b-space">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <Profileshow selected={"History"} />
            </div>
            <div className="col-lg-9">
              <div className="my-order-content">
                <div class="col-lg-12 d-flex justify-content-between mb-3">
                  <div className="title">
                    <div className="loader-line" />
                    <h3>My Order</h3>
                  </div>
                </div>
                <ul className="order-box-list">
                  {/* {order.map((item) => (
                    <HistoryCard key={item?.orderid} item={item} />
                  ))} */}
                  {currentHistory.length > 0 ? (
                    currentHistory.map((item) => (
                      <HistoryCard key={item?.orderid} item={item} />
                    ))
                  ) : (
                    <li className="order-box">
                      <div className="order-box-content">
                        <p>No history available.</p>
                      </div>
                    </li>
                  )}
                </ul>
                {order.length > itemsPerPage && (
                  <div className="d-flex justify-content-center mt-4 gap-2">
                    <button
                      className="btn btn-outline-secondary"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Previous
                    </button>

                    <span className="align-self-center">
                      Page {currentPage} of {totalPages}
                    </span>

                    <button
                      className="btn btn-outline-secondary"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <FooterMobileMenu selected={"History"} />
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
    </>
  );
};

export default Myhistory;
