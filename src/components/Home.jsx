import React, { useState } from "react";
import Button from "./Button";
import { LuLoader } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { account } from "../api";
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
const Home = () => {
  const navi = useNavigate();

  const { user, loading } = useAuth();

  const [selectedOption, setSelectedOption] = useState(1);
  const [load, setload] = useState(false);
  const [error, seterror] = useState("");
  const [data, setData] = useState([
    {
      title: "As a vendor",
      text: "I want to sell recycled items extracted from ewaste.",
      type: "vendor",
      select: false,
    },
    {
      title: "As a consumer",
      text: "I want to sell recycled items extracted from ewaste.",
      type: "consumer",
      select: true,
    },
  ]);
  const handleSelect = (id) => {
    if (selectedOption === id) return;
    setSelectedOption(id);
    setData((ele) => {
      const newArrar = ele.map((e, eid) => {
        if (eid == id) return { ...e, select: true };
        else return { ...e, select: false };
      });
      return newArrar;
    });
  };
  if (!user) {
    return (
      <div className="py-32 px-4 w-auto bg-white flex justify-center items-center">
        <div className="bg-white shadow-xl shadow-slate-800/50 p-10 rounded-xl">
          <p>You are not logged in</p>
          <p>
            Go to <a href="/signup">Sign Up</a> page and create a new account.
          </p>
          <p>or</p>
          <p>
            Go to <a href="/login">Login</a> page and login to your account.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="py-32 px-4 w-auto bg-white">
      <div className="header grid grid-cols-1 gap-5">
        <h2 className="font-bold text-left text-3xl">
          How do you want to use the platform?
        </h2>
      </div>

      <div className="my-10">
        {data.map((ele, id) => {
          return (
            <CardSelect
              key={id}
              id={"lorem"}
              title={ele.title}
              select={ele.select}
              text={ele.text}
              onClick={(e) => handleSelect(id)}
            />
          );
        })}
        {error && (
          <p className="text-red-600 bg-red-50 text-base rounded-md border border-red-600 p-2 mb-4">
            {error}
          </p>
        )}
        <Button
          text={"Sign up"}
          type={"button"}
          icon={<LuLoader className="animate-spin" />}
          disabled={load}
          onclick={async (e) => {
            e.preventDefault();
            // type: data[selectedOption].type.toLowerCase(),
            try {
              setload(true);
              seterror("");
              if (data[selectedOption].type.toLocaleLowerCase() === "vendor") {
                const response = await account
                  .setType("vendor")
                  .then((res) => res.json());
                console.log(response);
                if (response?.message === "success") {
                  alert(
                    "You have successfully created an account as a vendor."
                  );
                  navi("/");
                }

                seterror(
                  response?.error || response?.details || "An error occured"
                );

                // navi("/");
              } else {
                setload(true);
                alert(
                  "You have successfully created an account as a consumer."
                );
                navi("/");
              }
            } catch (error) {
              console.log(error);
            } finally {
              setload(false);
            }
          }}
          classes={"w-full py-3 font-semibold"}
        />
      </div>
    </div>
  );
};

export default Home;
