import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getRestaurantFood, search } from "../utils/api";
import Navbar from "../components/Navbar";
import FoodCategory from "../components/FoodCategory";
import Footer from "../components/Footer";
import FooterMobileMenu from "../components/FooterMobileMenu";
import Delivery from "../components/delivery";
import Map from "../components/Map";
import Cartcomponent from "../components/CartComponent";
import CartFloat from "../components/cartFloat";
import CategoriesAccordion from "../components/CategoryinRow";
import rating1 from "../assets/rating1.png";
import rating2 from "../assets/rating2.png";
import rating3 from "../assets/rating3.png";
import rating4 from "../assets/rating4.png";
import rating5 from "../assets/rating5.jpg";
import ReviewPopup from "../components/ReviewPopup";
import { useSelector } from "react-redux";
import { CirclesWithBar } from "react-loader-spinner";

const Restaurant = () => {
  const perems = useParams();
  const params = useParams(); // Get the ID from the URL
  const [restraDetail, setRestraDetail] = useState([]);
  const [restdata, setRestdata] = useState();
  const [time, setTime] = useState([]);
  const [foods, setFoods] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [payment, setPayment] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  // const [restraDetail , setRestraDetail] = useState()
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [milesOnly, setMilesOnly] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const activeTab = useSelector((store) => store.User.activeTab);
  const userid = user?.userid || "";
  const userAddress = JSON.parse(localStorage.getItem("userAddress")) || {};
  const pincode = JSON.parse(localStorage.getItem("pincode")) || {};

  // Set lat, lng, and pincode from local storage values
  const lat = userAddress?.lat || "";
  const lng = userAddress?.lng || "";
  const postcode = pincode?.longName || "";
  const isdelivery = activeTab === "Delivery" ? "1" : "0";
  const istakeway = activeTab === "Collection" ? "1" : "0";
const isMobile = window.innerWidth <= 768;
const containerStyle = {
  flexDirection: "column",
  ...(isMobile ? {} : { alignItems: "flex-end" }),
};
  // This is for geting miles only
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

        const matchingRestaurant = response.searchrestauarant.find(
          (rest) => rest.pkid === perems.id
        );

        if (matchingRestaurant) {

          setMilesOnly(matchingRestaurant);
        } else {
          console.log("No restaurant found with the given ID.");
        }
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

  const addToCart = (foodItem) => {
    setCart((prevCart) => [...prevCart, foodItem]);
  };

  const sendData = {
    // pincode: "4430008",
    restid: perems.id,
  };
  const getDetail = async () => {
    const res = await getRestaurantFood(sendData);
    setFoods(res?.restaurantmenulist);
    setRestraDetail(res?.restaurantdetails);
    if (res?.takeawytime) {
      setTime(res.takeawytime);
    }

    if (res?.restdata) {
      setRestdata(res?.restdata[0]);
    }
    setPayment(res.paymentmethod);
    setIsLoading(false);
  };

  useEffect(() => {
    getDetail();
  }, []);
  // search items

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };
  const filteredFoods = (foods || []).filter((category) =>
    category.items?.some((food) =>
      food.foodname.toLowerCase().includes(searchQuery)
    )
  );

  // end
  const [activeButton, setActiveButton] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".food-category-section");
      let currentCategory = null;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < 10 && rect.bottom > 10) {
          // Adjust the value to fine-tune based on your layout
          currentCategory = section.id;
        }
      });
      if (currentCategory) {
        setActiveCategory(currentCategory);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [filteredFoods]);

  const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return windowWidth;
  };

  const windowWidth = useWindowWidth();

  // Handle category click
  const handleCategoryClick = (category) => {
    setActiveCategory(category); // Update the active category on click

    const section = document.getElementById(category);
    if (section) {
      // Scroll to the clicked section smoothly
      window.scrollTo({
        top: section.offsetTop - 100, // Adjust the offset if you have a sticky navbar
        behavior: "smooth",
      });
    }
  };

  const categoryListRef = useRef(null);
  const [isManualScroll, setIsManualScroll] = useState(false);

  // Fallback for onCategoryClick if not provided
  const handleCategorysClick = (category) => {
    setIsManualScroll(true);
    if (handleCategoryClick) {
      handleCategoryClick(category);
    } else {
      console.warn(
        "onCategoryClick is not provided, active category won't be updated."
      );
    }
  };

  useEffect(() => {
    if (!isManualScroll && categoryListRef.current) {
      const activeIndex = filteredFoods.findIndex(
        (category) => category.category === activeCategory
      );

      if (activeIndex !== -1) {
        const activeItem = categoryListRef.current.children[activeIndex];
        const activeItemTop = activeItem.offsetTop; // Get the top offset
        const containerHeight = categoryListRef.current.clientHeight; // Get the height of the container
        const itemHeight = activeItem.clientHeight; // Get the height of the active item

        // Scroll to the active item vertically
        categoryListRef.current.scrollTo({
          top: activeItemTop - containerHeight / 2 + itemHeight / 2, // Adjust to center the active item
          behavior: "smooth",
        });
      }
    }
  }, [activeCategory, filteredFoods, isManualScroll]);

  useEffect(() => {
    if (isManualScroll) {
      const timer = setTimeout(() => setIsManualScroll(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isManualScroll]);

  // const toggleSection = (section) => {
  //   setIsOpen((prev) => {
  //     const newState = {
  //       legal: false,
  //       cuisine: false,
  //       partners: false,
  //       customerService: false,
  //     };
  //     newState[section] = true;
  //     return newState;
  //   });
  // };


const [showFullAbout, setShowFullAbout] = useState(false);
const MAX_LENGTH = 300;


const getTruncatedHTML = (html) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html || "";
  const plainText = tempDiv.textContent || tempDiv.innerText || "";

  if (!showFullAbout && plainText.length > MAX_LENGTH) {
    return plainText.substring(0, MAX_LENGTH) + "...";
  }

  return html;
};







  return (
    <>
      <Navbar isStatic={true} text={"res"} />
      <section
        className="section-t-space mytabb overflow-hidden "
        style={{ paddingTop: "26px", paddingBottom: "0px" }}
      >
        <Delivery />
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
        <div className="content" style={{ paddingTop: "0px" }}>
          <div className="parent-div">
            <div className="child1-div" style={{ width: "75%" }}>
              <div className="position-relative">
                <div>
                              {restdata?.imagename ? (
  <img
    className="child1-div-img"
    src={`https://partnermeatwala.com/documents/${restdata.imagename}`}
    // onLoad={() => setIsImageLoaded(true)}
    // onError={() => setIsImageLoaded(true)}
  />
) : <div className="child1-div-img" style={{backgroundColor: "gray", opacity: 0.2}}>
    <div className="loader"/>
  </div>}

                </div>
                <div className="restaurant-image">
                {restdata?.logo ? (
                  <img
                    className="img-fluid img "
                    src={`https://partnermeatwala.com/documents/${restdata?.logo}`}
                   
                  />
                ) : null}
                </div>
              </div>
              {/* banner section end */}
              <div className="pt-0">
                <div className="container">
                  <div className="row justify-content-center">
                    {/* <div className="restaurant-box"> */}
                    <div className="restaurant-details">
                      <div
                        className="d-flex justify-content-between flex-wrap gap-3"
                        style={{ paddingTop: "20px", paddingBottom: "15px" }}
                      >
                        <div>
                          <h2 className="restaurant-name">{restdata?.name}</h2>
                          {/* <p className="restaurant-place mt-2">
                  {restdata?.location}
                </p> */}
                          <h6 className="food-items">
                            {`${restdata?.cat1 ? restdata?.cat1 : "ㅤ"}${
                              restdata?.cat2 ? " • " + restdata?.cat2 : ""
                            }${restdata?.cat3 ? " • " + restdata?.cat3 : ""}`}
                          </h6>
                          {restdata?.isonline == "0" && (
                            <h6 className="food-items" style={{ color: "red" }}>
                              Not Taking Orders
                            </h6>
                          )}
                          {/* <ul className="details-list" style={{ display: 'flex', flexDirection: 'column' }}>
                            {restdata?.distance && (
                              <li>
                                <i className="ri-map-pin-fill theme-color" /> {restdata.distance}
                              </li>
                            )}
                          </ul> */}
                        </div>
                        <div className="restaurant-description">
                          <div
                            className="distance d-flex"
                            style={containerStyle}
                          >
                            <div className="d-flex" style={{ gap: "5px" }}>
                              <h4
                                className="rating-star"
                                style={{ fontSize: "14px" }}
                              >
                                <span>
                                  <i
                                    className="ri-time-fill"
                                    style={{ color: "lightgray" }}
                                  />
                                </span>{" "}
                                <span style={{ color: "rgb(116 116 116)" }}>
                                  {restdata?.mincookduration}
                                </span>
                              </h4>
                              <div
                                style={{
                                  width: "1px",
                                  height: "16px",
                                  backgroundColor: "#ccc",
                                }}
                              ></div>
                              <h4
                                className="rating-star"
                                style={{ fontSize: "14px" }}
                              >
                                <span>
                                  <i
                                    className="ri-map-pin-2-fill"
                                    style={{ color: "lightgray" }}
                                  />
                                </span>{" "}
                                <span style={{ color: "rgb(116 116 116)" }}>
                                  {milesOnly?.distance} miles
                                </span>
                              </h4>
                            </div>
                            {/* <h4
                              className="rating-star mt-2"
                              style={{ fontSize: "14px" }}
                            >
                              <span>
                                <i className="ri-star-s-fill text-warning" />
                              </span>{" "}
                              {restdata?.totalreview.split(" ")[0]}{" "}
                              <span style={{ color: "rgb(116 116 116)" }}>
                                ({restdata?.totalreview.split(" ")[1]} Reviews)
                              </span>
                            </h4> */}
                            <h4
                              className="rating-star mt-2"
                              style={{ fontSize: "14px", cursor: "pointer" }}
                              onClick={() => setShowReviewPopup(true)}
                            >
                              <span>
                                <i className="ri-star-s-fill text-warning" />
                              </span>{" "}
                              {restdata?.totalreview.split(" ")[0]}{" "}
                              <span style={{ color: "rgb(116 116 116)" }}>
                                ({restdata?.totalreview.split(" ")[1]} Reviews)
                              </span>
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {showReviewPopup && (
                <ReviewPopup
                  restdata={restdata}
                  onClose={() => setShowReviewPopup(false)}
                />
              )}
              <section className="tab-details-section">
                <div className="container">
                  <div className="blog-boxs">
                    <div className="row justify-content-center ">
                      <div className="col-lg-3 order-lg-0 order-1">
                        <div className="left-box wow fadeInUp">
                          <div className="shop-left-sidebar">
                            <div className="search-box">
                              <div className="form-input position-relative">
                                <input
                                  type="search"
                                  className="form-control search"
                                  id="search"
                                  placeholder="Search"
                                  value={searchQuery}
                                  onChange={handleSearch}
                                />
                                {/* <i className="ri-search-line search-icon" /> */}
                              </div>
                            </div>
                            <div
                              className="accordion sidebar-accordion"
                              id="accordionPanelsStayOpenExample"
                            >
                              <div className="accordion-item">
                                <div
                                  id="collapseOne"
                                  className="accordion-collapse collapse show"
                                  data-bs-parent="#accordionExample"
                                >
                                  <div className="accordion-body">
                                    <ul
                                      ref={categoryListRef}
                                      className="category-list custom-padding custom-height scroll-bar"
                                      id="myDIV"
                                    >
                                      {filteredFoods.map((category, i) => (
                                        <li
                                          className="btnn "
                                          key={i}
                                          style={{
                                            backgroundColor:
                                              activeCategory ===
                                              category.category
                                                ? "rgba(232, 65, 53, 0.38)"
                                                : "",
                                            border:
                                              activeCategory ===
                                              category.category
                                                ? "1px solid rgb(232, 65, 53)"
                                                : "",
                                            borderRadius:
                                              activeCategory ===
                                              category.category
                                                ? "10px"
                                                : "",
                                          }}
                                          onClick={() =>
                                            handleCategorysClick(
                                              category.category
                                            )
                                          }
                                        >
                                          <a href={`#${category.category}`}>
                                            <div className="form-check ps-0 m-0 category-list-box">
                                              <div className="form-check-label">
                                                <span className="name">
                                                  {category.category}
                                                </span>
                                              </div>
                                            </div>
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="col-lg-9 p-0"
                        style={{
                          boxShadow:
                            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                        }}
                      >
                        <ul
                          className="nav nav-tabs tab-style1"
                          id="myTab"
                          role="tablist"
                        >
                          <li className="nav-item" role="presentation">
                            <button
                              className={`nav-link ${
                                activeButton === 1 ? "active" : ""
                              }`}
                              id="order-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#online"
                              type="button"
                              role="tab"
                              onClick={() => setActiveButton(1)}
                            >
                              Menu
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              className={`nav-link ${
                                activeButton === 2 ? "active" : ""
                              }`}
                              id="overview-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#overview"
                              type="button"
                              role="tab"
                              onClick={() => setActiveButton(2)}
                            >
                              Information
                            </button>
                          </li>
                        </ul>

                        <div
                          className="tab-content product-details-content"
                          id="myTabContent"
                        >
                          <div
                            className={`tab-pane fade ${
                              activeButton === 1 ? "show active" : ""
                            }`}
                            id="online"
                            role="tabpanel"
                            tabIndex={0}
                          >
                            <div className="row ">
                              <div className="col-lg-12">
                                <div className="product-box-section section-b-space">
                                  <div
                                    data-bs-spy="scroll"
                                    data-bs-target="#navbar"
                                    data-bs-smooth-scroll="true"
                                    className="scrollspy-example-2"
                                    tabIndex={0}
                                  >
                                    <div className="product-details-box-list">
                                      {filteredFoods.map((category, i) => (
                                        <FoodCategory
                                          key={i}
                                          item={category}
                                          restId={perems?.id}
                                          addToCart={addToCart}
                                          open={restdata?.isonline == "0"}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div
                            className={`tab-pane fade ${
                              activeButton === 2 ? "show active" : ""
                            }`}
                            id="overview"
                            role="tabpanel"
                            tabIndex={0}
                          >
                            <div className="overview-section">
                              {restraDetail?.map((info, i) => (
                                <div className="row" key={i}>
                                  <div className="col-md-12 col-12">
<div className="overview-content mb-3">
  <h5 className="mb-2">
    <i className="fa fa-info-circle" /> About Description
  </h5>
  <div>
    {showFullAbout ? (
      <p dangerouslySetInnerHTML={{ __html: info?.description }} />
    ) : (
      <p>{getTruncatedHTML(info?.description)}</p>
    )}
    {info?.description && (
      <span
        onClick={() => setShowFullAbout(!showFullAbout)}
        style={{ color: "#e84135", cursor: "pointer", fontWeight: 500 }}
      >
        {showFullAbout ? "Show Less" : "Show More"}
      </span>
    )}
  </div>
</div>

                                    <div className="overview-content mb-3">
                                      <h5 className="mb-2">
                                        <i className="fa fa-credit-card" />{" "}
                                        Payment Methhod
                                      </h5>
                                      {payment.map((method) => (
                                        <p>
                                          <i className="fa fa-check theme-color" />{" "}
                                          {method}{" "}
                                        </p>
                                      ))}
                                    </div>
                                    <div className="overview-content mb-3">
                                      <h5 className="mb-2">
                                        <i
                                          className="fa fa-exclamation-triangle"
                                          style={{
                                            color: "grey",
                                            fontSize: "24px",
                                          }}
                                        />{" "}
                                        Halal Certification Body
                                      </h5>
                                      <ul className="alergy">
                                        <li>{info?.allergies}</li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="col-lg-12">
                                    <h5>
                                      <i className="fa fa-star-o" /> Food
                                      Hygiene Rating
                                    </h5>
                                    <div className="d-flex p-2 border">
                                      <div className="me-3 hyzine">
                                        {(Number(info.hyginerating) === 4 ||
                                          Number(info.hyginerating) ===
                                            4.5) && (
                                          <img
                                            src={`${rating4}`}
                                            style={{ width: 150 }}
                                          />
                                        )}
                                        {(Number(info.hyginerating) === 3 ||
                                          Number(info.hyginerating) ===
                                            3.5) && (
                                          <img
                                            src={`${rating3}`}
                                            style={{ width: 150 }}
                                          />
                                        )}
                                        {(Number(info.hyginerating) === 2 ||
                                          Number(info.hyginerating) ===
                                            2.5) && (
                                          <img
                                            src={`${rating2}`}
                                            style={{ width: 150 }}
                                          />
                                        )}
                                        {(Number(info.hyginerating) === 1 ||
                                          Number(info.hyginerating) === 1.5 ||
                                          info.hyginerating === "") && (
                                          <img
                                            src={`${rating1}`}
                                            style={{ width: 150 }}
                                          />
                                        )}
                                        {Number(info.hyginerating) == 5 && (
                                          <img
                                            src={`${rating5}`}
                                            style={{ width: 150 }}
                                          />
                                        )}
                                      </div>

                                      <div>
                                        <h6>
                                          Last Inspection{" "}
                                          {
                                            restraDetail[0]
                                              ?.hygineinspectiondate
                                          }
                                        </h6>
                                        <p>
                                          Rating b the Food Standard Agency and
                                          our local authority. This rating may
                                          have changed
                                        </p>
                                        <a
                                          href={
                                            restraDetail[0]?.hygineurl
                                              ? restraDetail[0].hygineurl
                                              : "https://ratings.food.gov.uk/"
                                          }
                                          target="_blank"
                                          style={{ color: "rgb(232, 65, 53)" }}
                                        >
                                          More Info
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-12 col-12">
                                    <h5>
                                      <i className="fa fa-map" /> Where to Find
                                      Us
                                    </h5>
                                    <div className="overview-content mt-0 pl-3  w-100">
                                      <Map
                                        lat={restraDetail[0]?.lat}
                                        lng={restraDetail[0]?.lng}
                                      />
                                    </div>
                                  </div>
                                  <div className="mb-2">
                                    <h5><span className="me-2">Address: </span>{restraDetail[0]?.location}</h5>
                                  </div>
                                  <div className="col-md-12 col-12">
                                    <h5>
                                      <span className="me-2">Contact Us:</span>{" "}
                                      <a
                                        href="tel:+919999999999"
                                        data-rel="external"
                                      >
                                        {" "}
                                        <i className="fa fa-phone" />{" "}
                                        {info.contactno}
                                      </a>
                                    </h5>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div
              className="child2-div"
              style={{
                position: "relative",
                width: "25%",
                maxHeight: "80vh", // Limit height to make it scrollable
                overflowY: "auto", // Enable vertical scrolling
                position: "sticky", // Keep it fixed within its parent container
                top: "70px", // Set the top offset
                paddingTop: "11px", // Padding at the top
                scrollbarWidth: "none", // Hide scrollbar for Firefox
                msOverflowStyle: "none", // Hide scrollbar for IE and Edge
              }}
            >
              <Cartcomponent cart={cart} />
            </div>
          </div>
          {/* <CategoriesAccordion
            filteredFoods={filteredFoods}
            activeCategory={activeCategory}
            onCategoryClick={handleCategorysClick}
          /> */}
          {/* <div style={{ display: windowWidth <= 576 ? "block" : "none" }}>
            <CartFloat />
          </div> */}
        </div>
      )}
      {/* tab section end */}
      {/* Hide Footer on mobile view */}
      <div className="footer-desktop-only">
        <Footer />
      </div>

      <FooterMobileMenu/>
      <button className="scroll scroll-to-top menu-page">
        <i className="ri-arrow-up-s-line arrow" />
      </button>
    </>
  );
};

export default Restaurant;
