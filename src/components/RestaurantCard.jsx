import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { addFav } from "../utils/api";
import Swal from "sweetalert2";
import { getRestaurant } from "../store/feature/restaurantSlice";
import defaults from "../assets/128px-DefaultImage.png";
import { useSelector } from "react-redux";

const RestaurantCard = ({ item }) => {
  // console.log(item.imagename,"itmessss");
  const navigate = useNavigate();
  const activeTab = useSelector((store) => store.User.activeTab);
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [fav, setFav] = useState([]);
  const [Favres, setFavres] = useState("");
  useEffect(() => {
    if (item) {
      setFavres(item.pkid);
      setFav(item.isfav);
    }
  }, [item]);

  // const favrite = async () => {
  //   const data = {
  //     custid: storedUser?.userid,
  //     restid: Favres,
  //     isfav: fav == "1" ? "0" : "1"
  //   }
  //   const response = await addFav(data);
  //   if (response?.status == "1") {
  //     getRestaurant()
  //   }
  //   console.log(response, "check fav dat")
  // }

  const favrite = async () => {
    if (!storedUser?.userid) {
      // Show SweetAlert dialog
      Swal.fire({
        title: "Login Required",
        text: "Please log in to add favorites.",
        icon: "warning",
        confirmButtonText: "Go to Login",
        confirmButtonColor: "rgb(232, 65, 53)",
        showCancelButton: true,
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    const data = {
      custid: storedUser?.userid,
      restid: Favres,
      isfav: fav === "1" ? "0" : "1", // Toggle the favorite status
    };

    const response = await addFav(data);
    if (response?.status === "1") {
      // Update the local state to reflect the new favorite status immediately
      setFav(data.isfav);
      getRestaurant(); // Optionally refetch restaurants if needed
    }
  };
  const imageSrc =
    item?.imagename === "PhotoNotSelected.png" || !item?.imagename
      ? defaults
      : `https://partnermeatwala.com/documents/${item.imagename}`;
  return (
    <div className="swiper-slide">
      <div className="vertical-product-box product-style-2">
        <div className="vertical-product-box-img">
          {/* <Link href="menu-listing.html"> */}
            <Link
            to={
              item?.isonline === "1"
                ? `/store/${item?.pkid}`
                : `/store/${item?.pkid}`
            }
            state={{ restaurant: item }}
          >
            <img
              className={`product-img-top w-100 bg-img bg-size fix-image-size ${
                item?.isonline === "1" ? "" : "grayscale-img"
              }`}
              src={imageSrc}
              alt="Product"
            />
          </Link>
          <button className="wishlist-close" onClick={favrite}>
            {fav === "1" ? (
              <i
                className="fa fa-heart"
                style={{ fontSize: 16, color: "red" }}
              />
            ) : (
              <CiHeart />
            )}
          </button>

          {item?.isonline === "1" ? (
            ""
          ) : (
            <div className="closed-banner text-center">
              <h4 className="text-white">Not Taking Orders</h4>
            </div>
          )}
          {/* </Link> */}
        </div>
        <Link
          to={
            item?.isonline === "1"
              ? `/store/${item?.pkid}`
              : `/store/${item?.pkid}`
          }
          state={{ restaurant: item }}
        >
          <div className="vertical-product-body">
            <div className="brand-label" style={{ borderRadius: "0px" }}>
              <img
                src={`https://partnermeatwala.com/documents/${item?.logo}`}
                className="img-fluid"
                alt="brand"
                style={{ borderRadius: "0px" }}
              />
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <Link
                to={
                  item?.isonline === "1"
                    ? `/store/${item?.pkid}`
                    : `/store/${item?.pkid}`
                }
                state={{ restaurant: item }}
              >
                <h4 className="vertical-product-title">{item?.name}</h4>
              </Link>
              <h6 className="rating-star">
                {/* <span className="star">
                  <i className="ri-star-s-fill" />
                </span>
                {item?.hyginerating} */}
                <span className="">
                  <i className="ri-star-s-fill text-warning" />
                </span>{" "}
                {parseFloat(item?.totalreview.split(" ")[0]).toFixed(1)}
              </h6>
            </div>
            <h6 className="food-items">
              {`${item.cat1 ? item.cat1 : "ㅤ"}${
                item.cat2 ? " • " + item.cat2 : ""
              }${item.cat3 ? " • " + item.cat3 : ""}`}
            </h6>
            {/* <i className="fa fa-circle ml-2 me-2" aria-hidden="true" /> */}
            <ul className="details-list">
              <li>
                <i className="ri-map-pin-fill theme-color" /> {item?.distance}{" "}
                Miles
              </li>
              {item?.mincookduration && activeTab === "Delivery" && (
                <li>
                  <i className="ri-time-line" /> {item?.mincookduration}
                </li>
              )}
            </ul>
            <ul className="marquee-discount">
              {item?.value && item?.couponnanme && (
                <li className="discount-info">
                  <i className="ri-discount-percent-fill theme-color" />
                  Upto{" "}
                  {item.discounttype === "Amount"
                    ? `£ ${item.value}`
                    : `${item.value}%`}{" "}
                  off | Code {item.couponnanme}
                </li>
              )}
            </ul>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default RestaurantCard;
