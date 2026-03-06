import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiShoppingCart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { getcart } from "../store/feature/cartSlice";

const CartFloat = () => {
  const { cartItems } = useSelector((store) => store.Cart);
  const [cartLength, setCartLength] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getcart());
  }, [dispatch]);

  useEffect(() => {
    if (cartItems?.cartmasters) {
      const length = cartItems.cartmasters.reduce((acc, cart) => acc + (cart.foods?.length || 0), 0);
      setCartLength(length);
    }
  }, [cartItems]);

  const handleClick = () => {
    navigate('/cart');
  };

  return (
    <div className="cart-float">
      <CiShoppingCart size={24} onClick={handleClick} />
      {cartLength > 0 && (
        <span style={{
          position: 'absolute',
          top: '-10px',
          right: '-10px',
          backgroundColor: 'red',
          color: 'white',
          borderRadius: '50%',
          padding: '5px 10px',
          fontSize: '12px'
        }}>
          {cartLength}
        </span>
      )}
    </div>
  );
};

export default CartFloat;
