import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Delivery from '../components/delivery';
import Profileshow from '../components/Profileshow';
import { Allsupport } from '../utils/api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import contactImage from '../assets/contactus.jpg'

const Support = () => {
  const [supportTickets, setSupportTickets] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const getAllsupport = async () => {
    const data = {
      userid: storedUser?.userid,
      usertype: "c",
    };
    const response = await Allsupport(data);
    
    if (response.status === "1") {
      setSupportTickets(response.custsupportlist);
    }
  };



  const handleOpenTicket = (ticketId) => {
    navigate(`/ticketdetails/${ticketId}`); 
  };

  useEffect(() => {
    getAllsupport();
  }, []);

  return (
    <>
      {/* Header section start */}
      <Navbar />
      {/* Header Section end */}
      <Delivery />
      <section className="page-head-section">  
        <div className="container page-heading">
          <h2 className="h3 mb-3 text-white text-center">Support</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb flex-lg-nowrap justify-content-center justify-content-lg-start">
              <li className="breadcrumb-item">
                <Link href="index.html">
                  <i className="ri-home-line" />
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Support
              </li>
            </ol>
          </nav>
        </div>
      </section>
      {/* profile section starts */}
      <section className="profile-section section-b-space">
        <div className="container">
          <div className="row g-3">
            <div className="col-lg-3">
              <Profileshow selected={"support"} />
            </div>
            <div className="col-lg-9">
              <div className="address-section bg-color h-100 mt-0">
                <div className="col-lg-12 d-flex justify-content-between mb-3">
                  <div className="title">
                    <div className="loader-line" />
                    <h3>Support</h3>
                  </div>
                  <div className="text-center mb-1">
                    <Link to={"/generateTicket"} className="btn btn-primary">
                      + Add
                    </Link>
                  </div>
                </div>
                <div className="row g-3">
                  {supportTickets.map((ticket) => (
                    <div key={ticket.srno} className="col-md-12">
                      <div className="address-box white-bg">
                        <div className="address-title">
                          <div className="d-flex align-items-center gap-2">
                            <h6>{ticket.title}</h6>
                          </div>
                          <button
                            className="edit-btn mt-2"
                            onClick={() => handleOpenTicket(ticket.pkid)}
                          >
                            {ticket.status}
                          </button>
                        </div>
                        <div className="address-details">
                          <p>{ticket.description}</p>
                          {/* {ticket.imagename && (
                            <img 
                              src={`http://193.203.161.2:8000/images/${ticket.imagename}`} 
                              alt="support" 
                              style={{ maxWidth: "100px", height: "auto" }} 
                            />
                          )} */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* profile section end */}
      {/* footer section starts */}
      <footer className="footer-section section-t-space">
        {/* Footer content here */}
      </footer>
      {/* footer section end */}
      {/* mobile fix menu start */}
      <div className="mobile-menu d-md-none d-block mobile-cart">
        <ul>
          <li className="active">
            <Link href="index.html" className="menu-box">
              <i className="ri-home-4-line" />
              <span>Home</span>
            </Link>
          </li>
          <li className="mobile-category">
            <Link href="#!" className="menu-box">
              <i className="fa fa-cutlery mb-2 pt-1" />
              <span>Dining</span>
            </Link>
          </li>
          <li>
            <Link href="history.html" className="menu-box">
              <i className="ri-apps-line" />
              <span>History</span>
            </Link>
          </li>
          <li>
            <Link href="setting.html" className="menu-box">
              <i className="fa fa-user mb-2 pt-1" />
              <span>Setting</span>
            </Link>
          </li>
        </ul>
      </div>
      {/* mobile fix menu end */}
      {/* location offcanvas start */}
      <div
        className="modal fade location-modal"
        id="location"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
      >
        {/* Location Modal content here */}
      </div>
      {/* location offcanvas end */}
      {/* tap to top start */}
      <button className="scroll scroll-to-top">
        <i className="ri-arrow-up-s-line arrow" />
      </button>
      {/* tap to top end */}
      {/* responsive space */}
      <div className="responsive-space" />
      {/* responsive space */}
    </>
  );
};

export default Support;
