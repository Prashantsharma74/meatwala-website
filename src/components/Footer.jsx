import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import charity from "../assets/images/charity.png";
import Showmore from "../components/popup";
import { getCategorylist } from "../store/feature/restaurantSlice";
import Charity from "./Charity";
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

const Footer = ({ text }) => {
  const isUserLoggedIn = localStorage.getItem("user");
  const [showMore, setShowMore] = useState(false);
  const windowWidth = useWindowWidth();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState({
    legal: false,
    cuisine: false,
    partners: false,
    customerService: false,
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSection = (section) => {
    setIsOpen((prev) => {
      const newState = {
        legal: false,
        cuisine: false,
        partners: false,
        customerService: false,
      };
      newState[section] = true;
      return newState;
    });
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const shortText = `High Wycombe Bites is your local food delivery app, dedicated to supporting restaurants and takeaways in High Wycombe.`;
  const fullText = `High Wycombe Bites is your local food delivery app, 
                    dedicated to supporting restaurants and takeaways in High Wycombe.
                    We bring you exclusive offers and discounts that you won’t find anywhere else.
                    Our mission is to strengthen the local community by supporting local businesses 
                    and giving back through charitable donations. With every order, 
                    you’re not only satisfying your cravings but also making a positive impact in High Wycombe.`;

  const { categorylist } = useSelector((store) => store.restaurant);
  useEffect(() => {
    const catData = {
      sortingtype: "1",
    };
    dispatch(getCategorylist(catData));
  }, []);
  const [showAll, setShowAll] = useState(false);

  const toggleShowMores = () => {
    setShowAll(!showMore);
  };
  const categories = categorylist?.categorylist || [];

  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Email is required",
        text: "Please enter a valid email address.",
        confirmButtonColor: "rgb(232, 65, 53)",
      });
      return;
    }

    try {
      const response = await axios.post(
        "https://partnermeatwala.com/api/customer/subscribenow",
        { email }
      );

      if (response.data.success === "1") {
        Swal.fire({
          icon: "success",
          title: "Subscribed Successfully!",
          text: "Thank you for joining the Meatwala community!",
          confirmButtonColor: "rgb(232, 65, 53)",
        });
        setEmail("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Subscription Failed",
          text:
            response.data.returnmsg ||
            "Something went wrong. Please try again.",
          confirmButtonColor: "rgb(232, 65, 53)",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to process your request. Please try again later.",
        confirmButtonColor: "rgb(232, 65, 53)",
      });
    }
  };

  const location = useLocation();

  const handleCityClick = (cityName) => {
    const currentPath = location.pathname;

    if (currentPath.startsWith("/near-me")) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get(
        "https://partnermeatwala.com/api/customer/getcountrywisecity"
      );
      if (response.data.success === "1") {
        const country = response.data.countries.find(
          (c) => c.countryname === "United Kingdom"
        );
        if (country) {
          const cityList = country.cities.map((city) => ({
            cityid: city.cityid, // Store cityid along with the city name
            cityname: city.cityname.trim(),
          }));

          setCities(cityList.slice(0, 5));
        }
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  return (
    <footer className="footer-section">
      <div className="subscribe-section border-bottom mt-3">
        <div className="container">
          <div
            className="row "
            style={{
              display:
                isOpen.customerService || windowWidth > 576 ? "block" : "none",
              paddingTop: "0px",
            }}
          >
            <div className="col-lg-12">
              <div
                className="subscribe-part1"
                style={{ display: text === "cart" ? "none" : "block" }}
              >
                {/* Main Heading */}
                <h3 className="main-text">
                  Join a community that values quality, convenience and giving
                  back.
                </h3>

                {/* Subtext in smaller font */}
                <p className="sub-text">
                  By signing up, you agree to receive discounts, offers, and
                  updates through email marketing.
                </p>

                {/* Email Input and Submit Button */}
                <div className="position-relative emailParent w-100">
                  <div className="email-manage">
                    <input
                      type="email"
                      className="form-control subscribe-form-control"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <button
                    className="btn hover-effect theme-btn subscribe-btn mt-0"
                    onClick={handleSubscribe}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="main-footer border-bottom"
        style={{
          padding: "0px",
          paddingBottom: "10px",
          paddingTop: "10px",
          display:
            windowWidth <= 768
              ? location.pathname === "/" // Only show on mobile if on Home page
                ? "block"
                : "none"
              : "block",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-12">
              <div className="footer-logo-part">
                <h5 className="footer-title">About Us</h5>
                <p>
                  <h3>Your Trusted Halal Meat Delivery Platform</h3>
                  Meatwala connects you with your favourite local halal meat and
                  grocery stores, delivering fresh, halal-certified meat and
                  groceries straight to your door. Our mission is to support
                  local businesses and uplift underprivileged communities
                  worldwide. With every halal meat delivery order on our
                  platform, you not only enjoy exclusive savings but also
                  contribute to meaningful charitable causes.
                  {/* <span
                    style={{ color: 'rgb(232, 65, 53)', cursor: 'pointer' }}
                    onClick={toggleShowMore}
                  >
                    {showMore ? 'Show Less' : ' Show More'}
                  </span> */}
                </p>
                {/* <div className="diet-symbols d-flex align-items-center my-3">
                  <img
                    src={Veg}
                    alt="Vegetarian"
                    style={{ width: '30px', marginRight: '10px' }}
                  />
                  <img
                    src={Nonveg}
                    alt="Non-Vegetarian"
                    style={{ width: '30px', marginLeft: '10px' }}
                  />
                </div> */}
                {/* <div className="social-media-part">
                  <ul className="social-icon">
                    <li>
                      <a href="https://www.facebook.com/profile.php?id=61564768471774&locale=en_GB" target="_blank">
                        <i className="ri-facebook-fill icon" />
                      </a>
                    </li>
                    <li>
                      <a href="https://x.com/i/flow/login?redirect_after_login=%2Fwycombebites" target="_blank">
                        <i class="ri-twitter-x-fill icon" style={{ fontSize: "15px" }}></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.tiktok.com/@highwycombebites" target="_blank">
                        <i class="ri-tiktok-fill icon"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/highwycombebites?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank">
                        <i className="ri-instagram-fill icon" />
                      </a>
                    </li> */}
                {/* Changed as per the client need */}
                {/* <li>
                      <a href="https://www.youtube.com/" target="_blank">
                        <i className="ri-youtube-fill icon" />
                      </a>
                    </li> */}
                {/* </ul>
                </div> */}
              </div>
            </div>
            <div className="col-xl-8">
              <div className="row mlegal">
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12">
                  <h5
                    className="footer-title"
                    onClick={() => toggleSection("legal")}
                    style={{ cursor: "pointer" }}
                  >
                    Legal
                  </h5>
                  <ul
                    className="content"
                    style={{
                      display:
                        isOpen.legal || windowWidth > 576 ? "block" : "none",
                      paddingTop: "0px",
                    }}
                  >
                    <li>
                      <Link to={"/terms-of-service"}>
                        <h6>Terms of service</h6>
                      </Link>
                    </li>
                    <li>
                      <Link to={"/privacy-policy"}>
                        <h6>Privacy policy</h6>
                      </Link>
                    </li>
                    <li>
                      <Link to={"/cookies-policy"}>
                        <h6>Cookies policy</h6>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12">
                  <h5
                    className="footer-title"
                    onClick={() => toggleSection("cuisine")}
                    style={{ cursor: "pointer" }}
                  >
                    Popular Cities
                  </h5>

                  <ul
                    className="content"
                    style={{
                      display:
                        isOpen.cuisine || windowWidth > 576 ? "block" : "none",
                      paddingTop: "0px",
                    }}
                  >
                    {cities.map((city) => (
                      <li key={city.cityid}>
                        <Link
                          to={`/near-me/${encodeURIComponent(city.cityname)}/${
                            city.cityid
                          }`}
                          onClick={() => handleCityClick(city.cityname)}
                        >
                          <h6>{city.cityname}</h6>
                        </Link>
                      </li>
                    ))}

                    <li>
                      <Showmore />{" "}
                    </li>
                  </ul>
                </div>

                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12">
                  <h5
                    className="footer-title"
                    onClick={() => toggleSection("partners")}
                    style={{ cursor: "pointer" }}
                  >
                    Partners
                  </h5>
                  <ul
                    className="content"
                    style={{
                      display:
                        isOpen.partners || windowWidth > 576 ? "block" : "none",
                      paddingTop: "0px",
                    }}
                  >
                    <li>
                      <Link to={"/partner"}>
                        <h6>Partner with us</h6>
                      </Link>
                    </li>
                    <li>
                      <Link to={"/become-a-rider"}>
                        <h6>Ride with us</h6>
                      </Link>
                    </li>
                    <li>
                      <Link to={"/wholesale"}>
                        <h6>Restaurant wholesale</h6>
                      </Link>
                    </li>
                    <li>
                      <Link to={"/supported-by-meatwala"}>
                        <h6>Supported by Meatwala</h6>
                      </Link>
                    </li>
                    {/* <li>
                      <Link to={""}>
                        <h6>Careers</h6>
                      </Link>
                    </li> */}
                  </ul>
                </div>

                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12">
                  <h5
                    className="footer-title"
                    onClick={() => toggleSection("customerService")}
                    style={{ cursor: "pointer" }}
                  >
                    Customer Service
                  </h5>
                  <ul
                    className="content"
                    style={{
                      display:
                        isOpen.customerService || windowWidth > 576
                          ? "block"
                          : "none",
                      paddingTop: "0px",
                    }}
                  >
                    {!isUserLoggedIn ? (
                      <>
                        <li>
                          <Link to="/login">
                            <h6>Log in</h6>
                          </Link>
                        </li>
                        {/* <li>
                          <Link to="/signup">
                            <h6>Sign up</h6>
                          </Link>
                        </li> */}
                      </>
                    ) : null}
                    <li>
                      <Link to={"/setting"}>
                        <h6>Account</h6>
                      </Link>
                    </li>
                    <li>
                      <Link to={"/recipes"}>
                        <h6>Recipes</h6>
                      </Link>
                    </li>
                    <li>
                      <Link to={"/contact"}>
                        <h6>Contact us</h6>
                      </Link>
                    </li>
                    <li>
                      <Link to={"/faq"}>
                        <h6>FAQs</h6>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Remove Charity from mobile view */}
        {windowWidth > 768 && <Charity />}
      </div>
    </footer>
  );
};

export default Footer;
