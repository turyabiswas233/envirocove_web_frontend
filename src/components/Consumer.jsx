import React, { useEffect, useState } from "react";
import { Account, CartIcon } from "./icons/icons";
import Pic from "../assets/triod.png";
import { useLocation, useNavigate } from "react-router-dom";
import { product, account } from "../api/index";
function Consumer() {
  const [tab, setTab] = useState(tabs[0]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    account
      .profile("GET")
      .then(async (res) => {
        const data = await res.json();
        if (data) {
          if (data.is_active) return;
          else {
            navigate("/");
          }
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    product
      .list()
      .then((res) => res.json())
      .then((res) => {
        // console.log(ress);
        if (Array.isArray(res)) {
          setItems(res);
        } else setItems([]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) return <div className="p-10"> loading...</div>;
  return (
    <div className="py-10 px-4  w-auto h-screen overflow-y-auto bg-bg-gray">
      {/* header */}
      <div className="header flex justify-between gap-5">
        <h2 className="font-bold text-left text-3xl w-fit px-3">Discover</h2>
        <section className="flex flex-nowrap gap-2 w-fit">
          <button className="rounded-full bg-white p-2 w-10 h-10 justify-center items-center flex">
            <Account />
          </button>
          <button className="rounded-full bg-white p-2 w-10 h-10 justify-center items-center flex">
            <CartIcon />
          </button>
          <button
            className="rounded-full bg-rose-400 p-2 justify-center items-center flex"
            onClick={() => {
              account
                .logout()
                // .then((res) => res.json())
                .then((d) => console.log(d.json()));
              // .catch((e) => console.warn(e));
            }}
          >
            logout
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
        {items.length > 0 ? (
          items.map((item, itemId) => {
            return (
              <ItemCart
                key={`item-id${itemId}`}
                image={Pic}
                price={item.price}
                title={item.title}
                quantity={item.quantity}
                condition={item.condition}
                category={item.category}
                onClick={() => {
                  navigate("/product/" + item.id);
                }}
              />
            );
          })
        ) : (
          <p>{"No products available" + "TOKEN"}</p>
        )}
      </div>
    </div>
  );
}
const ItemCart = ({
  image,
  title,
  price,
  imgAlt,
  weight,
  description,
  condition,
  category,
  quantity,
  onClick,
}) => {
  console.log(category);

  return (
    <div
      className="bg-white hover:bg-gray-900/20 transition-colors rounded-[20px] p-2 text-left"
      onClick={onClick}
    >
      <img
        className="rounded-2xl w-full mx-auto"
        src={image}
        alt={imgAlt || "Image.png"}
        width={300}
        height={300}
      />
      <p className="text-sm pt-2">{title}</p>
      <p className="text-default-gray font-semibold text-base pt-2 pr-2 flex justify-between items-end">
        <span>
          <span className="text-default-green">৳</span> {price}{" "}
        </span>
        <span className="text-red-500 text-xs">
          {quantity < 10 ? `only ${quantity} left` : ""}
        </span>
      </p>
    </div>
  );
};
const tabs = ["All Products", "Transistors", "Sensors", "Architectures"];
export default Consumer;
