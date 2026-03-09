import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { getRestaurantFood } from "../utils/api";
import Navbar from "../components/Navbar";
import FoodCategory from "../components/FoodCategory";
import Footer from "../components/Footer";
import FooterMobileMenu from "../components/FooterMobileMenu";
import Delivery from "../components/delivery";
import Map from "../components/Map";
import Cartcomponent from "../components/CartComponent";
import CartFloat from "../components/cartFloat";
import CategoriesAccordion from "../components/CategoryinRow";
import { CirclesWithBar } from "react-loader-spinner";
import ReviewPopup from "../components/ReviewPopup";
import review1 from "../assets/rating1.png";
import review2 from "../assets/rating2.png";
import review3 from "../assets/rating3.png";
import review4 from "../assets/rating4.png";
import review5 from "../assets/rating5.jpg";

const Restaurant = () => {
  const perems = useParams();
  const [restraDetail, setRestraDetail] = useState([]);
  const [restdata, setRestdata] = useState();
  const [time, setTime] = useState([]);
  const [foods, setFoods] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [payment, setPayment] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showFullAbout, setShowFullAbout] = useState(false);
  const MAX_LENGTH = 300;
  const [cart, setCart] = useState([]);

  const addToCart = (foodItem) => {
    setCart((prevCart) => [...prevCart, foodItem]);
  };

  const getOptimizedImageUrl = (imageName, width = 800) => {
    return `https://partnermeatwala.com/documents/${imageName}?width=${width}&quality=80`;
  };

  const sendData = {
    restid: perems.id,
  };
  console.log(sendData, "dataa");

  const getTruncatedHTML = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html || "";
    const plainText = tempDiv.textContent || tempDiv.innerText || "";

    if (!showFullAbout && plainText.length > MAX_LENGTH) {
      return plainText.substring(0, MAX_LENGTH) + "...";
    }

    return html;
  };

  const getDetail = async () => {
    const res = await getRestaurantFood(sendData);
    setFoods(res?.restaurantmenulist);
    const restaurantDetails = res?.restaurantdetails?.map((detail) => ({
      ...detail,
      lat: parseFloat(detail.lat), 
      lng: parseFloat(detail.lng),
    }));

    setRestraDetail(restaurantDetails);

    if (res?.takeawytime) {
      setTime(res.takeawytime);
      console.log(res.takeawytime, "time");
    }

    if (res?.restdata) {
      console.log(res?.restdata);
      setRestdata(res?.restdata[0]);
    }
    setPayment(res.paymentmethod);
    setIsLoading(false);
  };

  useEffect(() => {
    getDetail();
    console.log("restdata", restdata);
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredFoods = foods.filter((category) =>
    category.items.some((food) =>
      food.foodname.toLowerCase().includes(searchQuery),
    ),
  );

  const [activeButton, setActiveButton] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".food-category-section");
      let currentCategory = null;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < 10 && rect.bottom > 10) {
          currentCategory = section.id;
        }
      });

      console.log(currentCategory);
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
        "onCategoryClick is not provided, active category won't be updated.",
      );
    }
  };

  useEffect(() => {
    if (!isManualScroll && categoryListRef.current) {
      const activeIndex = filteredFoods.findIndex(
        (category) => category.category === activeCategory,
      );

      if (activeIndex !== -1) {
        const activeItem = categoryListRef.current.children[activeIndex];
        const activeItemTop = activeItem.offsetTop; // Get the top offset
        const containerHeight = categoryListRef.current.clientHeight; // Get the height of the container
        const itemHeight = activeItem.clientHeight; // Get the height of the active item

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

  return (
    <>
      <Navbar isStatic={true} />
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
                      src={getOptimizedImageUrl(restdata.imagename, 800)}
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="child1-div-img"
                      style={{ backgroundColor: "gray", opacity: 0.2 }}
                    >
                      <div className="loader" />
                    </div>
                  )}
                </div>
                <div className="restaurant-image">
                  {restdata?.logo ? (
                    <img
                      className="img-fluid img"
                      src={getOptimizedImageUrl(restdata.logo, 800)}
                      loading="lazy"
                      style={{
                        borderRadius: "5px",
                      }}
                    />
                  ) : null}
                </div>
              </div>
              <div className="pt-0">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="restaurant-details">
                      <div
                        className="d-flex justify-content-between flex-wrap gap-3"
                        style={{ paddingTop: "20px", paddingBottom: "15px" }}
                      >
                        <div>
                          <h2 className="restaurant-name">{restdata?.name}</h2>
                          <h6 className="food-items">
                            {`${restdata?.cat1 ? restdata?.cat1 : "ㅤ"}${
                              restdata?.cat2 ? " • " + restdata?.cat2 : ""
                            }${restdata?.cat3 ? " • " + restdata?.cat3 : ""}`}
                          </h6>
                          {restdata?.isonline == "0" && (
                            <h6 className="food-items" style={{ color: "red" }}>
                              Currently Closed
                            </h6>
                          )}
                          <ul
                            className="details-list"
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            {restdata?.distance && (
                              <li>
                                <i className="ri-map-pin-fill theme-color" />{" "}
                                {restdata.distance}
                              </li>
                            )}
                          </ul>
                        </div>
                        <div className="restaurant-description">
                          <div className="distance d-flex">
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
                    <div className="row justify-content-center">
                      <div className="col-lg-3 order-lg-0 order-1">
                        <div
                          className="left-box wow fadeInUp"
                          style={{
                            position: "sticky",
                            zIndex: 10,
                            backgroundColor: "#fff",
                            borderRadius: "10px",
                            padding: "10px",
                            boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 3px",
                          }}
                        >
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
                                  style={{
                                    borderRadius: "8px",
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                    width: "100%",
                                  }}
                                />
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
                                                ? "#f1f1f1"
                                                : "",
                                            border:
                                              activeCategory ===
                                              category.category
                                                ? "1px solid #ff0000"
                                                : "",
                                            borderRadius:
                                              activeCategory ===
                                              category.category
                                                ? "10px"
                                                : "",
                                            // width: "100%"
                                          }}
                                          onClick={() =>
                                            handleCategorysClick(
                                              category.category,
                                            )
                                          }
                                        >
                                          {console.log(category.category)}

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
                              Products
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
                                      {console.log(restdata, "idsss")}

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
                              {restraDetail.map((info, i) => (
                                <div className="row" key={i}>
                                  <div className="col-md-12 col-12">
                                    <div className="overview-content mb-3">
                                      <h5 className="mb-2">
                                        <i className="fa fa-info-circle" />{" "}
                                        About Description
                                      </h5>
                                      <div>
                                        {showFullAbout ? (
                                          <p
                                            dangerouslySetInnerHTML={{
                                              __html: info?.description,
                                            }}
                                          />
                                        ) : (
                                          <p>
                                            {getTruncatedHTML(
                                              info?.description,
                                            )}
                                          </p>
                                        )}
                                        {info?.description && (
                                          <span
                                            onClick={() =>
                                              setShowFullAbout(!showFullAbout)
                                            }
                                            style={{
                                              color: "#e84135",
                                              cursor: "pointer",
                                              fontWeight: 500,
                                            }}
                                          >
                                            {showFullAbout
                                              ? "Show Less"
                                              : "Show More"}
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
                                          }}
                                        />{" "}
                                        Halal Certification Body
                                      </h5>
                                      <ul className="alergy">
                                        <li>{info?.allergies}</li>
                                      </ul>
                                    </div>
                                    <div className="overview-content mb-3">
                                      <h5 className="mb-2">
                                        <i className="fa fa-info-circle" /> Do
                                        you have a food allergy?
                                      </h5>
                                      <div>
                                        <p>
                                          Some products may contain or come into
                                          contact with meat, fish, shellfish,
                                          dairy, eggs, nuts, soy, gluten and
                                          sesame. Contact the store for allergy
                                          details before ordering. We cannot
                                          guarantee any product is allergen
                                          free. Do not order if you cannot
                                          confirm safety.
                                        </p>
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
                                              src={`${review4}`}
                                              style={{ width: 150 }}
                                            />
                                          )}
                                          {(Number(info.hyginerating) === 3 ||
                                            Number(info.hyginerating) ===
                                              3.5) && (
                                            <img
                                              src={`${review3}`}
                                              style={{ width: 150 }}
                                            />
                                          )}
                                          {(Number(info.hyginerating) === 2 ||
                                            Number(info.hyginerating) ===
                                              2.5) && (
                                            <img
                                              src={`${review2}`}
                                              style={{ width: 150 }}
                                            />
                                          )}
                                          {(Number(info.hyginerating) === 1 ||
                                            Number(info.hyginerating) === 1.5 ||
                                            info.hyginerating === "") && (
                                            <img
                                              src={`${review1}`}
                                              style={{ width: 150 }}
                                            />
                                          )}
                                          {Number(info.hyginerating) == 5 && (
                                            <img
                                              src={`${review5}`}
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
                                            Rating b the Food Standard Agency
                                            and our local authority. This rating
                                            may have changed
                                          </p>
                                          <a
                                            href={
                                              restraDetail[0]?.hygineurl
                                                ? restraDetail[0].hygineurl
                                                : "https://ratings.food.gov.uk/"
                                            }
                                            target="_blank"
                                            style={{
                                              color: "rgb(232, 65, 53)",
                                            }}
                                          >
                                            More Info
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-12 col-12">
                                    <h5>
                                      <i className="fa fa-map" /> Where to Find
                                      Us
                                    </h5>
                                    <div className="overview-content mt-0 pl-3">
                                      <Map
                                        lat={restraDetail[0]?.lat}
                                        lng={restraDetail[0]?.lng}
                                      />
                                    </div>
                                  </div>
                                  <div className="mb-2">
                                    <h5>
                                      <span className="me-2">Address: </span>
                                      {restraDetail[0]?.location}
                                    </h5>
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
                maxHeight: "80vh",
                overflowY: "auto",
                position: "sticky",
                top: "70px",
                paddingTop: "11px",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <Cartcomponent cart={cart} />
            </div>
          </div>
          <CategoriesAccordion
            filteredFoods={filteredFoods}
            activeCategory={activeCategory}
            onCategoryClick={handleCategorysClick}
          />
          {/* <div style={{ display: windowWidth <= 576 ? "block" : "none" }}>
            <CartFloat />
          </div> */}
        </div>
      )}
      <Footer />
      <FooterMobileMenu />
      <button className="scroll scroll-to-top menu-page">
        <i className="ri-arrow-up-s-line arrow" />
      </button>
    </>
  );
};

export default Restaurant;
