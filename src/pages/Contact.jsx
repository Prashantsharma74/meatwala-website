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

  // NEW:
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const validateField = (key, value) => {
    switch (key) {
      case "firstName":
        if (!value.trim()) return "First name is required.";
        return "";
      case "lastName":
        if (!value.trim()) return "Last name is required.";
        return "";
      case "email":
        if (!value.trim()) return "Email is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please enter a valid email.";
        return "";
      case "phone":
        if (!value.trim()) return "Phone number is required.";
        if (!/^[0-9+()\-\s]{7,20}$/.test(value))
          return "Please enter a valid phone number.";
        return "";
      case "message":
        if (value.trim().length < 10)
          return "Message should be at least 10 characters.";
        return "";
      default:
        return "";
    }
  };

  const validateAll = (f) => {
    const next = {};
    Object.entries(f).forEach(([k, v]) => {
      const err = validateField(k, v);
      if (err) next[k] = err;
    });
    return next;
  };

  const onChange = (e) => {
    const { id, value } = e.target;
    const map = {
      inputFirstname: "firstName",
      inputLastname: "lastName",
      inputEmail: "email",
      inputPhone: "phone",
      inputtext: "message",
    };
    const key = map[id] || id;

    setForm((f) => {
      const next = { ...f, [key]: value };
      // live-validate edited field
      setErrors((prev) => ({ ...prev, [key]: validateField(key, value) }));
      return next;
    });
  };

  const onBlur = (e) => {
    const { id } = e.target;
    const map = {
      inputFirstname: "firstName",
      inputLastname: "lastName",
      inputEmail: "email",
      inputPhone: "phone",
      inputtext: "message",
    };
    const key = map[id] || id;
    setTouched((t) => ({ ...t, [key]: true }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setStatus({ type: "", msg: "" });

  //   const err = validate();
  //   if (err) {
  //     setStatus({ type: "error", msg: err });
  //     return;
  //   }

  //   setSubmitting(true);

  //   const payload = {
  //     firstname: form.firstName,
  //     lastname: form.lastName,
  //     email: form.email,
  //     phone: form.phone,
  //     request: form.message,
  //   };

  //   const controller = new AbortController();
  //   const t = setTimeout(() => controller.abort(), 20000);

  //   try {
  //     const res = await fetch(API_URL, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json", // ✅ keep JSON
  //         "Accept": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //       signal: controller.signal,
  //     });

  //     clearTimeout(t);

  //     let data = null;
  //     try {
  //       data = await res.json();
  //     } catch {
  //       // ignore if not JSON
  //     }

  //     if (res.ok) {
  //       setStatus({
  //         type: "success",
  //         msg:
  //           (data && (data.message || data.msg)) ||
  //           "Thanks! Your message has been sent.",
  //       });
  //       setForm({
  //         firstName: "",
  //         lastName: "",
  //         email: "",
  //         phone: "",
  //         message: "",
  //       });
  //     } else {
  //       const serverMsg =
  //         (data && (data.error || data.message || data.msg)) ||
  //         `Request failed with status ${res.status}.`;
  //       setStatus({ type: "error", msg: serverMsg });
  //     }
  //   } catch (err) {
  //     const msg =
  //       err.name === "AbortError"
  //         ? "Request took too long. Please try again."
  //         : "Network error. Please check your connection and try again.";
  //     setStatus({ type: "error", msg });
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", msg: "" });

    const nextErrors = validateAll(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        message: true,
      });
      // scroll to first error
      const firstKey = Object.keys(nextErrors)[0];
      const firstId = {
        firstName: "inputFirstname",
        lastName: "inputLastname",
        email: "inputEmail",
        phone: "inputPhone",
        message: "inputtext",
      }[firstKey];
      const el = document.getElementById(firstId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
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
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(t);

      let data = null;
      try { data = await res.json(); } catch { }

      if (res.ok) {
        setStatus({
          type: "success",
          msg: (data && (data.message || data.msg)) || "Thanks! Your message has been sent.",
        });
        setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
        setErrors({});
        setTouched({});
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
          confirmButtonColor: "#E84135"
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
                    {/* <input
                      type="text"
                      className="form-control"
                      id="inputFirstname"
                      value={form.firstName}
                      onChange={onChange}
                      disabled={submitting}
                      placeholder="Enter your fist name"
                      required
                    /> */}
                    <input
                      type="text"
                      id="inputFirstname"
                      className={`form-control ${touched.firstName && errors.firstName ? "is-invalid" : ""}`}
                      value={form.firstName}
                      onChange={onChange}
                      onBlur={onBlur}
                      placeholder="Enter your first name"
                    />
                    {touched.firstName && errors.firstName && (
                      <div className="invalid-feedback">{errors.firstName}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputLastname" className="form-label mt-0">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${touched.lastName && errors.lastName ? "is-invalid" : ""}`}
                      id="inputLastname"
                      placeholder="Enter your last name"
                      value={form.lastName}
                      onChange={onChange}
                      onBlur={onBlur}
                      disabled={submitting}
                      required
                      aria-invalid={!!(touched.lastName && errors.lastName)}
                      aria-describedby="err-lastName"
                    />
                    {touched.lastName && errors.lastName && (
                      <div id="err-lastName" className="invalid-feedback">{errors.lastName}</div>
                    )}

                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputEmail" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                      id="inputEmail"
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={onChange}
                      onBlur={onBlur}
                      disabled={submitting}
                      required
                      aria-invalid={!!(touched.email && errors.email)}
                      aria-describedby="err-email"
                    />
                    {touched.email && errors.email && (
                      <div id="err-email" className="invalid-feedback">{errors.email}</div>
                    )}

                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputPhone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className={`form-control ${touched.phone && errors.phone ? "is-invalid" : ""}`}
                      id="inputPhone"
                      placeholder="Enter your number"
                      value={form.phone}
                      onChange={onChange}
                      onBlur={onBlur}
                      disabled={submitting}
                      required
                      aria-invalid={!!(touched.phone && errors.phone)}
                      aria-describedby="err-phone"
                    />
                    {touched.phone && errors.phone && (
                      <div id="err-phone" className="invalid-feedback">{errors.phone}</div>
                    )}

                  </div>
                  <div className="col-md-12">
                    <label htmlFor="inputtext" className="form-label">
                      How Can We Help You?
                    </label>
                    <textarea
                      className={`form-control ${touched.message && errors.message ? "is-invalid" : ""}`}
                      id="inputtext"
                      rows={3}
                      placeholder="Hi there, I would like to..."
                      value={form.message}
                      onChange={onChange}
                      onBlur={onBlur}
                      disabled={submitting}
                      required
                      aria-invalid={!!(touched.message && errors.message)}
                      aria-describedby="err-message"
                    />
                    {touched.message && errors.message && (
                      <div id="err-message" className="invalid-feedback">{errors.message}</div>
                    )}

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
