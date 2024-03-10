import React from "react";
import { ArrowBack, Bkash, CreditCard, Nagad } from "./icons/icons";
import Button from "./Button";
function CheckoutPay() {
  return (
    <div className="bg-white p-5 w-auto h-screen relative">
      {/* header */}

      <h2 className="font-bold text-left text-3xl w-fit flex items-center gap-4 py-6">
        <ArrowBack />
        Checkout
      </h2>

      <div className="info grid gap-2">
        <p>
          {/* you may pass a prop of order number or generate a random unique order id */}
          Order #5945
        </p>
        <h2 className="text-3xl font-semibold">
          <span className="text-default-green">৳</span> 412.05
        </h2>
      </div>

      <p className="font-semibold text-base py-3">Choose a payment method</p>

      <div className="relative">
        <Option icon={<CreditCard />} name={"Credit/Debit Card"} />
        <Option icon={<Bkash />} name={"Bkash"} select={true} />
        <Option icon={<Nagad />} name={"Nagad"} />
      </div>
      <Button
        classes={
          "w-11/12 flex justify-center items-center font-medium py-5 absolute bottom-7 left-1/2 -translate-x-1/2"
        }
        type={"button"}
        disabled={true}
        text={"Pay BDT 412.05"}
      />
    </div>
  );
}
const Option = ({ icon, name, select = false }) => {
  return (
    <div className="rounded-2xl border border-border-gra flex justify-between items-center p-4 my-2">
      <div className="method flex items-center gap-2">
        {icon && <span>{icon}</span>}
        <p className="font-semibold">{name}</p>
      </div>
      <div
        className={`circle ${
          select && "selected"
        } flex justify-center items-center`}
      ></div>
    </div>
  );
};
export default CheckoutPay;
