import axios from "axios";
import React, { useState, useEffect, useRef, useCallback } from "react";
import debounce from "lodash/debounce";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addcustinfo, getCustaddress, loginApi } from "../utils/api";
import { setPincode } from "../store/feature/pincodeSlice";
import { useSelector } from "react-redux";
import DeliveryB from "../assets/deliveryboy.png";
import logo from "../assets/meat_logo1.png";
import { Modal } from "bootstrap";
import { IoIosArrowBack } from "react-icons/io";

import {
  CButton,
  COffcanvas,
  COffcanvasHeader,
  COffcanvasTitle,
  COffcanvasBody,
  CCloseButton,
} from "@coreui/react";
import { setCookie, getCookie, deleteCookie } from "./Cookie";
import { useDispatch } from "react-redux";
import { updateKeyValue, setActiveTab } from "../store/feature/userSlice";
import { toast } from "react-toastify";
import MobileViewAppDownload from "./MobileViewAppDownload";

const MAP_KEY = "AIzaSyA90kZbFA-_GeeQ67T7kTb7VQRSt_LoOXc";

const Navbar = ({ isStatic, text }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const extractNumberFromAddress = (address) => {
    if (!address) return null;

    const numberMatch = address.match(/^\d+/);
    return numberMatch ? numberMatch[0] : null;
  };

  const removeNumberFromAddress = (address) => {
    if (!address) return address;
    return address.replace(/^\d+\s*/, "").trim();
  };

  const extractCleanPostcode = (value) => {
    if (!value) return "";

    if (
      typeof value === "string" &&
      !value.includes("{") &&
      !value.includes('"')
    ) {
      return value;
    }

    let current = value;
    let attempts = 0;
    const maxAttempts = 5;

    while (attempts < maxAttempts) {
      try {
        if (
          typeof current === "string" &&
          (current.includes("{") || current.includes('"'))
        ) {
          current = JSON.parse(current);
        } else if (typeof current === "object" && current !== null) {
          current =
            current.LONGNAME ||
            current.longName ||
            current.SHORTNAME ||
            current.shortName ||
            current;
        } else {
          break;
        }
        attempts++;
      } catch (e) {
        console.warn("Failed to parse nested JSON:", e);
        break;
      }
    }

    return typeof current === "string" ? current : "";
  };

  const storePincodeAsCleanJSON = (postcodeString) => {
    const cleanPostcode = extractCleanPostcode(postcodeString);

    const pincodeObject = {
      longName: cleanPostcode,
      shortName: cleanPostcode,
      types: ["postal_code"],
    };

    localStorage.removeItem("pincode");
    setCookie("pincode", "");

    localStorage.setItem("pincode", JSON.stringify(pincodeObject));
    setCookie("pincode", JSON.stringify(pincodeObject));

    return cleanPostcode;
  };

  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [storedAddress, setStoredAddress] = useState({});
  const [isDesktop, setIsDesktop] = useState(window.innerWidth <= 768);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const modal = document.getElementById("address-details");

    const handleShow = () => {
      setIsModalOpen(true);
      document.body.style.backgroundColor = "black";
    };

    const handleHide = () => {
      setIsModalOpen(false);
      document.body.style.backgroundColor = "";
    };

    modal.addEventListener("show.bs.modal", handleShow);
    modal.addEventListener("hide.bs.modal", handleHide);

    return () => {
      modal.removeEventListener("show.bs.modal", handleShow);
      modal.removeEventListener("hide.bs.modal", handleHide);
    };
  }, []);

  const handlebtnclose2 = () => {
    const modalElement = document.getElementById("address-details");
    const modal = Modal.getInstance(modalElement);

    if (modal) {
      modal.hide();
    } else {
      // Fallback method
      modalElement.classList.remove("show");
      modalElement.style.display = "none";
      document.body.classList.remove("modal-open");
      document.body.style.backgroundColor = "";

      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) {
        backdrop.remove();
      }
    }

    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeTab = useSelector((state) => state.User.activeTab);

  const handleTabClick = (tab) => {
    dispatch(setActiveTab(tab));
  };

  const [show, setShow] = useState(false);

  const [suggestions, setSuggestions] = useState([]);
  const [visible, setVisible] = useState(false);
  const [locationPop, setLocationPop] = useState(false);
  const inputRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [selectSuggestion, setSelectSuggestion] = useState(null);

  const fetchSuggestions = async (query) => {
    if (query.length > 0) {
      try {
        const response = await axios.get(
          `https://partnermeatwala.com/api/customer/geocode?place=${query}`,
        );
        const data = response.data;

        if (data.results && data.results.length > 0) {
          const formattedSuggestions = data.results.map((result) => ({
            place_id: result.placeId,
            description: result.formattedAddress,
            secondaryText: result.formattedAddress,
            location: result.geometry.location,
            addressComponents: result.addressComponents,
          }));
          setSuggestions(formattedSuggestions);
          setLocationPop(true);
        }
      } catch (error) {
        console.error("Error fetching location suggestions:", error);
      }
    } else {
      setSuggestions([]);
      setLocationPop(false);
    }
  };

  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 300),
    [],
  );

  const handleInputChange = (event) => {
    const query = event.target.value;
    debouncedFetchSuggestions(query);
  };

  const handleSuggestionClick = (suggestion) => {
    setSelectedSuggestion(suggestion.description);
    inputRef.current.value = suggestion.description;
    setSuggestions([]);
    setLocationPop(false);
    setLocation(suggestion.location);

    const postalCodeComponent = suggestion.addressComponents.find((component) =>
      component.types.includes("postal_code"),
    );

    if (postalCodeComponent) {
      const postalCode = postalCodeComponent.longName.slice(0, 4).toUpperCase();
      const cleanPostcode = storePincodeAsCleanJSON(postalCode);
      setInputPincode(cleanPostcode);
    }

    const addressNumber = extractNumberFromAddress(suggestion.description);
    if (addressNumber) {
      setTitle(addressNumber);
      handleAutoSubmit(suggestion, addressNumber);
    } else {
      const locationModalElement = document.getElementById("location");
      if (locationModalElement) {
        locationModalElement.classList.remove("show");
        locationModalElement.style.display = "none";
        document.body.classList.remove("modal-open");

        const backdrop = document.querySelector(".modal-backdrop");
        if (backdrop) {
          backdrop.classList.remove("show");
          backdrop.remove();
        }
      }

      const addressDetailsModalElement =
        document.getElementById("address-details");
      if (addressDetailsModalElement) {
        addressDetailsModalElement.classList.add("show");
        addressDetailsModalElement.style.display = "block";
        document.body.classList.add("modal-open");
      }
    }
  };

  const handleAutoSubmit = async (suggestion, roomNumber) => {
    console.log("123456789");
    const storedUser = JSON.parse(localStorage.getItem("user")) || "";

    const lat = suggestion.location?.lat || "";
    const lng = suggestion.location?.lng || "";

    const addressWithoutNumber = removeNumberFromAddress(
      suggestion.description,
    );

    const postalCodeComponent = suggestion.addressComponents.find((component) =>
      component.types.includes("postal_code"),
    );
    const cleanPostcode = postalCodeComponent
      ? postalCodeComponent.longName.slice(0, 4).toUpperCase()
      : "";

    const data = {
      userid: storedUser?.userid,
      title: roomNumber,
      address: addressWithoutNumber,
      lat: lat.toString(),
      lng: lng.toString(),
      postcode: cleanPostcode,
    };

    try {
      const add = await addcustinfo(data);
      if (add.status) {
        localStorage.setItem("userAddress", JSON.stringify(data));
        setCookie("userAddress", JSON.stringify(data));
        localStorage.setItem("manualAddressSelection", "true");

        dispatch(updateKeyValue({ key: "userAddress", value: data }));
        setStoredAddress(data);
        window.dispatchEvent(new Event("localStorageUpdate"));

        storePincodeAsCleanJSON(cleanPostcode);
        dispatch(setPincode(cleanPostcode));

        setTitle("");
        callData();
        // Refresh the page instead of just navigating
        // Navigate("/shop");
        // window.location.reload();
        Navigate("/shop");
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to save address. Please try again.");
    }
  };

  const handlebtnclose = () => {
    const addressDetailsModalElement =
      document.getElementById("address-details");
    if (addressDetailsModalElement) {
      addressDetailsModalElement.classList.remove("show");
      addressDetailsModalElement.style.display = "none";

      const backdrop = document.querySelector(".modal-backdrop.fade.show");
      if (backdrop) {
        backdrop.remove();
      }

      document.body.classList.remove("modal-open");
    } else {
      console.error("Address details modal not found.");
    }
  };

  const handlelocation = async (suggestion) => {
    const response = await axios.get(
      `https://partnermeatwala.com/api/customer/geocode?place=${suggestion.secondaryText}`,
    );

    if (response?.data?.results[0]?.geometry?.location) {
      const locationData = response.data.results[0].geometry.location;
      setLocation(locationData);
    }

    const addressComponents = response.data.results[0].addressComponents;
    const postalCodeComponent = addressComponents.find((component) =>
      component.types.includes("postal_code"),
    );

    if (postalCodeComponent) {
      const postalCode = postalCodeComponent.longName.slice(0, 4).toUpperCase();

      const cleanPostcode = storePincodeAsCleanJSON(postalCode);
      setInputPincode(cleanPostcode);
    }
  };

  useEffect(() => {
    const updateStoredAddress = () => {
      const address = localStorage.getItem("userAddress");
      const parsedAddress = address ? JSON.parse(address) : {};
      setStoredAddress(parsedAddress);
    };

    updateStoredAddress();
    window.addEventListener("storage", updateStoredAddress);
    window.addEventListener("localStorageUpdate", updateStoredAddress);

    return () => {
      window.removeEventListener("storage", updateStoredAddress);
      window.removeEventListener("localStorageUpdate", updateStoredAddress);
    };
  }, []);

  const [address, setAddress] = useState([]);
  const Navigate = useNavigate();
  const [title, setTitle] = useState("");
  const pincode = useSelector((state) => state.pincode);
  const [inputPincode, setInputPincode] = useState("");
  const [remove, setRemove] = useState("");

  useEffect(() => {
    const savedPincode = localStorage.getItem("pincode") || "";

    if (savedPincode) {
      const cleanPostcode = extractCleanPostcode(savedPincode);

      if (cleanPostcode) {
        storePincodeAsCleanJSON(cleanPostcode);
        setRemove(cleanPostcode);
        setInputPincode(cleanPostcode);
        dispatch(setPincode(cleanPostcode));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (inputPincode) {
      const currentStored = localStorage.getItem("pincode");
      const cleanPostcode = extractCleanPostcode(inputPincode);

      if (
        cleanPostcode &&
        cleanPostcode !== extractCleanPostcode(currentStored)
      ) {
        storePincodeAsCleanJSON(cleanPostcode);
      }
    }
  }, [inputPincode]);

  const addressAdd = async (e) => {
    if (e) e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user")) || "";

    const lat = location?.lat || location?.latitude || "";
    const lng = location?.lng || location?.longitude || "";

    // Use the clean postcode string for API
    const cleanPostcode = extractCleanPostcode(inputPincode);

    const data = {
      userid: storedUser?.userid,
      title: title,
      address: selectedSuggestion, // Keep full address for manual entries
      lat: lat.toString(),
      lng: lng.toString(),
      postcode: cleanPostcode,
    };

    try {
      const add = await addcustinfo(data);
      if (add.status) {
        localStorage.setItem("userAddress", JSON.stringify(data));
        setCookie("userAddress", JSON.stringify(data));
        localStorage.setItem("manualAddressSelection", "true");

        dispatch(updateKeyValue({ key: "userAddress", value: data }));
        setStoredAddress(data);
        window.dispatchEvent(new Event("localStorageUpdate"));

        // Ensure pincode is stored as clean JSON
        storePincodeAsCleanJSON(cleanPostcode);
        dispatch(setPincode(cleanPostcode));

        setTitle("");
        callData();

        // Close modal and navigate
        handlebtnclose2();
        // Navigate("/shop");
        // Refresh the page instead of just navigating
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const callData = async (visibleCount = 3) => {
    try {
      if (storedUser) {
        const data = {
          custid: storedUser?.userid,
        };
        const res = await getCustaddress(data);
        const addresses = res?.useraddress || [];
        setAddress(addresses.slice(0, visibleCount));

        const currentStoredAddress = localStorage.getItem("userAddress");
        const hasManualSelection = localStorage.getItem(
          "manualAddressSelection",
        );

        if (
          !hasManualSelection &&
          addresses.length > 0 &&
          !currentStoredAddress
        ) {
          const lastAddress = addresses[addresses.length - 1];
          localStorage.setItem("userAddress", JSON.stringify(lastAddress));
          setCookie("userAddress", JSON.stringify(lastAddress));
          dispatch(updateKeyValue({ key: "userAddress", value: lastAddress }));

          setStoredAddress(lastAddress);
          window.dispatchEvent(new Event("localStorageUpdate"));
        } else if (!storedUser && !currentStoredAddress) {
          const lat = location?.lat?.toString();
          const lng = location?.lng?.toString();
          const data = {
            title: title,
            address: selectedSuggestion,
            lat: lat,
            lng: lng,
          };
          localStorage.setItem("userAddress", JSON.stringify(data));
          setCookie("userAddress", JSON.stringify(data));
          setStoredAddress(data);
          window.dispatchEvent(new Event("localStorageUpdate"));
        }
      }
    } catch (error) {
      console.error("Error fetching addresses", error);
    }
  };

  const [visibleCount, setVisibleCount] = useState(3);
  const [allAddressesLoaded, setAllAddressesLoaded] = useState(false);

  const showMoreAddresses = () => {
    setVisibleCount((prevCount) => {
      const newCount = prevCount + 3;
      if (newCount >= address.length) {
        setAllAddressesLoaded(true);
      }
      return newCount;
    });
  };

  const showLessAddresses = () => {
    setVisibleCount(3);
    setAllAddressesLoaded(false);
  };

  useEffect(() => {
    callData(visibleCount);
  }, [visibleCount]);

  const getWordsWithinLimit = (text, charLimit) => {
    if (!text) return "";

    let words = text.split(" ");
    let result = [];
    let currentLength = 0;

    for (let word of words) {
      if (currentLength + word.length + result.length > charLimit) break;
      result.push(word);
      currentLength += word.length;
    }

    return result.join(" ");
  };

  const saveAddressToLocalStorage = (address) => {
    const updatedAddress = {
      ...address,
      postcode: address?.postcode || "",
    };

    localStorage.setItem("userAddress", JSON.stringify(updatedAddress));
    setCookie("userAddress", JSON.stringify(updatedAddress));
    localStorage.setItem("manualAddressSelection", "true");

    dispatch(updateKeyValue({ key: "userAddress", value: updatedAddress }));
    setStoredAddress(updatedAddress);
    window.dispatchEvent(new Event("localStorageUpdate"));

    if (address?.postcode) {
      const cleanPostcode = extractCleanPostcode(
        address.postcode,
      ).toUpperCase();
      storePincodeAsCleanJSON(cleanPostcode);
      setInputPincode(cleanPostcode);
    }

    callData();
    window.location.reload();
  };

  // Modified handleLocationClick to also check for numbers
  const handleLocationClick = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(position.coords);

        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBePruYxWbLAsOVswTaH0OHPyvx-mMcc`,
          );

          const address = response?.data?.results[0]?.formatted_address;

          setSelectedSuggestion(address);
          inputRef.current.value = address;
          setSuggestions([]);
          setLocationPop(false);

          // Check if address starts with number
          const addressNumber = extractNumberFromAddress(address);
          if (addressNumber) {
            // Auto-submit with extracted number
            const suggestion = {
              description: address,
              location: { lat: latitude, lng: longitude },
              addressComponents:
                response?.data?.results[0]?.address_components || [],
            };
            setTitle(addressNumber);
            await handleAutoSubmit(suggestion, addressNumber);
          } else {
            // Show modal for manual input
            const addressDetailsModalElement =
              document.getElementById("address-details");
            if (addressDetailsModalElement) {
              addressDetailsModalElement.classList.add("show");
              addressDetailsModalElement.style.display = "block";
              document.body.classList.add("modal-open");
            }
          }

          for (const result of response?.data?.results || []) {
            const addressComponents = result.address_components || [];
            const postalCodeComponent = addressComponents.find((component) =>
              component.types.includes("postal_code"),
            );

            if (postalCodeComponent) {
              const postalCode = postalCodeComponent.long_name
                .slice(0, 4)
                .toUpperCase();
              const cleanPostcode = storePincodeAsCleanJSON(postalCode);
              setInputPincode(cleanPostcode);
              break;
            }
          }
        } catch (error) {
          console.error("Error fetching address or saving pincode:", error);
        }
      });
    }
  };

  const [hasBoxShadow, setHasBoxShadow] = useState(true);
  const removePincode = (e) => {
    e.preventDefault();
    setRemove("");
    localStorage.removeItem("pincode");
    setHasBoxShadow(false);
  };

  const { success } = useSelector((state) => state.User);
  const [showLocationModal, setShowLocationModal] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      setShowLocationModal(true);
      localStorage.setItem("hasVisited", "true");
    }

    if (success) {
    }
  }, [success]);

  useEffect(() => {
    if (showLocationModal) {
      const modalElement = document.getElementById("location");
      if (modalElement) {
        const modal = new Modal(modalElement);
        modal.show();
      } else {
        console.error("Modal element not found.");
      }
    }
  }, [showLocationModal]);

  return (
    <>
      <header
        style={{
          position: isStatic ? "static" : "fixed",
          width: "100%",
          zIndex: 1030,
        }}
      >
        <div className="container-fluid px-2">
          <nav
            className="navbar navbar-expand-lg p-0"
            style={{ overflowX: "auto" }}
          >
            <IoIosArrowBack
              style={{
                fontSize: "24px",
                marginRight: "10px",
                cursor: "pointer",
              }}
              onClick={() => Navigate(-1)}
            />
            <Link to={"/"}>
              <img
                className="img-fluid logo"
                src={`${logo}`}
                alt="logo"
                style={{ width: "185px", height: "50px" }}
              />
            </Link>
            <Link
              target="_blank"
              href=""
              data-bs-toggle="modal"
              data-bs-target="#location"
              className="btn btn-sm theme-btn location-btn mt-0 ms-3 d-flex align-content-center gap-1"
              style={{ background: "#e8413561", color: "#000" }}
            >
              <i
                className="ri-map-pin-line"
                style={{ color: "rgb(232, 65, 53);" }}
              />
            </Link>
            <CButton
              className="navbar-toggler ml-auto d-lg-none"
              data-bs-target="#offcanvasNavbar"
              onClick={() => setVisible(true)}
            // style={{height:"35px"}}
            >
              <span className="navbar-toggler-icon ">
                <i className="ri-menu-line" />
              </span>
            </CButton>
            {(text == "res" || text == "search" || text == "cart") && (
              <div className="nav-option order-md-2">
                <div className="tab">
                  <div className="d-flex text-center">
                    <Link
                      className={`tablinks ${activeTab === "Delivery" ? "active" : ""
                        }`}
                      style={{ width: "auto", padding: "7px 20px" }}
                      onClick={() => handleTabClick("Delivery")}
                    >
                      <p className="f-12">
                        <img
                          src={DeliveryB || "/placeholder.svg"}
                          style={{ width: "15px" }}
                        />{" "}
                        Delivery
                      </p>{" "}
                      <p className="smtext">55-90 Min</p>
                    </Link>
                    <Link
                      className={`tablinks ${activeTab === "Collection" ? "active" : ""
                        }`}
                      style={{ width: "auto", padding: "7px 20px" }}
                      onClick={() => handleTabClick("Collection")}
                    >
                      <p className="f-12">
                        <i className="fa fa-shopping-bag" aria-hidden="true" />{" "}
                        Collection
                      </p>{" "}
                      <p className="smtext">15 - 25 Min</p>
                    </Link>
                  </div>
                </div>
              </div>
            )}
            <COffcanvas
              placement="end"
              visible={visible}
              onHide={() => setVisible(false)}
            >
              <COffcanvasHeader>
                <COffcanvasTitle>Menu</COffcanvasTitle>
                <CCloseButton
                  className="text-reset"
                  onClick={() => setVisible(false)}
                />
              </COffcanvasHeader>
              <COffcanvasBody>
                <ul className="navbar-nav justify-content-center flex-grow-1">
                  <li className="nav-item">
                    <Link
                      to={"/shop"}
                      className="nav-link"
                      style={{ fontWeight: "600px" }}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={"/recipes"}
                      className="nav-link"
                      style={{ fontWeight: "600px" }}
                    >
                      Recipes
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={"/offers"}
                      className="nav-link"
                      style={{ fontWeight: "600px" }}
                    >
                      Offers
                    </Link>
                  </li>
                </ul>
              </COffcanvasBody>
            </COffcanvas>
          </nav>
        </div>
      </header>
      {showLocationModal ? (
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
                <h6 className="mb-0">
                  <strong>Currentaddress : </strong>
                  {storedAddress?.address}
                </h6>
                <br></br>
                <div className="search-section">
                  <form className="form_search" role="form">
                    <div className="search-container">
                      <input
                        type="search"
                        placeholder="Enter your postcode"
                        className="search-input"
                        onChange={handleInputChange}
                        ref={inputRef}
                        onFocus={() => setLocationPop(true)}
                      />
                      {locationPop && suggestions.length > 0 && (
                        <ul className="suggestions-dropdown">
                          {suggestions.map((suggestion) => (
                            <li
                              className="recent-location"
                              key={suggestion.place_id}
                              onClick={() => {
                                handleSuggestionClick(suggestion);
                                handlelocation(suggestion);
                                setSelectSuggestion(suggestion);
                              }}
                            >
                              <div className="recant-address">
                                <i className="ri-map-pin-line theme-color" />
                                <div>
                                  <h5>{suggestion.description}</h5>
                                  <h6>{suggestion.secondaryText}</h6>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </form>
                </div>
                <Link href="" className="current-location">
                  <div className="current-address">
                    <i className="ri-focus-3-line focus" />
                    <div onClick={handleLocationClick}>
                      <h5 className="mt-1">Use current location</h5>
                    </div>
                  </div>
                  <i className="ri-arrow-right-s-line arrow" />
                </Link>
                <h5 className="mt-sm-3 mt-2 fw-medium recent-title dark-text">
                  Recent Location
                </h5>
                {address.map((address) => (
                  <Link
                    href="#"
                    className="recent-location"
                    key={address.pkid}
                    onClick={() => saveAddressToLocalStorage(address)}
                  >
                    <div className="recant-address">
                      <i className="ri-map-pin-line theme-color" />
                      <div data-bs-dismiss="modal" aria-label="Close">
                        <h5>{address?.title}</h5>
                        <h6>{address?.address}</h6>
                      </div>
                    </div>
                  </Link>
                ))}
                {!allAddressesLoaded ? (
                  <button
                    onClick={showMoreAddresses}
                    className="toggle-btn show-more-btn"
                  >
                    Show More
                  </button>
                ) : (
                  <button
                    onClick={showLessAddresses}
                    className="toggle-btn show-more-btn"
                  >
                    Show Less
                  </button>
                )}
              </div>
              <div className="modal-footer">
                <Link href="#" className="btn gray-btn" data-bs-dismiss="modal">
                  Close
                </Link>
                <Link
                  className="btn theme-btn mt-0"
                  data-bs-dismiss="modal"
                  onClick={addressAdd}
                >
                  Save
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="modal fade location-modal"
          id="location"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div
              className="modal-content"
              style={{ borderRadius: 20, overflow: "hidden", border: "none" }}
            >
              <div
                className="modal-header"
                style={{
                  background: "#E84135",
                  color: "#fff",
                  padding: "18px 22px",
                  borderBottom: "none",
                }}
              >
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="d-inline-flex align-items-center justify-content-center"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: "rgba(255,255,255,.15)",
                    }}
                  >
                    <i className="ri-map-pin-2-fill" style={{ fontSize: 22 }} />
                  </div>
                  <div>
                    <h5 className="m-0 fw-semibold">
                      Choose delivery location
                    </h5>
                    <div className="opacity-75" style={{ fontSize: 12 }}>
                      Search by postcode or pick a recent place
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>

              {/* Body */}
              <div className="modal-body" style={{ padding: 18 }}>
                {/* Current address card */}
                <div
                  className="d-flex align-items-start gap-2 p-3 rounded-4 mb-3"
                  style={{ background: "#f8f9fb", border: "1px solid #eef0f3" }}
                >
                  <i
                    className="ri-map-pin-fill"
                    style={{ color: "#E84135", fontSize: 18, marginTop: 2 }}
                  />
                  <div>
                    <div
                      className="text-muted"
                      style={{ fontSize: 12, letterSpacing: ".15px" }}
                    >
                      Current address
                    </div>
                    <div className="fw-medium" style={{ fontSize: 14 }}>
                      {storedAddress?.title ? `${storedAddress.title}, ` : ""}
                      {storedAddress?.address?.trim()
                        ? storedAddress.address
                        : "N/A"}
                    </div>
                  </div>
                </div>

                {/* Search row */}
                <form
                  className="form_search"
                  role="form"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="row g-2 align-items-center">
                    <div className="col-12 col-sm">
                      <div
                        className="d-flex align-items-center rounded-pill"
                        style={{
                          border: "1px solid #e5e7eb",
                          padding: "8px 12px",
                          background: "#fff",
                        }}
                      >
                        <i className="ri-search-line text-muted me-2" />
                        <input
                          type="search"
                          placeholder="Enter your postcode"
                          className="form-control border-0 p-0"
                          style={{ boxShadow: "none" }}
                          onChange={handleInputChange}
                          ref={inputRef}
                          onFocus={() => setLocationPop(true)}
                          aria-autocomplete="list"
                          aria-expanded={
                            locationPop && suggestions.length > 0
                              ? "true"
                              : "false"
                          }
                          aria-controls="location-suggestions"
                        />
                      </div>
                    </div>

                    {/* <div className="col-12 col-sm-auto">
                      <button
                        type="button"
                        onClick={handleLocationClick}
                        className="btn d-flex align-items-center gap-2 rounded-pill"
                        style={{
                          background: "#eef5ff",
                          color: "#E84135",
                          border: "1px solid #d9e6ff",
                          padding: "8px 14px",
                          width: "100%",
                        }}
                      >
                        <i className="ri-focus-3-line" />
                        Use current
                      </button>
                    </div> */}
                  </div>

                  {/* Suggestions dropdown */}
                  {locationPop && suggestions.length > 0 && (
                    <ul
                      id="location-suggestions"
                      role="listbox"
                      className="list-unstyled shadow-sm"
                      style={{
                        position: "relative",
                        zIndex: 2,
                        background: "#fff",
                        border: "1px solid rgba(0,0,0,.08)",
                        borderRadius: 14,
                        margin: "10px 2px 0",
                        maxHeight: 300,
                        overflowY: "auto",
                      }}
                    >
                      {suggestions.map((s, idx) => (
                        <li
                          key={s.place_id || idx}
                          role="option"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            handleSuggestionClick(s);
                            handlelocation(s);
                            setSelectSuggestion(s);
                            setLocationPop(false);
                          }}
                          className="d-flex align-items-start gap-2"
                          style={{
                            cursor: "pointer",
                            padding: "10px 12px",
                            borderBottom: "1px solid rgba(0,0,0,.05)",
                          }}
                        >
                          <i className="ri-map-pin-line theme-color" />
                          <div>
                            <div className="fw-medium" style={{ fontSize: 14 }}>
                              {s.description}
                            </div>
                            {s.secondaryText && (
                              <div
                                className="text-muted"
                                style={{ fontSize: 12 }}
                              >
                                {s.secondaryText}
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </form>

                {/* Recent locations grid */}
                <div className="d-flex align-items-center justify-content-between mt-3 mb-2">
                  <h6 className="fw-semibold m-0">Recent locationss</h6>
                  {!allAddressesLoaded ? (
                    <button
                      onClick={showMoreAddresses}
                      className="btn btn-link p-0"
                    >
                      Show more
                    </button>
                  ) : (
                    <button
                      onClick={showLessAddresses}
                      className="btn btn-link p-0"
                    >
                      Show less
                    </button>
                  )}
                </div>

                {address && address.length > 0 ? (
                  <div className="row g-2">
                    {address.map((addr) => (
                      <div className="col-12 col-sm-6" key={addr.pkid}>
                        <button
                          type="button"
                          onClick={() => saveAddressToLocalStorage(addr)}
                          className="w-100 text-start"
                          style={{
                            border: "1px solid #eef0f3",
                            background: "#fff",
                            borderRadius: 14,
                            padding: "10px 12px",
                          }}
                        >
                          <div className="d-flex align-items-start gap-2">
                            <i className="ri-map-pin-line theme-color" />
                            <div data-bs-dismiss="modal" aria-label="Close">
                              <div
                                className="fw-medium"
                                style={{ fontSize: 14, color: "black" }}
                              >
                                {addr.title}
                              </div>
                              <div
                                className="text-muted"
                                style={{ fontSize: 12 }}
                              >
                                {addr.address}
                              </div>
                            </div>
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    className="text-center text-muted"
                    style={{
                      fontSize: 14,
                      padding: "16px 0",
                      border: "1px dashed rgba(0,0,0,.12)",
                      borderRadius: 12,
                      marginTop: 6,
                    }}
                  >
                    No recent locations yet.
                  </div>
                )}
              </div>

              {/* Footer */}
              <div
                className="modal-footer"
                style={{ borderTop: "1px solid #eef0f3", padding: "12px 18px" }}
              >
                <button
                  type="button"
                  className="btn btn-outline-secondary p-2"
                  data-bs-dismiss="modal"
                  style={{ borderRadius: "100px", transition: "all 0.3s ease" }}
                >
                  Cancel
                </button>
                {/* <button type="button" className="btn theme-btn" data-bs-dismiss="modal" onClick={addressAdd}>
                  Save
                </button> */}
                <button
                  type="button"
                  className="btn theme-btn"
                  data-bs-dismiss="modal"
                  onClick={addressAdd}
                  style={{
                    transition: "all 0.3s ease",
                    padding: "10px 18px" //added by prashant 7470734508
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.filter = "brightness(85%)";
                    e.target.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.filter = "brightness(100%)";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className="modal address-details-modal fade"
        id="address-details"
        tabIndex={-1}
        aria-labelledby="addModalAdress"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal-content"
            style={{ borderRadius: 20, overflow: "hidden", border: "none" }}
          >
            {/* Modal Header */}
            <div
              className="modal-header"
              style={{
                background: "#E84135",
                color: "#fff",
                padding: "18px 22px",
                borderBottom: "none",
              }}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className="d-inline-flex align-items-center justify-content-center"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: "rgba(255,255,255,.15)",
                  }}
                >
                  <i className="ri-home-3-fill" style={{ fontSize: 22 }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h5 className="m-0 fw-semibold" style={{ fontSize: "16px" }}>
                    Help us find you
                  </h5>
                  <div className="opacity-75" style={{ fontSize: 12 }}>
                    Enter your building details for accurate delivery
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="btn-close btn-close-white"
                style={{ color: "black" }}
                onClick={handlebtnclose2}
                aria-label="Close"
              />
            </div>

            {/* Modal Body */}
            <div className="modal-body" style={{ padding: 18 }}>
              {/* Selected Address Display Card */}
              <div
                className="mb-4 p-3 rounded-3"
                style={{
                  background: "#f8f9fa",
                  border: "1px solid #e9ecef",
                  fontSize: "14px",
                }}
              >
                <div className="d-flex align-items-start gap-2">
                  <i
                    className="ri-map-pin-line text-muted mt-1"
                    style={{ fontSize: 16 }}
                  />
                  <div>
                    <div
                      className="fw-medium text-muted mb-1"
                      style={{ fontSize: "12px" }}
                    >
                      Selected Address:
                    </div>
                    <div
                      className="text-dark"
                      style={{ fontSize: "13px", lineHeight: "1.4" }}
                    >
                      {selectedSuggestion ||
                        storedAddress?.address ||
                        "No address selected"}
                    </div>
                  </div>
                </div>
              </div>

              <form className="row">
                <div className="col-12">
                  {/* <label
                    htmlFor="inputFirstname"
                    className="form-label fw-medium"
                    style={{
                      fontSize: '14px',
                      color: '#333',
                      marginBottom: '8px'
                    }}
                  >
                    Building Number or Name
                  </label> */}
                  <div
                    className="d-flex align-items-center rounded-3"
                    style={{
                      border: "1px solid #e5e7eb",
                      padding: "8px 12px",
                      background: "#fff",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <i className="ri-building-2-line text-muted me-2" />
                    <input
                      type="text"
                      className="form-control border-0 p-0"
                      id="inputFirstname"
                      placeholder="Enter building number or name"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      style={{
                        boxShadow: "none",
                        fontSize: "14px",
                        background: "transparent",
                      }}
                    />
                  </div>
                  {/* <div className="text-muted mt-2" style={{ fontSize: 12 }}>
                    This helps our delivery partner locate your exact address
                  </div> */}
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div
              className="modal-footer"
              style={{
                borderTop: "1px solid #eef0f3",
                padding: "12px 18px",
              }}
            >
              <button
                type="button"
                className="btn theme-btn"
                disabled={!title.trim()}
                onClick={async (e) => {
                  await addressAdd(e);
                  handlebtnclose2();
                }}
                style={{
                  padding: "10px 24px",
                  borderRadius: "56px",
                  backgroundColor: !title.trim() ? "#ccc" : "#e84135",
                  border: "none",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: !title.trim() ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  if (title.trim()) {
                    e.target.style.backgroundColor = "#d32f2f";
                    e.target.style.transform = "translateY(-1px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (title.trim()) {
                    e.target.style.backgroundColor = "#e84135";
                    e.target.style.transform = "translateY(0)";
                  }
                }}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <div
        className="modal address-details-modal fade"
        id="address-details"
        tabIndex={-1}
        aria-labelledby="addModalAdress"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ borderRadius: 20, overflow: "hidden", border: "none" }}>
            <div
              className="modal-header"
              style={{
                background: "#E84135",
                color: "#fff",
                padding: "18px 22px",
                borderBottom: "none",
              }}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className="d-inline-flex align-items-center justify-content-center"
                  style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,.15)" }}
                >
                  <i className="ri-home-3-fill" style={{ fontSize: 22 }} />
                </div>
                <div>
                  <h5 className="m-0 fw-semibold">Help us find you</h5>
                  <div className="opacity-75" style={{ fontSize: 12 }}>
                    Enter your building details for accurate delivery
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="btn-close btn-close-white"
                style={{ color: "black" }}
                onClick={handlebtnclose2}
                aria-label="Close"
              />
            </div>

            <div className="modal-body" style={{ padding: 18 }}>
              <form className="row mt-2">
                <div className="col-12">
                  <label
                    htmlFor="inputFirstname"
                    className="form-label fw-medium"
                    style={{
                      fontSize: '14px',
                      color: '#333',
                      marginBottom: '8px'
                    }}
                  >
                    Building Number
                  </label>
                  <div
                    className="d-flex align-items-center rounded-3"
                    style={{
                      border: "1px solid #e5e7eb",
                      padding: "8px 12px",
                      background: "#fff",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <i className="ri-building-2-line text-muted me-2" />
                    <input
                      type="text"
                      className="form-control border-0 p-0"
                      id="inputFirstname"
                      placeholder="Enter building number"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      style={{
                        boxShadow: "none",
                        fontSize: '14px',
                        background: "transparent"
                      }}
                    />
                  </div>
                  <div className="text-muted mt-2" style={{ fontSize: 12 }}>
                    This helps our delivery partner locate your exact address
                  </div>
                </div>
              </form>
            </div>

            <div className="modal-footer" style={{
              borderTop: "1px solid #eef0f3",
              padding: "12px 18px"
            }}>
              <button
                type="button"
                className="btn theme-btn"
                disabled={!title.trim()}
                onClick={async (e) => {
                  await addressAdd(e);
                  handlebtnclose2();
                }}
                style={{
                  padding: "10px 24px",
                  borderRadius: "56px",
                  backgroundColor: !title.trim() ? '#ccc' : '#e84135',
                  border: 'none',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: !title.trim() ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div
        className="modal address-details-modal fade"
        id="address-details"
        tabIndex={-1}
        aria-labelledby="addModalAdress"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ borderRadius: '12px', border: 'none' }}>
            <div className="modal-header" style={{ border: 'none', padding: '24px 24px 16px 24px', textAlign: 'center',backgroundColor:"#e84135" }}>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handlebtnclose}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '16px',
                  fontSize: '12px',
                  color:"black"
                }}
              />
              <h5
                className="modal-title w-100"
                style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color:"white"
                }}
              >
                Help us find you
              </h5>
            </div>

            <div className="modal-body" style={{ padding: '0px 24px 24px 24px' }}>
              <form className="row mt-2">
                <div className="col-12">
                  <label
                    htmlFor="inputFirstname"
                    className="form-label"
                    style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#333',
                      marginBottom: '8px'
                    }}
                  >
                    Building Number or Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputFirstname"
                    placeholder="Enter building number or name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid #ddd',
                      fontSize: '14px',
                      height: '48px'
                    }}
                  />
                </div>
              </form>
            </div>

            <div className="modal-footer" style={{
              border: 'none',
              padding: '0 24px 24px 24px',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <button
                type="button"
                className="btn theme-btn mt-0"
                data-bs-dismiss="modal"
                aria-label="Close"
                disabled={!title.trim()}
                onClick={async (e) => {
                  await addressAdd(e);
                  handlebtnclose2();
                }}
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  borderRadius: '8px',
                  backgroundColor: !title.trim() ? '#ccc' : '#e84135',
                  border: 'none',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: !title.trim() ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Navbar;
