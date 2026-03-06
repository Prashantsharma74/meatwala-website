  <div className="content" style={{ paddingTop: "80px" }}>
          <div className="parent-div">
            <div className="child1-div" style={{ width: "75%" }}>
              <div className="position-relative">
                <div>
                  {restdata?.imagename ? (
                    <img
                      className="child1-div-img"
                      // src={`https://partnermeatwala.com/documents/${restdata.imagename}`}
                      src={getOptimizedImageUrl(restdata.imagename, 800)}
                      loading="lazy"
                    // onLoad={() => setIsImageLoaded(true)}
                    // onError={() => setIsImageLoaded(true)}
                    />
                  ) : <div className="child1-div-img" style={{ backgroundColor: "gray", opacity: 0.2 }}>
                    <div className="loader" />
                  </div>}

                </div>
                <div className="restaurant-image">
                  {restdata?.logo ? (
                    <img
                      className="img-fluid img "
                      // src={`https://partnermeatwala.com/documents/${restdata?.logo}`}
                      src={getOptimizedImageUrl(restdata.imagename, 800)}
                      loading="lazy"
                    />
                  ) : null}
                </div>
              </div>
              <div className="pt-0">
                <div className="container">
                  <div className="row justify-content-center">
                    {/* <div className="restaurant-box"> */}
                    <div className="restaurant-details">
                      <div
                        className="d-flex justify-content-between flex-wrap gap-3"
                        style={{ paddingTop: "20px", paddingBottom: "15px" }}
                      >
                        <div>
                          <h2 className="restaurant-name">{restdata?.name}</h2>
                          {/* <p className="restaurant-place mt-2">
                  {restdata?.location}
                </p> */}
                          <h6 className="food-items">
                            {`${restdata?.cat1 ? restdata?.cat1 : "ㅤ"}${restdata?.cat2 ? " • " + restdata?.cat2 : ""
                              }${restdata?.cat3 ? " • " + restdata?.cat3 : ""}`}
                          </h6>
                          {restdata?.isonline == "0" && (
                            <h6 className="food-items" style={{ color: "red" }}>
                              Not Taking Orders
                            </h6>
                          )}
                          {/* <ul className="details-list" style={{ display: 'flex', flexDirection: 'column' }}>
                            {restdata?.distance && (
                              <li>
                                <i className="ri-map-pin-fill theme-color" /> {restdata.distance}
                              </li>
                            )}
                          </ul> */}
                        </div>
                        <div className="restaurant-description">
                          <div
                            className="distance d-flex"
                            style={containerStyle}
                          >
                            <div className="d-flex" style={{ gap: "5px" }}>
                              <h4
                                className="rating-star"
                                style={{ fontSize: "14px" }}
                              >
                                <span>
                                  <i
                                    className="ri-time-fill"
                                    style={{ color: "lightgray" }}
                                  />
                                </span>{" "}
                                <span style={{ color: "rgb(116 116 116)" }}>
                                  {restdata?.mincookduration}
                                </span>
                              </h4>
                              <div
                                style={{
                                  width: "1px",
                                  height: "16px",
                                  backgroundColor: "#ccc",
                                }}
                              ></div>
                              <h4
                                className="rating-star"
                                style={{ fontSize: "14px" }}
                              >
                                <span>
                                  <i
                                    className="ri-map-pin-2-fill"
                                    style={{ color: "lightgray" }}
                                  />
                                </span>{" "}
                                <span style={{ color: "rgb(116 116 116)" }}>
                                  {milesOnly?.distance} miles
                                </span>
                              </h4>
                            </div>
                            <h4
                              className="rating-star mt-2"
                              style={{ fontSize: "14px", cursor: "pointer" }}
                              onClick={() => setShowReviewPopup(true)}
                            >
                              <span>
                                <i className="ri-star-s-fill text-warning" />
                              </span>{" "}
                              {restdata?.totalreview.split(" ")[0]}{" "}
                              <span style={{ color: "rgb(116 116 116)" }}>
                                ({restdata?.totalreview.split(" ")[1]} Reviews)
                              </span>
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {showReviewPopup && (
                <ReviewPopup
                  restdata={restdata}
                  onClose={() => setShowReviewPopup(false)}
                />
              )}
              <section className="tab-details-section" >
                <div className="container">
                  <div className="blog-boxs">
                    <div className="row justify-content-center ">
                      <div className="col-lg-3 order-lg-0 order-1">
                        <div className="left-box wow fadeInUp">
                          <div className="shop-left-sidebar">
                            <div className="search-box">
                              <div className="form-input position-relative">
                                <input
                                  type="search"
                                  className="form-control search"
                                  id="search"
                                  placeholder="Search"
                                  value={searchQuery}
                                  onChange={handleSearch}
                                />
                                <i className="ri-search-line search-icon" />
                              </div>
                            </div>
                            <div
                              className="accordion sidebar-accordion"
                              id="accordionPanelsStayOpenExample"
                            >
                              <div className="accordion-item">
                                <div
                                  id="collapseOne"
                                  className="accordion-collapse collapse show"
                                  data-bs-parent="#accordionExample"
                                >
                                  <div className="accordion-body">
                                    <ul
                                      ref={categoryListRef}
                                      className="category-list custom-padding custom-height scroll-bar"
                                      id="myDIV"
                                    >
                                      {filteredFoods.map((category, i) => (
                                        <li className="btnn " key={i}
                                          style={{
                                            backgroundColor: activeCategory === category.category ? '#dff5ff' : '',
                                            border: activeCategory === category.category ? '1px solid #0dcaf0ab' : '',
                                            borderRadius: activeCategory === category.category ? '10px' : ''
                                          }}
                                          onClick={() => handleCategorysClick(category.category)}
                                        >
                                          {console.log(category.category,)}

                                          <a href={`#${category.category}`}>
                                            <div className="form-check ps-0 m-0 category-list-box">
                                              <div className="form-check-label">
                                                <span className="name">{category.category}</span>
                                              </div>
                                            </div>
                                          </a>
                                        </li>

                                      ))}

                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="col-lg-9 p-0"
                        style={{
                          boxShadow:
                            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px"
                        }}
                      >
                        <ul className="nav nav-tabs tab-style1" id="myTab" role="tablist">
                          <li className="nav-item" role="presentation">
                            <button
                              className={`nav-link ${activeButton === 1 ? 'active' : ''}`}
                              id="order-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#online"
                              type="button"
                              role="tab"
                              onClick={() => setActiveButton(1)}
                            >
                              MENU
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              className={`nav-link ${activeButton === 2 ? 'active' : ''}`}
                              id="overview-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#overview"
                              type="button"
                              role="tab"
                              onClick={() => setActiveButton(2)}
                            >
                              INFORMATION
                            </button>
                          </li>
                        </ul>





                        <div
                          className="tab-content product-details-content"
                          id="myTabContent"
                        >
                          <div className={`tab-pane fade ${activeButton === 1 ? 'show active' : ''}`}
                            id="online"
                            role="tabpanel"
                            tabIndex={0}
                          >
                            <div className="row ">
                              <div className="col-lg-12">
                                <div className="product-box-section section-b-space">
                                  <div
                                    data-bs-spy="scroll"
                                    data-bs-target="#navbar"
                                    data-bs-smooth-scroll="true"
                                    className="scrollspy-example-2"
                                    tabIndex={0}
                                  >
                                    <div className="product-details-box-list">
                                      {console.log(restdata, "idsss")}

                                      {filteredFoods.map((category, i) => (
                                        <FoodCategory key={i} item={category} restId={perems?.id} addToCart={addToCart} open={restdata?.isonline == "0"} />
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>


                          <div className={`tab-pane fade ${activeButton === 2 ? 'show active' : ''}`}
                            id="overview"
                            role="tabpanel"
                            tabIndex={0}
                          >

                            <div className="overview-section">
                              {restraDetail.map((info, i) => (

                                <div className="row" key={i}>
                                  <div className="col-md-12 col-12">
                                    <div className="overview-content mb-3">
                                      <h5 className="mb-2">
                                        <i className="fas fa-info-circle" />  About Description
                                      </h5>
                                      <p>
                                        <p dangerouslySetInnerHTML={{
                                          __html: info?.description,
                                        }}></p>        </p>
                                    </div>
                                    <div className="overview-content mb-3">
                                      <h5 className="mb-2">
                                        <i className="fa fa-credit-card" /> Payment Methhod
                                      </h5>
                                      {payment.map((method) => (
                                        <p>
                                          <i className="fa fa-check theme-color" /> {method}{" "}
                                        </p>
                                      ))}

                                    </div>
                                    <div className="overview-content mb-3">
                                      <h5 className="mb-2">
                                        <i className="fas fa-exclamation-triangle" style={{ color: 'blue', fontSize: '24px' }} /> Allergen Info
                                      </h5>
                                      <ul className="alergy">
                                        <li>{info?.allergies}</li>

                                      </ul>
                                    </div>
                                  </div>
                                  <div className="col-lg-12">
                                    <h5>
                                      <i className="fa fa-star-o" /> Food Hygiene Rating
                                    </h5>
                                    <div className="d-flex p-2 border">
                                      <div className="me-3 hyzine">
                                        {/* {(Number(info.hyginerating) === 4 || Number(info.hyginerating) === 4.5) && (
                                          <img
                                            src={`${review4}`}
                                            style={{ width: 150 }}
                                          />
                                        )}
                                        {(Number(info.hyginerating) === 3 || Number(info.hyginerating) === 3.5) && (
                                          <img
                                            src={`${review3}`}
                                            style={{ width: 150 }}
                                          />
                                        )}
                                        {(Number(info.hyginerating) === 2 || Number(info.hyginerating) === 2.5) && (
                                          <img
                                            src={`${review2}`}
                                            style={{ width: 150 }}
                                          />
                                        )}
                                        {(Number(info.hyginerating) === 1 || Number(info.hyginerating) === 1.5 || info.hyginerating === "") && (
                                          <img
                                            src={`${review1}`}
                                            style={{ width: 150 }}
                                          />
                                        )}
                                        {(Number(info.hyginerating) == 5) && (
                                          <img
                                            src={`${review4}`}
                                            style={{ width: 150 }}
                                          />
                                        )} */}
                                      </div>

                                      <div>
                                        <h6>Last Inspection {restraDetail[0]?.hygineinspectiondate}</h6>
                                        <p>
                                          Rating b the Food Standard Agency and our local authority. This
                                          rating may have changed
                                        </p>
                                        <a
                                          href={restraDetail[0]?.hygineurl ? restraDetail[0].hygineurl : "https://ratings.food.gov.uk/"}
                                          target="_blank"
                                          style={{ color: "#009fe3" }}
                                        >
                                          More Info
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-12 col-12">
                                    <h5>
                                      <i className="fa fa-map" /> Where to Find Us
                                    </h5>
                                    <div className="overview-content mt-0 pl-3">
                                      <Map lat={restraDetail[0]?.lat} lng={restraDetail[0]?.lng} />
                                    </div>
                                  </div>
                                  <div className="col-md-12 col-12">
                                    <h5>
                                      <span className="me-2">Contact Us:</span>{" "}
                                      <a href="tel:+919999999999" data-rel="external">
                                        {" "}
                                        <i className="fa fa-phone" /> {info.contactno}
                                      </a>
                                    </h5>
                                  </div>
                                </div>
                              ))}

                            </div>



                          </div>


                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </section>
            </div>
             <div className="child1-div" style={{ width: "75%" }}>
              <div className="position-relative">
                <div>
                  <img
                    className="child1-div-img"
                    src={`https://highwycombebites.com/documents/${restdata?.imagename}`}
                  />
                </div>
                <div className="restaurant-image">
                  <img
                    className="img-fluid img "
                    src={`https://highwycombebites.com/documents/${restdata?.logo}`}
                    alt="brand13"
                  />
                </div>
              </div>
              <div className="pt-0">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="restaurant-details">
                      <div className="d-flex justify-content-between flex-wrap gap-3" style={{ paddingTop: "20px", paddingBottom: "15px" }}>
                        <div>
                          <h2 className="restaurant-name">
                            {restdata?.name}
                          </h2>
                          <h6 className="food-items">
                            {`${restdata?.cat1 ? restdata?.cat1 : "ㅤ"}${restdata?.cat2 ? " • " + restdata?.cat2 : ""
                              }${restdata?.cat3 ? " • " + restdata?.cat3 : ""}`}
                          </h6>
                          {restdata?.isonline == "0" && (
                            <h6 className="food-items" style={{ color: "red" }}>
                              Currently Closed
                            </h6>

                          )}
                          <ul className="details-list" style={{ display: 'flex', flexDirection: 'column' }}>
                            {restdata?.distance && (
                              <li>
                                <i className="ri-map-pin-fill theme-color" /> {restdata.distance}
                              </li>
                            )}
                          </ul>
                        </div>
                        <div className="restaurant-description">
                          <div className="distance d-flex">
                            <h4 className="rating-star" style={{ fontSize: "14px" }}>
                              <span>
                                <i className="ri-star-s-fill text-warning" />
                              </span>{" "}
                              {restdata?.totalreview.split(' ')[0]} <span style={{ color: "rgb(116 116 116)" }}>({restdata?.totalreview.split(' ')[1]} Reviews)</span>
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <section className="tab-details-section" >
                <div className="container">
                  <div className="blog-boxs">
                    <div className="row justify-content-center ">
                      <div className="col-lg-3 order-lg-0 order-1">
                        <div className="left-box wow fadeInUp">
                          <div className="shop-left-sidebar">
                            <div className="search-box">
                              <div className="form-input position-relative">
                                <input
                                  type="search"
                                  className="form-control search"
                                  id="search"
                                  placeholder="Search"
                                  value={searchQuery}
                                  onChange={handleSearch}
                                />
                                <i className="ri-search-line search-icon" />
                              </div>
                            </div>
                            <div
                              className="accordion sidebar-accordion"
                              id="accordionPanelsStayOpenExample"
                            >
                              <div className="accordion-item">
                                <div
                                  id="collapseOne"
                                  className="accordion-collapse collapse show"
                                  data-bs-parent="#accordionExample"
                                >
                                  <div className="accordion-body">
                                    <ul
                                      ref={categoryListRef}
                                      className="category-list custom-padding custom-height scroll-bar"
                                      id="myDIV"
                                    >
                                      {filteredFoods.map((category, i) => (
                                        <li className="btnn " key={i}
                                          style={{
                                            backgroundColor: activeCategory === category.category ? '#dff5ff' : '',
                                            border: activeCategory === category.category ? '1px solid #0dcaf0ab' : '',
                                            borderRadius: activeCategory === category.category ? '10px' : ''
                                          }}
                                          onClick={() => handleCategorysClick(category.category)}
                                        >
                                          {console.log(category.category,)}

                                          <a href={`#${category.category}`}>
                                            <div className="form-check ps-0 m-0 category-list-box">
                                              <div className="form-check-label">
                                                <span className="name">{category.category}</span>
                                              </div>
                                            </div>
                                          </a>
                                        </li>

                                      ))}

                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="col-lg-9 p-0"
                        style={{
                          boxShadow:
                            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px"
                        }}
                      >
                        <ul className="nav nav-tabs tab-style1" id="myTab" role="tablist">
                          <li className="nav-item" role="presentation">
                            <button
                              className={`nav-link ${activeButton === 1 ? 'active' : ''}`}
                              id="order-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#online"
                              type="button"
                              role="tab"
                              onClick={() => setActiveButton(1)}
                            >
                              MENU
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              className={`nav-link ${activeButton === 2 ? 'active' : ''}`}
                              id="overview-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#overview"
                              type="button"
                              role="tab"
                              onClick={() => setActiveButton(2)}
                            >
                              INFORMATION
                            </button>
                          </li>
                        </ul>





                        <div
                          className="tab-content product-details-content"
                          id="myTabContent"
                        >
                          <div className={`tab-pane fade ${activeButton === 1 ? 'show active' : ''}`}
                            id="online"
                            role="tabpanel"
                            tabIndex={0}
                          >
                            <div className="row ">
                              <div className="col-lg-12">
                                <div className="product-box-section section-b-space">
                                  <div
                                    data-bs-spy="scroll"
                                    data-bs-target="#navbar"
                                    data-bs-smooth-scroll="true"
                                    className="scrollspy-example-2"
                                    tabIndex={0}
                                  >
                                    <div className="product-details-box-list">
                                      {console.log(restdata, "idsss")}

                                      {filteredFoods.map((category, i) => (
                                        <FoodCategory key={i} item={category} restId={perems?.id} addToCart={addToCart} open={restdata?.isonline == "0"} />
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>


                          <div className={`tab-pane fade ${activeButton === 2 ? 'show active' : ''}`}
                            id="overview"
                            role="tabpanel"
                            tabIndex={0}
                          >

                            <div className="overview-section">
                              {restraDetail.map((info, i) => (

                                <div className="row" key={i}>
                                  <div className="col-md-12 col-12">
                                    <div className="overview-content mb-3">
                                      <h5 className="mb-2">
                                        <i className="fas fa-info-circle" />  About Description
                                      </h5>
                                      <p>
                                        <p dangerouslySetInnerHTML={{
                                          __html: info?.description,
                                        }}></p>        </p>
                                    </div>
                                    <div className="overview-content mb-3">
                                      <h5 className="mb-2">
                                        <i className="fa fa-credit-card" /> Payment Methhod
                                      </h5>
                                      {payment.map((method) => (
                                        <p>
                                          <i className="fa fa-check theme-color" /> {method}{" "}
                                        </p>
                                      ))}

                                    </div>
                                    <div className="overview-content mb-3">
                                      <h5 className="mb-2">
                                        <i className="fas fa-exclamation-triangle" style={{ color: 'blue', fontSize: '24px' }} /> Allergen Info
                                      </h5>
                                      <ul className="alergy">
                                        <li>{info?.allergies}</li>

                                      </ul>
                                    </div>
                                  </div>
                                  <div className="col-lg-12">
                                    <h5>
                                      <i className="fa fa-star-o" /> Food Hygiene Rating
                                    </h5>
                                    <div className="d-flex p-2 border">
                                      <div className="me-3 hyzine">
                                        {(Number(info.hyginerating) === 4 || Number(info.hyginerating) === 4.5) && (
                                          <img
                                            src={`${review4}`}
                                            style={{ width: 150 }}
                                          />
                                        )}
                                        {(Number(info.hyginerating) === 3 || Number(info.hyginerating) === 3.5) && (
                                          <img
                                            src={`${review3}`}
                                            style={{ width: 150 }}
                                          />
                                        )}
                                        {(Number(info.hyginerating) === 2 || Number(info.hyginerating) === 2.5) && (
                                          <img
                                            src={`${review2}`}
                                            style={{ width: 150 }}
                                          />
                                        )}
                                        {(Number(info.hyginerating) === 1 || Number(info.hyginerating) === 1.5 || info.hyginerating === "") && (
                                          <img
                                            src={`${review1}`}
                                            style={{ width: 150 }}
                                          />
                                        )}
                                        {(Number(info.hyginerating) == 5) && (
                                          <img
                                            src={`${review4}`}
                                            style={{ width: 150 }}
                                          />
                                        )}
                                      </div>

                                      <div>
                                        <h6>Last Inspection {restraDetail[0]?.hygineinspectiondate}</h6>
                                        <p>
                                          Rating b the Food Standard Agency and our local authority. This
                                          rating may have changed
                                        </p>
                                        <a
                                          href={restraDetail[0]?.hygineurl ? restraDetail[0].hygineurl : "https://ratings.food.gov.uk/"}
                                          target="_blank"
                                          style={{ color: "#009fe3" }}
                                        >
                                          More Info
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-12 col-12">
                                    <h5>
                                      <i className="fa fa-map" /> Where to Find Us
                                    </h5>
                                    <div className="overview-content mt-0 pl-3">
                                      <Map lat={restraDetail[0]?.lat} lng={restraDetail[0]?.lng} />
                                    </div>
                                  </div>
                                  <div className="col-md-12 col-12">
                                    <h5>
                                      <span className="me-2">Contact Us:</span>{" "}
                                      <a href="tel:+919999999999" data-rel="external">
                                        {" "}
                                        <i className="fa fa-phone" /> {info.contactno}
                                      </a>
                                    </h5>
                                  </div>
                                </div>
                              ))}

                            </div>



                          </div>


                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div
              className="child2-div"
              style={{
                width: "25%",
                maxHeight: "80vh",
                overflowY: "auto",
                position: "sticky",
                top: "70px",
                paddingTop: "11px",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <Cartcomponent cart={cart} />
            </div>
          </div>
        </div>