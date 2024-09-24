import React, { useState } from "react";
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
import CakeCartImg from "../assets/images/illustration-empty-cart.svg";
import Decrement from "../assets/images/icons8-minus-50.png";
import Increment from "../assets/images/icons8-plus-50.png";
import Delete from "../assets/images/icon-remove-item.svg";
import Carbon from "../assets/images/icon-carbon-neutral.svg";
import OrderConfirmed from "../assets/images/icon-order-confirmed.svg";
import BoxDesserts from "./BoxDesserts";
import BoxCart from "./BoxCart";

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

export default function App() {
  const [cart, setCart] = useState(desserts.map(() => ({ count: 0 }))); // Initialize cart state

  return (
    <div className="card-container">
      <BoxDesserts cart={cart} setCart={setCart} />
      <BoxCart cart={cart} setCart={setCart} />
    </div>
  );
}
