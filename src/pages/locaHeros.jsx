import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";

import {getRestaurant} from "../store/feature/restaurantSlice";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FooterMobileMenu from '../components/FooterMobileMenu';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import RestaurantCard from "../components/RestaurantCard";


const Dining = () => {

const navigate = useNavigate()
const storedAddress = JSON.parse(localStorage.getItem("userAddress"));
const storedUser = JSON.parse(localStorage.getItem("user"));
const dispatch = useDispatch();
const { restaurant } = useSelector((store) => store.restaurant);
const storedPincode = JSON.parse(localStorage.getItem("pincode")) || "";
const pincode = storedPincode ? storedPincode.longName : "";
useEffect(() => {
  if (storedAddress ) {
    
    const dataforHome = {
      page: "1",
      lat: storedAddress?.lat || "51.5072",
      lng: storedAddress?.lng || "-0.1275",

      istakeway: "0",
      pincode:pincode.toString() ,
      sort: "0",
      userid: storedUser?.userid || "20",
      // pincode: "4430008",
    };
  // console.log("storedAddress",data);
  dispatch(getRestaurant(dataforHome));
}

}, []);

const handleredirect = ()=>{
            const id =1

        navigate(`/bookatablehighwycombe/${id}`)
}

  return (
    <div>
    <>
      {/* Header section start */}
     <Navbar />
      {/* Header Section end */}

      {/* home section start */}
      <div className='most-favourited-page'>
      <section className="page-head-section">
 
  </section>
  </div>
      {/* home section end */}
      {/* categories section starts */}
      {/* categories section end */}
      {/* Featured Restaurants section starts */}
      <section className="restaurant-list ratio3_2">
  <div className="container">
    <div className="popular-restaurant section-md-t-space ratio3_2">
      <div className="title title-sm mt-0">
        <h2>Most Favourited Places</h2>
        <div className="loader-line" />
      </div>
      <div className="grid-container">
        {
          restaurant?.map((item) => (
            <RestaurantCard key={item.pkid} item={item} getFavorite={getRestaurant} />
          ))
        }
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
      }
    */}
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
      <Footer/>
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
  )
}

export default Dining