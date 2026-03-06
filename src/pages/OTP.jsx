// import React, { useState, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { resetState, updateKeyValue } from "../store/feature/userSlice";
// import { loginApi } from "../utils/api";
// import { toast } from "react-toastify";
// import Footer from "../components/Footer";
// import FooterMobileMenu from "../components/FooterMobileMenu";
// import { setCookie, getCookie, deleteCookie } from "../components/Cookie";
// import Navbar from "../components/Navbar";

// const OTP = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [submitting, setSubmitting] = useState(false);
//   const {
//     loading,
//     otp: storedOtp,
//     error,
//     mobileNumber,
//   } = useSelector((state) => state.User);
//   const [enterdOtp, setEnteredOtp] = useState();
//   const numberOfInputs = 6; // Set the number of OTP inputs
//   const [otp, setOtp] = useState(new Array(numberOfInputs).fill(""));
//   const otpInputs = useRef([]);

//   const handleInputChange = (index, value) => {
//     const digits = value.replace(/\D/g, "");

//     if (digits.length > 1) {
//       const newOtp = [...otp];

//       for (let i = 0; i < numberOfInputs; i++) {
//         newOtp[i] = digits[i] || "";
//       }

//       setOtp(newOtp);
//       setEnteredOtp(newOtp.join(""));

//       const lastIndex = Math.min(digits.length, numberOfInputs) - 1;
//       otpInputs.current[lastIndex]?.focus();
//       return;
//     }

//     const newOtp = [...otp];
//     newOtp[index] = digits;
//     setOtp(newOtp);
//     setEnteredOtp(newOtp.join(""));

//     if (digits && index < numberOfInputs - 1) {
//       otpInputs.current[index + 1]?.focus();
//     }

//     if (!digits && index > 0) {
//       otpInputs.current[index - 1]?.focus();
//     }
//   };

//   // const handleInputChange = (index, value) => {
//   //   const newOtp = [...otp];
//   //   newOtp[index] = value;
//   //   setOtp(newOtp);
//   //   const result = newOtp.map((val) => val || "0").join("");
//   //   setEnteredOtp(result);
//   //   // Focus next input or previous on delete/backspace
//   //   if (value === "" && index > 0) {
//   //     otpInputs.current[index - 1].focus();
//   //   } else if (index < numberOfInputs - 1 && value !== "") {
//   //     otpInputs.current[index + 1].focus();
//   //   }
//   // };

//   // useEffect(() => {
//   //   if (!storedOtp) {
//   //     navigate("/login");
//   //   }
//   // }, []);

//   useEffect(() => {
//     if (!storedOtp || !mobileNumber) {
//       navigate("/login");
//     }
//   }, [storedOtp, mobileNumber, navigate]);

//   useEffect(() => {
//     if (!("OTPCredential" in window)) return;

//     const ac = new AbortController();

//     navigator.credentials
//       .get({
//         otp: { transport: ["sms"] },
//         signal: ac.signal,
//       })
//       .then((otpCredential) => {
//         if (!otpCredential?.code) return;

//         const code = otpCredential.code; // e.g. "123456"

//         const newOtp = code.slice(0, numberOfInputs).split("");

//         setOtp(newOtp);
//         setEnteredOtp(code);

//         otpInputs.current[numberOfInputs - 1]?.focus();
//       })
//       .catch(() => {
//         // silently fail (fallback manual)
//       });

//     return () => ac.abort();
//   }, []);

//   const handleInputPaste = (e) => {
//     e.preventDefault();
//     const pastedData = e.clipboardData.getData("Text");
//     const pastedOTP = pastedData.slice(0, numberOfInputs);

//     const newOtp = [...otp];
//     for (let i = 0; i < pastedOTP.length; i++) {
//       newOtp[i] = pastedOTP[i];
//     }
//     setOtp(newOtp);
//     const result = newOtp.map((val) => val || "0").join("");
//     console.log("result", result);
//     setEnteredOtp(result);
//   };

//   // const checkotp = async (e) => {
//   //   e.preventDefault();
//   //   if (storedOtp === enterdOtp) {
//   //     const data = {
//   //       mobileno: mobileNumber,
//   //     };
//   //     const res = await loginApi(data);
//   //     console.log(res,"ressssss")
//   //     if (res?.returnmsg == "Login Successfully") {
//   //       dispatch(updateKeyValue({ key: "user", value: res?.custinfo }));
//   //       localStorage.setItem("user", JSON.stringify(res?.custinfo));
//   //       setCookie("user", JSON.stringify(res?.custinfo));
//   //       if (res?.custaddress.length != 0) {
//   //         dispatch(updateKeyValue({ key: "userAddress", value: res?.custaddress[0] }));
//   //         localStorage.setItem("userAddress", JSON.stringify(res?.custaddress[0]));
//   //         setCookie("userAddress", JSON.stringify(res?.custaddress[0]));
//   //       }
//   //       navigate("/shop");
//   //     }
//   //     if (res?.returnmsg == "Register Successfully") {
//   //       dispatch(updateKeyValue({ key: "user", value: res?.custinfo }));
//   //       localStorage.setItem("user", JSON.stringify(res?.custinfo));
//   //       setCookie("user", JSON.stringify(res?.custinfo));
//   //       toast.success("Register Successfully")
//   //       // navigate("/location");
//   //       navigate("/shop");
//   //     }

//   //     console.log("res", res);
//   //   } else {
//   //     toast.error("Invalid OTP")
//   //     // alert("Invalid OTP");
//   //   }
//   // };

//   const checkotp = async (e) => {
//     e.preventDefault();
//     if (storedOtp !== enterdOtp) {
//       toast.error("Invalid OTP");
//       return;
//     }

//     try {
//       setSubmitting(true);
//       const data = { mobileno: mobileNumber };
//       const res = await loginApi(data);

//       if (res?.returnmsg == "Login Successfully") {
//         dispatch(updateKeyValue({ key: "user", value: res?.custinfo }));
//         localStorage.setItem("user", JSON.stringify(res?.custinfo));
//         setCookie("user", JSON.stringify(res?.custinfo));
//         if (res?.custaddress.length != 0) {
//           dispatch(
//             updateKeyValue({ key: "userAddress", value: res?.custaddress[0] }),
//           );
//           localStorage.setItem(
//             "userAddress",
//             JSON.stringify(res?.custaddress[0]),
//           );
//           setCookie("userAddress", JSON.stringify(res?.custaddress[0]));
//         }
//         navigate("/shop");
//       } else if (res?.returnmsg == "Register Successfully") {
//         dispatch(updateKeyValue({ key: "user", value: res?.custinfo }));
//         localStorage.setItem("user", JSON.stringify(res?.custinfo));
//         setCookie("user", JSON.stringify(res?.custinfo));
//         toast.success("Register Successfully");
//         navigate("/shop");
//       } else {
//         toast.error(res?.returnmsg || "Verification failed");
//       }
//     } catch (err) {
//       toast.error("Something went wrong. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const clearOtpState = () => {
//     dispatch(resetState());
//   };

//   return (
//     <>
//       {/* Header section start */}
//       {/* <header>
//         <div className="container">
//           <nav className="navbar navbar-expand-lg p-0">
//             <Link onClick={clearOtpState} to={"/login"}>
//               <i className="ri-arrow-left-s-line" />
//             </Link>
//           </nav>
//         </div>
//       </header> */}
//       <Navbar />
//       {/* login page start */}
//       <section className="section-b-space pt-120">
//         <div className="container mt-5">
//           <div className="row justify-content-center">
//             <div className="col-lg-6">
//               <div className="card">
//                 <div className="card-header">
//                   <h5 className="pb-2 pt-2">
//                     <strong>OTP</strong>
//                   </h5>
//                 </div>
//                 <div className="card-body">
//                   {/* <button
//                     type="button"
//                     className="btn btn-link mb-3"
//                     onClick={() => navigate("/login")}
//                   >
//                     ← Change phone number
//                   </button> */}
//                   <button
//                     type="button"
//                     className="btn btn-link mb-3"
//                     // onClick={() => {
//                     //   setOtp(new Array(numberOfInputs).fill(""));
//                     //   setEnteredOtp("");
//                     //   navigate("/login");
//                     // }}
//                     onClick={() => {
//                       // clear only navigation-related flags
//                       dispatch(updateKeyValue({ key: "status", value: "" }));
//                       dispatch(updateKeyValue({ key: "otp", value: "" }));

//                       setOtp(new Array(numberOfInputs).fill(""));
//                       setEnteredOtp("");

//                       navigate("/login");
//                     }}
//                   >
//                     ← Change phone number
//                   </button>
//                   <form>
//                     <div className="row">
//                       <div className="col-12 text-center">
//                         {/* <p className="text-light-black mb-3">
//                           Verify with OTP sent to your Phone.
//                         </p> */}
//                         <p className="text-light-black mb-3">
//                           OTP sent to testing <strong>{mobileNumber}</strong>
//                         </p>
//                         <div className="form-group">
//                           <div
//                             className="otp-input-fields text-center"
//                             style={{
//                               display: "flex",
//                               justifyContent: "center",
//                               gap: "12px",
//                             }}
//                           >
//                             {/* {otp.map((digit, index) => (
//                               <input
//                                 key={index}
//                                 inputMode="numeric"
//                                 pattern="[0-9]*"
//                                 maxLength={1}
//                                 className="otp__digit otp__field__1"
//                                 value={digit}
//                                 onChange={(e) =>
//                                   handleInputChange(
//                                     index,
//                                     e.target.value.replace(/\D/g, ""),
//                                   )
//                                 }
//                                 onPaste={handleInputPaste}
//                                 ref={(el) => (otpInputs.current[index] = el)}
//                                 autoFocus={index === 0}
//                               />
//                             ))} */}
//                             {otp.map((digit, index) => (
//                               <input
//                                 key={index}
//                                 type="text"
//                                 inputMode="numeric"
//                                 pattern="[0-9]*"
//                                 maxLength={1}
//                                 autoComplete={
//                                   index === 0 ? "one-time-code" : "off"
//                                 }
//                                 className="otp__digit otp__field__1"
//                                 value={digit}
//                                 onChange={(e) =>
//                                   handleInputChange(
//                                     index,
//                                     e.target.value.replace(/\D/g, ""),
//                                   )
//                                 }
//                                 onPaste={handleInputPaste}
//                                 ref={(el) => (otpInputs.current[index] = el)}
//                                 autoFocus={index === 0}
//                               />
//                             ))}
//                           </div>
//                         </div>
//                         <div className="form-group mt-3">
//                           {/* <button
//                             onClick={checkotp}
//                             disabled={loading}
//                             type="submit"
//                             className="btn theme-btn w-100 mt-4"
//                           >
//                             Continue
//                           </button> */}
//                           <button
//                             onClick={checkotp}
//                             disabled={loading || submitting}
//                             type="submit"
//                             className="btn theme-btn w-100 mt-4 d-inline-flex align-items-center justify-content-center"
//                             aria-busy={loading || submitting}
//                             aria-live="polite"
//                           >
//                             {loading || submitting ? (
//                               <>
//                                 <span
//                                   className="spinner-border spinner-border-sm me-2"
//                                   role="status"
//                                   aria-hidden="true"
//                                 />
//                                 Verifying…
//                               </>
//                             ) : (
//                               "Continue"
//                             )}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* login page end */}
//       {/* footer section starts */}
//       <Footer />
//       {/* footer section end */}
//       {/* mobile fix menu start */}
//       <FooterMobileMenu />

//       {/* mobile fix menu end */}
//       {/* location offcanvas start */}
//       <div
//         className="modal fade location-modal"
//         id="location"
//         data-bs-backdrop="static"
//         data-bs-keyboard="false"
//         tabIndex={-1}
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-header">
//               <div className="modal-title">
//                 <h5 className="fw-semibold">Select a Location</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   data-bs-dismiss="modal"
//                   aria-label="Close"
//                 />
//               </div>
//             </div>
//             <div className="modal-body">
//               <div className="search-section">
//                 <form className="form_search" role="form">
//                   <input
//                     type="search"
//                     placeholder="Search Location"
//                     className="nav-search nav-search-field"
//                   />
//                 </form>
//               </div>
//               <Link href="" className="current-location">
//                 <div className="current-address">
//                   <i className="ri-focus-3-line focus" />
//                   <div>
//                     <h5>Use current-location</h5>
//                     <h6>Wellington St., Ottawa, Ontario, Canada</h6>
//                   </div>
//                 </div>
//                 <i className="ri-arrow-right-s-line arrow" />
//               </Link>
//               <h5 className="mt-sm-3 mt-2 fw-medium recent-title dark-text">
//                 Recent Location
//               </h5>
//               <Link href="" className="recent-location">
//                 <div className="recant-address">
//                   <i className="ri-map-pin-line theme-color" />
//                   <div>
//                     <h5>Bayshore</h5>
//                     <h6>kingston St., Ottawa, Ontario, Canada</h6>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//             <div className="modal-footer">
//               <Link href="#" className="btn gray-btn" data-bs-dismiss="modal">
//                 Close
//               </Link>
//               <Link
//                 href="#"
//                 className="btn theme-btn mt-0"
//                 data-bs-dismiss="modal"
//               >
//                 Save
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* location offcanvas end */}
//       {/* tap to top start */}
//       <button className="scroll scroll-to-top">
//         <i className="ri-arrow-up-s-line arrow" />
//       </button>
//       {/* tap to top end */}
//       {/* responsive space */}
//       <div className="responsive-space" />
//     </>
//   );
// };

// export default OTP;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateKeyValue, resetState } from "../store/feature/userSlice";
import { loginApi } from "../utils/api";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FooterMobileMenu from "../components/FooterMobileMenu";
import { setCookie } from "../components/Cookie";

const OTP = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, otp: storedOtp, mobileNumber } = useSelector(
    (state) => state.User
  );

  const [otp, setOtp] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // 🔐 Redirect safety
  useEffect(() => {
    if (!storedOtp || !mobileNumber) {
      navigate("/login");
    }
  }, [storedOtp, mobileNumber, navigate]);

  // 🔥 WEB OTP API (SMS AUTO-READ)
  useEffect(() => {
    if (!("OTPCredential" in window)) return;

    const ac = new AbortController();

    navigator.credentials
      .get({
        otp: { transport: ["sms"] },
        signal: ac.signal,
      })
      .then((credential) => {
        if (credential?.code) {
          setOtp(credential.code); // ✅ AUTO ENTER
        }
      })
      .catch(() => {});

    return () => ac.abort();
  }, []);

  // ✅ VERIFY OTP
  const handleVerify = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter valid 6-digit OTP");
      return;
    }

    if (otp !== storedOtp) {
      toast.error("Invalid OTP");
      return;
    }

    try {
      setSubmitting(true);
      const res = await loginApi({ mobileno: mobileNumber });

      if (
        res?.returnmsg === "Login Successfully" ||
        res?.returnmsg === "Register Successfully"
      ) {
        dispatch(updateKeyValue({ key: "user", value: res?.custinfo }));
        localStorage.setItem("user", JSON.stringify(res?.custinfo));
        setCookie("user", JSON.stringify(res?.custinfo));

        if (res?.custaddress?.length) {
          dispatch(
            updateKeyValue({
              key: "userAddress",
              value: res.custaddress[0],
            })
          );
          localStorage.setItem(
            "userAddress",
            JSON.stringify(res.custaddress[0])
          );
          setCookie("userAddress", JSON.stringify(res.custaddress[0]));
        }

        navigate("/shop");
      } else {
        toast.error(res?.returnmsg || "Verification failed");
      }
    } catch (err) {
      toast.error("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="section-b-space pt-120">
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header text-center">
                  <h5 className="fw-bold">OTP Verification</h5>
                </div>

                <div className="card-body text-center">
                  <button
                    className="btn btn-link mb-3"
                    onClick={() => {
                      dispatch(resetState());
                      navigate("/login");
                    }}
                  >
                    ← Change phone number
                  </button>

                  <p className="mb-3">
                    OTP sent to testing prashant <strong>{mobileNumber}</strong>
                  </p>

                  {/* 🔢 SINGLE OTP INPUT */}
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="one-time-code"
                    maxLength={6}
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, ""))
                    }
                    className="form-control text-center fs-4 letter-spacing mb-3"
                    placeholder="Enter OTP"
                  />

                  <button
                    className="btn theme-btn w-100 mt-3 d-flex align-items-center justify-content-center"
                    onClick={handleVerify}
                    disabled={loading || submitting}
                  >
                    {loading || submitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Verifying…
                      </>
                    ) : (
                      "Continue"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FooterMobileMenu />
    </>
  );
};

export default OTP;
