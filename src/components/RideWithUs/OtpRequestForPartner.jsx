import React, { useState, useRef, useEffect } from "react";
import { Checkotp } from "../../utils/api";
import "./otp.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const OtpRequestForPartner = ({ formData, onVerified }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const email = formData?.email || "";

  // Focus the first box on mount
  useEffect(() => {
    inputsRef.current?.[0]?.focus();
  }, []);

  const handleInputChange = (value, index) => {
    // allow only a single digit
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input when a digit is entered
    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Backspace: move back if current is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    // Enter: attempt verify if 6 digits
    if (e.key === "Enter") {
      verifyOTP();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = (e.clipboardData.getData("text") || "")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!text) return;

    const newOtp = Array(6).fill("");
    for (let i = 0; i < text.length; i++) {
      newOtp[i] = text[i];
    }
    setOtp(newOtp);

    // focus last filled or last input
    const lastIndex = Math.min(text.length, 6) - 1;
    inputsRef.current[lastIndex >= 0 ? lastIndex : 0]?.focus();
  };

  const verifyOTP = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      Swal.fire({
        icon: "warning",
        title: "Invalid OTP",
        text: "Please enter a 6-digit OTP.",
        confirmButtonText: "OK",
        confirmButtonColor: "rgb(232, 65, 53)",
      });
      return;
    }

    try {
      const payload = {
        email,
        otp: enteredOtp,
      };

      const response = await Checkotp(payload);

      if (response && response.success === "1") {
        onVerified?.();
        await Swal.fire({
          icon: "success",
          title: "OTP Verified",
          text: "OTP verified successfully!",
          confirmButtonText: "OK",
          confirmButtonColor: "rgb(232, 65, 53)",
          customClass: { container: "swal-override-z" },
        });
        navigate("/driver");
      } else {
        Swal.fire({
          icon: "error",
          title: "Verification Failed",
          text:
            response?.data?.message ||
            "Could not verify the OTP. Please try again.",
          confirmButtonText: "Retry",
          confirmButtonColor: "rgb(232, 65, 53)",
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
  };

  return (
    <div className="container1" onPaste={handlePaste}>
      <p>
        Enter the OTP you received to <br />
        <span id="email" style={{ color: "#e84135", wordBreak: "break-all" }}>
          {email}
        </span>
      </p>

      <div className="otp-input">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            onChange={(e) =>
              handleInputChange(e.target.value.replace(/\D/g, ""), index)
            }
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputsRef.current[index] = el)}
            style={{ border: "1px solid #e84135", textAlign: "center" }}
            aria-label={`OTP digit ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={verifyOTP}
        style={{ background: "#e84135", border: "2px solid #e84135" }}
        disabled={otp.join("").length !== 6}
        title={otp.join("").length !== 6 ? "Enter all 6 digits" : "Verify OTP"}
      >
        Verify
      </button>
    </div>
  );
};

export default OtpRequestForPartner;
