// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import { Link } from "react-router-dom";
// import FaqCom from "../components/FaqCom";
// import Delivery from "../components/delivery";
// import Footer from "../components/Footer";
// import FooterMobileMenu from "../components/FooterMobileMenu";
// import bgimg from "../assets/faqs.jpg";
// import { Helmet } from "react-helmet-async";

// const Faq = () => {
//   const [hasFaqData, setHasFaqData] = useState(false);

//   const handleFaqStatus = (status) => {
//     setHasFaqData(status);
//   };

//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     window.scrollTo(0, 0); 
//   }, []);

//   return (
//     <>
//       <Helmet>
//         <title>Meatwala FAQ | Halal Meat Delivery & Butcher Services</title>
//         <meta
//           name="description"
//           content="Have questions about ordering halal meat online? Find answers about delivery, payment, and quality in our FAQ section."
//         />
//       </Helmet>
//       <Navbar />
//       <section className="section-t-space mytabb overflow-hidden pt-120">
//         <Delivery />
//       </section>
//       <section
//         className="page-head-section"
//         style={{
//           backgroundImage: `url(${bgimg})`,
//           backgroundSize: "cover",
//           backgroundPosition: "cover",
//           backgroundRepeat: "no-repeat",
//           height: isMobile ? "auto" : "500px",
//         }}
//       >
//         <div className="container page-heading">
//           <nav aria-label="breadcrumb">
//           </nav>
//         </div>
//       </section>
//       <section className="section-b-space">
//         <div className="container">
//           <div className="faq-title">
//             <h2>Frequently Asked Questions</h2>
//           </div>
//           <div className="row">
//             <div className={hasFaqData ? "col-xl-4" : ""}>
//               <div className="side-img">
//                 <img
//                   className="img-fluid img"
//                   src="assets/images/faq.svg"
//                   alt="faq"
//                 />
//               </div>
//             </div>
//             <div className="col-xl-8">
//               <div
//                 className="accordion accordion-flush help-accordion"
//                 id="accordionFlushExample"
//               >
//                 <FaqCom onFaqStatusChange={handleFaqStatus} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <Footer />
//       <FooterMobileMenu />
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
//     </>
//   );
// };

// export default Faq;


import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import FaqCom from "../components/FaqCom";
import Delivery from "../components/delivery";
import Footer from "../components/Footer";
import FooterMobileMenu from "../components/FooterMobileMenu";
import bgimg from "../assets/faqs.jpg";
import { Helmet } from "react-helmet-async";

const Faq = () => {
  const [hasFaqData, setHasFaqData] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleFaqStatus = (status) => setHasFaqData(status);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Decide layout columns based on FAQ data presence
  const leftColClass = hasFaqData ? "col-xl-4 mb-4 mb-xl-0" : "d-none";
  const rightColClass = hasFaqData ? "col-xl-8" : "col-12";

  return (
    <>
      <Helmet>
        <title>Meatwala FAQ | Halal Meat Delivery & Butcher Services</title>
        <meta
          name="description"
          content="Have questions about ordering halal meat online? Find answers about delivery, payment, and quality in our FAQ section."
        />
      </Helmet>

      <Navbar />

      {/* top tabs / delivery control */}
      <section className="section-t-space mytabb overflow-hidden pt-120" role="region" aria-label="Order mode">
        <Delivery />
      </section>

      {/* Hero */}
      <header
        className="page-head-section d-flex align-items-center position-relative"
        style={{
          backgroundImage: `url(${bgimg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: isMobile ? "280px" : "420px",
        }}
      >
        {/* Gradient overlay for readability */}
        <div
          aria-hidden="true"
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.15) 100%)",
          }}
        />
        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="text-center text-white">
            <h1 className="mb-2" style={{ fontWeight: 700 }}>Frequently Asked Questions</h1>
            <p className="mb-0" style={{ opacity: 0.9 }}>
              Everything you need to know about ordering fresh halal meat & groceries.
            </p>
          </div>
        </div>
      </header>

      {/* Support CTA */}
      <section className="section-b-space pt-3 pb-0">
        <div className="container">
          <div
            className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2 p-3 p-md-4 rounded"
            style={{
              backgroundColor: "#fff",
              border: "1px solid #eee",
              boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
            }}
          >
            <div>
              <h3 className="h5 mb-1">Can’t find what you’re looking for?</h3>
              <p className="mb-0 text-muted">
                Our team is here to help with orders, delivery, or account questions.
              </p>
            </div>
            <Link to="/contact" className="btn theme-btn mt-0">
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <main className="section-b-space" role="main">
        <div className="container">
          <div className="row align-items-center">
            <div className={leftColClass}>
              <aside
                className="h-100 p-3 p-md-4 rounded"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #eee",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                }}
              >
                <div className="side-img text-center">
                  <img
                    className="img-fluid"
                    src="assets/images/faq.svg"
                    alt="FAQ illustration"
                    loading="lazy"
                    width="480"
                    height="360"
                    style={{ maxHeight: 320, objectFit: "contain" }}
                  />
                </div>
                {/* <hr className="my-3" /> */}
                <ul className="list-unstyled small mb-0 text-muted mt-2" style={{display:"flex",flexDirection:"column"}}>
                  <li className="mb-2"><strong>• Delivery & collection options</strong></li>
                  <li className="mb-2"><strong>• Payments & refunds</strong></li>
                  <li className="mb-2"><strong>• Quality & halal certification</strong></li>
                  <li><strong>• Loyalty points & charity</strong></li>
                </ul>
              </aside>
            </div>

            {/* Accordion */}
            <div className={rightColClass}>
              <section
                className="accordion accordion-flush help-accordion"
                id="accordionFlushExample"
                aria-label="FAQ list"
              >
                <FaqCom onFaqStatusChange={handleFaqStatus} />
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FooterMobileMenu />

      {/* Location Modal (unchanged, but keep for consistency) */}
      <div
        className="modal fade location-modal"
        id="location"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="locationTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">
                <h5 id="locationTitle" className="fw-semibold">Select a Location</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
            </div>
            <div className="modal-body">
              <div className="search-section">
                <form className="form_search" role="form" aria-label="Search location">
                  <input
                    type="search"
                    placeholder="Search Location"
                    className="nav-search nav-search-field"
                  />
                </form>
              </div>

              <Link to="" className="current-location">
                <div className="current-address">
                  <i className="ri-focus-3-line focus" />
                  <div>
                    <h5>Use current-location</h5>
                    <h6>Wellington St., Ottawa, Ontario, Canada</h6>
                  </div>
                </div>
                <i className="ri-arrow-right-s-line arrow" />
              </Link>

              <h5 className="mt-sm-3 mt-2 fw-medium recent-title dark-text">Recent Location</h5>

              <Link to="" className="recent-location">
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
              <button className="btn gray-btn" data-bs-dismiss="modal">Close</button>
              <button className="btn theme-btn mt-0" data-bs-dismiss="modal">Save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;
