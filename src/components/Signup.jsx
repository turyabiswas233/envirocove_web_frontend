import React, { useState } from "react";
import { Google } from "./icons/icons";
import Button from "./Button";
import check from "/images/icons/check.svg";
import { Link } from "react-router-dom";
function Signup() {
  const [isAgree, setAgree] = useState(false);
  const [userInfo, setInfo] = useState({
    fName: "",
    email: "",
  });
  function toggleAgree() {
    if (userInfo.email.length == 0 || userInfo.fName.length == 0) return;
    setAgree((p) => !p);
  }
  function handleInput(e) {
    setInfo((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  }
  return (
    <div className="py-32 px-4  w-auto  overflow-y-auto">
      <div className="header grid grid-cols-1 gap-5">
        <h2 className="font-bold text-left text-3xl">
          How do you want to use the platform?
        </h2>
      </div>

      <div className="my-12">
        <button className="w-full rounded-full border border-black hover:bg-opa-green/50 transition-colors text-base flex justify-center items-center py-4 gap-2 font-medium">
          <Google /> Continue with Google
        </button>
      </div>
      <div className="or">
        <div className="line"></div>
        <span>Or,</span>
        <div className="line"></div>
      </div>
      <div className="my-12">
        <form className="signup grid gap-5">
          <div className="input">
            <label htmlFor="f_name">Full Name</label>
            <input
              type="text"
              id="f_name"
              placeholder="Enter your full name"
              value={userInfo.fName}
              name="fName"
              onChange={handleInput}
            />
          </div>
          <div className="input">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              value={userInfo.email}
              name="email"
              onChange={handleInput}
            />
          </div>
          <div className="agreement flex items-center gap-3">
            <div
              className={`${
                !isAgree ? "bg-gray-300/70" : "bg-default-green"
              } border rounded-lg p-1 w-8 h-8 transition-colors duration-300`}
              onClick={toggleAgree}
              title={
                (userInfo.email.length == 0 || userInfo.fName.length == 0) &&
                "Fill up all info first."
              }
            >
              <div
                className={`w-3 h-1 origin-left translate-y-2 rounded-full ${
                  isAgree ? "bg-white" : "bg-slate-400"
                } rotate-45`}
              ></div>
              <div
                className={`w-5 h-1 origin-left translate-y-3 translate-x-1.5 rounded-full ${
                  isAgree ? "bg-white" : "bg-slate-400"
                } -rotate-45`}
              ></div>
            </div>

            <p>
              I agree to the <a href="#">Terms of Service</a> &{" "}
              <a href="#">Privacy Policy</a>
            </p>
          </div>
          <Button
            classes={"py-5 mt-5 font-medium text-lg"}
            text={"Sign Up"}
            type={"submit"}
            disabled={
              !isAgree ||
              userInfo.fName.length == 0 ||
              userInfo.email.length == 0
            }
          />
          <p className="text-center">
            Already have an account?{" "}
            <Link
              className="text-green-500 font-semibold hover:underline"
              to={"/login"}
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
