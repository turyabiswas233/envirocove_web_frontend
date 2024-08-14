import React, { useEffect, useState } from "react";
import { ArrowBack, Bkash, CreditCard, Nagad } from "./icons/icons";
import Button from "./Button";
import { Link } from "react-router-dom";
import check from "/images/icons/check.svg";
const randomID =
  JSON.parse(localStorage.getItem("randomID")) ||
  (Math.random() * 10000).toPrecision(4);
localStorage.setItem("randomID", JSON.stringify(randomID));

function CheckoutPay() {
  const [sid, setSelect] = useState(-1); // This can be used as the choosen option of payment method.
  /*
    0 -> Credit Card
    1 -> Bkash
    2 -> Nagad
  */
  const [options, setOptions] = useState([
    {
      icon: <CreditCard />,
      name: "Credit/Debit Card",
      select: false,
    },
    {
      icon: <Bkash />,
      name: "Bkash",
      select: false,
    },
    {
      icon: <Nagad />,
      name: "Nagad",
      select: false,
    },
  ]);
  useEffect(() => {
    setOptions((pre) => {
      const newArr = pre.map((e, eid) => ({ ...e, select: eid == sid }));
      return newArr;
    });
  }, [sid]);
  return (
    <div className="bg-white p-5 w-auto h-screen relative">
      {/* header */}

      <h2 className="font-bold text-left text-3xl w-fit flex items-center gap-4 py-6">
        <Link to={"/checkout/ship"}>
          <ArrowBack />
        </Link>
        Checkout
      </h2>

      <div className="info grid gap-2">
        <p>
          {/* you may pass a prop of order number or generate a random unique order id */}
          Order #{randomID}
        </p>
        <h2 className="text-3xl font-semibold">
          <span className="text-default-green">৳</span> 412.05
        </h2>
      </div>

      <p className="font-semibold text-base py-3">Choose a payment method</p>

      <div className="relative">
        {options.map((e, id) => (
          <Option
            key={e.name}
            icon={e.icon}
            name={e.name}
            select={e.select}
            toggle={() => {
              setSelect(id);
            }}
          />
        ))}
      </div>
      <Button
        classes={
          "w-11/12 flex justify-center items-center font-medium py-5 absolute bottom-7 left-1/2 -translate-x-1/2"
        }
        type={"button"}
        disabled={sid < 0}
        text={"Pay BDT 412.05"}
        onclick={() => {
          alert(`SUCCESSFULLY PAID\nOrder No #${randomID}`);
          localStorage.clear();
          window.location.reload();
        }}
      />
    </div>
  );
}
const Option = ({ icon, name, select = false, toggle }) => {
  return (
    <div
      className={`rounded-2xl border ${
        select == true ? "border-tBlack" : "border-border-gray"
      } flex justify-between items-center p-5 my-2 hover:bg-bg-gray cursor-pointer transition-colors ease-in`}
      onClick={toggle}
    >
      <div className="method flex items-center gap-2">
        {icon && <span>{icon}</span>}
        <p className="font-semibold">{name}</p>
      </div>
      <div
        className={`${
          !select ? "bg-white" : "bg-black"
        } circle transition-colors`}
      >
        <div className="w-2 h-1 origin-left translate-y-1.5 translate-x-1 rounded-full bg-white rotate-45"></div>
        <div className="w-3 h-1 origin-left translate-y-2 translate-x-1.5 rounded-full bg-white -rotate-45"></div>
      </div>
    </div>
  );
};
export default CheckoutPay;
