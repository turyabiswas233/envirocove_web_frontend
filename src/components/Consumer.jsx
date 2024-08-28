import React, { useEffect, useState } from "react";
import { Account, CartIcon } from "./icons/icons";
import Pic from "../assets/triod.png";
import { useNavigate } from "react-router-dom";
import { product, account } from "../api/index";
function Consumer() {
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  useEffect(() => {
    account
      .profile("GET")
      .then((res) => res.json())
      .then((data) => {
        if (data?.detail) console.warn(data?.detail);
        else console.log(data);
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
              localStorage.clear();
              window.location.assign("/");
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
                className={`relative w-fit text-nowrap px-1 mx-2 transition-colors duration-200 text-base hover:text-green-500 cursor-pointer select-none ${
                  t.id === tab ? "text-default-green" : "text-place"
                }`}
                onClick={() => setTab(t.id)}
              >
                {t.title}
                {tab === t.id && (
                  <span className="absolute rounded-full bg-default-green text-default-green w-1 h-1 p-1 -bottom-2 left-1/2 -translate-x-1/2"></span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {items.filter((ele) =>
          tab === 0 ? ele : ele.category == tab ? ele : null
        ).length > 0 ? (
          items
            .filter((ele) =>
              tab === 0 ? ele : ele.category == tab ? ele : null
            )
            .map((item, itemId) => {
              return (
                <ItemCart
                  key={`item-id${itemId}`}
                  id={item.id}
                  price={item.price}
                  title={item.title}
                  quantity={item.quantity}
                  category={item.category}
                  onClick={() => {
                    navigate("/product/?id=" + item.id);
                  }}
                />
              );
            })
        ) : (
          <p className="text-center py-7">{"No products available"}</p>
        )}
      </div>
    </div>
  );
}
const ItemCart = ({ id, title, price, imgAlt, quantity, onClick }) => {
  const [image, setImage] = useState("");
  useEffect(() => {
    product
      .getImage(id)
      .then((res) => res.json())
      .then((res) => {
        if (Array.isArray(res))
          if (res.length > 0) setImage(res[0].image);
          else setImage(Pic);
        else setImage(Pic);
      });
  }, [id]);

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
const tabs = [
  { title: "All Products", id: 0 },
  { title: "Transistors", id: 1 },
  { title: "Sensors", id: 3 },
  { title: "Architectures", id: 4 },
];
export default Consumer;
