import React, { useState } from "react";
import { sendRequestForRider } from "../../utils/api";
import OtpRequestForRider from "./OtpRequestForRider";
import { DriverVehicle } from "../../utils/api";
import { Link } from "react-router-dom";
import Swal from "sweetalert";
import backImage from "../../assets/meatwalarider.jpeg";
const RideWithUsForm = () => {
  const [showMore, setShowMore] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    address: "",
    postcode: "", // Added postcode validation
    password: "",
    confirmPassword: "",
  });
  const [acknowledge, setAcknowledge] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    postcode: "", // Added postcode error
    city: "",
    password: "",
    confirmPassword: "",
    acknowledge: "",
  });
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [data, setData] = useState(null);
  const [driverId, setDriverId] = useState(null);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const shortText = `We use this information exclusively to process`;
  const fullText = `We use this information exclusively to process and review your application to become a courier. By checking this box, you confirm that you have read and agree to our Privacy Policy.`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setAcknowledge(e.target.checked);
  };

  const validateForm = () => {
    const {
      name,
      email,
      mobile,
      city,
      address,
      password,
      postcode,
      confirmPassword,
    } = formData;
    let formErrors = {
      name: "",
      email: "",
      mobile: "",
      address: "",
      city: "",
      postcode: "", // Added postcode
      password: "",
      confirmPassword: "",
      acknowledge: "",
    };

    if (!name) formErrors.name = "Name is required.";
    if (!email) formErrors.email = "Email is required.";
    if (email && !/\S+@\S+\.\S+/.test(email))
      formErrors.email = "Invalid email address.";
    if (!mobile) formErrors.mobile = "Mobile number is required.";
    if (!city) formErrors.city = "City is required.";
    if (!address) formErrors.address = "Address is required.";
    if (!postcode) formErrors.postcode = "Postcode is required.";
    if (!password) formErrors.password = "Password is required.";
    if (password && password.length < 6)
      formErrors.password = "Password must be at least 6 characters long.";
    if (password !== confirmPassword)
      formErrors.confirmPassword = "Passwords do not match.";
    if (!acknowledge)
      formErrors.acknowledge = "Please acknowledge the Privacy Policy.";

    setErrors(formErrors);

    // Return whether there are any errors
    return Object.values(formErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.mobile && !formData.mobile.startsWith("+44")) {
      if (formData.mobile.startsWith("0")) {
        // Replace leading 0 with +44
        formData.mobile = `+44${formData.mobile.slice(1)}`;
      } else {
        formData.mobile = `+44${formData.mobile}`;
      }
    }

    const validationError = validateForm();
    if (validationError) {
      return;
    }
    try {
      const res = await sendRequestForRider(formData);
 
      setDriverId(res?.pkid);
      setData(res);

      if (res.success === "1") {
        setShowOtpModal(true);
      } else {
        // Swal({
        //     title: "Error",
        //     text: res.returnmsg || "Something went wrong. Please try again.",
        //     icon: "error",
        //     button: "OK",
        // });
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      Swal({
        title: "Submission Error",
        text: "Failed to submit the form. Please try again later.",
        icon: "error",
        button: "OK",
      });
    }
  };

  const handleOtpVerificationSuccess = () => {
    setShowOtpModal(false);
    alert("OTP verified successfully!");
  };



  return (
    <section
      id="home"
      className="form-section1"
      style={{
        backgroundImage: `url(${backImage})`,
        backgroundPosition:"top"
      }}
    >
      <div className="form-container1">
        <form className="auth-form1" onSubmit={handleSubmit}>
          <h3 className="form-title1">Apply to become a courier</h3>
          <div className="form-group1">
            <input
              type="text"
              className="form-input1"
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error1">{errors.name}</span>}
          </div>
          <div className="form-group1">
            <input
              type="email"
              className="form-input1"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error1">{errors.email}</span>}
          </div>
          <div className="form-group1">
            <input
              type="text"
              className="form-input1"
              placeholder="Phone Number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
            {errors.mobile && <span className="error1">{errors.mobile}</span>}
          </div>
          <div className="form-group1">
            <input
              type="text"
              className="form-input1"
              placeholder="Add Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <span className="error1">{errors.address}</span>}
          </div>

          <div className="form-group1">
            <input
              type="text"
              className="form-input1"
              placeholder="Postcode"
              name="postcode"
              value={formData.postcode}
              onChange={handleChange}
            />
            {errors.postcode && (
              <span className="error1">{errors.postcode}</span>
            )}
          </div>

          <div className="form-group1">
  <input
    type="text"
    className="form-input1"
    name="city"
    placeholder="Enter City"
    value={formData.city}
    onChange={handleChange}
  />
  {errors.city && <span className="error1">{errors.city}</span>}
</div>

          <div className="form-group1">
            <input
              type="password"
              className="form-input1"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="error1">{errors.password}</span>
            )}
          </div>
          <div className="form-group1">
            <input
              type="password"
              className="form-input1"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className="error1">{errors.confirmPassword}</span>
            )}
          </div>
          <div className="form-group1">
            <label className="checkbox-label1">
              <input
                type="checkbox"
                checked={acknowledge}
                onChange={handleCheckboxChange}
              />{" "}
              {showMore ? fullText : shortText}
            </label>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "5px",
              }}
            >
              <span
                style={{
                  cursor: "pointer",
                  color: "rgb(255,128,0)",
                }}
                onClick={toggleShowMore}
              >
                {showMore ? "Show Less" : "Show More"}
              </span>
              <Link
                to={"/driver"}
                style={{
                  color: "rgb(255,128,0)",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                }}
              >
                Already applied?
              </Link>
            </div>
            {errors.acknowledge && (
              <span className="error1">{errors.acknowledge}</span>
            )}
          </div>
          <button type="submit" className="btn theme-btn">
            Apply
          </button>
        </form>
      </div>

      {showOtpModal && (
        <div
          className="otp-modal"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="otp-modal-content"
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "500px",
            }}
          >
            <OtpRequestForRider
              formData={formData}
              data={data}
              onOtpVerificationSuccess={handleOtpVerificationSuccess}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default RideWithUsForm;
