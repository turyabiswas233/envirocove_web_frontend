import React from "react";
import { ArrowBack, DottedLine } from "./icons/icons";
import Pic from "../assets/triod.png";
import Button from "./Button";
function CheckoutShip() {
  return (
    <div className="bg-white p-5 w-auto min-h-screen">
      {/* header */}

      <h2 className="font-bold text-left text-3xl w-fit flex items-center gap-4 py-6">
        <ArrowBack />
        Checkout
      </h2>
      <div className="my-2">
        <header className="flex justify-between items-center my-4 font-semibold">
          <p>Shipping address</p>
          <p className="text-default-green">Change</p>
        </header>

        {/* address */}
        <div className="rounded-3xl bg-bg-gray p-5">
          <p className="font-medium">Shihab Bin Toriq</p>
          <p className="font-normal">
            Rajshahi Cantonment Gate, Holding No- 1202/A, Cantonment, Rajshahi
          </p>
        </div>

        {/* items */}
        <div className="my-8">
          <p className="font-semibold">Shipping Products</p>
          <EachCart
            title={"8 Pins KA331 / VD38 Voltage to Frequency Converter LC"}
            price={162.33}
          />
          <EachCart
            title={"8 Pins KA331 / VD38 Voltage to Frequency Converter LC"}
            price={162.33}
          />
        </div>
      </div>

      <div className="summary grid gap-2">
        <p className="font-semibold">Summary</p>
        <p className="flex justify-between items-center font-light text-title">
          Subtotal <DottedLine />{" "}
          <span className="font-medium text-tBlack">৳ 262.08</span>
        </p>
        <p className="flex justify-between items-center font-light text-title">
          Shipping fee <DottedLine />{" "}
          <span className="font-medium text-tBlack">৳ 150.00</span>
        </p>
        <p className="flex justify-between items-center font-light text-title">
          Discount <DottedLine />{" "}
          <span className="font-medium text-tBlack">৳ 00.00</span>
        </p>
      </div>
      <Button classes={"w-full text-center py-5 mt-5"} text={"Continue"} />
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
