import React, { useEffect, useState } from "react";
import { Account, ArrowBack, DottedLine } from "./icons/icons";
import Pic from "../assets/triod.png";
import Button from "./Button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const Counter = ({ number, id, setItemNumber, willWork }) => {
  const [num, setNum] = useState(number);
  const increament = () => {
    if (willWork) if (num < 7) setNum((pre) => pre + 1);
  };

  const decreament = () => {
    if (willWork) if (num > 1) setNum((pre) => pre - 1);
  };

  useEffect(() => {
    const cartItem = JSON.parse(localStorage.getItem("myCart"));
    if (Array.isArray(cartItem)) {
      let findCur = cartItem.findIndex((ele) => ele?.productId === id);
      localStorage.setItem(
        "myCart",
        JSON.stringify(
          cartItem.map((ele, ei) =>
            ei !== findCur ? ele : { ...ele, quantity: num }
          )
        )
      );

      setItemNumber((pre) => {
        const newList = pre?.map((e) => {
          if (e.productId != id) return e;
          else return { ...e, quantity: num };
        });
        return newList;
      });
    }
  }, [num]);

  return (
    <div className="flex justify-center items-center gap-2 font-medium">
      <button
        type="button"
        className="bg-bg-gray rounded-full p-3 w-4 h-4 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={decreament}
        disabled={num == 1}
      >
        -
      </button>
      <p>{num}</p>
      <button
        className="bg-bg-gray rounded-full p-3 w-4 h-4 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
        type="button"
        onClick={increament}
        disabled={num == 7}
      >
        +
      </button>
    </div>
  );
};
const EachCart = ({
  id,
  did,
  number,
  price,
  title,
  setItemNumber,
  setTotal,
  selected,
  setData,
}) => {
  useEffect(() => {
    setTotal(0);
    setTotal((pre) => pre + price);
  }, [price]);

  return (
    <section
      className="flex justify-between gap-2 items-center my-4"
      style={{
        display: number == 0 ? "none" : "flex",
      }}
    >
      <div
        className={`circle transition-colors ${
          selected && "bg-default-green/70"
        }`}
        onClick={() => {
          setData((pre) =>
            pre.map((ele, eid) =>
              eid !== did ? ele : { ...ele, selected: !selected }
            )
          );
        }}
      ></div>
      <div className="info flex gap-3 w-full justify-start ">
        <img src={Pic} width={100} height={100} alt="" className="rounded-xl" />
        <div className="w-full grid grid-cols-1 justify-between gap-3">
          <p className="font-normal">{title}</p>
          {/* price part */}
          <div className="flex justify-between items-center text-sm">
            <p className="font-bold">
              <span className="text-default-green">৳</span>{" "}
              <span>{price.toFixed(2)}</span>
            </p>
            <Counter
              number={number}
              id={id}
              setItemNumber={setItemNumber}
              willWork={selected}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
const Cart = () => {
  const navigate = useNavigate();

  const [totalPrice, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [arrLen, setArrLen] = useState(0);

  const [data, setData] = useState([]);
  const { user, loading } = useAuth();

  useEffect(() => {
    let cartKey = localStorage.getItem("myCart");
    const cartItems = cartKey ? JSON.parse(cartKey) : [];

    if (Array.isArray(cartItems)) {
      if (cartItems?.length > 0) {
        setData(cartItems);
      } else setData([]);
    } else setData([]);
  }, []);
  const handlePrice = (data) => {
    if (Array.isArray(data)) {
      setTotal(0);
      setTotal(
        data.reduce(
          (p, c) => p + (c?.selected ? c?.price * c?.quantity : 0) || 0,
          0
        )
      );
    }
  };
  useEffect(() => {
    handlePrice(data);
  }, [data]);

  useEffect(() => {
    localStorage.setItem("myCart", JSON.stringify(data));
    setArrLen(data.filter((ele) => ele.selected === true).length);
  }, [data]);

  if (!loading)
    return (
      <div className="pt-5 w-auto h-screen overflow-y-auto bg-bg-gray">
        {/* header */}
        <div className="py-6 px-5 flex justify-between gap-5">
          <h2 className="font-bold text-left text-3xl w-fit flex items-center gap-4">
            <Link to={"/dashboard"}>
              <ArrowBack />
            </Link>
            Cart
          </h2>
          <button
            className="bg-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-opa-green"
            onClick={() => alert("Not available")}
          >
            <Account />
          </button>
        </div>

        {/* main */}
        <div className="h-full flex justify-between flex-col">
          <div className="bg-white rounded-2xl p-4 m-4">
            <header className="flex gap-2 items-center border-b border-border-gray py-6">
              <div
                className={`circle transition-colors ${
                  data.reduce((p, c) => p + (c.selected ? 1 : 0), 0) ==
                    data.length && "bg-default-green/70"
                }`}
                onClick={() => {
                  if (arrLen != data.length) {
                    setData((pre) => {
                      return pre.map((ele) => ({ ...ele, selected: true }));
                    });
                  } else {
                    setData((pre) => {
                      return pre.map((ele) => ({ ...ele, selected: false }));
                    });
                  }
                }}
              ></div>
              <p className="font-medium text-base break-words">
                {user?.first_name || "No"} {user?.last_name || "Name"}
              </p>
            </header>
            <div className="my-2">
              {data?.map((ele, id) => {
                return (
                  <EachCart
                    key={`items-${id}`}
                    did={id}
                    id={ele?.productId}
                    number={ele?.quantity}
                    title={ele?.title}
                    selected={ele?.selected}
                    price={Number(ele?.price || 0)}
                    setItemNumber={setData}
                    setTotal={setTotal}
                    data={data}
                    setData={setData}
                  />
                );
              })}
            </div>
            {/* footer */}
          </div>
          {data?.length > 0 ? (
            <div className="float-end sticky bottom-0 w-full bg-bg-gray">
              <div className="totalPrice px-10 py-5 text-title/90">
                <section className="grid grid-cols-3 items-center">
                  <p>Subtotal</p>
                  <DottedLine />
                  <p className="text-right">
                    ৳ {(totalPrice ? totalPrice : 0)?.toFixed(2)}
                  </p>
                </section>
                <section className="grid grid-cols-3 items-center">
                  <p>Discount</p>
                  <DottedLine />
                  <p className="text-right">৳ {discount.toFixed(2)}</p>
                </section>
              </div>
              <div className="bg-white px-5 py-8 flex justify-between items-center  rounded-t-3xl">
                <section>
                  <p className="font-semibold text-tBlack text-3xl">
                    ৳{" "}
                    {totalPrice
                      ? (Number(totalPrice) - discount).toFixed(2)
                      : (0).toFixed(2)}
                  </p>
                  <p className="font-normal text-xs">
                    <sup className="text-default-green">*</sup> without applied
                    shipping fee
                  </p>
                </section>
                <Button
                  classes={"px-6 py-3 text-base font-semibod"}
                  text={"Checkout"}
                  onclick={() => {
                    navigate("/checkout/ship");
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="bg-white p-10 rounded-md flex justify-center items-center flex-col mx-10">
              <h2 className="text-3xl text-default-green font-medium">
                Your cart is empty.
              </h2>
              <p className="text-xl font-light text-center">
                Go to{" "}
                <NavLink
                  className={
                    "text-white bg-default-green rounded-full px-4 capitalize hover:bg-green-700"
                  }
                  to="/dashboard"
                >
                  product list
                </NavLink>{" "}
                page and start shoping!
              </p>
            </div>
          )}
        </div>
      </div>
    );
};

export default Cart;
