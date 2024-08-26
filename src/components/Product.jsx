import React, { useEffect, useState } from "react";
import {
  Account,
  AddCart,
  Back,
  Bag,
  CartIcon,
  Efficiency,
  Star,
  Timer,
} from "./icons/icons";
import Pic from "../assets/triod.png";
import Button from "./Button";
import { Link, useParams } from "react-router-dom";
import { product } from "../api/index";
function Product() {
  const [data, setData] = useState(null);
  const [loading, setloading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    try {
      product
        .item(id)
        .then((res) => res.json())
        .then((res) => (res.id ? setData(res) : setData(null)))
        .catch((err) => console.log(err))
        .finally((e) => setloading(false));
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const Counter = () => {
    const [num, setNum] = useState(1);
    const increament = () => {
      if (num < 7) setNum((pre) => pre + 1);
    };

    const decreament = () => {
      if (num > 1) setNum((pre) => pre - 1);
    };

    return (
      <div className="flex justify-center items-center gap-4 font-medium">
        <button
          type="button"
          className="bg-white rounded-full p-5 w-5 h-5 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={decreament}
          disabled={num == 1}
        >
          -
        </button>
        <p>{num}</p>
        <button
          className="bg-white rounded-full p-5 w-5 h-5 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed "
          type="button"
          onClick={increament}
          disabled={num == 7}
        >
          +
        </button>
      </div>
    );
  };
  if (loading) return <div className="p-5 text-lg">Loading...</div>;
  if (data)
    return (
      <div className="bg-white min-h-screen text-title">
        {/* header */}
        <div className="header bg-bg-gray py-10 px-4">
          <div className="btns flex justify-between">
            <button className="rounded-3xl px-4 py-2 text-base font-medium border">
              <Link className="flex items-center gap-2" to={"/dashboard"}>
                <Back /> Back
              </Link>
            </button>
            <Link
              className="rounded-full border  border-border-gray p-2 w-10 h-10 justify-center items-center flex"
              to={"/mycart"}
            >
              <CartIcon />
            </Link>
          </div>
          <div className="w-full">
            <img
              className="mx-auto mb-10"
              src={Pic}
              width={450}
              height={450}
              alt="Image.png"
            />
          </div>
          <div className="three-obj rounded-2xl w-full grid grid-cols-3 gap-2 text-left">
            <section className="bg-white p-2 rounded-xl">
              <Timer />
              <p className="text-gray-600 text-xs font-medium">Condition</p>
              <p className="text-default-gray text-sm font-semibold">
                {condition(data?.condition)}
              </p>
            </section>
            <section className="bg-white p-2 rounded-xl">
              <Efficiency />
              <p className="text-gray-600 text-xs font-medium">Efficienc</p>
              <p className="text-default-gray text-sm font-semibold">
                {Number(data?.efficiency).toPrecision(5)}%{" "}
                <sup className="text-default-green">*</sup>
              </p>
            </section>
            <section className="bg-white p-2 rounded-xl">
              <Bag />
              <p className="text-gray-600 text-xs font-medium">Availability</p>
              <p className="text-default-gray text-sm font-semibold">
                {data?.quantity} {`pc${data?.quantity > 1 ? "s" : ""}`}
              </p>
            </section>
          </div>
        </div>
        {/* main */}
        <div className="p-4">
          <p className="font-medium pt-2">
            {data?.title}
            <br />
            Product ID:{id}
          </p>
          {/* vendor details */}
          <div className="border-b border-x-default-black py-6">
            <p className="font-semibold">Vendor</p>
            *vendor er profile fetch krte hbe
            <section className="flex justify-between items-center">
              {/* <img src="" alt="" /> */}
              <div className="p-3 bg-bg-gray rounded-full">
                {/* alternate of image */}
                <Account />
              </div>
              {/* vendor details */}
              <div>
                <p className="font-semibold text-tBlack">Vendor name</p>
                <p className="flex items-center gap-2">
                  <Star />
                  <span>{"4.6 (Rated by 26 users)"}</span>
                </p>
              </div>
              <p className="rotate-180">
                <Back />
              </p>
            </section>
          </div>
          {/* description */}
          <div className="my-8">
            <h4 className="font-semibold">Description</h4>
            <p className="font-normal">{data?.description}</p>
          </div>
          {/* specification */}
          <div className="my-8">
            <h4 className="font-semibold">Specification</h4>
            <ul className="font-normal list-disc px-8">
              <li className="font-normal px-2">
                <span className="font-medium">Product Category: </span> Voltage
                toFrequenc & Frequency to Voltage
              </li>
              <li className="font-normal px-2">
                <span className="font-medium">Product Category: </span> Voltage
                toFrequenc & Frequency to Voltage
              </li>
              <li className="font-normal px-2">
                <span className="font-medium">Product Category: </span> Voltage
                toFrequenc & Frequency to Voltage
              </li>
              <li className="font-normal px-2">
                <span className="font-medium">Product Category: </span> Voltage
                toFrequenc & Frequency to Voltage
              </li>
            </ul>
          </div>
        </div>
        {/* float item-cart adding option */}
        <div className="float-end sticky bottom-0 bg-opa-green grid p-3 w-full rounded-t-3xl">
          <section className="top flex justify-between items-center">
            <p className="font-semibold text-tBlack text-3xl">
              <span className="text-default-green">৳</span>{" "}
              <span>{data?.price - (data?.price % 1)}</span>
              <span className="text-default-gray text-2xl">
                .{(data?.price % 1).toFixed(2).split(".")[1]}
              </span>
            </p>
            <Counter />
          </section>
          <section className="bottom"></section>
          <Button
            classes={"py-3 mt-4 font-medium"}
            text={"Add to cart"}
            icon={<AddCart />}
          />
        </div>
      </div>
    );
  return (
    <div className="p-5 text-xl text-center pt-20 font-bold">
      No product id found
    </div>
  );
}
export const condition = (type) => {
  switch (type) {
    case "new":
      return "Brand new";
    case "owned":
      return "Pre-owned";
    case "recycled":
      return "Recycled";

    default:
      return "";
  }
};
export default Product;
