import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FooterMobileMenu from '../components/FooterMobileMenu';
const Toprestaurant = () => {

    const [restaurants, setRestaurants] = useState([]);
  
    useEffect(() => {
      const fetchRestaurants = async () => {
        try {
            const response = await axios.post('https://partnermeatwala.com/api/customer/gettoprestaurantforcust', {
                lat: "21.0980572",
                lng: "79.0667197",
                pincode: "4430008"
              }, {
                headers: {
                  'Content-Type': 'application/json'
                }
              });
              const data = response.data;
          if (data.status === "1") {
            setRestaurants(data.toprestaurant);
          } else {
            console.error('Error fetching restaurants:', data.returnmsg);
          }
        } catch (error) {
          console.error('Error fetching restaurants:', error);
        }
      };
  
      fetchRestaurants();
    }, []);
  return (
<>
  {/* Header section start */}
 <Navbar/>
  {/* Header Section end */}

  {/* page head section starts */}
  <section className="page-head-section">
    <div className="container page-heading">
      <h2 className="h3 mb-3 text-white text-center">Top Restaurants</h2>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb flex-lg-nowrap justify-content-center justify-content-lg-star">
          <li className="breadcrumb-item">
            <Link href="index.html">
              <i className="ri-home-line" />
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Top Restaurants
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
        <h2>Top 5 Restaurants</h2>
      </div>
      <div className="tab-content restaurant-content" id="TabContent">
        <div className="row justify-content-center g-lg-4 g-3">
        {restaurants.map((restaurant, index) => (
                  <div className="col-xl-4 col-lg-4 col-sm-6" key={index}>
                    <div className="vertical-product-box">
                      <div className="vertical-product-box-img">
                        <Link to={`restaurant-details.html?id=${restaurant.pkid}`}>
                          <img
                            className="product-img-top w-100 bg-img"
                            src={`https://partnermeatwala.com/documents/${restaurant.imagename}`}
                            // src={restaurant.imagename ? `assets/images/${restaurant.imagename}`:"assets/images/product/vp-1.png"}
                            alt={restaurant.name}
                          />
                        </Link>
                        <div className="offers">
                          <h6>upto {restaurant.offer || 'N/A'}</h6>
                          <div className="d-flex align-items-center justify-content-between">
                            <h4>{restaurant.discount || 'N/A'}% OFF</h4>
                            {restaurant.bestSeller && (
                              <div className="seller-badge">
                                <img
                                  className="img-fluid badge"
                                  src="assets/images/svg/medal-fill.svg"
                                  alt="medal"
                                />
                                <h6>Best Seller</h6>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="vertical-product-body">
                        <div className="d-flex align-items-center justify-content-between mt-sm-3 mt-2">
                          <Link to={`restaurant-details.html?id=${restaurant.pkid}`}>
                            <h4 className="vertical-product-title">{restaurant.name}</h4>
                          </Link>
                          <h6 className="rating-star">
                            <span className="star">
                              <i className="ri-star-s-fill" />
                            </span>
                            {restaurant.hyginerating || 'N/A'}
                          </h6>
                        </div>
                        <h6 className="food-items">
                          {[restaurant.cat1, restaurant.cat2].filter(Boolean).map((cuisine, idx) => (
                            <React.Fragment key={idx}>
                              <span>{cuisine}</span>
                              {idx < [restaurant.cat1, restaurant.cat2].filter(Boolean).length - 1 && (
                                <i className="fa fa-circle ml-2 me-2" aria-hidden="true" />
                              )}
                            </React.Fragment>
                          ))}
                        </h6>
                        <div className="location-distance d-flex align-items-center justify-content-between pt-sm-3 pt-2">
                          <h5 className="place">{restaurant.location}</h5>
                          <ul className="distance">
                            <li>
                              <i className="ri-map-pin-fill icon" /> {restaurant.distance} Miles
                            </li>
                            <li>
                              <i className="ri-time-fill icon" /> {restaurant.mincookduration}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          <div className="col-xl-4 col-lg-4 col-sm-6">
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
                <h6 className="food-items">
                  <span>Italian</span>
                  <i className="fa fa-circle ml-2 me-2" aria-hidden="true" />
                  <span>Dips</span>
                  <i className="fa fa-circle ml-2 me-2" aria-hidden="true" />
                  <span>Deserts</span>
                </h6>
                <div className="location-distance d-flex align-items-center justify-content-between pt-sm-3 pt-2">
                  <h5 className="place">California</h5>
                  <ul className="distance">
                    <li>
                      <i className="ri-map-pin-fill icon" /> 1 Miles
                    </li>
                    <li>
                      <i className="ri-time-fill icon" /> 10 min
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-sm-6">
            <div className="vertical-product-box">
              <div className="vertical-product-box-img">
                <Link href="restaurant-details.html">
                  <img
                    className="product-img-top w-100 bg-img"
                    src="assets/images/product/vp-3.png"
                    alt="vp3"
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
                <h6 className="food-items">
                  <span>Italian</span>
                  <i className="fa fa-circle ml-2 me-2" aria-hidden="true" />
                  <span>Dips</span>
                  <i className="fa fa-circle ml-2 me-2" aria-hidden="true" />
                  <span>Deserts</span>
                </h6>
                <div className="location-distance d-flex align-items-center justify-content-between pt-sm-3 pt-2">
                  <h5 className="place">New York</h5>
                  <ul className="distance">
                    <li>
                      <i className="ri-map-pin-fill icon" /> 5 Miles
                    </li>
                    <li>
                      <i className="ri-time-fill icon" /> 40 min
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-sm-6">
            <div className="vertical-product-box">
              <div className="vertical-product-box-img">
                <Link href="restaurant-details.html">
                  <img
                    className="product-img-top w-100 bg-img"
                    src="assets/images/product/vp-4.png"
                    alt="vp-4"
                  />
                </Link>
              </div>
              <div className="vertical-product-body">
                <div className="d-flex align-items-center justify-content-between mt-sm-3 mt-2">
                  <Link href="restaurant-details.html">
                    <h4 className="vertical-product-title">Cozy Cuppa Cafe</h4>
                  </Link>
                  <h6 className="rating-star">
                    <span className="star">
                      <i className="ri-star-s-fill" />
                    </span>
                    3.6
                  </h6>
                </div>
                <h6 className="food-items">
                  <span>Italian</span>
                  <i className="fa fa-circle ml-2 me-2" aria-hidden="true" />
                  <span>Dips</span>
                  <i className="fa fa-circle ml-2 me-2" aria-hidden="true" />
                  <span>Deserts</span>
                </h6>
                <div className="location-distance d-flex align-items-center justify-content-between pt-sm-3 pt-2">
                  <h5 className="place">Dallas</h5>
                  <ul className="distance">
                    <li>
                      <i className="ri-map-pin-fill icon" /> 4 Miles
                    </li>
                    <li>
                      <i className="ri-time-fill icon" /> 30 min
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-sm-6">
            <div className="vertical-product-box">
              <div className="vertical-product-box-img">
                <Link href="restaurant-details.html">
                  <img
                    className="product-img-top w-100 bg-img"
                    src="assets/images/product/vp-5.png"
                    alt="vp-5"
                  />
                </Link>
              </div>
              <div className="vertical-product-body">
                <div className="d-flex align-items-center justify-content-between mt-sm-3 mt-2">
                  <Link href="restaurant-details.html">
                    <h4 className="vertical-product-title">Mocha Magic Cafe</h4>
                  </Link>
                  <h6 className="rating-star">
                    <span className="star">
                      <i className="ri-star-s-fill" />
                    </span>
                    3.2
                  </h6>
                </div>
                <h5 className="product-items">Chinese, Momos, Dumplings,...</h5>
                <div className="location-distance d-flex align-items-center justify-content-between pt-sm-3 pt-2">
                  <h5 className="place">Seattle</h5>
                  <ul className="distance">
                    <li>
                      <i className="ri-map-pin-fill icon" /> 1 Miles
                    </li>
                    <li>
                      <i className="ri-time-fill icon" /> 8 min
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* popular restaurant section end */}
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
  )
}

export default Toprestaurant