import React from "react";
import { useState } from "react";

import Waffle from "../assets/images/image-waffle-desktop.jpg";
import Vanilla from "../assets/images/image-creme-brulee-desktop.jpg";
import Macaron from "../assets/images/image-macaron-desktop.jpg";
import Tiramisu from "../assets/images/image-tiramisu-desktop.jpg";
import Baklaba from "../assets/images/image-baklava-desktop.jpg";
import Meringue from "../assets/images/image-meringue-desktop.jpg";
import Cake from "../assets/images/image-cake-desktop.jpg";
import Brownie from "../assets/images/image-brownie-desktop.jpg";
import Panna from "../assets/images/image-panna-cotta-desktop.jpg";
import AddToCart from "../assets/images/icon-add-to-cart.svg";
import Increment from "../assets/images/icons8-plus-50.png";
import Decrement from "../assets/images/icons8-minus-50.png";
import CakeCartImg from "../assets/images/illustration-empty-cart.svg";
import Delete from "../assets/images/icon-remove-item.svg";
import Carbon from "../assets/images/icon-carbon-neutral.svg";
import OrderConfirmed from "../assets/images/icon-order-confirmed.svg";

const desserts = [
  { name: "Waffle With Berries", price: "$6.50", image: Waffle },
  { name: "Vanilla Bean Creme Brule ", price: "$7.00", image: Vanilla },
  { name: "Macaron Mix of Five", price: "$8.00", image: Macaron },
  { name: "Classic Tiramisu", price: "$5.50", image: Tiramisu },
  { name: "Pistachio Baklava", price: "$4.00", image: Baklaba },
  { name: "Lemon Meringue Pie", price: "$5.00", image: Meringue },
  { name: "Red Velvet Cake", price: "$4.50", image: Cake },
  { name: "Salted Caramel Brownie", price: "$5.50", image: Brownie },
  { name: "Vanilla Panna Cotta", price: "$6.50", image: Panna },
];

const calculateTotalPrice = (price, count) => {
  const numericPrice = parseFloat(price.replace("$", "")); // Convert price string to a number
  return numericPrice * count; // Return a number without formatting
};

export default function BoxCart({ cart, setCart }) {
  const totalItems = cart.reduce((sum, item) => sum + item.count, 0);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false); // State for confirming the order

  const handleCancel = (index) => {
    const newCart = [...cart];
    newCart[index].count = 0; // Reset item count to 0 when canceled
    setCart(newCart);
  };

  const handleConfirmOrder = () => {
    setIsOrderConfirmed(true); // Confirm the order and display the confirmation container
  };

  const handleStartNewOrder = () => {
    setCart(cart.map(() => ({ count: 0 }))); // Reset all item counts to 0
    setIsOrderConfirmed(false); // Hide the confirmation container
    window.location.reload(); // Reload the window to navigate to the start page
  };

  // Calculate total price for all items in the cart
  const orderTotal = cart
    .reduce(
      (total, item, index) =>
        total + calculateTotalPrice(desserts[index].price, item.count),
      0
    )
    .toFixed(2);

  return (
    <div className="box-cart">
      <div className="right-container">
        <h2>Your Cart ({totalItems})</h2>
      </div>
      {/* Conditionally render the image and paragraph only if cart is empty */}
      {totalItems === 0 ? (
        <>
          <img src={CakeCartImg} alt="Your Cart" />
          <p>Your added items will appear here</p>
        </>
      ) : (
        <div className="cart-map">
          {cart.map(
            (item, index) =>
              item.count > 0 && (
                <div key={index} className="cart-div">
                  <span className="abc">
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <span>
                        <strong style={{ fontSize: "15px" }}>
                          {desserts[index].name}
                        </strong>{" "}
                        <span>
                          {" "}
                          - {desserts[index].price} x {item.count} ={" "}
                        </span>
                      </span>
                      <span
                        style={{
                          display: "flex",
                          marginLeft: "-10em",
                        }}
                      >
                        <strong>
                          $
                          {calculateTotalPrice(
                            desserts[index].price,
                            item.count
                          )}{" "}
                          -
                        </strong>
                        <span
                          className="count-display"
                          style={{ marginLeft: "8px" }}
                        >
                          {item.count}
                        </span>
                      </span>
                    </span>
                  </span>
                  <button
                    className="cancel-btn"
                    onClick={() => handleCancel(index)}
                  >
                    <img src={Delete} alt="Delete the Image" />
                  </button>
                </div>
              )
          )}
          {/* Display the total order price in the bottom-right corner */}
          <div
            className="order-total"
            style={{
              textAlign: "right",
              marginTop: "20px",
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>Order Total:</span>
            <strong style={{ fontSize: "30px" }}>${orderTotal}</strong>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#f5f2eb",
              borderRadius: "10px",
              marginTop: "20px",
            }}
          >
            <span style={{ marginLeft: "-22px" }}>
              <img src={Carbon} alt="" />
            </span>
            <p style={{ fontWeight: "400" }}>
              This is a{" "}
              <span style={{ fontWeight: "bold" }}>carbon-neutral </span>
              delivery
            </p>
          </div>
          {/* Confirm Order Button */}
          <button
            style={{
              marginTop: "20px",
              padding: "12px 0px",
              background: "red",
              color: "white",
              width: "28em",
              borderRadius: "25px",
              cursor: "pointer",
              border: "none",
            }}
            onClick={handleConfirmOrder}
          >
            Confirm Order
          </button>
        </div>
      )}
      {/* Confirmed Order Section */}
      {isOrderConfirmed && (
        <div
          className="confirmed-order-container"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent background
            backdropFilter: "blur(10px)", // Adjust the blur level here
            zIndex: 1000, // Make sure it's above other content
          }}
        >
          <div
            className="confirmed-order"
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "80%",
              maxHeight: "80vh",
              maxWidth: "500px",
              textAlign: "center", // Align text to the left side
            }}
          >
            <img
              src={OrderConfirmed}
              alt="Order Confirmed"
              style={{ marginLeft: "-100px" }}
            />

            <h2 style={{ marginTop: "10px" }}>Order Confirmed:</h2>
            <p style={{ marginLeft: "-6px" }}>We hope you enjoy your food!</p>
            <div
              style={{
                backgroundColor: "#f5f2eb",
                padding: "20px",
                borderRadius: "10px",
                maxHeight: "40vh", // Set a max height for vertical scrolling
                maxWidth: "100%", // Adjust width as needed
                overflowY: "auto", // Enable vertical scrolling
                overflowX: "auto", // Enable horizontal scrolling (if necessary)
                border: "1px solid #ccc", // Optional: for visual clarity
                padding: "10px", // Optional: for some spacing inside
              }}
            >
              {cart.map(
                (item, index) =>
                  item.count > 0 && (
                    <div key={index} className="order-item-row">
                      <img
                        src={desserts[index].image}
                        alt={desserts[index].name}
                        className="order-item-image"
                      />
                      <div className="order-item-details">
                        <span>{desserts[index].name}</span>
                        <span>
                          {item.count} x {desserts[index].price}
                        </span>
                      </div>
                      <div className="order-item-total">
                        <strong>
                          $
                          {calculateTotalPrice(
                            desserts[index].price,
                            item.count
                          )}
                        </strong>
                      </div>
                    </div>
                  )
              )}
              <div
                className="total-confirmed"
                style={{
                  marginTop: "20px",
                  textAlign: "center", // Ensure the total is aligned to the left
                  fontSize: "18px",
                  position: "static",
                }}
              >
                <strong>Total: ${orderTotal}</strong>
              </div>
            </div>

            {/* Start New Order Button */}
            <button
              className="start-new-order-btn"
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                background: "green",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={handleStartNewOrder}
            >
              Start New Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
