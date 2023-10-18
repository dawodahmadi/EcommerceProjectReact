import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IconButton, Modal, Box, Button, TextField } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import "./ItemCard.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ItemCard = (props) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState({
    accountNumber: "",

  });
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const userId = localStorage.getItem("userId"); // Retrieve user ID from local storage or wherever it is stored

    if (!userId) {
      navigate("/account/Login");
      return;
    }

    const existingItemIndex = cartItems.findIndex((item) => item.id === props.item._id);

    if (existingItemIndex !== -1) {
      // If the item already exists in the cart, update its quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      // If the item is not in the cart, add it with quantity 1
      const updatedCartItems = [
        ...cartItems,
        {
          id: props.item._id,
          name: props.item.name,
          price: props.item.price,
          imageURL: props.item.imageURL,
          quantity: 1,
        },
      ];
      setCartItems(updatedCartItems);
    }
    setCartOpen(true);
  };
  const handleCartClose = () => {
    setCartOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckout = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        navigate("/account/Login");
        return;
      }

      const totalAmountCents = Math.round(
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0) * 100
      );
      const checkoutData = {
        amount: totalAmountCents,
        currency: "usd",
      };

      const responsePaymentIntent = await axios.post(
        "http://localhost:5000/create-payment-intent",
        checkoutData
      );

      if (responsePaymentIntent.data.clientSecret) {
        setOpen(false);
        handlePayment();
      } else {
        console.error("Invalid clientSecret received from the server");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
    setCartOpen(false);
    setPaymentOpen(true);
  };

  const handlePaymentClose = async () => {
    try {
      const cardNumber = document.getElementById('card-number').value;
      const expiryDate = document.querySelector('.month-own').value + '/' + document.querySelector('.year-own').value;
      const cvc = document.getElementById('card-cvc').value;
      const cardholderName = document.getElementById('cardholder-name').value;
      const mobileNumber = document.getElementById('mobile-number').value;

  
      const response = await axios.post('http://localhost:5000/api/payment/process-payment', {
        cardNumber,
        expiryDate,
        cvc,
        cardholderName,
        mobileNumber,
      });


      console.log(response.data); 
      alert("Payment successful!"); 
    } catch (error) {
      
      console.error('Error during payment:', error);
    
    } finally {
    
      setPaymentOpen(false);
    }
  };




  const onlyNumberKey = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  };

  return (
    <div className="product__card__card">
      <div className="product__image">
        <Link to={`/item/${props.item.category}/${props.item._id}`}>
          <img
            src={props.item.imageURL}
            alt={props.item.name}
            className="product__img"
          />
        </Link>
      </div>
      <div className="product__card__detail">
        <div className="product__name">
          <Link to={`/item/${props.item.category}/${props.item._id}`}>
            {props.item.name}
          </Link>
        </div>
        <div className="product__description">
          <span>{props.item.description}</span>
        </div>
        <div className="product__price">
          <span>${props.item.price}</span>
        </div>
        <div className="product__card__action">
          {/* <IconButton>
            <FavoriteBorderIcon />
          </IconButton> */}
          <IconButton onClick={handleAddToCart}>
            <AddShoppingCartIcon />
          </IconButton>
        </div>
      </div>
      <Modal open={cartOpen} onClose={handleCartClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>Your Cart</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.imageURL}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <span>{item.name}</span>
                <span>${item.price}</span>
                <span>Quantity: {item.quantity}</span>
              </div>
            </div>
          ))}
          <Button variant="outlined" onClick={handleCheckout}>
            Checkout
          </Button>
        </Box>
      </Modal>

      <Modal open={paymentOpen} onClose={handlePaymentClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 12,
            textAlign: 'center',
          }}
        >
          <div className="payment-card-form">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Card Details</h2>
            <div className="payment-card-input">
              <label htmlFor="card-number" style={{ display: 'block', marginBottom: '0.5rem' }}>Card Number</label>
              <input
                type="text"
                id="card-number"
                placeholder="xxxx xxxx xxxx xxxx"
                maxLength="19"
                onKeyPress={onlyNumberKey}
                style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: 8, border: '1px solid #ccc' }}
                required
              />
            </div>
            <div className="payment-card-input">
              <label htmlFor="expiry-date" style={{ display: 'block', marginBottom: '0.5rem' }}>Expiry Date</label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  className="numbers month-own"
                  type="text"
                  placeholder="MM"
                  maxLength="2"
                  data-def="MM"
                  style={{ width: '40px', padding: '0.5rem', marginRight: '0.5rem', borderRadius: 8, border: '1px solid #ccc' }}
                  required
                />
                <span className="m-md">/</span>
                <input
                  className="numbers year-own"
                  type="text"
                  placeholder="YYYY"
                  maxLength="4"
                  data-def="YYYY"
                  style={{ width: '60px', padding: '0.5rem', marginLeft: '0.5rem', borderRadius: 8, border: '1px solid #ccc' }}
                  required
                />
              </div>
            </div>
            <div className="payment-card-input">
              <label htmlFor="card-cvc" style={{ display: 'block', marginBottom: '0.5rem' }}>CVC Number</label>
              <input
                id="card-cvc"
                type="password"
                placeholder="xxx"
                maxLength="3"
                onKeyPress={onlyNumberKey}
                style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: 8, border: '1px solid #ccc' }}
                required
              />
            </div>
            <div className="payment-card-input">
              <label htmlFor="cardholder-name" style={{ display: 'block', marginBottom: '0.5rem' }}>Cardholder Name</label>
              <input
                id="cardholder-name"
                type="text"
                className="uppercase"
                placeholder="CARDHOLDER NAME"
                style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: 8, border: '1px solid #ccc' }}
                required
              />
            </div>
            <div className="payment-card-input">
              <label htmlFor="mobile-number" style={{ display: 'block', marginBottom: '0.5rem' }}>Mobile No.</label>
              <input
                id="mobile-number"
                type="text"
                placeholder="Your Mobile No."
                style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: 8, border: '1px solid #ccc' }}
                required
              />
            </div>
            <div className="action" style={{ marginTop: '1rem' }}>
              <button
                type="submit"
                className="b-main-color pointer"
                style={{
                  padding: '0.75rem 2rem',
                  borderRadius: '24px',
                  fontSize: '1rem',
                  background: '#4caf50',
                  color: 'white',
                  border: 'none'
                }}
                onClick={handlePaymentClose}
              >
                Pay Now
              </button>
            </div>
          </div>
        </Box>
      </Modal>



    </div>
  );
};

export default ItemCard;
