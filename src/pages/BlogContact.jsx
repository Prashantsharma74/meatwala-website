import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import FooterMobileMenu from "../components/FooterMobileMenu";
import Navbar from "../components/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAllBlogs } from "../utils/api";
import axios from "axios";

const Loader = () => (
  <div
    style={{
      minHeight: "300px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div className="spinner-border text-danger" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

const BlogContact = () => {
  const [blog, setBlog] = useState({});
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const selectedBlogs = location?.state?.selectedBlogs;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const getBlogById = async () => {
    try {
      const res = await axios.get(
        `https://partnermeatwala.com/api/customer/Getblogbyidforcust?blogid=${selectedBlogs?.blogid}`
      );
      console.log("Res data", res.data);
      setBlog(res.data);
    } catch (error) {
      console.error("Blog Not Found", error);
    }
  };

  useEffect(() => {
    getBlogById();
  }, []);

  const [allBlogs, setAllBlogs] = useState();
  const navigate = useNavigate();

  const fetchAllBlogs = async () => {
    try {
      const res = await getAllBlogs();
      setAllBlogs(res?.blogs);
    } catch (error) {
      console.error("Error fetching order status:", error);
    }
  };

  const handleClick = (blog) => {
    navigate("/blog-detail", { state: { selectedBlogs: blog } });
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const formatDescription = (text) => {
    if (!text) return [];

    return text
      .split(/\r?\n\r?\n/) // double line break = paragraph
      .filter((p) => p.trim() !== "");
  };

  return (
    <>
      {/* Header section start */}
      <Navbar />

      {/* Header Section end */}
      {/* home section start */}
      <div className="blogparent">
        <section
          id="home"
          className="home-add-rest home2 section-b-space overflow-hidden"
          style={{
            display: "block !important",
            position: "relative",
            backgroundImage:
              "url(https://qul.imgix.net/138daada-4596-466e-8090-91b9f56b2962/520786_sld.jpg)",
            padding: "50px 0px !important",
            backgroundPosition: "center 15px",
            backgroundSize: "cover",
            height:"50%"
          }}
        >
          <div
            className="mobile-background"
            style={{
              background: "#00000061",
              position: "absolute",
              top: 0,
              width: "100%",
              height: "100%",
            }}
          />
          <div className="container">
            <div className="row" style={{ marginTop: "20px" }}>
              <div className="col-lg-8 position-relative">
                <h2
                  style={{ fontWeight: "bold", fontSize: 44 }}
                  className="mb-3"
                >
                  Blog Details
                </h2>
                <h6 className="text-white">
                  Here are some blogs ,so explore our latest blog and enjoy our
                  food.
                </h6>
              </div>
              <div className="col-lg-5 col-12"></div>
            </div>
          </div>
        </section>
      </div>
      {/* home section end */}
      {/* blog section starts */}
      <section className="section-b-space mt-4">
        <div className="container">
          <div className="blog-boxs">
            <div className="row " style={{ "--bs-gutter-y": "0" }}>
              {/* <div className="col-lg-8 ratio3_2">
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-3 card">
                    <div className="card-body pb-2 p-0 pt-2">
                      <div className="blog-details">
                        <img
                          src={`https://partnermeatwala.com${blog?.blog?.blogimage}`}
                          alt="blog1"
                          style={{ width: "100%" }}
                          className="mb-2"
                        />
                        <h2 className="mb-3">{blog?.blog?.blogsubject}</h2>
                        <p
                          style={{
                            color: "#212529",
                            fontSize: "16px",
                            lineHeight: "28px",
                            textAlign: "justify",
                          }}
                        >
                          {blog?.blog?.blogdescription}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="col-lg-8 ratio3_2">
                {loading ? (
                  <Loader />
                ) : (
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-3 card">
                      <div className="card-body pb-2 p-0 pt-2">
                        <div className="blog-details">
                          <img
                            src={`https://partnermeatwala.com${blog?.blog?.blogimage}`}
                            alt="blog"
                            style={{ width: "100%" }}
                            className="mb-2"
                          />
                          <h2 className="mb-3">{blog?.blog?.blogsubject}</h2>
                          {/* <p
                            style={{
                              color: "#212529",
                              fontSize: "16px",
                              lineHeight: "28px",
                              textAlign: "justify",
                            }}
                          >
                            {blog?.blog?.blogdescription}
                          </p> */}
                          <div className="mt-2">
                            {formatDescription(blog?.blog?.blogdescription).map(
                              (para, index) => (
                                <p
                                  key={index}
                                  style={{
                                    color: "#212529",
                                    fontSize: "16px",
                                    lineHeight: "28px",
                                    textAlign: "justify",
                                    marginBottom: "16px",
                                  }}
                                >
                                  {para}
                                </p>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="col-lg-4 order-lg-0 order-1">
                <div
                  className="left-box right-box wow fadeInUp"
                  style={{ width: "100%" }}
                >
                  <div className="shop-left-sidebar shop-right-sidebar">
                    <div className="search-box">
                      <div className="form-input position-relative">
                        <input
                          type="search"
                          className="form-control search"
                          id="search"
                          placeholder="Search"
                        />
                        <i className="ri-search-line search-icon"></i>
                      </div>
                    </div>
                    <div
                      className="accordion sidebar-accordion"
                      id="accordionPanelsStayOpenExample"
                    >
                      <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                          >
                            <span className="dark-text">Recent Post</span>
                          </button>
                        </h2>
                        <div
                          id="collapseThree"
                          className="accordion-collapse collapse show"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <div className="post-wrap">
                              {allBlogs?.slice(-4).map((blog, index) => (
                                <Link
                                  href={`blog-details/${blog.id}`}
                                  className="post-box"
                                  key={index}
                                >
                                  <div className="img-box">
                                    <img
                                      className="img-fluid img"
                                      src={`https://partnermeatwala.com${blog.blogimage}`}
                                      alt={"Blog Post"}
                                    />
                                  </div>
                                  <div className="content-box">
                                    <h6>{blog.blogsubject}</h6>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* blog section end */}
      {/* footer section starts */}
      <Footer />
      {/* footer section end */}
      {/* mobile fix menu start */}
      <FooterMobileMenu />
      {/* mobile fix menu end */}
      {/* location offcanvas start */}
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
              <a href="#!" className="current-location">
                <div className="current-address">
                  <i className="ri-focus-3-line focus" />
                  <div>
                    <h5>Use current-location</h5>
                    <h6>Wellington St., Ottawa, Ontario, Canada</h6>
                  </div>
                </div>
                <i className="ri-arrow-right-s-line arrow" />
              </a>
              <h5 className="mt-sm-3 mt-2 fw-medium recent-title dark-text">
                Recent Location
              </h5>
              <a href="#!" className="recent-location">
                <div className="recant-address">
                  <i className="ri-map-pin-line theme-color" />
                  <div>
                    <h5>Bayshore</h5>
                    <h6>kingston St., Ottawa, Ontario, Canada</h6>
                  </div>
                </div>
              </a>
            </div>
            <div className="modal-footer">
              <a href="#" className="btn gray-btn" data-bs-dismiss="modal">
                Close
              </a>
              <a
                href="#"
                className="btn theme-btn mt-0"
                data-bs-dismiss="modal"
              >
                Save
              </a>
            </div>
          </div>
        </div>
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
      {/* bootstrap js */}
      {/* footer accordion js */}
      {/* loader js */}
      {/* swiper js */}
      {/* script js */}
    </>
  );
};

export default BlogContact;
