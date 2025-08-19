import React, { useEffect, useState, useCallback } from "react";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getCategorylist,
  getDining,
  getOfferRest,
  getRestaurant,
  getTopRest,
} from "../store/feature/restaurantSlice";
import Navbar from "../components/Navbar";
import RestaurantCard from "../components/RestaurantCard";
import Footer from "../components/Footer";
import FooterMobileMenu from "../components/FooterMobileMenu";
import restImage from "../assets/backimage.jpg"

const Dining = () => {
  const storedUser = JSON.parse(localStorage.getItem("user")) || "";
  const storedAddress = JSON.parse(localStorage.getItem("userAddress")) || "";
  const location = useLocation();
  const { data } = location.state || {};


  const dispatch = useDispatch();
  const { restaurant, diningRestaurant } = useSelector(
    (store) => store.restaurant
  );
  const { userAddress } = useSelector((store) => store.User);
  const storedPincodes = JSON.parse(localStorage.getItem("pincode")) || "";
  const pincodes = storedPincodes ? storedPincodes.longName : "HP12";

  useEffect(() => {
    // if (storedAddress ) {
    const dataforHome = {
      page: "1",
      lat: storedAddress?.lat || "51.5072",
      lng: storedAddress?.lng || "-0.1275",

      istakeway: "0",
      pincode: pincodes.toString(),
      sort: "0",
      userid: storedUser?.userid || "",
      // pincode: "4430008",
    };
    dispatch(getRestaurant(dataforHome));
    const data = {
      page: "1",
      pincode: pincodes.toString(),
      lat: storedAddress?.lat || "51.5072",
      lng: storedAddress?.lng || "-0.1275",
      userid: storedUser?.userid,
    };
    dispatch(getDining(data));
    dispatch(getTopRest(data));
    dispatch(getOfferRest(data));
    const catData = {
      sortingtype: "1",
    };
    dispatch(getCategorylist(catData));
    // }
  }, [userAddress]);

  useEffect(() => {
    // console.log("restaurant", restaurant);
    // console.log("diningRestaurant", diningRestaurant);
    // console.log("topRestaurant", topRestaurant);
    // console.log("offeredRestaurant", offeredRestaurant);
  }, [restaurant, diningRestaurant]);

  return (
    <div>
      <>
        {/* Header section start */}
        <Navbar />
        {/* Header Section end */}

        {/* home section start */}
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
              All Stores
            </h2>
          </div>
        </section>
        <section className="restaurant-list ratio3_2">
          <div className="container">
            <div className="popular-restaurant section-md-t-space ratio3_2">
              <div className="title title-sm mt-0">
                <h2>All Stores</h2>
                <div className="loader-line" />
              </div>
              <div className="grid-container">
                {data?.map((item) => (
                  <RestaurantCard key={item.pkid} item={item} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* featured Restaurants section end */}
        {/* {
        diningRestaurant?.restdata?.length > 0 ?
        <RestaurantCategory data={diningRestaurant?.restdata} text={'All Restaurants '} num={"2"}/>
        :""
      }
      
      {
        topRestaurant?.toprestaurant ?
        <RestaurantCategory data={topRestaurant?.toprestaurant} text={'Family Meal Deals '} num={"7"}/>
        :""
      } */}

        {/* app section starts */}
        {/* <section className="app-section section-b-space">
        <div className="container">
          <div className="d-flex align-items-center">
            <div className="app-img">
              <img
                className="img-fluid phone"
                src="/assets/images/service-phone.png"
                alt="app-phone"
              />
            </div>
            <div className="app-content">
              <h2>Food Delivery App : Online &amp; Mobile Ordering</h2>
              <h5>
                Get the app for free and place takeout orders online whenever
                you want.
              </h5>
              <div className="app-buttons d-flex align-items-center gap-3">
                <Link href="https://www.apple.com/in/app-store/">
                  <img
                    className="img-fluid app-btn"
                    src="assets/images/svg/app-store.svg"
                    alt="app-store"
                  />
                </Link>
                <Link href="https://play.google.com/store/apps">
                  <img
                    className="img-fluid app-btn"
                    src="assets/images/svg/google-play.svg"
                    alt="google-play"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section> */}
        {/* app section end */}
        {/* footer section starts */}
        <Footer />
        {/* footer section end */}
        {/* mobile fix menu start */}
        <FooterMobileMenu selected={"home"} />
        {/* mobile fix menu end */}
        {/* location offcanvas start */}

        {/* location offcanvas end */}
        {/* tap to top start */}
        <button className="scroll scroll-to-top">
          <i className="ri-arrow-up-s-line arrow" />
        </button>
        {/* tap to top end */}
      </>
    </div>
  );
};

export default Dining;
