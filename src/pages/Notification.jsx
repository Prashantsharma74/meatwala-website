import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import FooterMobileMenu from '../components/FooterMobileMenu';
import Footer from '../components/Footer';
import { notification,Deletenotification } from '../utils/api';
import Profileshow from '../components/Profileshow';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaTrashAlt } from 'react-icons/fa';
const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  const getnotify = async () => {
    const response = await notification();
    if (response?.status === "1") {
      setNotifications(response.notificationlists);

    }
  };

  const [idss,setIdss] = useState("")
  const handleDelete = async (id) => {
    const data = { 
      ids:id 
    };
    const response = await Deletenotification(data);
    if (response?.status === "1") {
      toast.success(response.returnmsg);
      setNotifications((prev) =>
        prev.filter((notification) => notification.pkid !== id)
      );
    } else {
      toast.error("Failed to delete notification");
    }
  };
  useEffect(() => {
    getnotify();
  }, []);

  return (
    <>
      <Navbar />

      <section className="page-head-section">
        <div className="container page-heading">
          <h2 className="h3 mb-3 text-white text-center">Notification</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb flex-lg-nowrap justify-content-center justify-content-lg-star">
              <li className="breadcrumb-item">
                <Link href="index.html">
                  <i className="ri-home-line" />
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active">Notification</li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="profile-section section-b-space">
        <div className="container">
          <div className="row g-3">
            <div className="col-lg-3">
            <Profileshow selected={"notify"} />

            </div>
            <div className="col-lg-9">
              <div className="my-order-content">
                <div className="col-lg-12 d-flex justify-content-between mb-3">
                  <div className="title">
                    <div className="loader-line" />
                    <h3>Notifications</h3>
                  </div>
                </div>
                <ul className="notification">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <li key={notification.pkid} className="notification-box unread">
                      <div className="notification-content d-flex justify-content-between align-items-center">
                          <div>
                            <h5>{notification.title}</h5>
                            <h6>{notification.notificationdate}</h6>
                            <p>{notification.description}</p>
                          </div>
                          <FaTrashAlt
                            size={18}
                            style={{ color: 'red', cursor: 'pointer' }}
                            onClick={() => handleDelete(notification.pkid)}
                          />
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="notification-box">
                      <div className="notification-content">
                        <p>No notifications available.</p>
                      </div>
                      {/* 
                
                      
                      */}
                    </li>
                  )}
                </ul>
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

export default Notification;
