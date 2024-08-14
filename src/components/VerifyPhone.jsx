import React, { useEffect, useState } from "react";
import { ArrowBack } from "./icons/icons";
import Button from "./Button";
import { Link } from "react-router-dom";

function VerifyPhone() {
  const [resentOTP, setOTPtimer] = useState(0);
  
  useEffect(() => {
    if (resentOTP > 0) {
      const loop = setInterval(() => {
        setOTPtimer((pre) => pre - 1);
      }, 1000);
      return () => clearInterval(loop);
    }
  }, [resentOTP]);
  return (
    <div className="py-14 px-4  w-auto   overflow-y-auto space-y-12">
      <Link to={"/"}>
        <ArrowBack />
      </Link>
      <div className="header grid grid-cols-1 gap-5">
        <h2 className="font-bold text-left text-3xl">Verify Number</h2>
        <p>
          We need to verify your account to keep it safe. It will help us to
          identify you.
        </p>
      </div>

       
      <div className="my-12 text-title">
        <form className="signup grid gap-5">
        <div className="input">
            <label htmlFor="phone">Phone number</label>
            <div className="border border-neutral-400 placeholder:text-neutral-400 px-5 py-3 rounded-3xl focus-within:outline outline-offset-0 focus-within:border-transparent focus-within:outline-green-500 outline-none flex items-center overflow-x-hidden">
              <span>+880</span>
              <span className="px-[.75px] h-10 bg-gray-700 mx-4"></span>
              <input
                className="outline-none flex-1"
                type="text"
                name="phone"
                id="phone"
                required
                placeholder="1768952448"
              />
            </div>
          </div>
          <div className="input relative">
            <label htmlFor="otp">OTP</label>
            <input
              type="number"
              name="otp"
              id="otp"
              required
              placeholder="Enter OTP"
              autoComplete="one-time-code"
            />
            {/* ## otp sender ## */}
            <span
              className={`absolute px-3 py-2 bg-white right-2 top-[40%] ${
                resentOTP > 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-green-500 font-semibold cursor-pointer"
              }`}
              onClick={(e) => {
                if (resentOTP == 0) setOTPtimer(60);
              }}
            >
              {resentOTP > 0 ? "Resend (" + resentOTP + "s)" : "Send OTP"}
            </span>
          </div>

          <Button
            classes={"py-5 my-2 font-medium text-lg"}
            text={"Continue"}
            type={"submit"}
          />
        </form>
      </div>
    </div>
  );
}

export default VerifyPhone;
