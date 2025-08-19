import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateTicket } from '../utils/api';
import Delivery from '../components/delivery';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FooterMobileMenu from '../components/FooterMobileMenu';
import Profileshow from '../components/Profileshow';
import { Link } from 'react-router-dom';
import bgimg from "../assets/support.jpg";
import Swal from 'sweetalert2';

const CreateTicket = () => {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate()
  const storedUser = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('userid', storedUser?.userid);
    formData.append('usertype', 'c');
    formData.append('title', title);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await generateTicket(formData);
      if (response.status == "1") {
        setDescription("")
        setTitle("")
        setImage(null)
        Swal.fire({
          icon: "success",
          title: "Form Submitted!",
          text: "Your support ticket has been successfully submitted.",
          timer: 2000,
          showConfirmButton: false
        });
        navigate("/support")
      }
      // Handle success (e.g., show a success message, clear the form)
    } catch (error) {
      console.error('Error creating ticket:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <>
      <Navbar />
      <Delivery />

      <section
        className="contactusImage"
        style={{
          backgroundImage: `url(${bgimg})`,
         
        }}>
        <div className="container page-heading">
          <h2 className="h3  text-white text-center mt-3">Support</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb flex-lg-nowrap justify-content-center justify-content-lg-start">
              {/* <li className="breadcrumb-item">
                <Link href="index.html">
                  <i className="ri-home-line" />
                  Home
                </Link>
              </li> */}
              {/* <li className="breadcrumb-item active" aria-current="page">
                Support
              </li> */}
            </ol>
          </nav>
        </div>
      </section>

      <section className="profile-section section-b-space">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 mt-2">
              <Profileshow selected="ticket" />
            </div>
            <div className="col-lg-9">
              <div className="address-section bg-color h-100 mt-0">
                <div className="col-lg-12 d-flex justify-content-between">
                  <div className="title">
                    <div className="loader-line" />
                    <h3>Support</h3>
                  </div>
                </div>
                <div className="row  ">
                  <div className="col-md-12">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group mb-3">
                        <label>Subject </label>
                        <input
                          type="text"
                          name="title"
                          className="form-control"
                          placeholder="Enter Subject "
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label>Message</label>
                        <textarea
                          placeholder="Enter Message"
                          className="form-control"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          style={{ minHeight: '100px' }}
                          required
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label>Upload Image</label>
                        <input
                          type="file"
                          name="image"
                          className="form-control"
                          onChange={(e) => setImage(e.target.files[0])}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <button type="submit" className="btn theme-btn">
                          Send
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FooterMobileMenu />

      {/* Additional components like modals, scroll-to-top button, etc. */}
    </>
  );
};

export default CreateTicket;
