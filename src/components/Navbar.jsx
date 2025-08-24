// import axios from "axios";
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import debounce from "lodash/debounce";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { addcustinfo, getCustaddress, loginApi } from "../utils/api";
// import { setPincode } from "../store/feature/pincodeSlice";
// import { useSelector } from "react-redux";
// import DeliveryB from "../assets/deliveryboy.png";
// import logo from "../assets/meat_logo1.png";
// import { Modal } from "bootstrap";
// import { IoIosArrowBack } from "react-icons/io";

// import {
//   CButton,
//   COffcanvas,
//   COffcanvasHeader,
//   COffcanvasTitle,
//   COffcanvasBody,
//   CCloseButton,
// } from "@coreui/react";
// import { setCookie, getCookie, deleteCookie } from "./Cookie";
// import { useDispatch } from "react-redux";
// import { updateKeyValue, setActiveTab } from "../store/feature/userSlice";
// import { toast } from "react-toastify";
// import MobileViewAppDownload from "./MobileViewAppDownload";

// const MAP_KEY = "AIzaSyA90kZbFA-_GeeQ67T7kTb7VQRSt_LoOXc";

// const Navbar = ({ isStatic, text }) => {
//   const dispatch = useDispatch();

//   // Utility function to extract clean postcode from nested JSON
//   const extractCleanPostcode = (value) => {
//     if (!value) return "";

//     // If it's already a simple string like "HP12", return it
//     if (typeof value === 'string' && !value.includes('{') && !value.includes('"')) {
//       return value;
//     }

//     // If it's a nested JSON string, recursively parse until we get the clean value
//     let current = value;
//     let attempts = 0;
//     const maxAttempts = 5; // Prevent infinite loops

//     while (attempts < maxAttempts) {
//       try {
//         if (typeof current === 'string' && (current.includes('{') || current.includes('"'))) {
//           current = JSON.parse(current);
//         } else if (typeof current === 'object' && current !== null) {
//           // Extract from object
//           current = current.LONGNAME || current.longName || current.SHORTNAME || current.shortName || current;
//         } else {
//           // It's a clean string
//           break;
//         }
//         attempts++;
//       } catch (e) {
//         console.warn('Failed to parse nested JSON:', e);
//         break;
//       }
//     }

//     return typeof current === 'string' ? current : "";
//   };

//   // Function to store pincode as clean JSON object (no nesting)
//   const storePincodeAsCleanJSON = (postcodeString) => {
//     // Ensure we have a clean string first
//     const cleanPostcode = extractCleanPostcode(postcodeString);

//     const pincodeObject = {
//       longName: cleanPostcode,
//       shortName: cleanPostcode,
//       types: ["postal_code"]
//     };

//     // Clear existing data first
//     localStorage.removeItem("pincode");
//     setCookie("pincode", "");

//     // Store the clean JSON
//     localStorage.setItem("pincode", JSON.stringify(pincodeObject));
//     setCookie("pincode", JSON.stringify(pincodeObject));

//     console.log("Stored clean pincode:", pincodeObject);
//     return cleanPostcode;
//   };

//   const [selectedSuggestion, setSelectedSuggestion] = useState("");
//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   const [storedAddress, setStoredAddress] = useState({});
//   const [isDesktop, setIsDesktop] = useState(window.innerWidth <= 768);

//   console.log("Stored", storedAddress);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsDesktop(window.innerWidth <= 768);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Handle tab click
//   const activeTab = useSelector((state) => state.User.activeTab);

//   const handleTabClick = (tab) => {
//     console.log(tab, "tablink");
//     dispatch(setActiveTab(tab));
//   };

//   const [show, setShow] = useState(false);

//   // #location
//   const [suggestions, setSuggestions] = useState([]);
//   const [visible, setVisible] = useState(false);
//   const [locationPop, setLocationPop] = useState(false);
//   const inputRef = useRef(null);
//   const [location, setLocation] = useState(null);
//   const [selectSuggestion, setSelectSuggestion] = useState(null);

//   const fetchSuggestions = async (query) => {
//     if (query.length > 0) {
//       try {
//         const response = await axios.get(
//           `https://partnermeatwala.com/api/customer/geocode?place=${query}`
//         );
//         console.log("API Response:", response.data);
//         const data = response.data;

//         if (data.results && data.results.length > 0) {
//           console.log("Results:", data.results);
//           const formattedSuggestions = data.results.map((result) => ({
//             place_id: result.placeId,
//             description: result.formattedAddress,
//             secondaryText: result.formattedAddress,
//             location: result.geometry.location,
//             addressComponents: result.addressComponents
//           }));
//           console.log("Formatted Suggestions:", formattedSuggestions);
//           setSuggestions(formattedSuggestions);
//           setLocationPop(true);
//         }
//       } catch (error) {
//         console.error("Error fetching location suggestions:", error);
//       }
//     } else {
//       setSuggestions([]);
//       setLocationPop(false);
//     }
//   };

//   const debouncedFetchSuggestions = useCallback(
//     debounce(fetchSuggestions, 300),
//     []
//   );

//   const handleInputChange = (event) => {
//     const query = event.target.value;
//     console.log(query, "input");
//     debouncedFetchSuggestions(query);
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setSelectedSuggestion(suggestion.description);
//     inputRef.current.value = suggestion.description;
//     setSuggestions([]);
//     setLocationPop(false);
//     setLocation(suggestion.location);

//     const postalCodeComponent = suggestion.addressComponents.find((component) =>
//       component.types.includes("postal_code")
//     );

//     if (postalCodeComponent) {
//       const postalCode = postalCodeComponent.longName.slice(0, 4).toUpperCase();
//       console.log(postalCode, "postal code");

//       // Store as clean JSON object
//       const cleanPostcode = storePincodeAsCleanJSON(postalCode);
//       setInputPincode(cleanPostcode);
//     }

//     // Close location modal and open address-details modal
//     const locationModalElement = document.getElementById("location");
//     if (locationModalElement) {
//       locationModalElement.classList.remove("show");
//       locationModalElement.style.display = "none";
//       document.body.classList.remove("modal-open");

//       const backdrop = document.querySelector(".modal-backdrop");
//       if (backdrop) {
//         backdrop.classList.remove("show");
//         backdrop.remove();
//       }
//     }

//     const addressDetailsModalElement = document.getElementById("address-details");
//     if (addressDetailsModalElement) {
//       addressDetailsModalElement.classList.add("show");
//       addressDetailsModalElement.style.display = "block";
//       document.body.classList.add("modal-open");
//     }
//   };

//   const handlebtnclose = () => {
//     const addressDetailsModalElement = document.getElementById("address-details");
//     if (addressDetailsModalElement) {
//       addressDetailsModalElement.classList.remove("show");
//       addressDetailsModalElement.style.display = "none";

//       const backdrop = document.querySelector(".modal-backdrop.fade.show");
//       if (backdrop) {
//         backdrop.remove();
//       }

//       document.body.classList.remove("modal-open");
//     } else {
//       console.error("Address details modal not found.");
//     }
//   };

//   const handlelocation = async (suggestion) => {
//     console.log(suggestion.secondaryText, "suggestion");
//     const response = await axios.get(
//       `https://partnermeatwala.com/api/customer/geocode?place=${suggestion.secondaryText}`
//     );

//     if (response?.data?.results[0]?.geometry?.location) {
//       const locationData = response.data.results[0].geometry.location;
//       setLocation(locationData);
//       console.log(location, "lat,lng");
//     }

//     const addressComponents = response.data.results[0].addressComponents;
//     const postalCodeComponent = addressComponents.find((component) =>
//       component.types.includes("postal_code")
//     );

//     if (postalCodeComponent) {
//       const postalCode = postalCodeComponent.longName.slice(0, 4).toUpperCase();
//       console.log(postalCode, "postal code");

//       // Store as clean JSON object
//       const cleanPostcode = storePincodeAsCleanJSON(postalCode);
//       setInputPincode(cleanPostcode);
//     }
//   };

//   useEffect(() => {
//     if (location) {
//       console.log("Location has been updated:", location);
//     }
//   }, [location]);

//   useEffect(() => {
//     const updateStoredAddress = () => {
//       const address = localStorage.getItem("userAddress");
//       const parsedAddress = address ? JSON.parse(address) : {};
//       setStoredAddress(parsedAddress);
//     };

//     updateStoredAddress();
//     window.addEventListener('storage', updateStoredAddress);
//     window.addEventListener('localStorageUpdate', updateStoredAddress);

//     return () => {
//       window.removeEventListener('storage', updateStoredAddress);
//       window.removeEventListener('localStorageUpdate', updateStoredAddress);
//     };
//   }, []);

//   // address
//   const [address, setAddress] = useState([]);
//   const Navigate = useNavigate();
//   const [title, setTitle] = useState("");
//   const pincode = useSelector((state) => state.pincode);
//   const [inputPincode, setInputPincode] = useState("");
//   const [remove, setRemove] = useState("");

//   // Fixed useEffect for loading pincode - clean up nested JSON
//   useEffect(() => {
//     const savedPincode = localStorage.getItem("pincode") || "";
//     console.log("Raw saved pincode:", savedPincode);

//     if (savedPincode) {
//       // Extract clean postcode and re-store as clean JSON
//       const cleanPostcode = extractCleanPostcode(savedPincode);
//       console.log("Extracted clean postcode:", cleanPostcode);

//       if (cleanPostcode) {
//         // Re-store as clean JSON to fix any nested issues
//         storePincodeAsCleanJSON(cleanPostcode);
//         setRemove(cleanPostcode);
//         setInputPincode(cleanPostcode);
//         dispatch(setPincode(cleanPostcode));
//       }
//     }
//   }, [dispatch]);

//   useEffect(() => {
//     // Update local storage when pincode changes - ensure clean JSON
//     if (inputPincode) {
//       const currentStored = localStorage.getItem("pincode");
//       const cleanPostcode = extractCleanPostcode(inputPincode);

//       // Only update if it's different to avoid loops
//       if (cleanPostcode && cleanPostcode !== extractCleanPostcode(currentStored)) {
//         storePincodeAsCleanJSON(cleanPostcode);
//       }
//     }
//   }, [inputPincode]);

//   const addressAdd = async (e) => {
//     e.preventDefault();
//     const storedUser = JSON.parse(localStorage.getItem("user")) || "";

//     const lat = location?.lat || location?.latitude || "";
//     const lng = location?.lng || location?.longitude || "";

//     // Use the clean postcode string for API
//     const cleanPostcode = extractCleanPostcode(inputPincode);
//     console.log("Clean postcode being sent:", cleanPostcode);

//     const data = {
//       userid: storedUser?.userid,
//       title: title,
//       address: selectedSuggestion,
//       lat: lat.toString(),
//       lng: lng.toString(),
//       postcode: cleanPostcode, // Send only the string value to API
//     };

//     console.log("Final API payload:", data);

//     try {
//       const add = await addcustinfo(data);
//       if (add.status) {
//         localStorage.setItem("userAddress", JSON.stringify(data));
//         setCookie("userAddress", JSON.stringify(data));
//         localStorage.setItem("manualAddressSelection", "true");

//         dispatch(updateKeyValue({ key: "userAddress", value: data }));
//         setStoredAddress(data);
//         window.dispatchEvent(new Event('localStorageUpdate'));

//         // Ensure pincode is stored as clean JSON
//         storePincodeAsCleanJSON(cleanPostcode);
//         dispatch(setPincode(cleanPostcode));

//         setTitle("");
//         callData();
//         window.location.reload();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const callData = async (visibleCount = 3) => {
//     try {
//       if (storedUser) {
//         const data = {
//           custid: storedUser?.userid,
//         };
//         const res = await getCustaddress(data);
//         const addresses = res?.useraddress || [];
//         setAddress(addresses.slice(0, visibleCount));

//         const currentStoredAddress = localStorage.getItem("userAddress");
//         const hasManualSelection = localStorage.getItem("manualAddressSelection");

//         if (!hasManualSelection && addresses.length > 0 && !currentStoredAddress) {
//           const lastAddress = addresses[addresses.length - 1];
//           localStorage.setItem("userAddress", JSON.stringify(lastAddress));
//           setCookie("userAddress", JSON.stringify(lastAddress));
//           dispatch(updateKeyValue({ key: "userAddress", value: lastAddress }));

//           setStoredAddress(lastAddress);
//           window.dispatchEvent(new Event('localStorageUpdate'));
//         } else if (!storedUser && !currentStoredAddress) {
//           const lat = location?.lat?.toString();
//           const lng = location?.lng?.toString();
//           const data = {
//             title: title,
//             address: selectedSuggestion,
//             lat: lat,
//             lng: lng,
//           };
//           localStorage.setItem("userAddress", JSON.stringify(data));
//           setCookie("userAddress", JSON.stringify(data));
//           setStoredAddress(data);
//           window.dispatchEvent(new Event('localStorageUpdate'));
//           console.log(data, "storage");
//           console.log(location, "location");
//         }

//         console.log("data", res);
//       }
//     } catch (error) {
//       console.error("Error fetching addresses", error);
//     }
//   };

//   const [visibleCount, setVisibleCount] = useState(3);
//   const [allAddressesLoaded, setAllAddressesLoaded] = useState(false);

//   const showMoreAddresses = () => {
//     setVisibleCount((prevCount) => {
//       const newCount = prevCount + 3;
//       if (newCount >= address.length) {
//         setAllAddressesLoaded(true);
//       }
//       return newCount;
//     });
//   };

//   const showLessAddresses = () => {
//     setVisibleCount(3);
//     setAllAddressesLoaded(false);
//   };

//   useEffect(() => {
//     callData(visibleCount);
//   }, [visibleCount]);

//   const getWordsWithinLimit = (text, charLimit) => {
//     if (!text) return "";

//     let words = text.split(" ");
//     let result = [];
//     let currentLength = 0;

//     for (let word of words) {
//       if (currentLength + word.length + result.length > charLimit) break;
//       result.push(word);
//       currentLength += word.length;
//     }

//     return result.join(" ");
//   };

//   const saveAddressToLocalStorage = (address) => {
//     const updatedAddress = {
//       ...address,
//       postcode: address?.postcode || "",
//     };

//     localStorage.setItem("userAddress", JSON.stringify(updatedAddress));
//     setCookie("userAddress", JSON.stringify(updatedAddress));
//     localStorage.setItem("manualAddressSelection", "true");

//     dispatch(updateKeyValue({ key: "userAddress", value: updatedAddress }));
//     setStoredAddress(updatedAddress);
//     window.dispatchEvent(new Event('localStorageUpdate'));

//     if (address?.postcode) {
//       // Store postcode as clean JSON
//       const cleanPostcode = extractCleanPostcode(address.postcode).toUpperCase();
//       storePincodeAsCleanJSON(cleanPostcode);
//       setInputPincode(cleanPostcode);
//     }

//     callData();
//     window.location.reload();
//   };

//   const handleLocationClick = async () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(async (position) => {
//         const { latitude, longitude } = position.coords;
//         setLocation(position.coords);
//         console.log(location?.latitude, "handle");

//         try {
//           const response = await axios.get(
//             `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBePruYxWbLAsOVswTaH0OHPyv8vx-mMcc`
//           );

//           const address = response?.data?.results[0]?.formatted_address;
//           console.log(latitude, longitude, address, "handlelocation");

//           setSelectedSuggestion(address);
//           inputRef.current.value = address;
//           setSuggestions([]);
//           setLocationPop(false);

//           for (const result of response?.data?.results || []) {
//             const addressComponents = result.address_components || [];
//             const postalCodeComponent = addressComponents.find((component) =>
//               component.types.includes("postal_code")
//             );

//             if (postalCodeComponent) {
//               const postalCode = postalCodeComponent.long_name.slice(0, 4).toUpperCase();

//               // Store as clean JSON object
//               const cleanPostcode = storePincodeAsCleanJSON(postalCode);
//               setInputPincode(cleanPostcode);

//               console.log("New pincode saved:", postalCode);
//               break;
//             }
//           }
//         } catch (error) {
//           console.error("Error fetching address or saving pincode:", error);
//         }
//       });
//     }
//   };

//   const [hasBoxShadow, setHasBoxShadow] = useState(true);
//   const removePincode = (e) => {
//     e.preventDefault();
//     setRemove("");
//     localStorage.removeItem("pincode");
//     setHasBoxShadow(false);
//   };

//   // location model
//   const { success } = useSelector((state) => state.User);
//   const [showLocationModal, setShowLocationModal] = useState(false);

//   useEffect(() => {
//     const hasVisited = localStorage.getItem("hasVisited");

//     if (!hasVisited) {
//       setShowLocationModal(true);
//       localStorage.setItem("hasVisited", "true");
//     }

//     if (success) {
//     }
//   }, [success]);

//   useEffect(() => {
//     if (showLocationModal) {
//       const modalElement = document.getElementById("location");
//       if (modalElement) {
//         const modal = new Modal(modalElement);
//         modal.show();
//       } else {
//         console.error("Modal element not found.");
//       }
//     }
//   }, [showLocationModal]);

//  const [logoHeight, setLogoHeight] = useState("45px");

//   useEffect(() => {
//     const updateLogoSize = () => {
//       if (window.innerWidth <= 335) {
//         setLogoHeight("25px");
//       } else {
//         setLogoHeight("45px");
//       }
//     };

//     updateLogoSize(); // call once on mount
//     window.addEventListener("resize", updateLogoSize); // listen for resize

//     return () => window.removeEventListener("resize", updateLogoSize); // cleanup
//   }, []);



//   return (
//     <>
//       <header
//         style={{
//           position: isStatic ? "static" : "fixed",
//         }}
//       >
//         <div className="container">
//           <nav className="navbar navbar-expand-lg p-0">
//             <Link to={"/"}>
//               <IoIosArrowBack
//                 style={{ fontSize: "24px", marginRight: "10px" }}
//               />
//             </Link>

//               <Link to={"/"}>
//                 <img
//                   src={logo}
//                   alt="logo"
//                   style={{ width: "100%", height: logoHeight }}
//                 />
//               </Link>
//             <Link
//               target="_blank"
//               href=""
//               data-bs-toggle="modal"
//               data-bs-target="#location"
//               className="btn btn-sm theme-btn location-btn mt-0 ms-3 d-flex align-content-center gap-1"
//               style={{ background: "#e8413561", color: "#000" }}
//             >
//               <i
//                 className="ri-map-pin-line"
//                 style={{ color: "rgb(232, 65, 53);" }}
//               />
//             </Link>
//             <CButton
//               className="navbar-toggler ml-auto"
//               data-bs-target="#offcanvasNavbar"
//               onClick={() => setVisible(true)}
//             >
//               <span className="navbar-toggler-icon">
//                 <i className="ri-menu-line" />
//               </span>
//             </CButton>
//             {(text == "res" || text == "search" || text == "cart") && (
//               <div className="nav-option order-md-2">
//                 <div className="tab">
//                   <div className="d-flex text-center">
//                     <Link
//                       className={`tablinks ${
//                         activeTab === "Delivery" ? "active" : ""
//                       }`}
//                       style={{ width: "auto", padding: "7px 20px" }}
//                       onClick={() => handleTabClick("Delivery")}
//                     >
//                       <p className="f-12">
//                         <img src={DeliveryB || "/placeholder.svg"} style={{ width: "15px" }} />{" "}
//                         Delivery
//                       </p>{" "}
//                       <p className="smtext">45-60 Min</p>
//                     </Link>
//                     <Link
//                       className={`tablinks ${
//                         activeTab === "Collection" ? "active" : ""
//                       }`}
//                       style={{ width: "auto", padding: "7px 20px" }}
//                       onClick={() => handleTabClick("Collection")}
//                     >
//                       <p className="f-12">
//                         <i className="fa fa-shopping-bag" aria-hidden="true" />{" "}
//                         Collection
//                       </p>{" "}
//                       <p className="smtext">15 - 25 Min</p>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             )}
//             <COffcanvas
//               placement="end"
//               visible={visible}
//               onHide={() => setVisible(false)}
//             >
//               <COffcanvasHeader>
//                 <COffcanvasTitle>Menu</COffcanvasTitle>
//                 <CCloseButton
//                   className="text-reset"
//                   onClick={() => setVisible(false)}
//                 />
//               </COffcanvasHeader>
//               <COffcanvasBody>
//                 <ul className="navbar-nav justify-content-center flex-grow-1">
//                   <li className="nav-item">
//                     <Link
//                       to={"/"}
//                       className="nav-link"
//                       style={{ fontWeight: "600px" }}
//                     >
//                       Home
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link
//                       to={"/recipes"}
//                       className="nav-link"
//                       style={{ fontWeight: "600px" }}
//                     >
//                       Recipes
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link
//                       to={"/offers"}
//                       className="nav-link"
//                       style={{ fontWeight: "600px" }}
//                     >
//                       Offers
//                     </Link>
//                   </li>
//                 </ul>
//               </COffcanvasBody>
//             </COffcanvas>
//           </nav>
//         </div>
//       </header>
//       {showLocationModal ? (
//         <div
//           className="modal fade location-modal"
//           id="location"
//           data-bs-backdrop="static"
//           data-bs-keyboard="false"
//           tabIndex={-1}
//         >
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <div className="modal-title">
//                   <h5 className="fw-semibold">Select a Location</h5>
//                   <button
//                     type="button"
//                     className="btn-close"
//                     data-bs-dismiss="modal"
//                     aria-label="Close"
//                   />
//                 </div>
//               </div>
//               <div className="modal-body">
//                 <h6 className="mb-0">
//                   <strong>Currentaddress : </strong>
//                   {storedAddress?.address}
//                 </h6>
//                 <br></br>
//                 <div className="search-section">
//                   <form className="form_search" role="form">
//                     <div className="search-container">
//                       <input
//                         type="search"
//                         placeholder="Enter your postcode"
//                         className="search-input"
//                         onChange={handleInputChange}
//                         ref={inputRef}
//                         onFocus={() => setLocationPop(true)}
//                       />
//                       {locationPop && suggestions.length > 0 && (
//                         <ul className="suggestions-dropdown">
//                           {suggestions.map((suggestion) => (
//                             <li
//                               className="recent-location"
//                               key={suggestion.place_id}
//                               onClick={() => {
//                                 handleSuggestionClick(suggestion);
//                                 handlelocation(suggestion);
//                                 setSelectSuggestion(suggestion);
//                               }}
//                             >
//                               <div className="recant-address">
//                                 <i className="ri-map-pin-line theme-color" />
//                                 <div>
//                                   <h5>{suggestion.description}</h5>
//                                   <h6>{suggestion.secondaryText}</h6>
//                                 </div>
//                               </div>
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </div>
//                   </form>
//                 </div>
//                 <Link href="" className="current-location">
//                   <div className="current-address">
//                     <i className="ri-focus-3-line focus" />
//                     <div onClick={handleLocationClick}>
//                       <h5 className="mt-1">Use current location</h5>
//                     </div>
//                   </div>
//                   <i className="ri-arrow-right-s-line arrow" />
//                 </Link>
//                 <h5 className="mt-sm-3 mt-2 fw-medium recent-title dark-text">
//                   Recent Location
//                 </h5>
//                 {address.map((address) => (
//                   <Link
//                     href="#"
//                     className="recent-location"
//                     key={address.pkid}
//                     onClick={() => saveAddressToLocalStorage(address)}
//                   >
//                     <div className="recant-address">
//                       <i className="ri-map-pin-line theme-color" />
//                       <div data-bs-dismiss="modal" aria-label="Close">
//                         <h5>{address?.title}</h5>
//                         <h6>{address?.address}</h6>
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//                 {!allAddressesLoaded ? (
//                   <button
//                     onClick={showMoreAddresses}
//                     className="toggle-btn show-more-btn"
//                   >
//                     Show More
//                   </button>
//                 ) : (
//                   <button
//                     onClick={showLessAddresses}
//                     className="toggle-btn show-more-btn"
//                   >
//                     Show Less
//                   </button>
//                 )}
//               </div>
//               <div className="modal-footer">
//                 <Link href="#" className="btn gray-btn" data-bs-dismiss="modal">
//                   Close
//                 </Link>
//                 <Link
//                   className="btn theme-btn mt-0"
//                   data-bs-dismiss="modal"
//                   onClick={addressAdd}
//                 >
//                   Save
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div
//           className="modal fade location-modal"
//           id="location"
//           data-bs-backdrop="static"
//           data-bs-keyboard="false"
//           tabIndex={-1}
//         >
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <div className="modal-title">
//                   <h5 className="fw-semibold">Select a Location</h5>
//                   <button
//                     type="button"
//                     className="btn-close"
//                     data-bs-dismiss="modal"
//                     aria-label="Close"
//                   />
//                 </div>
//               </div>
//               <div className="modal-body">
//                 <h6 className="mb-0">
//                   <strong>Current Address:</strong>{" "}
//                   {storedAddress?.title ? `${storedAddress.title}, ` : ""}
//                   {storedAddress?.address?.trim()
//                     ? storedAddress.address
//                     : "N/A"}
//                 </h6>
//                 <br></br>
//                 <div className="search-section">
//                   <form className="form_search" role="form">
//                     <div className="search-container">
//                       <input
//                         type="search"
//                         placeholder="Enter your postcode"
//                         className="search-input"
//                         onChange={handleInputChange}
//                         ref={inputRef}
//                         onFocus={() => setLocationPop(true)}
//                       />
//                       {locationPop && suggestions.length > 0 && (
//                         <ul className="suggestions-dropdown">
//                           {suggestions.map((suggestion) => (
//                             <li
//                               className="recent-location"
//                               key={suggestion.place_id}
//                               onClick={() => {
//                                 handleSuggestionClick(suggestion);
//                                 handlelocation(suggestion);
//                                 setSelectSuggestion(suggestion);
//                               }}
//                             >
//                               <div className="recant-address">
//                                 <i className="ri-map-pin-line theme-color" />
//                                 <div>
//                                   <h5>{suggestion.description}</h5>
//                                   <h6>{suggestion.secondaryText}</h6>
//                                 </div>
//                               </div>
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </div>
//                   </form>
//                 </div>
//                 <Link href="" className="current-location">
//                   <div className="current-address">
//                     <i className="ri-focus-3-line focus" />
//                     <div onClick={handleLocationClick}>
//                       <h5 className="mt-1">Use current location</h5>
//                     </div>
//                   </div>
//                   <i className="ri-arrow-right-s-line arrow" />
//                 </Link>
//                 <h5 className="mt-sm-3 mt-2 fw-medium recent-title dark-text">
//                   Recent Location
//                 </h5>
//                 {address.map((address) => (
//                   <Link
//                     href="#"
//                     className="recent-location"
//                     key={address.pkid}
//                     onClick={() => saveAddressToLocalStorage(address)}
//                   >
//                     <div className="recant-address">
//                       <i className="ri-map-pin-line theme-color" />
//                       <div data-bs-dismiss="modal" aria-label="Close">
//                         <h5>{address.title}</h5>
//                         <h6>{address.address}</h6>
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//                 {!allAddressesLoaded ? (
//                   <button
//                     onClick={showMoreAddresses}
//                     className="toggle-btn show-more-btn"
//                   >
//                     Show More
//                   </button>
//                 ) : (
//                   <button
//                     onClick={showLessAddresses}
//                     className="toggle-btn show-more-btn"
//                   >
//                     Show Less
//                   </button>
//                 )}
//               </div>
//               <div className="modal-footer">
//                 <Link href="#" className="btn gray-btn" data-bs-dismiss="modal">
//                   Close
//                 </Link>
//                 <Link
//                   className="btn theme-btn mt-0"
//                   data-bs-dismiss="modal"
//                   onClick={addressAdd}
//                 >
//                   Save
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       <div
//         className="modal address-details-modal fade"
//         id="address-details"
//         tabIndex={-1}
//         aria-labelledby="addModalAdress"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-header">
//               <p className="modal-description" id="addModalAdress">
//                 So Help us to find you, to ensure{" "}
//                 <strong>accurate search results</strong>,{" "}
//                 <strong>delivery times</strong>, and <strong>fees</strong>,
//                 please tell us where on{" "}
//                 <span className="" style={{ color: "rgb(232, 65, 53)" }}>
//                   {selectSuggestion?.secondaryText}
//                 </span>
//                 <span> you are </span>.
//               </p>

//               <button
//                 type="button"
//                 className="another btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//                 onClick={handlebtnclose}
//                 style={{ marginTop: "-82px" }}
//               />
//             </div>
//             <div className="modal-body">
//               <form className="row g-3">
//                 <div className="col-12">
//                   <label htmlFor="inputFirstname" className="form-label">
//                     Enter building number or name
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="inputFirstname"
//                     placeholder="Enter building number or name"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                   />
//                 </div>
//               </form>
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn theme-btn mt-0"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//                 onClick={async (e) => {
//                   await addressAdd(e);
//                   handlebtnclose();
//                 }}
//               >
//                 SUBMIT
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;


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

  // Utility function to extract clean postcode from nested JSON
  const extractCleanPostcode = (value) => {
    if (!value) return "";

    // If it's already a simple string like "HP12", return it
    if (typeof value === 'string' && !value.includes('{') && !value.includes('"')) {
      return value;
    }

    // If it's a nested JSON string, recursively parse until we get the clean value
    let current = value;
    let attempts = 0;
    const maxAttempts = 5; // Prevent infinite loops

    while (attempts < maxAttempts) {
      try {
        if (typeof current === 'string' && (current.includes('{') || current.includes('"'))) {
          current = JSON.parse(current);
        } else if (typeof current === 'object' && current !== null) {
          // Extract from object
          current = current.LONGNAME || current.longName || current.SHORTNAME || current.shortName || current;
        } else {
          // It's a clean string
          break;
        }
        attempts++;
      } catch (e) {
        console.warn('Failed to parse nested JSON:', e);
        break;
      }
    }

    return typeof current === 'string' ? current : "";
  };

  // Function to store pincode as clean JSON object (no nesting)
  const storePincodeAsCleanJSON = (postcodeString) => {
    // Ensure we have a clean string first
    const cleanPostcode = extractCleanPostcode(postcodeString);

    const pincodeObject = {
      longName: cleanPostcode,
      shortName: cleanPostcode,
      types: ["postal_code"]
    };

    // Clear existing data first
    localStorage.removeItem("pincode");
    setCookie("pincode", "");

    // Store the clean JSON
    localStorage.setItem("pincode", JSON.stringify(pincodeObject));
    setCookie("pincode", JSON.stringify(pincodeObject));

    return cleanPostcode;
  };

  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [storedAddress, setStoredAddress] = useState({});
  const [isDesktop, setIsDesktop] = useState(window.innerWidth <= 768);


  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle tab click
  const activeTab = useSelector((state) => state.User.activeTab);

  const handleTabClick = (tab) => {
    dispatch(setActiveTab(tab));
  };

  const [show, setShow] = useState(false);

  // #location
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
          `https://partnermeatwala.com/api/customer/geocode?place=${query}`
        );
        const data = response.data;

        if (data.results && data.results.length > 0) {
          const formattedSuggestions = data.results.map((result) => ({
            place_id: result.placeId,
            description: result.formattedAddress,
            secondaryText: result.formattedAddress,
            location: result.geometry.location,
            addressComponents: result.addressComponents
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
    []
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
      component.types.includes("postal_code")
    );

    if (postalCodeComponent) {
      const postalCode = postalCodeComponent.longName.slice(0, 4).toUpperCase();

      // Store as clean JSON object
      const cleanPostcode = storePincodeAsCleanJSON(postalCode);
      setInputPincode(cleanPostcode);
    }

    // Close location modal and open address-details modal
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

    const addressDetailsModalElement = document.getElementById("address-details");
    if (addressDetailsModalElement) {
      addressDetailsModalElement.classList.add("show");
      addressDetailsModalElement.style.display = "block";
      document.body.classList.add("modal-open");
    }
  };

  const handlebtnclose = () => {
    const addressDetailsModalElement = document.getElementById("address-details");
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
      `https://partnermeatwala.com/api/customer/geocode?place=${suggestion.secondaryText}`
    );

    if (response?.data?.results[0]?.geometry?.location) {
      const locationData = response.data.results[0].geometry.location;
      setLocation(locationData);
    }

    const addressComponents = response.data.results[0].addressComponents;
    const postalCodeComponent = addressComponents.find((component) =>
      component.types.includes("postal_code")
    );

    if (postalCodeComponent) {
      const postalCode = postalCodeComponent.longName.slice(0, 4).toUpperCase();

      // Store as clean JSON object
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
    window.addEventListener('storage', updateStoredAddress);
    window.addEventListener('localStorageUpdate', updateStoredAddress);

    return () => {
      window.removeEventListener('storage', updateStoredAddress);
      window.removeEventListener('localStorageUpdate', updateStoredAddress);
    };
  }, []);

  // address
  const [address, setAddress] = useState([]);
  const Navigate = useNavigate();
  const [title, setTitle] = useState("");
  const pincode = useSelector((state) => state.pincode);
  const [inputPincode, setInputPincode] = useState("");
  const [remove, setRemove] = useState("");

  // Fixed useEffect for loading pincode - clean up nested JSON
  useEffect(() => {
    const savedPincode = localStorage.getItem("pincode") || "";

    if (savedPincode) {
      // Extract clean postcode and re-store as clean JSON
      const cleanPostcode = extractCleanPostcode(savedPincode);

      if (cleanPostcode) {
        // Re-store as clean JSON to fix any nested issues
        storePincodeAsCleanJSON(cleanPostcode);
        setRemove(cleanPostcode);
        setInputPincode(cleanPostcode);
        dispatch(setPincode(cleanPostcode));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    // Update local storage when pincode changes - ensure clean JSON
    if (inputPincode) {
      const currentStored = localStorage.getItem("pincode");
      const cleanPostcode = extractCleanPostcode(inputPincode);

      // Only update if it's different to avoid loops
      if (cleanPostcode && cleanPostcode !== extractCleanPostcode(currentStored)) {
        storePincodeAsCleanJSON(cleanPostcode);
      }
    }
  }, [inputPincode]);

  const addressAdd = async (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user")) || "";

    const lat = location?.lat || location?.latitude || "";
    const lng = location?.lng || location?.longitude || "";

    // Use the clean postcode string for API
    const cleanPostcode = extractCleanPostcode(inputPincode);

    const data = {
      userid: storedUser?.userid,
      title: title,
      address: selectedSuggestion,
      lat: lat.toString(),
      lng: lng.toString(),
      postcode: cleanPostcode, // Send only the string value to API
    };


    try {
      const add = await addcustinfo(data);
      if (add.status) {
        localStorage.setItem("userAddress", JSON.stringify(data));
        setCookie("userAddress", JSON.stringify(data));
        localStorage.setItem("manualAddressSelection", "true");

        dispatch(updateKeyValue({ key: "userAddress", value: data }));
        setStoredAddress(data);
        window.dispatchEvent(new Event('localStorageUpdate'));

        // Ensure pincode is stored as clean JSON
        storePincodeAsCleanJSON(cleanPostcode);
        dispatch(setPincode(cleanPostcode));

        setTitle("");
        callData();
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
        const hasManualSelection = localStorage.getItem("manualAddressSelection");

        if (!hasManualSelection && addresses.length > 0 && !currentStoredAddress) {
          const lastAddress = addresses[addresses.length - 1];
          localStorage.setItem("userAddress", JSON.stringify(lastAddress));
          setCookie("userAddress", JSON.stringify(lastAddress));
          dispatch(updateKeyValue({ key: "userAddress", value: lastAddress }));

          setStoredAddress(lastAddress);
          window.dispatchEvent(new Event('localStorageUpdate'));
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
          window.dispatchEvent(new Event('localStorageUpdate'));
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
    window.dispatchEvent(new Event('localStorageUpdate'));

    if (address?.postcode) {
      // Store postcode as clean JSON
      const cleanPostcode = extractCleanPostcode(address.postcode).toUpperCase();
      storePincodeAsCleanJSON(cleanPostcode);
      setInputPincode(cleanPostcode);
    }

    callData();
    window.location.reload();
  };

  const handleLocationClick = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(position.coords);

        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBePruYxWbLAsOVswTaH0OHPyv8vx-mMcc`
          );

          const address = response?.data?.results[0]?.formatted_address;

          setSelectedSuggestion(address);
          inputRef.current.value = address;
          setSuggestions([]);
          setLocationPop(false);

          for (const result of response?.data?.results || []) {
            const addressComponents = result.address_components || [];
            const postalCodeComponent = addressComponents.find((component) =>
              component.types.includes("postal_code")
            );

            if (postalCodeComponent) {
              const postalCode = postalCodeComponent.long_name.slice(0, 4).toUpperCase();

              // Store as clean JSON object
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

  // location model
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
          <nav className="navbar navbar-expand-lg p-0" style={{ overflowX: "auto" }}>
            <Link to={"/"}>
              <IoIosArrowBack style={{ fontSize: "24px", marginRight: "10px" }} />
            </Link>
            <Link to={"/"}>
              <img
                className="img-fluid logo"
                src={`${logo}`}
                alt="logo"
                style={{ maxWidth: "120px", height: "34px", width: "auto" }}
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
            >
              <span className="navbar-toggler-icon">
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
                        <img src={DeliveryB || "/placeholder.svg"} style={{ width: "15px" }} />{" "}
                        Delivery
                      </p>{" "}
                      <p className="smtext">45-60 Min</p>
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
                      to={"/"}
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
                  <strong>Current Address:</strong>{" "}
                  {storedAddress?.title ? `${storedAddress.title}, ` : ""}
                  {storedAddress?.address?.trim()
                    ? storedAddress.address
                    : "N/A"}
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
                        <h5>{address.title}</h5>
                        <h6>{address.address}</h6>
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
                {/* <Link href="#" className="btn gray-btn" data-bs-dismiss="modal">
                  Close
                </Link> */}
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
      )}
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
              <p className="modal-description" id="addModalAdress">
                So Help us to find you, to ensure{" "}
                <strong>accurate search results</strong>,{" "}
                <strong>delivery times</strong>, and <strong>fees</strong>,
                please tell us where on{" "}
                <span className="" style={{ color: "rgb(232, 65, 53)" }}>
                  {selectSuggestion?.secondaryText}
                </span>
                <span> you are </span>.
              </p>

              <button
                type="button"
                className="another btn-close"
                // data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handlebtnclose}
                style={{ marginTop: "-82px" }}
              />
            </div>
            <div className="modal-body">
              <form className="row g-3">
                <div className="col-12">
                  <label htmlFor="inputFirstname" className="form-label">
                    Enter building number or name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputFirstname"
                    placeholder="Enter building number or name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn theme-btn mt-0"
                data-bs-dismiss="modal"
                aria-label="Close"
                disabled={!title.trim()}
                onClick={async (e) => {
                  await addressAdd(e);
                  handlebtnclose();
                }}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;