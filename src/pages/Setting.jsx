import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { customerdetail } from '../utils/api';
import Profileshow from '../components/Profileshow';
import Footer from '../components/Footer';
import FooterMobileMenu from '../components/FooterMobileMenu';
import Delivery from '../components/delivery';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const API_URL = 'https://partnermeatwala.com/api/customer';

const Setting = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [isModalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
    const fileInputRef = useRef(null);
  const handleShowModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, []);


  const getData = async () => {
    if (!storedUser) {
      navigate('/login');
    }
    try {
      const user = await customerdetail();
  
  
      if (user && user.customerdata && user.customerdata.length > 0) {
        setUser(user.customerdata[0]);
        setName(user.customerdata[0].name);
        setEmail(user.customerdata[0].email);
        setPhoneNumber(user.customerdata[0].mobile);
        setImagePreview(`https://partnermeatwala.com/documents/${user.customerdata[0].imagename}`);
      } else {
        console.warn('No customer data found or customer data array is empty');
        // Navigate('/Login');
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };
  
  useEffect(() => {
    getData();
  }, []);
  
  

  const userUpdate = async () => {
    const formData = new FormData();
    formData.append('pkid', storedUser?.userid);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('mobile', phoneNumber);
    if (image) {
      formData.append('image', image);
    }

    try {
      const res = await axios.post(`${API_URL}/updatecustomerprofile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.status === '1') {
        handleCloseModal(); 
      } else {
        console.log(res.data, "not update");
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update profile');
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input click
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  return (
    <>
      {/* Header section start */}
      <Navbar text={"setting"} />
      {/* Header Section end */}
      <div className="mytabb overflow-hidden pt-120">
        {/* <div className="container text-center">
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
        </div> */}
        <Delivery/>
      </div>
      <section className="page-head-section">
        <div className="container page-heading">
          <h2 className="h3 mb-3 text-white text-center">Setting</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb flex-lg-nowrap justify-content-center justify-content-lg-star">
              <li className="breadcrumb-item">
                <Link href="index.html">
                  <i className="ri-home-line" />
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Setting
              </li>
            </ol>
          </nav>
        </div>
      </section>
      {/* profile section starts */}
      <section className="profile-section section-b-space">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              {/* <div className="profile-sidebar sticky-top">
                <div className="profile-cover">
                  <img
                    className="img-fluid profile-pic"
                    src={`https://partnermeatwala.com/documents/${user.imagename}`}
                    alt="profile"
                  />
                </div>
                <div className="profile-name">
                  <h5 className="user-name">{user.name}</h5>
                  <h6>{user.email}</h6>
                </div>
                <ul className="profile-list">
                  <li className="active">
                    <i className="ri-user-3-line" />
                    <Link href="setting.html">Profile</Link>
                  </li>
                  <li>
                    <i className="ri-shopping-bag-3-line" />
                    <Link href="my-history.html">My History</Link>
                  </li>
                  <li>
                    <i className="ri-map-pin-line" />
                    <Link href="address-book.html">Address Book</Link>
                  </li>
                  <li>
                    <i className="fa fa-heart" />
                    <Link href="favourite.html">Favourite Restaurant</Link>
                  </li>
                  <li>
                    <i className="ri-question-line" />
                    <Link href="#">Help</Link>
                  </li>
                  <li>
                    <i className="ri-logout-box-r-line" />
                    <Link href="log-out">Log Out</Link>
                  </li>
                </ul>
              </div> */}
              <Profileshow selected={"setting"}/>
            </div>
            <div className="col-lg-9">
              <div className="change-profile-content">
                <div className="title">
                  <div className="loader-line" />
                  <h3>Profile</h3>
                </div>
                <ul className="profile-details-list">
                  <li>
                    <div className="profile-content">
                      <div className="d-flex align-items-center gap-sm-2 gap-1">
                        <i className="ri-user-3-fill" />
                        <span>Name :</span>
                      </div>
                      <h6>{name?name:""}</h6>
                    </div>
                    <Link
                      href="#"
                      className="btn theme-outline"
                      onClick={handleShowModal}
                    >
                      Edit
                    </Link>
                  </li>
                  <li>
                    <div className="profile-content">
                      <div className="d-flex align-items-center gap-sm-2 gap-1">
                        <i className="ri-mail-fill" />
                        <span>Email :</span>
                      </div>
                      <h6>{user?.email}</h6>
                    </div>
                  </li>
                  <li>
                    <div className="profile-content">
                      <div className="d-flex align-items-center gap-sm-2 gap-1">
                        <i className="ri-phone-fill" />
                        <span>Phone Number :</span>
                      </div>
                      <h6>{user?.mobile}</h6>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* profile section end */}
      {/* edit profile modal */}
      {isModalVisible && (
        <div
          className="modal fade show"
          style={{ display: 'block' }}
          tabIndex={-1}
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Profile</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                />
              </div>
              <div className="modal-body">
              <div className="form-group">
              <div className="profile-cover" style={{width:"100px"}}>
                    <img
                      className="img-fluid profile-pic"
                      src={imagePreview || `https://partnermeatwala.com/documents/${user.imagename}`} // Show preview or existing image
                      alt="profile"
                      onClick={handleImageClick}
                      style={{ cursor: 'pointer' }}
                    />
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: 'none',                  
                       }}
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
             </div>
                <div className="form-group">
                  <label htmlFor="inputName" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputEmail" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputNumber" className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your number"
                  />
                </div>
                {/* <div className="form-group">
                  <label htmlFor="inputImage" className="form-label">Profile Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="inputImage"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div> */}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn grey-btn theme-outline"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn theme-outline"
                  onClick={userUpdate}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
       <div
    className="modal address-details-modal fade"
    id="log-out"
    tabIndex={-1}
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">
            Logging Out
          </h1>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          <p>Are you Sure, You are logging out</p>
        </div>
        <div className="modal-footer">
          <Link
            href="saved-card.html"
            className="btn gray-btn mt-0"
            data-bs-dismiss="modal"
          >
            CANCEL
          </Link>
          <Link href="index.html" className="btn theme-btn mt-0">
            Log Out
          </Link>
        </div>
      </div>
    </div>
  </div>
  {/* logout modal end */}
  {/* footer section starts */}
  <Footer/>
  {/* footer section end */}
  {/* mobile fix menu start */}
  <FooterMobileMenu selected={"setting"}/>
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
  );
};

export default Setting;
