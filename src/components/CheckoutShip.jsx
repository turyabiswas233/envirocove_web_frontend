import React, { useEffect, useState } from "react";
import { ArrowBack, DottedLine } from "./icons/icons";
import Pic from "../assets/triod.png";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useCore } from "../context/auth";
import { account } from "../api/index";
function CheckoutShip() {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [discount, setDiscount] = useState(-50);
  const [shippingFee, setFee] = useState(150);
  const { user, loading } = useAuth();
  const { add, load = loading } = useCore();

  const itemsList = Array.isArray(JSON.parse(localStorage.getItem("myCart")))
    ? JSON.parse(localStorage.getItem("myCart"))
    : [];
  const [fullName, setFullName] = useState("");
  const [willChange, setChange] = useState(false);

  useEffect(() => {
    setFullName("" + user?.first_name + " " + user?.last_name);
  }, [user]);
  useEffect(() => {
    setAddress("" + add);
  }, [add]);

  if (!loading && !load)
    return (
      <div className="bg-white p-5 w-auto min-h-screen flex flex-col justify-between">
        {/* header */}

        <h2 className="font-bold text-left text-3xl w-fit flex items-center gap-4 py-6">
          <Link to={"/mycart"}>
            <ArrowBack />
          </Link>
          Checkout
        </h2>
        <div className="my-2">
          <header className="flex justify-between items-center my-4 font-semibold">
            <p>Shipping address</p>
            <button
              className="text-default-green"
              onClick={() => {
                setChange(true);
                account
                  .setAddress(address)
                  .then((res) => res.json())
                  .then((d) => d?.message === "success" && setChange(false))
                  .catch((err) => {
                    alert("failed to change name or address");
                  });
              }}
            >
              {willChange == true ? "Update" : "Change"}
            </button>
          </header>

          {/* address */}
          <div className="rounded-3xl bg-bg-gray p-5">
            <p className="font-medium">{fullName || "Your Name"}</p>
            <p className="font-normal">
              {address || "Your Home/Delivery Address"}
            </p>
            {willChange && (
              <div className="p-2 grid gap-4 bg-white rounded-md mt-5">
                <section className="grid">
                  <label className="text-sm" htmlFor="fn">
                    FullName :
                  </label>
                  <input
                    className="col-span-5 py-2 px-3 rounded-md bg-bg-gray"
                    type="text"
                    placeholder="Enter Full Name"
                    id="fn"
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </section>
                <section className="grid">
                  <label className="text-sm" htmlFor="ad">
                    Address :
                  </label>
                  <input
                    className="col-span-5 py-2 px-3 rounded-md bg-bg-gray"
                    type="text"
                    id="ad"
                    placeholder="Enter Delivery Address"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </section>
              </div>
            )}
          </div>

          {/* items */}
          <div className="my-8">
            <p className="font-semibold">Shipping Products</p>
            {itemsList?.map((ele) => (
              <EachCart
                key={ele.productId}
                price={Number(ele?.price || 0)}
                number={ele?.quantity}
              />
            ))}
          </div>
        </div>

        <div className="summary grid gap-2">
          <p className="font-semibold">Summary</p>
          <p className="grid grid-cols-3 items-center font-light text-title">
            Subtotal <DottedLine />{" "}
            <span className="font-medium text-tBlack text-right">
              ৳{" "}
              {itemsList?.reduce(
                (p, c) => p + c?.price * c?.quantity || 0,
                discount + shippingFee
              )}
            </span>
          </p>
          <p className="grid grid-cols-3 items-center font-light text-title">
            Shipping fee <DottedLine />{" "}
            <span className="font-medium text-tBlack text-right">
              ৳ {shippingFee.toFixed(2)}
            </span>
          </p>
          <p className="grid grid-cols-3 items-center font-light text-title">
            Discount <DottedLine />{" "}
            <span className="font-medium text-tBlack text-right">
              ৳ {Math.abs(discount).toFixed(2)}
            </span>
          </p>
        </div>
        <Button
          classes={"w-full text-center py-5 mt-5"}
          text={"Continue"}
          onclick={() => {
            if (fullName.length == 0 || address.length == 0)
              alert("Please provide your full name and home/delivery address.");
            else navigate("/checkout/pay");
          }}
        />
      </div>
    );
}
const EachCart = ({ price = 0, title, number = 1 }) => {
  return (
    <section className="flex justify-between gap-2 items-center my-4">
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
            <p className="tracking-wider">x {number}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CheckoutShip;
