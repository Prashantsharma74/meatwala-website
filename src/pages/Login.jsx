// // import { useDispatch, useSelector } from "react-redux";
// // import { useNavigate } from "react-router-dom";
// // import { sendOtp, resetState } from "../store/feature/userSlice";
// // import React, { useEffect, useState } from "react";
// // import PhoneInput from "react-phone-input-2";
// // import "react-phone-input-2/lib/style.css";
// // import { toast, ToastContainer } from "react-toastify";
// // import FooterMobileMenu from "../components/FooterMobileMenu";
// // import { Helmet } from "react-helmet-async";
// // import Navbar from "../components/Navbar";
// // import Footer from "../components/Footer";

// // const Login = () => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   // const { loading, success, error, status } = useSelector(
// //   //   (state) => state.User
// //   // );
// //   const { loading, success, error, status, mobileNumber } = useSelector(
// //     (state) => state.User
// //   );

// //   const [phoneNumber, setPhoneNumber] = useState("");

// //   useEffect(() => {
// //     if (status == "1") {
// //       navigate("/otp");
// //     } else if (status == "0") {
// //       dispatch(resetState());
// //       toast.error("Mobile Number is Invalid");
// //     }
// //   }, [status, navigate, dispatch]);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     // Validate if the phone number is valid before dispatching OTP
// //     if (phoneNumber && phoneNumber.length >= 10) {
// //       dispatch(sendOtp({ mobileno: "+" + phoneNumber }));
// //     } else {
// //       toast.error("Please enter a valid mobile number.");
// //     }
// //   };

// //   useEffect(() => {
// //     if (mobileNumber) {
// //       setPhoneNumber(mobileNumber.replace("+", ""));
// //     }
// //   }, [mobileNumber]);

// //   return (
// //     <>
// //       <Helmet>
// //         <title>Customer Login – Manage Your Halal Meat Orders | Meatwala</title>
// //         <meta
// //           name="description"
// //           content="Sign in to your Meatwala account to track your halal meat orders, manage preferences, and enjoy seamless shopping."
// //         />
// //       </Helmet>
// //       <Navbar />
// //       <style
// //         dangerouslySetInnerHTML={{
// //           __html: `
// //             .react-tel-input {
// //               width: 100%;
// //             }
// //             @media (max-width: 600px) {
// //               .react-tel-input {
// //                 width: 100%;
// //               }
// //             }
// //           `,
// //         }}
// //       />
// //       {/* login page start */}
// //       <section className="section-b-space pt-120">
// //         <div className="container mt-5">
// //           <div className="row justify-content-center">
// //             <div className="col-lg-6">
// //               <div className="card">
// //                 <div className="card-header">
// //                   <h5 className="pb-2 pt-2">
// //                     <strong>LOGIN</strong>
// //                   </h5>
// //                 </div>
// //                 <div className="card-body">
// //                   <form className="auth-form" onSubmit={handleSubmit}>
// //                     <h5>Enter your mobile number to get OTP</h5>
// //                     <div className="form-group">
// //                       <label className="form-label fw-semibold dark-text">
// //                         Mobile Number
// //                       </label>
// //                       <div className="d-flex gap-3">
// //                         <PhoneInput
// //                           country={"gb"}
// //                           value={phoneNumber}
// //                           onChange={(phone) => setPhoneNumber(phone)}
// //                           inputProps={{
// //                             name: "mobile",
// //                             required: true,
// //                             className: "form-control form-control-submit",
// //                           }}
// //                         />
// //                       </div>
// //                     </div>
// //                     {/* <button className="btn theme-btn w-100 mt-4" type="submit">
// //                       Send OTP
// //                     </button> */}
// //                     <button
// //                       className="btn theme-btn w-100 mt-4 d-inline-flex align-items-center justify-content-center"
// //                       type="submit"
// //                       disabled={loading}
// //                       aria-busy={loading}
// //                       aria-live="polite"
// //                     >
// //                       {loading ? (
// //                         <>
// //                           <span
// //                             className="spinner-border spinner-border-sm me-2"
// //                             role="status"
// //                             aria-hidden="true"
// //                           />
// //                           Sending…
// //                         </>
// //                       ) : (
// //                         "Send OTP"
// //                       )}
// //                     </button>
// //                   </form>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>
// //       <ToastContainer />
// //       {/* login page end */}
// //       <Footer />
// //       <FooterMobileMenu />
// //     </>
// //   );
// // };

// // export default Login;

// import React, { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const COUNTRY_CODES = [
//   { code: "+44", digits: 10 },   // UK
//   { code: "+93", digits: 9 },    // Afghanistan
//   { code: "+355", digits: 9 },   // Albania
//   { code: "+213", digits: 9 },   // Algeria
//   { code: "+1684", digits: 7 },  // American Samoa
//   { code: "+376", digits: 6 },   // Andorra
//   { code: "+244", digits: 9 },   // Angola
//   { code: "+91", digits: 10 },   // India
//   { code: "+49", digits: 11 },   // Germany
// ];

// const Login = () => {
//   const [country, setCountry] = useState(COUNTRY_CODES[0]);
//   const [mobile, setMobile] = useState("");

//   const handleNumberChange = (e) => {
//     const value = e.target.value.replace(/\D/g, "");

//     // 🔒 lock typing beyond allowed digits
//     if (value.length <= country.digits) {
//       setMobile(value);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (mobile.length !== country.digits) {
//       toast.error(
//         `This country requires exactly ${country.digits} digits`
//       );
//       return;
//     }

//     const fullNumber = `${country.code}${mobile}`;
//     console.log("SEND OTP TO:", fullNumber);

//     toast.success("OTP Sent Successfully");
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
//         <label className="form-label">Mobile Number</label>

//         <div style={{ display: "flex" }}>
//           {/* CODE DROPDOWN */}
//           <select
//             value={country.code}
//             onChange={(e) => {
//               const selected = COUNTRY_CODES.find(
//                 (c) => c.code === e.target.value
//               );
//               setCountry(selected);
//               setMobile("");
//             }}
//             className="form-control"
//             style={{ maxWidth: 120 }}
//           >
//             {COUNTRY_CODES.map((c) => (
//               <option key={c.code} value={c.code}>
//                 {c.code}
//               </option>
//             ))}
//           </select>

//           {/* NUMBER INPUT */}
//           <input
//             type="text"
//             value={mobile}
//             onChange={handleNumberChange}
//             className="form-control"
//             placeholder={`${country.digits} digit number`}
//           />
//         </div>

//         <button className="btn btn-primary w-100 mt-3">
//           Send OTP
//         </button>
//       </form>

//       <ToastContainer />
//     </>
//   );
// };

// export default Login;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOtp, resetState } from "../store/feature/userSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FooterMobileMenu from "../components/FooterMobileMenu";
import { Helmet } from "react-helmet-async";

// const COUNTRY_CODES = [
//   { code: "+44", digits: 11 },
//   { code: "+93", digits: 9 },
//   { code: "+355", digits: 9 },
//   { code: "+213", digits: 9 },
//   { code: "+1684", digits: 7 },
//   { code: "+376", digits: 6 },
//   { code: "+244", digits: 9 },
//   { code: "+91", digits: 10 },
//   { code: "+49", digits: 11 },
// ]; 
const COUNTRY_CODES = [
  { code: "+44", digits: 10 }, // UK
  { code: "+93", digits: 9 }, // Afghanistan
  { code: "+355", digits: 9 }, // Albania
  { code: "+213", digits: 9 }, // Algeria
  { code: "+1", digits: 10 }, // USA / Canada
  { code: "+376", digits: 6 }, // Andorra
  { code: "+244", digits: 9 }, // Angola
  { code: "+54", digits: 10 }, // Argentina
  { code: "+374", digits: 8 }, // Armenia
  { code: "+61", digits: 9 }, // Australia
  { code: "+43", digits: 10 }, // Austria
  { code: "+994", digits: 9 }, // Azerbaijan

  { code: "+973", digits: 8 }, // Bahrain
  { code: "+880", digits: 10 }, // Bangladesh
  { code: "+375", digits: 9 }, // Belarus
  { code: "+32", digits: 9 }, // Belgium
  { code: "+501", digits: 7 }, // Belize
  { code: "+229", digits: 8 }, // Benin
  { code: "+975", digits: 8 }, // Bhutan
  { code: "+591", digits: 8 }, // Bolivia
  { code: "+387", digits: 8 }, // Bosnia
  { code: "+267", digits: 8 }, // Botswana
  { code: "+55", digits: 11 }, // Brazil
  { code: "+359", digits: 9 }, // Bulgaria

  { code: "+855", digits: 9 }, // Cambodia
  { code: "+237", digits: 9 }, // Cameroon
  { code: "+1", digits: 10 }, // Canada
  { code: "+238", digits: 7 }, // Cape Verde
  { code: "+236", digits: 8 }, // Central African Rep
  { code: "+235", digits: 8 }, // Chad
  { code: "+56", digits: 9 }, // Chile
  { code: "+86", digits: 11 }, // China
  { code: "+57", digits: 10 }, // Colombia
  { code: "+269", digits: 7 }, // Comoros
  { code: "+506", digits: 8 }, // Costa Rica
  { code: "+385", digits: 9 }, // Croatia
  { code: "+53", digits: 8 }, // Cuba
  { code: "+357", digits: 8 }, // Cyprus
  { code: "+420", digits: 9 }, // Czech Republic

  { code: "+45", digits: 8 }, // Denmark
  { code: "+253", digits: 8 }, // Djibouti
  { code: "+20", digits: 10 }, // Egypt
  { code: "+503", digits: 8 }, // El Salvador
  { code: "+372", digits: 8 }, // Estonia
  { code: "+251", digits: 9 }, // Ethiopia

  { code: "+358", digits: 10 }, // Finland
  { code: "+33", digits: 9 }, // France
  { code: "+241", digits: 7 }, // Gabon
  { code: "+995", digits: 9 }, // Georgia
  { code: "+49", digits: 11 }, // Germany
  { code: "+233", digits: 9 }, // Ghana
  { code: "+30", digits: 10 }, // Greece
  { code: "+502", digits: 8 }, // Guatemala

  { code: "+852", digits: 8 }, // Hong Kong
  { code: "+36", digits: 9 }, // Hungary
  { code: "+354", digits: 7 }, // Iceland
  { code: "+91", digits: 10 }, // India
  { code: "+62", digits: 11 }, // Indonesia
  { code: "+98", digits: 10 }, // Iran
  { code: "+964", digits: 10 }, // Iraq
  { code: "+353", digits: 9 }, // Ireland
  { code: "+972", digits: 9 }, // Israel
  { code: "+39", digits: 10 }, // Italy
  { code: "+81", digits: 10 }, // Japan
  { code: "+962", digits: 9 }, // Jordan

  { code: "+254", digits: 9 }, // Kenya
  { code: "+965", digits: 8 }, // Kuwait
  { code: "+996", digits: 9 }, // Kyrgyzstan

  { code: "+856", digits: 9 }, // Laos
  { code: "+371", digits: 8 }, // Latvia
  { code: "+961", digits: 8 }, // Lebanon
  { code: "+218", digits: 9 }, // Libya
  { code: "+370", digits: 8 }, // Lithuania
  { code: "+352", digits: 9 }, // Luxembourg

  { code: "+60", digits: 10 }, // Malaysia
  { code: "+960", digits: 7 }, // Maldives
  { code: "+52", digits: 10 }, // Mexico
  { code: "+976", digits: 8 }, // Mongolia
  { code: "+212", digits: 9 }, // Morocco
  { code: "+258", digits: 9 }, // Mozambique

  { code: "+977", digits: 10 }, // Nepal
  { code: "+31", digits: 9 }, // Netherlands
  { code: "+64", digits: 9 }, // New Zealand
  { code: "+234", digits: 10 }, // Nigeria
  { code: "+47", digits: 8 }, // Norway

  { code: "+92", digits: 10 }, // Pakistan
  { code: "+63", digits: 10 }, // Philippines
  { code: "+48", digits: 9 }, // Poland
  { code: "+351", digits: 9 }, // Portugal

  { code: "+974", digits: 8 }, // Qatar
  { code: "+40", digits: 9 }, // Romania
  { code: "+7", digits: 10 }, // Russia

  { code: "+966", digits: 9 }, // Saudi Arabia
  { code: "+65", digits: 8 }, // Singapore
  { code: "+27", digits: 9 }, // South Africa
  { code: "+82", digits: 10 }, // South Korea
  { code: "+34", digits: 9 }, // Spain
  { code: "+94", digits: 9 }, // Sri Lanka
  { code: "+46", digits: 9 }, // Sweden
  { code: "+41", digits: 9 }, // Switzerland

  { code: "+66", digits: 9 }, // Thailand
  { code: "+90", digits: 10 }, // Turkey
  { code: "+256", digits: 9 }, // Uganda
  { code: "+380", digits: 9 }, // Ukraine
  { code: "+971", digits: 9 }, // UAE
  { code: "+1", digits: 10 }, // USA
  { code: "+998", digits: 9 }, // Uzbekistan
  { code: "+58", digits: 10 }, // Venezuela
  { code: "+84", digits: 9 }, // Vietnam
  { code: "+263", digits: 9 }, // Zimbabwe
];

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, status } = useSelector((state) => state.User);

  const [country, setCountry] = useState(COUNTRY_CODES[0]);
  const [mobile, setMobile] = useState("");

  // API response handling
  useEffect(() => {
    if (status === "1") {
      navigate("/otp");
    } else if (status === "0") {
      dispatch(resetState());
      toast.error("Invalid mobile number");
    }
  }, [status, navigate, dispatch]);

  // Number input handler (digit lock)
  const handleNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= country.digits) {
      setMobile(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mobile.length !== country.digits) {
      toast.error(`This country requires exactly ${country.digits} digits`);
      return;
    }

    const fullNumber = `${country.code}${mobile}`;
    dispatch(sendOtp({ mobileno: fullNumber }));
  };

  return (
    <>
      <Helmet>
        <title>Customer Login – Meatwala</title>
        <meta
          name="description"
          content="Sign in to your Meatwala account using mobile OTP"
        />
      </Helmet>

      <Navbar />

      {/* LOGIN PAGE */}
      <section className="section-b-space pt-120">
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="pb-2 pt-2">
                    <strong>LOGIN</strong>
                  </h5>
                </div>

                <div className="card-body">
                  <form className="auth-form" onSubmit={handleSubmit}>
                    <h5 className="mb-3" style={{ color: "black" }}>
                      Enter your mobile number to get OTP
                    </h5>

                    <div className="form-group d-flex justify-content-center flex-column">
                      <label className="form-label fw-semibold">
                        Mobile Number
                      </label>

                      {/* NUMBER INPUT GROUP */}
                      {/* <div className="d-flex gap-2">
                        <select
                          className="form-control"
                          style={{ maxWidth: "120px" }}
                          value={country.code}
                          onChange={(e) => {
                            const selected = COUNTRY_CODES.find(
                              (c) => c.code === e.target.value,
                            );
                            setCountry(selected);
                            setMobile("");
                          }}
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.code}
                            </option>
                          ))}
                        </select>

                        <input
                          type="text"
                          className="form-control"
                          placeholder={`Enter phone number`}
                          value={mobile}
                          onChange={handleNumberChange}
                          required
                        />
                      </div> */}
                      <div className="d-flex justify-content-center">
                        <div
                          className="d-flex align-items-center gap-2"
                          style={{ maxWidth: "420px", width: "100%" }}
                        >
                          {/* COUNTRY CODE */}
                          <select
                            className="form-select"
                            style={{
                              maxWidth: "110px",
                              borderRadius: "8px",
                              textAlign: "center",
                            }}
                            value={country.code}
                            onChange={(e) => {
                              const selected = COUNTRY_CODES.find(
                                (c) => c.code === e.target.value,
                              );
                              setCountry(selected);
                              setMobile("");
                            }}
                          >
                            {COUNTRY_CODES.map((c) => (
                              <option key={c.code} value={c.code}>
                                {c.code}
                              </option>
                            ))}
                          </select>

                          {/* PHONE NUMBER */}
                          <input
                            type="tel"
                            className="form-control"
                            // placeholder={`Enter ${country.digits}-digit number`}
                            placeholder={`Enter phone number`}
                            value={mobile}
                            onChange={handleNumberChange}
                            style={{
                              borderRadius: "8px",
                              height: "42px",
                            }}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <button
                      className="btn theme-btn w-100 mt-4 d-inline-flex align-items-center justify-content-center"
                      type="submit"
                      disabled={loading}
                      aria-busy={loading}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                          />
                          Sending…
                        </>
                      ) : (
                        "Send OTP"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ToastContainer />
      <Footer />
      <FooterMobileMenu />
    </>
  );
};

export default Login;
