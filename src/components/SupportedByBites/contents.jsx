import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'

import { getAllContents } from '../../utils/api'

const Blog = () => {

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
    navigate('/content-detail', { state: { selectedBlogs: blog } })
  }

  useEffect(() => {
    fetchAllBlogs()
  }, [])

  return (
    <>


      <section className="section-b-space">
        <div className="container">
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
          className="col-md-6 col-lg-4 mt-5 wow fadeInUp"
          data-wow-delay=".2s"
          style={{
            visibility: "visible",
            animationDelay: "0.2s",
            animationName: "fadeInUp",
          }}
          key={blog.contentid}
        >
          <div className="blog-grid">
            <div className="blog-grid-img position-relative">
              <img
                src={`https://partnermeatwala.com/${blog.contentimage}`}
                alt={blog.contentimage}
                style={{ width: "100%" }}
              />
            </div>
            <div onClick={() => handleClick(blog)}>
              <div className="blog-grid-text p-4">
                {/* Display formatted date */}
                <p className="text-muted" style={{ fontSize: "14px" }}>
                  {formattedDate}
                </p>
                <h3 className="h5 mb-3">
                  <a>{blog.contentsubject}</a>
                </h3>
                <div className="meta meta-style2">
                  <button className="btn theme-btn">Learn More</button>
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
   


    </>

  )
}

export default Blog