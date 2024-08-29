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
import { Link, useSearchParams } from "react-router-dom";
import { product } from "../api/index";
function Product() {
  const [data, setData] = useState(null);
  const [loading, setloading] = useState(true);
  const search = useSearchParams();
  const id = search[0].get("id") || 0;
  const [num, setNum] = useState(1);
  const [image, setImage] = useState([]);
  const [imgId, setImgId] = useState(0);
  useEffect(() => {
    product
      .item(id)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err))
      .finally(() => setloading(false));
  }, []);

  useEffect(() => {
    product
      .getImage(id)
      .then((res) => res.json())
      .then((res) => {
        if (Array.isArray(res))
          if (res.length > 0) setImage(res);
          else setImage([]);
        else setImage([]);
        console.log(res);
      });
  }, [id]);

  const Counter = () => {
    const increament = () => {
      if (num < 7)
        if (data?.quantity > num) setNum((pre) => pre + 1);
        else alert("Not more item available in out stock.");
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
            <CartIcon />
          </div>
          <div className="w-full">
            <img
              className="mx-auto my-5 rounded-xl"
              src={image[imgId] ? image[imgId]?.image : Pic}
              width={450}
              height={450}
              alt="Image.png"
            />
            <div className="grid grid-cols-5 gap-2 my-5">
              {image?.map((ig, igid) => (
                <img
                  className="aspect-square"
                  src={ig?.image}
                  key={`imageKey_${ig?.id}`}
                  width={70}
                  height={70}
                  onClick={() => setImgId(igid)}
                />
              ))}
            </div>
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
                {Number(data?.efficiency).toFixed(2)}%{" "}
                <sup className="text-default-green">*</sup>
              </p>
            </section>
            <section className="bg-white p-2 rounded-xl">
              <Bag />
              <p className="text-gray-600 text-xs font-medium">Availability</p>
              <p className={`text-default-gray text-sm font-semibold ${data?.quantity < 10 && 'text-red-500'}`}>
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
            {/* Product ID:{id} */}
          </p>
          {/* vendor details */}
          <div className="border-b border-x-default-black py-6">
            <p className="font-semibold">Vendor</p>
            <section className="flex justify-between items-center">
              {/* <img src="" alt="" /> */}
              <div className="p-3 bg-bg-gray rounded-full">
                {/* alternate of image */}
                <Account />
              </div>
              {/* vendor details */}
              <div>
                <p className="font-semibold text-tBlack">
                  {data?.vendor?.first_name || "No"}{" "}
                  {data?.vendor?.last_name || "name"}
                </p>
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
              <span>{data?.price - (data?.price % 1) || "0"}</span>
              <span className="text-default-gray text-2xl">
                .{(data?.price % 1 || 0).toFixed(2).split(".")[1] || "00"}
              </span>
            </p>
            <Counter />
          </section>
          <section className="bottom"></section>
          <Button
            classes={"py-3 mt-4 font-medium"}
            text={"Add to cart"}
            icon={<AddCart />}
            disabled={!data?.quantity}
            onclick={() => {
              let myCartKey = localStorage.getItem("myCart");
              let cartList = myCartKey ? JSON.parse(myCartKey) : [];
              const findCur = cartList.findIndex(
                (ele) => ele?.productId === id
              );

              if (findCur === -1) {
                cartList.push({
                  productId: id,
                  title: data?.title,
                  quantity: num,
                  price: data?.price ? Number(data?.price) : 0,
                });
                localStorage.setItem("myCart", JSON.stringify(cartList));
                alert("Item added to your cart");
              } else {
                if (cartList[findCur]?.quantity !== num) {
                  localStorage.setItem(
                    "myCart",
                    JSON.stringify([
                      ...cartList.filter((ele, ei) => ei !== findCur),
                      {
                        productId: id,
                        title: data?.title,
                        quantity: num,
                        price: data?.price ? Number(data?.price) : 0,
                      },
                    ])
                  );
                  alert("Item updated to your cart.");
                } else alert("Already added the product");
              }
            }}
          />
        </div>
      </div>
    );
  return <p>wait a while...</p>;
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
