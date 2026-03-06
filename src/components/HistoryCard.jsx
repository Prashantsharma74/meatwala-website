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

// "use client"

// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { Modal } from "bootstrap"
// import { Link } from "react-router-dom"
// import { orderHistory } from "../utils/api"
// import axios from "axios"

// const HistoryCard = ({ item, onOrderUpdate }) => {
//   const storedUser = JSON.parse(localStorage.getItem("user")) || ""
//   const navigate = useNavigate()
//   const data = {
//     userid: storedUser?.userid,
//   }
//   const [cancelReason, setCancelReason] = useState("")
//   const [isCancelling, setIsCancelling] = useState(false)
//   const [isReordering, setIsReordering] = useState(false)
//   const [rating, setRating] = useState(0)
//   const [comment, setComment] = useState("")
//   const [localOrderStatus, setLocalOrderStatus] = useState(item?.orderstatus)

//   // Store modal instances
//   const [modalInstances, setModalInstances] = useState({})

//   useEffect(() => {
//     // Initialize all modals
//     const modals = {}

//     const ratingModalElement = document.getElementById(`rating-modal-${item?.orderid}`)
//     if (ratingModalElement) {
//       modals.rating = new Modal(ratingModalElement)
//     }

//     const detailsModalElement = document.getElementById(`order-${item?.orderid}`)
//     if (detailsModalElement) {
//       modals.details = new Modal(detailsModalElement)
//     }

//     const cancelModalElement = document.getElementById(`order1-${item?.orderid}`)
//     if (cancelModalElement) {
//       modals.cancel = new Modal(cancelModalElement)
//     }

//     setModalInstances(modals)

//     // Cleanup function
//     return () => {
//       Object.values(modals).forEach((modal) => {
//         if (modal) {
//           modal.dispose()
//         }
//       })
//       // Remove any lingering backdrops
//       const backdrops = document.querySelectorAll(".modal-backdrop")
//       backdrops.forEach((backdrop) => backdrop.remove())
//       document.body.classList.remove("modal-open")
//       document.body.style.overflow = ""
//       document.body.style.paddingRight = ""
//     }
//   }, [item?.orderid])

//   const handleCancelOrder = async () => {
//     try {
//       if (!cancelReason) {
//         return
//       }
//       setIsCancelling(true)

//       const response = await axios.post("https://partnermeatwala.com/api/customer/cancelorder", {
//         orderid: item?.orderid,
//         reason: cancelReason,
//         type: "1",
//       })

//       if (response.data.status) {
//         if (modalInstances.cancel) {
//           modalInstances.cancel.hide()
//         }

//         setTimeout(() => {
//           const backdrops = document.querySelectorAll(".modal-backdrop")
//           backdrops.forEach((backdrop) => backdrop.remove())
//           document.body.classList.remove("modal-open")
//           document.body.style.overflow = ""
//           document.body.style.paddingRight = ""
//         }, 300)

//         if (onOrderUpdate) {
//           onOrderUpdate()
//         } else {
//           await orderHistory(data)
//           window.location.reload()
//         }

//         setCancelReason("")
//         setLocalOrderStatus("cancelled")
//       } else {
//         console.log("Failed to cancel the order")
//       }
//     } catch (error) {
//       console.error("Error canceling the order:", error)
//     } finally {
//       setIsCancelling(false)
//     }
//   }

//   const handleReorder = async () => {
//     try {
//       setIsReordering(true)
//       const response = await axios.post("https://partnermeatwala.com/api/customer/reorderbooking", {
//         userid: storedUser?.userid,
//         bookingid: item?.orderid,
//       })

//       if (response.data.status) {
//         navigate("/cart")
//       } else {
//         console.log("Failed to reorder the order")
//       }
//     } catch (error) {
//       console.error("Error reordering the order:", error)
//     } finally {
//       setIsReordering(false)
//     }
//   }

//   const handleSubmitFeedback = async () => {
//     if (!rating) {
//       alert("Please select a rating before submitting.")
//       return
//     }

//     try {
//       const response = await axios.post("https://partnermeatwala.com/api/customer/givereviewandrating", {
//         userid: storedUser?.userid,
//         bookingid: item?.orderid,
//         restid: item?.restid,
//         ratingscore: rating.toString(),
//         reviewtext: comment,
//       })

//       if (response.data.status) {
//         alert("Thank you for your feedback!")
//         setRating(0)
//         setComment("")

//         if (modalInstances.rating) {
//           modalInstances.rating.hide()
//         }

//         setTimeout(() => {
//           const backdrops = document.querySelectorAll(".modal-backdrop")
//           backdrops.forEach((backdrop) => backdrop.remove())
//           document.body.classList.remove("modal-open")
//           document.body.style.overflow = ""
//           document.body.style.paddingRight = ""
//         }, 300)
//       } else {
//         console.log("Failed to submit feedback")
//       }
//     } catch (error) {
//       console.error("Error submitting feedback:", error)
//     }
//   }

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
//                 <h5 className="brand-name dark-text fw-medium">{item?.restname}</h5>
//                 <h6 className="fw-medium content-color text-end">
//                   {item?.orderdate
//                     ? `${new Date(item.orderdate).toLocaleDateString("en-GB", {
//                       day: "2-digit",
//                       month: "long",
//                       year: "numeric",
//                     })}, ${new Date(item.orderdate).toLocaleTimeString("en-GB", {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                       second: "2-digit",
//                       hour12: true,
//                     })}`
//                     : ""}
//                 </h6>
//               </div>
//               <h6 className="fw-medium dark-text">
//                 <span className="fw-normal content-color">Order Id :</span>
//                 {item?.orderid}
//               </h6>
//             </div>
//           </div>
//           <div className="d-flex align-items-center justify-content-between mt-sm-3 mt-2">
//             <h6 className="fw-medium dark-text">
//               <span className="fw-normal content-color">Total Amount :</span>£{" "}
//               {Number(item?.netpayamount || 0).toFixed(2)}
//             </h6>

//             <div className="d-flex ms-auto gap-2">
//               <Link
//                 className="btn theme-outline details-btn"
//                 data-bs-toggle="modal"
//                 data-bs-target={`#order-${item?.orderid}`}
//               >
//                 Details
//               </Link>
//               {localOrderStatus === "pending" && (
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
//               {localOrderStatus !== "pending" && (
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
//               <h5 className="modal-title fw-medium" id="exampleModalToggleLabel">
//                 Order details
//               </h5>
//               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
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
//                   <h5 className="brand-name dark-text fw-medium">{item?.restname}</h5>
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
//                       <img className="img-fluid place-icon" src="assets/images/svg/placed.svg" alt="restaurant" />
//                       <h5>Store Address</h5>
//                     </div>
//                     <h6 className="delivery-place">{item?.restaddress}</h6>
//                   </li>
//                   <li>
//                     <div className="order-address">
//                       <img className="img-fluid place-icon" src="assets/images/svg/user-map.svg" alt="delivery" />
//                       <h5>Order Type</h5>
//                     </div>
//                     <h6 className="delivery-place">{item?.ordertype}</h6>
//                   </li>
//                 </ul>
//               </div>
//               <ul className="order-list">
//                 {item?.orderfood?.map((data) => (
//                   <li key={data?.foodid}></li>
//                 ))}
//               </ul>
//               <div className="total-amount">
//                 <div className="grand-amount d-flex align-items-center justify-content-between">
//                   <h6 className="fw-medium dark-text">Grand Total</h6>
//                   <h6 className="fw-medium dark-text">£{Number(item?.netpayamount).toFixed(2)}</h6>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div
//         className="modal order-details-modal"
//         id={`order1-${item?.orderid}`}
//         aria-hidden="true"
//         aria-labelledby="cancelModalLabel"
//         tabIndex={-1}
//         data-bs-backdrop="true"
//         data-bs-keyboard="true"
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title fw-medium" id="cancelModalLabel">
//                 Cancel Order
//               </h5>
//               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
//             </div>
//             <div className="modal-body">
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
//                   disabled={isCancelling || !cancelReason.trim()}
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
//         data-bs-backdrop="true"
//         data-bs-keyboard="true"
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">Rate Your Order</h5>
//               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
//                       <span className={star <= rating ? "filled-star" : "empty-star"} style={{ height: "20px" }}>
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
//               <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
//                 Close
//               </button>
//               <button type="button" className="btn btn-primary" onClick={handleSubmitFeedback}>
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default HistoryCard

"use client";

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Modal } from "bootstrap";
import { orderHistory } from "../utils/api";
import axios from "axios";

const HistoryCard = ({ item, onOrderUpdate }) => {
  const storedUser = JSON.parse(localStorage.getItem("user")) || "";
  const navigate = useNavigate();
  const data = {
    userid: storedUser?.userid,
  };
  const [cancelReason, setCancelReason] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);
  const [isReordering, setIsReordering] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [localOrderStatus, setLocalOrderStatus] = useState(item?.orderstatus);

  const [modalInstances, setModalInstances] = useState({});

  const [details, setDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const getOrderDetails = async () => {
    if (!item?.orderid || !storedUser?.userid) return;
    try {
      setLoadingDetails(true);
      const res = await axios.post(
        "https://partnermeatwala.com/api/customer/getorderhistorybyid",
        {
          orderid: String(item.orderid), // "1597"
          userid: String(storedUser.userid), // "155"
        },
      );
      setDetails(res.data);
    } catch (err) {
      console.error("getOrderDetails failed:", err);
    } finally {
      setLoadingDetails(false);
    }
  };

  useEffect(() => {
    getOrderDetails();
    // you could also fetch only when the details modal opens
    // if you prefer (hook into the click that opens it)
  }, [item?.orderid, storedUser?.userid]);

  useEffect(() => {
    const modals = {};

    const ratingModalElement = document.getElementById(
      `rating-modal-${item?.orderid}`,
    );
    if (ratingModalElement) {
      modals.rating = new Modal(ratingModalElement);
    }

    const detailsModalElement = document.getElementById(
      `order-${item?.orderid}`,
    );
    if (detailsModalElement) {
      modals.details = new Modal(detailsModalElement);
    }

    const cancelModalElement = document.getElementById(
      `order1-${item?.orderid}`,
    );
    if (cancelModalElement) {
      modals.cancel = new Modal(cancelModalElement);
    }

    setModalInstances(modals);

    return () => {
      Object.values(modals).forEach((modal) => {
        if (modal) modal.dispose();
      });
      const backdrops = document.querySelectorAll(".modal-backdrop");
      backdrops.forEach((backdrop) => backdrop.remove());
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [item?.orderid]);

  const handleCancelOrder = async () => {
    try {
      if (!cancelReason) return;
      setIsCancelling(true);

      const response = await axios.post(
        "https://partnermeatwala.com/api/customer/cancelorder",
        {
          orderid: item?.orderid,
          reason: cancelReason,
          type: "1",
        },
      );

      if (response.data.status) {
        if (modalInstances.cancel) modalInstances.cancel.hide();

        setTimeout(() => {
          const backdrops = document.querySelectorAll(".modal-backdrop");
          backdrops.forEach((backdrop) => backdrop.remove());
          document.body.classList.remove("modal-open");
          document.body.style.overflow = "";
          document.body.style.paddingRight = "";
        }, 300);

        if (onOrderUpdate) {
          onOrderUpdate();
        } else {
          await orderHistory(data);
          window.location.reload();
        }

        setCancelReason("");
        setLocalOrderStatus("cancelled");
      } else {
        console.log("Failed to cancel the order");
      }
    } catch (error) {
      console.error("Error canceling the order:", error);
    } finally {
      setIsCancelling(false);
    }
  };

  const handleReorder = async () => {
    try {
      setIsReordering(true);
      const response = await axios.post(
        "https://partnermeatwala.com/api/customer/reorderbooking",
        {
          userid: storedUser?.userid,
          bookingid: item?.orderid,
        },
      );

      if (response.data.status) {
        navigate("/cart");
      } else {
        console.log("Failed to reorder the order");
      }
    } catch (error) {
      console.error("Error reordering the order:", error);
    } finally {
      setIsReordering(false);
    }
  };

  const handleSubmitFeedback = async () => {
    if (!rating) {
      alert("Please select a rating before submitting.");
      return;
    }

    try {
      const response = await axios.post(
        "https://partnermeatwala.com/api/customer/givereviewandrating",
        {
          userid: storedUser?.userid,
          bookingid: item?.orderid,
          restid: item?.restid,
          ratingscore: rating.toString(),
          reviewtext: comment,
        },
      );

      if (response.data.status) {
        alert("Thank you for your feedback!");
        setRating(0);
        setComment("");

        if (modalInstances.rating) modalInstances.rating.hide();

        setTimeout(() => {
          const backdrops = document.querySelectorAll(".modal-backdrop");
          backdrops.forEach((backdrop) => backdrop.remove());
          document.body.classList.remove("modal-open");
          document.body.style.overflow = "";
          document.body.style.paddingRight = "";
        }, 300);
      } else {
        console.log("Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  // ----- helpers for the details modal -----
  // const toNumber = (v, fallback = 0) => {
  //   const n = Number(String(v ?? "").trim());
  //   return Number.isFinite(n) ? n : fallback;
  // };

  // const fmtGBP = (v) =>
  //   new Intl.NumberFormat("en-GB", {
  //     style: "currency",
  //     currency: "GBP",
  //   }).format(toNumber(v));

  // const extractQty = (row) => toNumber(row?.qty ?? row?.quantity ?? 1, 1);
  // const extractPrice = (row) =>
  //   toNumber(row?.price ?? row?.unitprice ?? row?.rate ?? 0, 0);

  // const lineItems = Array.isArray(item?.orderfood)
  //   ? item.orderfood.map((f) => {
  //     const qty = extractQty(f);
  //     const price = extractPrice(f);
  //     return {
  //       id:
  //         f?.foodid ??
  //         crypto.randomUUID?.() ??
  //         Math.random().toString(36).slice(2),
  //       name: f?.foodname ?? "Item",
  //       qty,
  //       price,
  //       total: qty * price,
  //     };
  //   })
  //   : [];

  // const subtotal = lineItems.reduce((s, l) => s + l.total, 0);
  // const delivery = toNumber(item?.deliverycharge ?? item?.deliveryfee);
  // const discount = toNumber(item?.discountamount ?? item?.coupondiscount);
  // const tax = toNumber(item?.taxamount ?? item?.vat);

  // const computedGrand = subtotal + delivery + tax - discount;
  // const grandTotal = toNumber(item?.netpayamount, computedGrand);

  // const paymentMethod = (
  //   item?.paymentmethod ?? item?.paymode ?? item?.payment_mode ?? "Cash"
  // ).toString();
  // const paymentStatus = (
  //   item?.paymentstatus ??
  //   (paymentMethod.toLowerCase().includes("cash")
  //     ? "Pending (Cash on pickup/delivery)"
  //     : "Paid")
  // ).toString();

  // handy helpers
  const toNum = (v, fb = 0) => {
    const n = Number(String(v ?? "").trim());
    return Number.isFinite(n) ? n : fb;
  };
  const fmtGBP = (v) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(toNum(v));

  // prefer API details if present, else current item
  const master = details?.ordermaster?.[0];
  const view = master ?? item ?? {};

  const logoUrl = view.logo
    ? `https://partnermeatwala.com/documents/${view.logo}`
    : `https://partnermeatwala.com/documents/${item?.logo}`;

  const restname = view.restname ?? item?.restname;
  const restaddress = view.restaddress ?? item?.restaddress;
  const orderid = view.orderid ?? item?.orderid;
  const orderdate = view.orderdate ?? item?.orderdate;
  const ordertype = view.ordertype ?? item?.ordertype;
  const orderstatus = view.orderstatus ?? item?.orderstatus;
  const paymentMethod = (
    view.paymentmode ??
    item?.paymentmethod ??
    "Cash"
  ).toString();

  // line items from API (ordermaster[0].orderdetail) or from item.orderfood
  const apiItems = Array.isArray(master?.orderdetail) ? master.orderdetail : [];
  const propItems = Array.isArray(item?.orderfood) ? item.orderfood : [];

  // const lineItems = (apiItems.length ? apiItems : propItems).map((row, i) => {

  //   const name = row.food ?? row.foodname ?? `Item ${i + 1}`;
  //   const qty = toNum(row.quantity ?? row.qty ?? 1, 1);
  //   const price = toNum(row.amount ?? row.price ?? row.unitprice ?? 0);
  //   return {
  //     id: row.orderdetailid ?? row.foodid ?? `${orderid}-${i}`,
  //     name,
  //     qty,
  //     price,
  //     total: qty * price,
  //     category: row.category,
  //     type: row.type,
  //     veg: row.veg === "1",
  //     nonveg: row.nonveg === "1",
  //     foodimg: row.foodimg,
  //     catimg: row.catimg,
  //     ordertopupdetail: row.ordertopupdetail || [],
  //   };
  // });

  const lineItems = (apiItems.length ? apiItems : propItems).map((row, i) => {
    const name = row.food ?? row.foodname ?? `Item ${i + 1}`;
    const qty = toNum(row.quantity ?? row.qty ?? 1, 1);
    const price = toNum(row.amount ?? row.price ?? row.unitprice ?? 0);

    // 👉 toppings total
    const toppingsTotal = Array.isArray(row.ordertopupdetail)
      ? row.ordertopupdetail.reduce((sum, t) => sum + toNum(t.amount ?? 0), 0)
      : 0;

    return {
      id: row.orderdetailid ?? row.foodid ?? `${orderid}-${i}`,
      name,
      qty,
      price,
      toppingsTotal,
      total: qty * price + toppingsTotal, // ✅ item + toppings
      ordertopupdetail: row.ordertopupdetail || [],
    };
  });

  console.log("apiItems:", apiItems);

  // const subtotal = lineItems.reduce((s, l) => s + l.total, 0); // yaha
  const subtotal = lineItems.reduce((s, l) => s + l.total, 0);
  const delivery = toNum(view.deliverycharges ?? item?.deliverycharge ?? 0);
  const service = toNum(view.servicecharges ?? item?.servicecharges ?? 0);
  const discount =
    toNum(view.coupondicount ?? view.coupondiscount ?? 0) +
    toNum(view.loyaltidiscount ?? 0);
  const computed = subtotal + delivery + service - discount;
  const grandTotal = toNum(view.netpayamount ?? item?.netpayamount, computed);

  const paymentStatus = paymentMethod.toLowerCase().includes("cash")
    ? "Pending (Cash on pickup/delivery)"
    : "Paid";

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
                <h5 className="brand-name dark-text fw-medium">
                  {item?.restname}
                </h5>
                <h6 className="fw-medium content-color text-end">
                  {item?.orderdate
                    ? `${new Date(item.orderdate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}, ${new Date(item.orderdate).toLocaleTimeString(
                        "en-GB",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: true,
                        },
                      )}`
                    : ""}
                </h6>
              </div>
              <h6 className="fw-medium dark-text">
                <span className="fw-normal content-color">Order Id :</span>
                {item?.orderid}
              </h6>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between mt-sm-3 mt-2">
            <h6 className="fw-medium dark-text">
              <span className="fw-normal content-color">Total Amount :</span>{" "}
              {fmtGBP(item?.netpayamount || 0)}
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
              {/* {localOrderStatus !== "pending" && (
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
              </button> */}
              {localOrderStatus !== "pending" && (
                <button
                  type="button"
                  style={{
                    borderRadius: "100px",
                    transition: "all 0.3s ease",
                  }}
                  className="btn btn-danger"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                  onClick={handleReorder}
                  disabled={isReordering}
                >
                  {isReordering ? "Reordering..." : "ReOrder"}
                </button>
              )}

              <button
                type="button"
                style={{
                  borderRadius: "100px",
                  transition: "all 0.3s ease",
                }}
                className="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target={`#rating-modal-${item?.orderid}`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 10px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Rate Us
              </button>
            </div>
          </div>
        </div>
      </li>

      {/* === ORDER DETAILS MODAL (updated) === */}
      <div
        className="modal order-details-modal"
        id={`order-${item?.orderid}`}
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex={-1}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div
            className="modal-content"
            style={{ borderRadius: "16px", border: "none" }}
          >
            {/* Modal Header */}
            <div
              className="modal-header"
              style={{
                borderBottom: "1px solid #f0f0f0",
                padding: "20px 24px",
              }}
            >
              <div className="w-100">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5
                      className="modal-title fw-bold mb-1"
                      style={{ fontSize: "18px" }}
                    >
                      Order #{orderid}
                    </h5>
                    <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
                      {item?.orderdate
                        ? `${new Date(item.orderdate).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )} ${new Date(item.orderdate).toLocaleTimeString(
                            "en-GB",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            },
                          )}`
                        : "-"}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    style={{ marginTop: "-8px" }}
                  />
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="modal-body" style={{ padding: "24px" }}>
              {/* Restaurant Info */}
              <div className="mb-4">
                <h6 className="fw-semibold" style={{ fontSize: "16px" }}>
                  {restname}
                </h6>
                <div className="d-flex align-items-center gap-2">
                  {/* <span className={`badge ${String(orderstatus).toLowerCase().includes("cancel") ? "bg-danger" : "bg-success"}`}>
                    {orderstatus}
                  </span> */}
                  <span
                    className={`badge ${
                      String(orderstatus).toLowerCase().includes("cancel") ||
                      String(orderstatus).toLowerCase().includes("rejected")
                        ? "bg-danger"
                        : "bg-success"
                    }`}
                  >
                    {orderstatus}
                  </span>
                  <span className="text-muted" style={{ fontSize: "14px" }}>
                    {ordertype || "-"}
                  </span>
                </div>
              </div>

              {/* Items Ordered Section */}
              <div className="mb-4">
                <h6
                  className="fw-semibold"
                  style={{ fontSize: "16px", color: "#333" }}
                >
                  Items Ordered
                </h6>
                <div
                  className="border rounded-3"
                  style={{ borderColor: "#f0f0f0" }}
                >
                  {lineItems.length > 0 ? (
                    lineItems.map((li, index) => (
                      <div
                        key={li.id}
                        className="p-3"
                        style={{
                          borderBottom:
                            index < lineItems.length - 1
                              ? "1px solid #f0f0f0"
                              : "none",
                          backgroundColor:
                            index % 2 === 0 ? "#fafafa" : "transparent",
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-start">
                          <div className="flex-grow-1">
                            <div className="d-flex align-items-center gap-2 mb-1"></div>

                            {/* Main Item Info */}
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <div className="flex-grow-1">
                                <div
                                  className="fw-medium"
                                  style={{ fontSize: "14px" }}
                                >
                                  {li.name}
                                </div>

                                {/* Food Type and Quantity */}
                                <div
                                  className="text-muted"
                                  style={{ fontSize: "12px" }}
                                >
                                  {li.type && (
                                    <span className="me-2">
                                      <strong>Size:</strong> {li.type}
                                    </span>
                                  )}
                                  <span>
                                    <strong>Qty:</strong> {li.qty}
                                  </span>
                                </div>
                                {li.ordertopupdetail &&
                                  li.ordertopupdetail.length > 0 && (
                                    <div className="">
                                      <div className="d-flex flex-column">
                                        {li.ordertopupdetail.map(
                                          (topping, toppingIndex) => (
                                            <div
                                              key={toppingIndex}
                                              className="d-flex justify-content-start align-items-start"
                                              style={{
                                                flexDirection: "column",
                                              }}
                                            >
                                              <div>
                                                <span
                                                  className="text-muted"
                                                  style={{ fontSize: "12px" }}
                                                >
                                                  {topping.topupname}:
                                                </span>
                                                <span
                                                  className="fw-medium"
                                                  style={{
                                                    fontSize: "12px",
                                                    color: "#333",
                                                  }}
                                                >
                                                  {topping.extopupname}
                                                </span>
                                              </div>
                                              {topping.amount &&
                                                topping.amount !== "0" && (
                                                  <span
                                                    className="text-success"
                                                    style={{
                                                      fontSize: "11px",
                                                      fontWeight: "500",
                                                    }}
                                                  >
                                                    +{fmtGBP(topping.amount)}
                                                  </span>
                                                )}
                                            </div>
                                          ),
                                        )}
                                      </div>
                                    </div>
                                  )}
                              </div>

                              <div className="text-end ms-3">
                                <div
                                  className="fw-semibold"
                                  style={{ fontSize: "14px" }}
                                >
                                  {fmtGBP(li.total)}
                                </div>
                                {/* <div className="text-muted" style={{ fontSize: '12px' }}>{fmtGBP(li.price)} each</div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div
                      className="text-center text-muted py-4"
                      style={{ fontSize: "14px" }}
                    >
                      No item details available.
                    </div>
                  )}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="">
                <h6
                  className="fw-semibold"
                  style={{ fontSize: "16px", color: "#333" }}
                >
                  Price Breakdown
                </h6>
                <div
                  className="border rounded-3 p-3"
                  style={{ borderColor: "#f0f0f0", backgroundColor: "#fafafa" }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted" style={{ fontSize: "14px" }}>
                      Subtotal
                    </span>
                    <span className="fw-medium" style={{ fontSize: "14px" }}>
                      {fmtGBP(subtotal)}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-muted" style={{ fontSize: "14px" }}>
                        Promo Discount
                      </span>
                      <span
                        className="fw-medium text-success"
                        style={{ fontSize: "14px" }}
                      >
                        -{fmtGBP(discount)}
                      </span>
                    </div>
                  )}

                  {delivery > 0 && (
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-muted" style={{ fontSize: "14px" }}>
                        Delivery Fee
                      </span>
                      <span className="fw-medium" style={{ fontSize: "14px" }}>
                        {fmtGBP(delivery)}
                      </span>
                    </div>
                  )}
                  {service > 0 && (
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-muted" style={{ fontSize: "14px" }}>
                        Service Charge
                      </span>
                      <span className="fw-medium" style={{ fontSize: "14px" }}>
                        {fmtGBP(service)}
                      </span>
                    </div>
                  )}

                  {/* <hr className="my-3" style={{ borderColor: '#e0e0e0' }} /> */}

                  <div
                    className="d-flex justify-content-between align-items-center"
                    style={{ borderTop: "2px solid lightgrey" }}
                  >
                    <span className="fw-bold mt-1" style={{ fontSize: "16px" }}>
                      Grand Total
                    </span>
                    <span
                      className="fw-bold"
                      style={{ fontSize: "16px", color: "#e84135" }}
                    >
                      {fmtGBP(grandTotal)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className=" mt-3">
                <h6
                  className="fw-semibold"
                  style={{ fontSize: "16px", color: "#333" }}
                >
                  Payment Method
                </h6>
                <div
                  className="border rounded-3 p-3"
                  style={{ borderColor: "#f0f0f0" }}
                >
                  <div className="d-flex flex-sm-row align-items-center justify-content-center align-items-sm-center gap-3">
                    {/* Left: Icon */}
                    <div
                      className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#f0f0f0",
                        fontSize: "18px",
                      }}
                    >
                      {paymentMethod.toLowerCase().includes("cash")
                        ? "📞"
                        : "💳"}
                    </div>

                    {/* Middle: Text */}
                    <div className="flex-grow-1">
                      <div className="fw-medium" style={{ fontSize: "14px" }}>
                        {paymentMethod}
                        {paymentStatus.toLowerCase().includes("pending") &&
                          " – Pending"}
                      </div>

                      {/* {paymentMethod.toLowerCase().includes("cash") &&
                        paymentStatus.toLowerCase().includes("pending") && (
                          <div
                            className="text-muted"
                            style={{ fontSize: "13px", marginTop: "4px" }}
                          >
                            Please pay {fmtGBP(grandTotal)} in cash to the
                            driver upon delivery.
                          </div>
                        )} */}
                    </div>

                    {/* Right: Badge */}
                    {/* <div className="ms-sm-auto">
                      <span
                        className={`badge ${
                          paymentStatus.toLowerCase().includes("paid")
                            ? "bg-success"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {paymentStatus}
                      </span>
                    </div> */}
                  </div>
                </div>
              </div>

              {/* Support Section */}
              <div className="text-center mt-2 mb-5">
                <p className="text-muted mb-2" style={{ fontSize: "14px" }}>
                  Need help with your order?
                </p>
                <Link
                  to="/support"
                  className="btn btn-outline-secondary"
                  style={{
                    borderRadius: "8px",
                    padding: "8px 20px",
                    fontSize: "14px",
                    borderColor: "#ddd",
                  }}
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === CANCEL MODAL === */}
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
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
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
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
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
                {/* <div className="star-rating">
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
                </div> */}
                <div
                  className="star-rating"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "8px",
                    marginTop: "8px",
                  }}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <label key={star} style={{ cursor: "pointer" }}>
                      <input
                        type="radio"
                        name={`rating-${item?.orderid}`}
                        value={star}
                        onChange={() => setRating(star)}
                        style={{ display: "none" }} // 👈 VERY IMPORTANT
                      />
                      <span
                        style={{
                          fontSize: "32px",
                          color: star <= rating ? "#FFC107" : "#D1D5DB",
                          transition: "color 0.2s ease, transform 0.2s ease",
                          display: "inline-block",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform = "scale(1.2)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      >
                        ★
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" style={{ color: "black" }}>
                  Leave a comment (optional)
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
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmitFeedback}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryCard;
