import React, { useState } from "react";
import { AddRestaurant, verifyotps, Checkotp } from "../utils/api";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
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
          name === "confirmPassword" ? value : formData.confirmPassword
        );
      }

      // Fetch location suggestions for "location" field
      if (name === "location" && value.length > 2) {
        try {
          const response = await axios.get(
            `https://partnermeatwala.com/api/customer/geolocation`,
            {
              params: { query: value, type: "regions" },
            }
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
        { params: { place: description } }
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
        error.response?.data || error
      );
    }
  };

  const validatePasswordMatch = (password, confirmPassword) => {
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
          document.body.classList.remove("modal-open"); // Remove Bootstrap modal-open class
          document
            .querySelectorAll(".modal-backdrop")
            .forEach((el) => el.remove()); // Remove any remaining modal backdrops
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
              text: addRestaurantResponse.returnmsg,
              confirmButtonColor: "rgb(232, 65, 53)",
            });
            // window.location.reload();
          } else {
            Swal.fire({
              icon: "error",
              title: "Registration Failed",
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
                Registration
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                {/* Business Name */}
                <div className="mb-2">
                  <label className="form-labels">Business Name*</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Business Name"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Contact Number */}
                <div className="mb-2">
                  <label className="form-labels">Contact No*</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Contact No"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-2">
                  <label className="form-labels">Email*</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="e.g. test111@gmail.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Location */}
                {/* Location */}
                <div className="mb-2 position-relative">
                  <label className="form-labels">Location*</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                  {isSuggestionVisible && suggestions.length > 0 && (
                    <ul
                      className="list-group position-absolute w-100"
                      style={{ zIndex: 1000 }}
                    >
                      {suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className="list-group-item list-group-item-action"
                          onClick={() =>
                            handleSuggestionClick(suggestion.description)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          {suggestion.description}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Type */}
                <div className="mb-2">
                  <label className="form-labels">Type*</label>
                  <select
                    style={{ border: "1px solid" }}
                    className="form-select"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select One</option>
                    {/* <option value="RESTAURANT">RESTAURANT</option> */}
                    <option value="CAFÉ">GROCERY</option>
                  </select>
                </div>

                {/* Upload Documents */}
                <div className="mb-2">
                  <label className="form-labels">
                    Upload Menu or Product List
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="file"
                    accept=".png, .jpg, .jpeg, .pdf"
                    onChange={handleChange}
                  />
                  <small className="text-muted">
                    Accepts .png, .jpg, .jpeg, .pdf files under 10MB.
                  </small>
                </div>

                {/* Password */}
                <div className="mb-2">
                  <label className="form-labels">Password*</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div className="mb-2">
                  <label className="form-labels">Confirm Password*</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  {passwordError && (
                    <small className="text-danger">{passwordError}</small>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className="form-check mb-2">
                  <input
                    style={{ border: "1px solid" }}
                    type="checkbox"
                    className="form-check-input"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label">
                    By checking this box, you confirm that you have read and
                    agree to our Terms & Conditions{" "}
                  </label>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn theme-btn w-100">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {isOtpModalVisible && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          aria-labelledby="otpModalLabel"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="otpModalLabel">
                  Verify OTP
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setOtpModalVisible(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>{otpSentMessage}</p>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  onClick={handleOtpSubmit}
                  style={{ backgroundColor: "#e84135" }}
                >
                  Verify OTP
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
