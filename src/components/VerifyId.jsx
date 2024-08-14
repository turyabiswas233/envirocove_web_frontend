import React, { useEffect, useState } from "react";
import { ArrowBack } from "./icons/icons";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import doc from "/images/icons/doc.svg";
import cross from "/images/icons/cross.svg";
function VerifyID() {
  const opt = [
    {
      title: "National ID",
      type: "NID",
    },
    {
      title: "Birth Certificate",
      type: "BC",
    },
    {
      title: "Passport",
      type: "PASSPORT",
    },
  ];
  const [idType, setIdType] = useState(opt[0]);
  const nav = useNavigate();

  
  const chooseMe = (ele) => {
    setIdType(ele);
  };
  const [images, setImageList] = useState([]);
  const pushImage = (e) => {
    if (images.length == 2) alert("MAXIMUM file limit exceed");
    else if (e != null || e != undefined) setImageList((pre) => [...pre, e]);
  };
  const ImgCard = ({ ele }) => {
    const image = URL.createObjectURL(ele);
    return (
      <div className="mt-5 relative">
        <img
          className="aspect-square object-fill rounded-2xl"
          src={image}
          width={85}
          height={85}
        />
        <button
          className="absolute -top-2 -right-2"
          onClick={(e) => {
            const newList = images;
            setImageList(newList?.filter((f) => f != ele));
          }}
        >
          <img src={cross} alt="remove" />
        </button>
      </div>
    );
  };
  return (
    <div className="py-14 px-4  w-auto   overflow-y-auto space-y-10">
      <Link to={"/"}>
        <ArrowBack />
      </Link>
      <div className="header grid grid-cols-1 gap-5">
        <h2 className="font-bold text-left text-3xl">Verify Identity</h2>
        <p>
          To ensure a secure platform, ID verification is required for vendor
          approval.
        </p>
      </div>

      <div className="my-12 text-title text-sm">
        <section className="space-y-6">
          <p className="font-medium">Select what you want to submit.</p>
          <ul className="p-2 rounded-full flex w-full justify-between bg-bg-gray">
            {opt.map((ele, eid) => (
              <li
                className={`${
                  ele.type === idType.type
                    ? "bg-black text-white"
                    : "text-title"
                } text-center p-3 rounded-full cursor-pointer`}
                key={eid}
                onClick={() => chooseMe(ele)}
              >
                {ele.title}
              </li>
            ))}
          </ul>
        </section>

        <form
          className="grid my-5 space-y-16"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="rounded-2xl bg-bg-gray py-10 px-5 w-full border-dashed border-4 border-gray-300 relative">
            <div className="flex flex-col justify-center items-center gap-5">
              <img src={doc} alt="doc" />
              <p className="text-base font-medium text-center">
                Upload photos of your <br />
                National ID
              </p>
              <label
                htmlFor="docs"
                className="bg-default-green hover:bg-green-500 text-white font-semibold px-5 py-3 text-base rounded-full"
              >
                Choose image
              </label>
              <input
                type="file"
                name="docs"
                id="docs"
                multiple={false}
                hidden
                accept={"image/*"}
                onChange={(e) => pushImage(e.target.files[0])}
              />
            </div>

            <div className="flex gap-3 flex-wrap">
              {images?.map((e) => {
                return <ImgCard ele={e} />;
              })}
            </div>
            {images.length > 0 && (
              <span className="absolute bottom-2 right-2 text-gray-500">
                {images.length}/2
              </span>
            )}
          </div>
          <Button
            classes={"py-5 my-2 text-lg h-fit w-full font-semibold"}
            text={"Continue"}
            type={"submit"}
            disabled={images.length == 0}
            onclick={() => {
              nav("/requestprogress");
            }}
          />
        </form>
      </div>
    </div>
  );
}

export default VerifyID;
