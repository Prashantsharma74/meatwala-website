import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { getcart } from "../store/feature/cartSlice";
import { addToCart, addOrder } from "../utils/api";
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cartlogo from '../assets/bucketlogo.png'


const Cart = ({ cart }) => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const Address = JSON.parse(localStorage.getItem('userAddress'));
  const { cartItems } = useSelector((store) => store.Cart);

  const [cartItem, setCartItem] = useState(null);
  const [CartFoods, setCartFoods] = useState([]);
  const [quantities, setQuantities] = useState([]); // State to store quantities
  const [show, setShow] = useState(false);
  const [buttonText, setButtonText] = useState('PAY ONLINE');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartId, setCartId] = useState("");
  const [restId, setRestId] = useState("");

  const [extraTopupIds, setExtraTopupIds] = useState([]);
  const [foodQntity, setFoodQntity] = useState(0)
  const [pincode, setPincode] = useState("")
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [isCouponValid, setIsCouponValid] = useState(true);
  const activeTab = useSelector((store) => store.User.activeTab);
  const { count } = useSelector((store) => store.Cart);



  useEffect(() => {
    dispatch(getcart());
  }, [dispatch]);

  useEffect(() => {
    const check = dispatch(getcart());
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

      setExtraTopupIds(extraTopupIds);
    }

    if (cartItems && cartItems.deliveryfeesdata && cartItems.deliveryfeesdata.length > 0) {
      const fees = cartItems.deliveryfeesdata.map(delivery => delivery.pincode);
      setPincode(fees);
    }
  }, [cartItems]);



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
      return acc + parseFloat(topup.cartextratopupdetails.reduce((acc2, extra) => {
        return acc2 + parseFloat(extra.extratopupcost) || 0;
      }, 0)) || 0;
    }, 0);
    return total + (typeCost + extraTopUpCost) * quantities[index];
  }, 0);

  const serviceCharge = parseFloat(cartItem?.servicecharge) || 0;

  const deliveryCharge = parseFloat(cartItem?.deliverycharge) || 0;
  const couponDiscount = calculateCouponDiscount();

  const totalAmountToPay = activeTab === "Delivery"
    ? totalFoodPrice + serviceCharge + deliveryCharge - couponDiscount
    : totalFoodPrice + serviceCharge - couponDiscount;
  const handleProceed = async (food, quantity) => {
    if (!food || quantity === undefined || quantity === null) {
      return;
    }

    const sendData = {
      userid: storedUser?.userid,
      restId: restId,
      type: activeTab == "Delivery" ? "delivery" : "takeaway",
      catid: food?.catid || "",
      foodid: food?.foodid || "",
      typeid: food?.typeid || "",
      extratopupid: extraTopupIds.length > 0 ? extraTopupIds : [],
      quantity: quantity.toString(),
      cartid: cartId,
      cartdetailid: food.cartdetailid,
    };

    await addToCart(sendData);

  };



  const handleIncrement = (index) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      const currentQuantity = parseInt(newQuantities[index], 10) || 0;
      newQuantities[index] = currentQuantity + 1;
      handleProceed(CartFoods[index], newQuantities[index]);
      return newQuantities;
    });
  };


  const handleDecrement = (index) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      const currentQuantity = parseInt(newQuantities[index], 10) || 0;
      if (currentQuantity > 0) {
        newQuantities[index] = currentQuantity - 1;
        handleProceed(CartFoods[index], newQuantities[index]);
      } else {
        console.log("Cannot decrement further.");
      }


      return newQuantities;
    });
  };




  const handleClose = () => setShow(false);



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








  const [paymentMode, setPaymentMode] = useState('Stripe');


  const Addorder = async () => {
    const paymentDateTime = getCurrentDateTime();

    if (!isCouponValid) {
      toast.error("Total amount is less than the minimum order value required for the selected coupon.");
      return;
    }

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
      if (order.status == "0") {
        navigate("/cancel")
      }

      if (order.status === "1") {
        if (paymentMode === "Stripe") {
          window.location.href = order.paymenturl;
        } else {
          toast.success("Order placed successfully!");
          navigate('/confirmorder');
        }
      } else {
        toast.error("Failed to place the order. Please try again.");
      }


    } catch (error) {
      toast.error("An error occurred while placing the order.");
    }
  };

  const handlePaymentModeChange = (mode) => {
    setPaymentMode(mode);
  };


  const handleCashOnDeliveryClick = async () => {
    handlePaymentModeChange('Cash On Delivery');
    setButtonText('CONFIRM ORDER');
    if (buttonText === 'CONFIRM ORDER') {
      const res = await Addorder()
    }
  };

  const handlePayOnlineClick = () => {
    handlePaymentModeChange('Stripe');
    Addorder();
  };


  const [selectedTime, setSelectedTime] = useState("As soon as possible");

  return (
    <>
      <div
        style={{
          width: '100%',
        }}
        className="no-scrollbar hide-on-mobile"
      >
        <div style={{ width: '100%' }}>
          <div className="row g-lg-4">
            <div className="col-lg-12">
              <div style={{ width: '100%' }}>
                <div style={{ width: '100%' }}>
                  {CartFoods.length === 0 || quantities.every(quantity => quantity === 0) ? (
                    <div
                      style={{
                        textAlign: 'center',
                        padding: '20px',
                        backgroundColor: '#f9f9f9',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      }}
                    >
                      <img
                        src={Cartlogo}
                        alt="Cart Logo"
                        style={{ maxWidth: '50px', marginBottom: '20px', borderRadius: '50%' }}
                      />
                      <h4 style={{ color: '#333', fontSize: '18px', fontWeight: '600' }}>
                        Fill your basket
                      </h4>
                      <p style={{ color: '#666', fontSize: '12px' }}>Your basket is empty</p>
                    </div>
                  ) : (
                    <ul style={{ listStyle: 'none', padding: 5, margin: 0 }}>
                      {CartFoods.map((food, index) => {
                        if (quantities[index] === 0) return null; 

                        const typeCost = parseFloat(food.typecost) || 0;
                        const extraTopUpCost = food.carttopupdetails.reduce((total, topup) => {
                          return (
                            total +
                            parseFloat(
                              topup.cartextratopupdetails.reduce((acc, extra) => {
                                return acc + parseFloat(extra.extratopupcost) || 0;
                              }, 0)
                            ) || 0
                          );
                        }, 0);
                        const totalPrice = (typeCost + extraTopUpCost) * quantities[index];

                        return (
                          <li
                            key={index}
                            style={{
                              borderBottom: '1px solid #ddd',
                              padding: '15px',
                              marginBottom: '10px',
                              borderRadius: '8px',
                              backgroundColor: '#f9f9f9',
                              width: '100%',
                            }}
                          >
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}
                              >
                                <div style={{ flex: 1 }}>
                                  <h5 style={{ margin: 0, color: '#333' }}>{food.food}</h5>
                                  <h6 style={{ margin: '5px 0', color: '#666' }}>{food.menutype}</h6>
                                </div>
                                <h6 style={{ margin: 0, color: '#333', fontWeight: 'bold' }}>
                                  £{totalPrice.toFixed(2)}
                                </h6>
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}
                              >
                                <div
                                  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                                >
                                  <i
                                    className="ri-subtract-line sub"
                                    onClick={() => handleDecrement(index)}
                                    style={{ cursor: 'pointer', color: 'rgb(232, 65, 53)' }}
                                  />
                                  <input
                                    type="number"
                                    value={quantities[index]}
                                    readOnly
                                    style={{
                                      width: '60px',
                                      textAlign: 'center',
                                      border: '1px solid #ddd',
                                      borderRadius: '4px',
                                    }}
                                  />
                                  <i
                                    className="ri-add-line add"
                                    onClick={() => handleIncrement(index)}
                                    style={{ cursor: 'pointer', color: 'green' }}
                                  />
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  {CartFoods.length > 0 && quantities.some(quantity => quantity > 0) && (
                    <>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginTop: '20px',
                        }}
                      >
                        <h6 style={{ margin: 0, fontWeight: 'bold', color: '#333' }}>To Pay</h6>
                        <h6 style={{ margin: 0, fontWeight: 'bold' }}>
                          £{totalAmountToPay.toFixed(2)}
                        </h6>
                      </div>
                      <div style={{ marginTop: '20px' }}>
                        <Link to={'/cart'}>
                          <Button className="btn theme-btn restaurant-btn w-100 rounded-2">
                            CHECKOUT
                          </Button>
                        </Link>
                        <Modal show={show} onHide={handleClose} centered>
                          <Modal.Header closeButton>
                            <Modal.Title>Select Payment Method</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '10px',
                              }}
                            >
                              <Button
                                onClick={handleCashOnDeliveryClick}
                                className={`me-2 btn theme-btn ${buttonText === 'CONFIRM ORDER' ? 'active' : ''}`}
                              >
                                {buttonText === 'CONFIRM ORDER' ? 'CONFIRM ORDER' : 'CASH ON DELIVERY'}
                              </Button>

                              {buttonText !== 'CONFIRM ORDER' && (
                                <Button
                                  className="btn theme-btn"
                                  onClick={handlePayOnlineClick}
                                >
                                  PAY ONLINE
                                </Button>
                              )}
                            </div>
                          </Modal.Body>
                        </Modal>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );



};


export default Cart;


