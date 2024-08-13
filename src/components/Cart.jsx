import React, { useEffect, useState } from "react";
import { Account, ArrowBack, DottedLine } from "./icons/icons";
import Pic from "../assets/triod.png";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
const Counter = ({ number, id, setItemNumber }) => {
  const [num, setNum] = useState(number);
  const increament = () => {
    if (num < 8) setNum((pre) => pre + 1);
  };

  const decreament = () => {
    if (num > 0) setNum((pre) => pre - 1);
  };

  useEffect(() => {
    setItemNumber((pre) => {
      const newList = pre?.map((e, eid) => {
        if (eid != id) return e;
        else return { ...e, itemQuantity: num };
      });
      return newList;
    });
  }, [num]);

  return (
    <div className="flex justify-center items-center gap-2 font-medium">
      <button
        type="button"
        className="bg-bg-gray rounded-full p-3 w-4 h-4 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={decreament}
        disabled={num == 0}
      >
        -
      </button>
      <p>{num}</p>
      <button
        className="bg-bg-gray rounded-full p-3 w-4 h-4 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
        type="button"
        onClick={increament}
        disabled={num == 8}
      >
        +
      </button>
    </div>
  );
};
const EachCart = ({ price = 0, title, number, id, setItemNumber }) => {
  return (
    <section
      className="flex justify-between gap-2 items-center my-4"
      style={{
        display: number == 0 ? "none" : "flex",
      }}
    >
      <div className="circle"></div>
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
            <Counter number={number} id={id} setItemNumber={setItemNumber} />
          </div>
        </div>
      </div>
    </section>
  );
};
const Cart = () => {
  const [totalPrice, setPrice] = useState(0);
  const navigate = useNavigate();
  const [data, setData] = useState([
    {
      img: Pic,
      title: "8 Pins KA331 / VD38 Voltage to Frequency Converter LC",
      price: 162.33,
      itemQuantity: 3,
    },
    {
      img: Pic,
      title: "Dingdong Tone Doorbell Music Voice Module",
      price: 99.75,
      itemQuantity: 1,
    },
    {
      img: Pic,
      title: "8 Pins KA331 / VD38 Voltage to Frequency Converter LC",
      price: 162.33,
      itemQuantity: 5,
    },
  ]);
  useEffect(() => {
    setPrice(0);
    data.forEach((ele) => {
      if (ele) setPrice((pre) => pre + ele.price * ele.itemQuantity);
    });
  });
  return (
    <div className="pt-5 font-poppins w-auto min-h-screen bg-bg-gray flex flex-col justify-between">
      {/* header */}
      <div className="m-4 flex justify-between gap-5">
        <h2 className="font-bold text-left text-3xl w-fit px-3 flex items-center gap-4">
          <Link to={"/home"}>
            <ArrowBack />
          </Link>
          Cart
        </h2>
        <button className="bg-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-opa-green">
          <Account />
        </button>
      </div>

      {/* main */}
      <div className="bg-white m-4 rounded-2xl p-4">
        <header className="flex gap-2 items-center border-b border-border-gray py-6">
          <div className="circle"></div>
          <p className="font-medium text-base">A. K. Akram Enterprice</p>
        </header>
        <div className="my-2">
          {data?.map((ele, id) => {
            return (
              <EachCart
                key={`items-${id}`}
                price={ele?.price}
                title={ele?.title}
                number={ele?.itemQuantity}
                id={id}
                setItemNumber={setData}
              />
            );
          })}
        </div>
      </div>

      {/* footer */}

      <div className="float-end sticky bottom-0 w-full bg-bg-gray">
        <div className="totalPrice px-10 py-5 text-title/90">
          <section className="flex justify-between items-center">
            <p>Subtotal</p>
            <DottedLine />
            <p>৳ {totalPrice.toFixed(2)}</p>
          </section>
          <section className="flex justify-between items-center">
            <p>Discount</p>
            <DottedLine />
            <p>৳ 00.00</p>
          </section>
        </div>
        <div className="bg-white px-5 py-8 flex justify-between items-center  rounded-t-3xl">
          <section>
            <p className="font-semibold text-tBlack text-3xl">
              ৳ {totalPrice.toFixed(2).toString()}
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
    </div>
  );
};

export default Cart;
