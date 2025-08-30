// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
// import Delivery from '../components/delivery';
// import Profileshow from '../components/Profileshow';
// import { Allsupport } from '../utils/api';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import contactImage from '../assets/contactus.jpg'

// const Support = () => {
//   const [supportTickets, setSupportTickets] = useState([]);
//   const storedUser = JSON.parse(localStorage.getItem('user'));
//   const navigate = useNavigate();

//   const getAllsupport = async () => {
//     const data = {
//       userid: storedUser?.userid,
//       usertype: "c",
//     };
//     const response = await Allsupport(data);
    
//     if (response.status === "1") {
//       setSupportTickets(response.custsupportlist);
//     }
//   };



//   const handleOpenTicket = (ticketId) => {
//     navigate(`/ticketdetails/${ticketId}`); 
//   };

//   useEffect(() => {
//     getAllsupport();
//   }, []);

//   return (
//     <>
//       {/* Header section start */}
//       <Navbar />
//       {/* Header Section end */}
//       <Delivery />
//       <section className="page-head-section">  
//         <div className="container page-heading">
//           <h2 className="h3 mb-3 text-white text-center">Support</h2>
//           <nav aria-label="breadcrumb">
//             <ol className="breadcrumb flex-lg-nowrap justify-content-center justify-content-lg-start">
//               <li className="breadcrumb-item">
//                 <Link href="index.html">
//                   <i className="ri-home-line" />
//                   Home
//                 </Link>
//               </li>
//               <li className="breadcrumb-item active" aria-current="page">
//                 Support
//               </li>
//             </ol>
//           </nav>
//         </div>
//       </section>
//       {/* profile section starts */}
//       <section className="profile-section section-b-space">
//         <div className="container">
//           <div className="row g-3">
//             <div className="col-lg-3">
//               <Profileshow selected={"support"} />
//             </div>
//             <div className="col-lg-9">
//               <div className="address-section bg-color h-100 mt-0">
//                 <div className="col-lg-12 d-flex justify-content-between mb-3">
//                   <div className="title">
//                     <div className="loader-line" />
//                     <h3>Support</h3>
//                   </div>
//                   <div className="text-center mb-1">
//                     <Link to={"/generateTicket"} className="btn btn-primary">
//                       + Add
//                     </Link>
//                   </div>
//                 </div>
//                 <div className="row g-3">
//                   {supportTickets.map((ticket) => (
//                     <div key={ticket.srno} className="col-md-12">
//                       <div className="address-box white-bg">
//                         <div className="address-title">
//                           <div className="d-flex align-items-center gap-2">
//                             <h6>{ticket.title}</h6>
//                           </div>
//                           <button
//                             className="edit-btn mt-2"
//                             onClick={() => handleOpenTicket(ticket.pkid)}
//                           >
//                             {ticket.status}
//                           </button>
//                         </div>
//                         <div className="address-details">
//                           <p>{ticket.description}</p>
//                           {/* {ticket.imagename && (
//                             <img 
//                               src={`http://193.203.161.2:8000/images/${ticket.imagename}`} 
//                               alt="support" 
//                               style={{ maxWidth: "100px", height: "auto" }} 
//                             />
//                           )} */}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* profile section end */}
//       {/* footer section starts */}
//       <footer className="footer-section section-t-space">
//         {/* Footer content here */}
//       </footer>
//       {/* footer section end */}
//       {/* mobile fix menu start */}
//       <div className="mobile-menu d-md-none d-block mobile-cart">
//         <ul>
//           <li className="active">
//             <Link href="index.html" className="menu-box">
//               <i className="ri-home-4-line" />
//               <span>Home</span>
//             </Link>
//           </li>
//           <li className="mobile-category">
//             <Link href="#!" className="menu-box">
//               <i className="fa fa-cutlery mb-2 pt-1" />
//               <span>Dining</span>
//             </Link>
//           </li>
//           <li>
//             <Link href="history.html" className="menu-box">
//               <i className="ri-apps-line" />
//               <span>History</span>
//             </Link>
//           </li>
//           <li>
//             <Link href="setting.html" className="menu-box">
//               <i className="fa fa-user mb-2 pt-1" />
//               <span>Setting</span>
//             </Link>
//           </li>
//         </ul>
//       </div>
//       {/* mobile fix menu end */}
//       {/* location offcanvas start */}
//       <div
//         className="modal fade location-modal"
//         id="location"
//         data-bs-backdrop="static"
//         data-bs-keyboard="false"
//         tabIndex={-1}
//       >
//         {/* Location Modal content here */}
//       </div>
//       {/* location offcanvas end */}
//       {/* tap to top start */}
//       <button className="scroll scroll-to-top">
//         <i className="ri-arrow-up-s-line arrow" />
//       </button>
//       {/* tap to top end */}
//       {/* responsive space */}
//       <div className="responsive-space" />
//       {/* responsive space */}
//     </>
//   );
// };

// export default Support;

import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Delivery from "../components/delivery";
import Profileshow from "../components/Profileshow";
import { Allsupport } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import contactImage from "../assets/contactus.jpg";
import supportImage from "../assets/support.png";
import supportImage2 from "../assets/support3.png";
import FooterMobileMenu from "../components/FooterMobileMenu";
import Footer from "../components/Footer";

const STATUS_COLORS = {
  Open: { bg: "rgba(244, 67, 54, 0.12)", text: "#f44336" },        // red
  Pending: { bg: "rgba(255, 152, 0, 0.12)", text: "#ff9800" },     // orange
  Resolved: { bg: "rgba(76, 175, 80, 0.12)", text: "#4caf50" },    // green
  Closed: { bg: "rgba(96, 125, 139, 0.12)", text: "#607d8b" },     // blue-grey
};

const Badge = ({ status }) => {
  const s = STATUS_COLORS[status] || { bg: "rgba(0,0,0,0.08)", text: "#333" };
  return (
    <span
      className="badge"
      style={{
        backgroundColor: s.bg,
        color: s.text,
        borderRadius: 999,
        padding: "6px 10px",
        fontWeight: 600,
        fontSize: 12,
      }}
    >
      {status}
    </span>
  );
};

const SkeletonCard = () => (
  <div className="address-box white-bg placeholder-wave" style={{ borderRadius: 12 }}>
    <div className="address-title d-flex justify-content-between align-items-start">
      <div className="placeholder col-6" style={{ height: 20, marginBottom: 10 }} />
      <div className="placeholder col-2" style={{ height: 28 }} />
    </div>
    <div className="address-details">
      <div className="placeholder col-12" style={{ height: 10, marginBottom: 8 }} />
      <div className="placeholder col-10" style={{ height: 10, marginBottom: 8 }} />
      <div className="placeholder col-8" style={{ height: 10 }} />
    </div>
  </div>
);

const Support = () => {
  const [supportTickets, setSupportTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const getAllsupport = async () => {
    if (!storedUser?.userid) {
      setSupportTickets([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setLoadError("");
    try {
      const data = { userid: storedUser.userid, usertype: "c" };
      const response = await Allsupport(data);
      if (response?.status === "1") {
        setSupportTickets(Array.isArray(response.custsupportlist) ? response.custsupportlist : []);
      } else {
        setSupportTickets([]);
      }
    } catch (err) {
      setLoadError("Unable to load support tickets. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenTicket = (ticketId) => {
    navigate(`/ticketdetails/${ticketId}`);
  };

  useEffect(() => {
    getAllsupport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredTickets = useMemo(() => {
    const q = query.trim().toLowerCase();
    return supportTickets.filter((t) => {
      const matchesQuery =
        !q ||
        t.title?.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q) ||
        t.status?.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "All" || t.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [supportTickets, query, statusFilter]);

  return (
    <>
      {/* Header */}
      <Navbar />
      <Delivery />

      {/* Hero */}
      <section
        className="page-head-section d-flex align-items-center position-relative"
        style={{
          // backgroundImage: `url(${contactImage})`,
          backgroundImage: `url(${supportImage2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: 220,
        }}
      >
        <div
          aria-hidden="true"
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.35))" }}
        />
        <div className="container page-heading position-relative" style={{ zIndex: 1 }}>
          <h2 className="h3 mb-2 text-white text-center">Support</h2>
          <p className="mb-0 text-center text-white-50">
            Track your tickets, check statuses, and get help quickly.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="profile-section section-b-space">
        <div className="container">
          <div className="row g-3">
            {/* Sidebar */}
            <div className="col-lg-3">
              <Profileshow selected={"support"} />
            </div>

            {/* Main */}
            <div className="col-lg-9">
              <div className="address-section bg-color h-100 mt-0 p-3 p-md-4" style={{ borderRadius: 12 }}>
                {/* Header / actions */}
                <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-3">
                  <div className="title m-0">
                    <div className="loader-line" />
                    <h3 className="m-0">Your Tickets</h3>
                    <small className="text-muted">
                      {loading ? "Loading..." : `${filteredTickets.length} result${filteredTickets.length !== 1 ? "s" : ""}`}
                    </small>
                  </div>
                  {/* <div className="d-flex flex-column flex-sm-row gap-2">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="ri-search-line" />
                      </span>
                      <input
                        type="search"
                        className="form-control"
                        placeholder="Search by title, status..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </div>
                    <select
                      className="form-select"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option>All</option>
                      <option>Open</option>
                      <option>Pending</option>
                      <option>Resolved</option>
                      <option>Closed</option>
                    </select>
                    <Link to={"/generateTicket"} className="btn btn-primary">
                      + New Ticket
                    </Link>
                  </div> */}
                  <div className="d-flex flex-column flex-sm-row gap-2">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="ri-search-line" />
                      </span>
                      <input
                        type="search"
                        className="form-control"
                        placeholder="Search by title, status..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </div>
                    <select
                      className="form-select"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option>All</option>
                      <option>Open</option>
                      <option>Pending</option>
                      <option>Resolved</option>
                      <option>Closed</option>
                    </select>
                    <Link to={"/generateTicket"} className="btn btn-primary">
                      + New Ticket
                    </Link>
                  </div>
                </div>

                {/* States */}
                {loadError && (
                  <div className="alert alert-danger" role="alert">
                    {loadError}
                  </div>
                )}

                {/* List */}
                <div className="row g-3">
                  {loading ? (
                    <>
                      <div className="col-12"><SkeletonCard /></div>
                      <div className="col-12"><SkeletonCard /></div>
                      <div className="col-12"><SkeletonCard /></div>
                    </>
                  ) : filteredTickets.length === 0 ? (
                    <div className="col-12">
                      <div
                        className="text-center p-4 p-md-5"
                        style={{
                          border: "1px dashed #e4e4e4",
                          borderRadius: 12,
                          background: "#fff",
                        }}
                      >
                        <img
                          src="assets/images/faq.svg"
                          alt="No tickets"
                          loading="lazy"
                          width="320"
                          height="220"
                          style={{ maxWidth: "100%", height: "auto", opacity: 0.9 }}
                        />
                        <h5 className="mt-3">No tickets yet</h5>
                        <p className="text-muted mb-3">
                          Create your first support ticket and our team will get back to you shortly.
                        </p>
                        <Link to="/generateTicket" className="btn theme-btn mt-0">
                          Create Ticket
                        </Link>
                      </div>
                    </div>
                  ) : (
                    filteredTickets.map((ticket) => (
                      <div key={ticket.srno} className="col-12">
                        <div
                          className="address-box white-bg p-3 p-md-4"
                          style={{
                            borderRadius: 12,
                            cursor: "pointer",
                            transition: "box-shadow 120ms ease",
                          }}
                          onClick={() => handleOpenTicket(ticket.pkid)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") handleOpenTicket(ticket.pkid);
                          }}
                          tabIndex={0}
                          role="button"
                          aria-label={`Open ticket ${ticket.title}`}
                        >
                          <div className="address-title d-flex justify-content-between align-items-start">
                            <div className="d-flex align-items-center gap-2">
                              <h6 className="m-0">{ticket.title}</h6>
                            </div>
                            <Badge status={ticket.status} />
                          </div>

                          <div className="address-details mt-2">
                            <p className="mb-2 text-muted" style={{ whiteSpace: "pre-line" }}>
                              {ticket.description}
                            </p>
                            <div className="d-flex flex-wrap gap-3 small text-muted">
                              {ticket.createdon && (
                                <span><i className="ri-time-line" /> Created: {ticket.createdon}</span>
                              )}
                              {ticket.ticketno && (
                                <span><i className="ri-hashtag" /> Ticket#: {ticket.ticketno}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* logout modal end */}
  {/* footer section starts */}
  <Footer/>
  {/* footer section end */}
  {/* mobile fix menu start */}
  <FooterMobileMenu selected={"support"}/>
  {/* mobile fix menu end */}
  {/* location offcanvas start */}

      {/* simple footer space / mobile menu unchanged */}
      <footer className="footer-section section-t-space" />
      <div className="mobile-menu d-md-none d-block mobile-cart">
        <ul>
          <li className="active">
            <Link to="/" className="menu-box">
              <i className="ri-home-4-line" />
              <span>Home</span>
            </Link>
          </li>
          <li className="mobile-category">
            <Link to="#!" className="menu-box">
              <i className="fa fa-cutlery mb-2 pt-1" />
              <span>Dining</span>
            </Link>
          </li>
          <li>
            <Link to="/history" className="menu-box">
              <i className="ri-apps-line" />
              <span>History</span>
            </Link>
          </li>
          <li>
            <Link to="/setting" className="menu-box">
              <i className="fa fa-user mb-2 pt-1" />
              <span>Setting</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Back to top */}
      <button
        className="scroll scroll-to-top"
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <i className="ri-arrow-up-s-line arrow" />
      </button>

      <div className="responsive-space" />
    </>
  );
};

export default Support;
