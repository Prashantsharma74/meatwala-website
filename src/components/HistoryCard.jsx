// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Modal } from "bootstrap";
// import { Link } from "react-router-dom";
// import { orderHistory, reOrder } from "../utils/api";
// import axios from "axios"; // For API requests (or use your own request handler)

// const HistoryCard = ({ item }) => {
//   const storedUser = JSON.parse(localStorage.getItem("user")) || "";
//   const navigate = useNavigate();
//   const data = {
//     userid: storedUser?.userid,
//   };
//   const [cancelReason, setCancelReason] = useState("");
//   const [isCancelling, setIsCancelling] = useState(false);
//   const [isReordering, setIsReordering] = useState(false);
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");


//   useEffect(() => {
//     const modalElement = document.getElementById(
//       `rating-modal-${item?.orderid}`
//     );
//     if (modalElement) {
//       new Modal(modalElement);
//     }
//   }, [item?.orderid]);

//   useEffect(() => {
//     const modalElement = document.getElementById(`order-${item?.orderid}`);
//     if (modalElement) {
//       new Modal(modalElement);
//     }
//   }, [item?.orderid]);

//   useEffect(() => {
//     const modalElement = document.getElementById(`order1-${item?.orderid}`);
//     if (modalElement) {
//       new Modal(modalElement);
//     }
//   }, [item?.orderid]);

//   const handleCancelOrder = async () => {
//     try {
//       if (!cancelReason) {
//         return;
//       }
//       setIsCancelling(true);

//       const response = await axios.post(
//         "https://partnermeatwala.com/api/customer/cancelorder",
//         {
//           orderid: item?.orderid,
//           reason: cancelReason,
//           type: "1",
//         }
//       );

//       if (response.data.status) {

//         // Close the modal after success
//         const modalElement = document.getElementById(`order1-${item?.orderid}`);
//         const modalInstance = Modal.getInstance(modalElement);
//         if (modalInstance) {
//           modalInstance.hide();
//         }
//         await orderHistory(data);
//         // Optionally refresh the order list or perform any other UI updates
//       } else {
//         console.log("Failed to cancel the order");
//       }
//     } catch (error) {
//       console.error("Error canceling the order:", error);
//     } finally {
//       setIsCancelling(false); // End the cancellation process
//     }
//   };

//   const handleReorder = async () => {
//     try {
//       setIsReordering(true);

//       const data = {
//         userid: storedUser?.userid,
//         bookingid: item?.orderid,
//       };

//       const response = await axios.post(
//         "https://partnermeatwala.com/api/customer/reorderbooking",
//         {
//           userid: storedUser?.userid,
//           bookingid: item?.orderid,
//         }
//       );

//       if (response.data.status) {
//         navigate("/cart");
//       } else {
//         console.log("Failed to reorder the order");
//       }
//     } catch (error) {
//       console.error("Error reordering the order:", error);
//     } finally {
//       setIsReordering(false); // End the reordering process
//     }
//   };

//   // const handleSubmitFeedback = async () => {
//   //   if (!rating) {
//   //     alert("Please select a rating before submitting.");
//   //     return;
//   //   }

//   //   try {
//   //     const response = await axios.post(
//   //       "https://partnermeatwala.com/api/customer/givereviewandrating",
//   //       {
//   //         userid: storedUser?.userid, // User ID from local storage
//   //         bookingid: item?.orderid, // Order ID
//   //         restid: item?.restid, // Restaurant ID
//   //         ratingscore: rating.toString(), // Convert rating to string
//   //         reviewtext: comment, // User's comment
//   //       }
//   //     );

//   //     if (response.data.status) {
//   //       console.log("Feedback submitted successfully");
//   //       alert("Thank you for your feedback!");
//   //       setRating(0);
//   //       setComment("");

//   //       // Close the modal after submission
//   //       const modalElement = document.getElementById(
//   //         `rating-modal-${item?.orderid}`
//   //       );
//   //       const modalInstance = Modal.getInstance(modalElement);
//   //       if (modalInstance) {
//   //         modalInstance.hide();
//   //       }
//   //     } else {
//   //       console.log("Failed to submit feedback");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error submitting feedback:", error);
//   //   }
//   // };

//   const handleSubmitFeedback = async () => {
//     if (!rating) {
//       alert("Please select a rating before submitting.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "https://partnermeatwala.com/api/customer/givereviewandrating",
//         {
//           userid: storedUser?.userid,
//           bookingid: item?.orderid,
//           restid: item?.restid,
//           ratingscore: rating.toString(),
//           reviewtext: comment,
//         }
//       );


//       if (response.data.status) {
//         alert("Thank you for your feedback!");
//         setRating(0);
//         setComment("");
      
//         // Close the modal
//         const modalElement = document.getElementById(`rating-modal-${item?.orderid}`);
//         if (modalElement) {
//           const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
//           if (modalInstance) {
//             modalInstance.hide();
//           } else {
//             console.error("Modal instance not found.");
//           }
//         } else {
//           console.error("Modal element not found.");
//         }
//       } else {
//         console.log("Failed to submit feedback");
//       }
//     } catch (error) {
//       console.error("Error submitting feedback:", error);
//     }
//   };

//   return (
//     <>
//       <li>
//         <div className="order-box">
//           <div className="order-box-content">
//             <div className="brand-icon">
//               <img
//                 className="img-fluid icon"
//                 src={`https://partnermeatwala.com/documents/${item?.bannerimage}`}
//                 alt="brand3"
//               />
//             </div>
//             <div className="order-details">
//               <div className="d-flex align-items-center justify-content-between w-100">
//                 <h5 className="brand-name dark-text fw-medium">
//                   {item?.restname}
//                 </h5>
//                 <h6 className="fw-medium content-color text-end">
//                   {item?.orderdate}
//                 </h6>
//               </div>
//               <h6 className="fw-medium dark-text">
//                 <span className="fw-normal content-color">Order Id :</span>
//                 {item?.orderid}
//               </h6>
//             </div>
//           </div>
//           <div className="d-flex align-items-center justify-content-between mt-sm-3 mt-2">
//             {/* Left side: Total Amount */}
//             <h6 className="fw-medium dark-text">
//               <span className="fw-normal content-color">Total Amount :</span>£{" "}
//               {Number(item?.netpayamount || 0).toFixed(2)}
//             </h6>

//             {/* Right side: Buttons */}
//             <div className="d-flex ms-auto gap-2">
//               {" "}
//               {/* Added ms-auto to push buttons to the right */}
//               <Link
//                 className="btn theme-outline details-btn"
//                 data-bs-toggle="modal"
//                 data-bs-target={`#order-${item?.orderid}`}
//               >
//                 Details
//               </Link>
//               {item?.orderstatus === "pending" && (
//                 <button
//                   type="button"
//                   style={{ borderRadius: "100px" }}
//                   className="btn btn-danger"
//                   data-bs-toggle="modal"
//                   data-bs-target={`#order1-${item?.orderid}`}
//                 >
//                   Cancel Order
//                 </button>
//               )}
//               {item?.orderstatus !== "pending" && (
//                 <button
//                   type="button"
//                   style={{ borderRadius: "100px" }}
//                   className="btn btn-danger"
//                   onClick={handleReorder}
//                   disabled={isReordering}
//                 >
//                   {isReordering ? "Reordering..." : "ReOrder"}
//                 </button>
//               )}
//               {item?.orderstatus === "" && (
//                 <button
//                   type="button"
//                   style={{ borderRadius: "100px" }}
//                   className="btn btn-danger"
//                   onClick={handleReorder}
//                   disabled={isReordering}
//                 >
//                   Rate Us
//                 </button>
//               )}
//               <button
//                 type="button"
//                 style={{ borderRadius: "100px" }}
//                 className="btn btn-warning"
//                 data-bs-toggle="modal"
//                 data-bs-target={`#rating-modal-${item?.orderid}`}
//               >
//                 Rate Us
//               </button>
//             </div>
//           </div>
//         </div>
//       </li>

//       <div
//         className="modal order-details-modal"
//         id={`order-${item?.orderid}`}
//         aria-hidden="true"
//         aria-labelledby="exampleModalToggleLabel"
//         tabIndex={-1}
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5
//                 className="modal-title fw-medium"
//                 id="exampleModalToggleLabel"
//               >
//                 Order details
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               />
//             </div>
//             <div className="modal-body">
//               <div className="order-details-box">
//                 <div className="order-icon">
//                   <img
//                     className="img-fluid icon"
//                     src={`https://partnermeatwala.com/documents/${item?.logo}`}
//                     alt="brand3"
//                   />
//                 </div>
//                 <div className="order-content">
//                   <h5 className="brand-name dark-text fw-medium">
//                     {item?.restname}
//                   </h5>
//                   <h6 className="order-deliver-label">{item?.orderstatus}</h6>
//                 </div>
//               </div>
//               <div className="delivery-address">
//                 <div className="d-flex align-items-center gap-2 mt-2">
//                   <i className="ri-map-pin-fill theme-color" />
//                   <p>{item?.restaddress}</p>
//                 </div>
//               </div>
//               <div className="delivery-on-going">
//                 <ul className="delivery-list">
//                   <li>
//                     <h6>Order Id</h6>
//                     <h5>{item?.orderid}</h5>
//                   </li>
//                   <li>
//                     <h6>Date &amp; Time</h6>
//                     <h5>{item?.orderdate}</h5>
//                   </li>
//                 </ul>
//                 <ul className="delivery-list">
//                   <li>
//                     <div className="order-address">
//                       <img
//                         className="img-fluid place-icon"
//                         src="assets/images/svg/placed.svg"
//                         alt="restaurant"
//                       />
//                       <h5>Restaurant Address</h5>
//                     </div>
//                     <h6 className="delivery-place">{item?.restaddress}</h6>
//                   </li>
//                   <li>
//                     <div className="order-address">
//                       <img
//                         className="img-fluid place-icon"
//                         src="assets/images/svg/user-map.svg"
//                         alt="delivery"
//                       />
//                       <h5>Order Type</h5>
//                     </div>
//                     <h6 className="delivery-place">{item?.ordertype}</h6>
//                   </li>
//                 </ul>
//               </div>
//               <ul className="order-list">
//                 {item?.orderfood?.map((data) => (
//                   <li key={data?.foodid}>
//                     {/* <div className="order-content-box">
//                       <div className="d-flex align-items-center justify-content-between">
//                         <h6>{data?.foodname}</h6>
//                         <h6>£30</h6>
//                       </div>
//                       <div>
//                         <p>Qty:2</p>
//                       </div>
//                     </div> */}
//                   </li>
//                 ))}
//               </ul>
//               <div className="total-amount">
//                 <div className="grand-amount d-flex align-items-center justify-content-between">
//                   <h6 className="fw-medium dark-text">Grand Total</h6>
//                   <h6 className="fw-medium dark-text">
//                     £{Number(item?.netpayamount).toFixed(2)}
//                   </h6>
//                 </div>
//               </div>
//             </div>
//             {/* <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-danger"
//                 onClick={handleCancelOrder}
//                 disabled={isCancelling}
//               >
              
              
//                 {isCancelling ? "Cancelling..." : "Cancel Order"}
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 data-bs-dismiss="modal"
//               >
//                 Close
//               </button>
//             </div> */}
//           </div>
//         </div>
//       </div>

//       <div
//         className="modal order-details-modal"
//         id={`order1-${item?.orderid}`}
//         aria-hidden="true"
//         aria-labelledby="exampleModalToggleLabel"
//         tabIndex={-1}
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5
//                 className="modal-title fw-medium"
//                 id="exampleModalToggleLabel"
//               >
//                 Cancel Order
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               />
//             </div>
//             <div className="modal-body">
//               <div className="total-amount">{/* Existing order summary */}</div>

//               {/* Cancel Order Section */}
//               <div className="cancel-order-section mt-3">
//                 <h6>Cancel Order</h6>

//                 <textarea
//                   className="form-control"
//                   placeholder="Reason for cancellation"
//                   value={cancelReason}
//                   onChange={(e) => setCancelReason(e.target.value)}
//                   disabled={isCancelling}
//                 />
//                 <button
//                   type="button"
//                   style={{ borderRadius: "100px" }}
//                   className="btn btn-danger mt-2"
//                   onClick={handleCancelOrder}
//                   disabled={isCancelling}
//                 >
//                   {isCancelling ? "Canceling..." : "Cancel Order"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div
//         className="modal fade"
//         id={`rating-modal-${item?.orderid}`}
//         tabIndex="-1"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">Rate Your Order</h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body">
//               <div className="mb-3 text-center">
//                 <h6>How was your experience with</h6>
//                 <span
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   {/* <img
//                     style={{ height: "80px" }}
//                     src={`https://partnermeatwala.com/documents/${item.bannerimage}`}
//                     alt="Restro Logo"
//                   /> */}
//                   <h2 style={{ color: "#e81435" }} className="">
//                     {item.restname}
//                   </h2>
//                 </span>
//                 <div className="star-rating">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <label key={star} className="star">
//                       <input
//                         type="radio"
//                         name={`rating-${item?.orderid}`}
//                         value={star}
//                         onChange={() => setRating(star)}
//                       />
//                       <span
//                         className={
//                           star <= rating ? "filled-star" : "empty-star"
//                         }
//                         style={{ height: "20px" }}
//                       >
//                         ★
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//               <div className="mb-3">
//                 <label className="form-label" style={{ color: "black" }}>
//                   Leave a comment
//                 </label>
//                 <textarea
//                   className="form-control"
//                   rows="3"
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 data-bs-dismiss="modal"
//               >
//                 Close
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-primary"
//                 onClick={handleSubmitFeedback}
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HistoryCard;



"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Modal } from "bootstrap"
import { Link } from "react-router-dom"
import { orderHistory } from "../utils/api"
import axios from "axios"

const HistoryCard = ({ item, onOrderUpdate }) => {
  const storedUser = JSON.parse(localStorage.getItem("user")) || ""
  const navigate = useNavigate()
  const data = {
    userid: storedUser?.userid,
  }
  const [cancelReason, setCancelReason] = useState("")
  const [isCancelling, setIsCancelling] = useState(false)
  const [isReordering, setIsReordering] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [localOrderStatus, setLocalOrderStatus] = useState(item?.orderstatus)

  // Store modal instances
  const [modalInstances, setModalInstances] = useState({})

  useEffect(() => {
    // Initialize all modals
    const modals = {}

    const ratingModalElement = document.getElementById(`rating-modal-${item?.orderid}`)
    if (ratingModalElement) {
      modals.rating = new Modal(ratingModalElement)
    }

    const detailsModalElement = document.getElementById(`order-${item?.orderid}`)
    if (detailsModalElement) {
      modals.details = new Modal(detailsModalElement)
    }

    const cancelModalElement = document.getElementById(`order1-${item?.orderid}`)
    if (cancelModalElement) {
      modals.cancel = new Modal(cancelModalElement)
    }

    setModalInstances(modals)

    // Cleanup function
    return () => {
      Object.values(modals).forEach((modal) => {
        if (modal) {
          modal.dispose()
        }
      })
      // Remove any lingering backdrops
      const backdrops = document.querySelectorAll(".modal-backdrop")
      backdrops.forEach((backdrop) => backdrop.remove())
      document.body.classList.remove("modal-open")
      document.body.style.overflow = ""
      document.body.style.paddingRight = ""
    }
  }, [item?.orderid])

  const handleCancelOrder = async () => {
    try {
      if (!cancelReason) {
        return
      }
      setIsCancelling(true)

      const response = await axios.post("https://partnermeatwala.com/api/customer/cancelorder", {
        orderid: item?.orderid,
        reason: cancelReason,
        type: "1",
      })

      if (response.data.status) {
        // Properly close the modal and clean up backdrop
        if (modalInstances.cancel) {
          modalInstances.cancel.hide()
        }

        // Additional cleanup to ensure backdrop is removed
        setTimeout(() => {
          const backdrops = document.querySelectorAll(".modal-backdrop")
          backdrops.forEach((backdrop) => backdrop.remove())
          document.body.classList.remove("modal-open")
          document.body.style.overflow = ""
          document.body.style.paddingRight = ""
        }, 300)

        // Refresh the order data to update the UI
        if (onOrderUpdate) {
          onOrderUpdate()
        } else {
          // Fallback: refresh the page or call orderHistory
          await orderHistory(data)
          // Force a re-render by updating the window location or triggering a state update
          window.location.reload()
        }

        setCancelReason("")
        setLocalOrderStatus("cancelled")
      } else {
        console.log("Failed to cancel the order")
      }
    } catch (error) {
      console.error("Error canceling the order:", error)
    } finally {
      setIsCancelling(false)
    }
  }

  const handleReorder = async () => {
    try {
      setIsReordering(true)

      const response = await axios.post("https://partnermeatwala.com/api/customer/reorderbooking", {
        userid: storedUser?.userid,
        bookingid: item?.orderid,
      })

      if (response.data.status) {
        navigate("/cart")
      } else {
        console.log("Failed to reorder the order")
      }
    } catch (error) {
      console.error("Error reordering the order:", error)
    } finally {
      setIsReordering(false)
    }
  }

  const handleSubmitFeedback = async () => {
    if (!rating) {
      alert("Please select a rating before submitting.")
      return
    }

    try {
      const response = await axios.post("https://partnermeatwala.com/api/customer/givereviewandrating", {
        userid: storedUser?.userid,
        bookingid: item?.orderid,
        restid: item?.restid,
        ratingscore: rating.toString(),
        reviewtext: comment,
      })

      if (response.data.status) {
        alert("Thank you for your feedback!")
        setRating(0)
        setComment("")

        // Properly close the rating modal
        if (modalInstances.rating) {
          modalInstances.rating.hide()
        }

        // Additional cleanup
        setTimeout(() => {
          const backdrops = document.querySelectorAll(".modal-backdrop")
          backdrops.forEach((backdrop) => backdrop.remove())
          document.body.classList.remove("modal-open")
          document.body.style.overflow = ""
          document.body.style.paddingRight = ""
        }, 300)
      } else {
        console.log("Failed to submit feedback")
      }
    } catch (error) {
      console.error("Error submitting feedback:", error)
    }
  }

  return (
    <>
      <li>
        <div className="order-box">
          <div className="order-box-content">
            <div className="brand-icon">
              <img
                className="img-fluid icon"
                src={`https://partnermeatwala.com/documents/${item?.bannerimage}`}
                alt="brand3"
              />
            </div>
            <div className="order-details">
              <div className="d-flex align-items-center justify-content-between w-100">
                <h5 className="brand-name dark-text fw-medium">{item?.restname}</h5>
                <h6 className="fw-medium content-color text-end">{item?.orderdate}</h6>
              </div>
              <h6 className="fw-medium dark-text">
                <span className="fw-normal content-color">Order Id :</span>
                {item?.orderid}
              </h6>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between mt-sm-3 mt-2">
            <h6 className="fw-medium dark-text">
              <span className="fw-normal content-color">Total Amount :</span>£{" "}
              {Number(item?.netpayamount || 0).toFixed(2)}
            </h6>

            <div className="d-flex ms-auto gap-2">
              <Link
                className="btn theme-outline details-btn"
                data-bs-toggle="modal"
                data-bs-target={`#order-${item?.orderid}`}
              >
                Details
              </Link>
              {localOrderStatus === "pending" && (
                <button
                  type="button"
                  style={{ borderRadius: "100px" }}
                  className="btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target={`#order1-${item?.orderid}`}
                >
                  Cancel Order
                </button>
              )}
              {localOrderStatus !== "pending" && (
                <button
                  type="button"
                  style={{ borderRadius: "100px" }}
                  className="btn btn-danger"
                  onClick={handleReorder}
                  disabled={isReordering}
                >
                  {isReordering ? "Reordering..." : "ReOrder"}
                </button>
              )}
              <button
                type="button"
                style={{ borderRadius: "100px" }}
                className="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target={`#rating-modal-${item?.orderid}`}
              >
                Rate Us
              </button>
            </div>
          </div>
        </div>
      </li>

      {/* Details Modal */}
      <div
        className="modal order-details-modal"
        id={`order-${item?.orderid}`}
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex={-1}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-medium" id="exampleModalToggleLabel">
                Order details
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="order-details-box">
                <div className="order-icon">
                  <img
                    className="img-fluid icon"
                    src={`https://partnermeatwala.com/documents/${item?.logo}`}
                    alt="brand3"
                  />
                </div>
                <div className="order-content">
                  <h5 className="brand-name dark-text fw-medium">{item?.restname}</h5>
                  <h6 className="order-deliver-label">{item?.orderstatus}</h6>
                </div>
              </div>
              <div className="delivery-address">
                <div className="d-flex align-items-center gap-2 mt-2">
                  <i className="ri-map-pin-fill theme-color" />
                  <p>{item?.restaddress}</p>
                </div>
              </div>
              <div className="delivery-on-going">
                <ul className="delivery-list">
                  <li>
                    <h6>Order Id</h6>
                    <h5>{item?.orderid}</h5>
                  </li>
                  <li>
                    <h6>Date &amp; Time</h6>
                    <h5>{item?.orderdate}</h5>
                  </li>
                </ul>
                <ul className="delivery-list">
                  <li>
                    <div className="order-address">
                      <img className="img-fluid place-icon" src="assets/images/svg/placed.svg" alt="restaurant" />
                      <h5>Store Address</h5>
                    </div>
                    <h6 className="delivery-place">{item?.restaddress}</h6>
                  </li>
                  <li>
                    <div className="order-address">
                      <img className="img-fluid place-icon" src="assets/images/svg/user-map.svg" alt="delivery" />
                      <h5>Order Type</h5>
                    </div>
                    <h6 className="delivery-place">{item?.ordertype}</h6>
                  </li>
                </ul>
              </div>
              <ul className="order-list">
                {item?.orderfood?.map((data) => (
                  <li key={data?.foodid}>{/* Order food items can be displayed here */}</li>
                ))}
              </ul>
              <div className="total-amount">
                <div className="grand-amount d-flex align-items-center justify-content-between">
                  <h6 className="fw-medium dark-text">Grand Total</h6>
                  <h6 className="fw-medium dark-text">£{Number(item?.netpayamount).toFixed(2)}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Order Modal */}
      <div
        className="modal order-details-modal"
        id={`order1-${item?.orderid}`}
        aria-hidden="true"
        aria-labelledby="cancelModalLabel"
        tabIndex={-1}
        data-bs-backdrop="true"
        data-bs-keyboard="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-medium" id="cancelModalLabel">
                Cancel Order
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="cancel-order-section mt-3">
                <h6>Cancel Order</h6>
                <textarea
                  className="form-control"
                  placeholder="Reason for cancellation"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  disabled={isCancelling}
                />
                <button
                  type="button"
                  style={{ borderRadius: "100px" }}
                  className="btn btn-danger mt-2"
                  onClick={handleCancelOrder}
                  disabled={isCancelling || !cancelReason.trim()}
                >
                  {isCancelling ? "Canceling..." : "Cancel Order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Modal */}
      <div
        className="modal fade"
        id={`rating-modal-${item?.orderid}`}
        tabIndex="-1"
        aria-hidden="true"
        data-bs-backdrop="true"
        data-bs-keyboard="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Rate Your Order</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3 text-center">
                <h6>How was your experience with</h6>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h2 style={{ color: "#e81435" }} className="">
                    {item.restname}
                  </h2>
                </span>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <label key={star} className="star">
                      <input
                        type="radio"
                        name={`rating-${item?.orderid}`}
                        value={star}
                        onChange={() => setRating(star)}
                      />
                      <span className={star <= rating ? "filled-star" : "empty-star"} style={{ height: "20px" }}>
                        ★
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" style={{ color: "black" }}>
                  Leave a comment
                </label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSubmitFeedback}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HistoryCard

