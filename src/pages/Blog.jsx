import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Delivery from "../components/delivery";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import FooterMobileMenu from "../components/FooterMobileMenu";
import { getAllBlogs } from "../utils/api";
import BlogsBanner from "../components/BlogsSection/BlogsBanner";
import { format } from "date-fns";
import { Helmet } from "react-helmet-async";

const Blog = () => {
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

  return (
    <>
      <Helmet>
        <title>Halal Meat Recipes – Delicious Dishes from Meatwala</title>
        <meta
          name="description"
          content="Explore easy and tasty halal meat recipes, from classic curries to BBQ dishes. Get cooking inspiration with fresh ingredients from Meatwala!"
        />
      </Helmet>
      <Navbar />
      <section className="section-t-space mytabb overflow-hidden pt-120">
        {/* <div className="container text-center">
          <div className="tab">
            <div>
              <Link className="tablinks active">
                <p>
                  <i className="fa fa-motorcycle" /> Delivery
                </p>{" "}
                <p className="smtext">35 - 50 Min</p>
              </Link>
              <Link className="tablinks">
                <p>
                  <i className="fa fa-shopping-bag" aria-hidden="true" /> Collection{" "}
                </p>{" "}
                <p className="smtext">15 - 25 Min</p>
              </Link>
            </div>
          </div>
        </div> */}
        <Delivery />
      </section>
      {/* home section start */}
      <BlogsBanner />
      {/* home section end */}
      {/* blog section starts */}
      <section className="section-b-space">
        <div className="container">
          <h2
            className="text-center mt-3"
            style={{ fontSize: "calc(27px + 10*(100vw - 320px) / 1600)" }}
          >
            Explore Blogs
          </h2>
          <div className="blog-boxs">
            <div className="row">
              {allBlogs?.map((blog) => {
                // Format the date using vanilla JS
                const dateObj = new Date(blog.cdate);
                const formattedDate = dateObj.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                });

                return (
                  <div
                    className="col-md-6 col-lg-4 mt-3 wow fadeInUp"
                    data-wow-delay=".2s"
                    style={{
                      visibility: "visible",
                      animationDelay: "0.2s",
                      animationName: "fadeInUp",
                    }}
                    key={blog.blogid}
                  >
                    <div className="blog-grid">
                      <div className="blog-grid-img position-relative">
                        <img
                          src={`https://partnermeatwala.com${blog.blogimage}`}
                          alt={blog.blogimage}
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div onClick={() => handleClick(blog)}>
                        <div className="blog-grid-text p-4">
                          {/* Display formatted date */}
                          <p
                            className="text-muted"
                            style={{ fontSize: "14px" }}
                          >
                            {formattedDate}
                          </p>
                          <h3 className="h5 mb-3">
                            <a>{blog.blogsubject}</a>
                          </h3>
                          <div className="meta meta-style2">
                            <button className="btn theme-btn">
                              Learn More
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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

export default Blog;
