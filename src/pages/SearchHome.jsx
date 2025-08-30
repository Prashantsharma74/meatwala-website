import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/SearchNav";
import Footer from "../components/Footer";
import FooterMobileMenu from "../components/FooterMobileMenu";
import Delivery from "../components/delivery";
import homescreen from "../assets/three1.png";
import homescreen1 from "../assets/mobile1.png";
import homescreen2 from "../assets/mobile2.png";
import { TbMeat, TbTruckDelivery } from "react-icons/tb";
import burger from "../assets/newmainimage.jpg";
import { FaHandsHelping } from "react-icons/fa";
import { MdOutlineShareLocation, MdOutlineAttachMoney } from "react-icons/md";
import { FaGift } from "react-icons/fa";
import loyaltylogo from "../assets/loaylty2.png";
import Swal from "sweetalert2"; // Import SweetAlert2
import axios from "axios";
import benifit from "../assets/benifit2.png";
import { useDispatch } from "react-redux";
import { updateKeyValue } from "../store/feature/userSlice";
import { setPincode } from "../store/feature/pincodeSlice";
import "bootstrap";
import * as bootstrap from "bootstrap";
import { addcustinfo, getCustaddress, loginApi, search } from "../utils/api";
import ImageWithLoading from "../components/ImageLoading";
import { CirclesWithBar } from "react-loader-spinner";
import CookieConsent from "../components/Cookie";
import { LazyLoadImage } from "react-lazy-load-image-component";
import MobileViewAppDownload from "../components/MobileViewAppDownload";
import { Helmet } from "react-helmet-async";
import Charity from "../components/Charity";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionSelected, setIsSuggestionSelected] = useState(true); // Show button initially
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedAddress = JSON.parse(localStorage.getItem("userAddress"));
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [titl, setTitl] = useState("")
  // near the other useState lines
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // On component mount, load address from localStorage
  useEffect(() => {
    const savedAddress = localStorage.getItem("userAddress");
    if (savedAddress) {
      const parsedAddress = JSON.parse(savedAddress);
      setTitl(parsedAddress.title)
      setAddress(parsedAddress.address);
    }
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm) {
        fetchSuggestions(searchTerm);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  // Fetch restaurants based on user's location (lat, lng, postcode)
  const fetchRestaurants = async (lat, lng, postcode) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      // Ensure storedUser exists before accessing its properties
      const payload = {
        istakeway: "0",
        lat,
        lng,
        pincode: postcode,
        userid: storedUser?.userid || "", // Use optional chaining and provide a fallback value
        isdelivery: "1",
      };

      const response = await search(payload); // Call the search API

      if (
        response?.status === "1" &&
        Array.isArray(response?.searchrestauarant) &&
        response.searchrestauarant.length > 0
      ) {
        setRestaurants(response.searchrestauarant); // Set restaurants if available
        return true; // Restaurants are available
      } else {
        setRestaurants([]); // Ensure restaurants state is cleared
        return false; // No restaurants found
      }
    } catch (err) {
      console.log(err, "errors");
      return false; // Error occurred
    }
  };

  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get(
        `https://partnermeatwala.com/api/customer/geocode?place=${query}`
      );
      if (response.data && response.data.results) {
        const results = response.data.results.map((result) => {
          const location = result.geometry.location;
          const postcodeComponent = result.addressComponents.find((comp) =>
            comp.types.includes("postal_code")
          );

          return {
            formattedAddress: result.formattedAddress,
            lat: location.lat,
            lng: location.lng,
            postcode: postcodeComponent ? postcodeComponent.longName : "",
          };
        });

        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setTitl("")
    setAddress("");
    setSearchTerm(e.target.value);
    setIsSuggestionSelected(false); // Hide button on input change
  };

  const addressAdd = async (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const selectedSuggestion = suggestions.find(
      (suggestion) => suggestion.formattedAddress === searchTerm
    );

    if (!selectedSuggestion) {
      console.error("No suggestion selected!");
      return;
    }

    const data = {
      userid: storedUser?.userid,
      title: title,
      address: selectedSuggestion.formattedAddress,
      lat: selectedSuggestion.lat.toString(),
      lng: selectedSuggestion.lng.toString(),
      postcode: selectedSuggestion?.postcode,
    };

    try {
      const add = await addcustinfo(data);

      if (add.status === "1") {
        // ✅ Update localStorage userAddress with the new title
        const existingUserAddress = JSON.parse(localStorage.getItem("userAddress")) || {};
        const updatedUserAddress = {
          ...existingUserAddress,
          title: title, // <-- Update title here
        };

        localStorage.setItem("userAddress", JSON.stringify(updatedUserAddress));

        // ✅ Also update Redux store
        dispatch(updateKeyValue({ key: "userAddress", value: updatedUserAddress }));

        navigate("/shop");
      }
    } catch (error) {
      console.log(error);
    }
  };


  // const handleSuggestionClick = (suggestion) => {
  //   setSearchTerm(suggestion.formattedAddress);
  //   setSuggestions([]);
  //   setIsSuggestionSelected(true); // Show button on suggestion click

  //   // Retrieve the existing userAddress object from local storage
  //   const existingUserAddress =
  //     JSON.parse(localStorage.getItem("userAddress")) || {};

  //   // Update the userAddress with new data (address, lat, lng)
  //   const updatedUserAddress = {
  //     ...existingUserAddress,
  //     address: suggestion.formattedAddress,
  //     lat: suggestion.lat.toString(),
  //     lng: suggestion.lng.toString(),
  //   };

  //   // Save the updated userAddress to local storage
  //   localStorage.setItem("userAddress", JSON.stringify(updatedUserAddress));

  //   // Dispatch updated userAddress to Redux
  //   dispatch(updateKeyValue({ key: "userAddress", value: updatedUserAddress }));

  //   // Now update the pincode in local storage and Redux
  //   const pincode = {
  //     longName: suggestion.postcode,
  //     shortName: suggestion.postcode,
  //     types: ["postal_code"],
  //   };

  //   // Save pincode to local storage
  //   localStorage.setItem("pincode", JSON.stringify(pincode));

  //   // Dispatch pincode to Redux
  //   dispatch(setPincode(pincode));
  // };

  // const handleSearchSubmit = async () => {
  //   if (!isSuggestionSelected) {
  //     Swal.fire({
  //       icon: "warning",
  //       title: "Select a suggestion",
  //       text: "Please select an address from the suggestions before searching.",
  //       confirmButtonColor: "rgb(232, 65, 53)",
  //     });
  //     return;
  //   }

  //   if (!searchTerm.trim() && !address.trim()) {
  //     Swal.fire({
  //       icon: "warning",
  //       title: "Enter your postcode",
  //       text: "Please enter and select a valid address from suggestions.",
  //       confirmButtonColor: "rgb(232, 65, 53)",
  //     });
  //     return;
  //   }

  //   // Find the suggestion that matches the current search term
  //   const selectedSuggestion = suggestions.find(
  //     (suggestion) => suggestion.formattedAddress === searchTerm
  //   );


  //   if (selectedSuggestion) {
  //     try {
  //       const areRestaurantsAvailable = await fetchRestaurants(
  //         selectedSuggestion.lat.toString(),
  //         selectedSuggestion.lng.toString(),
  //         selectedSuggestion.postcode
  //       );

  //       if (!areRestaurantsAvailable) {
  //         Swal.fire({
  //           icon: "info",
  //           title: "Coming Soon!",
  //           text: "We’re not in your area yet, but launching soon. Stay tuned!",
  //           confirmButtonColor: "rgb(232, 65, 53)",
  //           iconColor: "rgb(232, 65, 53)",
  //         });
  //       } else {
  //         // Open the modal
  //         const modal = new bootstrap.Modal(
  //           document.getElementById("address-details")
  //         );
  //         modal.show();
  //       }
  //     } catch (error) {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Oops...",
  //         text: "An error occurred while opening the modal. Please try again.",
  //         confirmButtonColor: "rgb(232, 65, 53)",
  //       });
  //     }
  //   } else {
  //     navigate("/shop");
  //   }
  // };

  const handleSuggestionClick = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setSearchTerm(suggestion.formattedAddress);
    setSuggestions([]);
    setIsSuggestionSelected(true);

    // persist address + pincode (your existing code)
    const existingUserAddress = JSON.parse(localStorage.getItem("userAddress")) || {};
    const updatedUserAddress = {
      ...existingUserAddress,
      address: suggestion.formattedAddress,
      lat: suggestion.lat.toString(),
      lng: suggestion.lng.toString(),
    };
    localStorage.setItem("userAddress", JSON.stringify(updatedUserAddress));
    dispatch(updateKeyValue({ key: "userAddress", value: updatedUserAddress }));

    const pincode = {
      longName: suggestion.postcode,
      shortName: suggestion.postcode,
      types: ["postal_code"],
    };
    localStorage.setItem("pincode", JSON.stringify(pincode));
    dispatch(setPincode(pincode));

    // 👉 Immediately go to next step
    handleSearchSubmit(suggestion);
  };

  // const handleSearchSubmit = async (clickedSuggestion) => {
  //   if (isProcessing) return; // prevent double runs

  //   const choice =
  //     clickedSuggestion ||
  //     selectedSuggestion ||
  //     suggestions.find((s) => s.formattedAddress === searchTerm);

  //   if (!choice && !address.trim()) {
  //     Swal.fire({
  //       icon: "warning",
  //       title: "Enter your postcode",
  //       text: "Please enter and select a valid address from suggestions.",
  //       confirmButtonColor: "rgb(232, 65, 53)",
  //     });
  //     return;
  //   }

  //   try {
  //     setIsProcessing(true);
  //     const areRestaurantsAvailable = await fetchRestaurants(
  //       choice.lat.toString(),
  //       choice.lng.toString(),
  //       choice.postcode
  //     );

  //     if (!areRestaurantsAvailable) {
  //       Swal.fire({
  //         icon: "info",
  //         title: "Coming Soon!",
  //         text: "We’re not in your area yet, but launching soon. Stay tuned!",
  //         confirmButtonColor: "rgb(232, 65, 53)",
  //         iconColor: "rgb(232, 65, 53)",
  //       });
  //     } else {
  //       const modal = new bootstrap.Modal(document.getElementById("address-details"));
  //       modal.show();
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: "An error occurred while opening the modal. Please try again.",
  //       confirmButtonColor: "rgb(232, 65, 53)",
  //     });
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };

  const handleSearchSubmit = async (clickedSuggestion) => {
  if (isProcessing) return;

  const choice =
    clickedSuggestion ||
    selectedSuggestion ||
    suggestions.find((s) => s.formattedAddress === searchTerm);

  // 🚧 Always require a choice; do NOT fall back to `address` here
  if (!choice) {
    Swal.fire({
      icon: "warning",
      title: "Select an address",
      text: "Please select an address from the suggestions before searching.",
      confirmButtonColor: "rgb(232, 65, 53)",
    });
    return;
  }

  try {
    setIsProcessing(true);

    const areRestaurantsAvailable = await fetchRestaurants(
      choice.lat.toString(),
      choice.lng.toString(),
      choice.postcode
    );

    if (!areRestaurantsAvailable) {
      Swal.fire({
        icon: "info",
        title: "Coming Soon!",
        text: "We’re not in your area yet, but launching soon. Stay tuned!",
        confirmButtonColor: "rgb(232, 65, 53)",
        iconColor: "rgb(232, 65, 53)",
      });
    } else {
      const modalEl = document.getElementById("address-details");
      if (!modalEl) throw new Error("Modal element #address-details not found");

      // safer than new Modal(...): reuse or create
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.show();
    }
  } catch (error) {
    console.error("Open modal error:", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "An error occurred while opening the modal. Please try again.",
      confirmButtonColor: "rgb(232, 65, 53)",
    });
  } finally {
    setIsProcessing(false);
  }
};

  const handlebtnclose = () => {
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("address-details")
    );
    if (modal) {
      modal.hide(); // Properly hide the modal and remove the backdrop
    }
  };

  const onSubmitSearch = async (e) => {
    e.preventDefault();
    await handleSearchSubmit();
  };

  useEffect(() => {
    // Set a timeout for 5 seconds
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout); // Cleanup timeout
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <>
        <Helmet>
          <title>
            Buy Fresh Halal Meat Online – Order from Local Butchers | Meatwala
          </title>
          <meta
            name="description"
            content="Order fresh Halal meat online from trusted local halal butchers. Get Halal meat delivery near you with fast service & top-quality cuts. Shop now!"
          />
        </Helmet>
        <Navbar text={"home"} />

        <div className="mytabb overflow-hidden pt-120">
          <Delivery text={"home"} />
        </div>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "calc(100vh - 80px)",
            }}
          >
            <CirclesWithBar
              height="100"
              width="100"
              color="rgb(232, 65, 53)"
              outerCircleColor="rgb(232, 65, 53)"
              innerCircleColor="rgb(232, 65, 53)"
              barColor="rgb(232, 65, 53)"
              ariaLabel="circles-with-bar-loading"
              visible={true}
            />
          </div>
        ) : (
          <div id="home" className="home2 overflow-hidden banner-section">
            <div>
              <div className="row px-3 px-sm-4 px-lg-0">
                <div className="col-lg-6 col-12 d-flex flex-column justify-content-center">
                  <div
                    className="text-section"
                    style={{ maxWidth: "500px", margin: "0 auto" }}
                  >
                    <h2 className="mb-3 font-weight-bold font-large text-center">
                      YOUR LOCAL BUTCHER <br /> DELIVERED TO DOOR
                    </h2>
                    <h3
                      className="mb-4 font-medium text-center"
                      style={{ color: "#555" }}
                    >
                      SKIP THE QUEUE, ORDER FOR COLLECTION OR DELIVERY
                    </h3>
                    <div
                      className=""
                      style={{ position: "relative", width: "100%" }}
                    >
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ width: "100%", marginTop: "20px" }}
                      >
                        <form
                          onSubmit={onSubmitSearch}
                          className="d-flex align-items-center justify-content-center"
                          style={{ width: "100%", marginTop: "20px" }}
                        >
                          <input
                            type="search"
                            className="form-control search-input"
                            placeholder="Enter your postcode"
                            value={`${titl ? titl + ', ' : ''}${searchTerm || address}`}
                            onChange={handleInputChange}
                            onFocus={() => setIsSuggestionSelected(false)}
                            style={{
                              borderRadius: isSuggestionSelected ? "30px 0 0 30px" : "30px",
                              padding: "9px 15px",
                              border: "1px solid #ddd",
                              flex: "none",
                              height: "45px",
                              width: isSuggestionSelected ? "70%" : "100%",
                              maxWidth: "400px",
                            }}
                          />

                          {isSuggestionSelected && (
                            <button
                              type="submit"
                              className="btn btn-primary search-button"
                              style={{
                                borderRadius: "0 30px 30px 0",
                                padding: "11px 20px",
                                backgroundColor: "#E84135",
                                border: "none",
                                height: "45px",
                              }}
                            >
                              Search
                            </button>
                          )}
                        </form>
                        {/* <input
                          type="search"
                          className="form-control search-input"
                          placeholder="Enter your postcode"
                          value={`${titl ? titl + ', ' : ''}${searchTerm || address}`}
                          onChange={handleInputChange}
                          onFocus={() => setIsSuggestionSelected(false)}
                          // onKeyDown={(e) => {
                          //   if (e.key === "Enter") {
                          //     e.preventDefault();
                          //     handleSearchSubmit();
                          //   }
                          // }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                            }
                          }}
                          style={{
                            borderRadius: isSuggestionSelected
                              ? "30px 0px 0px 30px"
                              : "30px 30px 30px 30px",
                            padding: "9px 15px",
                            border: "1px solid #ddd",
                            flex: "none",
                            height: "45px",
                            width: isSuggestionSelected
                              ? "70%" : "100%",
                            maxWidth: "400px",
                          }}
                        />
                        {isSuggestionSelected && (
                          <button
                            className="btn btn-primary search-button"
                            // onClick={handleSearchSubmit}
                            style={{
                              borderRadius: "0 30px 30px 0",
                              padding: "11px 20px",
                              backgroundColor: "#E84135",
                              border: "none",
                              height: "45px",
                            }}
                          >
                            Search
                          </button>
                        )} */}
                      </div>
                      {suggestions.length > 0 && (
                        <ul
                          className="suggestion-list"
                          style={{
                            listStyleType: "none",
                            margin: "10px 0 0",
                            padding: "0",
                            width: "100%",
                            backgroundColor: "#fff",
                            border: "1px solid #ddd",
                            borderRadius: "5px",
                            maxHeight: "200px",
                            overflowY: "auto",
                            position: "absolute",
                            top: "100%",
                            zIndex: 10,
                          }}
                        >
                          {suggestions
                            .filter(
                              (suggestion) =>
                                suggestion.formattedAddress !== searchTerm
                            )
                            .map((suggestion, index) => (
                              <li
                                key={index}
                                onClick={() =>
                                  handleSuggestionClick(suggestion)
                                }
                                style={{
                                  padding: "10px",
                                  cursor: "pointer",
                                  borderBottom: "1px solid #eee",
                                  width: "100%",
                                }}
                              >
                                {suggestion.formattedAddress}
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 position-relative d-flex justify-content-center align-items-center professional-container">
                  <div className="professional-box">
                    <LazyLoadImage
                      src={`${burger}`}
                      alt="Delicious Food"
                      className="professional-image"
                      style={{
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* home section end */}
        {/* featured Restaurants section end */}
        <div className="section-b-space">
          <div className="container">
            <div className="faq-title">
              <h2 className="mt-2 mb-3" style={{ color: "rgb(232, 65, 53)" }}>
                {" "}
                How to Order
              </h2>
              <p className="mt-4">
                Simple steps to get meat and grocery delivered!
              </p>
            </div>

            <div className="row g-2">
              <div className="col-xl-4">
                <div className="card" style={{ height: 200 }}>
                  <div className="card-body text-center">
                    <MdOutlineShareLocation
                      size={55}
                      color="rgb(232, 65, 53)"
                      style={{ marginBottom: "var(--xds-spacing-d)" }}
                    />
                    <h3 className="mb-2">Tell us where you are</h3>
                    <p>
                      Discover nearby halal butchers and grocery stores ready to
                      take your order.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-4">
                <div className="card" style={{ height: 200 }}>
                  <div className="card-body text-center">
                    <TbMeat
                      size={55}
                      color="rgb(232, 65, 53)"
                      style={{ marginBottom: "var(--xds-spacing-d)" }}
                    />
                    <h3 className="mb-2">Find what you need</h3>
                    <p>
                      Search for items or your favourite local halal meat and
                      grocery stores with ease.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-4">
                <div className="card" style={{ height: 200 }}>
                  <div className="card-body text-center">
                    <TbTruckDelivery
                      size={55}
                      color="rgb(232, 65, 53)"
                      style={{ marginBottom: "var(--xds-spacing-d)" }}
                    />
                    <h3 className="mb-2">Order for Delivery or Collection</h3>
                    <p>
                      Get your order delivered straight to your doorstep or skip
                      the queue with click and collect.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* app section starts */}

        {/* app section end */}
        {/* Featured Restaurants section starts */}
        <div className="section-b-space">
          <div className="container">
            <div className="faq-title">
              <h2 className="mt-2 mb-3" style={{ color: "rgb(232, 65, 53)" }}>
                Why Meatwala?
              </h2>
              <p>Fresh halal meat, local butchers, delivered fast.</p>
            </div>
            <div className="row">
              <div className="col-xl-4">
                <div className="card" style={{ height: 280 }}>
                  <div className="card-body">
                    <div className="text-center mb-3">
                      <img
                        src={loyaltylogo}
                        alt="Loyalty Program Logo"
                        style={{
                          width: "50px",
                          height: "50px",
                          marginBottom: "var(--xds-spacing-d)",
                        }}
                      />
                      <h3 className="mb-2">Save Money</h3>
                    </div>
                    <ul className="mylist">
                      <li>
                        <i className="fa fa-check" />
                        <strong> Earn Rewards:</strong> Collect loyalty points
                        with every order and save on future purchases.
                      </li>
                      <li>
                        <i className="fa fa-check" />{" "}
                        <strong>Exclusive Deals:</strong> Unlock special
                        promotions and discounts only available to Meatwala
                        customers.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-4">
                <div className="card" style={{ height: 280 }}>
                  <div className="card-body">
                    <div className="text-center mb-3">
                      <FaHandsHelping
                        size={55}
                        color="rgb(232, 65, 53)"
                        style={{ marginBottom: "var(--xds-spacing-d)" }}
                      />
                      <h3 className="mb-2">Our Promise</h3>
                    </div>
                    <ul className="mylist">
                      <li>
                        <i className="fa fa-check" /> Halal meat and groceries
                        delivered straight to your door from your favourite
                        local stores.
                      </li>
                      <li>
                        <i className="fa fa-check" /> Our mission is to support
                        local businesses and uplift underprivileged communities
                        worldwide.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-4">
                <div className="card" style={{ height: 280 }}>
                  <div className="card-body">
                    <div className="text-center mb-3">
                      <img
                        src={benifit}
                        alt="Logo"
                        style={{
                          width: "50px",
                          height: "50px",
                          marginBottom: "var(--xds-spacing-d)",
                        }}
                      />
                      <h3 className="mb-2">Your Benefits</h3>
                    </div>
                    <ul className="mylist">
                      <li>
                        <i className="fa fa-check" />{" "}
                        <strong>Convenience & Discounts:</strong> Skip the queue
                        and enjoy exclusive offers you won’t find elsewhere.
                      </li>
                      <li>
                        <i className="fa fa-check" />{" "}
                        <strong>Rewards in Both Worlds:</strong> Earn loyalty
                        points while 10p from each order is donated to charity.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="app-section section-b-space home-icon">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 col-md-6 mb-4 mb-md-0">
                <div className="app-img text-center text-md-start">
                  <img
                    className="phone1 img-fluid"
                    src={`${homescreen2}`}
                    alt="app-phone"
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="app-content1">
                  <h3 className="apph3">Be Part of a Bigger Mission!</h3>
                  <h5>
                    Download the Meatwala app to support local butchers, save
                    money with exclusive deals and give back through charitable
                    donations—all in one place!
                  </h5>

                  <h3 className="apph3 mt-2">Download the App</h3>
                  <h5>
                    Click, order and get it delivered fresh.
                  </h5>

                  <div className="app-buttons d-flex justify-content-center justify-content-md-start gap-3 mt-2">
                    <a
                      href="https://apps.apple.com/us/app/meatwala/id6742139486"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className="img-fluid app-btn"
                        src="assets/images/svg/app-store.svg"
                        alt="app-store"
                      />
                    </a>

                    <a
                      href="https://play.google.com/store/apps/details?id=com.app.meatwala&hl=en_GB"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className="img-fluid app-btn"
                        src="assets/images/svg/google-play.svg"
                        alt="google-play"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
        {/* footer section end */}
        {/* mobile fix menu start */}
        {/* <div >
          <FooterMobileMenu />
        </div> */}
        <div
          className="modal address-details-modal fade"
          id="address-details"
          tabIndex={-1}
          aria-labelledby="addModalAddress"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addModalAddress">
                  Help Us Find You
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handlebtnclose}
                />
              </div>
              <div className="modal-body">
                <p className="text-muted small mb-3">
                  To ensure <strong>accurate search results</strong>,{" "}
                  <strong>delivery times</strong>, and <strong>fees</strong>,
                  please tell us where you are on{" "}
                  <span style={{ color: "rgb(232, 65, 53)" }}>
                    {searchTerm}
                  </span>
                  .
                </p>
                <form>
                  <div className="">
                    <label htmlFor="inputBuilding" className="form-label small">
                      Building Number or Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="inputBuilding"
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
                  style={{ backgroundColor: "rgb(232, 65, 53)" }}
                  className="btn btn-primary btn-sm w-100"
                  disabled={!title.trim()}
                  onClick={async (e) => {
                    if (!title.trim()) {
                      Swal.fire({
                        icon: "warning",
                        title: "Building Info Required",
                        text: "Please enter your building number or name before continuing.",
                        confirmButtonColor: "rgb(232, 65, 53)",
                      });
                      return;
                    }

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
      <CookieConsent />
      {/* Show Charity only on mobile view in SearchHome */}

      {windowWidth <= 768 && (
        <div style={{ background: '#fff', padding: '10px 0' }}>
          <Charity />
        </div>
      )}
    </div>
  );
};

export default Home;
