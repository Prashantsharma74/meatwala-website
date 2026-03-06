// // import React, { useEffect, useState } from 'react';
// // import { useDispatch, useSelector } from "react-redux";
// // import { Link, useNavigate } from 'react-router-dom';
// // import { getcart } from "../store/feature/cartSlice";
// // import { addToCart, addOrder } from "../utils/api";
// // import { Button, Modal } from 'react-bootstrap';
// // import { toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import Cartlogo from '../assets/bucketlogo.png'


// // const Cart = ({ cart }) => {
// //   const storedUser = JSON.parse(localStorage.getItem('user'));
// //   const Address = JSON.parse(localStorage.getItem('userAddress'));
// //   const { cartItems } = useSelector((store) => store.Cart);

// //   const [cartItem, setCartItem] = useState(null);
// //   const [CartFoods, setCartFoods] = useState([]);
// //   const [quantities, setQuantities] = useState([]); // State to store quantities
// //   const [show, setShow] = useState(false);
// //   const [buttonText, setButtonText] = useState('PAY ONLINE');
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const [cartId, setCartId] = useState("");
// //   const [restId, setRestId] = useState("");

// //   const [extraTopupIds, setExtraTopupIds] = useState([]);
// //   const [foodQntity, setFoodQntity] = useState(0)
// //   const [pincode, setPincode] = useState("")
// //   const [selectedCoupon, setSelectedCoupon] = useState(null);
// //   const [isCouponValid, setIsCouponValid] = useState(true);
// //   const activeTab = useSelector((store) => store.User.activeTab);
// //   const { count } = useSelector((store) => store.Cart);



// //   useEffect(() => {
// //     dispatch(getcart());
// //   }, [dispatch]);

// //   useEffect(() => {
// //     const check = dispatch(getcart());
// //   }, [dispatch, count]);

// //   useEffect(() => {
// //     window.scrollTo(0, 0);
// //   }, []);

// //   useEffect(() => {
// //     if (cartItems && cartItems.cartmasters && cartItems.cartmasters.length > 0) {
// //       const cartmaster = cartItems.cartmasters[0];
// //       setFoodQntity(cartmaster?.foods.length);
// //       setQuantities(cartmaster.foods.map(food => food.quantity || 1));
// //       const extraTopupIds = cartmaster.foods.flatMap(food =>
// //         food.carttopupdetails.flatMap(topup =>
// //           topup.cartextratopupdetails.map(detail => detail.extratopupid)
// //         )
// //       );

// //       setCartFoods(cartmaster.foods);
// //       setCartItem(cartmaster);
// //       setQuantities(cartmaster.foods.map(food => food.quantity || 1));
// //       setCartId(cartmaster.cartid);
// //       setRestId(cartmaster.restid);

// //       setExtraTopupIds(extraTopupIds);
// //     }

// //     if (cartItems && cartItems.deliveryfeesdata && cartItems.deliveryfeesdata.length > 0) {
// //       const fees = cartItems.deliveryfeesdata.map(delivery => delivery.pincode);
// //       setPincode(fees);
// //     }
// //   }, [cartItems]);



// //   const calculateCouponDiscount = () => {
// //     let discount = 0;

// //     if (selectedCoupon) {
// //       const couponValue = parseFloat(selectedCoupon.value) || 0;
// //       const minOrderValue = parseFloat(selectedCoupon.minvalue) || 0;

// //       if (totalFoodPrice >= minOrderValue) {
// //         if (selectedCoupon.type === "Percentage") {
// //           discount = (totalFoodPrice * couponValue) / 100;
// //         } else if (selectedCoupon.type === "Amount") {
// //           discount = couponValue;
// //         }
// //       }
// //     }

// //     return discount;
// //   };

// //   const totalFoodPrice = CartFoods.reduce((total, food, index) => {
// //     const typeCost = parseFloat(food.typecost) || 0;
// //     const extraTopUpCost = food.carttopupdetails.reduce((acc, topup) => {
// //       return acc + parseFloat(topup.cartextratopupdetails.reduce((acc2, extra) => {
// //         return acc2 + parseFloat(extra.extratopupcost) || 0;
// //       }, 0)) || 0;
// //     }, 0);
// //     return total + (typeCost + extraTopUpCost) * quantities[index];
// //   }, 0);

// //   const serviceCharge = parseFloat(cartItem?.servicecharge) || 0;

// //   const deliveryCharge = parseFloat(cartItem?.deliverycharge) || 0;
// //   const couponDiscount = calculateCouponDiscount();

// //   const totalAmountToPay = activeTab === "Delivery"
// //     ? totalFoodPrice + serviceCharge + deliveryCharge - couponDiscount
// //     : totalFoodPrice + serviceCharge - couponDiscount;
// //   const handleProceed = async (food, quantity) => {
// //     if (!food || quantity === undefined || quantity === null) {
// //       return;
// //     }

// //     const sendData = {
// //       userid: storedUser?.userid,
// //       restId: restId,
// //       type: activeTab == "Delivery" ? "delivery" : "takeaway",
// //       catid: food?.catid || "",
// //       foodid: food?.foodid || "",
// //       typeid: food?.typeid || "",
// //       extratopupid: extraTopupIds.length > 0 ? extraTopupIds : [],
// //       quantity: quantity.toString(),
// //       cartid: cartId,
// //       cartdetailid: food.cartdetailid,
// //     };

// //     await addToCart(sendData);

// //   };



// //   const handleIncrement = (index) => {
// //     setQuantities((prevQuantities) => {
// //       const newQuantities = [...prevQuantities];
// //       const currentQuantity = parseInt(newQuantities[index], 10) || 0;
// //       newQuantities[index] = currentQuantity + 1;
// //       handleProceed(CartFoods[index], newQuantities[index]);
// //       return newQuantities;
// //     });
// //   };


// //   const handleDecrement = (index) => {
// //     setQuantities((prevQuantities) => {
// //       const newQuantities = [...prevQuantities];
// //       const currentQuantity = parseInt(newQuantities[index], 10) || 0;
// //       if (currentQuantity > 0) {
// //         newQuantities[index] = currentQuantity - 1;
// //         handleProceed(CartFoods[index], newQuantities[index]);
// //       } else {
// //         console.log("Cannot decrement further.");
// //       }


// //       return newQuantities;
// //     });
// //   };




// //   const handleClose = () => setShow(false);



// //   const getCurrentDateTime = () => {
// //     const now = new Date();
// //     const year = now.getFullYear();
// //     const month = String(now.getMonth() + 1).padStart(2, '0');
// //     const day = String(now.getDate()).padStart(2, '0');
// //     const hours = String(now.getHours()).padStart(2, '0');
// //     const minutes = String(now.getMinutes()).padStart(2, '0');
// //     const seconds = String(now.getSeconds()).padStart(2, '0');

// //     return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
// //   };








// //   const [paymentMode, setPaymentMode] = useState('Stripe');


// //   const Addorder = async () => {
// //     const paymentDateTime = getCurrentDateTime();

// //     if (!isCouponValid) {
// //       toast.error("Total amount is less than the minimum order value required for the selected coupon.");
// //       return;
// //     }

// //     const data = {

// //       customerid: storedUser?.userid,
// //       orderreferenceid: "",
// //       customerreqtime: selectedTime,
// //       ordertype: activeTab,
// //       deliverypostcode: pincode,
// //       restaurantid: restId,
// //       deliveryaddress: Address?.address,
// //       loyaltipointsconsume: "0.0",
// //       totalitem: foodQntity.toString(),
// //       coupondiscount: couponDiscount.toString(),
// //       loyaltidiscount: "0.0",
// //       deliverycharges: cartItem?.deliverycharge,
// //       servicecharges: cartItem?.servicecharge,
// //       netpayamount: totalAmountToPay.toString(),
// //       paymentmode: paymentMode,
// //       paymentreferenceid: "",
// //       paymentdatetime: paymentDateTime,
// //       orderdate: paymentDateTime
// //     };

// //     try {
// //       const order = await addOrder(data);
// //       if (order.status == "0") {
// //         navigate("/cancel")
// //       }

// //       if (order.status === "1") {
// //         if (paymentMode === "Stripe") {
// //           window.location.href = order.paymenturl;
// //         } else {
// //           toast.success("Order placed successfully!");
// //           navigate('/confirmorder');
// //         }
// //       } else {
// //         toast.error("Failed to place the order. Please try again.");
// //       }


// //     } catch (error) {
// //       toast.error("An error occurred while placing the order.");
// //     }
// //   };

// //   const handlePaymentModeChange = (mode) => {
// //     setPaymentMode(mode);
// //   };


// //   const handleCashOnDeliveryClick = async () => {
// //     handlePaymentModeChange('Cash On Delivery');
// //     setButtonText('CONFIRM ORDER');
// //     if (buttonText === 'CONFIRM ORDER') {
// //       const res = await Addorder()
// //     }
// //   };

// //   const handlePayOnlineClick = () => {
// //     handlePaymentModeChange('Stripe');
// //     Addorder();
// //   };


// //   const [selectedTime, setSelectedTime] = useState("As soon as possible");

// //   return (
// //     <>
// //       <div
// //         style={{
// //           width: '100%',
// //         }}
// //         className="no-scrollbar hide-on-mobile"
// //       >
// //         <div style={{ width: '100%' }}>
// //           <div className="row g-lg-4">
// //             <div className="col-lg-12">
// //               <div style={{ width: '100%' }}>
// //                 <div style={{ width: '100%' }}>
// //                   {CartFoods.length === 0 || quantities.every(quantity => quantity === 0) ? (
// //                     <div
// //                       style={{
// //                         textAlign: 'center',
// //                         padding: '20px',
// //                         backgroundColor: '#f9f9f9',
// //                         borderRadius: '8px',
// //                         boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
// //                       }}
// //                     >
// //                       <img
// //                         src={Cartlogo}
// //                         alt="Cart Logo"
// //                         style={{ maxWidth: '50px', marginBottom: '20px', borderRadius: '50%' }}
// //                       />
// //                       <h4 style={{ color: '#333', fontSize: '18px', fontWeight: '600' }}>
// //                         Fill your basket
// //                       </h4>
// //                       <p style={{ color: '#666', fontSize: '12px' }}>Your basket is empty</p>
// //                     </div>
// //                   ) : (
// //                     <ul style={{ listStyle: 'none', padding: 5, margin: 0 }}>
// //                       {CartFoods.map((food, index) => {
// //                         if (quantities[index] === 0) return null; 

// //                         const typeCost = parseFloat(food.typecost) || 0;
// //                         const extraTopUpCost = food.carttopupdetails.reduce((total, topup) => {
// //                           return (
// //                             total +
// //                             parseFloat(
// //                               topup.cartextratopupdetails.reduce((acc, extra) => {
// //                                 return acc + parseFloat(extra.extratopupcost) || 0;
// //                               }, 0)
// //                             ) || 0
// //                           );
// //                         }, 0);
// //                         const totalPrice = (typeCost + extraTopUpCost) * quantities[index];

// //                         return (
// //                           <li
// //                             key={index}
// //                             style={{
// //                               borderBottom: '1px solid #ddd',
// //                               padding: '15px',
// //                               marginBottom: '10px',
// //                               borderRadius: '8px',
// //                               backgroundColor: '#f9f9f9',
// //                               width: '100%',
// //                             }}
// //                           >
// //                             <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
// //                               <div
// //                                 style={{
// //                                   display: 'flex',
// //                                   justifyContent: 'space-between',
// //                                   alignItems: 'center',
// //                                 }}
// //                               >
// //                                 <div style={{ flex: 1 }}>
// //                                   <h5 style={{ margin: 0, color: '#333' }}>{food.food}</h5>
// //                                   <h6 style={{ margin: '5px 0', color: '#666' }}>{food.menutype}</h6>
// //                                 </div>
// //                                 <h6 style={{ margin: 0, color: '#333', fontWeight: 'bold' }}>
// //                                   £{totalPrice.toFixed(2)}
// //                                 </h6>
// //                               </div>
// //                               <div
// //                                 style={{
// //                                   display: 'flex',
// //                                   justifyContent: 'space-between',
// //                                   alignItems: 'center',
// //                                 }}
// //                               >
// //                                 <div
// //                                   style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
// //                                 >
// //                                   <i
// //                                     className="ri-subtract-line sub"
// //                                     onClick={() => handleDecrement(index)}
// //                                     style={{ cursor: 'pointer', color: 'rgb(232, 65, 53)' }}
// //                                   />
// //                                   <input
// //                                     type="number"
// //                                     value={quantities[index]}
// //                                     readOnly
// //                                     style={{
// //                                       width: '60px',
// //                                       textAlign: 'center',
// //                                       border: '1px solid #ddd',
// //                                       borderRadius: '4px',
// //                                     }}
// //                                   />
// //                                   <i
// //                                     className="ri-add-line add"
// //                                     onClick={() => handleIncrement(index)}
// //                                     style={{ cursor: 'pointer', color: 'green' }}
// //                                   />
// //                                 </div>
// //                               </div>
// //                             </div>
// //                           </li>
// //                         );
// //                       })}
// //                     </ul>
// //                   )}
// //                   {CartFoods.length > 0 && quantities.some(quantity => quantity > 0) && (
// //                     <>
// //                       <div
// //                         style={{
// //                           display: 'flex',
// //                           justifyContent: 'space-between',
// //                           marginTop: '20px',
// //                         }}
// //                       >
// //                         <h6 style={{ margin: 0, fontWeight: 'bold', color: '#333' }}>To Pay</h6>
// //                         <h6 style={{ margin: 0, fontWeight: 'bold' }}>
// //                           £{totalAmountToPay.toFixed(2)}
// //                         </h6>
// //                       </div>
// //                       <div style={{ marginTop: '20px' }}>
// //                         <Link to={'/cart'}>
// //                           <Button className="btn theme-btn restaurant-btn w-100 rounded-2">
// //                             CHECKOUT
// //                           </Button>
// //                         </Link>
// //                         <Modal show={show} onHide={handleClose} centered>
// //                           <Modal.Header closeButton>
// //                             <Modal.Title>Select Payment Method</Modal.Title>
// //                           </Modal.Header>
// //                           <Modal.Body>
// //                             <div
// //                               style={{
// //                                 display: 'flex',
// //                                 justifyContent: 'center',
// //                                 gap: '10px',
// //                               }}
// //                             >
// //                               <Button
// //                                 onClick={handleCashOnDeliveryClick}
// //                                 className={`me-2 btn theme-btn ${buttonText === 'CONFIRM ORDER' ? 'active' : ''}`}
// //                               >
// //                                 {buttonText === 'CONFIRM ORDER' ? 'CONFIRM ORDER' : 'CASH ON DELIVERY'}
// //                               </Button>

// //                               {buttonText !== 'CONFIRM ORDER' && (
// //                                 <Button
// //                                   className="btn theme-btn"
// //                                   onClick={handlePayOnlineClick}
// //                                 >
// //                                   PAY ONLINE
// //                                 </Button>
// //                               )}
// //                             </div>
// //                           </Modal.Body>
// //                         </Modal>
// //                       </div>
// //                     </>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );



// // };


// // export default Cart;

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from 'react-router-dom';
// import { getcart } from "../store/feature/cartSlice";
// import { addToCart, addOrder } from "../utils/api";
// import { Button, Modal } from 'react-bootstrap';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Cartlogo from '../assets/bucketlogo.png';

// const Cart = ({ cart }) => {
//   const storedUser = JSON.parse(localStorage.getItem('user'));
//   const Address = JSON.parse(localStorage.getItem('userAddress'));
//   const { cartItems } = useSelector((store) => store.Cart);

//   const [cartItem, setCartItem] = useState(null);
//   const [CartFoods, setCartFoods] = useState([]);
//   const [quantities, setQuantities] = useState([]);
//   const [show, setShow] = useState(false);
//   const [buttonText, setButtonText] = useState('PAY ONLINE');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [cartId, setCartId] = useState("");
//   const [restId, setRestId] = useState("");
//   const [extraTopupIds, setExtraTopupIds] = useState([]);
//   const [foodQntity, setFoodQntity] = useState(0);
//   const [pincode, setPincode] = useState("");
//   const [selectedCoupon, setSelectedCoupon] = useState(null);
//   const [isCouponValid, setIsCouponValid] = useState(true);
//   const activeTab = useSelector((store) => store.User.activeTab);
//   const { count } = useSelector((store) => store.Cart);

//   // Mock data for demonstration - replace with your actual calculations
//   const [orderType, setOrderType] = useState('Delivery');
//   const deliveryTime = "40-55 min";
//   const collectionTime = "20 min";
//   const savings = 14.63;
//   const bagFee = 0.60;
//   const serviceFee = 1.49;
//   const discount = 10.63;

//   useEffect(() => {
//     dispatch(getcart());
//   }, [dispatch]);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   useEffect(() => {
//     if (cartItems && cartItems.cartmasters && cartItems.cartmasters.length > 0) {
//       const cartmaster = cartItems.cartmasters[0];
//       setFoodQntity(cartmaster?.foods.length);
//       setQuantities(cartmaster.foods.map(food => food.quantity || 1));
//       const extraTopupIds = cartmaster.foods.flatMap(food =>
//         food.carttopupdetails.flatMap(topup =>
//           topup.cartextratopupdetails.map(detail => detail.extratopupid)
//         )
//       );

//       setCartFoods(cartmaster.foods);
//       setCartItem(cartmaster);
//       setQuantities(cartmaster.foods.map(food => food.quantity || 1));
//       setCartId(cartmaster.cartid);
//       setRestId(cartmaster.restid);
//       setExtraTopupIds(extraTopupIds);
//     }

//     if (cartItems && cartItems.deliveryfeesdata && cartItems.deliveryfeesdata.length > 0) {
//       const fees = cartItems.deliveryfeesdata.map(delivery => delivery.pincode);
//       setPincode(fees);
//     }
//   }, [cartItems]);

//   const calculateCouponDiscount = () => {
//     let discount = 0;
//     if (selectedCoupon) {
//       const couponValue = parseFloat(selectedCoupon.value) || 0;
//       const minOrderValue = parseFloat(selectedCoupon.minvalue) || 0;
//       if (totalFoodPrice >= minOrderValue) {
//         if (selectedCoupon.type === "Percentage") {
//           discount = (totalFoodPrice * couponValue) / 100;
//         } else if (selectedCoupon.type === "Amount") {
//           discount = couponValue;
//         }
//       }
//     }
//     return discount;
//   };

//   const totalFoodPrice = CartFoods.reduce((total, food, index) => {
//     const typeCost = parseFloat(food.typecost) || 0;
//     const extraTopUpCost = food.carttopupdetails.reduce((acc, topup) => {
//       return acc + parseFloat(topup.cartextratopupdetails.reduce((acc2, extra) => {
//         return acc2 + parseFloat(extra.extratopupcost) || 0;
//       }, 0)) || 0;
//     }, 0);
//     return total + (typeCost + extraTopUpCost) * quantities[index];
//   }, 0);

//   const serviceCharge = parseFloat(cartItem?.servicecharge) || 0;
//   const deliveryCharge = parseFloat(cartItem?.deliverycharge) || 0;
//   const couponDiscount = calculateCouponDiscount();

//   const totalAmountToPay = activeTab === "Delivery"
//     ? totalFoodPrice + serviceCharge + deliveryCharge - couponDiscount
//     : totalFoodPrice + serviceCharge - couponDiscount;

//   const handleProceed = async (food, quantity) => {
//     if (!food || quantity === undefined || quantity === null) return;

//     const sendData = {
//       userid: storedUser?.userid,
//       restId: restId,
//       type: activeTab == "Delivery" ? "delivery" : "takeaway",
//       catid: food?.catid || "",
//       foodid: food?.foodid || "",
//       typeid: food?.typeid || "",
//       extratopupid: extraTopupIds.length > 0 ? extraTopupIds : [],
//       quantity: quantity.toString(),
//       cartid: cartId,
//       cartdetailid: food.cartdetailid,
//     };

//     await addToCart(sendData);
//   };

//   const handleIncrement = (index) => {
//     setQuantities((prevQuantities) => {
//       const newQuantities = [...prevQuantities];
//       const currentQuantity = parseInt(newQuantities[index], 10) || 0;
//       newQuantities[index] = currentQuantity + 1;
//       handleProceed(CartFoods[index], newQuantities[index]);
//       return newQuantities;
//     });
//   };

//   const handleDecrement = (index) => {
//     setQuantities((prevQuantities) => {
//       const newQuantities = [...prevQuantities];
//       const currentQuantity = parseInt(newQuantities[index], 10) || 0;
//       if (currentQuantity > 0) {
//         newQuantities[index] = currentQuantity - 1;
//         handleProceed(CartFoods[index], newQuantities[index]);
//       }
//       return newQuantities;
//     });
//   };

//   const handleClose = () => setShow(false);

//   const getCurrentDateTime = () => {
//     const now = new Date();
//     const year = now.getFullYear();
//     const month = String(now.getMonth() + 1).padStart(2, '0');
//     const day = String(now.getDate()).padStart(2, '0');
//     const hours = String(now.getHours()).padStart(2, '0');
//     const minutes = String(now.getMinutes()).padStart(2, '0');
//     const seconds = String(now.getSeconds()).padStart(2, '0');
//     return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
//   };

//   const [paymentMode, setPaymentMode] = useState('Stripe');

//   const Addorder = async () => {
//     const paymentDateTime = getCurrentDateTime();
//     if (!isCouponValid) {
//       toast.error("Total amount is less than the minimum order value required for the selected coupon.");
//       return;
//     }

//     const data = {
//       customerid: storedUser?.userid,
//       orderreferenceid: "",
//       customerreqtime: selectedTime,
//       ordertype: activeTab,
//       deliverypostcode: pincode,
//       restaurantid: restId,
//       deliveryaddress: Address?.address,
//       loyaltipointsconsume: "0.0",
//       totalitem: foodQntity.toString(),
//       coupondiscount: couponDiscount.toString(),
//       loyaltidiscount: "0.0",
//       deliverycharges: cartItem?.deliverycharge,
//       servicecharges: cartItem?.servicecharge,
//       netpayamount: totalAmountToPay.toString(),
//       paymentmode: paymentMode,
//       paymentreferenceid: "",
//       paymentdatetime: paymentDateTime,
//       orderdate: paymentDateTime
//     };

//     try {
//       const order = await addOrder(data);
//       if (order.status == "0") {
//         navigate("/cancel")
//       }
//       if (order.status === "1") {
//         if (paymentMode === "Stripe") {
//           window.location.href = order.paymenturl;
//         } else {
//           toast.success("Order placed successfully!");
//           navigate('/confirmorder');
//         }
//       } else {
//         toast.error("Failed to place the order. Please try again.");
//       }
//     } catch (error) {
//       toast.error("An error occurred while placing the order.");
//     }
//   };

//   const handlePaymentModeChange = (mode) => {
//     setPaymentMode(mode);
//   };

//   const handleCashOnDeliveryClick = async () => {
//     handlePaymentModeChange('Cash On Delivery');
//     setButtonText('CONFIRM ORDER');
//     if (buttonText === 'CONFIRM ORDER') {
//       const res = await Addorder()
//     }
//   };

//   const handlePayOnlineClick = () => {
//     handlePaymentModeChange('Stripe');
//     Addorder();
//   };

//   const [selectedTime, setSelectedTime] = useState("As soon as possible");

//   // Calculate if cart has items
//   const hasItemsInCart = CartFoods.length > 0 && quantities.some(quantity => quantity > 0);


//   return (
//     <div style={{ width: '100%', fontFamily: 'Arial, sans-serif' }}>
//       <div style={{ width: '25%', position: "fixed" }}>
//         {/* Header */}
//         <div style={{ padding: '20px', borderBottom: '1px solid #e0e0e0', textAlign: "center" }}>
//           <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>Basket</h2>
//         </div>

//         {/* Delivery/Collection Options */}
//         {/* <div style={{ padding: '20px', borderBottom: '1px solid #e0e0e0' }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
//             <div>
//               <span style={{ fontWeight: 'bold', fontSize: '16px' }}>Delivery</span>
//               <span style={{ marginLeft: '10px', color: '#666', fontSize: '14px' }}>{deliveryTime}</span>
//             </div>
//             <div>
//               <span style={{ fontWeight: 'bold', fontSize: '16px' }}>Collection</span>
//               <span style={{ marginLeft: '10px', color: '#666', fontSize: '14px' }}>{collectionTime}</span>
//             </div>
//           </div>
//         </div> */}

//         {/* Cart Items */}
//         <div className='mt-3' style={{ padding: '20px' }}>
//           {CartFoods.length === 0 || quantities.every(quantity => quantity === 0) ? (
//             <div style={{ textAlign: 'center', padding: '40px 20px' }}>
//               <img
//                 src={Cartlogo}
//                 alt="Cart Logo"
//                 style={{ maxWidth: '80px', marginBottom: '20px', borderRadius: '50%' }}
//               />
//               <h4 style={{ color: '#333', fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>
//                 Fill your basket
//               </h4>
//               <p style={{ color: '#666', fontSize: '14px' }}>Your basket is empty</p>
//             </div>
//           ) : (
//             <>
//               <div style={{ marginBottom: '20px' }}>
//                 {CartFoods.map((food, index) => {
//                   if (quantities[index] === 0) return null;

//                   const typeCost = parseFloat(food.typecost) || 0;
//                   const extraTopUpCost = food.carttopupdetails.reduce((total, topup) => {
//                     return (
//                       total +
//                       parseFloat(
//                         topup.cartextratopupdetails.reduce((acc, extra) => {
//                           return acc + parseFloat(extra.extratopupcost) || 0;
//                         }, 0)
//                       ) || 0
//                     );
//                   }, 0);
//                   const totalPrice = (typeCost + extraTopUpCost) * quantities[index];

//                   return (
//                     <div
//                       key={index}
//                       style={{
//                         padding: '15px 0',
//                         borderBottom: '1px solid #e0e0e0'
//                       }}
//                     >
//                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//                         <div style={{ flex: 1 }}>
//                           <h4 style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>
//                             {food.food}
//                           </h4>
//                           <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
//                             {quantities[index]} item{quantities[index] > 1 ? 's' : ''}
//                           </p>
//                         </div>
//                         <div style={{ textAlign: 'right' }}>
//                           <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
//                             £{totalPrice.toFixed(2)}
//                           </div>
//                           <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
//                             <button
//                               onClick={() => handleDecrement(index)}
//                               style={{
//                                 width: '30px',
//                                 height: '30px',
//                                 border: '1px solid #ddd',
//                                 borderRadius: '50%',
//                                 backgroundColor: 'white',
//                                 cursor: 'pointer',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center'
//                               }}
//                             >
//                               -
//                             </button>
//                             <span style={{ minWidth: '20px', textAlign: 'center' }}>
//                               {quantities[index]}
//                             </span>
//                             <button
//                               onClick={() => handleIncrement(index)}
//                               style={{
//                                 width: '30px',
//                                 height: '30px',
//                                 border: '1px solid #ddd',
//                                 borderRadius: '50%',
//                                 backgroundColor: 'white',
//                                 cursor: 'pointer',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center'
//                               }}
//                             >
//                               +
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '20px', position: "fixed",width:"22%", bottom: "10px" }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
//                   <span style={{ fontSize: '14px', color: '#666' }}>Subtotal</span>
//                   <span style={{ fontSize: '14px', fontWeight: 'bold' }}>£{totalFoodPrice.toFixed(2)}</span>
//                 </div>

//                 {bagFee > 0 && (
//                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
//                     <span style={{ fontSize: '14px', color: '#666' }}>Bag fee</span>
//                     <span style={{ fontSize: '14px', fontWeight: 'bold' }}>£{bagFee.toFixed(2)}</span>
//                   </div>
//                 )}

//                 {activeTab === "Delivery" && (
//                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
//                     <span style={{ fontSize: '14px', color: '#666' }}>Delivery fee</span>
//                     <span style={{
//                       fontSize: '14px',
//                       fontWeight: 'bold',
//                       color: deliveryCharge === 0 ? '#28a745' : '#000'
//                     }}>
//                       {deliveryCharge === 0 ? 'Free' : `£${deliveryCharge.toFixed(2)}`}
//                     </span>
//                   </div>
//                 )}

//                 {serviceFee > 0 && (
//                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
//                     <span style={{ fontSize: '14px', color: '#666' }}>
//                       Service fee 5% (min £0.75 max £1.49)
//                     </span>
//                     <span style={{ fontSize: '14px', fontWeight: 'bold' }}>£{serviceFee.toFixed(2)}</span>
//                   </div>
//                 )}

//                 {couponDiscount > 0 && (
//                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
//                     <span style={{ fontSize: '14px', color: '#28a745' }}>
//                       {selectedCoupon?.type === "Percentage" ? `${selectedCoupon.value}%` : ''} discount
//                     </span>
//                     <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#28a745' }}>
//                       -£{couponDiscount.toFixed(2)}
//                     </span>
//                   </div>
//                 )}

//                 {savings > 0 && (
//                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
//                     <span style={{ fontSize: '14px', color: '#28a745' }}>You saved</span>
//                     <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#28a745' }}>
//                       £{savings.toFixed(2)}
//                     </span>
//                   </div>
//                 )}

//                 <div style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   paddingTop: '15px',
//                   borderTop: '2px solid #333',
//                   marginBottom: '20px'
//                 }}>
//                   <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Total</span>
//                   <span style={{ fontSize: '18px', fontWeight: 'bold' }}>£{totalAmountToPay.toFixed(2)}</span>
//                 </div>

//                 {hasItemsInCart && (
//                   <Button
//                     className="btn theme-btn w-100 rounded-2"
//                     style={{
//                       padding: '15px',
//                       fontSize: '16px',
//                       fontWeight: 'bold',
//                       backgroundColor: '#ff6b6b',
//                       border: 'none',
//                       color: 'white'
//                     }}
//                     onClick={() => setShow(true)}
//                   >
//                     Checkout
//                      {/* (£{totalAmountToPay.toFixed(2)}) */}
//                   </Button>
//                 )}
//               </div>

//             </>
//           )}
//         </div>

//         {/* Payment Modal */}
//         <Modal show={show} onHide={handleClose} centered>
//           <Modal.Header closeButton>
//             <Modal.Title>Select Payment Method</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexDirection: 'column' }}>
//               <Button
//                 onClick={handleCashOnDeliveryClick}
//                 className={`btn theme-btn ${buttonText === 'CONFIRM ORDER' ? 'active' : ''}`}
//                 style={{ marginBottom: '10px' }}
//               >
//                 {buttonText === 'CONFIRM ORDER' ? 'CONFIRM ORDER' : 'CASH ON DELIVERY'}
//               </Button>
//               {buttonText !== 'CONFIRM ORDER' && (
//                 <Button
//                   className="btn theme-btn"
//                   onClick={handlePayOnlineClick}
//                 >
//                   PAY ONLINE
//                 </Button>
//               )}
//             </div>
//           </Modal.Body>
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default Cart;


import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getcart } from "../store/feature/cartSlice";
import { addToCart, addOrder } from "../utils/api";
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cartlogo from '../assets/bucketlogo.png';


export default function Cart({ cart }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ----- selectors -----
  const { cartItems, count } = useSelector((store) => store.Cart);
  const activeTab = useSelector((store) => store.User?.activeTab);

  // ----- local state -----
  const [cartItem, setCartItem] = useState(null);
  const [CartFoods, setCartFoods] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [show, setShow] = useState(false);
  const [paymentMode, setPaymentMode] = useState('Stripe');
  const [isSelectingCOD, setIsSelectingCOD] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [cartId, setCartId] = useState("");
  const [restId, setRestId] = useState("");
  // const [extraTopupIds, setExtraTopupIds] = useState([]);
  const [foodQntity, setFoodQntity] = useState(0);
  const [pincode, setPincode] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [isCouponValid, setIsCouponValid] = useState(true);
  const [selectedTime, setSelectedTime] = useState("As soon as possible");

  // UI constants (you can derive these from your API or calculation)
  const bagFee = 0.60; // example
  const serviceFee = 1.49; // example

  // ----- safe localStorage parsing -----
  const storedUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || 'null');
    } catch {
      return null;
    }
  }, []);

  const Address = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('userAddress') || 'null');
    } catch {
      return null;
    }
  }, []);

  // ----- fetch cart once (and when count changes) -----
  useEffect(() => {
    dispatch(getcart());
  }, [dispatch]);

  useEffect(() => {
    // also re-fetch when count changes if you need it
    dispatch(getcart());
  }, [dispatch, count]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (cartItems && cartItems.cartmasters && cartItems.cartmasters.length > 0) {
      const cartmaster = cartItems.cartmasters[0];
      setFoodQntity(cartmaster?.foods.length);
      setQuantities(cartmaster.foods.map(food => food.quantity || 1));
      const extraTopupIds = cartmaster.foods.flatMap(food =>
        food.carttopupdetails.flatMap(topup =>
          topup.cartextratopupdetails.map(detail => detail.extratopupid)
        )
      );

      setCartFoods(cartmaster.foods);
      setCartItem(cartmaster);
      setQuantities(cartmaster.foods.map(food => food.quantity || 1));
      setCartId(cartmaster.cartid);
      setRestId(cartmaster.restid);
    }

    if (cartItems && cartItems.deliveryfeesdata && cartItems.deliveryfeesdata.length > 0) {
      const fees = cartItems.deliveryfeesdata.map(delivery => delivery.pincode);
      setPincode(fees);
    }
  }, [cartItems]);


  const totalFoodPrice = useMemo(() => {
    if (!Array.isArray(CartFoods) || CartFoods.length === 0) return 0;
    const qtys = Array.isArray(quantities) ? quantities : [];
    return CartFoods.reduce((acc, food, idx) => {
      const typeCost = Number(food.typecost) || 0;
      const extraTopUpCost = (food.carttopupdetails || []).reduce((sum, topup) => {
        const extras = (topup.cartextratopupdetails || []).reduce((s, extra) => s + (Number(extra.extratopupcost) || 0), 0);
        return sum + extras;
      }, 0);
      const q = Number(qtys[idx]) || 0;
      return acc + (typeCost + extraTopUpCost) * q;
    }, 0);
  }, [CartFoods, quantities]);

  const couponDiscount = useMemo(() => {
    if (!selectedCoupon) return 0;
    const couponValue = Number(selectedCoupon.value) || 0;
    const minOrderValue = Number(selectedCoupon.minvalue) || 0;

    if (totalFoodPrice < minOrderValue) {
      return 0;
    }

    return selectedCoupon.type === 'Percentage'
      ? (totalFoodPrice * couponValue) / 100
      : couponValue;
  }, [selectedCoupon, totalFoodPrice]);

  useEffect(() => {
    if (!selectedCoupon) {
      setIsCouponValid(true);
      return;
    }
    const min = Number(selectedCoupon.minvalue) || 0;
    setIsCouponValid(totalFoodPrice >= min);
  }, [selectedCoupon, totalFoodPrice]);

  const deliveryCharge = Number(cartItem?.deliverycharge) || 0;
  const serviceCharge = Number(cartItem?.servicecharge) || 0;

  // const totalAmountToPay = (activeTab === 'Delivery')
  //   ? totalFoodPrice + serviceCharge + deliveryCharge - couponDiscount + bagFee
  //   : totalFoodPrice + serviceCharge - couponDiscount + bagFee;

  const fmt = (n) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(n || 0);

  // const handleProceed = useCallback(async (food, quantity) => {
  //   console.log("handleProceed called with food:", food);
  //   console.log('====================================');
  //   console.log("quantity:", quantity);
  //   console.log('====================================');
  //   if (!food || quantity === undefined || quantity === null) return;
  //   setIsUpdatingQuantity(true);

  //   console.log("extraTopupIds", extraTopupIds)

  //   const sendData = {
  //     userid: storedUser?.userid,
  //     restId: restId,
  //     type: activeTab === 'Delivery' ? 'delivery' : 'takeaway',
  //     catid: food?.catid || '',
  //     foodid: food?.foodid || '',
  //     typeid: food?.typeid || '',
  //     extratopupid: extraTopupIds.length > 0 ? extraTopupIds : [],
  //     quantity: quantity.toString(),
  //     cartid: cartId,
  //     cartdetailid: food.cartdetailid,
  //   };

  //   console.log('sendData', sendData);

  //   try {
  //     await addToCart(sendData);
  //     dispatch(getcart());
  //   } catch (err) {
  //     toast.error('Failed to update cart.');
  //   } finally {
  //     setIsUpdatingQuantity(false);
  //   }
  // }, [storedUser, restId, extraTopupIds, cartId, activeTab, dispatch]);

  const handleProceed = useCallback(async (food, quantity) => {
    if (!food || quantity === undefined || quantity === null) return;
    setIsUpdatingQuantity(true);

    // Get extraTopupIds ONLY for this specific food
    const foodExtraTopupIds = (food.carttopupdetails || []).flatMap((topup) =>
      (topup.cartextratopupdetails || []).map((d) => d.extratopupid)
    );

    const sendData = {
      userid: storedUser?.userid,
      restId: restId,
      type: activeTab === 'Delivery' ? 'delivery' : 'takeaway',
      catid: food?.catid || '',
      foodid: food?.foodid || '',
      typeid: food?.typeid || '',
      extratopupid: foodExtraTopupIds.length > 0 ? foodExtraTopupIds : [], // ← Only this food's topups
      quantity: quantity.toString(),
      cartid: cartId,
      cartdetailid: food.cartdetailid,
    };

    console.log('sendData', sendData);

    try {
      await addToCart(sendData);
      dispatch(getcart());
    } catch (err) {
      toast.error('Failed to update cart.');
    } finally {
      setIsUpdatingQuantity(false);
    }
  }, [storedUser, restId, cartId, activeTab, dispatch]);

  const handleIncrement = (index) => {
    setQuantities((prev) => {
      const next = Array.from(prev || []);
      const current = Number(next[index]) || 0;
      next[index] = current + 1;
      // fire off API update
      handleProceed(CartFoods[index], next[index]);
      return next;
    });
  };

  const handleDecrement = (index) => {
    setQuantities((prev) => {
      const next = Array.from(prev || []);
      const current = Number(next[index]) || 0;
      if (current > 0) {
        next[index] = current - 1;
        handleProceed(CartFoods[index], next[index]);
      }
      return next;
    });
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const Addorder = async () => {
    if (!isCouponValid) {
      toast.error('Total amount is less than the minimum order value required for the selected coupon.');
      return;
    }

    setIsPlacingOrder(true);
    const paymentDateTime = getCurrentDateTime();

    const data = {
      customerid: storedUser?.userid,
      orderreferenceid: "",
      customerreqtime: selectedTime,
      ordertype: activeTab,
      deliverypostcode: pincode,
      restaurantid: restId,
      deliveryaddress: Address?.address,
      loyaltipointsconsume: "0.0",
      totalitem: foodQntity.toString(),
      coupondiscount: couponDiscount.toString(),
      loyaltidiscount: "0.0",
      deliverycharges: cartItem?.deliverycharge,
      servicecharges: cartItem?.servicecharge,
      netpayamount: totalAmountToPay.toString(),
      paymentmode: paymentMode,
      paymentreferenceid: "",
      paymentdatetime: paymentDateTime,
      orderdate: paymentDateTime
    };

    try {
      const order = await addOrder(data);
      if (!order) throw new Error('No response from order API');

      if (order.status === '0') {
        navigate('/cancel');
        return;
      }

      if (order.status === '1') {
        if (paymentMode === 'Stripe') {
          if (order.paymenturl) {
            window.location.href = order.paymenturl;
          } else {
            toast.error('Payment URL missing.');
          }
        } else {
          toast.success('Order placed successfully!');
          navigate('/confirmorder');
        }
      } else {
        toast.error('Failed to place the order. Please try again.');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while placing the order.');
    } finally {
      setIsPlacingOrder(false);
      setShow(false);
    }
  };

  const selectCOD = () => {
    setPaymentMode('Cash On Delivery');
    setIsSelectingCOD(true);
  };

  const confirmCOD = async () => {
    await Addorder();
  };

  const payOnline = async () => {
    setPaymentMode('Stripe');
    await Addorder();
  };

  const hasItemsInCart = Array.isArray(CartFoods) && CartFoods.length > 0 && (Array.isArray(quantities) ? quantities.some(q => Number(q) > 0) : false);

  const styles = {
    panel: {
      position: 'fixed',
      right: 0,
      top: '78px',
      height: '100vh',
      width: 498,
      maxWidth: '100%',
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1000,
      transition: 'transform 0.3s ease',
      '@media (min-width: 900px)': {
        display: 'none',
      },
    },
    header: {
      padding: '16px 20px',
      borderBottom: '2px solid black',
      textAlign: 'center'
    },
    itemsWrap: {
      padding: 16,
      overflowY: 'auto',
      flex: 1,
    },
    itemRow: {
      padding: '12px 0',
      borderBottom: '1px solid #eaeaea',
      display: 'flex',
      height: "auto",
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    footerSticky: {
      position: 'sticky',
      bottom: 0,
      background: '#fff',
      borderTop: '1px solid #e0e0e0',
      padding: 16,
      boxShadow: '0 -4px 12px rgba(0,0,0,0.04)'
    },
    checkoutButton: {
      width: '100%',
      padding: '12px 14px',
      fontSize: 16,
      fontWeight: 700,
      backgroundColor: '#e84135',
      border: 'none',
      color: 'white',
      borderRadius: 6,
      cursor: 'pointer'
    }
  };

  // const totalAmountToPay = (activeTab === 'Delivery')
  // ? totalFoodPrice + serviceCharge + deliveryCharge - couponDiscount + (hasItemsInCart ? bagFee : 0)
  // : totalFoodPrice + serviceCharge - couponDiscount + (hasItemsInCart ? bagFee : 0);

  const totalAmountToPay = (activeTab === 'Delivery')
    ? totalFoodPrice
    : totalFoodPrice;

  return (
    <div>
      {/* <style>{`@media (max-width: 720px) { .cart-panel { width: 100% !important; left: 0; right: 0; } }`}</style> */}
      <div style={{
        width: '25%',
        position: 'fixed',
        // right: 0,
        top: '78px',
        height: '100vh',
        // width: 498,
        maxWidth: '100%',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
        transition: 'transform 0.3s ease',
      }}
        className="no-scrollbar hide-on-mobile">
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid black',
          textAlign: 'center'
        }}>
          <h2 className='restaurant-name'>Basket</h2>
        </div>

        {/* <div style={{
          padding: "16",
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 200px)'
        }}>
          {(!Array.isArray(CartFoods) || CartFoods.length === 0 || !(Array.isArray(quantities) && quantities.some(q => Number(q) > 0))) ? (
            <div style={{ textAlign: 'center', padding: '40px 10px' }}>
              <img src={Cartlogo} alt="Cart Logo" style={{ maxWidth: 80, marginBottom: 16, borderRadius: '50%' }} />
              <h4 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Fill your basket</h4>
              <p style={{ marginTop: 8, color: '#666' }}>Your basket is empty</p>
            </div>
          ) : (
            <>
              {CartFoods.map((food, index) => {
                if ((Number(quantities[index]) || 0) === 0) return null;
                const typeCost = Number(food.typecost) || 0;
                const extraTopUpCost = (food.carttopupdetails || []).reduce((total, topup) => {
                  return total + (topup.cartextratopupdetails || []).reduce((s, extra) => s + (Number(extra.extratopupcost) || 0), 0);
                }, 0);
                const totalPrice = (typeCost + extraTopUpCost) * (Number(quantities[index]) || 0);

                return (
                  <div key={food.cartdetailid || food.foodid || index} style={{
                    padding: '12px 0',
                    borderBottom: '1px solid #eaeaea',
                    display: 'flex',
                    // height: "max-content",
                    // minHeight: "max-content",
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700 }}>{food.food}</div>
                      <div style={{ fontSize: 13, color: '#666', marginTop: 6 }}>{quantities[index]} item{quantities[index] > 1 ? 's' : ''}</div>
                    </div>

                    <div style={{ textAlign: 'right', marginLeft: 12 }}>
                      <div style={{ fontWeight: 700 }}>{fmt(totalPrice)}</div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => handleDecrement(index)}
                          aria-label={`Decrease quantity of ${food.food}`}
                          style={{ width: 34, height: 34, borderRadius: 34, border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}
                          disabled={isUpdatingQuantity}
                        >-</button>

                        <div style={{ minWidth: 28, textAlign: 'center' }}>{quantities[index]}</div>

                        <button
                          onClick={() => handleIncrement(index)}
                          aria-label={`Increase quantity of ${food.food}`}
                          style={{ width: 34, height: 34, borderRadius: 34, border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}
                          disabled={isUpdatingQuantity}
                        >+</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div> */}

        <div style={{
          padding: 16,
          overflowY: 'auto',
          flex: 1,
          maxHeight: 'calc(100vh - 290px)',
        }}>
          {(!Array.isArray(CartFoods) || CartFoods.length === 0 || !(Array.isArray(quantities) && quantities.some(q => Number(q) > 0))) ? (
            <div style={{ textAlign: 'center', padding: '40px 10px' }}>
              <img src={Cartlogo} alt="Cart Logo" style={{ maxWidth: 80, marginBottom: 16, borderRadius: '50%' }} />
              <h4 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Fill your basket</h4>
              <p style={{ marginTop: 8, color: '#666' }}>Your basket is empty</p>
            </div>
          ) : (
            <>
              {CartFoods.map((food, index) => {
                if ((Number(quantities[index]) || 0) === 0) return null;
                const typeCost = Number(food.typecost) || 0;
                const extraTopUpCost = (food.carttopupdetails || []).reduce((total, topup) => {
                  return total + (topup.cartextratopupdetails || []).reduce((s, extra) => s + (Number(extra.extratopupcost) || 0), 0);
                }, 0);
                const totalPrice = (typeCost + extraTopUpCost) * (Number(quantities[index]) || 0);

                return (
                  <div key={food.cartdetailid || food.foodid || index} style={{
                    padding: '12px 0',
                    borderBottom: '1px solid #eaeaea',
                    display: 'flex',
                    minHeight: "max-content",
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700 }}>{food.food}</div>
                      <div style={{ fontSize: 13, color: '#666', marginTop: 6 }}>{quantities[index]} item{quantities[index] > 1 ? 's' : ''}</div>
                    </div>

                    <div style={{ textAlign: 'right', marginLeft: 12 }}>
                      <div style={{ fontWeight: 700 }}>{fmt(totalPrice)}</div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, justifyContent: 'flex-end' }}>
                        {/* <button
                  onClick={() => handleDecrement(index)}
                  aria-label={`Decrease quantity of ${food.food}`}
                  style={{ width: 34, height: 34, borderRadius: 34, border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}
                  disabled={isUpdatingQuantity}
                >-</button> */}
                        {/* {quantities[index] > 1 ? (
                          <button
                            onClick={() => handleDecrement(index)}
                            aria-label={`Decrease quantity of ${food.food}`}
                            style={{ width: 34, height: 34, borderRadius: 34, border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}
                            disabled={isUpdatingQuantity}
                          >-</button>
                        ) : (
                          <button
                            onClick={() => handleDecrement(index)}
                            aria-label={`Remove ${food.food}`}
                            style={{
                              width: 34,
                              height: 34,
                              borderRadius: 34,
                              border: '1px solid #ddd',
                              background: '#fff',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                            disabled={isUpdatingQuantity}
                          >
                            🗑️
                          </button>
                        )} */}

                        <button
                          onClick={() => handleDecrement(index)}
                          aria-label={parseInt(quantities[index], 10) === 1 ? `Remove ${food.food}` : `Decrease quantity of ${food.food}`}
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: 34,
                            border: '1px solid #ddd',
                            background: '#fff',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          disabled={isUpdatingQuantity}
                        >
                          <i className={parseInt(quantities[index], 10) === 1 ? "bi bi-trash3" : "ri-subtract-line"} />
                        </button>

                        <div style={{ minWidth: 28, textAlign: 'center' }}>{quantities[index]}</div>

                        <button
                          onClick={() => handleIncrement(index)}
                          aria-label={`Increase quantity of ${food.food}`}
                          style={{ width: 34, height: 34, borderRadius: 34, border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}
                          disabled={isUpdatingQuantity}
                        >+</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        <div style={{
          position: 'fixed',
          bottom: 0,
          width: "25%",
          background: '#fff',
          borderTop: '1px solid #e0e0e0',
          padding: 16,
          boxShadow: '0 -4px 12px rgba(0,0,0,0.04)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            {/* <span style={{ color: '#666' }}>Subtotal</span>
            <strong>{fmt(totalFoodPrice)}</strong> */}
          </div>

          {/* <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ color: '#666' }}>Bag fee</span> */}
          {/* <strong>{fmt(bagFee)}</strong> */}
          {/* <strong>{fmt(CartFoods.length === 0 ? 0 : bagFee)}</strong>
          </div> */}

          {/* {activeTab === 'Delivery' && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ color: '#666' }}>Delivery fee</span>
              <strong style={{ color: deliveryCharge === 0 ? '#28a745' : '#000' }}>{deliveryCharge === 0 ? 'Free' : fmt(deliveryCharge)}</strong>
            </div>
          )} */}

          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid black', paddingTop: 12, marginBottom: 12 }}>
            <span style={{ fontSize: 16, fontWeight: 700 }}>Subtotal</span>
            <span style={{ fontSize: 16, fontWeight: 700 }}>{fmt(totalAmountToPay)}</span>
          </div>

          <Link to="/cart" style={{ textDecoration: 'none' }}>
            <button
              style={styles.checkoutButton}
            >
              Continue
            </button>
          </Link>
        </div>
      </div>
    </div >
  );
}
