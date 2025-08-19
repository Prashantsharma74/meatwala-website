import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

const CategoryFoods = ({ data,text }) => {
  useEffect(() => {
    new Swiper(".swiper-allCats", {
      modules: [Navigation, Pagination],
      navigation: {
        nextEl: ".populars-next",
        prevEl: ".populars-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      slidesPerView: 4,
      spaceBetween: 10,
      breakpoints: {
        640: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 6,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 8,
          spaceBetween: 15,
        },
      },
    });
  }, []);

  
  return (
    <div className="categories-section">
      <div className="container">
        <div className="position-relative category-top">
          <div className="title title-sm mt-0">
            <h2>{text}</h2>
            <div className="loader-line" />
          </div>
          <div className="theme-arrow" >

          <div className="swiper swiper-allCats categories-no-arrow categories-style">
            <div className="swiper-wrapper">
              {data?.categorylist?.map((item) => (
                <div key={item?.pkid} className="swiper-slide">
                  <Link 
                  to={`/category/${encodeURIComponent(item?.name.toLowerCase())}/${item?.pkid}`}
                  className="food-categories">
                  {item.image !== "PhotoNotSelected.png" ? (
                      <img
                        className="img-fluid categories-img"
                        src={`https://partnermeatwala.com/documents/${item.image}`}
                        alt="p-1"
                      />
                    ) : null}
                    <h4 className="dark-text" 
                    style={{
          textAlign: "center",
          whiteSpace: "normal",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "50px", // Consistent height for all text
          width: "100%",
          overflowWrap: "break-word",
        }}
                    >{item?.name}</h4>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="swiper-button-next populars-next popular-next" style={{ top: "-20px" }}></div>
<div className="swiper-button-prev popular-prev populars-prev" style={{ top: "-20px" }}></div>

          </div>
        </div>
        
      </div>
      
    </div>
  );
};

export default CategoryFoods;
