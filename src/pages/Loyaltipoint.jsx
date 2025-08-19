import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Profileshow from '../components/Profileshow';
import Footer from '../components/Footer';
import FooterMobileMenu from '../components/FooterMobileMenu';
import Delivery from '../components/delivery';
import Loyaltypoint from '../components/loyaltyCard'
import axios from 'axios';

import { Link } from 'react-router-dom';

const Myhistory = () => {
  const [loyaltyHistory, setLoyaltyHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const data = { userid: storedUser?.userid };

  // Fetch loyalty history data
  useEffect(() => {
    const fetchLoyaltyHistory = async () => {
      try {
        const response = await axios.post("https://partnermeatwala.com/api/customer/getcustloyaltyhistory", data);
        if (response.data.status === "1") {
          setLoyaltyHistory(response?.data?.details); // Set the loyalty history data
        } else {
          console.error("Failed to fetch loyalty history");
        }
      } catch (error) {
        console.error("Error fetching loyalty history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoyaltyHistory();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
<>
  {/* Header section start */}
  <Navbar/>
  {/* Header Section end */}
  <section className="section-t-space mytabb overflow-hidden pt-120">
   
    <Delivery/>
  </section>
  <section className="page-head-section">
    <div className="container page-heading">
      <h2 className="h3 mb-3 text-white text-center">Loyalty Points</h2>
      <nav aria-label="breadcrumb">
       
      </nav>
    </div>
  </section>
  {/* profile section starts */}
  <div className="profile-section section-b-space">
    <div className="container">
      <div className="row g-2">
        <div className="col-lg-3">
        <Profileshow selected={"point"}/>
        </div>
        <div className="col-lg-9">
          <div className="my-order-content">
          <div class="col-lg-12 d-flex justify-content-between mb-3">

            <div className="title">
              <div className="loader-line"/>
              <h3>Loyalty</h3>
            </div>
       
</div>

            <ul className="order-box-list">
            {loyaltyHistory.map((item) => (
                <Loyaltypoint key={item?.restid} item={item} />

            ))}
            
             
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
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