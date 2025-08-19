import React, { useEffect, useState } from "react";


const HistoryCard = ({ item }) => {
 
  return (
    <>
 <li key={item.restid}>
          <div className="order-box">
            <div className="order-box-content">
              <div className="brand-icon">
                <img
                  className="img-fluid icon"
                  src={`https://partnermeatwala.com/documents/${item.bannerimage}`}
                  alt="restaurant"
                />
              </div>
              <div className="order-details">
                <div className="d-flex align-items-center justify-content-between w-100">
                  <h5 className="brand-name dark-text fw-medium">{item.restname}</h5>
                  <h6 className="fw-medium dark-text">
                  <span className="fw-normal content-color">Points:</span> {parseFloat(item.loyaltipoint).toFixed(2)}
                  </h6>      
                          </div>
               
              </div>
            </div>
          </div>

          <div
            className="modal order-details-modal"
            id={`order-${item.restid}`}
            aria-hidden="true"
            aria-labelledby="exampleModalToggleLabel"
            tabIndex={-1}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title fw-medium" id="exampleModalToggleLabel">
                    Loyalty Points Details
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
                        src={`https://partnermeatwala.com/documents/${item.bannerimage}`}
                        alt="restaurant"
                      />
                    </div>
                    <div className="order-content">
                      <h5 className="brand-name dark-text fw-medium">{item.restname}</h5>
                      <h6 className="order-deliver-label">Loyalty Points</h6>
                    </div>
                  </div>
                  <div className="loyalty-points">
                    <h6>Loyalty Points: {item.loyaltipoint}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
    </>
  );
};

export default HistoryCard;
