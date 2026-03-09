import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { customerdetail } from "../utils/api";
import Profileshow from "../components/Profileshow";
import Footer from "../components/Footer";
import FooterMobileMenu from "../components/FooterMobileMenu";
import Delivery from "../components/delivery";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const API_URL = "https://partnermeatwala.com/api/customer";

const Setting = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [isModalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState([]);
  console.log("User", user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef(null);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const handleShowModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  useEffect(() => {
    if (isModalVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalVisible]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getProfileImage = () => {
    if (user?.imagename) {
      return `https://partnermeatwala.com/documents/${user.imagename}`;
    }

    return "assets/images/profile-picture.webp";
  };

  const getData = async () => {
    if (!storedUser) {
      navigate("/login");
    }
    try {
      const user = await customerdetail();

      if (user && user.customerdata && user.customerdata.length > 0) {
        setUser(user.customerdata[0]);
        setName(user.customerdata[0].name);
        setEmail(user.customerdata[0].email);
        setPhoneNumber(user.customerdata[0].mobile);
        setImagePreview(
          `https://partnermeatwala.com/documents/${user.customerdata[0].imagename}`,
        );
      } else {
        console.warn("No customer data found or customer data array is empty");
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const userUpdate = async () => {
    let newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!phoneNumber.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (phoneNumber.length < 10) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append("pkid", storedUser?.userid);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", phoneNumber);

    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await axios.post(
        `${API_URL}/updatecustomerprofile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // if (res.data.status === "1") {
      //   alert("Profile updated successfully");
      //   handleCloseModal();
      //   getData();
      // } else {
      //   alert("Failed to update profile");
      // }
      if (res.data.status === "1") {
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "Your profile has been updated successfully.",
          confirmButtonColor: "rgb(232, 65, 53)",
          timer: 2000,
          showConfirmButton: false,
        });

        handleCloseModal();
        getData();
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "Failed to update profile. Please try again.",
          confirmButtonColor: "rgb(232, 65, 53)",
        });
      }
    } catch (error) {
      console.error("Error:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "rgb(232, 65, 53)",
      });
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
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
      <Navbar text={"setting"} />
      <div className="mytabb overflow-hidden pt-120">
        <Delivery />
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
      <section className="profile-section mt-4 section-b-space">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <Profileshow selected={"setting"} />
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
                      <h6>{name ? name : ""}</h6>
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

      {isModalVisible && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
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
                  <div className="profile-cover" style={{ width: "100px" }}>
                    <img
                      className="img-fluid profile-pic rounded-circle"
                      src={getProfileImage()}
                      alt="profile"
                      onClick={handleImageClick}
                      style={{
                        cursor: "pointer",
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{
                        display: "none",
                      }}
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label
                    htmlFor="inputName"
                    className="form-label"
                    style={{ color: "black" }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors({ ...errors, name: "" });
                    }}
                    placeholder="Enter your name"
                  />

                  {errors.name && (
                    <small style={{ color: "red" }}>{errors.name}</small>
                  )}
                </div>
                <div className="form-group">
                  <label
                    htmlFor="inputEmail"
                    className="form-label"
                    style={{ color: "black" }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors({ ...errors, email: "" });
                    }}
                    placeholder="Enter your email"
                  />

                  {errors.email && (
                    <small style={{ color: "red" }}>{errors.email}</small>
                  )}
                </div>
                <div className="form-group">
                  <label
                    htmlFor="inputNumber"
                    className="form-label"
                    style={{ color: "black" }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputNumber"
                    value={phoneNumber}
                    maxLength={10}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      setPhoneNumber(value);
                      setErrors({ ...errors, phone: "" });
                    }}
                    placeholder="Enter your number"
                  />

                  {errors.phone && (
                    <small style={{ color: "red" }}>{errors.phone}</small>
                  )}
                </div>
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
      <Footer />
      <FooterMobileMenu selected={"setting"} />
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
              <Link
                href="#"
                className="btn theme-btn mt-0"
                data-bs-dismiss="modal"
              >
                Save
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
