import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from "react-redux";

import {getDining} from "../store/feature/restaurantSlice";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FooterMobileMenu from '../components/FooterMobileMenu';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import restImage from '../assets/diningBackground.jpg'
import { CirclesWithBar } from 'react-loader-spinner';

const Dining = () => {
const [isLoading, setIsLoading] = useState(true);

const navigate = useNavigate()
const storedAddress = JSON.parse(localStorage.getItem("userAddress"));
const user = JSON.parse(localStorage.getItem("user"));
const dispatch = useDispatch();
const { diningRestaurant } = useSelector((store) => store.restaurant);
const storedPincode = JSON.parse(localStorage.getItem("pincode")) || "";
const pincode = storedPincode ? storedPincode.longName : "HP12";
useEffect(() => {
  if (storedAddress ) {
    
 const data = {
     page:"1",
    lat: storedAddress.lat,
    lng: storedAddress.lng,
    pincode:pincode.toString(),
    userid:user?.userid
  };
  // console.log("storedAddress",data);
  dispatch(getDining(data));
}

}, []);

const handleredirect = (id) => {
  navigate(`/bookatablehighwycombe/${id}`);
};
useEffect(() => {
  setTimeout(() => {
    setIsLoading(false);
  }, 1000); // Simulate loading for 3 seconds
}, []);

  return (
<>
  {/* Header section start */}
<Navbar/>
  {/* Header Section end */}
  <section className="section-t-space mytabb overflow-hidden pt-120">
    <div className="container text-center">
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
    </div>
  </section>
  {/* page head section starts */}
  <section
  className="page-head-section"
  style={{
    position: 'relative',
    padding: '145px 0px 100px 0px',
    backgroundColor: '#00000085',
    backgroundImage: `url(${restImage})`,
    // backgroundPosition: 'top',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }}
>

  {/* <div className="container page-heading">
      <h2 className="h3 mb-3 text-white text-center">Dining</h2>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb flex-lg-nowrap justify-content-center justify-content-lg-star">
          <li className="breadcrumb-item">
            <Link href="index.html">
              <i className="ri-home-line" />
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Dining
          </li>
        </ol>
      </nav>
    </div> */}
  </section>
  {/* page head section end */}
  {/* popular restaurant section starts */}
  <section className="intro-text section-a-space">
  <div className="container d-flex flex-column align-items-center text-center">
  {/* <div className="title restaurant-title pb-0 w-border">
  </div> */}
  <p>
    <h2 className='mb-4 mt-4'>Discover The Best Restaurants in High Wycombe!</h2>
    We bring you an innovative dining experience
   that not only connects you with top local eateries
   but also helps restaurants f-<strong>he Early Bird Deal,
   you can save up to 25% on your food bill when 
   you book early</strong>. It’s a win-win for foodies and 
   restaurants alike! Whether you’re planning a casual meal
   or a special dinner, High Wycombe Bites makes it easy to
   reserve a table while enjoying exclusive discounts. Support local
   businesses, explore new flavors, and be part of strengthening our community through smarter dining choices
   </p>
</div>

</section>

<section className="restaurant-list section-b-space ratio3_2 pt-0">
  <div className="container">
    {/* <div className="title restaurant-title pb-0 w-border ">
      <h2>Dining</h2>
    </div> */}
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
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
            wrapperClass="loader-wrapper"
            visible={isLoading}  // Ensure this is true when loading
          />
          ) : (
    <div className="tab-content restaurant-content" id="TabContent">
      <div className="row">
        {diningRestaurant?.restdata?.map((item, i) => (
          <div key={i} className="col-xl-3 col-lg-4 col-sm-6" onClick={() => handleredirect(item.pkid)}>
            <div className="vertical-product-box">
              <div className="vertical-product-box-img">
                <img
                  className={`vertical-product-img-top w-100 bg-img ${item?.isonline === "1" ? "" : "grayscale-img"}`}
                  src={`https://partnermeatwala.com/documents/${item?.imagename}`}
                  alt="vp-7"
                />
                {item?.isonline === "1" ? "" : 
                  <div className="closed-banner text-center">
                    <h4 className="text-white">Not Taking Orders</h4>
                  </div>
                }
                <div className="offers">
                  <h6>Minimum order £{item?.minimumorder}</h6>
                </div>
              </div>
              <div className="vertical-product-body">
                <div className="d-flex align-items-center justify-content-between mt-sm-3 mt-2">
                  <h4 className="vertical-product-title">{item?.name}</h4>
                  <h6 className="rating-star">
                    <span className="star">
                      <i className="ri-star-s-fill" />
                    </span>
                    {item?.totalreview}
                  </h6>
                </div>
                <h6 className="food-items">
                  <span>{item?.cat1}</span>
                  <i className="fa fa-circle ml-2 me-2" aria-hidden="true" />
                  <span>{item?.cat2}</span>
                  <i className="fa fa-circle ml-2 me-2" aria-hidden="true" />
                  <span>{item?.cat3}</span>
                </h6>
                <ul className="details-list">
                  {item?.mincookduration && (
                    <li>
                      <i className="ri-map-pin-fill theme-color" /> {item?.mincookduration}
                    </li>
                  )}
                </ul>
                <div className="location-distance d-flex align-items-center justify-content-between pt-sm-3 pt-2">
                  <button className="btn theme-btn w-100" onClick={() => handleredirect(item.pkid)}>
                    Book Table
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
          )}
  </div>
</section>




  {/* popular restaurant section end */}
  {/* footer section starts */}
  <Footer/>
  {/* footer section end */}
  {/* mobile fix menu start */}
  <FooterMobileMenu selected={"Dining"} />
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

export default Dining