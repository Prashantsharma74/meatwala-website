import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { categorylistRestaurant } from "../utils/api";
import Navbar from "../components/Navbar";
import RestaurantCard from "../components/RestaurantCard";
import Footer from "../components/Footer";
import Delivery from "../components/delivery";
import FooterMobileMenu from "../components/FooterMobileMenu";

const Restaurantlist = () => {
  const perems = useParams();
  const [restraDetail, setRestraDetail] = useState([]);
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const storedPincode = JSON.parse(localStorage.getItem("pincode")) || "";
  const pincode = storedPincode ? storedPincode.longName : "";
  const userAddress = JSON.parse(localStorage.getItem("userAddress"));

  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");
  const getDetail = async () => {
    const sendData = {
      lat: userAddress?.lat,
      lng: userAddress?.lng,
      pincode:pincode.toString() || "",
      catid: perems.id,
      page: "1",
      sort: "1",
    };
    const res = await categorylistRestaurant(sendData);
    setRestraDetail(res?.categorywiserest);
  };

  useEffect(() => {
    getDetail();
    // console.log("perems", perems.id);
  }, [perems]);
  return (
    <>
      {/* Header section start */}
      <Navbar />
      {/* Header Section end */}
      <section className="section-t-space mytabb overflow-hidden pt-120">
        <Delivery />
      </section>
      {/* page head section starts */}
      <section className="page-head-section">
        <div className="container page-heading">
          <h2 className="h3 mb-3 text-white text-center">Store list </h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb flex-lg-nowrap justify-content-center justify-content-lg-star">
              <li className="breadcrumb-item">
                <Link href="index.html">
                  <i className="ri-home-line" />
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Store list 
              </li>
            </ol>
          </nav>
        </div>
      </section>
      {/* page head section end */}

      {/* popular restaurant section starts */}
     
      <section className="restaurant-list section-b-space ratio3_2">
        <div className="container">
          <div className="title restaurant-title pb-0 w-border">
            <h2>{name}</h2>
          </div>
          <div className="tab-content restaurant-content" id="TabContent">
            <div className="row">
              {restraDetail?.map((item) => (
                //  <RestaurantCard key={item.pkid} item={item} />
                <div className="col-xl-3 col-lg-4 col-sm-6">
                  <Link to={`/store/${item?.pkid}`}>
                    <div className="vertical-product-box">
                      <div className="vertical-product-box-img">
                        <Link href="restaurant-details.html">
                          <img
                            className="vertical-product-img-top w-100 bg-img fix-image-size"
                            src={`https://partnermeatwala.com/documents/${item?.imagename}`}
                            alt="vp-2"
                          />
                        </Link>
                        <div className="offers">
                          <h6>ㅤ</h6>
                          {/* <h6>upto £2</h6> */}
                          <div className="d-flex align-items-center justify-content-between">
                            <h4>ㅤ</h4>
                            {/* <h4>50% OFF</h4> */}
                            <div className="seller-badge">
                              <img
                                className="img-fluid badge"
                                src={`https://partnermeatwala.com/documents/${item?.logo}`}
                                alt="medal"
                              />
                              <h6>Best Seller</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="vertical-product-body">
                        <div className="d-flex align-items-center justify-content-between mt-sm-3 mt-2">
                          <Link href="restaurant-details.html">
                            <h4 className="vertical-product-title">
                              {item?.name}
                            </h4>
                          </Link>
                          <h6 className="rating-star">
                            <span className="star">
                              <i className="ri-star-s-fill" />
                            </span>
                            {item?.hyginerating}
                          </h6>
                        </div>
                        <h5 className="product-items">
                          {`${item.cat1 ? item.cat1 : "ㅤ"}${
                            item.cat2 ? " • " + item.cat2 : ""
                          }${item.cat3 ? " • " + item.cat3 : ""}`}
                        </h5>
                        <div className="location-distance d-flex align-items-center justify-content-between pt-sm-3 pt-2">
                          {/* <h5 className="place">{item?.location}</h5> */}
                          <ul className="distance">
                            <li>
                              <i className="ri-map-pin-fill icon" />{" "}
                              {item?.distance} Miles
                            </li>
                            {item?.mincookduration && (
                            <li>
                              <i className="ri-time-fill icon" />{" "}
                              {item?.mincookduration}
                            </li>
                     )}

                          </ul>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}

              {/* <div className="col-xl-3 col-lg-4 col-sm-6">
            <div className="vertical-product-box">
              <div className="vertical-product-box-img">
                <Link href="restaurant-details.html">
                  <img
                    className="vertical-product-img-top w-100 bg-img"
                    src="assets/images/product/vp-2.png"
                    alt="vp-2"
                  />
                </Link>
                <div className="offers">
                  <h6>upto £2</h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <h4>50% OFF</h4>
                    <div className="seller-badge">
                      <img
                        className="img-fluid badge"
                        src="assets/images/svg/medal-fill.svg"
                        alt="medal"
                      />
                      <h6>Best Seller</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="vertical-product-body">
                <div className="d-flex align-items-center justify-content-between mt-sm-3 mt-2">
                  <Link href="restaurant-details.html">
                    <h4 className="vertical-product-title">Ribeye Junction</h4>
                  </Link>
                  <h6 className="rating-star">
                    <span className="star">
                      <i className="ri-star-s-fill" />
                    </span>
                    3.2
                  </h6>
                </div>
                <h5 className="product-items">
                  Chicken quesadilla, avocado....
                </h5>
                <div className="location-distance d-flex align-items-center justify-content-between pt-sm-3 pt-2">
                  <h5 className="place">California</h5>
                  <ul className="distance">
                    <li>
                      <i className="ri-map-pin-fill icon" /> 1 km
                    </li>
                    <li>
                      <i className="ri-time-fill icon" /> 10 min
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* popular restaurant section end */}
      {/* footer section starts */}
      <Footer/>
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
      {/* tap to top start */}
      <button className="scroll scroll-to-top menu-page">
        <i className="ri-arrow-up-s-line arrow" />
      </button>
      {/* tap to top end */}
      {/* bootstrap js */}
      {/* swiper js */}
      {/* footer accordion js */}
      {/* menu button js */}
      {/* fancybox js */}
      {/* toast js */}
      {/* script js */}
    </>
  );
};

export default Restaurantlist;
