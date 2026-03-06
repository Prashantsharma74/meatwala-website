import React from 'react';

const HistoryPopup = ({ onClose, item }) => {
    return (
        <div
        className="modal order-details-modal show d-block"
        id="order"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex={-1}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title fw-medium"
                id="exampleModalToggleLabel"
              >
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
                    <h5>
                      {item?.orderdate}
                    </h5>
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
                      <h5>Store Address</h5>
                    </div>
                    <h6 className="delivery-place">{item?.restaddress}</h6>
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
                    <h6 className="delivery-place">{item?.ordertype}</h6>
                  </li>
                </ul>
              </div>
              <ul className="order-list">
                {
                    item?.orderfood?.map((data) => (
                        <li key={data?.foodid}>
                        <div className="order-content-box">
                          <div className="d-flex align-items-center justify-content-between">
                            <h6>{data?.foodname}</h6>
                            {/* <h6>$30</h6> */}
                          </div>
                          <div>
                            {/* <p>Qty:2</p> */}
                          </div>
                        </div>
                      </li> 
                    ))
                }
                {/* <li>
                  <div className="order-content-box">
                    <div className="d-flex align-items-center justify-content-between">
                      <h6>Mexican Pizza</h6>
                      <h6>$30</h6>
                    </div>
                    <div>
                      <p>Qty:2</p>
                    </div>
                  </div>
                </li> */}
              </ul>
              <div className="total-amount">
                {/* <div className="d-flex align-items-center justify-content-between">
                  <h6 className="fw-medium dark-text">Total</h6>
                  <h6 className="fw-medium dark-text">$50</h6>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <p className="fw-normal content-color">Delivery Charge</p>
                  <p className="fw-normal content-color">Free</p>
                </div> */}
                <div className="grand-amount d-flex align-items-center justify-content-between">
                  <h6 className="fw-medium dark-text">Grand Total</h6>
                  <h6 className="fw-medium dark-text">£{item?.netpayamount}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default HistoryPopup;
