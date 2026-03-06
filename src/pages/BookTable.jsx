import React, { useEffect, useState, useRef } from 'react'
import { getrestdetailsfordining, getMaxGuestCapacity, fetchDiningTimeSlots, DiningBooking } from "../utils/api"
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Delivery from '../components/delivery'
import { bookDining, OpenAndClose } from '../utils/api'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaRegCalendarCheck } from "react-icons/fa";
import { GoPeople } from "react-icons/go";
import { IoLocationOutline } from "react-icons/io5";


const BookTable = () => {


  const [dining, setDining] = useState(null)
  const [resttime, setRestime] = useState([])
  const [restaurantdata, setRestdata] = useState([])
  const { id } = useParams()
  const [noOfPeople, setNoOfPeople] = useState(2);
  const [bookingTime, setBookingTime] = useState('');
  const [amount, setAmount] = useState(0);
  const [occasion, setOccasion] = useState('');
  const [instruction, setInstruction] = useState("")
  const [maxGuest, setMaxGuest] = useState(2);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [availableDates, setAvailableDates] = useState([]);
  const [showReview, setShowReview] = useState(false);
  const [filteredSlots, setFilteredSlots] = useState([]);
  const [types, setSelectedType] = useState('Lunch');

  const imageUrl = "https://partnermeatwala.com/documents"
  const galleryRef = useRef(null);
  const [bookingDate, setBookingDate] = useState("");

  const handleSelectChange = (e) => {
    setSelectedType(e.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showReview]);

  const fetchOpenCloseTimes = async () => {
    const data = { restid: id };
    try {
      const response = await OpenAndClose(data);
      if (response.timeDetails) {
        setRestime(response.timeDetails);
      }
    } catch (error) {
      console.error("Error fetching open/close times:", error);
    }
  };

  useEffect(() => {
    fetchOpenCloseTimes();
  }, [id]);

  const getDinig = async () => {
    const data = {
      restid: id,
    }

    const dining = await getrestdetailsfordining(data)
    setDining(dining.restaurantimage)
    setRestdata(dining.restaurantdata)

  }



  useEffect(() => {
    getDinig()
  }, [])


  // booktable 

  useEffect(() => {
    const fetchMaxGuest = async () => {
      try {
        const data = await getMaxGuestCapacity(id); // Pass the restId as needed
        if (data.success === "1") {
          setMaxGuest(data.maxguest);
        }
      } catch (error) {
        console.error("Failed to fetch max guest capacity:", error);
      }
    };
    fetchMaxGuest();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowReview(true);


  }

  const handleBook = async (e) => {
    e.preventDefault();
    // Validate required fields
    if (!noOfPeople || !bookingDate || !selectedSlot) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));

    // Format bookingDate to 'YYYY-MM-DD'
    const [day, month, year] = bookingDate.split('-');
    const formattedDate = `${year}-${month}-${day}`;

    const data = {
      restid: id,
      custid: storedUser?.userid,
      offerid: selectedOffer,
      bookingtime: selectedSlot.availableTime,  // Use selected slot time
      bookingdate: formattedDate,
      guestcapicity: parseInt(noOfPeople),
      occasion: occasion,
      specialrequest: instruction || null,
      ispaid: isPaid,
      ...(isPaid && {
        amount: parseFloat(amount) || 0,
        paymentstatus: "pending",
        devicetype: "web"
      })
    };


    try {
      const response = await DiningBooking(data);

      if (response.success === "1") {
        setShowReview(false);

        if (isPaid) {
          window.location.href = response.paymenturl;
        } else {
          window.location.href = '/bookingConfirm';
        }
        setNoOfPeople(2);
        setBookingDate('');
        setSelectedSlot(null);
        setSelectedOffer(null);
        setInstruction('');
        setAmount(0);
      }
    } catch (error) {
      console.error('Error booking dining:', error);
      toast.error('Failed to book dining.');
    }
  }


  useEffect(() => {


    const currentTime = new Date();

    const getFilteredTimeSlots = (slots) => {
      const isToday = new Date(bookingDate).toDateString() === currentTime.toDateString();

      return slots.filter(slot => {
        const [time, modifier] = slot.availableTime.split(' ');
        let [hours, minutes] = time.split(':');
        if (modifier === 'PM' && hours !== '12') {
          hours = parseInt(hours, 10) + 12;
        } else if (modifier === 'AM' && hours === '12') {
          hours = '00';
        }

        // Parse slot time in 24-hour format
        const slotTime = new Date();
        slotTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

        return isToday ? slotTime > currentTime : true;
      });
    };


    // Convert bookingDate from 'DD-MM-YYYY' to 'YYYY-MM-DD'
    const [day, month, year] = bookingDate.split('-');
    const formattedDate = `${year}-${month}-${day}`;

    const getDiningTimeSlots = async () => {
      const payload = {
        restid: parseInt(id),
        date: formattedDate,
        NoOfGuests: parseFloat(noOfPeople),
        MealType: types,
      };

      try {
        const response = await fetchDiningTimeSlots(payload);
        if (response.success === "1") {
          setTimeSlots(response.slots);
          setFilteredSlots(getFilteredTimeSlots(response.slots));

        } else {
          // Handle error response
          console.error(response.returnmsg);
        }
      } catch (error) {
        console.error("Error fetching dining time slots:", error);
      }
    };
    getDiningTimeSlots();
  }, [id, bookingDate, noOfPeople, types]);


  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot); // Update selected slot
    setBookingTime(slot.availableTime)
    setSelectedOffer(null); // Reset selected offer when slot changes
  };
  const handleOfferSelection = (offer) => {
    setSelectedOffer(offer.offerid);
    setIsPaid(offer.isPaid); // Set isPaid to true or false based on offer
    setAmount(offer.amount || 0); // Set amount based on the selected offer
  };

  useEffect(() => {
    const generateNextMonthsDates = (monthsAhead) => {
      const dates = [];
      const today = new Date();

      // Loop through each day until the specified number of months ahead
      for (let i = 0; i < monthsAhead * 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const monthName = date.toLocaleDateString('en-US', { month: 'short' });
        const day = date.getDate();

        // Use DD-MM-YYYY format for fullDate
        dates.push({
          fullDate: `${String(day).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`,
          displayDate: `${dayName}, ${day} ${monthName}`,
        });
      }
      return dates;
    };

    // Generate dates for 3 months ahead
    const dates = generateNextMonthsDates(3);
    setAvailableDates(dates);
    setBookingDate(dates[0].fullDate);
  }, []);



  const handleFocus = (e) => {
    setInstruction(e.target.value);
  };






  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (galleryRef.current) {
        const maxScrollLeft = galleryRef.current.scrollWidth - galleryRef.current.clientWidth;
        if (galleryRef.current.scrollLeft >= maxScrollLeft) {
          galleryRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          galleryRef.current.scrollBy({ left: 160, behavior: "smooth" });
        }
      }
    }, 3000); // Adjust timing as needed

    return () => clearInterval(scrollInterval);
  }, []);


  return (
    <>
      {/* Header section start */}
      <Navbar text="dining" />
      {/* Header Section end */}
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
        <Delivery text="dining" />
      </section>
      {/* banner section starts */}
      <section
        className="product-banner-section"
        style={{
          backgroundImage:
            dining && dining.length ? `url(${imageUrl}/${dining[0]?.imagename})` : 'none',
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            {restaurantdata.map((restdata, i) => (

              <div className="restaurant-box col-lg-9">
                <div className="restaurant-details">
                  <div className="align-items-center text-center pb-2">
                    <div style={{ transform: "translateY(-50px)" }}>
                      <img
                        className="img-fluid img"
                        src={`https://partnermeatwala.com/documents/${restdata.logo}`}
                        alt="brand13"
                        style={{ border: "2px solid #ddd", width: "20%" }}
                      />
                    </div>
                    <div style={{ marginTop: "-20px" }}>
                      <h2 className="restaurant-name">
                        {restdata.name}
                      </h2>
                      <h4 className="restaurant-place mb-2">
                        {restdata.location}
                      </h4>
                    </div>
                    {/* <div className="restaurant-description text-center">
                      <div className="align-items-center">
                        <h4 className="rating-star" style={{ color: "#000" }}>
                          <span>4.0 Miles</span>
                          <span
                            className="star"
                            style={{
                              color: "#fff",
                              backgroundColor: "rgba(var(--success-color), 1)",
                              padding: "0px 2px 0px 2px"
                            }}
                          >
                            <i className="ri-star-s-fill" />
                          </span>{" "}
                          {restdata.totalrating} (1k+ Reviews)
                        </h4>
                      </div>
                      <div className="mt-3">
                        <Link className="btn theme-btn w-50">
                          <i className="fa fa-phone text-white" /> Call
                        </Link>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>
      {/* banner section end */}
      {/* tab section starts */}
      <section className="tab-details-section section-b-space">
        <div className="container">
          <div className="category-detail-tab">
            <div className="row g-4">
              <div
                className="col-lg-8 p-0"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px"
                }}
              >
                <ul className="nav nav-tabs tab-style1" id="myTab" role="tablist">

                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="order-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#online"
                      type="button"
                      role="tab"
                    >
                      BOOK TABLE
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="overview-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#overview"
                      type="button"
                      role="tab"
                    >
                      INFORMATION
                    </button>
                  </li>
                </ul>
                <div
                  className="tab-content product-details-content"
                  id="myTabContent"
                >
                  <div
                    className="tab-pane fade"
                    id="overview"
                    role="tabpanel"
                    tabIndex={0}
                  >
                    <div className="overview-section">
                      {restaurantdata.map((restdata, i) => (
                        <div className="row" key={i}>

                          <div className="col-md-6 col-12">
                            <div className="overview-content mb-3">
                              <h5 className="mb-2">Description</h5>
                              <p>
                                <p dangerouslySetInnerHTML={{
                                  __html: restdata?.description,
                                }}></p>        </p>
                            </div>
                            <div className="overview-content mb-3">
                              {restdata.menuimg && (
                                <>
                                  <h5 className="mb-2">Menu</h5>

                                  <img
                                    src={`https://partnermeatwala.com/documents/${restdata.menuimg}`}
                                    style={{ width: 200 }}
                                    alt="Menu Image"
                                  />
                                </>

                              )}

                            </div>

                          </div>


                          <div className="col-md-6 col-12">
                            <h5>Location</h5>
                            <div className="overview-content mb-3 mt-0 pl-3">
                              <iframe
                                src={`https://www.google.com/maps/embed/v1/place?q=${restdata.lat},${restdata.lng}&key=AIzaSyA90kZbFA-_GeeQ67T7kTb7VQRSt_LoOXc`} width="100%"
                                height={400}
                                frameBorder={0}
                                style={{ border: 0 }}
                              />
                            </div>

                          </div>

                          <div className="col-md-12 col-12">
                            {dining && (
                              <>
                                <h5 className="mt-4 mb-2">Gallery</h5>
                                <div
                                  className="gallery-images auto-scroll"
                                  ref={galleryRef}
                                  style={{
                                    display: 'flex',
                                    overflowX: 'hidden',
                                    whiteSpace: 'nowrap',
                                    scrollBehavior: 'smooth',
                                  }}
                                >
                                  {dining.map((image) => (
                                    <img
                                      key={image.imageid}
                                      src={`https://partnermeatwala.com/documents/${image.imagename}`}
                                      style={{ width: "50%", margin: '5px', }}
                                      alt={`Restaurant Image ${image.imageid}`}
                                    />
                                  ))}
                                </div>
                              </>
                            )}
                          </div>

                        </div>

                      ))}

                    </div>
                  </div>

                  <div
                    className="tab-pane fade show active"
                    id="online"
                    role="tabpanel"
                    tabIndex={0}
                  >
                    <div className="overview-section d-flex">

                      <div className="row justify-content-center">
                        <div className="col-lg-12">

                          {!showReview ? (
                            <>
                              <h4 className="mb-2">Reserve your table by filling in your details below:</h4>
                              <form className="profile-form" onSubmit={handleSubmit}>
                                <div className="row">
                                  <div className="form-group col-lg-4">
                                    <label className="fw-semibold">No. Of People</label>
                                    <div className="form-input mb-3">
                                      <select
                                        className="form-control"
                                        value={noOfPeople}
                                        onChange={(e) => setNoOfPeople(parseInt(e.target.value))}
                                      >
                                        <option value="" disabled selected>
                                          {maxGuest ? "Select number of people" : "No guests available"}
                                        </option>
                                        {[...Array(maxGuest).keys()].map((i) => (
                                          <option key={i + 1} value={i + 1}>
                                            {i + 1}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>

                                  <div className="form-group col-lg-4">
                                    <label className="fw-semibold">Booking Date</label>
                                    <div className="form-input mb-3">
                                      <select
                                        className="form-control"
                                        value={bookingDate}
                                        onChange={(e) => setBookingDate(e.target.value)}
                                      >
                                        {availableDates.map((date, index) => (
                                          <option key={index} value={date.fullDate}>
                                            {date.displayDate}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>

                                  <div className="form-group col-lg-4">
                                    <label className="fw-semibold">Dining Time</label>
                                    <div className="form-input mb-3">
                                      <select
                                        className="form-control"
                                        value={types}
                                        onChange={handleSelectChange}
                                      >
                                        <option value="" disabled>
                                          Select Time
                                        </option>
                                        <option value="Lunch">Lunch</option>
                                        <option value="Dinner">Dinner</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="form-group col-lg-12 mt-3">
                                    <label className="fw-semibold">Time Slots</label>
                                    <div className="form-group mb-3">
                                      <div className="timeslot">
                                        {filteredSlots.map((slot, index) => (
                                          <React.Fragment key={slot.timeId}>
                                            <input
                                              type="radio"
                                              name="timeSlot"
                                              id={`timeSlot${index}`}
                                              disabled={!slot.isAvailable}
                                              onChange={() => handleSlotSelection(slot)}
                                            />
                                            <label htmlFor={`timeSlot${index}`} className="col-lg-2 col-4"
                                              style={{
                                                color: !slot.isAvailable ? 'gray' : '#000',
                                                cursor: !slot.isAvailable ? 'not-allowed' : 'pointer',
                                              }}
                                            >
                                              {slot.availableTime} <br />
                                              <span className="off"
                                                style={{
                                                  color: !slot.isAvailable ? 'gray' : '#009fe2',
                                                  cursor: !slot.isAvailable ? 'not-allowed' : 'pointer',
                                                }}
                                              >
                                                {slot.offerDetails.length > 0
                                                  ? `${slot.offerDetails.length} offer${slot.offerDetails.length > 1 ? 's' : ''}`
                                                  : 'No offers'}
                                              </span>
                                            </label>
                                          </React.Fragment>
                                        ))}
                                      </div>
                                    </div>
                                  </div>

                                  {selectedSlot && (
                                    <div className="form-group col-lg-12 mb-4">
                                      <label className="fw-semibold">Choose an Offer</label>
                                      <div className="row g-2">
                                        {selectedSlot.offerDetails.map((offer) => (
                                          <div key={offer.offerid} className="col-xl-3 col-lg-4 col-md-6 col-6">
                                            <label className="coupon-box p-0" style={{ cursor: 'pointer' }}>
                                              <div className="coupon-name">
                                                <div className="coupon-img">
                                                  <i className="fa fa-percent text-white" aria-hidden="true" style={{ fontSize: 28 }} />
                                                </div>
                                                <div className="coupon-name-content d-flex align-items-center justify-content-end me-3 flex-wrap">
                                                  <input
                                                    type="radio"
                                                    name="offer"
                                                    value={offer.offerid}
                                                    onChange={() => handleOfferSelection(offer)}

                                                  />
                                                </div>
                                              </div>
                                              <div className="coupon-content mt-0 p-2 pb-0">
                                                <h6 className="fw-medium dark-text">FLAT {offer.discount}% OFF</h6>
                                                <p className="theme-color">
                                                  {offer.isPaid ? `£${offer.amount} cover charge required` : 'No cover charge required'}
                                                </p>
                                              </div>
                                            </label>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                  )}
                                  <div className="form-group col-lg-6">
                                    <input
                                      type="submit"
                                      name="submit"
                                      className={`btn ${selectedOffer ? 'theme-btn' : ''}`}
                                      style={{
                                        backgroundColor: selectedSlot ? 'rgb(232, 65, 53)' : 'grey',
                                        // backgroundColor: selectedOffer ? 'rgb(232, 65, 53)' : 'grey',
                                        cursor: selectedSlot ? 'pointer' : 'not-allowed',
                                        color: selectedSlot ? 'white' : '#ffffff' // Ensures text is visible on grey background
                                        // cursor: selectedOffer ? 'pointer' : 'not-allowed',
                                        // color: selectedOffer ? '' : '#ffffff' // Ensures text is visible on grey background
                                      }}
                                      defaultValue="Book Now"
                                      disabled={!selectedSlot}
                                    />
                                  </div>

                                </div>
                              </form>
                            </>
                          ) : (
                            <div className="booking-details">
                              <h2>Review Booking Details</h2>
                              <div className="booking-detail">
                                <div className="booking-item" style={{ display: 'flex', alignItems: 'center', marginTop: "12px" }}>
                                  <FaRegCalendarCheck style={{ marginRight: '12px' }} />
                                  <span>{`${bookingDate} at ${bookingTime}`}</span>
                                </div>

                                <div className="booking-item" style={{ display: 'flex', alignItems: 'center', marginTop: "12px", marginTop: "12px" }}>
                                  <GoPeople style={{ marginRight: '12px' }} />
                                  <span>{noOfPeople} guests</span>
                                </div>
                                <div className="booking-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: "12px" }}>
                                  <IoLocationOutline />
                                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span>{restaurantdata[0]?.location}</span>
                                  </div>
                                </div>

                              </div>
                              <div className="form-group col-lg-6 mt-3">
                                <label className="fw-semibold">What's the occasion?</label>
                                <div className="form-input mb-3">
                                  <select
                                    className="form-control"
                                    value={occasion}
                                    onChange={(e) => setOccasion(e.target.value)} // Define setOccasion in your state
                                  >
                                    <option value="" disabled>
                                      Select Occasion (Optional)
                                    </option>
                                    <option value="Birthday">Birthday</option>
                                    <option value="Anniversary">Anniversary</option>
                                    <option value="Special Occasion">Special Occasion</option>
                                    <option value="Date">Date</option>
                                    <option value="Business Meal">Business Meal</option>
                                  </select>
                                </div>
                              </div>

                              <div className="special-request" style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: "10px" }}>
                                <label htmlFor="special-request" style={{ marginBottom: '10px' }}>
                                  Special Request:
                                </label>
                                <textarea
                                  id="special-request"
                                  placeholder="Enter your special request"
                                  onChange={handleFocus} // onChange event handler
                                  style={{ padding: '10px', width: '100%', resize: 'none' }}
                                ></textarea>
                              </div>

                              <div className="text-center mt-3">
                                <p className="text-muted">
                                  By clicking on <strong>Confirm Booking</strong>, I agree to the
                                  <a href="/privacy-policy" target="_blank" className="ms-1">Privacy Policy</a> and
                                  <a href="/terms-of-service" target="_blank" className="ms-1">Terms and Conditions</a>.
                                </p>
                              </div>

                              <button className="btn theme-btn w-100 mt-3" onClick={handleBook}>
                                <small>Confirm Booking</small>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>


              </div>

              <div class="col-md-4 col-12">

                <div class="card">
                  <div class="card-header"><h5><i class="fa fa-clock-o"></i> Opening & Closing Time</h5></div>
                  <div class="card-body">
                    <table class="table f-14">
                      {resttime.map((time, i) => (
                        <tr key={i}>
                          <td>{time.day}</td>
                          <td>{time.openTime} - {time.closeTime}</td>
                        </tr>
                      ))}


                    </table>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>
      <Footer />
      <button className="scroll scroll-to-top menu-page">
        <i className="ri-arrow-up-s-line arrow" />
      </button>

    </>
  )
}

export default BookTable