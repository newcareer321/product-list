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

export default function BoxDesserts({ cart, setCart }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAdded, setIsAdded] = useState(Array(desserts.length).fill(false)); // Track "Add to Cart" state for each item

  // Function to toggle image border
  const handleImageClick = (index) => {
    setSelectedImage(index === selectedImage ? null : index);
    if (!isAdded[index]) {
      toggleCart(index); // Automatically add item to cart on image click
    }
  };

  // Function to toggle the "Add to Cart" state
  const toggleCart = (index) => {
    setIsAdded((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index]; // Toggle the specific item
      return newState;
    });
  };

  const toggleCartOnImg = (index, action) => {
    const newCart = [...cart];
    if (action === "increment") {
      newCart[index].count += 1; // Increment count without any limit
    } else if (action === "decrement" && newCart[index].count > 0) {
      newCart[index].count -= 1; // Only decrement if greater than 0
    }
    setCart(newCart);
  };

  return (
    <div className="box-desserts">
      <h2 className="Desserts">Desserts</h2>
      <div className="grid-container">
        {desserts.map((dessert, index) => (
          <div className="grid-item" key={index}>
            <div className="image-container">
              <img
                src={dessert.image}
                alt={dessert.name}
                className={`image ${selectedImage === index ? "selected" : ""}`}
                onClick={(e) => {
                  e.stopPropagation(); // Prevents image click from toggling the button
                  handleImageClick(index); // Just select the image
                }}
              />
              {/* Cart Buttons */}
              {!isAdded[index] ? (
                <button
                  className="add-to-cart"
                  onClick={() => {
                    toggleCart(index);
                    toggleCartOnImg(index, "increment"); // Add item to cart on button click
                  }}
                >
                  <span>
                    <img src={AddToCart} alt="Add to Cart" />
                  </span>
                  <span>Add to Cart</span>
                </button>
              ) : (
                <button
                  className="increament-decreament-sign-cart"
                  onClick={() => toggleCart(index)}
                >
                  <span className="inc-dec">
                    <img
                      src={Increment}
                      alt="Increment Item"
                      onClick={(e) => {
                        e.stopPropagation(); // Allow increment to work without affecting parent
                        toggleCartOnImg(index, "increment"); // Increment the count
                      }}
                    />

                    <span className="count-display">{cart[index].count}</span>
                    <img
                      src={Decrement}
                      alt="Decrement Item"
                      onClick={(e) => {
                        e.stopPropagation(); // Allow decrement to work without affecting parent
                        toggleCartOnImg(index, "decrement"); // Decrement the count
                      }}
                    />
                  </span>
                </button>
              )}
            </div>

            <div className="item-details">
              <p>{dessert.name.split(" ")[0]}</p>
              <h2>{dessert.name}</h2>
              <p className="price">{dessert.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
