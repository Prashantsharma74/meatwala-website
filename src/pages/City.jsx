// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import FooterMobileMenu from "../components/FooterMobileMenu";
// import { Link, useParams } from "react-router-dom";
// import { Helmet } from "react-helmet-async";

// const City = () => {
//   const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

//   const { cityName, cityid } = useParams();
//   console.log("City ID from URL:", cityid);
//   const [cityDetails, setCityDetails] = useState(null);

//   useEffect(() => {
//     if (cityName) {
//       fetchCityCoordinates(cityName);
//     }

//     if (cityid) {
//       fetchCityDetails(cityid);
//     }
//   }, [cityName, cityid]);

//   const fetchCityCoordinates = async (cityName) => {
//     try {
//       const response = await fetch(
//         `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
//           cityName
//         )}&key=d556c44d940a48aba408e58ee8683b9c`
//       );
//       const data = await response.json();
//       if (data.results && data.results.length > 0) {
//         const { lat, lng } = data.results[0].geometry;
//         setCoordinates({ lat, lng });
//         console.log("Coordinates:", { lat, lng });
//       } else {
//         console.error("No results found for the city.");
//       }
//     } catch (error) {
//       console.error("Error fetching coordinates:", error);
//     }
//   };

//   // Function to fetch city details from the API
//   const fetchCityDetails = async (cityid) => {
//     try {
//       const response = await fetch(
//         `https://partnermeatwala.com/api/customer/getcitydetail?cityid=${cityid}`
//       );
//       const data = await response.json();
//       if (data.success === "1") {
//         setCityDetails(data.cityinfo);
//       } else {
//         console.error("Failed to fetch city details");
//       }
//     } catch (error) {
//       console.error("Error fetching city details:", error);
//     }
//   };
//   console.log("City here:-", cityid);

//   return (
//     <div>
//       <>
//         <Helmet>
//           <title>
//             Halal Meat in {cityName} – Local Butchers & Delivery | Meatwala
//           </title>
//           <meta
//             name="description"
//             content={`Looking for Halal meat in ${cityName}? Order from trusted local halal butchers with fast halal meat delivery near you. Fresh & high-quality cuts!`}
//           />
//         </Helmet>
//         {/* Header section start */}
//         <Navbar text="city" />
//         <section
//           className=""
//           style={{ borderBottom: "4px solid rgb(263,62,52)" }}
//         >
//           <div>
//             <div className="row g-2">
//               <div className="col-lg-6 col-12">
//                 <div className="" style={{ padding: 50, margin: "9% auto" }}>
//                   <h2
//                     className="mb-2 "
//                     style={{ textTransform: "uppercase", fontSize: "52px" }}
//                   >
//                     {cityDetails?.heading}
//                   </h2>
//                   <h2
//                     className=" mb-3"
//                     style={{ fontSize: "20px", marginBottom: "10px" }}
//                   >
//                     {cityDetails?.subheading}{" "}
//                     <strong
//                       style={{ color: "rgb(263,63,52)", fontSize: "25px" }}
//                     >
//                       {cityName} <i class="bi bi-geo-fill"></i>
//                     </strong>
//                   </h2>
//                   <Link
//                     to="/generateTicket"
//                     className="btn btn-primary"
//                     style={{ background: "rgb(263,62,53)" }}
//                   >
//                     {" "}
//                     Order Now
//                   </Link>
//                 </div>
//               </div>
//               <div className="col-lg-6 position-relative">
//                 {coordinates.lat && coordinates.lng ? (
//                   <iframe
//                     src={`https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14322.206526834604!2d${
//                       coordinates.lng
//                     }!3d${
//                       coordinates.lat
//                     }!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${coordinates.lat.toFixed(
//                       4
//                     )}N ${coordinates.lng.toFixed(
//                       4
//                     )}E!5e0!3m2!1sen!2sus!4v1697362938123`}
//                     width="100%"
//                     height={450}
//                     frameBorder={0}
//                     style={{ border: 0 }}
//                     allowFullScreen=""
//                     loading="lazy"
//                   />
//                 ) : (
//                   <p>Fetching map for {cityName}...</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </section>
//         {/* Service 5 - Bootstrap Brain Component */}
//         <div className="">
//           <div className="container">
//             <div className="row gy-4 gy-md-5 gy-lg-0 align-items-center">
//               <div className="col-12 col-lg-5">
//                 <div className="row">
//                   <div className="col-12 col-xl-11">
//                     <h3 className="fs-6 text-secondary mb-3 mb-xl-4 text-uppercase">
//                       About Us
//                     </h3>
//                     <h2 className="display-5 mb-3 mb-xl-4">
//                       {cityDetails?.aboutHeading}
//                     </h2>
//                     <p className="mb-3 mb-xl-4">
//                       {cityDetails?.aboutSubHeading}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-12 col-lg-7">
//                 <div className="row">
//                   <div className="col-12 col-sm-6">
//                     <div
//                       className="card border-0 border-bottom border-primary"
//                       style={{
//                         boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
//                       }}
//                     >
//                       <div className="card-body text-center p-4 p-xxl-5">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width={56}
//                           height={56}
//                           fill="rgb(232, 65, 53)"
//                           className="bi bi-textarea-resize text-danger mb-4"
//                           viewBox="0 0 16 16"
//                         >
//                           <path d="M0 4.5A2.5 2.5 0 0 1 2.5 2h11A2.5 2.5 0 0 1 16 4.5v7a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 11.5v-7zM2.5 3A1.5 1.5 0 0 0 1 4.5v7A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 13.5 3h-11zm10.854 4.646a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708l3-3a.5.5 0 0 1 .708 0zm0 2.5a.5.5 0 0 1 0 .708l-.5.5a.5.5 0 0 1-.708-.708l.5-.5a.5.5 0 0 1 .708 0z" />
//                         </svg>
//                         <h5 className="mb-4">Trusted Local Butchers</h5>
//                         <p className="mb-4 text-secondary">
//                           {cityDetails?.marketResearch}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-12 col-sm-6">
//                     <div
//                       className="card border-0 border-bottom border-primary"
//                       style={{
//                         boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
//                       }}
//                     >
//                       <div className="card-body text-center p-4 p-xxl-5">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width={56}
//                           height={56}
//                           fill="rgb(232, 65, 53)"
//                           className="bi bi-tablet text-danger mb-4"
//                           viewBox="0 0 16 16"
//                         >
//                           <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z" />
//                           <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
//                         </svg>
//                         <h5 className="mb-4">Connected</h5>
//                         <p className="mb-4 text-secondary">
//                           {cityDetails?.connected}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-12 col-sm-6">
//                     <div
//                       className="card border-0 border-bottom border-primary"
//                       style={{
//                         boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
//                       }}
//                     >
//                       <div className="card-body text-center p-4 p-xxl-5">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width={56}
//                           height={56}
//                           fill="rgb(232, 65, 53)"
//                           className="bi bi-repeat text-danger mb-4"
//                           viewBox="0 0 16 16"
//                         >
//                           <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192Zm3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z" />
//                         </svg>
//                         <h5 className="mb-4">Daily Updates</h5>
//                         <p className="mb-4 text-secondary">
//                           {cityDetails?.dailyUpdates}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-12 col-sm-6">
//                     <div
//                       className="card border-0 border-bottom border-primary"
//                       style={{
//                         boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
//                       }}
//                     >
//                       <div className="card-body text-center p-4 p-xxl-5">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width={56}
//                           height={56}
//                           fill="rgb(232, 65, 53)"
//                           className="bi bi-shield-check text-danger mb-4"
//                           viewBox="0 0 16 16"
//                         >
//                           <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
//                           <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
//                         </svg>
//                         <h5 className="mb-4">Free Support</h5>
//                         <p className="mb-4 text-secondary">
//                           {cityDetails?.freeSupport}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* <section className="bg-light pt-5 pb-5 near-me">
//           <div className="container">
//             <div className="row">
//               <div className="locations text-center">
//                 <h4>
//                   We offer across the country, For your specific location page <br />{" "}
//                   please select from the below:
//                 </h4>
//                 <ul>
//                   <li>
//                     <a href="/near-me/oxfordshire/abingdon-on-thames">
//                       Abingdon-on-Thames
//                     </a>
//                   </li>{" "}
//                   <li>
//                     <a href="/near-me/oxfordshire/banbury">Banbury</a>
//                   </li>{" "}
//                   <li>
//                     <a href="/near-me/oxfordshire/bicester">Bicester</a>
//                   </li>{" "}
//                   <li>
//                     <a href="/near-me/oxfordshire/burford">Burford</a>
//                   </li>{" "}
//                   <li>
//                     <a href="/near-me/oxfordshire/carterton">Carterton</a>
//                   </li>{" "}
//                   <li>
//                     <a href="/near-me/oxfordshire/charlbury">Charlbury</a>
//                   </li>{" "}
//                   <li>
//                     <a href="/near-me/oxfordshire/chipping-norton">Chipping Norton</a>
//                   </li>{" "}
//                   <li>
//                     <a href="/near-me/oxfordshire/didcot">Didcot</a>
//                   </li>{" "}
//                   <li>
//                     <a href="/near-me/oxfordshire/faringdon">Faringdon</a>
//                   </li>{" "}
//                   <li>
//                     <a href="/near-me/oxfordshire/henley-on-thames">
//                       Henley-on-Thames
//                     </a>
//                   </li>{" "}
//                   <li>
//                     <a href="/near-me/oxfordshire/kidlington">Kidlington</a>
//                   </li>{" "}
//                   <li>
//                     <a href="/near-me/oxfordshire/oxford">Oxford</a>
//                   </li>{" "}
//                   <li>
//                     <a href="/near-me/oxfordshire/thame">Thame</a>
//                   </li>{" "}
//                   <li>
//                     <a href="/near-me/oxfordshire/wallingford">Wallingford</a>
//                   </li>{" "}
//                   <li>
//                     <a href="/near-me/oxfordshire/wantage">Wantage</a>
//                   </li>{" "}
//                   <li>
//                     <a href="/near-me/oxfordshire/watlington">Watlington</a>
//                   </li>{" "}
//                   <li>
//                     <a href="/near-me/oxfordshire/witney">Witney</a>
//                   </li>{" "}
//                   <li>
//                     <a href="/near-me/oxfordshire/woodstock">Woodstock</a>
//                   </li>
//                 </ul>{" "}
//                 <div className="clear" />
//               </div>
//             </div>
//           </div>
//         </section> */}
//         {/* footer section starts */}
//         <Footer />
//         {/* footer section end */}
//         {/* mobile fix menu start */}
//         <FooterMobileMenu />
//         {/* mobile fix menu end */}
//       </>
//     </div>
//   );
// };

// export default City;



import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FooterMobileMenu from "../components/FooterMobileMenu";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const City = () => {
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const { cityName, cityid } = useParams();
  const [cityDetails, setCityDetails] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    about: false,
    marketResearch: false,
    connected: false,
    dailyUpdates: false,
    freeSupport: false
  });

  useEffect(() => {
    if (cityName) {
      fetchCityCoordinates(cityName);
    }

    if (cityid) {
      fetchCityDetails(cityid);
    }
  }, [cityName, cityid]);

  const fetchCityCoordinates = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          cityName
        )}&key=d556c44d940a48aba408e58ee8683b9c`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        setCoordinates({ lat, lng });
      } else {
        console.error("No results found for the city.");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  const fetchCityDetails = async (cityid) => {
    try {
      const response = await fetch(
        `https://partnermeatwala.com/api/customer/getcitydetail?cityid=${cityid}`
      );
      const data = await response.json();
      if (data.success === "1") {
        setCityDetails(data.cityinfo);
      } else {
        console.error("Failed to fetch city details");
      }
    } catch (error) {
      console.error("Error fetching city details:", error);
    }
  };

  const toggleExpand = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const renderTextWithToggle = (text, section, maxLength = 150) => {
    if (!text) return null;
    
    if (text.length <= maxLength || expandedSections[section]) {
      return (
        <>
          <p className="mb-4 text-secondary">
            {text}
            {text.length > maxLength && (
              <button 
                onClick={() => toggleExpand(section)} 
                className="btn btn-link p-0 ms-2"
                style={{ color: "rgb(232, 65, 53)" }}
              >
                Show Less
              </button>
            )}
          </p>
        </>
      );
    }
    
    return (
      <p className="mb-4 text-secondary">
        {`${text.substring(0, maxLength)}...`}
        <button 
          onClick={() => toggleExpand(section)} 
          className="btn btn-link p-0 ms-2"
          style={{ color: "rgb(232, 65, 53)" }}
        >
          Show More
        </button>
      </p>
    );
  };

  return (
    <div>
      <>
        <Helmet>
          <title>
            Halal Meat in {cityName} – Local Butchers & Delivery | Meatwala
          </title>
          <meta
            name="description"
            content={`Looking for Halal meat in ${cityName}? Order from trusted local halal butchers with fast halal meat delivery near you. Fresh & high-quality cuts!`}
          />
        </Helmet>
        {/* Header section start */}
        <Navbar text="city" />
        <section
          className=""
          style={{ borderBottom: "4px solid rgb(263,62,52)" }}
        >
          <div>
            <div className="row g-2">
              <div className="col-lg-6 col-12">
                <div className="" style={{ padding: 50, margin: "9% auto" }}>
                  <h2
                    className="mb-2"
                    style={{ textTransform: "uppercase", fontSize: "32px" }}
                  >
                    {cityDetails?.heading}
                  </h2>
                  <h2
                    className=" mb-3"
                    style={{ fontSize: "20px", marginBottom: "10px" }}
                  >
                    {cityDetails?.subheading}{" "}
                    <strong
                      style={{ color: "rgb(263,63,52)", fontSize: "25px" }}
                    >
                      {cityName} <i className="bi bi-geo-fill"></i>
                    </strong>
                  </h2>
                  <Link
                    to="/"
                    className="btn btn-primary"
                    style={{ background: "rgb(263,62,53)" }}
                  >
                    {" "}
                    Find Butchers Near You 
                  </Link>
                </div>
              </div>
              <div className="col-lg-6 position-relative">
                {coordinates.lat && coordinates.lng ? (
                  <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14322.206526834604!2d${
                      coordinates.lng
                    }!3d${
                      coordinates.lat
                    }!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${coordinates.lat.toFixed(
                      4
                    )}N ${coordinates.lng.toFixed(
                      4
                    )}E!5e0!3m2!1sen!2sus!4v1697362938123`}
                    width="100%"
                    height={450}
                    frameBorder={0}
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  />
                ) : (
                  <p>Fetching map for {cityName}...</p>
                )}
              </div>
            </div>
          </div>
        </section>
        {/* Service 5 - Bootstrap Brain Component */}
        <div className="">
          <div className="container">
            <div className="row gy-4 gy-md-5 gy-lg-0 align-items-center">
              <div className="col-12 col-lg-5">
                <div className="row">
                  <div className="col-12 col-xl-11">
                    <h3 className="fs-6 text-secondary mb-3 mb-xl-4 text-uppercase">
                      About Us
                    </h3>
                    <h2 className="display-5 mb-3 mb-xl-4">
                      {cityDetails?.aboutHeading}
                    </h2>
                    {renderTextWithToggle(cityDetails?.aboutSubHeading, 'about', 200)}
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-7">
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <div
                      className="card border-0 border-bottom border-primary"
                      style={{
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      }}
                    >
                      <div className="card-body text-center p-4 p-xxl-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={56}
                          height={56}
                          fill="rgb(232, 65, 53)"
                          className="bi bi-textarea-resize text-danger mb-4"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 4.5A2.5 2.5 0 0 1 2.5 2h11A2.5 2.5 0 0 1 16 4.5v7a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 11.5v-7zM2.5 3A1.5 1.5 0 0 0 1 4.5v7A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 13.5 3h-11zm10.854 4.646a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708l3-3a.5.5 0 0 1 .708 0zm0 2.5a.5.5 0 0 1 0 .708l-.5.5a.5.5 0 0 1-.708-.708l.5-.5a.5.5 0 0 1 .708 0z" />
                        </svg>
                        <h5 className="mb-4">Trusted Local Butchers</h5>
                        {renderTextWithToggle(cityDetails?.marketResearch, 'marketResearch')}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div
                      className="card border-0 border-bottom border-primary"
                      style={{
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      }}
                    >
                      <div className="card-body text-center p-4 p-xxl-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={56}
                          height={56}
                          fill="rgb(232, 65, 53)"
                          className="bi bi-tablet text-danger mb-4"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z" />
                          <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                        </svg>
                        <h5 className="mb-4">Easy Online Ordering</h5>
                        {renderTextWithToggle(cityDetails?.connected, 'connected')}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div
                      className="card border-0 border-bottom border-primary"
                      style={{
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      }}
                    >
                      <div className="card-body text-center p-4 p-xxl-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={56}
                          height={56}
                          fill="rgb(232, 65, 53)"
                          className="bi bi-repeat text-danger mb-4"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192Zm3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z" />
                        </svg>
                        <h5 className="mb-4">Delivery & Collection </h5>
                        {renderTextWithToggle(cityDetails?.dailyUpdates, 'dailyUpdates')}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div
                      className="card border-0 border-bottom border-primary"
                      style={{
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      }}
                    >
                      <div className="card-body text-center p-4 p-xxl-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={56}
                          height={56}
                          fill="rgb(232, 65, 53)"
                          className="bi bi-shield-check text-danger mb-4"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
                          <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                        </svg>
                        <h5 className="mb-4">Discounts & Rewards</h5>
                        {renderTextWithToggle(cityDetails?.freeSupport, 'freeSupport')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* footer section starts */}
        <Footer />
        {/* footer section end */}
        {/* mobile fix menu start */}
        <FooterMobileMenu />
        {/* mobile fix menu end */}
      </>
    </div>
  );
};

export default City;