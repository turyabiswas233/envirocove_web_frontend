import React, { useEffect, useState } from "react";
import { ArrowBack, Bkash, CODIcon, CreditCard, Nagad } from "./icons/icons";
import Button from "./Button";
import { Link, NavLink, useNavigate, useOutletContext } from "react-router-dom";
import check from "/images/icons/check.svg";
import { product } from "../api/index";

const itemsList = JSON.parse(localStorage.getItem("myCart"));
const randomID = Math.floor(Math.random() * 100000);
const totalPrice = Array.isArray(itemsList)
  ? itemsList.reduce((p, c) => p + c?.price * c?.quantity || 0, 0)
  : 0;

function CheckoutPay() {
  const [orderId, setOrderId] = useState(-1);
  const { TOKEN } = useOutletContext();
  const navi = useNavigate();
  const [sid, setSelect] = useState(-1); // This can be used as the choosen option of payment method.

  /*
    0 -> Credit Card
    1 -> Bkash
    2 -> Nagad
  */
  const [options, setOptions] = useState([
    {
      icon: <CODIcon />,
      name: "Cash on Delivery",
      select: false,
    },
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

  if (itemsList || orderId != -1)
    return (
      <div className="bg-white p-5 w-auto h-screen relative">
        {/* header */}

        <h2 className="font-bold text-left text-3xl w-fit flex items-center gap-4 py-6">
          <Link to={"/checkout/ship"}>
            <ArrowBack />
          </Link>
          Checkout
        </h2>

        {/* message alert */}

        <div className="bg-default-green/20 flex items-start gap-2 p-4 rounded-xl mb-5">
          <p className="font-mono w-10 h-fit px-2 py-px text-center bg-default-green text-white rounded-lg">
            i
          </p>
          <p className="text-title text-sm">
            Payment with Cards, Bkash and Nagad are not available at this
            moment. They are coming soon on upcoming updates.
          </p>
        </div>

        <div className="info grid gap-2">
          <p>
            {/* you may pass a prop of order number or generate a random unique order id */}
            Order #{randomID}
          </p>
          <h2 className="text-3xl font-semibold">
            <span className="text-default-green">৳</span>{" "}
            {totalPrice.toFixed(2)}
          </h2>
        </div>

        <p className="font-semibold text-base py-3">Choose a payment method</p>

        <div className="relative">
          {options.map((e, id) => (
            <Option
              disabled={id > 0}
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
        {orderId == -1 ? (
          <Button
            classes={
              "w-11/12 flex justify-center items-center font-medium py-5 absolute bottom-7 left-1/2 -translate-x-1/2"
            }
            type={"button"}
            disabled={sid < 0}
            text={`Pay BDT ${totalPrice.toFixed(2)}`}
            onclick={() => {
              if (!TOKEN) {
                alert("Please login first");
                navi("/login");
              }
              const data = {
                cart: {},
              };
              itemsList.forEach((item) => {
                data["cart"][item.productId] = item.quantity;
              });

              product
                .createOrder(data)
                .then((res) => res.json())
                .then((res) => {
                  if (res.message === "success") {
                    alert(`SUCCESSFULLY PAID\nOrder No #${res.order_id}`);
                    setOrderId(res.order_id);
                    localStorage.removeItem("myCart");
                  }
                })
                .catch((err) => {
                  console.log(err);
                  alert("An error occurred");
                })
                .finally(() => {
                  console.log("kichu ekta hobe");
                });
            }}
          />
        ) : (
          <div className="rounded-md shadow-md shadow-green-200/80 text-center my-4 p-6">
            <p className="text-green-700 text-2xl font-bold text-center underline">
              Congratulations
            </p>
            <p className="text-lg">
              Your order id is{" "}
              <span className="text-2xl text-green-800">{orderId}</span>
            </p>
            <p>please save it</p>
            <div className="p-5 text-center space-y-5">
              <p>
                Return to{" "}
                <NavLink
                  to={"/"}
                  className={
                    "px-5 py-2 rounded-md bg-default-green text-opa-green"
                  }
                >
                  Home
                </NavLink>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  else
    return (
      <div className="p-24 text-center space-y-10">
        <p>Your cart is empty.</p>
        <p>
          Return to{" "}
          <NavLink
            to={"/"}
            className={"px-5 py-2 rounded-md bg-default-green text-opa-green"}
          >
            Home
          </NavLink>
        </p>
      </div>
    );
}
const Option = ({ icon, name, select = false, toggle, disabled }) => {
  return (
    <div
      className={`rounded-2xl border ${
        select == true ? "border-tBlack" : "border-border-gray"
      } flex justify-between items-center p-5 my-2 hover:bg-bg-gray cursor-pointer transition-colors ease-in ${
        disabled && "opacity-50 pointer-events-none"
      }`}
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
        <img
          className="translate-y-0.5"
          src={check}
          alt="check"
          width={25}
          height={25}
        />
      </div>
    </div>
  );
};
export default CheckoutPay;
