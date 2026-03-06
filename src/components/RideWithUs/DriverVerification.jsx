// // // import React, { useState,useEffect } from "react";
// // // import axios from "axios";
// // // import Swal from 'sweetalert2';
// // // import backImage from '../../assets/deliveryboymeatwala.jpeg'
// // // import Navbar from "../Navbar"
// // // import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
// // // import { useNavigate } from "react-router-dom";
// // // const DriverForms = () => {
// // //   const [showFirstForm, setShowFirstForm] = useState(true);
// // //   const [showSecondForm, setShowSecondForm] = useState(false);

// // //   const [vehicleFormData, setVehicleFormData] = useState({
// // //     email: "",
// // //     servicetype: "",
// // //     brand: "",
// // //     vehiclemodel: "",
// // //     manufacturer: "",
// // //     numberplate: "",
// // //     color: "",
// // //     image: null,
// // //   });

// // //   const [certificateFormData, setCertificateFormData] = useState({
// // //     email: "",
// // //     insurance: null,
// // //     drivinglincese: null,
// // //     tranportofpeplelincence: null,
// // //   });

// // //   const navigate = useNavigate()
// // //   const handleVehicleChange = (e) => {
// // //     const { name, value, files } = e.target;
// // //     setVehicleFormData({
// // //       ...vehicleFormData,
// // //       [name]: files ? files[0] : value,
// // //     });
// // //   };

// // //   const handleCertificateChange = (e) => {
// // //     const { name, files } = e.target;
// // //     setCertificateFormData({
// // //       ...certificateFormData,
// // //       [name]: files[0],
// // //     });
// // //   };

// // //   const handleVehicleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     const formData = new FormData();
// // //     Object.keys(vehicleFormData).forEach((key) => {
// // //       formData.append(key, vehicleFormData[key]);
// // //     });

// // //     try {
// // //       const response = await axios.post(
// // //         "https://partnermeatwala.com/api/drivermaster/insertdrivervehical",
// // //         formData
// // //       );
// // //       if (response.data.success === "1") {
// // //         // Replaced alert with SweetAlert2
// // //         Swal.fire({
// // //           icon: 'success',
// // //           title: 'Success',
// // //           text: 'Vehicle details submitted successfully!',
// // //           confirmButtonText: 'OK',
// // //           confirmButtonColor: "rgb(232, 65, 53)",
// // //         });
// // //         setShowFirstForm(false);
// // //         setShowSecondForm(true);
// // //       } else {
// // //         // Replaced alert with SweetAlert2
// // //         Swal.fire({
// // //           icon: 'error',
// // //           title: 'Error',
// // //           text: `Error: ${response.data.returnmsg}`,
// // //           confirmButtonText: 'OK',
// // //           confirmButtonColor: "rgb(232, 65, 53)",
// // //         });
// // //       }
// // //     } catch (error) {
// // //       console.error("Error submitting vehicle details:", error);
// // //       // Replaced alert with SweetAlert2
// // //       Swal.fire({
// // //         icon: 'error',
// // //         title: 'Error',
// // //         text: 'An error occurred while submitting vehicle details.',
// // //         confirmButtonText: 'OK',
// // //         confirmButtonColor: "rgb(232, 65, 53)",
// // //       });
// // //     }
// // //   };

// // //   const handleCertificateSubmit = async (e) => {
// // //     e.preventDefault();
// // //     const formData = new FormData();
// // //     Object.keys(certificateFormData).forEach((key) => {
// // //       formData.append(key, certificateFormData[key]);
// // //     });

// // //     try {
// // //       const response = await axios.post(
// // //         "https://partnermeatwala.com/api/drivermaster/uploaddrivercertificate",
// // //         formData
// // //       );
// // //       if (response.data.success === "1") {
// // //         // Replaced alert with SweetAlert2
// // //         Swal.fire({
// // //           icon: 'success',
// // //           title: 'Success',
// // //           text: 'Certificates submitted successfully!',
// // //           confirmButtonText: 'OK',
// // //           confirmButtonColor: "rgb(232, 65, 53)",
// // //         });
// // //         setShowSecondForm(false);
// // //         navigate("/become-a-rider")

// // //       } else {
// // //         // Replaced alert with SweetAlert2
// // //         Swal.fire({
// // //           icon: 'error',
// // //           title: 'Error',
// // //           text: `Error: ${response.data.returnmsg}`,
// // //           confirmButtonText: 'OK',
// // //           confirmButtonColor: "rgb(232, 65, 53)",
// // //         });
// // //       }
// // //     } catch (error) {
// // //       console.error("Error submitting certificates:", error);
// // //       // Replaced alert with SweetAlert2
// // //       Swal.fire({
// // //         icon: 'error',
// // //         title: 'Error',
// // //         text: 'An error occurred while submitting certificates.',
// // //         confirmButtonText: 'OK',
// // //         confirmButtonColor: "rgb(232, 65, 53)",
// // //       });
// // //     }
// // //   };

// // //   const formContainerStyle = {
// // //     display: "flex",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     height: "100vh",
// // //     backgroundColor: "#f8f9fa",
// // //   };

// // //   const formStyle = {
// // //     width: "450px",
// // //     backgroundColor: "#ffffff",
// // //     padding: "20px",
// // //     borderRadius: "10px",
// // //     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
// // //   };

// // //   const inputStyle = {
// // //     width: "100%",
// // //     marginBottom: "10px",
// // //     padding: "12px",
// // //     borderRadius: "5px",
// // //     border: "1px solid #ddd",
// // //   };

// // //   const buttonStyle = {
// // //     width: "100%",
// // //     padding: "10px",
// // //     background: "linear-gradient(to right, #e84135, #e84135)",
// // //     color: "#fff",
// // //     border: "none",
// // //     borderRadius: "5px",
// // //     fontSize: "16px",
// // //     cursor: "pointer",
// // //   };
// // //   const labelStyle = {
// // //     display: "block",
// // //     marginBottom: "5px",
// // //     fontWeight: "bold",
// // //   };
// // //   const backgroundStyle = {
// // //     backgroundImage: `url(${backImage})`,
// // //     backgroundSize: "cover",
// // //     backgroundPosition: "center",
// // //     minHeight: "100vh",
// // //     display: "flex",
// // //     justifyContent: "flex-end",
// // //     alignItems: "flex-end",
// // //     padding: "15px 15px 15px 15px", // top right bottom left

// // //     };

// // //     useEffect(() => {
// // //       // Disable body scroll
// // //       disableBodyScroll(document.body);

// // //       // Enable scroll when component is unmounted
// // //       return () => {
// // //         enableBodyScroll(document.body);
// // //       };
// // //     }, []);
// // //   return (

// // //     <>
// // //     <Navbar/>
// // //     <div style={backgroundStyle}>
// // //       {showFirstForm && (
// // //         // <div style={formContainerStyle}>
// // //           <form style={formStyle} onSubmit={handleVehicleSubmit}>
// // //             <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
// // //               Enter Vehicle Details
// // //             </h3>
// // //             <input
// // //               type="text"
// // //               name="email"
// // //               placeholder="email"
// // //               style={inputStyle}
// // //               onChange={handleVehicleChange}
// // //             />
// // //             {/* <input
// // //               type="text"
// // //               name="servicetype"
// // //               placeholder="Service Type"
// // //               style={inputStyle}
// // //               onChange={handleVehicleChange}
// // //             />
// // //             <input
// // //               type="text"
// // //               name="brand"
// // //               placeholder="Brand"
// // //               style={inputStyle}
// // //               onChange={handleVehicleChange}
// // //             /> */}
// // //             <input
// // //               type="text"
// // //               name="vehiclemodel"
// // //               placeholder="Vehicle Model"
// // //               style={inputStyle}
// // //               onChange={handleVehicleChange}
// // //             />
// // //             <input
// // //               type="text"
// // //               name="manufacturer"
// // //               placeholder="Manufacturer"
// // //               style={inputStyle}
// // //               onChange={handleVehicleChange}
// // //             />
// // //             <input
// // //               type="text"
// // //               name="numberplate"
// // //               placeholder="Number Plate"
// // //               style={inputStyle}
// // //               onChange={handleVehicleChange}
// // //             />
// // //             <input
// // //               type="text"
// // //               name="color"
// // //               placeholder="Color"
// // //               style={inputStyle}
// // //               onChange={handleVehicleChange}
// // //             />
// // //             <input
// // //               type="file"
// // //               name="image"
// // //               style={inputStyle}
// // //               onChange={handleVehicleChange}
// // //             />
// // //             <button type="submit" style={buttonStyle}>
// // //               Submit Vehicle Details
// // //             </button>
// // //           </form>
// // //         // </div>
// // //       )}

// // //       {showSecondForm && (
// // //         <div style={formContainerStyle}>
// // //           <form style={formStyle} onSubmit={handleCertificateSubmit}>
// // //             <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
// // //               email
// // //             </h3>
// // //             <label style={labelStyle} htmlFor="email">
// // //               Email
// // //             </label>
// // //             <input
// // //               type="text"
// // //               name="email"
// // //               id="email"
// // //               style={inputStyle}
// // //               onChange={handleCertificateChange}
// // //             />
// // //             <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
// // //               Upload Certificates
// // //             </h3>
// // //             <label style={labelStyle} htmlFor="insurance">
// // //               Upload Insurance
// // //             </label>
// // //             <input
// // //               type="file"
// // //               name="insurance"
// // //               id="insurance"
// // //               style={inputStyle}
// // //               onChange={handleCertificateChange}
// // //             />
// // //             <label style={labelStyle} htmlFor="drivinglincese">
// // //               Upload Driving License
// // //             </label>
// // //             <input
// // //               type="file"
// // //               name="drivinglincese"
// // //               id="drivinglincese"
// // //               style={inputStyle}
// // //               onChange={handleCertificateChange}
// // //             />
// // //             <label style={labelStyle} htmlFor="tranportofpeplelincence">
// // //               Upload Transport of People License
// // //             </label>
// // //             <input
// // //               type="file"
// // //               name="tranportofpeplelincence"
// // //               id="tranportofpeplelincence"
// // //               style={inputStyle}
// // //               onChange={handleCertificateChange}
// // //             />
// // //             <button type="submit" style={buttonStyle}>
// // //               Submit Certificates
// // //             </button>
// // //           </form>
// // //         </div>
// // //       )}
// // //     </div>
// // //     </>
// // //   );
// // // };

// // // export default DriverForms;

// // import React from "react";
// // import Navbar from "../Navbar"
// // import appStore from "../../assets/images/svg/app-store.svg";
// // import googlePlay from "../../assets/images/svg/google-play.svg";

// // const DriverForms = () => {
// //   return (
// //     <>
// //       <Navbar />
// //       <section
// //         style={{
// //           padding: "80px 20px",
// //           backgroundColor: "#fafafa",
// //         }}
// //       >
// //         <div className="container">
// //           <div
// //             style={{
// //               maxWidth: "800px",
// //               margin: "0 auto",
// //               background: "#ffffff",
// //               borderRadius: "16px",
// //               padding: "50px 30px",
// //               boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
// //               textAlign: "center",
// //             }}
// //           >
// //             {/* Heading */}
// //             <h2
// //               style={{
// //                 fontSize: "28px",
// //                 fontWeight: 600,
// //                 marginBottom: "12px",
// //                 color: "#222",
// //               }}
// //             >
// //               Download the Meatwala App
// //             </h2>

// //             {/* Subtitle */}
// //             <p
// //               style={{
// //                 fontSize: "16px",
// //                 color: "#666",
// //                 marginBottom: "35px",
// //                 lineHeight: "1.6",
// //               }}
// //             >
// //               Join the UK’s fastest growing halal meat delivery platform. Order
// //               fresh meat or partner with us — all from one app.
// //             </p>

// //             {/* App Buttons */}
// //             <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3">
// //               <a
// //                 href="https://apps.apple.com/us/app/meatwala/id6742139486"
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //               >
// //                 <img
// //                   src={appStore}
// //                   alt="Download on App Store"
// //                   style={{
// //                     height: "50px",
// //                     transition: "transform 0.2s ease",
// //                   }}
// //                   onMouseOver={(e) =>
// //                     (e.currentTarget.style.transform = "scale(1.05)")
// //                   }
// //                   onMouseOut={(e) =>
// //                     (e.currentTarget.style.transform = "scale(1)")
// //                   }
// //                 />
// //               </a>

// //               <a
// //                 href="https://play.google.com/store/apps/details?id=com.app.meatwala&hl=en_GB"
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //               >
// //                 <img
// //                   src={googlePlay}
// //                   alt="Get it on Google Play"
// //                   style={{
// //                     height: "50px",
// //                     transition: "transform 0.2s ease",
// //                   }}
// //                   onMouseOver={(e) =>
// //                     (e.currentTarget.style.transform = "scale(1.05)")
// //                   }
// //                   onMouseOut={(e) =>
// //                     (e.currentTarget.style.transform = "scale(1)")
// //                   }
// //                 />
// //               </a>
// //             </div>

// //             {/* Optional footer text */}
// //             <p
// //               style={{
// //                 marginTop: "30px",
// //                 fontSize: "14px",
// //                 color: "#999",
// //               }}
// //             >
// //               Available on iOS & Android
// //             </p>
// //           </div>
// //         </div>
// //       </section>
// //     </>
// //   );
// // };

// // export default DriverForms;

// import React from "react";
// import Navbar from "../Navbar";
// import appStore from "../../assets/images/svg/app-store.svg";
// import googlePlay from "../../assets/images/svg/google-play.svg";

// const DriverForms = () => {
//   return (
//     <>
//       <Navbar />

//       <section
//         style={{
//           padding: "90px 20px",
//           background: "linear-gradient(180deg, #fff 0%, #fafafa 100%)",
//         }}
//       >
//         <div className="container">
//           <div
//             style={{
//               maxWidth: "900px",
//               margin: "0 auto",
//               background: "#ffffff",
//               borderRadius: "20px",
//               padding: "60px 35px",
//               boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
//               textAlign: "center",
//             }}
//           >
//             {/* Badge */}
//             <span
//               style={{
//                 display: "inline-block",
//                 padding: "6px 14px",
//                 borderRadius: "20px",
//                 background: "rgba(232,65,53,0.1)",
//                 color: "#e84135",
//                 fontSize: "13px",
//                 fontWeight: 600,
//                 marginBottom: "18px",
//               }}
//             >
//               Official Meatwala App
//             </span>

//             {/* Heading */}
//             <h1
//               style={{
//                 fontSize: "32px",
//                 fontWeight: 700,
//                 marginBottom: "15px",
//                 color: "#222",
//               }}
//             >
//               Get Meatwala on Your Phone
//             </h1>

//             {/* Subtitle */}
//             <p
//               style={{
//                 fontSize: "17px",
//                 color: "#555",
//                 maxWidth: "650px",
//                 margin: "0 auto 40px",
//                 lineHeight: "1.7",
//               }}
//             >
//               Order fresh halal meat, track deliveries, or partner with us —
//               everything you need, all in one powerful app.
//             </p>

//             {/* Feature points */}
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//                 gap: "20px",
//                 marginBottom: "45px",
//                 textAlign: "left",
//               }}
//             >
//               {[
//                 "🚀 Fast & reliable deliveries",
//                 "🥩 Fresh halal meat from trusted sellers",
//                 "📍 Live order tracking",
//                 "🤝 Easy partner onboarding",
//               ].map((text, index) => (
//                 <div
//                   key={index}
//                   style={{
//                     padding: "16px 18px",
//                     borderRadius: "14px",
//                     background: "#fafafa",
//                     fontSize: "15px",
//                     color: "#333",
//                     boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
//                   }}
//                 >
//                   {text}
//                 </div>
//               ))}
//             </div>

//             {/* App Buttons */}
//             <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3">
//               <a
//                 href="https://apps.apple.com/us/app/meatwala/id6742139486"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <img
//                   src={appStore}
//                   alt="Download on App Store"
//                   style={{
//                     height: "52px",
//                     transition: "transform 0.2s ease",
//                   }}
//                   onMouseOver={(e) =>
//                     (e.currentTarget.style.transform = "scale(1.06)")
//                   }
//                   onMouseOut={(e) =>
//                     (e.currentTarget.style.transform = "scale(1)")
//                   }
//                 />
//               </a>

//               <a
//                 href="https://play.google.com/store/apps/details?id=com.app.meatwala&hl=en_GB"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <img
//                   src={googlePlay}
//                   alt="Get it on Google Play"
//                   style={{
//                     height: "52px",
//                     transition: "transform 0.2s ease",
//                   }}
//                   onMouseOver={(e) =>
//                     (e.currentTarget.style.transform = "scale(1.06)")
//                   }
//                   onMouseOut={(e) =>
//                     (e.currentTarget.style.transform = "scale(1)")
//                   }
//                 />
//               </a>
//             </div>

//             {/* Footer text */}
//             <p
//               style={{
//                 marginTop: "35px",
//                 fontSize: "14px",
//                 color: "#999",
//               }}
//             >
//               Available on iOS & Android • Free to download
//             </p>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default DriverForms;

import React from "react";
import Navbar from "../Navbar";
import appStore from "../../assets/images/svg/app-store.svg";
import googlePlay from "../../assets/images/svg/google-play.svg";

const DriverForms = () => {
  return (
    <>
      <Navbar />

      <section
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #fff 0%, #fff5f4 50%, #ffffff 100%)",
          padding: "100px 20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "60px",
              alignItems: "center",
            }}
          >
            {/* LEFT CONTENT */}
            <div>
              <span
                style={{
                  display: "inline-block",
                  padding: "8px 18px",
                  borderRadius: "30px",
                  background: "rgba(232,65,53,0.12)",
                  color: "#e84135",
                  fontSize: "14px",
                  fontWeight: 600,
                  marginBottom: "20px",
                }}
              >
                🇬🇧 UK’s #1 Halal Meat Platform
              </span>

              <h1
                style={{
                  fontSize: "44px",
                  fontWeight: 800,
                  lineHeight: "1.2",
                  color: "#111",
                  marginBottom: "20px",
                }}
              >
                Everything You Need.
                <br />
                <span style={{ color: "#e84135" }}>
                  One Powerful App.
                </span>
              </h1>

              <p
                style={{
                  fontSize: "18px",
                  color: "#555",
                  maxWidth: "520px",
                  lineHeight: "1.8",
                  marginBottom: "35px",
                }}
              >
                Meatwala connects customers, riders, and partners on one smart
                platform. Order fresh halal meat, manage deliveries, or grow
                your business — faster than ever.
              </p>

              {/* FEATURES */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "18px",
                  marginBottom: "45px",
                }}
              >
                {[
                  "🥩 Fresh halal meat",
                  "⚡ Fast deliveries",
                  "📍 Live tracking",
                  "🤝 Partner growth tools",
                ].map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "16px",
                      color: "#333",
                    }}
                  >
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* STORE BUTTONS */}
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="https://apps.apple.com/us/app/meatwala/id6742139486"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={appStore}
                    alt="App Store"
                    style={{
                      height: "56px",
                      transition: "transform 0.25s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.07)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </a>

                <a
                  href="https://play.google.com/store/apps/details?id=com.app.meatwala&hl=en_GB"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={googlePlay}
                    alt="Google Play"
                    style={{
                      height: "56px",
                      transition: "transform 0.25s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.07)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </a>
              </div>
            </div>

            {/* RIGHT VISUAL */}
            <div
              style={{
                background: "#ffffff",
                borderRadius: "28px",
                padding: "50px 40px",
                boxShadow: "0 30px 70px rgba(0,0,0,0.12)",
              }}
            >
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  marginBottom: "20px",
                  color: "#111",
                }}
              >
                Why Meatwala?
              </h3>

              {[
                {
                  title: "For Customers",
                  desc: "Order halal meat from trusted butchers.",
                },
                {
                  title: "For Riders",
                  desc: "Flexible work with transparent earnings.",
                },
                {
                  title: "For Partners",
                  desc: "Grow your business with online orders.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    padding: "18px 0",
                    borderBottom:
                      index !== 2 ? "1px solid #eee" : "none",
                  }}
                >
                  <strong
                    style={{
                      display: "block",
                      fontSize: "16px",
                      color: "#e84135",
                      marginBottom: "6px",
                    }}
                  >
                    {item.title}
                  </strong>
                  <span style={{ color: "#555", fontSize: "15px" }}>
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DriverForms;
