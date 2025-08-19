import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRestaurantFood } from "../utils/api";
import Navbar from "../components/Navbar";
import FoodCategory from "../components/FoodCategory";
import Footer from "../components/Footer";
import FooterMobileMenu from "../components/FooterMobileMenu";
import Delivery from "../components/delivery";
import Map from "../components/Map";
import CartFloat from "../components/cartFloat";

const Restaurantdetail = () => {
  
  const perems = useParams();
  const [restraDetail, setRestraDetail] = useState([]);
  const [restdata, setRestdata] = useState();
  const [time,setTime] = useState([])
  const [foods, setFoods] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [payment,setPayment] = useState([])
  // const [restraDetail , setRestraDetail] = useState()
  const storedPincode = JSON.parse(localStorage.getItem("pincode")) || "";
  const pincode = storedPincode ? storedPincode.longName : "";
  const sendData = {
    pincode:pincode.toString(),
    restid: perems.id,
  };



  const getDetail = async () => {
    const res = await getRestaurantFood(sendData);
    setFoods(res?.restaurantmenulist);
    setRestraDetail(res?.restaurantdetails);
    if(res?.takeawytime){
      setTime(res.takeawytime)
    }

    if (res?.restdata) {
      setRestdata(res?.restdata[0]);
    }
    // console.log("res?.restaurantmenulist", restraDetail[0].lat);
    setPayment(res.paymentmethod);
  };

  useEffect(() => {
    getDetail();
    // console.log("restdata", restdata);
    // console.log("perems", perems.id);
  }, []);

  const [activeButton, setActiveButton] = useState(1);


useEffect(() => {
  const handleScroll = () => {
    const sections = document.querySelectorAll('.food-category-section');
    let currentCategory = null;
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 1 && rect.bottom > 1) {
        currentCategory = section.id;
      }
    });
    setActiveCategory(currentCategory);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [foods]);

  return (
<>
  {/* Header section start */}
  <Navbar/>
  {/* Header Section end */}
  <section className="section-t-space mytabb overflow-hidden pt-120">
 
    <Delivery/>

  </section>
  {/* banner section starts */}
  <section className="position-relative">
    <div>
      <img
        src={`https://partnermeatwala.com/documents/${restdata?.imagename}`}
        style={{ width: "100%",height: "50vh", objectFit:"cover" }}
      />
    </div>
    <div className="restaurant-image">
      <img
        className="img-fluid img "
        src={`https://partnermeatwala.com/documents/${restdata?.logo}`}
        alt="brand13"
      />
    </div>
  </section>
  {/* banner section end */}
  {/* <section className="pt-0">
    <div className="container">
      <div className="row justify-content-center">
        <div className="restaurant-box">
          <div className="restaurant-details">
            <div className="d-flex justify-content-between flex-wrap gap-3">
              <div>
                <h2 className="restaurant-name">
                {restdata?.name}
                </h2>
                <p className="restaurant-place mt-2">
                  {restdata?.location}
                </p>
                <h6 className="food-items">
                {`${restdata?.cat1 ? restdata?.cat1 : "ㅤ"}${
                restdata?.cat2 ? " • " + restdata?.cat2 : ""
              }${restdata?.cat3 ? " • " + restdata?.cat3 : ""}`}
                </h6>
                <ul className="details-list">
                  <li>
                    <i className="ri-map-pin-fill theme-color" />{restdata?.distance}
                  </li>
                  <li>
                    <i className="ri-time-line" /> {restdata?.mincookduration}
                  </li>
                </ul>
              </div>
              <div className="restaurant-description">
                <div className="distance d-flex">
                  <h4 className="rating-star">
                    <span>
                      <i className="ri-star-s-fill text-warning" />
                    </span>{" "}
                    {restdata?.hyginerating} ({restdata?.totalreview} Reviews)
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section> */}
  <section>
  <div className="container">
  <div>
                <h2 className="restaurant-name">
                {restdata?.name}
                </h2>
                {/* <p className="restaurant-place mt-2">
                  {restdata?.location}
                </p> */}
                <h6 className="food-items">
                {`${restdata?.cat1 ? restdata?.cat1 : "ㅤ"}${
                restdata?.cat2 ? " • " + restdata?.cat2 : ""
              }${restdata?.cat3 ? " • " + restdata?.cat3 : ""}`}
                </h6>
                <ul className="details-list">
                  <li>
                    <i className="ri-map-pin-fill theme-color" />{restdata?.distance}
                  </li>
                  <li>
                    <i className="ri-time-line" /> {restdata?.mincookduration}
                  </li>
                </ul>
  </div>
</div>

  </section>
  {/* tab section starts */}
  <section className="tab-details-section section-b-space">
    <div className="container">
      <div className="blog-boxs">
        <div className="row justify-content-center g-4">
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
                    />
                    <i className="ri-search-line search-icon" />
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
                          className="category-list custom-padding custom-height scroll-bar"
                          id="myDIV"
                        >
                      {foods.map((category,i)=>(
                                <li className="btnn " key={i}
                                        style={{ backgroundColor: activeCategory === category.category ? '#dff5ff' : '' }}>

                                     <Link href={`#${category.category}`}>
                                  <div className="form-check ps-0 m-0 category-list-box">
                                    <div className="form-check-label">
                                      <span className="name">{category.category}</span>
                                    </div>
                                  </div>
                                </Link>
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
                  "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px"
              }}
            >
              <ul className="nav nav-tabs tab-style1" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeButton === 1 ? 'active' : ''}`}
                    id="order-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#online"
                    type="button"
                    role="tab"
                    onClick={() => setActiveButton(1)}
                  >
                    MENU
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeButton === 2 ? 'active' : ''}`}
                    id="overview-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#overview"
                    type="button"
                    role="tab"
                    onClick={() => setActiveButton(2)}
                  >
                    INFORMATION
                  </button>
                </li>
              </ul>
              <div
                className="tab-content product-details-content"
                id="myTabContent"
              >
                <div className={`tab-pane fade ${activeButton === 1 ? 'show active' : ''}`}
                  id="online"
                  role="tabpanel"
                  tabIndex={0}
                >
                  <div className="row g-lg-3 g-2">
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
                      {foods.map((category, i) => (
                           <FoodCategory key={i} item={category} restId={sendData?.restid} />
                                 ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <div className={`tab-pane fade ${activeButton === 2 ? 'show active' : ''}`}
                  id="overview"
                  role="tabpanel"
                  tabIndex={0}
                >
                  {/* <div className="overview-section">
                    <div className="row g-3">
                      <div className="col-md-6 col-12">
                        <div className="overview-content mb-3">
                          <h5 className="mb-2">About Description</h5>
                          <p   dangerouslySetInnerHTML={{
                             __html: restraDetail?.description,
                           }}></p>
                        </div>
                        <div className="overview-content mb-3">
                          <h5 className="mb-2">Payment Methhod</h5>
                          <p>
                            <i className="fa fa-check theme-color" /> Cash{" "}
                          </p>
                          <p>
                            <i className="fa fa-check theme-color" /> Payment
                            Online{" "}
                          </p>
                        </div>
                        <div className="overview-content mb-3">
                          <h5 className="mb-2">Allergen Info</h5>
                          <ul className="alergy">
                            <li>Cold</li>
                            <li>Viral Flue</li>
                            <li>Headahe</li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <h5>Where to Find Us</h5>
                        <div className="overview-content mt-0 pl-3">
                          <iframe
                            src={`https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d2965.0824050173574!2d-${restraDetail?.lng}!3d${restraDetail?.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sWebFilings%2C+University+Boulevard%2C+Ames%2C+IA!5e0!3m2!1sen!2sus!4v1390839289319`}
                            // src={`https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d2965.0824050173574!2d-93.63905729999999!3d41.998507000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sWebFilings%2C+University+Boulevard%2C+Ames%2C+IA!5e0!3m2!1sen!2sus!4v1390839289319`}
                            width="100%"
                            height={400}
                            frameBorder={0}
                            style={{ border: 0 }}
                          />
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div className="overview-section">
                    {restraDetail.map((info,i)=>(

  <div className="row g-3" key={i}>
    <div className="col-md-12 col-12">
      <div className="overview-content mb-3">
        <h5 className="mb-2">
          {/* <img src="/assets/images/about.png" style={{ width: 20 }} />  */}
          <i className="fas fa-info-circle" />  About Description
        </h5>
        <p>
  <p   dangerouslySetInnerHTML={{
                             __html: info?.description,
                           }}></p>        </p>
      </div>
      <div className="overview-content mb-3">
        <h5 className="mb-2">
          <i className="fa fa-credit-card" /> Payment Methhod
        </h5>
{payment.map((method)=>(
              <p>
              <i className="fa fa-check theme-color" /> {method}{" "}
            </p>
))}
        {/* <p>
          <i className="fa fa-check theme-color" /> Cash{" "}
        </p>
        <p>
          <i className="fa fa-check theme-color" /> Payment Online{" "}
        </p> */}
      </div>
      <div className="overview-content mb-3">
        <h5 className="mb-2">
          {/* <img src="/assets/images/info.png" style={{ width: 20 }} />  */}
          <i className="fas fa-exclamation-triangle" style={{ color: 'blue', fontSize: '24px' }}/> Allergen Info
        </h5>
        <ul className="alergy">
          <li>{info?.allergies}</li>
   
        </ul>
      </div>
    </div>
    <div className="col-lg-12">
      <h5>
        <i className="fa fa-star-o" /> Food Hygiene Rating
      </h5>
      <div className="d-flex p-2 border">
      <div className="me-3 hyzine">
  { (Number(info.hyginerating) === 4 || Number(info.hyginerating) === 4.5) && (
    <img
      src="https://api.asm.skype.com/v1/objects/0-jhb-d1-e7a5f4f212304f4cef08e9f60526b166/views/imgpsh_fullsize_anim"
      style={{ width: 150 }}
    />
  )}
  { (Number(info.hyginerating) === 3 || Number(info.hyginerating) === 3.5) && (
    <img
      src="https://api.asm.skype.com/v1/objects/0-jhb-d10-89c65c18d37ffb29a29f6de44ccb1c6f/views/imgpsh_fullsize_anim"
      style={{ width: 150 }}
    />
  )}
  { (Number(info.hyginerating) === 2 || Number(info.hyginerating) === 2.5) && (
    <img
      src="https://api.asm.skype.com/v1/objects/0-jhb-d3-5a606b885a8c8ebf468638397b97e265/views/imgpsh_fullsize_anim"
      style={{ width: 150 }}
    />
  )}
  { (Number(info.hyginerating) === 1 || Number(info.hyginerating) === 1.5 || info.hyginerating === "") && (
    <img
      src="https://api.asm.skype.com/v1/objects/0-jhb-d7-bccffa8e6defef87cafb1eb99a8479f7/views/imgpsh_fullsize_anim"
      style={{ width: 150 }}
    />
  )}
  { (Number(info.hyginerating) == 5) && (
    <img
      src="https://api.asm.skype.com/v1/objects/0-jhb-d7-bccffa8e6defef87cafb1eb99a8479f7/views/imgpsh_fullsize_anim"
      style={{ width: 150 }}
    />
  )}
</div>

        {/* <div className="me-3 hyzine">
          <img
            src="https://seeklogo.com/images/F/food-hygiene-rating-logo-C7CB72DFF2-seeklogo.com.png"
            style={{ width: 150 }}
          />

        </div> */}
        <div>
          <h6>Last Inspection 27 March 2024</h6>
          <p>
            Rating b the Food Standard Agency and our local authority. This
            rating may have changed
          </p>
          <Link href="https://ratings.food.gov.uk/" target="_blank">
            More Info
          </Link>
        </div>
      </div>
    </div>
    <div className="col-md-12 col-12">
      <h5>
        <i className="fa fa-map" /> Where to Find Us
      </h5>
      <div className="overview-content mt-0 pl-3">
   <Map/>
      </div>
    </div>
    <div className="col-md-12 col-12">
      <h5>
        <span className="me-2">Contact Us:</span>{" "}
        <Link href="tel:+919999999999" data-rel="external">
          {" "}
          <i className="fa fa-phone" /> {info.contactno}
        </Link>
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
  {/* tab section end */}
  <Footer/>
  {/* footer section end */}
  {/* mobile fix menu start */}
  <FooterMobileMenu/>
  {/* mobile fix menu end */}
  {/* cart fix panel */}
  {/* <div className="fixed-btn d-lg-none d-block">
    <div className="custom-container">
      <div className="cart-fixed-bottom">
        <h6 className="fw-medium">3 items</h6>
        <Link href="checkout.html" className="cart-fixed-right">
          <h6 className="fw-medium text-white">
            View cart <i className="ri-arrow-right-line" />
          </h6>
        </Link>
      </div>
    </div>
  </div> */}
  {/* cart fix panel */}
  {/* customized modal starts */}
  <div className="modal customized-modal" id="customized" tabIndex={-1}>
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="container">
          <div className="filter-header">
            <h5 className="title">Custom Order</h5>
            <Link
              href="#"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="filter-body">
            <div className="filter-title">
              <h5 className="fw-medium dark-text">Choose Size</h5>
            </div>
            <ul className="filter-list">
              <li>
                <h6 className="product-size">Size S</h6>
                <div className="form-check product-price">
                  <label className="form-check-label" htmlFor="reverseCheck1">
                    £18
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="reverseCheck1"
                  />
                </div>
              </li>
              <li>
                <h6 className="product-size">Size M</h6>
                <div className="form-check product-price">
                  <label className="form-check-label" htmlFor="reverseCheck1">
                    £20
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="reverseCheck2"
                    defaultChecked=""
                  />
                </div>
              </li>
              <li>
                <h6 className="product-size">Size L</h6>
                <div className="form-check product-price">
                  <label className="form-check-label" htmlFor="reverseCheck1">
                    £22
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="reverseCheck3"
                  />
                </div>
              </li>
            </ul>
            <div className="filter-title">
              <h5 className="fw-medium dark-text">Choose Size</h5>
            </div>
            <ul className="filter-list border-0">
              <li>
                <h6 className="product-size">Chili sauce</h6>
                <div className="form-check product-price">
                  <label className="form-check-label" htmlFor="reverseCheck1">
                    £18
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="reverseCheck4"
                  />
                </div>
              </li>
              <li>
                <h6 className="product-size">Mustard</h6>
                <div className="form-check product-price">
                  <label className="form-check-label" htmlFor="reverseCheck1">
                    £20
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="reverseCheck5"
                    defaultChecked=""
                  />
                </div>
              </li>
              <li>
                <h6 className="product-size">Special dipping sauce</h6>
                <div className="form-check product-price">
                  <label className="form-check-label" htmlFor="reverseCheck1">
                    £22
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="reverseCheck6"
                  />
                </div>
              </li>
            </ul>
          </div>
          <div className="filter-footer">
            <Link
              href="#"
              className="btn theme-btn add-btn w-100 mt-0"
              data-bs-dismiss="modal"
            >
              Apply
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* customized modal end */}
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
  <CartFloat/>
  {/* tap to top end */}
</>

  )
}

export default Restaurantdetail




