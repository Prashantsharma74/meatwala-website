import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Delivery from '../components/delivery'
import {  toast } from 'react-toastify';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { review } from '../utils/api'
import Footer from '../components/Footer';
const Review = () => {
    // const [userId, setUserId] = useState("1");
    const [bookingId, setBookingId] = useState("1");
    const [restId, setRestId] = useState("1");
    // const [rating, setRating] = useState("");
    const [reviewText, setReviewText] = useState("");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const [rating, setRating] = useState(0);

    const handleClick = (value) => {
      setRating(value);
    };
    const StarWrapper = styled.div`
  display: flex;
  cursor: pointer;
`;

const Star = styled.div`
  font-size: 2rem;
  color: ${props => props.active ? 'gold' : 'lightgray'};
  transition: color 200ms;
`;
    // const handleRatingChange = (e) => {
    //   setRating(e.target.value);
    // };
    const handleReviewChange = (e) => {
      setReviewText(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent default form submission behavior
  
   if(rating != 0 ){

      const data = {
        userid: storedUser?.userid,
        bookingid: bookingId,
        restid: restId,
        ratingscore: String(rating),
        reviewtext: reviewText,
      };
  
      try {
        
        const ratingData = await review(data); 
        if(ratingData.status == "1"){
            toast.success("review and rating added successfully")
            }        
        setBookingId("");
        setRestId("");
        setRating("");
        setReviewText("");
      } catch (error) {
        console.error("Error submitting review:", error);
        // Handle errors (e.g., show an error message)
      }
    }else{
        toast.error("please give rating")

    }
    };
    


  return (
    <>
  {/* Header section start */}
<Navbar/>
  {/* Header Section end */}
 <Delivery/>
  <section className="page-head-section">
    <div className="container page-heading">
      <h2 className="h3 mb-3 text-white text-center">Add Review</h2>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb flex-lg-nowrap justify-content-center justify-content-lg-star">
          <li className="breadcrumb-item">
            <Link href="index.html">
              <i className="ri-home-line" />
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Review
          </li>
        </ol>
      </nav>
    </div>
  </section>
  <section className="section-b-space">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <form id="review-form" onSubmit={handleSubmit}>
            <h2 className="mb-2">Give Rating</h2>
            <StarWrapper>
      {[1, 2, 3, 4, 5].map((num) => (
        <Star
          key={num}
          active={num <= rating}
          onClick={() => handleClick(num)}
        >
          ★
        </Star>
      ))}
    </StarWrapper>
              {/* <div className="form-check-inline">
                <label className="form-check-label" htmlFor={3}>
                  <input
                    type="radio"
                    id={3}
                    defaultValue={3}
                    name="rating"
                    className="rating"
                  />
                  <span className="wpcomment-input-option-label wpcomment-label-radio">
                    3
                  </span>
                </label>
              </div>
              <div className="form-check-inline">
                <label className="form-check-label" htmlFor={4}>
                  <input
                    type="radio"
                    id={4}
                    defaultValue={4}
                    name="rating"
                    className="rating"
                  />
                  <span className="wpcomment-input-option-label wpcomment-label-radio">
                    4
                  </span>
                </label>
              </div>
              <div className="form-check-inline">
                <label className="form-check-label" htmlFor={5}>
                  <input
                    type="radio"
                    id={5}
                    defaultValue={5}
                    name="rating"
                    className="rating"
                  />
                  <span className="wpcomment-input-option-label wpcomment-label-radio">
                    5
                  </span>
                </label>
              </div>
            </div> */}
            <p id="starsInfo" className="help-block mb-3">
              Click on a star to give your rating.
            </p>
            <div className="form-group mb-3">
              <h2 className="mb-2">Write your Review</h2>
           <textarea
                    className="form-control"
                    rows={10}
                    placeholder="Your Review"
                    name="review"
                    id="review"
                    value={reviewText}
                    onChange={handleReviewChange}
                    required
                  />
            </div>
            <input
              id="submit"
              type="submit"
              className="btn theme-btn"
              defaultValue="Submit"
            />
          </form>
        </div>
      </div>
    </div>
  </section>
  {/* footer section starts */}
<Footer/>
  {/* footer section end */}
  {/* mobile fix menu start */}
<Footer/>
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
          <Link href="#!" className="current-location">
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
          <Link href="#!" className="recent-location">
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
  {/* <button className="scroll scroll-to-top">
    <i className="ri-arrow-up-s-line arrow" />
  </button> */}
  {/* tap to top end */}
  {/* responsive space */}
  {/* <div className="responsive-space" /> */}
  {/* responsive space */}
  {/* bootstrap js */}
  {/* footer accordion js */}
  {/* loader js */}
  {/* swiper js */}
  {/* script js */}
</>



  )
}

export default Review


// import React,{useState} from 'react'
// import styled from 'styled-components';

// const Review = () => {


//     const StarWrapper = styled.div`
//   display: flex;
//   cursor: pointer;
// `;

// const Star = styled.div`
//   font-size: 2rem;
//   color: ${props => props.active ? 'gold' : 'lightgray'};
//   transition: color 200ms;
// `;

//   const [rating, setRating] = useState(0);

//   const handleClick = (value) => {
//     setRating(value);
//   };
//     const [rating, setrating] = useState(null);
//   const [reviewText, setReviewText] = useState("");

//   const handleRatingChange = (e) => {
//     setrating(Number(e.target.value)); // Convert value to number
//   };

//   const handleReviewChange = (e) => {
//     setReviewText(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault(); // Prevent default form submission

//     // Create the data object to send to your API or handling function
//     const data = {
//       rating,
//       reviewText,
//     };

//     // Example: Send data to your API or perform other actions
//     console.log("Form submitted with data:", data);

//     // Optionally clear the form
//     setrating(null);
//     setReviewText("");
//   };

//   return (
//     <div>
//         <>
//   {/* Header section start */}
//   <header>
//     <div className="container">
//       <nav className="navbar navbar-expand-lg p-0">
//         <Link href="index.html">
//           <img
//             className="img-fluid logo"
//             src="assets/images/logo.png"
//             alt="logo"
//           />
//         </Link>
//         <Link
//           target="_blank"
//           href="#!"
//           data-bs-toggle="modal"
//           data-bs-target="#location"
//           className="btn btn-sm theme-btn location-btn mt-0 ms-3 d-flex align-content-center gap-1"
//           style={{ background: "#dff5ff", color: "#000" }}
//         >
//           <i className="ri-map-pin-line" style={{ color: "#01b2fe" }} /> 30
//           Highwood Avenue...
//         </Link>
//         <button
//           className="navbar-toggler ml-auto"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#offcanvasNavbar"
//         >
//           <span className="navbar-toggler-icon">
//             <i className="ri-menu-line" />
//           </span>
//         </button>
//         <div className="nav-option order-md-2">
//           <div className="nav-option order-md-2">
//             <div className="tab">
//               <div className="d-flex text-center">
//                 <Link
//                   className="tablinks active"
//                   style={{ width: "auto", padding: "7px 20px" }}
//                 >
//                   <p className="f-12">
//                     <i className="fa fa-motorcycle" /> Delivery
//                   </p>{" "}
//                   <p className="smtext">35 - 50 Min</p>
//                 </Link>
//                 <Link
//                   className="tablinks"
//                   style={{ width: "auto", padding: "7px 20px" }}
//                 >
//                   <p className="f-12">
//                     <i className="fa fa-shopping-bag" aria-hidden="true" />{" "}
//                     Collection{" "}
//                   </p>{" "}
//                   <p className="smtext">15 - 25 Min</p>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div
//           className="offcanvas offcanvas-end"
//           tabIndex={-1}
//           id="offcanvasNavbar"
//         >
//           <div className="offcanvas-header">
//             <h4
//               className="offcanvas-title"
//               id="offcanvasNavbarLabel"
//               style={{ fontWeight: 600 }}
//             >
//               Menu
//             </h4>
//             {/*<button class="navbar-toggler btn-close" id="offcanvas-close"></button>*/}
//             <button
//               className="navbar-toggler btn-close"
//               data-bs-toggle="collapse"
//               data-bs-target="#offcanvasNavbar"
//             />
//           </div>
//           <div className="offcanvas-body">
//             <ul className="navbar-nav justify-content-center flex-grow-1">
//               <li className="nav-item">
//                 <Link className="nav-link" href="index.html">
//                   Home
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" href="dining.html">
//                   Dining
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" href="offer.html">
//                   Offers{" "}
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" href="#">
//                   About Us
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" href="#">
//                   Contact
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </div>
//   </header>
//   {/* Header Section end */}
//   <section className="section-t-space section-b-space mytabb overflow-hidden pt-120">
//   <div className="container mt-5">
//       <h2 className="mb-4">Give Rating</h2>
//       <form id="review-form" onSubmit={handleSubmit}>
//         <div className="form-group d-flex mb-3">
//         <StarWrapper>
//       {[1, 2, 3, 4, 5].map((num) => (
//         <Star
//           key={num}
//           active={num <= rating}
//           onClick={() => handleClick(num)}
//         >
//           ★
//         </Star>
//       ))}
//     </StarWrapper>
//         </div>
//         <p id="starsInfo" className="help-block mb-3">
//           Click on a star to give your rating.
//         </p>
//         <div className="form-group mb-3">
//           <h2 className="mb-2">Write your Review</h2>
//           <textarea
//             className="form-control"
//             rows={5}
//             placeholder="Your Review"
//             name="review"
//             id="review"
//             value={reviewText}
//             onChange={handleReviewChange}
//             required
//           />
//         </div>
//         <button
//           id="submit"
//           type="submit"
//           className="btn btn-primary"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   </section>
//   <section className="page-head-section">
//     <div className="container page-heading">
//       <h2 className="h3 mb-3 text-white text-center">Add Review</h2>
//       <nav aria-label="breadcrumb">
//         <ol className="breadcrumb flex-lg-nowrap justify-content-center justify-content-lg-star">
//           <li className="breadcrumb-item">
//             <Link href="index.html">
//               <i className="ri-home-line" />
//               Home
//             </Link>
//           </li>
//           <li className="breadcrumb-item active" aria-current="page">
//             Add Review
//           </li>
//         </ol>
//       </nav>
//     </div>
//   </section>
//   <section className="section-b-space">
//   <div className="container mt-5">
//       <h2 className="mb-4">Give Rating</h2>
//       <form id="review-form" onSubmit={handleSubmit}>
//         <div className="form-group d-flex mb-3">
//           {[1, 2, 3, 4, 5].map(num => (
//             <div className="form-check-inline mx-2" key={num}>
//               <label className="form-check-label" htmlFor={`rating-${num}`}>
//                 <input
//                   type="radio"
//                   id={`rating-${num}`}
//                   value={num}
//                   name="rating"
//                   className="form-check-input"
//                   checked={rating === num}
//                   onChange={handleRatingChange}
//                 />
//                 <span className={`wpcomment-input-option-label wpcomment-label-radio ${num <= rating ? 'text-warning' : ''}`}>
//                   {num}
//                 </span>
//               </label>
//             </div>
//           ))}
//         </div>
//         <p id="starsInfo" className="help-block mb-3">
//           Click on a star to give your rating.
//         </p>
//         <div className="form-group mb-3">
//           <h2 className="mb-2">Write your Review</h2>
//           <textarea
//             className="form-control"
//             rows={5}
//             placeholder="Your Review"
//             name="review"
//             id="review"
//             value={reviewText}
//             onChange={handleReviewChange}
//             required
//           />
//         </div>
//         <button
//           id="submit"
//           type="submit"
//           className="btn btn-primary"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   </section>
//   {/* footer section starts */}
//   <footer className="footer-section section-t-space">
//     <div className="subscribe-section border-bottom">
//       <div className="container">
//         <div className="row">
//           <div className="col-lg-12">
//             <div className="subscribe-part">
//               <h5>
//                 Don't pass up our fantastic discounts. email offers from all of
//                 our best eateries
//               </h5>
//               <div className="position-relative w-100">
//                 <input
//                   type="email"
//                   className="form-control subscribe-form-control"
//                   placeholder="Enter your Email"
//                 />
//                 <Link href="#" className="btn theme-btn subscribe-btn mt-0">
//                   Subscribe Now
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="container">
//       <div className="main-footer border-bottom">
//         <div className="row g-3">
//           <div className="col-xl-4 col-lg-12">
//             <div className="footer-logo-part">
//               <h5 className="footer-title">About Us</h5>
//               <p>
//                 Welcome to our online order website! Here, you can browse our
//                 wide selection of products and place orders from the comfort of
//                 your own home.
//               </p>
//               <div className="social-media-part">
//                 <ul className="social-icon">
//                   <li>
//                     <Link href="https://www.facebook.com/login/">
//                       <i className="ri-facebook-fill icon" />
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="https://twitter.com/i/flow/login">
//                       <i className="ri-twitter-fill icon" />
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="https://www.linkedin.com/login/">
//                       <i className="ri-linkedin-fill icon" />
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="https://www.instagram.com/accounts/login/">
//                       <i className="ri-instagram-fill icon" />
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="https://www.youtube.com/">
//                       <i className="ri-youtube-fill icon" />
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//           <div className="col-xl-8">
//             <div className="row g-3">
//               <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12">
//                 <h5 className="footer-title">Important</h5>
//                 <ul className="content">
//                   <li>
//                     <Link href="about.html">
//                       <h6>About us</h6>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="contact.html">
//                       <h6>Contact us</h6>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="offer.html">
//                       <h6>Offer</h6>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="#">
//                       <h6>FAQs</h6>
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//               <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12">
//                 <h5 className="footer-title">Top Cuisine</h5>
//                 <ul className="content">
//                   <li>
//                     <Link href="#">
//                       <h6>Chinese</h6>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="#">
//                       <h6>Fish &amp; Chips</h6>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="#">
//                       <h6>Pizza</h6>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="#">
//                       <h6>Italian</h6>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="#">
//                       <h6>Indian</h6>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="#">
//                       <h6>View all cuisines</h6>
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//               <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12">
//                 <h5 className="footer-title">Top Brands</h5>
//                 <ul className="content">
//                   <li>
//                     <Link href="restaurant-details.html">
//                       <h6>PizzaBoy</h6>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="restaurant-details.html">
//                       <h6>Saladish</h6>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="restaurant-details.html">
//                       <h6>IcePops</h6>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="restaurant-details.html">
//                       <h6>Maxican Hoy</h6>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="restaurant-details.html">
//                       <h6>La Foodie</h6>
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//               <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12">
//                 <h5 className="footer-title">Customer services</h5>
//                 <ul className="content">
//                   <li>
//                     <Link href="my-order.html">
//                       <h6>Log in</h6>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="wishlist.html">
//                       <h6>Sign up</h6>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="checkout.html">
//                       <h6>My account</h6>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="setting.html">
//                       <h6>Settings</h6>
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="bottom-footer-part">
//         <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
//           <h6>@ Copyright 2024 Food Delivery. All rights Reserved.</h6>
//           <img
//             className="img-fluid cards"
//             src="assets/images/icons/footer-card.png"
//             alt="card"
//           />
//         </div>
//       </div>
//     </div>
//   </footer>
//   {/* footer section end */}
//   {/* mobile fix menu start */}
//   <div className="mobile-menu d-md-none d-block mobile-cart">
//     <ul>
//       <li className="active">
//         <Link href="index.html" className="menu-box">
//           <i className="ri-home-4-line" />
//           <span>Home</span>
//         </Link>
//       </li>
//       <li className="mobile-category">
//         <Link href="#!" className="menu-box">
//           <i className="fa fa-cutlery mb-2 pt-1" />
//           <span>Dining</span>
//         </Link>
//       </li>
//       <li>
//         <Link href="history.html" className="menu-box">
//           <i className="ri-apps-line" />
//           <span>History</span>
//         </Link>
//       </li>
//       <li>
//         <Link href="setting.html" className="menu-box">
//           <i className="fa fa-user mb-2 pt-1" />
//           <span>Setting</span>
//         </Link>
//       </li>
//     </ul>
//   </div>
//   {/* mobile fix menu end */}
//   {/* location offcanvas start */}
//   <div
//     className="modal fade location-modal"
//     id="location"
//     data-bs-backdrop="static"
//     data-bs-keyboard="false"
//     tabIndex={-1}
//   >
//     <div className="modal-dialog modal-dialog-centered">
//       <div className="modal-content">
//         <div className="modal-header">
//           <div className="modal-title">
//             <h5 className="fw-semibold">Select a Location</h5>
//             <button
//               type="button"
//               className="btn-close"
//               data-bs-dismiss="modal"
//               aria-label="Close"
//             />
//           </div>
//         </div>
//         <div className="modal-body">
//           <div className="search-section">
//             <form className="form_search" role="form">
//               <input
//                 type="search"
//                 placeholder="Search Location"
//                 className="nav-search nav-search-field"
//               />
//             </form>
//           </div>
//           <Link href="#!" className="current-location">
//             <div className="current-address">
//               <i className="ri-focus-3-line focus" />
//               <div>
//                 <h5>Use current-location</h5>
//                 <h6>Wellington St., Ottawa, Ontario, Canada</h6>
//               </div>
//             </div>
//             <i className="ri-arrow-right-s-line arrow" />
//           </Link>
//           <h5 className="mt-sm-3 mt-2 fw-medium recent-title dark-text">
//             Recent Location
//           </h5>
//           <Link href="#!" className="recent-location">
//             <div className="recant-address">
//               <i className="ri-map-pin-line theme-color" />
//               <div>
//                 <h5>Bayshore</h5>
//                 <h6>kingston St., Ottawa, Ontario, Canada</h6>
//               </div>
//             </div>
//           </Link>
//         </div>
//         <div className="modal-footer">
//           <Link href="#" className="btn gray-btn" data-bs-dismiss="modal">
//             Close
//           </Link>
//           <Link href="#" className="btn theme-btn mt-0" data-bs-dismiss="modal">
//             Save
//           </Link>
//         </div>
//       </div>
//     </div>
//   </div>
//   {/* location offcanvas end */}
//   {/* tap to top start */}
//   <button className="scroll scroll-to-top">
//     <i className="ri-arrow-up-s-line arrow" />
//   </button>
//   {/* tap to top end */}
//   {/* responsive space */}
//   <div className="responsive-space" />
//   {/* responsive space */}
//   {/* bootstrap js */}
//   {/* footer accordion js */}
//   {/* loader js */}
//   {/* swiper js */}
//   {/* script js */}
// </>

//     </div>
//   )
// }

// export default Review
