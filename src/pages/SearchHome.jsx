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
import Swal from "sweetalert2";
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
import { useRef } from "react";

const Home = () => {
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionSelected, setIsSuggestionSelected] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedAddress = JSON.parse(localStorage.getItem("userAddress"));
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [titl, setTitl] = useState("");
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [recentLocations, setRecentLocations] = useState([]);
  const [rawInput, setRawInput] = useState("");

  useEffect(() => {
    if (showLocationPopup && inputRef.current) {
      inputRef.current.blur();
    }
  }, [showLocationPopup]);

  useEffect(() => {
    const savedAddress = localStorage.getItem("userAddress");
    console.log("saved address", savedAddress)
    if (savedAddress) {
      const parsedAddress = JSON.parse(savedAddress);
      setTitl(parsedAddress.title || "");
      setTitle(parsedAddress.title || "");
      setAddress(parsedAddress.address || "");

      if (parsedAddress.address && parsedAddress.lat && parsedAddress.lng) {
        setSelectedSuggestion({
          formattedAddress: parsedAddress.address,
          lat: parseFloat(parsedAddress.lat),
          lng: parseFloat(parsedAddress.lng),
          postcode:
            parsedAddress.postcode ||
            JSON.parse(localStorage.getItem("pincode") || "{}").longName ||
            "",
        });
        setIsSuggestionSelected(true);
      }
    }
  }, []);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("recentLocations")) || [];
    setRecentLocations(saved);
  }, []);

  // const extractNumberFromAddress = (address) => {
  //   if (!address) return null;

  //   const numberMatch = address.match(/^\d+/);
  //   return numberMatch ? numberMatch[0] : null;
  // };

  const extractNumberFromAddress = (address) => {
    if (!address) return null;

    const match = address.trim().match(/^(\d+[A-Za-z\-]*)/);
    return match ? match[1] : null;
  };

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

  const fetchRestaurants = async (lat, lng, postcode) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const payload = {
        istakeway: "0",
        lat,
        lng,
        pincode: postcode,
        userid: storedUser?.userid || "",
        isdelivery: "1",
      };

      const response = await search(payload);

      if (
        response?.status === "1" &&
        Array.isArray(response?.searchrestauarant) &&
        response.searchrestauarant.length > 0
      ) {
        setRestaurants(response.searchrestauarant);
        return true;
      } else {
        setRestaurants([]);
        return false;
      }
    } catch (err) {
      console.log(err, "errors");
      return false;
    }
  };

  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get(
        // `https://partnermeatwala.com/api/customer/geocode?place=${query}`,
        `https://partnermeatwala.com/api/customer/geocode?place=${encodeURIComponent(query)}`,
      );
      if (response.data && response.data.results) {
        const results = response.data.results.map((result) => {
          const location = result.geometry.location;
          const postcodeComponent = result.addressComponents.find((comp) =>
            comp.types.includes("postal_code"),
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

  // const handleInputChange = (e) => {
  //   setTitl("");
  //   setAddress("");
  //   setSearchTerm(e.target.value);
  //   setIsSuggestionSelected(false);
  // };

  const handleInputChange = (e) => {
    setTitl("");
    setAddress("");
    setSearchTerm(e.target.value);
    setRawInput(e.target.value);
    setIsSuggestionSelected(false);
  };

  const addressAdd = async (e) => {
    if (e) e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const choice =
      selectedSuggestion ||
      suggestions.find((s) => s.formattedAddress === searchTerm);

    if (!choice) {
      Swal.fire({
        icon: "warning",
        title: "Select an address",
        text: "Please select an address from the suggestions before continuing.",
        confirmButtonColor: "rgb(232, 65, 53)",
      });
      return;
    }

    const data = {
      userid: storedUser?.userid,
      title: title,
      address: choice.formattedAddress,
      lat: choice.lat.toString(),
      lng: choice.lng.toString(),
      postcode: choice.postcode || "",
    };

    try {
      const add = await addcustinfo(data);

      if (add.status === "1") {
        const existingUserAddress =
          JSON.parse(localStorage.getItem("userAddress")) || {};
        const updatedUserAddress = {
          ...existingUserAddress,
          title: title,
          address: choice.formattedAddress,
          lat: choice.lat.toString(),
          lng: choice.lng.toString(),
          postcode: choice.postcode || existingUserAddress.postcode || "",
        };
        localStorage.setItem("userAddress", JSON.stringify(updatedUserAddress));
        dispatch(
          updateKeyValue({ key: "userAddress", value: updatedUserAddress }),
        );

        navigate("/shop");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveRecentLocation = (location) => {
    let recents = JSON.parse(localStorage.getItem("recentLocations")) || [];

    // duplicate remove
    recents = recents.filter(
      (item) => item.formattedAddress !== location.formattedAddress
    );

    // newest add
    recents.unshift(location);

    // only keep last 5
    recents = recents.slice(0, 5);

    localStorage.setItem("recentLocations", JSON.stringify(recents));
    setRecentLocations(recents);
  };

  const handleSuggestionClick = async (suggestion) => {
    saveRecentLocation(suggestion);

    setSelectedSuggestion(suggestion);
    setSearchTerm(suggestion.formattedAddress);
    setSuggestions([]);
    setIsSuggestionSelected(true);

    const existingUserAddress =
      JSON.parse(localStorage.getItem("userAddress")) || {};

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

    const addressNumber =
      extractNumberFromAddress(rawInput) ||
      extractNumberFromAddress(suggestion.formattedAddress);

    if (addressNumber) {
      setTitle(addressNumber);
      await handleAutoSubmit(suggestion, addressNumber);
      return;
    }

    setShowAddressModal(true);
  };

  const handleAutoSubmit = async (suggestion, roomNumber) => {
    if (isProcessing) return;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    // const addressWithoutNumber = suggestion.formattedAddress
    //   .replace(/^\d+\s*/, "")
    //   .trim();
    const addressWithoutNumber = suggestion.formattedAddress;

    const data = {
      userid: storedUser?.userid,
      title: roomNumber,
      address: addressWithoutNumber,
      lat: suggestion.lat.toString(),
      lng: suggestion.lng.toString(),
      postcode: suggestion.postcode || "",
    };

    try {
      setIsProcessing(true);
      const add = await addcustinfo(data);

      if (add.status === "1") {
        const existingUserAddress =
          JSON.parse(localStorage.getItem("userAddress")) || {};
        const updatedUserAddress = {
          ...existingUserAddress,
          title: roomNumber,
          address: addressWithoutNumber,
          lat: suggestion.lat.toString(),
          lng: suggestion.lng.toString(),
          postcode: suggestion.postcode || existingUserAddress.postcode || "",
        };
        localStorage.setItem("userAddress", JSON.stringify(updatedUserAddress));
        dispatch(
          updateKeyValue({ key: "userAddress", value: updatedUserAddress }),
        );

        const ok = await fetchRestaurants(
          suggestion.lat.toString(),
          suggestion.lng.toString(),
          suggestion.postcode,
        );

        if (ok) {
          navigate("/shop");
        } else {
          Swal.fire({
            icon: "info",
            title: "Coming Soon!",
            text: "We're not in your area yet, but launching soon. Stay tuned!",
            confirmButtonColor: "rgb(232, 65, 53)",
            iconColor: "rgb(232, 65, 53)",
          });
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save address. Please try again.",
        confirmButtonColor: "rgb(232, 65, 53)",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Modify handleSearchSubmit to handle the number check in address
  const handleSearchSubmit = async (clickedSuggestion) => {
    if (isProcessing) return;

    const stored = JSON.parse(localStorage.getItem("userAddress") || "null");
    const fallbackChoice =
      stored && stored.address && stored.lat && stored.lng
        ? {
          formattedAddress: stored.address,
          lat: parseFloat(stored.lat),
          lng: parseFloat(stored.lng),
          postcode:
            stored.postcode ||
            JSON.parse(localStorage.getItem("pincode") || "{}").longName ||
            "",
        }
        : null;

    const choice =
      clickedSuggestion ||
      selectedSuggestion ||
      suggestions.find((s) => s.formattedAddress === searchTerm) ||
      fallbackChoice;

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

      const addressNumber =
        extractNumberFromAddress(rawInput) ||
        extractNumberFromAddress(choice.formattedAddress);

      if (addressNumber) {
        setTitle(addressNumber);
        await handleAutoSubmit(choice, addressNumber);
        return;
      }

      const ok = await fetchRestaurants(
        choice.lat.toString(),
        choice.lng.toString(),
        choice.postcode,
      );

      if (!ok) {
        Swal.fire({
          icon: "info",
          title: "Coming Soon!",
          text: "We're not in your area yet, but launching soon. Stay tuned!",
          confirmButtonColor: "rgb(232, 65, 53)",
          iconColor: "rgb(232, 65, 53)",
        });
      } else {
        setShowAddressModal(true);
      }
    } catch (err) {
      console.error("Search error:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred. Please try again.",
        confirmButtonColor: "rgb(232, 65, 53)",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handlebtnclose = () => {
    setShowAddressModal(false);
  };

  const onSubmitSearch = async (e) => {
    if (e) e.preventDefault();

    if (searchTerm) {
      const addressNumber = extractNumberFromAddress(searchTerm);
      if (addressNumber) {
        try {
          const response = await axios.get(
            `https://partnermeatwala.com/api/customer/geocode?place=${encodeURIComponent(
              searchTerm,
            )}`,
          );

          if (
            response.data &&
            response.data.results &&
            response.data.results.length > 0
          ) {
            const result = response.data.results[0];
            const location = result.geometry.location;
            const postcodeComponent = result.addressComponents.find((comp) =>
              comp.types.includes("postal_code"),
            );

            const suggestion = {
              formattedAddress: result.formattedAddress,
              lat: location.lat,
              lng: location.lng,
              postcode: postcodeComponent ? postcodeComponent.longName : "",
            };

            setTitle(addressNumber);
            await handleAutoSubmit(suggestion, addressNumber);
            return;
          }
        } catch (error) {
          console.error("Geocoding error:", error);
        }
      }
    }

    await handleSearchSubmit();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log(address, "address");
  console.log(title, "title");

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

        {/* <div className="mytabb overflow-hidden pt-120"> */}
        <Delivery text={"home"} />
        {/* </div> */}
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
            <div
              style={{
                marginTop:
                  window.innerWidth <= 821 && window.innerWidth >= 700
                    ? "100px"
                    : "0px",
              }}
            >
              <div
                className="row px-3 px-sm-4 px-lg-0"
                style={{
                  marginTop: window.innerWidth < 992 ? "3rem" : "0",
                }}
              >
                <div
                  className="col-lg-6 col-12 d-flex flex-column  justify-content-center"
                  style={{
                    marginTop: window.innerWidth < 992 ? "3rem" : "0",
                  }}
                >
                  <div
                    className="text-section"
                    style={{ maxWidth: "500px", margin: "0 auto" }}
                  >
                    <h2
                      className="mb-4 font-weight-bold font-large text-center"
                      style={{ fontSize: "50px" }}
                    >
                      YOUR LOCAL BUTCHER <br /> DELIVERED TO DOOR
                    </h2>

                    <h3
                      className="mb-4 font-medium text-center"
                      style={{ color: "#555", fontSize: "20px" }}
                    >
                      SKIP THE QUEUE, ORDER FOR COLLECTION OR DELIVERY
                    </h3>
                    <div
                      className="mb-4"
                      style={{ position: "relative", width: "100%" }}
                    >
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ width: "100%" }}
                      >
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ width: "100%" }}
                        >
                          <input
                            type="search"
                            className="form-control search-input"
                            placeholder="Enter your postcode"
                            value={
                              searchTerm
                                ? searchTerm
                                : titl || address
                                  ? `${titl} ${address}`.trim()
                                  : ""
                            }
                            onChange={handleInputChange}
                            onClick={() => {
                              if (windowWidth <= 768) {
                                setShowLocationPopup(true);
                              }
                            }}

                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                              }
                            }}

                            onFocus={() => {
                              setIsSuggestionSelected(false);
                              if (searchTerm || titl || address) {
                                setSearchTerm("");
                                setTitl("");
                                setAddress("");
                                setSelectedSuggestion(null);
                              }
                            }}

                            style={{
                              borderRadius: isSuggestionSelected
                                ? "30px 0 0 30px"
                                : "30px",
                              padding: "9px 15px",
                              border: "1px solid #ddd",
                              height: "45px",
                              width: isSuggestionSelected ? "70%" : "100%",
                              maxWidth: "400px",
                            }}
                          />

                          {isSuggestionSelected && (
                            <button
                              type="button"
                              onClick={onSubmitSearch}
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
                        </div>
                      </div>
                      {/* {suggestions.length > 0 && ( */}
                      {suggestions.length > 0 && windowWidth > 768 && (
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
                                suggestion.formattedAddress !== searchTerm,
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
                <div
                  className="col-lg-6 position-relative d-flex justify-content-center align-items-center professional-container"
                  // style={{ padding: "100px" }}
                  style={{
                    padding: window.innerWidth <= 768 ? "10px" : "80px",
                  }}
                >
                  <div
                    className="professional-box"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <LazyLoadImage
                      src={`${burger}`}
                      alt="Delicious Food"
                      className="professional-image"
                      style={{
                        width: "100%",
                        marginLeft: window.innerWidth < 1025 ? "0px" : "-100px",
                        objectFit: "cover",
                        border: "6px solid red",
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

                  <h3 className="apph3 mt-4">Download the App</h3>
                  <h5>Click, order and get it delivered fresh.</h5>

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
        {showAddressModal && (
          <div
            className="modal address-details-modal fade show"
            id="address-details"
            tabIndex={-1}
            aria-labelledby="addModalAddress"
            aria-hidden="true"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div
                className="modal-content"
                style={{ borderRadius: 20, border: "none", overflow: "hidden" }}
              >
                <div
                  className="modal-header"
                  style={{
                    background: "#E84135",
                    color: "#fff",
                    padding: "18px 22px",
                    position: "relative",
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
                      <h5
                        className="modal-title m-0 fw-semibold"
                        style={{ fontSize: "16px" }}
                      >
                        Help Us Find You
                      </h5>
                      <div
                        className="mt-1"
                        style={{
                          fontSize: "12px",
                          opacity: 0.9,
                          lineHeight: "1.3",
                        }}
                      >
                        Enter your building details for accurate delivery
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn-close btn-close-white"
                      style={{
                        position: "absolute",
                        right: "20px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                      onClick={handlebtnclose}
                      aria-label="Close"
                    />
                  </div>
                </div>

                <div className="modal-body" style={{ padding: "20px" }}>
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
                          {selectedSuggestion?.formattedAddress ||
                            searchTerm ||
                            address ||
                            "No address selected"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <form className="row">
                    <div className="col-12">
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
                    </div>
                  </form>
                </div>

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
                      handlebtnclose();
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
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
      <CookieConsent />

      {showLocationPopup && windowWidth <= 768 && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "#1e1e1e",
            zIndex: 9999,
            color: "#fff",
            padding: "15px",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <h5 style={{ margin: 0, fontWeight: "600" }}>Enter your location</h5>

            <button
              onClick={() => setShowLocationPopup(false)}
              style={{
                background: "transparent",
                border: "1px solid #666",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                color: "#fff",
                fontSize: "16px",
              }}
            >
              ✕
            </button>
          </div>

          {/* Search Input */}
          <div style={{ position: "relative", marginBottom: "15px" }}>
            {/* <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Enter your postcode"
              style={{
                width: "100%",
                padding: "12px 40px 12px 15px",
                borderRadius: "12px",
                border: "1px solid #666",
                background: "#2b2b2b",
                color: "#fff",
                fontSize: "16px",
                outline: "none",
              }}
            /> */}
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Enter your postcode"
              style={{
                width: "100%",
                padding: "12px 40px 12px 15px",
                borderRadius: "12px",
                border: "1px solid #666",
                background: "#2b2b2b",
                color: "#fff",
                fontSize: "16px",
                outline: "none",
              }}
            />

            {/* Clear button */}
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  border: "none",
                  background: "#444",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  color: "#fff",
                  fontSize: "14px",
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Suggestions */}
          <div>
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => {
                  handleSuggestionClick(suggestion);
                  setShowLocationPopup(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 5px",
                  borderBottom: "1px solid #333",
                  cursor: "pointer",
                }}
              >
                <i
                  className="ri-map-pin-line"
                  style={{ fontSize: "18px", color: "#e84135" }}
                ></i>

                <span style={{ fontSize: "14px", color: "#ddd" }}>
                  {suggestion.formattedAddress}
                </span>
              </div>
            ))}
          </div>

          {recentLocations?.length > 0 && (
            <div style={{ marginTop: "10px" }}>
              <div
                style={{
                  fontSize: "13px",
                  color: "#aaa",
                  marginBottom: "8px",
                }}
              >
                Recent searches
              </div>

              {recentLocations.map((loc, index) => (
                <div
                  key={index}
                  onClick={() => {
                    handleSuggestionClick(loc);
                    setShowLocationPopup(false);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 0",
                    borderBottom: "1px solid #333",
                    cursor: "pointer",
                  }}
                >
                  <i
                    className="ri-map-pin-line"
                    style={{ fontSize: "18px", color: "#e84135" }}
                  ></i>

                  <span>{loc.formattedAddress}</span>
                </div>
              ))}
            </div>
          )}

          {/* Google label */}
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              left: "15px",
              fontSize: "12px",
              color: "#aaa",
            }}
          >
            Google
          </div>
        </div>
      )}

      {windowWidth <= 768 && (
        <div style={{ background: "#fff", padding: "10px 0" }}>
          <Charity />
        </div>
      )}
    </div>
  );
};

export default Home;