import axios from "axios";
import React, { useState, useEffect, useRef, useCallback } from "react";
import debounce from "lodash/debounce";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addcustinfo, getCustaddress, loginApi } from "../utils/api";
import { setPincode } from '../store/feature/pincodeSlice';
import { useSelector } from 'react-redux';
import DeliveryB from "../assets/deliveryboy.png";
import logo from '../assets/meat_logo1.png'
import { Modal } from 'bootstrap';
import { VscAccount } from "react-icons/vsc";
import {
  CButton,
  COffcanvas,
  COffcanvasHeader,
  COffcanvasTitle,
  COffcanvasBody,
  CCloseButton,
} from "@coreui/react";
import{ setCookie, getCookie, deleteCookie } from '../components/Cookie'
import { useDispatch } from "react-redux";
import { updateKeyValue,setActiveTab } from "../store/feature/userSlice";
import { toast } from "react-toastify";
const MAP_KEY = "AIzaSyA90kZbFA-_GeeQ67T7kTb7VQRSt_LoOXc";


const Navbar = ({ isStatic,text }) => {
  const dispatch = useDispatch();
  // const [activeTab, setActiveTab] = useState(() => {
  //   const savedTab = localStorage.getItem("activeTab");
  //   return savedTab ? savedTab : "Collection";
  // });
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedAddress = JSON.parse(localStorage.getItem("userAddress"));

  // Handle tab click
  const activeTab = useSelector((state) => state.User.activeTab);

  const handleTabClick = (tab) => {

    dispatch(setActiveTab(tab));

  };


  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // console.log(show,"")

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
          `https://partnermeatwala.com/api/customer/geolocation?query=${query}&type=regions`
        );

        const data = response.data;
        if (data.predictions) {
          const formattedSuggestions = data.predictions.map((prediction) => ({
            place_id: prediction.placeId,
            description: `${prediction.structuredFormatting.mainText}`,
            secondaryText: `${prediction.structuredFormatting.secondaryText} , ${prediction.structuredFormatting.mainText}`,
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
    setSelectedSuggestion(suggestion.secondaryText);
    inputRef.current.value = suggestion.secondaryText;
    setSuggestions([]);
    setLocationPop(false);

    // Close the location modal
    const locationModalElement = document.getElementById("location");
    if (locationModalElement) {
      // Remove 'show' class to hide the modal and set 'display' to 'none'
      locationModalElement.classList.remove("show");
      locationModalElement.style.display = "none";
      document.body.classList.remove("modal-open");

      // Remove the backdrop
      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) {
        backdrop.classList.remove("show");
        backdrop.remove();
      }
    } else {
      console.error("Location modal not found.");
    }

    // Open the address-details modal
    const addressDetailsModalElement =
      document.getElementById("address-details");
    if (addressDetailsModalElement) {
      // Add 'show' class to display the modal and set 'display' to 'block'
      addressDetailsModalElement.classList.add("show");
      addressDetailsModalElement.style.display = "block";
      document.body.classList.add("modal-open");

      // Add backdrop
      // const backdrop = document.createElement('div');
      // backdrop.className = 'modal-backdrop fade show';
      // document.body.appendChild(backdrop);
    } else {
      console.error("Address details modal not found.");
    }
  };

  const handlebtnclose = () => {
    const addressDetailsModalElement =
      document.getElementById("address-details");
    if (addressDetailsModalElement) {
      // Remove 'show' class to hide the modal
      addressDetailsModalElement.classList.remove("show");
      addressDetailsModalElement.style.display = "none";

      // Remove the backdrop element
      const backdrop = document.querySelector(".modal-backdrop.fade.show");
      if (backdrop) {
        backdrop.remove(); // Remove the backdrop from the DOM
      }

      // Remove 'modal-open' class from the body
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
    // Find the postcode from the addressComponents
    const addressComponents = response.data.results[0].addressComponents;
    const postalCodeComponent = addressComponents.find(component =>
      component.types.includes('postal_code')
    );

    if (postalCodeComponent) {
      // const postalCode = postalCodeComponent.longName;
     const postalCode = postalCodeComponent.longName.slice(0, 4).toUpperCase();
  
      // Create an object to store
      const postalCodeData = {
          longName: postalCode,
          shortName: postalCode,
          types: ["postal_code"]
      };
  
      // Save the object in local storage as a JSON string
      localStorage.setItem('pincode', JSON.stringify(postalCodeData));
      setCookie('pincode', JSON.stringify(postalCodeData));
      
  } else {
      console.log("Postal code not found in addressComponents");
  }
  
  };


  

  // address

  const [address, setAddress] = useState([]);
  const Navigate = useNavigate();
  // const [addres, setAddres] = useState(''); // Added address state
  const [title, setTitle] = useState(""); 
  const pincode = useSelector((state) => state.pincode);
  const [inputPincode, setInputPincode] = useState('');
  const [remove,setRemove] = useState("")

  useEffect(() => {
    // Load pincode from local storage on component mount
    const savedPincode = localStorage.getItem("pincode") || '';
    setRemove(savedPincode)
    setInputPincode(savedPincode);
    dispatch(setPincode(savedPincode)); // Update Redux state with the saved pincode
  }, [dispatch]);

  useEffect(() => {
    // Update local storage when pincode changes
    if (inputPincode) {
      localStorage.setItem("pincode", inputPincode);
      setCookie("pincode", inputPincode);
    }
  }, [inputPincode]);




  const callData = async (visibleCount = 3) => {
    try {
      if (storedUser) {
        const data = {
          custid: storedUser?.userid,
        };
        const res = await getCustaddress(data);
        const addresses = res?.useraddress || []; 
        setAddress(addresses.slice(0, visibleCount)); // Only set the number of addresses to be visible
  
        if (addresses.length > 0) {
          const lastAddress = addresses[addresses.length - 1]; // Get the last address
          localStorage.setItem("userAddress", JSON.stringify(lastAddress)); // Save the last address object to 'userAddress'
          setCookie("userAddress", JSON.stringify(lastAddress)); // Save the last address object to 'userAddress'
          dispatch(updateKeyValue({ key: "userAddress", value: lastAddress }));
        } else {
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
     
        }

      }
    } catch (error) {
      console.error("Error fetching addresses", error);
      
    }
  };

  const [visibleCount, setVisibleCount] = useState(3); // Number of addresses to show initially
  const [allAddressesLoaded, setAllAddressesLoaded] = useState(false); // Track if all addresses are loaded
  
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
    localStorage.setItem("userAddress", JSON.stringify(address));
    setCookie("userAddress", JSON.stringify(address));
    dispatch(updateKeyValue({ key: "userAddress", value: address }));  };



    const handleLocationClick = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBePruYxWbLAsOVswTaH0OHPyv8vx-mMcc`
          );
          const address = response?.data?.results[0]?.formatted_address;
          setSelectedSuggestion(address);
          inputRef.current.value = address;
          setSuggestions([]);
          setLocationPop(false);
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    };
    const [hasBoxShadow, setHasBoxShadow] = useState(true);
    const removePincode = (e)=>{
      e.preventDefault()
      setRemove("")
      localStorage.removeItem("pincode");
      setHasBoxShadow(false)

    }

// location model 


const { success } = useSelector((state) => state.User);
const [showLocationModal, setShowLocationModal] = useState(false);

useEffect(() => {
  const hasVisited = localStorage.getItem('hasVisited');

  if (!hasVisited) {
    setShowLocationModal(true);
    localStorage.setItem('hasVisited', 'true');
  }
  

  // Check if success state needs to trigger modal or other actions
  if (success) {
    // You can perform actions based on success here
  }
}, [success]);

useEffect(() => {
  if (showLocationModal) {
    // Ensure the modal exists in the DOM before initializing
    const modalElement = document.getElementById('location');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    } else {
     
      console.error('Modal element not found.');
      
    }
  }
}, [showLocationModal]);



  return (
    <>
      <header
      style={{
        position: isStatic ? "static" : "fixed",
       
      }}
      >
        <div className="container">
          <nav className="navbar navbar-expand-lg p-0 mnavbar">
          <Link to={"/"} className="d-flex align-items-center gap-2">
  <img
    className="img-fluid"
    src={`${logo}`}
    alt="logo"
    style={{ width: "185px", height: "50px" }} // Adjust size as needed
  />
  {/* <span style={{ fontSize: "0.9rem", fontWeight: "bold" }}>
    Meat Wala
  </span> */}
</Link>

            {text !== "home"  && (

            <Link
              target="_blank"
              href=""
              data-bs-toggle="modal"
              data-bs-target="#location"
              className="btn btn-sm theme-btn location-btn mt-0 ms-3 d-flex align-content-center gap-1"
              style={{ background: "#dff5ff", color: "#000" }}
            >
              <i className="ri-map-pin-line" style={{ color: "#01b2fe" }} />
            {storedAddress?.title} {getWordsWithinLimit(storedAddress?.address,20)}...
            </Link>

)} 



            {/* <CButton
              className="navbar-toggler ml-auto"
              data-bs-target="#offcanvasNavbar"
              // onClick={handleShow}
              onClick={() => setVisible(true)}
            >
              <span className="navbar-toggler-icon">
                <i className="ri-menu-line" />
              </span>
            </CButton> */}
            {text !== "home"  && (
            <div className="nav-option order-md-2">
              <div className="tab">
                <div className="d-flex text-center">
                  <Link
                    className={`tablinks ${
                      activeTab === "Delivery" ? "active" : ""
                    }`}
                    style={{ width: "auto", padding: "7px 20px" }}
                    onClick={() => handleTabClick("Delivery")}
                  >
                    <p className="f-12">
                      <img src={DeliveryB} style={{ width: "15px" }}/> Delivery
                    </p>{" "}
                    <p className="smtext">35 - 50 Min</p>
                  </Link>
                  <Link
                    className={`tablinks ${
                      activeTab === "Collection" ? "active" : ""
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
              {/* {
                  text == "home" && (
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                      
                 
                      <div className="ms-auto d-flex align-items-center gap-4">
                        <div className="dropdown">
                          <button
                            className="btn btn-light d-flex align-items-center"
                            style={{ borderRadius: "50px", border: "1px solid #ddd" }}
                          >
                            <img
                              src="https://flagcdn.com/w40/gb.png"
                              alt="Country Flag"
                              style={{
                                width: "24px",
                                height: "24px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                marginRight: "8px",
                              }}
                            />
                            EN
                          </button>
                        </div>
                  
                        <Link
                          to="/login"
                          className="btn btn-light d-flex align-items-center gap-2"
                          style={{
                            borderRadius: "50px",
                            padding: "8px 16px",
                            border: "1px solid #ddd",
                          }}
                        >
                          <i className="bi bi-person" style={{ fontSize: "18px" }}></i>
                          Log in
                        </Link>
                      </div>
                    </div>
                  </nav>
                  


                  )
                } */}
             
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
              {/* <COffcanvasBody>
                <ul className="navbar-nav justify-content-center flex-grow-1">
                  <li className="nav-item">
                    <Link to={"/wholesale"} className="nav-link" style={{ fontWeight: "400px" }}>
                    Restaurant wholesale
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/become-a-rider"} className="nav-link" style={{ fontWeight: "400px" }}>
                    Become a rider
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/partner"} className="nav-link" style={{ fontWeight: "400px" }}>
                    Partner with us
                    </Link>
                  </li> */}

                  {/* <li className="nav-item">
                    <Link to={"/contact"} className="nav-link">
                      Contact
                      
                    </Link>
                  </li> */}
                {/* </ul>
                
              </COffcanvasBody> */}
            </COffcanvas>
{/* Country Selector and Login */}
<div className="d-flex align-items-center gap-4">
        {/* Country Selector - Hidden on Mobile */}
        {/* <div className="dropdown d-none d-lg-block">
          <button
            className="btn btn-light d-flex align-items-center"
            style={{ borderRadius: "50px", border: "1px solid #ddd",padding: "5px 16px" }}
          >
            <img
              src="https://flagcdn.com/w40/gb.png"
              alt="Country Flag"
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: "8px",
              }}
            />
            EN
          </button>
        </div> */}

        {/* Login Button */}
        {/* <Link
          to="/login"
          className="btn btn-light d-flex align-items-center gap-2"
          style={{
            borderRadius: "50px",
            padding: "5px 16px",
            border: "1px solid #ddd",
          }}
        >
          <i className="bi bi-person" style={{ fontSize: "15px" }}></i>
          Log in
        </Link> */}

<div className="d-flex align-items-center gap-4">
  {storedUser ? (
    // Show VscAccount icon when user is logged in
    <Link
      to="/setting" // Adjust the route to the user's profile page or desired destination
      className="d-flex align-items-center gap-2"
      // style={{
      //   borderRadius: "50px",
      //   padding: "5px 12px",
      //   border: "1px solid #ddd",
      // }}
    >
      <VscAccount style={{ fontSize: "29px" }} />
      {/* Account */}
    </Link>
  ) : (
    // Show Login button when user is not logged in
    <Link
      to="/login"
      className="btn btn-light d-flex align-items-center gap-2"
      style={{
        borderRadius: "50px",
        padding: "5px 16px",
        border: "1px solid #ddd",
      }}
    >
      <i className="bi bi-person" style={{ fontSize: "15px" }}></i>
      Log in
    </Link>
  )}
</div>

      </div>
          </nav>
          
        </div>
      </header>

    </>
  );
};

export default Navbar;
