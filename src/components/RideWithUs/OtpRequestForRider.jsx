import React, { useState, useRef } from "react";
import { getOtpForRider } from "../../utils/api";
import "./otp.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const OtpRequestForRider = ({ formData, data }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);
  const email = formData.email;
  const navigate = useNavigate();

  const dataAll = {
    pkid: data?.pkid,
    email: formData?.email,
    otp: otp.join(""),
  };

  const handleInputChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input
    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const verifyOTP = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length === 6) {
      try {
        const response = await getOtpForRider(dataAll);
        if (response && response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "OTP Verified",
            text: "OTP verified successfully!",
            confirmButtonText: "OK",
            confirmButtonColor: "rgb(232, 65, 53)",
          }).then(() => {
            navigate("/shop");
          });
        }
      } catch (error) {
        console.error("Error verifying OTP:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while verifying OTP. Please try again.",
          confirmButtonText: "Retry",
          confirmButtonColor: "rgb(232, 65, 53)",
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Invalid OTP",
        text: "Please enter a 6-digit OTP.",
        confirmButtonText: "OK",
        confirmButtonColor: "rgb(232, 65, 53)",
      });
    }
  };

  return (
    <div className="container1">
      <p>
        Enter the OTP you received to{" "}
        <span id="email" style={{ color: "#e84135" }}>
          {email}
        </span>
      </p>
      <div className="otp-input">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="number"
            min="0"
            max="9"
            value={digit}
            onChange={(e) => handleInputChange(e.target.value, index)}
            onKeyDown={(e) => handleBackspace(e, index)}
            ref={(el) => (inputsRef.current[index] = el)}
            style={{ border: "1px solid #e84135" }}
          />
        ))}
      </div>
      <button
        onClick={verifyOTP}
        style={{ background: "#e84135", border: "2px solid #e84135" }}
      >
        Verify
      </button>
    </div>
  );
};

export default OtpRequestForRider;
