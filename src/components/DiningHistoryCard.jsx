import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "bootstrap";
import { Link } from "react-router-dom";
import {DiningHistory,reOrder} from "../utils/api"
import axios from "axios";  // For API requests (or use your own request handler)

const HistoryCard = ({ item,activeTab }) => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user")) || "";
  const data = {
    userid: storedUser?.userid,
  };
  const [bookingStatus, setBookingStatus] = useState(item.bookingstatus);
  const [cancelReason, setCancelReason] = useState("");
  const [isCancelling, setIsCancelling] = useState(false); 
  const [isReordering, setIsReordering] = useState(false); 
  useEffect(() => {
    const modalElement = document.getElementById(`order-${item?.bookingid}`);
    if (modalElement) {
      new Modal(modalElement);
    }
  }, [item?.bookingid]);
  useEffect(() => {
    const modalElement = document.getElementById(`order1-${item?.bookingid}`);
    if (modalElement) {
      new Modal(modalElement);
    }
  }, [item?.bookingid]);

  const handleCancelOrder = async () => {
    try {
      const data = {
        custid: storedUser?.userid, 
           };
     
      setIsCancelling(true);
      
      const response = await axios.post("https://partnermeatwala.com/api/customer/gocancelddiningbooking", {
        bookingid: item?.bookingid,
        custid: storedUser?.userid,
      });
     
      const res =  await DiningHistory(data);
 

      if (res.success == "1") {
        setBookingStatus("Canceled");

        // Close the modal after success
        // const modalElement = document.getElementById(`order1-${item?.bookingid}`);
        // const modalInstance = Modal.getInstance(modalElement);
        // if (modalInstance) {
        //   modalInstance.hide();
        // }
        // Optionally refresh the order list or perform any other UI updates
      } else {
        console.log("Failed to cancel the order");
      }
    } catch (error) {
      console.error("Error canceling the order:", error);
    }finally {
      setIsCancelling(false);  // End the cancellation process
    }
  };

  const handleReorder = async () => {
    try {
      setIsReordering(true);
      navigate(`/bookatablehighwycombe/${item?.restid}`)
     
  }catch(error){
    console.log(error,"error")
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
                src={`https://partnermeatwala.com/documents/${item?.restlogo}`}
                alt="brand3"
              />
            </div>
            <div className="order-details">
              <div className="d-flex align-items-center justify-content-between w-100">
                <h5 className="brand-name dark-text fw-medium">
                  {item?.restname}
                </h5>
                <h6 className="fw-medium content-color text-end">
                  {item?.bookingdate}
                </h6>
              </div>
              <h6 className="fw-medium dark-text">
                <span className="fw-normal content-color">Booking Id :</span>
                {item?.bookingid}  
              </h6>
              <h6 className="fw-medium dark-text">
                <span className="fw-normal content-color">Booking Time :</span>
                {item?.bookingtime}  
              </h6>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between mt-sm-3 mt-2">
  {/* Left side: Total Amount */}
  {/* <h6 className="fw-medium dark-text">
    <span className="fw-normal content-color">Discount :</span>£{" "}
    {item?.discountpercentage}
  </h6> */}

  {/* Right side: Buttons */}
  <div className="d-flex ms-auto gap-2"> {/* Added ms-auto to push buttons to the right */}
    <Link
      className="btn theme-outline details-btn"
      data-bs-toggle="modal"
      data-bs-target={`#order-${item?.bookingid}`}
    >
      Details
    </Link>
    {bookingStatus === "Booked" && activeTab === "Upcoming" && (
              <button type="button" className="btn btn-danger" onClick={handleCancelOrder} disabled={isCancelling}>
                {isCancelling ? "Canceling..." : "Cancel Booking"}
              </button>
            )}

{bookingStatus === "Canceled" && (
                <button
                  type="button"
                  style={{ borderRadius: "100px" }}
                  className="btn btn-danger"
                  onClick={handleReorder} // Call reorder function
                  disabled={isReordering} // Disable button during reorder
                >
                  {isReordering ? "Reordering..." : "ReOrder"} {/* Show appropriate text */}
                </button>
              )}
  </div>
</div>

        </div>
      </li>

      <div
        className="modal order-details-modal"
        id={`order-${item?.bookingid}`} 
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
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="order-details-box">
                <div className="order-icon">
                  <img
                    className="img-fluid icon"
                    src={`https://partnermeatwala.com/documents/${item?.restlogo}`}
                    alt="brand3"
                  />
                </div>
                <div className="order-content">
                  <h5 className="brand-name dark-text fw-medium">{ item?.restname}</h5>
                  <h6 className="order-deliver-label">{bookingStatus === "Canceled" ? "cancelled" : item?.bookingstatus}</h6>
                </div>
              </div>
              <div className="delivery-address">
                <div className="d-flex align-items-center gap-2 mt-2">
                  <i className="ri-map-pin-fill theme-color" />
                  <p>{item?.address}</p>
                </div>
              </div>
              <div className="delivery-on-going">
                <ul className="delivery-list">
                  <li>
                    <h6>Order Id</h6>
                    <h5>{item?.bookingid}</h5>
                  </li>
                  <li>
                    <h6>Date &amp; Time</h6>
                    <h5>{item?.bookingdate}</h5>
                  </li>
                  <li>
                    <h6>Discounts</h6>
                    <h5>{item?.discountpercentage}%</h5>
                  </li>
                </ul>
                <ul className="delivery-list">
                  <li>
                    <div className="order-address">
                      <img
                        className="img-fluid place-icon"
                        src="assets/images/svg/placed.svg"
                        alt="restaurant"
                      />
                      <h5>Restaurant Address</h5>
                    </div>
                    <h6 className="delivery-place">{item?.address}</h6>
                  </li>
                  <li>
                    <div className="order-address">
                      <img
                        className="img-fluid place-icon"
                        src="assets/images/svg/user-map.svg"
                        alt="delivery"
                      />
                      <h5>Order Type</h5>
                    </div>
                    <h6 className="delivery-place">{item?.type}</h6>
                  </li>
                </ul>
              </div>
              {/* <ul className="order-list">
                {item?.orderfood?.map((data) => (
                  <li key={data?.foodid}>
                    <div className="order-content-box">
                      <div className="d-flex align-items-center justify-content-between">
                        <h6>{data?.foodname}</h6>
                        <h6>£30</h6>
                      </div>
                      <div>
                        <p>Qty:2</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="total-amount">

                <div className="grand-amount d-flex align-items-center justify-content-between">
                  <h6 className="fw-medium dark-text">Grand Total</h6>
                  <h6 className="fw-medium dark-text">
  £{Number(item?.netpayamount).toFixed(2)}
</h6>

                </div>
              </div> */}
            </div>
            {/* <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleCancelOrder}
                disabled={isCancelling}
              >
              
              
                {isCancelling ? "Cancelling..." : "Cancel Order"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div> */}
          </div>
        </div>
      </div>

      <div
  className="modal order-details-modal"
  id={`order1-${item?.bookingid}`}
  aria-hidden="true"
  aria-labelledby="exampleModalToggleLabel"
  tabIndex={-1}
>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title fw-medium" id="exampleModalToggleLabel">
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
        <div className="total-amount">
          {/* Existing order summary */}
        </div>

        {/* Cancel Order Section */}
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
                style={{borderRadius:"100px"}}
             
                  className="btn btn-danger mt-2"
                  onClick={handleCancelOrder}
                  disabled={isCancelling}  
                >
                  {isCancelling ? "Canceling..." : "Cancel Order"}  {/* Show appropriate text */}
                </button>
        </div>
      </div>
    </div>
  </div>
</div>
    </>
  );
};

export default HistoryCard;
