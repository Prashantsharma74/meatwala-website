import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetState, updateKeyValue } from "../store/feature/userSlice";
import { loginApi } from "../utils/api";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import FooterMobileMenu from "../components/FooterMobileMenu";
import{ setCookie, getCookie, deleteCookie } from '../components/Cookie'

const OTP = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loading,
    otp: storedOtp,
    error,
    mobileNumber,
  } = useSelector((state) => state.User);
  const [enterdOtp, setEnteredOtp] = useState();
  const numberOfInputs = 6; // Set the number of OTP inputs
  const [otp, setOtp] = useState(new Array(numberOfInputs).fill(""));
  const otpInputs = useRef([]);

  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    const result = newOtp.map((val) => val || "0").join("");
    setEnteredOtp(result);
    // Focus next input or previous on delete/backspace
    if (value === "" && index > 0) {
      otpInputs.current[index - 1].focus();
    } else if (index < numberOfInputs - 1 && value !== "") {
      otpInputs.current[index + 1].focus();
    }
  };

  useEffect(() => {
    if (!storedOtp) {
      navigate("/login");
    }
  }, []);

  const handleInputPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text");
    const pastedOTP = pastedData.slice(0, numberOfInputs);

    const newOtp = [...otp];
    for (let i = 0; i < pastedOTP.length; i++) {
      newOtp[i] = pastedOTP[i];
    }
    setOtp(newOtp);
    const result = newOtp.map((val) => val || "0").join("");
    console.log("result", result);
    setEnteredOtp(result);
  };

  const checkotp = async (e) => {
    e.preventDefault();
    if (storedOtp === enterdOtp) {
      const data = {
        mobileno: mobileNumber,
      };
      const res = await loginApi(data);
      console.log(res,"ressssss")
      if (res?.returnmsg == "Login Successfully") {
        dispatch(updateKeyValue({ key: "user", value: res?.custinfo }));
        localStorage.setItem("user", JSON.stringify(res?.custinfo));
        setCookie("user", JSON.stringify(res?.custinfo));
        if (res?.custaddress.length != 0) {
          dispatch(updateKeyValue({ key: "userAddress", value: res?.custaddress[0] }));
          localStorage.setItem("userAddress", JSON.stringify(res?.custaddress[0]));
          setCookie("userAddress", JSON.stringify(res?.custaddress[0]));
        }
        navigate("/shop");
      }
      if (res?.returnmsg == "Register Successfully") {
        dispatch(updateKeyValue({ key: "user", value: res?.custinfo }));
        localStorage.setItem("user", JSON.stringify(res?.custinfo));
        setCookie("user", JSON.stringify(res?.custinfo));
        toast.success("Register Successfully")
        // navigate("/location");
        navigate("/shop");
      }

      console.log("res", res);
    } else {
      toast.error("Invalid OTP")
      // alert("Invalid OTP");
    }
  };

  const clearOtpState = () => {
    dispatch(resetState());
  };

  return (
    <>
      {/* Header section start */}
      <header>
        <div className="container">
          <nav className="navbar navbar-expand-lg p-0">
            <Link onClick={clearOtpState} to={"/login"}>
              <i className="ri-arrow-left-s-line" />
            </Link>
          </nav>
        </div>
      </header>
      {/* login page start */}
      <section className="section-b-space pt-120">
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="pb-2 pt-2">
                    <strong>OTP</strong>
                  </h5>
                </div>
                <div className="card-body">
                  <form>
                    <div className="row">
                      <div className="col-12 text-center">
                        <p className="text-light-black mb-3">
                          Verify with OTP sent to your Phone.
                        </p>
                        <div className="form-group">
                          <div className="otp-input-fields text-center">
                            {otp.map((digit, index) => (
                              <input
                                key={index}
                                type="number"
                                className="otp__digit otp__field__1"
                                placeholder={0}
                                id="five2"
                                maxLength="1"
                                value={digit}
                                onChange={(e) =>
                                  handleInputChange(index, e.target.value)
                                }
                                onPaste={handleInputPaste}
                                ref={(input) =>
                                  (otpInputs.current[index] = input)
                                }
                              />
                            ))}
                          </div>
                        </div>
                        <div className="form-group mt-3">
                          <button
                            onClick={checkotp}
                            disabled={loading}
                            type="submit"
                            className="btn theme-btn w-100 mt-4"
                          >
                            Continue
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* login page end */}
      {/* footer section starts */}
      <Footer/>
      {/* footer section end */}
      {/* mobile fix menu start */}
      <FooterMobileMenu/>

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
      {/* location offcanvas end */}
      {/* tap to top start */}
      <button className="scroll scroll-to-top">
        <i className="ri-arrow-up-s-line arrow" />
      </button>
      {/* tap to top end */}
      {/* responsive space */}
      <div className="responsive-space" />
    </>
  );
};

export default OTP;
