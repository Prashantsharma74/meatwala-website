import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Delivery from "../components/delivery";
import Footer from "../components/Footer";
import FooterMobileMenu from "../components/FooterMobileMenu";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const API_URL = "https://partnermeatwala.com/api/customer/contactuscustomer";

const Contact = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  // UI state
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const onChange = (e) => {
    const { id, value } = e.target;
    // Map input ids to state keys
    const map = {
      inputFirstname: "firstName",
      inputLastname: "lastName",
      inputEmail: "email",
      inputPhone: "phone",
      inputtext: "message",
    };
    setForm((f) => ({ ...f, [map[id] || id]: value }));
  };

  const validate = () => {
    // Basic validation
    if (!form.firstName.trim()) return "First name is required.";
    if (!form.lastName.trim()) return "Last name is required.";
    if (!form.email.trim()) return "Email is required.";
    // Simple email regex
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return "Please enter a valid email.";
    if (!form.phone.trim()) return "Phone number is required.";
    if (form.message.trim().length < 10)
      return "Message should be at least 10 characters.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", msg: "" });

    const err = validate();
    if (err) {
      setStatus({ type: "error", msg: err });
      return;
    }

    setSubmitting(true);

    const payload = {
      firstname: form.firstName,
      lastname: form.lastName,
      email: form.email,
      phone: form.phone,
      request: form.message,
    };

    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 20000);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ✅ keep JSON
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(t);

      let data = null;
      try {
        data = await res.json();
      } catch {
        // ignore if not JSON
      }

      if (res.ok) {
        setStatus({
          type: "success",
          msg:
            (data && (data.message || data.msg)) ||
            "Thanks! Your message has been sent.",
        });
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        const serverMsg =
          (data && (data.error || data.message || data.msg)) ||
          `Request failed with status ${res.status}.`;
        setStatus({ type: "error", msg: serverMsg });
      }
    } catch (err) {
      const msg =
        err.name === "AbortError"
          ? "Request took too long. Please try again."
          : "Network error. Please check your connection and try again.";
      setStatus({ type: "error", msg });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
    setStatus({ type: "", msg: "" });
  };

  useEffect(() => {
    if (status.msg) {
      if (status.type === "success") {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: status.msg,
        });
      } else if (status.type === "error") {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: status.msg,
        });
      }
    }
  }, [status]);

  return (
    <>
      <Helmet>
        <title>
          Contact Meatwala | Get in Touch with Your Local Halal Meat Experts
        </title>
        <meta
          name="description"
          content="Have a question about Halal meat delivery or your order? Contact Meatwala’s support team for assistance. We’re here to help!"
        />
      </Helmet>
      <Navbar />
      <section className="section-t-space section-b-space mytabb overflow-hidden pt-120">
        {/* <div className="container text-center">
      <div className="tab">
        <div>
          <Link className="tablinks active">
            <i className="fa fa-motorcycle" /> Delivery{" "}
          </Link>
          <Link className="tablinks">
            <i className="fa fa-shopping-bag" aria-hidden="true" /> Collection
          </Link>
        </div>
      </div>
    </div> */}
        <Delivery />
      </section>
      <section className="page-head-section">
        <div className="container page-heading">
          <h2 className="h3 mb-3 text-white text-center">Contact Us</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb flex-lg-nowrap justify-content-center justify-content-lg-star">
              <li className="breadcrumb-item">
                <Link href="index.html">
                  <i className="ri-home-line" />
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Contact Us
              </li>
            </ol>
          </nav>
        </div>
      </section>
      <section className="section-b-space bg-color">
        <div className="container">
          <div className="title animated-title">
            <div className="loader-line" />
            <div className="d-flex align-items-center justify-content-between flex-wrap w-100">
              <div>
                <h2>Contact Us For Support</h2>
                <h6>If you have any queries.</h6>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="contact-form">

                {/* {status.msg ? (
                  <div
                    className={`alert ${status.type === "success"
                      ? "alert-success"
                      : "alert-danger"
                      }`}
                    role="alert"
                  >
                    {status.msg}
                  </div>
                ) : null} */}

                <form className="row" onSubmit={handleSubmit} noValidate>
                  <div className="col-md-6">
                    <label htmlFor="inputFirstname" className="form-label mt-0">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputFirstname"
                      value={form.firstName}
                      onChange={onChange}
                      disabled={submitting}
                      placeholder="Enter your fist name"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputLastname" className="form-label mt-0">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputLastname"
                      placeholder="Enter your last name"
                      value={form.lastName}
                      onChange={onChange}
                      disabled={submitting}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputEmail" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail"
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={onChange}
                      disabled={submitting}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputPhone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="inputPhone"
                      placeholder="Enter your number"
                      value={form.phone}
                      onChange={onChange}
                      disabled={submitting}
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="inputtext" className="form-label">
                      How Can We Help You?
                    </label>
                    <textarea
                      className="form-control"
                      id="inputtext"
                      rows={3}
                      placeholder="Hi there, I would like to...."
                      defaultValue={""}
                      value={form.message}
                      onChange={onChange}
                      disabled={submitting}
                      required
                    />
                  </div>
                  <div className="buttons d-flex align-items-center justify-content-end gap-3">
                    {/* <Link href="contact.html.html" className="btn gray-btn mt-0">
                    CANCEL
                  </Link>
                  <Link href="index.html" className="btn theme-btn mt-0">
                    SUBMIT
                  </Link> */}
                    <button
                      type="button"
                      className="btn gray-btn mt-0"
                      onClick={handleCancel}
                      disabled={submitting}
                    >
                      CANCEL
                    </button>

                    <button
                      type="submit"
                      className="btn theme-btn mt-0"
                      disabled={submitting}
                    >
                      {submitting ? "Submitting..." : "SUBMIT"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <FooterMobileMenu />
      <div
        className="modal fade location-modal"
        id="location"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">
                <h5 className="fw-semibold">Select a Location</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
            </div>
            <div className="modal-body">
              <div className="search-section">
                <form className="form_search" role="form">
                  <input
                    type="search"
                    placeholder="Search Location"
                    className="nav-search nav-search-field"
                  />
                </form>
              </div>
              <Link href="" className="current-location">
                <div className="current-address">
                  <i className="ri-focus-3-line focus" />
                  <div>
                    <h5>Use current-location</h5>
                    <h6>Wellington St., Ottawa, Ontario, Canada</h6>
                  </div>
                </div>
                <i className="ri-arrow-right-s-line arrow" />
              </Link>
              <h5 className="mt-sm-3 mt-2 fw-medium recent-title dark-text">
                Recent Location
              </h5>
              <Link href="" className="recent-location">
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
              <Link href="#" className="btn gray-btn" data-bs-dismiss="modal">
                Close
              </Link>
              <Link
                href="#"
                className="btn theme-btn mt-0"
                data-bs-dismiss="modal"
              >
                Save
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
