import React, { useState } from "react";
import { AddRestaurant, verifyotps, Checkotp } from "../utils/api";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import OtpRequestForPartner from "./RideWithUs/OtpRequestForPartner";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    contactNo: "",
    email: "",
    location: "",
    type: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
    file: null,
    lat: null,
    lng: null,
  });
  const [otp, setOtp] = useState("");

  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionVisible, setIsSuggestionVisible] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isOtpModalVisible, setOtpModalVisible] = useState(false);
  const [otpSentMessage, setOtpSentMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = async (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file && file.size > 10 * 1024 * 1024) {
        alert("File size must not exceed 10MB.");
        return;
      }
      setFormData({
        ...formData,
        file: file,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });

      if (name === "password" || name === "confirmPassword") {
        validatePasswordMatch(
          name === "password" ? value : formData.password,
          name === "confirmPassword" ? value : formData.confirmPassword,
        );
      }

      // Fetch location suggestions for "location" field
      if (name === "location" && value.length > 2) {
        try {
          const response = await axios.get(
            `https://partnermeatwala.com/api/customer/geolocation`,
            {
              params: { query: value, type: "regions" },
            },
          );
          setSuggestions(response.data.predictions || []);
          setIsSuggestionVisible(true);
        } catch (error) {
          console.error("Error fetching location suggestions:", error);
        }
      } else if (name === "location" && value.length <= 2) {
        setSuggestions([]);
        setIsSuggestionVisible(false);
      }
    }
  };

  const handleSuggestionClick = async (description) => {
    setFormData({
      ...formData,
      location: description,
    });
    setSuggestions([]);
    setIsSuggestionVisible(false);

    try {
      const response = await axios.get(
        `https://partnermeatwala.com/api/customer/geocode`,
        { params: { place: description } },
      );

      if (response.data.status === "OK" && response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        setFormData((prev) => ({ ...prev, lat, lng }));
      } else {
        console.error("Invalid geocode response:", response.data);
      }
    } catch (error) {
      console.error(
        "Error fetching geolocation:",
        error.response?.data || error,
      );
    }
  };

  // const validatePasswordMatch = (password, confirmPassword) => {
  //   if (confirmPassword && password !== confirmPassword) {
  //     setPasswordError("Passwords do not match.");
  //   } else {
  //     setPasswordError("");
  //   }
  // };

  const validatePasswordMatch = (password, confirmPassword) => {
    if (password.length < 10) {
      setPasswordError("Password must be at least 10 characters long.");
      return;
    }

    if (confirmPassword && password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
    } else {
      setPasswordError("");
    }
  };

  const handleVerifyOtp = async () => {
    const payload = { email: formData.email };
    try {
      const res = await verifyotps(payload);
      if (res && res.success === "1") {
        const message = res.returnmsg || "OTP Sent Successfully.";
        setOtpSentMessage(message);
        setOtpModalVisible(true);

        const registrationModal = document.getElementById("registrationModal");
        const bootstrapModal =
          window.bootstrap.Modal.getInstance(registrationModal);
        bootstrapModal.hide();
      } else {
        const errorMessage =
          res?.returnmsg || "Failed to send OTP. Please try again.";
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorMessage,
          confirmButtonColor: "rgb(232, 65, 53)",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while sending OTP. Please try again later.",
        footer: `<a href="#">${
          error.message || "More info about this error"
        }</a>`,
        confirmButtonColor: "rgb(232, 65, 53)",
      });
      console.error("Error sending OTP:", error);
    }
  };

  const handleOtpSubmit = async () => {
    const payload = { email: formData.email, otp: otp };
    try {
      const res = await Checkotp(payload);

      if (res && res.success === "1") {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.returnmsg,
          confirmButtonColor: "rgb(232, 65, 53)",
        });
        setOtpModalVisible(false);
        setTimeout(() => {
          const otpModalElement = document.querySelector(".modal.show");
          if (otpModalElement) {
            const modalInstance =
              window.bootstrap.Modal.getInstance(otpModalElement);
            if (modalInstance) {
              modalInstance.hide();
            }
          }
          document.body.classList.remove("modal-open");
          document
            .querySelectorAll(".modal-backdrop")
            .forEach((el) => el.remove());
        }, 300);

        const data = {
          businessName: formData.businessName,
          contactNo: formData.contactNo,
          email: formData.email,
          location: formData.location,
          type: formData.type,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          file: formData.file,
          bannerext: "",
          uploadimage: "",
          proofimage: "",
          menuimage: "",
          hyginimage: "",
          uploadname: "",
          proofname: "",
          menuname: "",
          hyginename: "",
          logoname: "",
          bannername: "",
          uploadext: "",
          proofext: "",
          menuext: "",
          hyginext: "",
          bannerimage: "",
          proofimage: "",
          menuimage: "",
          hygineimage: "",
          // lat: formData.lat.toString() || "",
          // lng: formData.lng.toString() || "",
          lat: formData.lat ? formData.lat.toString() : "",
          lng: formData.lng ? formData.lng.toString() : "",
          logono: "",
          name: "",
          menuno: "",
          logodoc: "",
          logoext: "",
          menudoc: "",
          proofno: "",
          bannerno: "",
          hygineno: "",
          proofdoc: "",
          uploadno: "",
          bannerdoc: "",
          hyginedoc: "",
          hygineext: "",
          logoimage: "",
          uploaddoc: "",
        };

        // Send data to addRestaurant API
        try {
          const addRestaurantResponse = await AddRestaurant(data);
          if (addRestaurantResponse && addRestaurantResponse.success === "1") {
            Swal.fire({
              icon: "success",
              title: "Registration Successful",
              text:
                addRestaurantResponse?.returnmsg || "Registration Successful",
              confirmButtonColor: "rgb(232, 65, 53)",
            });
            // window.location.reload();
          } else {
            Swal.fire({
              icon: "error",
              title: "Registration Failed here",
              text: "Something went wrong. Please try again.",
              confirmButtonColor: "rgb(232, 65, 53)",
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "An error occurred while registering the restaurant.",
            confirmButtonColor: "rgb(232, 65, 53)",
          });
          console.error("Error adding restaurant:", error);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid OTP",
          text: "Please try again.",
          confirmButtonColor: "rgb(232, 65, 53)",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while verifying OTP.",
        confirmButtonColor: "rgb(232, 65, 53)",
      });
      console.error("Error verifying OTP:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleVerifyOtp();
  };

  const cleanupModalBackdrops = () => {
    document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
    document.body.classList.remove("modal-open");
  };

  const onOtpVerified = async () => {
    closeAllPopups(); // MOST IMPORTANT LINE

    const data = {
      businessName: formData.businessName,
      contactNo: formData.contactNo,
      email: formData.email,
      location: formData.location,
      type: formData.type,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      file: formData.file,
      lat: formData.lat ? formData.lat.toString() : "",
      lng: formData.lng ? formData.lng.toString() : "",
    };

    const res = await AddRestaurant(data);

  };

  const closeAllPopups = () => {
    setOtpModalVisible(false);

    const modalEl = document.getElementById("registrationModal");
    if (modalEl) {
      const instance = window.bootstrap.Modal.getInstance(modalEl);
      if (instance) instance.hide();
    }

    document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());

    document.body.classList.remove("modal-open");
    document.body.style.overflow = "auto";
  };

  return (
    <div className="container">
      <div
        className="modal fade"
        id="registrationModal"
        tabIndex="-1"
        aria-labelledby="registrationModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="registrationModalLabel">
                Partner Registration
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit} noValidate>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12 col-md-6 mt-2">
                      {/* <label htmlFor="businessName" className="form-label" style={{ color: "red" }}>Business Name *</label> */}
                      <input
                        id="businessName"
                        name="businessName"
                        type="text"
                        className="form-control"
                        placeholder="Business Name"
                        value={formData.businessName}
                        onChange={handleChange}
                        required
                        aria-required="true"
                      />
                    </div>

                    <div className="col-12 col-md-6 mt-2">
                      {/* <label htmlFor="contactNo" className="form-label" style={{ color: "red" }}>Contact No *</label> */}
                      {/* <input
                        id="contactNo"
                        name="contactNo"
                        type="tel"
                        inputMode="tel"
                        className="form-control"
                        placeholder="Phone Number"
                        value={formData.contactNo}
                        onChange={handleChange}
                        required
                      /> */}
                      {/* <input
                        id="contactNo"
                        name="contactNo"
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        className="form-control"
                        placeholder="Phone Number"
                        value={formData.contactNo}
                        maxLength={15}
                        onChange={(e) => {
                          const onlyNumbers = e.target.value.replace(
                            /[^0-9]/g,
                            "",
                          );
                          setFormData({
                            ...formData,
                            contactNo: onlyNumbers,
                          });
                        }}
                        onPaste={(e) => {
                          e.preventDefault();
                          const pasted = e.clipboardData
                            .getData("text")
                            .replace(/[^0-9]/g, "");
                          setFormData({
                            ...formData,
                            contactNo: pasted,
                          });
                        }}
                        required
                      /> */}
                      <input
                        id="contactNo"
                        name="contactNo"
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        className="form-control"
                        placeholder="Phone Number"
                        value={formData.contactNo}
                        maxLength={11}
                        onChange={(e) => {
                          const onlyNumbers = e.target.value.replace(/\D/g, "");

                          // allow only up to 11 digits
                          if (onlyNumbers.length <= 11) {
                            setFormData({
                              ...formData,
                              contactNo: onlyNumbers,
                            });
                          }
                        }}
                        onPaste={(e) => {
                          e.preventDefault();
                          const pasted = e.clipboardData
                            .getData("text")
                            .replace(/\D/g, "")
                            .slice(0, 11);

                          setFormData({
                            ...formData,
                            contactNo: pasted,
                          });
                        }}
                        required
                      />
                      {formData.contactNo.length > 0 &&
                        formData.contactNo.length !== 11 && (
                          <small className="text-danger">
                            Phone number must be exactly 11 digits
                          </small>
                        )}
                    </div>

                    <div className="col-12 col-md-6 mt-3">
                      {/* <label htmlFor="email" className="form-label" style={{ color: "red" }}>Email *</label> */}
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <div className="form-text">
                        We will send an OTP to this email for verification.
                      </div>
                    </div>

                    <div className="col-12 col-md-6 mt-3">
                      {/* <label htmlFor="type" className="form-label" style={{ color: "red" }}>Type *</label> */}
                      <select
                        id="type"
                        name="type"
                        className="form-select"
                        value={formData.type}
                        onChange={handleChange}
                        style={{ border: "1px solid black" }}
                        required
                      >
                        <option value="">Choose...</option>
                        {/* <option value="RESTAURANT">Restaurant</option> */}
                        <option value="GROCERY">Grocery</option>
                        {/* <option value="CAFE">Cafe</option> */}
                      </select>
                    </div>

                    <div
                      className="col-12 col-md-6 position-relative mt-3"
                      style={{ zIndex: 1100 }}
                    >
                      {/* <label htmlFor="location" className="form-label" style={{ color: "red" }}>Location *</label> */}
                      <input
                        id="location"
                        name="location"
                        type="text"
                        className="form-control"
                        placeholder="eg. 123 High Street"
                        value={formData.location}
                        onChange={handleChange}
                        aria-autocomplete="list"
                        aria-controls="location-suggestions"
                        aria-expanded={isSuggestionVisible}
                        required
                      />
                      {isSuggestionVisible && suggestions?.length > 0 && (
                        <ul
                          id="location-suggestions"
                          role="listbox"
                          className="list-group position-absolute w-100 mt-1 shadow-sm"
                          style={{ maxHeight: 220, overflowY: "auto" }}
                        >
                          {suggestions.map((s, idx) => (
                            <li
                              key={idx}
                              role="option"
                              aria-selected="false"
                              className="list-group-item list-group-item-action"
                              onClick={() =>
                                handleSuggestionClick(s.description)
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter")
                                  handleSuggestionClick(s.description);
                              }}
                              tabIndex={0}
                              style={{ cursor: "pointer" }}
                            >
                              {s.description}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="col-12 col-md-6 mt-3">
                      {/* <label style={{ color: "red" }} htmlFor="file" className="form-label">Upload Menu or Product List</label> */}
                      <input
                        id="file"
                        name="file"
                        type="file"
                        className="form-control"
                        accept=".png, .jpg, .jpeg, .pdf"
                        onChange={handleChange}
                        aria-describedby="fileHelp"
                      />
                      <div id="fileHelp" className="form-text">
                        Logo here...
                      </div>
                    </div>

                    <div className="col-12 col-md-6 mt-2">
                      {/* <label htmlFor="password" style={{ color: "red" }} className="form-label">Password *</label> */}
                      {/* <input
                        id="password"
                        name="password"
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        aria-required="true"
                      /> */}
                      <input
                        id="password"
                        name="password"
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={formData.password}
                        minLength={10}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6 mt-2">
                      {/* <label htmlFor="confirmPassword" className="form-label" style={{ color: "red" }}>Confirm Password *</label> */}
                      {/* <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        className="form-control"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      /> */}
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        className="form-control"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        minLength={10}
                        onChange={handleChange}
                        required
                      />
                      {passwordError && (
                        <div className="form-text text-danger">
                          {passwordError}
                        </div>
                      )}
                    </div>

                    <div className="col-12 mt-2">
                      <div className="form-check">
                        <input
                          id="termsCheckbox"
                          name="termsAccepted"
                          className="form-check-input"
                          type="checkbox"
                          checked={formData.termsAccepted}
                          onChange={handleChange}
                          required
                        />
                        <label
                          className="form-check-label"
                          htmlFor="termsCheckbox"
                        >
                          I agree to the{" "}
                          <Link
                            to="/terms-of-service"
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: "red" }}
                          >
                            Terms &amp; Conditions
                          </Link>
                        </label>
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="col-12 mt-2">
                      <div className="d-grid">
                        <button
                          type="submit"
                          className="btn btn-danger btn-lg"
                          disabled={!formData.termsAccepted}
                          aria-disabled={!formData.termsAccepted}
                          title={
                            !formData.termsAccepted
                              ? "Please accept Terms & Conditions to proceed"
                              : "Submit & Verify Email"
                          }
                          style={{
                            cursor: formData.termsAccepted
                              ? "pointer"
                              : "not-allowed",
                            opacity: formData.termsAccepted ? 1 : 0.6,
                          }}
                        >
                          Submit &amp; Verify Email
                        </button>
                      </div>

                      {/* optional inline helper message */}
                      {!formData.termsAccepted && (
                        <small className="text-muted d-block mt-2">
                          You must accept the Terms &amp; Conditions before
                          submitting.
                        </small>
                      )}
                    </div>

                    {/* <div className="col-12 mt-2">
                      <div className="d-grid">
                        <button type="submit" className="btn btn-danger btn-lg">
                          Submit &amp; Verify Email
                        </button>
                      </div>
                    </div> */}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {isOtpModalVisible && (
        <div
          className="otp-modal"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="otp-modal-content"
            style={{
              backgroundColor: "#fff",
              padding: "5px",
              borderRadius: "10px",
              width: "500px",
              zIndex: 10000,
            }}
          >
            <OtpRequestForPartner
              formData={formData}
              // onVerified={() => setOtpModalVisible(false)}
              onVerified={onOtpVerified}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
