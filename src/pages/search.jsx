import React, { useEffect, useState } from "react";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getCategorylist } from "../store/feature/restaurantSlice";
import RestaurantCategory from "../components/RestaurantCategory";
import Footer from "../components/Footer";
import FooterMobileMenu from "../components/FooterMobileMenu";
import Delivery from "../components/delivery";
import { Link } from "react-router-dom";
import CategoryFoods from "../components/CategoryFoods";
import restImage from "../assets/backimage.jpg";
import { CirclesWithBar } from "react-loader-spinner";
import { search } from "../utils/api";
import CookieConsent from "../components/Cookie";
import { setActiveTab } from "../store/feature/userSlice";
import MobileViewAppDownload from "../components/MobileViewAppDownload";
import TopCategoryStore from "../components/TopCategoryStore";
import { Helmet } from "react-helmet-async";

const Offers = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const activeTab = useSelector((store) => store.User.activeTab);
  const userid = user?.userid || "";

  const [isLoading, setIsLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);

  // Retrieve userAddress and pincode from local storage
  const userAddress = JSON.parse(localStorage.getItem("userAddress")) || {};
  const pincode = JSON.parse(localStorage.getItem("pincode")) || {};

  // Set lat, lng, and pincode from local storage values
  const lat = userAddress?.lat || "";
  const lng = userAddress?.lng || "";
  const postcode = pincode?.longName || "";

  useEffect(() => {
    new Swiper(".swiper-food", {
      modules: [Navigation, Pagination],
      navigation: {
        nextEl: ".next-rest-1",
        prevEl: ".prev-rest-1",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      slidesPerView: 3,
      spaceBetween: 10,
      breakpoints: {
        576: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 6,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 7,
          spaceBetween: 10,
        },
      },
    });
  }, []);

  useEffect(() => {
    new Swiper(".swiper-d", {
      modules: [Navigation, Pagination],
      navigation: {
        nextEl: ".popular-next",
        prevEl: ".popular-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      slidesPerView: 1,
      spaceBetween: 10,
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 15,
        },
      },
    });
  }, []);

  const dispatch = useDispatch();
  const { categorylist } = useSelector((store) => store.restaurant);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const catData = {
      sortingtype: "1",
    };
    dispatch(getCategorylist(catData));
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const isdelivery = activeTab === "Delivery" ? "1" : "0";
  const istakeway = activeTab === "Collection" ? "1" : "0";

  const payload = {
    lat: String(lat),
    lng: String(lng),
    pincode: String(postcode),
    userid: userid,
    isdelivery: isdelivery,
    istakeway: istakeway,
  };

  // Fetch data from API
  const fetchRestaurants = async () => {
    try {
      const response = await search(payload);
      if (response?.status === "1" && response?.searchrestauarant) {
        setRestaurants(response.searchrestauarant);
      } else {
        console.log(response, "No restaurants found.");
      }
    } catch (err) {
      console.log(err, "errors");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, [lat, lng, postcode, activeTab]);

  return (
    <>
      <Helmet>
        <title>Order Halal Meat Online – Fresh Cuts from Local Butchers</title>
        <meta
          name="description"
          content="Buy fresh halal meat online from trusted local halal butchers. Choose home delivery or collection for high-quality halal meat near you!"
        />
      </Helmet>
      <Navbar text={"search"} />
      <section className="section-t-space mytabb overflow-hidden">
        <Delivery />
      </section>

      <section
        className="page-head-section"
        style={{
          position: "relative",
          padding: "100px 0px 100px 0px",
          backgroundColor: "#00000085",
          backgroundImage: `url(${restImage})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="container page-heading">
          <h2
            className="h3 mb-3 text-white text-center"
            style={{ display: "none" }}
          >
            All Restaurant
          </h2>
        </div>
      </section>
      {isLoading ? (
        <CirclesWithBar
          height="100"
          width="100"
          color="rgb(232, 65, 53)"
          outerCircleColor="rgb(232, 65, 53)"
          innerCircleColor="rgb(232, 65, 53)"
          barColor="rgb(232, 65, 53)"
          ariaLabel="circles-with-bar-loading"
          wrapperStyle={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
          wrapperClass="loader-wrapper"
          visible={isLoading}
        />
      ) : (
        <>
          <CategoryFoods data={categorylist} text={"Shop By Category"} />
          {/* {restaurants ? (
            <TopCategoryStore
              data={restaurants}
              text={"Top Rated Stores"}
              num={"7"}
            />
          ) : (
            ""
          )} */}
          {restaurants && restaurants.length > 0 ? (
            <RestaurantCategory
              data={restaurants}
              text={"All Stores"}
              num={"7"}
            />
          ) : (
            <div className="no-store-message text-center p-5">
              <h3 style={{ color: "rgb(232, 65, 53)" }}>Coming Soon!</h3>
              <p>We’re not in your area yet, but launching soon. Stay tuned!</p>
            </div>
          )}
        </>
      )}

      <Footer />
      <FooterMobileMenu />
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
      <button className="scroll scroll-to-top">
        <i className="ri-arrow-up-s-line arrow" />
      </button>
      <CookieConsent />
    </>
  );
};

export default Offers;
