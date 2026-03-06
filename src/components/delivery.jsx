import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeliveryB from "../assets/deliveryboy.png";
import { setActiveTab } from "../store/feature/userSlice";
import { useDispatch, useSelector } from "react-redux";
const Delivery = ({ text, className }) => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.User.activeTab);

  const handleTabClick = (tab) => {

    dispatch(setActiveTab(tab));
  };

  return (
    <>
      {(text =="cart" || text =="search") && (
        
        <div className="container text-center ">
          <div className="tab">
            <div>
              <Link
                className={`tablinks ${
                  activeTab === "Delivery" ? "active" : ""
                }`}
                onClick={() => handleTabClick("Delivery")}
              >
                <img
                  src={DeliveryB}
                  style={{ width: "15px", marginRight: "2px" }}
                />{" "}
                Delivery <p className="smtext">45-60 Min</p>
              </Link>
              <Link
                className={`tablinks ${
                  activeTab === "Collection" ? "active" : ""
                }`}
                onClick={() => handleTabClick("Collection")}
              >
                <i className="fa fa-shopping-bag" aria-hidden="true" />{" "}
                Collection
                <p className="smtext">15 - 25 Min</p>
              </Link>
            </div>
          </div>
        </div>
      
      )} 
    </>
  );
};

export default Delivery;
