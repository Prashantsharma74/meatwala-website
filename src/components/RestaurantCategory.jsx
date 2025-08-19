import React, { useEffect } from "react";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import RestaurantCard from "./RestaurantCard";
import { Link, useNavigate } from "react-router-dom";
const RestaurantCategory = ({ num, text, data }) => {

  useEffect(() => {
    new Swiper(`.swiper-rest-${num}`, {
      modules: [Navigation, Pagination],
      navigation: {
        nextEl: `.next-rest-${num}`,
        prevEl: `.prev-rest-${num}`,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      slidesPerView: 1.5,
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
  // console.log("data",data);
  const navigate = useNavigate();

  const handleNavigation = () => {
    // if (text === "Family Meal Deals") {
    //   navigate("/offers");
    // } else {
    navigate("/all-restaurant", { state: { data: data } });
    // }
  };
  return (
    <div className="restaurant-list  ratio3_2">
      <div className="container">
        <div className="popular-restaurant section-md-t-space ratio3_2">
          <div className="title title-sm mt-0">
            <h2>{text}</h2>
            <div className="loader-line" />
          </div>
          <div className="theme-arrow">
            <div className={`swiper swiper-rest-${num} popular-slider`}>
              <div className="swiper-wrapper">
                {data?.map((item) => (
                  <RestaurantCard key={item.pkid} item={item} />
                ))}
              </div>
            </div>
            <div
              className={`swiper-button-next popular-next next-rest-${num}`}
              style={{
                display: "block",
                width: "40px", // Set the size of the button
                height: "40px", // Equal width and height for a circle
                borderRadius: "50%", // Makes it circular
                display: "flex", // Centers the content inside
                alignItems: "center", // Centers the content vertically
                justifyContent: "center", // Centers the content horizontally
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Optional shadow for better visuals
                cursor: "pointer", // Makes it clickable
              }}
            />
            <div
              className={`swiper-button-prev popular-prev prev-rest-${num}`}
              style={{
                display: "block",
                width: "40px", // Set the size of the button
                height: "40px", // Equal width and height for a circle
                borderRadius: "50%", // Makes it circular
                display: "flex", // Centers the content inside
                alignItems: "center", // Centers the content vertically
                justifyContent: "center", // Centers the content horizontally
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Optional shadow for better visuals
                cursor: "pointer", // Makes it clickable
              }}
            />
          </div>
        </div>
        <div
          style={{
            textAlign: "right",
            marginTop: "25px",
            marginBottom: "25px",
          }}
        >
          <button
            onClick={handleNavigation}
            className="btn hover-effect theme-btn"
          >
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCategory;
