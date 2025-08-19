import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getcart } from "../store/feature/cartSlice";
import { addToCart, addOrder, loyalty } from "../utils/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FooterMobileMenu from "../components/FooterMobileMenu";
import Delivery from "../components/delivery";
import { Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setActiveTab } from "../store/feature/userSlice";
import axios from "axios";
// import moment from 'moment';
import moment from "moment-timezone";
import { customerdetail } from "../utils/api";

const Cart = () => {
  const API_URL = "https://partnermeatwala.com/api/customer";
  const [isLoading, setIsLoading] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [userData, setUserData] = useState({});
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [showError, setShowError] = useState(false);
  const storedUser = JSON.parse(localStorage.getItem("user")) || "";
  const Address = JSON.parse(localStorage.getItem("userAddress"));
  const { cartItems } = useSelector((store) => store.Cart);

  const [cartItem, setCartItem] = useState(null);
  const [CartFoods, setCartFoods] = useState([]);
  const [quantities, setQuantities] = useState([]); // State to store quantities
  const [show, setShow] = useState(false);
  const [buttonText, setButtonText] = useState("PAY ONLINE");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartId, setCartId] = useState("");
  const [restId, setRestId] = useState("");
  const [type, setType] = useState("");
  // const [catIds, setCatIds] = useState([]);
  // const [foodIds, setFoodIds] = useState([]);
  // const [typeIds, setTypeIds] = useState([]);
  const [extraTopupIds, setExtraTopupIds] = useState([]);
  const [couponId, setCouponId] = useState(null);
  const [foodQntity, setFoodQntity] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [pincode, setPincode] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [isCouponValid, setIsCouponValid] = useState(true);
  const [inputCouponCode, setInputCouponCode] = useState("");
  const activeTab = useSelector((store) => store.User.activeTab);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0); // Example: Total available loyalty points
  const [appliedLoyaltyPoints, setAppliedLoyaltyPoints] = useState(0); // Loyalty points applied to the cart
  const [isLoyaltyApplied, setIsLoyaltyApplied] = useState(false); // Track if loyalty points are applied
  const [loyaltyError, setLoyaltyError] = useState(""); // Error message for loyalty points validation
  const [error, setError] = useState("");

  const handleCheckoutClick = () => {
    if (!Address?.address?.trim()) {
      handleClose(); // Close any existing modals
      setError("Please enter your address before proceeding to checkout.");
      return; // Stop further execution
    }

    // Clear the error if address exists
    setError("");
    handleShow(); // Show the modal
  };

  useEffect(() => {
    const user = localStorage.getItem("user"); // Check if the user is logged in
    if (!user) {
      navigate("/login"); // Redirect to login if user is not logged in
    }
  }, [navigate]);
  // coupon
  const handleCouponInputChange = (event) => {
    setInputCouponCode(event.target.value.toUpperCase());
    setIsCouponValid(true); // Reset coupon validity on input change
  };


  const validateCoupon = () => {
    if (!inputCouponCode) {
      setIsCouponValid(false);
      return "Please enter a coupon code.";
    }

    const coupon = cartItems.couponlist.find(
      (c) => (c.couponname || "").toUpperCase() === inputCouponCode.toUpperCase()
    );

    if (!coupon) {
      setIsCouponValid(false);
      return "Invalid coupon code.";
    }

    const currentDate = new Date();
    const expiryDate = new Date(coupon.expirydate);
    if (expiryDate < currentDate) {
      setIsCouponValid(false);
      return "Coupon has expired.";
    }

    if (parseFloat(coupon.minvalue) > totalFoodPrice) {
      setIsCouponValid(false);
      return `Minimum order value of ${coupon.minvalue} is required for this coupon.`;
    }

    setIsCouponValid(true);
    return null;
  };

  const applyCoupon = () => {
    const validationMessage = validateCoupon();
    if (validationMessage) {
      setSelectedCoupon(null);
      toast.error(validationMessage); // Show validation message
      if (!inputCouponCode) {
        setIsCouponValid(true); // Reset validity if input is empty
      }
    } else {
      const coupon = cartItems.couponlist.find(
        (c) => (c.couponname || "").toUpperCase() === inputCouponCode.toUpperCase()
      );
      setSelectedCoupon(coupon);
      setIsCouponValid(true); // Ensure coupon is valid after successful application
    }
  };

  // end

  useEffect(() => {
    dispatch(getcart());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (
      cartItems &&
      cartItems.cartmasters &&
      cartItems.cartmasters.length > 0
    ) {
      const cartmaster = cartItems.cartmasters[0];
      setFoodQntity(cartmaster?.foods.length);
      setQuantities(cartmaster.foods.map((food) => food.quantity || 1));
      const extraTopupIds = cartmaster.foods.flatMap((food) =>
        food.carttopupdetails.flatMap((topup) =>
          topup.cartextratopupdetails.map((detail) => detail.extratopupid)
        )
      );

      setCartFoods(cartmaster.foods);
      setCartItem(cartmaster);
      setQuantities(cartmaster.foods.map((food) => food.quantity || 1));
      // Set values for the additional fields
      setCartId(cartmaster.cartid);
      setRestId(cartmaster.restid);
      setType(cartmaster.type);

      setExtraTopupIds(extraTopupIds);
      const loyaltyPointValue = parseFloat(cartItems?.loyaltipoint);

      // Check if the parsed value is a valid number
      if (!isNaN(loyaltyPointValue)) {
        setLoyaltyPoints(loyaltyPointValue);
      } else {
        setLoyaltyPoints(0); // Fallback to 0 if the value is invalid
      }
    }

    if (
      cartItems &&
      cartItems.deliveryfeesdata &&
      cartItems.deliveryfeesdata.length > 0
    ) {
      const fees = cartItems.deliveryfeesdata.map(
        (delivery) => delivery.pincode
      );
      setPincode(fees);
    }
  }, [cartItems]);

  // const calculateCouponDiscount = () => {
  //   let discount = 0;

  //   if (selectedCoupon) {
  //     const couponValue = parseFloat(selectedCoupon.value) || 0;
  //     const minOrderValue = parseFloat(selectedCoupon.minvalue) || 0;

  //     if (totalFoodPrice >= minOrderValue) {
  //       if (selectedCoupon.type === "Percentage") {
  //         discount = (totalFoodPrice * couponValue) / 100;
  //       }
  //       //  else if (selectedCoupon.type === "Amount") {
  //       //   discount = couponValue;
  //       // }
  //     }
  //   }

  //   return discount;
  // };

  const calculateCouponDiscount = () => {
    let discount = 0;

    if (selectedCoupon) {
      const couponValue = parseFloat(selectedCoupon.value) || 0;
      const minOrderValue = parseFloat(selectedCoupon.minvalue) || 0;

      if (totalFoodPrice >= minOrderValue) {
        if (selectedCoupon.type === "Percentage") {
          discount = (totalFoodPrice * couponValue) / 100;
        } else if (selectedCoupon.type === "Amount") {
          discount = couponValue;
        }
      }
    }

    return discount;
  };

  const totalFoodPrice = CartFoods.reduce((total, food, index) => {
    const typeCost = parseFloat(food.typecost) || 0;
    const extraTopUpCost = food.carttopupdetails.reduce((acc, topup) => {
      return (
        acc +
        parseFloat(
          topup.cartextratopupdetails.reduce((acc2, extra) => {
            return acc2 + parseFloat(extra.extratopupcost) || 0;
          }, 0)
        ) || 0
      );
    }, 0);
    return total + (typeCost + extraTopUpCost) * quantities[index];
  }, 0);

  const serviceCharge = parseFloat(cartItem?.servicecharge) || 0;
  const deliveryCharge = parseFloat(cartItem?.deliverycharge) || 0;
  const couponDiscount = calculateCouponDiscount();

  const totalAmountToPay =
    activeTab === "Delivery"
      ? totalFoodPrice + serviceCharge + deliveryCharge - couponDiscount
      : totalFoodPrice + serviceCharge - couponDiscount;

  // Deduct applied loyalty points
  const totalAmountAfterLoyalty = totalAmountToPay - appliedLoyaltyPoints;

  const minOrder = cartItem ? parseFloat(cartItem.minimumorder) || 0 : 0;
  const isCheckoutDisabled = totalAmountAfterLoyalty < minOrder;
  const amountToAdd = isCheckoutDisabled
    ? minOrder - totalAmountAfterLoyalty
    : 0;

  // console.log("Total Food Price:", totalFoodPrice);
  // console.log("Service Charge:", serviceCharge);
  // console.log("Delivery Charge:", deliveryCharge);
  // console.log("Coupon Discount:", couponDiscount);
  // console.log("Total Amount to Pay:", totalAmountToPay);

  // increament or decreament

  const handleProceed = async (food, quantity) => {
    if (!food || quantity === undefined || quantity === null) {
      // console.error("Invalid food or quantity", { food, quantity });
      return;
    }

    const sendData = {
      userid: storedUser?.userid,
      restId: restId,
      type: activeTab == "Delivery" ? "delivery" : "takeaway",
      catid: food?.catid || "",
      foodid: food?.foodid || "",
      typeid: food?.typeid || "",
      extratopupid: extraTopupIds.length > 0 ? extraTopupIds : [], // Ensure this is a string
      quantity: quantity.toString(),
      cartid: cartId,
      cartdetailid: food.cartdetailid,
    };

    // console.log(sendData, "datataaaaa");
    const data = await addToCart(sendData);
    // dispatch(getcart());
  };

  const handleQuantityChange = (index, newQuantity) => {
    const newQuantities = [...quantities];
    newQuantities[index] = newQuantity;
    setQuantities(newQuantities);

    // Ensure food is valid before proceeding
    const food = CartFoods[index];
    if (food) {
      handleProceed(food, newQuantity);
    } else {
      console.error("Food is undefined at index:", index);
    }
  };

  // const handleIncrement = (index) => {
  //   if (quantities[index]) {
  //     handleQuantityChange(index, quantities[index] + 1);
  //   }
  // };

  // const handleDecrement = (index) => {
  //   if (quantities[index]) {
  //     handleQuantityChange(index, quantities[index] - 1);
  //   }else{
  //     dispatch(getcart());
  //     console.log("get cart api ")
  //   }
  // };

  // end

  const handleIncrement = (index) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      // Parse the current quantity to ensure it's a number
      const currentQuantity = parseInt(newQuantities[index], 10) || 0;
      newQuantities[index] = currentQuantity + 1; // Increment quantity
      handleProceed(CartFoods[index], newQuantities[index]); // Call to handleProceed
      return newQuantities;
    });
  };


  // const handleDecrement = (index) => {
  //   setQuantities((prevQuantities) => {
  //     const newQuantities = [...prevQuantities];
  //     const currentQuantity = parseInt(newQuantities[index], 10) || 0;
  //     if (currentQuantity > 0) {
  //       newQuantities[index] = currentQuantity - 1; // Decrement quantity
  //       handleProceed(CartFoods[index], newQuantities[index]); // Call to handleProceed
  //     } else {
  //       console.log("Cannot decrement further.");
  //     }
  //     return newQuantities;
  //   });
  // };

  // const handleDecrement = (index) => {
  //   setQuantities((prevQuantities) => {
  //     const newQuantities = [...prevQuantities];
  //     const currentQuantity = parseInt(newQuantities[index], 10) || 0;

  //     if (currentQuantity > 1) {
  //       newQuantities[index] = currentQuantity - 1;
  //       handleProceed(CartFoods[index], newQuantities[index]);
  //     } else {
  //       setCartFoods((prevCart) => prevCart.filter((_, i) => i !== index));
  //       return newQuantities.filter((_, i) => i !== index);
  //     }

  //     return newQuantities;
  //   });
  // };

  const handleDecrement = (index) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      const currentQuantity = parseInt(newQuantities[index], 10) || 0;

      if (currentQuantity > 1) {
        newQuantities[index] = currentQuantity - 1;
        handleProceed(CartFoods[index], newQuantities[index]); // Call API or update state
      } else {
        // Remove item when quantity reaches 0
        setCartFoods((prevCart) => {
          const updatedCart = prevCart.filter((_, i) => i !== index);
          if (updatedCart.length === 0) {
            navigate(-1);
          }
          return updatedCart;
        });

        return newQuantities.filter((_, i) => i !== index);
      }

      return newQuantities;
    });
  };

  const handleNavigate = async () => {
    const savedTab = localStorage.getItem("user");
    if (savedTab) {
      navigate("/payment");
    } else {
      navigate("/login");
    }
  };

  // const handleCashOnDeliveryClick = () => {
  //   setButtonText('CONFIRM ORDER');
  // };

  // const handleConfirmOrderClick = () => {
  //   if (buttonText === 'CONFIRM ORDER') {
  //     Addorder()
  //     navigate('/confirmorder');
  //   }
  // };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // add order api

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // this is for loyalty
  const [totalPoints, setTotalPoints] = useState(0);

  const points = async () => {
    const data = {
      userid: storedUser?.userid,
    };

    try {
      const response = await loyalty(data);
      if (response.status === "1") {
        const total = response.details.reduce(
          (sum, item) => sum + parseFloat(item.loyaltipoint),
          0
        );
        setTotalPoints(total);
      } else {
        console.error("Error fetching loyalty points:", response.returnmsg);
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };

  useEffect(() => {
    points();
  }, []);

  // end loyalty
  const [instruction, setInstruction] = useState("");

  const handleInstructionChange = (e) => {
    setInstruction(e.target.value);
  };

  const [paymentMode, setPaymentMode] = useState("Stripe"); // Default payment modeconst
  // handlePaymentModeChange = (mode) => {
  //   setPaymentMode(mode);
  // };

  const Addorder = async () => {
    setIsLoading(true);
    const paymentDateTime = getCurrentDateTime();

    // if (!isCouponValid) {
    //   toast.error(
    //     "Total amount is less than the minimum order value required for the selected coupon."
    //   );
    //   setIsLoading(false);
    //   return;
    // }

    const data = {
      customerid: storedUser?.userid,
      orderreferenceid: "",
      customerreqtime: selectedTime,
      ordertype: activeTab == "Collection" ? "takeaway" : activeTab,
      deliverypostcode: pincode,
      restaurantid: restId,
      deliveryaddress: `${Address?.title}, ${Address?.address}`,
      couponcodeid: couponId,
      instructionofcooking: instruction,
      loyaltipointsconsume: "0.0",
      totalitem: foodQntity.toString(),
      coupondiscount: parseFloat(couponDiscount).toFixed(2),
      loyaltidiscount: appliedLoyaltyPoints.toString(),
      deliverycharges: cartItem?.deliverycharge,
      servicecharges: cartItem?.servicecharge,
      netpayamount: parseFloat(totalAmountAfterLoyalty).toFixed(2),
      paymentmode: paymentMode,
      paymentreferenceid: "",
      paymentdatetime: paymentDateTime,
      orderdate: paymentDateTime,
    };

    try {
      const order = await addOrder(data);
      if (order.status == "0") {
        navigate("/cancel");
      }

      if (order.status === "1") {
        if (paymentMode === "Stripe") {
          window.location.href = order.paymenturl;
        } else {
          toast.success("Order placed successfully!");
          navigate("/confirmorder");
        }
      } else {
        toast.error("Failed to place the order. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while placing the order.");
    } finally {
      setIsLoading(false); // stop loading
    }
  };

  const handlePaymentModeChange = (mode) => {
    setPaymentMode(mode);
  };
  const handleConfirmOrderClick = () => {
    if (buttonText === "CONFIRM ORDER") {
      Addorder();
      navigate("/confirmorder");
    }
  };

  const handleCashOnDeliveryClick = async () => {
    handlePaymentModeChange("Cash On Delivery");
    setButtonText("CONFIRM ORDER");
    if (buttonText === "CONFIRM ORDER") {
      const res = await Addorder();
      dispatch(getcart());
      // navigate('/confirmorder');
    }
    // Addorder()
  };

  const handlePayOnlineClick = async () => {
    handlePaymentModeChange("Stripe");
    await Addorder();
  };

  const handleCouponChange = (e) => {
    const couponId = e.target.value;
    const selectedCoupon = cartItems.couponlist.find(
      (coupon) => coupon.couponid === couponId
    );
    setSelectedCoupon(selectedCoupon);
  };

  const [selectedTime, setSelectedTime] = useState("As soon as possible");
  const [timeOptions, setTimeOptions] = useState(["As soon as possible"]);

  // Get the UK current time
  const getUkCurrentTime = () => {
    return moment.tz("Europe/London"); // Get current time in UK
  };

  // Determine open and close times based on active tab
  const openTime =
    activeTab === "Delivery"
      ? cartItem?.deliveryopentime
      : cartItem?.takeawayopentime;
  const closeTime =
    activeTab === "Delivery"
      ? cartItem?.deliveryclosedtime
      : cartItem?.takeawayclosedtime;
  // const closeTime = activeTab === "Delivery" ? cartItem?.deliveryclosedtime : cartItem?.takeawayclosedtime;


  // Function to generate time slots starting from the current time
  const generateTimeSlots = (openTime, closeTime, currentTime, timeGap) => {


    if (!openTime || !closeTime || !currentTime) {
      console.error("One or more inputs are undefined or invalid.");
      return [];
    }

    const timeSlots = [];

    // Convert time strings (e.g., "12:00 AM") to minutes since midnight
    const toMinutes = (time) => {
      if (typeof time !== "string") {
        console.error("Invalid time format: ", time);
        return 0; // Return 0 if time is not a string
      }

      const timeParts = time.split(/[: ]/); // Split the time by ":" and space
      if (timeParts.length < 3) {
        console.error("Invalid time format: ", time);
        return 0; // Return 0 if time format is not as expected
      }

      const [hour, minute, period] = timeParts;

      // Validate if period (AM/PM) exists and is valid
      if (!period || !["AM", "PM"].includes(period.toUpperCase())) {
        console.error("Invalid period format: ", period);
        return 0; // Return 0 if period is missing or invalid
      }

      const isPM = period.toUpperCase() === "PM";
      const hourInt = parseInt(hour, 10);
      const minuteInt = parseInt(minute, 10);

      return (
        (isPM && hourInt < 12 ? hourInt + 12 : hourInt % 12) * 60 + minuteInt
      );
    };

    const openMinutes = toMinutes(openTime);
    const closeMinutes = toMinutes(closeTime);
    const currentMinutes = toMinutes(currentTime);

    // Calculate current time + 45 minutes
    let startMinutes = currentMinutes + 45;

    // Ensure startMinutes is within the open and close times range
    if (startMinutes < openMinutes) {
      startMinutes = openMinutes; // If the calculated start time is before the open time, use open time
    } else if (startMinutes >= closeMinutes) {
      return timeSlots; // If the calculated start time is after the close time, no slots available
    }

    // Generate time slots
    for (
      let minutes = startMinutes;
      minutes < closeMinutes;
      minutes += timeGap
    ) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      const period = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12;
      const displayMinutes = mins.toString().padStart(2, "0");
      timeSlots.push(`${displayHours}:${displayMinutes} ${period}`);
    }

    return timeSlots;
  };

  useEffect(() => {
    if (cartItem?.deliveryopentime && cartItem?.deliveryclosedtime) {
      const currentTime = moment.tz("Europe/London").format("hh:mm A"); // Get current UK time in "hh:mm A" format
      const timeGap = activeTab === "Delivery" ? 45 : 30; // Adjust gap for delivery or takeaway

      const slots = generateTimeSlots(
        cartItem.deliveryopentime,
        cartItem.deliveryclosedtime,
        currentTime,
        timeGap
      );

      setTimeOptions(["As soon as possible", ...slots]);
    }
  }, [cartItem, activeTab]);

  useEffect(() => {
    if (cartItem?.deliveryopentime && cartItem?.deliveryclosedtime) {
      const currentTime = moment.tz("Europe/London").format("hh:mm A"); // Get current UK time in "hh:mm A" format
      const timeGap = activeTab === "Delivery" ? 45 : 30; // Adjust gap for delivery or takeaway

      const slots = generateTimeSlots(
        cartItem.deliveryopentime,
        cartItem.deliveryclosedtime,
        currentTime,
        timeGap
      );

      setTimeOptions(["As soon as possible", ...slots]);
    }
  }, [cartItem, activeTab]);

  // Handle time selection
  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  useEffect(() => {
    const staticCurrentTime = getUkCurrentTime();

    const staticOpenTime = openTime;
    const staticCloseTime = closeTime;

    // Set time gap based on activeTab
    const timeGap = activeTab === "Delivery" ? 45 : 15;

    const slots = generateTimeSlots(
      staticOpenTime,
      staticCloseTime,
      staticCurrentTime,
      timeGap
    );
    setTimeOptions(["As soon as possible", ...slots]); // Add "As soon as possible" as the first option
  }, [activeTab]);

  // Function to handle Apply button click
  const handleApplyLoyaltyPoints = () => {
    // Check if the loyalty points are within the valid range
    if (loyaltyPoints < cartItem?.minloyaltipoints || 0) {
      setLoyaltyError(
        `You need at least ${cartItem?.minloyaltipoints || 0
        } loyalty points to apply.`
      );
      return;
    }

    // Calculate max points to apply (either available loyalty points or the max allowed by the cart)
    const maxPointsToApply = Math.min(
      loyaltyPoints,
      cartItem?.maxloyaltipoints || 0,
      totalAmountToPay
    );
    setAppliedLoyaltyPoints(maxPointsToApply);
    setIsLoyaltyApplied(true);
    setLoyaltyError("");
  };

  // Function to handle Remove button click
  const handleRemoveLoyaltyPoints = () => {
    setAppliedLoyaltyPoints(0); // Reset applied loyalty points
    setIsLoyaltyApplied(false); // Mark as removed
    setLoyaltyError(""); // Clear any error
  };

  const sanitizePoints = (points) => {
    return isNaN(points) || points === "-NA-" ? 0 : Number(points);
  };

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      const response = await customerdetail();
      if (response?.status === "1" && response.customerdata?.length > 0) {
        const customer = response.customerdata[0];
        setUserData(customer);

        // Show popup if name or email is missing
        if (!customer.name || !customer.email) {
          setShowPopup(true);
        }
      }
    };

    fetchCustomerDetails();
  }, []);

  const handleUserUpdate = async () => {
    if (!updatedName.trim() || !updatedEmail.trim()) {
      setError("Name and Email are required.");
      return;
    }

    setIsUpdating(true);
    const formData = new FormData();
    formData.append("pkid", userData.pkid);
    formData.append("name", updatedName);
    formData.append("email", updatedEmail);
    formData.append("mobile", userData.mobile);
    formData.append("image", userData.image);
    formData.append("imagename", userData.imagename);

    try {
      const res = await axios.post(
        `${API_URL}/updatecustomerprofile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.status === "1") {
        setShowPopup(false); // Close popup on success
        setUserData({ ...userData, name: updatedName, email: updatedEmail });
        setError("");
      } else {
        setError("Failed to update profile. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred while updating the profile.");
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    let timer;

    if (activeTab === "Delivery" && cartItem?.isdeliveryavailable !== "1") {
      // Delay showing the error by 5 seconds
      timer = setTimeout(() => {
        setShowError(true);
      }, 5000); // 5-second delay
    } else {
      // Reset the error if conditions change
      setShowError(false);
      clearTimeout(timer);
    }

    return () => clearTimeout(timer); // Cleanup the timer when the component unmounts
  }, [activeTab, cartItem]);

  return (
    <>
      <Navbar text={"cart"} />
      <section className="section-t-space mytabb overflow-hidden pt-120 pb-0">
        <Delivery text={"cart"} />
      </section>
      <section className="p-2">
        {/* <div className="container page-heading">
          <h2 className="h3 mb-3 text-white text-center">Cart</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb flex-lg-nowrap justify-content-center justify-content-lg-star">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="ri-home-line" />
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Cart
              </li>
            </ol>
          </nav>
        </div> */}
      </section>
      <section className="account-section section-b-space pt-0 ">
        <div className="container">
          <div className="layout-sec" style={{ padding: "0px" }}>
            <div className="row g-lg-4">
              <div className="col-lg-12">
                <div className="order-summery-section sticky-top">
                  <div className="checkout-detail">
                    <ul>
                      {CartFoods.map((food, index) => {
                        const typeCost = parseFloat(food.typecost) || 0;
                        const extraTopUpCost = food.carttopupdetails.reduce(
                          (total, topup) => {
                            return (
                              total +
                              parseFloat(
                                topup.cartextratopupdetails.reduce(
                                  (acc, extra) => {
                                    return (
                                      acc +
                                      parseFloat(extra.extratopupcost) || 0
                                    );
                                  },
                                  0
                                )
                              ) || 0
                            );
                          },
                          0
                        );
                        const totalPrice =
                          (typeCost + extraTopUpCost) * quantities[index];

                        return (
                          <li key={index}>
                            <div className="horizontal-product-box">
                              <div className="product-content cart-top">
                                <div className="d-flex align-items-center justify-content-between">
                                  <h5>{food.food}</h5>
                                  <h6 className="product-price">
                                    £{totalPrice.toFixed(2)}
                                  </h6>
                                </div>
                                <h6 className="ingredients-text">
                                  {food.menutype}
                                </h6>
                                <div className="d-flex align-items-center justify-content-between mt-md-2 mt-1 gap-1">
                                  <div
                                    className="plus-minus"
                                    style={{ fontSize: "large" }}
                                  >
                                    {/* <i
                                      className={
                                        index === 1
                                          ? "bi bi-trash3" 
                                          : "ri-subtract-line" 
                                      }
                                      onClick={() =>
                                        index === 1
                                          ? handleDecrement(index)
                                          : handleDecrement(index)
                                      }
                                    /> */}
                                    <i
                                      className={
                                        parseInt(quantities[index], 10) === 1
                                          ? "bi bi-trash3"
                                          : "ri-subtract-line"
                                      }
                                      onClick={() => handleDecrement(index)}
                                      style={{ cursor: "pointer", color: "red" }}
                                    />
                                    <input
                                      type="number"
                                      value={quantities[index]}
                                      readOnly
                                    />
                                    <i
                                      className="ri-add-line"
                                      onClick={() => handleIncrement(index)}
                                      style={{ cursor: "pointer", color: "green" }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}

                      {activeTab === "Delivery" &&
                        cartItem?.isdeliveryavailable !== "1" &&
                        showError && (
                          <h6
                            style={{ textAlign: "center", color: "#ff0000bd" }}
                            className="availabe-check"
                          >
                           This store doesn’t deliver to your address. Please choose another store.
 
                          </h6>
                        )}

                      <li>
                        {activeTab === "Delivery" && (
                          <>
                            <div className="coupon-section p-3 border rounded">
                              <div className="d-flex align-items-center justify-content-between">
                                <div>
                                  <i
                                    className="ri-home-4-fill icon"
                                    style={{ color: "rgb(232, 65, 53)" }}
                                  />{" "}
                                  <span className="fw-semibold">
                                    Delivery Address
                                  </span>
                                </div>
                                <div className="address-box white-bg new-address-box white-bg">
                                  <Link
                                    className="btn theme-btn rounded-2 mt-0"
                                    data-bs-toggle="modal"
                                    data-bs-target="#location"
                                  >
                                    Change
                                  </Link>
                                </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between mt-md-2 mt-1 gap-1">
                                <h6>
                                  {Address?.title} {Address?.address}
                                </h6>
                              </div>
                            </div>

                            <div className="coupon-section p-3 border rounded mt-1">
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="fw-semibold">Delivery Time</div>
                                <div className="address-box white-bg new-address-box white-bg">
                                  <select
                                    value={selectedTime}
                                    onChange={handleTimeChange}
                                    className="form-select"
                                    aria-label="Select delivery time"
                                  >
                                    {timeOptions.map((option, index) => (
                                      <option key={index} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        {activeTab === "Collection" && (
                          <div className="coupon-section p-3 border rounded mt-1">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>Collection Time</div>
                              <div className="address-box white-bg new-address-box white-bg">
                                <select
                                  value={selectedTime}
                                  onChange={handleTimeChange}
                                  className="form-select"
                                  aria-label="Select collection time"
                                >
                                  {timeOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        )}
                      </li>
                      <li style={{ borderTopStyle: "none" }}>
                        <div className="coupon-section p-3 border rounded">
                          <h6 className="mb-3 fw-semibold">Vouchers & Discounts</h6>
                          <div className="input-group mb-3">
                            <input
                              type="text"
                              className="form-control"
                              value={inputCouponCode}
                              onChange={handleCouponInputChange}
                              placeholder="Have a code? Enter it here…"
                              style={{ height: "50px" }}
                            />
                            <button
                              className="btn"
                              onClick={applyCoupon}
                              style={{
                                backgroundColor: "rgb(232, 65, 53)",
                                color: "white",
                              }}
                            >
                              Apply
                            </button>
                          </div>
                          {!isCouponValid && (
                            <div className="alert alert-danger" role="alert">
                              Invalid coupon code or conditions not met.
                            </div>
                          )}
                          {selectedCoupon && (
                            <div className="alert alert-success" role="alert">
                              Coupon applied: {selectedCoupon.couponname} -{" "}
                              {selectedCoupon.type === "Percentage"
                                ? "%"
                                : "£"}{selectedCoupon.value} {" "} off
                            </div>
                          )}

                          <h6 className="mb-3 fw-semibold">
                            Special Instructions
                          </h6>
                          <div className="input-group mb-3">
                            <input
                              style={{ height: "50px" }}
                              type="text"
                              className="form-control"
                              value={instruction}
                              onChange={handleInstructionChange}
                              placeholder="Any instructions for the store or driver?"
                            />
                          </div>
                        </div>
                      </li>

                      <div className="loyalty-points-container d-flex justify-content-between align-items-center p-3 rounded shadow-sm">
                        <div className="d-flex align-items-center">
                          <i
                            className="bi bi-wallet2"
                            style={{
                              fontSize: "24px",
                              marginRight: "20px",
                              color: "rgb(232, 65, 53)",
                            }}
                          ></i>
                          <div>
                            <h6 className="mb-1 fw-semibold">Loyalty Points</h6>
                            <p className="mb-0 text-muted">
                              You have available total{" "}
                              <strong style={{ color: "rgb(6, 141, 8)" }}>
                                {isLoyaltyApplied
                                  ? (
                                    sanitizePoints(loyaltyPoints) -
                                    sanitizePoints(appliedLoyaltyPoints)
                                  ).toFixed(2)
                                  : sanitizePoints(loyaltyPoints).toFixed(2)}
                              </strong>{" "}
                              points
                            </p>
                          </div>
                        </div>
                        {isLoyaltyApplied ? (
                          <button
                            className="btn btn-danger"
                            onClick={handleRemoveLoyaltyPoints}
                            style={{
                              textDecoration: "none",
                              backgroundColor: "red",
                            }}
                          >
                            Remove
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary"
                            onClick={handleApplyLoyaltyPoints}
                            style={{
                              textDecoration: "none",
                              backgroundColor: "rgb(232, 65, 53)",
                            }}
                            disabled={
                              !sanitizePoints(loyaltyPoints) ||
                              sanitizePoints(loyaltyPoints) <= 0
                            }
                          >
                            Apply
                          </button>
                        )}
                      </div>

                      {/* Show error message if applicable */}
                      {loyaltyError && (
                        <div style={{ color: "red", marginTop: "10px" }}>
                          {loyaltyError}
                        </div>
                      )}
                    </ul>

                    <h5 className="bill-details-title fw-semibold dark-text">
                      Order Summary
                    </h5>
                    <div className="sub-total">
                      <h6 className="content-color fw-normal">Subtotal</h6>
                      <h6 className="fw-semibold">
                        £{totalFoodPrice.toFixed(2)}
                      </h6>
                    </div>
                    {activeTab == "Delivery" && (
                      <div className="sub-total">
                        <h6 className="content-color fw-normal">
                          Delivery fee
                        </h6>
                        <h6 className="fw-semibold">
                          £{deliveryCharge.toFixed(2)}
                        </h6>
                      </div>
                    )}
                    {/* <div className="sub-total">
                      <h6 className="content-color fw-normal">Loyalty Point</h6>
                      <h6 className="fw-semibold">${totalPoints.toFixed(2)}</h6>
                    </div> */}
                    <div className="sub-total">
                      <h6 className="content-color fw-normal">
                        Service charge
                      </h6>
                      <h6 className="fw-semibold">
                        £{serviceCharge.toFixed(2)}
                      </h6>
                    </div>
                    {selectedCoupon && (
                      <>
                        <div className="sub-total">
                          <h6 className="content-color fw-normal">
                            Coupon Discount
                          </h6>
                          <h6 className="fw-semibold">
                            - £{couponDiscount.toFixed(2)}
                          </h6>
                        </div>
                      </>
                    )}

                    {isLoyaltyApplied && (
                      <div className="sub-total">
                        <h6 className="content-color fw-normal">
                          Loyalty Points Deducted
                        </h6>
                        <h6 className="fw-semibold">
                          - £{sanitizePoints(appliedLoyaltyPoints).toFixed(2)}
                        </h6>
                      </div>
                    )}

                    <div className="grand-total">
                      <h6 className="fw-semibold dark-text">Total</h6>
                      <h6 className="fw-semibold amount">
                        £{totalAmountAfterLoyalty.toFixed(2)}
                      </h6>
                    </div>

                    <div className="container">
                      <Button
                        className="btn theme-btn restaurant-btn w-100 rounded-2 fw-semibold"
                        onClick={handleCheckoutClick}
                        disabled={
                          (activeTab === "Delivery" &&
                            cartItem?.isdeliveryavailable !== "1") ||
                          (activeTab === "Delivery" && isCheckoutDisabled) // Only apply minimum order value for delivery
                        }
                      >
                        CHECKOUT
                      </Button>

                      {error && (
                        <div
                          style={{ color: "red", marginTop: "10px" }}
                          className="availabe-check"
                        >
                          {error}
                        </div>
                      )}

                      {isCheckoutDisabled &&
                        activeTab === "Delivery" && ( // Only show minimum order value message for delivery
                          <div
                            style={{ color: "red", marginTop: "10px" }}
                            className="availabe-check"
                          >
                            Minimum order value is £{minOrder.toFixed(2)}.
                            Please add £{amountToAdd.toFixed(2)} more to
                            proceed.
                          </div>
                        )}
                      <Modal
                        show={show}
                        onHide={handleClose}
                        centered
                        closeButton
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Select Payment Method</Modal.Title>
                        </Modal.Header>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: "15px",
                          }}
                        >
                          <p className="d-flex">
                            Order Type: &nbsp;{" "}
                            <p style={{ color: "red" }}>{activeTab} </p>
                          </p>
                        </div>
                        <Modal.Body>
                          <div className="d-flex justify-content-center w-100">
                            {/* Cash On Delivery Button */}
                            {cartItems?.paymentmethod?.includes("Cash") && (
                              <Button
                                onClick={async () => {
                                  setIsLoading(true);
                                  await handleCashOnDeliveryClick();
                                  setIsLoading(false);
                                }}
                                className={`me-2 btn theme-btn ${buttonText === "CONFIRM ORDER" ? "active" : ""
                                  }`}
                                disabled={isLoading}
                              >
                                {isLoading
                                  ? "Placing Order..."
                                  : buttonText === "CONFIRM ORDER"
                                    ? "CONFIRM ORDER"
                                    : "PAY BY CASH"}
                              </Button>
                            )}

                            {/* Pay Online Button */}
                            {cartItems?.paymentmethod?.includes("Card") && (
                              <Button
                                className="btn theme-btn"
                                onClick={async () => {
                                  setIsLoading(true); // start loading
                                  await handlePayOnlineClick(); // call your API function
                                  setIsLoading(false); // stop loading
                                }}
                                disabled={isLoading || buttonText === "CONFIRM ORDER"} // prevent click while loading or on confirm
                              >
                                {isLoading ? "Redirecting..." : "PAY BY CARD"}
                              </Button>
                            )}

                            {/* Handle case when paymentmethod is empty */}
                            {cartItems?.paymentmethod?.length === 0 && (
                              <div className="text-center">
                                <p>No payment methods available.</p>
                              </div>
                            )}
                          </div>
                        </Modal.Body>

                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer text="cart" />
      <FooterMobileMenu />
      <Modal show={showPopup} onHide={() => { }} centered>
        <Modal.Header>
          <Modal.Title>Complete Your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label style={{ color: "black" }}>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label style={{ color: "black" }}>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
              />
            </Form.Group>
            {error && <p className="text-danger">{error}</p>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleUserUpdate}
            disabled={isUpdating}
            style={{
              backgroundColor: isUpdating ? "#b32d33" : "rgb(232, 65, 53)", // Optional darker shade for disabled state
              borderColor: "rgb(232, 65, 53)",
              color: "white",
            }}
          >
            {isUpdating ? "Saving..." : "Save Details"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cart;



