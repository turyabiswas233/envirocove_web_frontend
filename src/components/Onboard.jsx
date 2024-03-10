import React, { useState } from "react";
import Button from "./Button";
const CardSelect = ({ id, select = false, title, text, onClick }) => {
  return (
    <div
      className={`font-normal border p-5 mb-3 rounded-2xl ${
        select ? "border-default-black" : "border-light-gray"
      } outline-none transition-colors duration-300 flex justify-between items-center text-left`}
      onClick={onClick} //on click this item should be checked
    >
      <section className="left">
        <label className="text-tBlack font-semibold mb-1 text-2xl" htmlFor={id}>
          {title}
        </label>
        <p className={`text-place text-base  leading-5 mt-3`}>{text}</p>
      </section>
      <div
        className={`${
          !select ? "bg-white" : "bg-black"
        } border rounded-lg p-1 w-8 h-8 transition-colors duration-300`}
      >
        <div className="w-3 h-1 origin-left translate-y-2 rounded-full bg-white rotate-45"></div>
        <div className="w-5 h-1 origin-left translate-y-3 translate-x-1.5 rounded-full bg-white -rotate-45"></div>
      </div>
    </div>
  );
};
const Onboard = () => {
  const [data, setData] = useState([
    {
      title: "As a vendor",
      text: "I want to sell recycled items extracted from ewaste.",
      select: false,
    },
    {
      title: "As a consumer",
      text: "I want to sell recycled items extracted from ewaste.",
      select: false,
    },
  ]);
  const count = data.filter((pre) => pre.select === true).length;
  return (
    <div className="py-32 px-4 font-poppins w-auto h-screen overflow-y-auto bg-white">
      <div className="header grid grid-cols-1 gap-5">
        <h2 className="font-bold text-left text-3xl">
          How do you want to use the platform?
        </h2>
      </div>

      <div className="my-10">
        {data.map((ele, id) => {
          return (
            <CardSelect
              id={"lorem"}
              title={ele.title}
              select={ele.select}
              text={ele.text}
            />
          );
        })}

        <Button
          text={"Sign up"}
          classes={"w-full py-3 font-semibold"}
          disabled={count == 0}
          // icon={<Google />}
        />
      </div>
    </div>
  );
};

export default Onboard;
