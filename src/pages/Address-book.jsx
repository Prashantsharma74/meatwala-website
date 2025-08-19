import React, { useEffect, useState } from "react";
import { getCustaddress, deltAddress } from "../utils/api";
import Navbar from "../components/Navbar";
import Profileshow from "../components/Profileshow";
import Footer from "../components/Footer";
import FooterMobileMenu from "../components/FooterMobileMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "bootstrap";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Delivery from "../components/delivery";
import { addcustinfo } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
const Address = () => {
  const Navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [address, setAddress] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const callData = async () => {
    try {
      const data = {
        custid: storedUser?.userid,
      };
      const res = await getCustaddress(data);
      setAddress(res?.useraddress || []); // Default to empty array if undefined
    } catch (error) {
      console.error("Error fetching addresses", error);
      setAddress([]); // Default to empty array on error
    }
  };

  useEffect(() => {
    callData();
  }, []);

  const deleteData = async (id) => {
    try {
      const data = { pkid: id };
      const del = await deltAddress(data);
    } catch (error) {
      console.error("Error deleting address", error);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    const deleteModal = new Modal(document.getElementById("deleteModal"));
    deleteModal.show();
  };

  const handleDeleteConfirm = async () => {
    if (deleteId !== null) {
      await deleteData(deleteId);
      setAddress((prevAddress) =>
        prevAddress.filter((item) => item.pkid !== deleteId)
      );
      setDeleteId(null);
    }
    const deleteModal = Modal.getInstance(
      document.getElementById("deleteModal")
    );
    if (deleteModal) deleteModal.hide();
  };

  const handleDeleteCancel = () => {
    setDeleteId(null);
    const deleteModal = Modal.getInstance(
      document.getElementById("deleteModal")
    );
    if (deleteModal) deleteModal.hide();
  };

  const [addres, setAddres] = useState(""); // Added address state
  const [title, setTitle] = useState(""); // Added title state
  const addressAdd = async (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("userAddress"));

    const data = {
      userid: storedUser?.userid,
      title: title,
      address: addres,
      lat: storedUser?.lat,
      lng: storedUser?.lng,
    };
    const add = await addcustinfo(data);
    setTitle("");
    setAddres("");
    if (add.status === "1") {
      Navigate("/address");
    }
  };

  return (
    <>
      <Navbar />
      <section className="section-t-space mytabb overflow-hidden pt-120">
        <Delivery />
      </section>
      <section className="page-head-section">
        <div className="container page-heading">
          <h2 className="h3 mb-3 text-white text-center">Address Book</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb flex-lg-nowrap justify-content-center justify-content-lg-star">
              <li className="breadcrumb-item">
                <Link href="index.html">
                  <i className="ri-home-line" />
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Address Book
              </li>
            </ol>
          </nav>
        </div>
      </section>
      <section className="profile-section section-b-space">
        <div className="container">
          <div className="row g-3">
            <div className="col-lg-3">
              <Profileshow selected={"Address"} />
            </div>
            <div className="col-lg-9">
              <div className="address-section bg-color h-100 mt-0">
                <div
                  className="title d-flex"
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="loader-line" />
                  <h3>Saved Address</h3>
                  <button className="btn hover-effect theme-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#location"
                  >Add New Address</button>
                </div>
                <div className="row g-3">
                  {address
                    ?.filter((item) => item.address.trim() !== "") // Filter out empty addresses
                    .map((item) => (
                      <div className="col-md-6" key={item.pkid}>
                        <div className="address-box white-bg">
                          <div className="address-title d-flex">
                            <div className="d-flex align-items-center gap-2">
                              <i className="ri-home-4-fill icon" />
                              <i className="ri-account-circle-fill icon" />
                              <h6>{item?.title || "Untitled Address"}</h6>{" "}
                              {/* Handle empty title */}
                            </div>
                            <FontAwesomeIcon
                              icon={faTrash}
                              onClick={() => handleDeleteClick(item.pkid)}
                              style={{
                                color: "red",
                                cursor: "pointer",
                                fontSize: "20px",
                              }}
                              title="Delete Address"
                            />
                          </div>
                          <div className="address-details">
                            <h6>{item?.address}</h6>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div
                  className="modal fade"
                  id="deleteModal"
                  tabIndex="-1"
                  aria-labelledby="deleteModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="deleteModalLabel">
                          Confirm Deletion
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        Are you sure you want to delete this address?
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={handleDeleteConfirm}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={handleDeleteCancel}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <FooterMobileMenu />
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
              <Link href="" className="current-location">
                <div className="current-address">
                  <i className="ri-focus-3-line focus" />
                  <div>
                    <h5>Use current-location</h5>
                    <h6>Wellington St., Ottawa, Ontario, Canada</h6>
                  </div>
                </div>
                <i className="ri-arrow-right-s-line arrow" />
              </Link>
              <h5 className="mt-sm-3 mt-2 fw-medium recent-title dark-text">
                Recent Location
              </h5>
              <Link href="" className="recent-location">
                <div className="recant-address">
                  <i className="ri-map-pin-line theme-color" />
                  <div>
                    <h5>Bayshore</h5>
                    <h6>kingston St., Ottawa, Ontario, Canada</h6>
                  </div>
                </div>
              </Link>
            </div>
            <div className="modal-footer">
              <Link href="#" className="btn gray-btn" data-bs-dismiss="modal">
                Close
              </Link>
              <Link
                href="#"
                className="btn theme-btn mt-0"
                data-bs-dismiss="modal"
              >
                Save
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* location offcanvas end */}
      {/* add-card modal starts */}
      <div
        className="modal address-details-modal fade"
        id="address-details"
        tabIndex={-1}
        aria-labelledby="addModalAdress"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addModalAdress">
                Address Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="inputFirstname" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputFirstname"
                    placeholder="Enter your fist name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="inputAddress" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder="Enter your address"
                    value={addres}
                    onChange={(e) => setAddres(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <Link
                href="javascript:void();"
                className="btn gray-btn mt-0"
                data-bs-dismiss="modal"
              >
                CANCEL
              </Link>
              <button
                type="submit"
                className="btn theme-btn mt-0"
                onClick={addressAdd}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* add-card modal end */}
      {/* edit address modal starts */}
      <div
        className="modal address-details-modal fade"
        id="edit-address"
        tabIndex={-1}
        aria-labelledby="exampleModalAdress"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalAdress">
                Address Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="editFirstname" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editFirstname"
                    defaultValue="Smith"
                    placeholder="Enter your fist name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="editAddress" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editAddress"
                    defaultValue="93, Songbird Cir, Blackville,"
                    placeholder="Enter your address"
                    value={addres}
                    onChange={(e) => setAddres(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <Link
                href="javascript:void();"
                className="btn gray-btn mt-0"
                data-bs-dismiss="modal"
              >
                CANCEL
              </Link>
              <Link to={"/address"}>
                <button
                  type="submit"
                  className="btn theme-btn mt-0"
                  onClick={addressAdd}
                >
                  SUBMIT
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* edit address modal end */}
      {/* tap to top start */}
      <button className="scroll scroll-to-top">
        <i className="ri-arrow-up-s-line arrow" />
      </button>
      {/* tap to top end */}
      {/* responsive space */}
      {/* <div className="responsive-space" /> */}
      {/* responsive space */}
    </>
  );
};

export default Address;
