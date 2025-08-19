import React from 'react'
import blog1 from "../../assets/blog2.jpg"

const BlogsBanner = () => {

    return (
        <div className='blogparent'>
<section
  id="home"
  className="home-add-rest home2 section-b-space overflow-hidden"
  style={{
    display: "block !important",
    position: "relative",
    backgroundImage: `url(${blog1})`,
    padding: "50px 0px !important",
    backgroundPosition: "center 75px", // Default for larger screens
    backgroundSize: "cover", // Ensures the image covers the whole section

  }}
>
  <div
    className="mobile-background"
    style={{
      position: "absolute",
      top: 0,
      width: "100%",
      height: "100%"
    }}
  />
  <div className="container">
    <div className="row" style={{marginTop:"90px"}}>
      <div className="col-lg-8 position-relative">
        <h2 style={{ fontWeight: "bold", fontSize: 44 }} className="mb-3">
        Welcome to Meatwala Recipes & Community Page!
        </h2>
        <h6 className="text-white">
        Find expert cooking tips, halal meat guides, delicious recipes and community stories—all in one place!
        </h6>
      </div>
      <div className="col-lg-5 col-12"></div>
    </div>
  </div>
  
</section>
</div>

    )
}

export default BlogsBanner