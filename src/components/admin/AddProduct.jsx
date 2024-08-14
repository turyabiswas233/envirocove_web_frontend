import React, { useState } from "react";
import { ArrowBack } from "../icons/icons";
import { Link } from "react-router-dom";
import doc from "/images/icons/doc.svg";
import cross from "/images/icons/cross.svg";
function AddProduct() {
  const [images, setImages] = useState([]);
  const [price, setprice] = useState("");
  const [weight, setweight] = useState("");
  const [efficiency, setefficiency] = useState("");
  const [quantity, setquantity] = useState("");
  const opt = [
    {
      title: "Brand new",
      type: "bnew",
    },
    {
      title: "Pre-owned",
      type: "pre-owned",
    },
    {
      title: "Recycled",
      type: "recycled",
    },
  ];
  const [idType, setIdType] = useState(opt[0]);

  const chooseMe = (ele) => {
    setIdType(ele);
  };

  const addImage = (e) => {
    if (e != null || e != undefined) setImages((pre) => [...pre, e]);
  };

  const ImgCard = ({ ele }) => {
    const image = URL.createObjectURL(ele);
    return (
      <div className="mt-5 relative">
        <img
          className="aspect-square object-cover rounded-2xl"
          src={image}
          width={85}
          height={85}
        />
        <button
          className="absolute -top-2 -right-2"
          onClick={(e) => {
            const newList = images;
            setImages(newList?.filter((f) => f != ele));
          }}
        >
          <img src={cross} alt="remove" />
        </button>
      </div>
    );
  };
  return (
    <form
      className="p-5 w-auto min-h-screen bg-white space-y-8 pb-32"
      onSubmit={(e) => e.preventDefault()}
    >
      {/* header */}
      <div className="pt-6 flex justify-between gap-5">
        <h2 className="font-bold text-left text-3xl w-fit flex items-center gap-4">
          <Link to={"/admin/products"}>
            <ArrowBack />
          </Link>
          AddProduct
        </h2>
      </div>
      <h2 className="font-bold text-xl">Overview</h2>
      {/* image select box */}
      <div className="space-y-2">
        <p className="font-medium text-sm">Product Image</p>
        <div className="w-full min-h-72 p-5 bg-horizon/40 rounded-3xl border-dashed border-4 border-horizon relative">
          <div className="flex flex-col justify-center items-center gap-5">
            <img src={doc} width={50} height={50} alt="" />
            <p className="text-center font-medium">
              Upload photos of your products. <br />
              The first photo will be used as cover.
            </p>
            <label
              className="bg-default-green hover:bg-green-600 transition-colors ease-in cursor-pointer text-white font-semibold px-5 py-4 rounded-full"
              htmlFor="image"
            >
              Choose image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              hidden
              onChange={(e) => addImage(e.target.files[0])}
            />
          </div>
          <div className="flex gap-3 flex-nowrap justify-start overflow-x-auto py-2">
            {images.map((i, id) => {
              return <ImgCard key={id} ele={i} />;
            })}
          </div>

          <div className=" absolute w-10 h-1 rounded-full bg-horizon bottom-2 left-1/2 -translate-x-1/2"></div>
        </div>
      </div>
      {/* product title */}
      <section className="w-full grid grid-cols-1 gap-2">
        <label className="font-medium text-sm" htmlFor="ptitle">
          Product Title
        </label>
        <input
          className="p-4 text-lg border outline-none border-border-gray focus-within:border-default-black rounded-cl transition-colors ease-linear"
          type="text"
          placeholder="Name your product"
          id="ptitle"
          autoComplete="off"
        />
      </section>
      {/* price & weight of product */}
      <div className="grid grid-cols-2 justify-between gap-3">
        <section className="grid grid-cols-1 gap-2">
          <p className="font-medium text-sm">Price</p>
          <input
            className="text-lg text-gray-500 bg-bg-gray rounded-2xl border-none outline-none px-6 py-4"
            type="number"
            name="price"
            id="price"
            value={price}
            placeholder="0.00"
            onChange={(e) => setprice(e.target.value)}
            min={0}
          />
        </section>
        <section className="grid grid-cols-1 gap-2">
          <p className="font-medium text-sm">Weight (kg)</p>
          <input
            className="text-lg text-gray-500 bg-bg-gray rounded-2xl border-none outline-none px-6 py-4"
            type="number"
            name="weight"
            id="weight"
            placeholder="0.0"
            value={weight}
            onChange={(e) => setweight(e.target.value)}
            min={0}
          />
        </section>
      </div>

      {/* description */}
      <section className="w-full grid grid-cols-1 gap-2">
        <label className="font-medium text-sm" htmlFor="desc">
          Description
        </label>
        <div className="rounded-2xl bg-bg-gray p-1 grid">
          <div className="p-2 grid">
            <div className="flex gap-1 justify-between items-center">
              <select
                className="p-2 flex-1 rounded-xl "
                name="textStyle"
                id="textStyle"
              >
                <option value="Paragraph">Paragraph</option>
              </select>
              <div>|</div>
              <button className="w-10 h-10 p-2 mx-1 rounded-md bg-white text-black hover:invert font-semibold">
                B
              </button>
              <button className="w-10 h-10 p-2 mx-1 rounded-md bg-white text-black hover:invert italic font-mono">
                I
              </button>
              <button className="w-10 h-10 p-2 mx-1 rounded-md bg-white text-black hover:invert underline underline-offset-4">
                U
              </button>
            </div>
            <div></div>
          </div>
          <textarea
            className="bg-white text-black text-sm p-2 overflow-y-scroll resize-none rounded-xl border-none outline-none"
            type="text"
            placeholder="Name your product"
            id="desc"
            autoComplete="off"
            rows={8}
          />
        </div>
      </section>
      {/* item attribute */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold px-2">Item Attributes</h2>
        <div className="bg-default-green/20 flex items-start gap-2 p-4 rounded-xl">
          <p className="font-mono w-10 h-fit px-2 py-px text-center bg-default-green text-white rounded-lg">
            i
          </p>
          <p className="text-title text-sm">
            Quantity will be tracked automatically on order fulfillment. Always
            remember to update quantity if restocked.
          </p>
        </div>
      </div>
      {/* condition */}
      <div>
        <p className="font-medium text-title px-2">Condition</p>
        <ul className="p-2 rounded-full flex w-full justify-between bg-bg-gray">
          {opt.map((ele, eid) => (
            <li
              className={`transition-colors font-medium ${
                ele.type === idType.type
                  ? "bg-tBlack text-white"
                  : "text-title hover:bg-tBlack hover:text-white"
              } text-center p-3 rounded-full cursor-pointer`}
              key={eid}
              onClick={() => chooseMe(ele)}
            >
              {ele.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Category */}
      <div>
        <p className="font-medium text-title px-2">Category</p>
        <select className="p-4 rounded-2xl bg-bg-gray w-full">
          <option value="Light Emitting Diode (LED)">
            {"Light Emitting Diode (LED)"}
          </option>
        </select>
      </div>

      {/* price & weight of product */}
      <div className="grid grid-cols-2 justify-between gap-3">
        <section className="grid grid-cols-1 gap-2">
          <p className="font-medium text-sm px-2">Efficiency</p>
          <input
            className="text-lg text-gray-500 bg-bg-gray rounded-2xl border-none outline-none px-6 py-4"
            type="text"
            name="effi"
            id="effi"
            value={efficiency}
            placeholder="0.0%"
            onChange={(e) => setefficiency(e.target.value)}
            min={0}
            max={100}
          />
        </section>
        <section className="grid grid-cols-1 gap-2">
          <p className="font-medium text-sm px-2">Available Quantity</p>
          <input
            className="text-lg text-gray-500 bg-bg-gray rounded-2xl border-none outline-none px-6 py-4"
            type="text"
            name="quantity"
            id="quantity"
            placeholder="01"
            value={quantity}
            onChange={(e) => setquantity(e.target.value.padStart(1,0))}
            min={0}
          />
        </section>
      </div>

      {/* product query saving button */}
      <div className="fixed bottom-0 left-0 w-screen p-4 rounded-t-2xl bg-opa-green grid grid-cols-2 justify-center gap-5 ">
        <button
          className="bg-tBlack hover:bg-black transition-colors ease-out text-white font-medium py-4 rounded-full"
          type="button"
        >
          Save as draft
        </button>
        <button
          className="bg-default-green hover:bg-green-600 transition-colors ease-out text-white font-medium py-4 rounded-full"
          type="submit"
        >
          Publish
        </button>
      </div>
    </form>
  );
}

export default AddProduct;
