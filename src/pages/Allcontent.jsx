import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import FooterMobileMenu from '../components/FooterMobileMenu'
import Navbar from '../components/Navbar'
import { Link, useLocation,useNavigate } from 'react-router-dom'
import {getAllContents} from "../utils/api"
import axios from "axios"

const BlogContact = () => {

  const [blog, setBlog] = useState({})
  const location = useLocation()
  const selectedBlogs = location?.state?.selectedBlogs

  const getBlogById = async () => {
    try {
      const res = await axios.get(`https://partnermeatwala.com/api/customer/Getcontentbyidforcust?contentid=${selectedBlogs?.contentid}`)
      setBlog(res?.data)
    } catch (error) {
      console.error("Blog Not Found", error)
    }
  }

  useEffect(() => {
    getBlogById()
  }, [])

  const [allBlogs, setAllBlogs] = useState()
  const navigate = useNavigate()

  const fetchAllBlogs = async () => {
    try {
      const res = await getAllContents()
      setAllBlogs(res?.contents)
    } catch (error) {
      console.error("Error fetching order status:", error);
    }
  }

  const handleClick = (blog) => {
    navigate('/blog-detail', { state: { selectedBlogs: blog } })
  }

  useEffect(() => {
    fetchAllBlogs()
  }, [])

  
  return (
    <>
      {/* Header section start */}
      <Navbar />

      {/* Header Section end */}
      {/* home section start */}
      <section
        id="home"
        className="home-wrapper home2 section-b-space overflow-hidden"
        style={{
          display: "block !important",
          position: "relative",
          backgroundImage:
            "url(https://qul.imgix.net/138daada-4596-466e-8090-91b9f56b2962/520786_sld.jpg)",
          padding: "50px 0px !important"
        }}
      >
        <div
          style={{
            background: "#00000061",
            position: "absolute",
            top: 0,
            width: "100%",
            height: "100%"
          }}
        />
        <div className="container">
          <div className="row">
            <div className="col-lg-8 position-relative">
              <h2 style={{ fontWeight: "bold", fontSize: 44 }} className="mb-3">
                Content Details
              </h2>
              <h6 className="text-white">
                Here are some contents ,so explore our latest content and enjoy our food.
              </h6>
            </div>
            <div className="col-lg-5 col-12"></div>
          </div>
        </div>
      </section>
      {/* home section end */}
      {/* blog section starts */}
      <section className="section-b-space">
        <div className="container">
          <div className="blog-boxs">
            <div className="row " style={{ '--bs-gutter-y': '0' }}>
              <div className="col-lg-8 ratio3_2">
                <div className="row g-4">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-3 card">
                    <div className="card-body pb-2 p-0 pt-2">
                      <div className="blog-details">
                        <img
                          src={`https://partnermeatwala.com/${blog?.content?.contentimage}`}
                          alt="blog1"
                          style={{ width: '100%' }}
                          className="mb-2"
                        />
                        <h2 className="mb-3">{blog?.content?.contentsubject}</h2>
                        <p
                          style={{
                            color: '#212529',
                            fontSize: '16px',
                            lineHeight: '28px',
                            textAlign: 'justify',
                          }}
                        >
                          {blog?.content?.contentdescription}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 order-lg-0 order-1">
                <div className="left-box right-box wow fadeInUp" style={{ width: "100%" }}>
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
        <Link href={`blog-details/${blog.contentid}`} className="post-box" key={index}>
          <div className="img-box">
            <img
              className="img-fluid img"
              src={`https://partnermeatwala.com/${blog.contentimage}`}
              alt={"Blog Post"}
            />
          </div>
          <div className="content-box">
            <h6>{blog.contentsubject}</h6>
          </div>
        </Link>
      ))}
                              <a href="blog-details.html" className="post-box">
                                <div className="img-box">
                                  <img
                                    className="img-fluid img"
                                    src="assets/images/blog/3.png"
                                    alt="post"
                                  />
                                </div>
                                <div className="content-box">
                                  <h6>The Best Restaurants in High Wycombe</h6>
                                </div>
                              </a>
                              <a href="blog-details.html" className="post-box">
                                <div className="img-box">
                                  <img
                                    className="img-fluid img"
                                    src="assets/images/blog/4.png"
                                    alt="post"
                                  />
                                </div>
                                <div className="content-box">
                                  <h6>The Best Restaurants in High Wycombe</h6>
                                </div>
                              </a>
                              <a href="blog-details.html" className="post-box">
                                <div className="img-box">
                                  <img
                                    className="img-fluid img"
                                    src="assets/images/blog/5.png"
                                    alt="post"
                                  />
                                </div>
                                <div className="content-box">
                                  <h6>The Best Restaurants in High Wycombe</h6>
                                </div>
                              </a>
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
              <a href="#" className="btn theme-btn mt-0" data-bs-dismiss="modal">
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


  )
}

export default BlogContact