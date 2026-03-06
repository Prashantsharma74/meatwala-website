import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateTicket } from "../utils/api";
import Delivery from "../components/delivery";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FooterMobileMenu from "../components/FooterMobileMenu";
import Profileshow from "../components/Profileshow";
import { Link } from "react-router-dom";
import bgimg from "../assets/support.jpg";
import Swal from "sweetalert2";

const CreateTicket = () => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [orderno, setOrderno] = useState("");
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append("userid", storedUser?.userid);
  //   formData.append("usertype", "c");
  //   formData.append("title", title);
  //   formData.append("description", description);
  //   formData.append("orderno", orderno);
  //   if (image) {
  //     formData.append("image", image);
  //   }

  //   try {
  //     const response = await generateTicket(formData);
  //     if (response.status == "1") {
  //       setDescription("");
  //       setTitle("");
  //       setImage(null);
  //       Swal.fire({
  //         icon: "success",
  //         title: "Form Submitted!",
  //         text: "Your support ticket has been successfully submitted.",
  //         timer: 2000,
  //         showConfirmButton: false,
  //       });
  //       navigate("/support");
  //     }
  //   } catch (error) {
  //     console.error("Error creating ticket:", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userid", storedUser?.userid);
    formData.append("usertype", "c");
    formData.append("orderno", orderno);
    formData.append("title", title);
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await generateTicket(formData);
      if (response.status == "1") {
        setOrderno(""); // optional reset
        setDescription("");
        setTitle("");
        setImage(null);

        Swal.fire({
          icon: "success",
          title: "Form Submitted!",
          text: "Your support ticket has been successfully submitted.",
          timer: 2000,
          showConfirmButton: false,
        });

        navigate("/support");
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Delivery />
      <section
        // className="contactusImage"
        className="page-head-section d-flex align-items-center position-relative"
        style={
          {
            // backgroundImage: `url(${bgimg})`,
          }
        }
      >
        <div className="container page-heading">
          <h2 className="h3 text-white text-center">Support</h2>
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
                        <label>Order ID</label>
                        <input
                          type="number"
                          name="orderno"
                          className="form-control"
                          placeholder="Enter Order ID"
                          value={orderno}
                          onChange={(e) => setOrderno(e.target.value)}
                          required
                        />
                      </div>
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
                          style={{ minHeight: "100px" }}
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
                        <button
                          type="submit"
                          className="btn "
                          style={{
                            marginLeft: "10px",
                            padding: "10px 20px",
                            backgroundColor: "rgb(232, 65, 53)",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                          }}
                        >
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
