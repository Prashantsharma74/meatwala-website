import React, { useEffect, useState } from 'react'
import { getFavorite } from '../utils/api';
import Navbar from '../components/Navbar';
import RestaurantCard from '../components/RestaurantCard';
import Profileshow from '../components/Profileshow';
import Footer from '../components/Footer';
import FooterMobileMenu from '../components/FooterMobileMenu';
import Delivery from '../components/delivery';
import FavouriteCard from '../components/favouriteCard';
import { Link } from 'react-router-dom';
const Favourite = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedAddress = JSON.parse(localStorage.getItem("userAddress"));
  const storedPincode = JSON.parse(localStorage.getItem("pincode")) || "";
  const pincode = storedPincode ? storedPincode.longName : "";

  const [rest, setRest] = useState([]);





  const callData = async () => {
    const data = {
      lat: storedAddress?.lat,
      lng: storedAddress?.lng,
      pincode:pincode,
      // userid:"7",
      userid: storedUser?.userid,
    };
    const res = await getFavorite(data);
    setRest(res?.restdata);
    console.log("data", res);
  };
  useEffect(() => {
    callData();
  }, []);
  // useEffect(() => {
  //   console.log("rest", rest.pkid);
  // }, [rest]);



// for add favrite


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
         <Profileshow selected={"Favourite"}/>
        </div>
        <div className="col-lg-9">
          <div className="change-profile-content">
            <div className="title">
              <div className="loader-line" />
              <h3>Favourite Restaurants</h3>
            </div>
            <div className="row g-4 ratio2_3">
            {
                rest?.map((item)=>(
                  <div key={item.pkid} className="col-xl-6 col-lg-4 col-sm-6 trash" >
                  <FavouriteCard  item={item} getFavorite={callData}/>
                 </div>
                ))             
              }
              
              {/* {
                rest?.map((item)=>(
                  <div key={item.pkid} className="col-xl-6 col-lg-4 col-sm-6 trash">
                   <RestaurantCard  item={item} />
                  </div>
                ))             
              } */}

             

              {/* {
                rest?.map((item)=>(
                  <div key={item.pkid} className="col-xl-6 col-lg-4 col-sm-6 trash">
                   <RestaurantCard  item={item} />
                  </div>
                ))             
              } */}
              {/* <div className="col-xl-6 col-lg-4 col-sm-6 trash">
                <div className="vertical-product-box">
                  <div className="vertical-product-box-img">
                    <Link href="restaurant-details.html">
                      <img
                        className="product-img-top w-100 bg-img"
                        src="assets/images/product/vp-3.png"
                        alt="vp3"
                      />
                    </Link>
                    <Link href="javascript:void()" className="wishlist-close">
                      <i
                        className="fa fa-heart"
                        style={{ fontSize: 16, color: "red" }}
                      />
                    </Link>
                  </div>
                  <div className="vertical-product-body">
                    <div className="d-flex align-items-center justify-content-between mt-sm-3 mt-2">
                      <Link href="restaurant-details.html">
                        <h4 className="vertical-product-title">
                          The Grill Master's Cafe
                        </h4>
                      </Link>
                      <h6 className="rating-star">
                        <span className="star">
                          <i className="ri-star-s-fill" />
                        </span>
                        4.3
                      </h6>
                    </div>
                    <h5 className="product-items">
                      Bread, Eggs, Butter, Fries...
                    </h5>
                    <div className="location-distance d-flex align-items-center justify-content-between pt-sm-3 pt-2">
                      <h5 className="place">New York</h5>
                      <ul className="distance">
                        <li>
                          <i className="ri-map-pin-fill icon" /> 5 km
                        </li>
                        <li>
                          <i className="ri-time-fill icon" /> 40 min
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div> */}
             
              
            </div>
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

export default Favourite