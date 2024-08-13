import React, { useState } from "react";
import { Account, CartIcon } from "./icons/icons";
import Pic from "../assets/triod.png";
import { useNavigate } from "react-router-dom";
function Consumer() {
  const [tab, setTab] = useState(tabs[0]);
  const navigate = useNavigate();
  const items = [
    {
      title: "Bridge Diode 2W10 (Heady)",
      price: 48.19,
      img: Pic,
      id: 5411
    },
    {
      title: "Zener Diode 1N4733 5.1V",
      price: 160.99,
      img: Pic,
      id: 1650

    },
    {
      title: "L7809 Voltage Regulator",
      price: 23.33,
      img: Pic,
      id: 3415
    },
  ];
  return (
    <div className="py-10 px-4 font-poppins w-auto h-screen overflow-y-auto bg-bg-gray">
      {/* header */}
      <div className="header flex justify-between gap-5">
        <h2 className="font-bold text-left text-3xl w-fit px-3">Discover</h2>
        <section className="grid grid-cols-2 gap-2 w-fit">
          <button className="rounded-full bg-white p-2 w-10 h-10 justify-center items-center flex">
            <Account />
          </button>
          <button className="rounded-full bg-white p-2 w-10 h-10 justify-center items-center flex">
            <CartIcon />
          </button>
        </section>
      </div>
      {/* tab */}
      <div>
        <ul className="flex gap-2 w-full overflow-x-auto items-center py-5">
          {tabs.map((t, tId) => {
            return (
              <li
                key={`id-${tId}`}
                className={`relative w-fit text-nowrap px-1 mx-2 transition-colors duration-200 text-base ${
                  t === tab ? "text-default-green" : "text-place"
                }`}
                onClick={() => setTab(t)}
              >
                {t}
                {t === tab && (
                  <span className="absolute rounded-full bg-default-green text-default-green w-1 h-1 p-1 -bottom-2 left-1/2 -translate-x-1/2"></span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div
        className={`${tab === tabs[0] ? "grid grid-cols-2 gap-5" : "hidden"}`}
      >
        {items.map((item, itemId) => {
          return (
            <ItemCart
              key={`item-id${itemId}`}
              image={item.img}
              price={item.price}
              title={item.title}
              onClick={() => {
                navigate("/product/" + item.id);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
const ItemCart = ({ image, title, price, imgAlt, onClick }) => {
  /* you may route onClick each-cart. I have made just a single cart  */

  return (
    <div className="bg-white rounded-[20px] p-2 text-left" onClick={onClick}>
      <img
        className="rounded-2xl w-full mx-auto"
        src={image}
        alt={imgAlt || "Image.png"}
        width={300}
        height={300}
      />
      <p className="text-sm pt-2">{title}</p>
      <p className="text-default-gray font-semibold text-base py-3">
        <span className="text-default-green">৳</span> {price}{" "}
      </p>
    </div>
  );
};
const tabs = ["All Products", "Transistors", "Sensors", "Architectures"];
export default Consumer;
