import React, { useState, useEffect } from 'react';
import { supportbyId,Updateticket } from '../utils/api';
import Delivery from '../components/delivery';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FooterMobileMenu from '../components/FooterMobileMenu';
import Profileshow from '../components/Profileshow';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Ticketdetails = () => {
  const { ticketId } = useParams(); 
  const [supportTicket, setSupportTicket] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const storedUser = JSON.parse(localStorage.getItem('user'));

  const getAllsupport = async () => {
    const data = { pkid: ticketId }; 
    const response = await supportbyId(data);
    
    if (response.status === "1") {
      const ticket = response.custsupportlist[0]; 
      setSupportTicket(ticket);
    }
  };

  const handleSendMessage = async() => {
    if (newMessage.trim() === '') return;

    // Add new message to the chat (optimistic update)
    const newChatMessage = {
      pkid: Date.now().toString(), 
      fk_supportid: supportTicket.pkid,
      isadmin: "0",
      issuetype: "",
      title: "",
      description: newMessage,
      imagename: "PhotoNotSelected.png",
  
    };

// const data = Updateticket(newChatMessage)
//     setSupportTicket({
//       ...supportTicket,
//       suppoertticketdetail: [...supportTicket.suppoertticketdetail, newChatMessage],
//     });

    setNewMessage(''); // Clear the input field
    const formData = new FormData();
    formData.append('fk_supportid', newChatMessage.fk_supportid);
    formData.append('isadmin', newChatMessage.isadmin);
    formData.append('issuetype', newChatMessage.issuetype);
    formData.append('title', newChatMessage.title);
    formData.append('description', newChatMessage.description);
    formData.append('status', supportTicket.status);
    formData.append('image', newChatMessage.imagename);

    const data = await Updateticket(formData);
    if(data.status == "1"){
      getAllsupport();
    }
  };



  useEffect(() => {
    getAllsupport();
    const intervalId = setInterval(() => {
      getAllsupport();
    }, 900000); // 900,000 milliseconds = 15 minutes

    return () => clearInterval(intervalId);
  }, [ticketId]);

  return (
    <>
      <Navbar/>
      <section className="section-t-space mytabb overflow-hidden pt-120">
        <Delivery/>
      </section>
      <section className="page-head-section">
        <div className="container page-heading">
          <h2 className="h3 mb-3 text-white text-center">Support Ticket</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb flex-lg-nowrap justify-content-center justify-content-lg-star">
              <li className="breadcrumb-item">
                <Link href="/">
                  <i className="ri-home-line" />
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Ticket Details
              </li>
            </ol>
          </nav>
        </div>
      </section>
      <section className="profile-section section-b-space">
        <div className="container">
          <div className="row g-3">
            <div className="col-lg-3">
              <Profileshow selected={"ticket"}/>
            </div>
            <div className="col-lg-9">
              <div className="address-section bg-color h-100 mt-0">
                <div className="col-lg-12 d-flex justify-content-between mb-3">
                  <div className="title">
                    <h3>Support Ticket</h3>
                  </div>
                </div>
                <div className="row g-3">
                  <div className="col-md-12">
                    <div className="address-box white-bg">
                      {supportTicket ? (
                        <div className="address-details">
                          <p><strong>Title:</strong> {supportTicket.title}</p>
                          <p><strong>Description:</strong> {supportTicket.description}</p>
                          <p><strong>Ticket Number:</strong> {supportTicket.ticketno}</p>
                          <p><strong>Ticket Date:</strong> {supportTicket.cdate}</p>
                          {supportTicket.imagename && (
  <div className="ticket-image mt-3">
    <p><strong>Attached Image:</strong></p>
    <img
      src={`https://partnermeatwala.com/documents/${supportTicket.imagename}`}
      alt="Ticket Attachment"
      style={{ maxWidth: "300px", borderRadius: "8px", marginTop: "10px" }}
    />
  </div>
)}

                          <div className="chat-box">
                            {supportTicket.suppoertticketdetail.map((detail, index) => (
                              <div key={index} className={`chat-message ${detail.isadmin === "1" ? 'admin' : 'user'}`}>
                                <p> {detail.description}</p>
                                <p className="chat-date">{detail.cdate}</p>
                              </div>
                            )).reverse()}
                          </div>

                          <div className="chat-input" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
  <textarea
    value={newMessage}
    onChange={(e) => setNewMessage(e.target.value)}
    placeholder="Type your message..."
    style={{
      width: '100%',
      padding: '10px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      fontSize: '16px',
      resize: 'none',
    }}
  />
  <button
    onClick={handleSendMessage}
    style={{
      marginLeft: '10px',
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
    }}
  >
    Send
  </button>
</div>

                        </div>
                      ) : (
                        <p>No ticket selected.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
      <FooterMobileMenu/>
    </>
  );
};

export default Ticketdetails;
