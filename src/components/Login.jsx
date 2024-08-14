import React, { useEffect, useState } from "react";
import { Google } from "./icons/icons";
import Button from "./Button";
import { Link } from "react-router-dom";
function Login() {
  const [resentOTP, setOTPtimer] = useState(0);
  const [userInfo, setInfo] = useState({
    phone: "",
    otp: "",
  });
  useEffect(() => {
    if (resentOTP > 0) {
      const loop = setInterval(() => {
        setOTPtimer((pre) => pre - 1);
      }, 1000);
      return () => clearInterval(loop);
    }
  }, [resentOTP]);
  function handleInput(e) {
    setInfo((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  }
  return (
    <div className="py-32 px-4  w-auto overflow-y-auto">
      <div className="header grid grid-cols-1 gap-5">
        <h2 className="font-bold text-left text-3xl">Welcome Back!</h2>
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
                id="phone"
                required
                placeholder="1768952448"
                name="phone"
                value={userInfo.phone}
                onChange={handleInput}
                onKeyDown={(e) => {
                  if (e.key < "0" || e.key > "9") {
                    if (e.key != "Backspace") e.preventDefault();
                  }
                }}
              />
            </div>
          </div>
          <div className="input relative">
            <label htmlFor="otp">OTP</label>
            <input
              type="text"
              id="otp"
              required
              placeholder="Enter OTP"
              name="otp"
              maxLength={6}
              value={userInfo.otp}
              onChange={handleInput}
              onKeyDown={(e) => {
                if (e.key < "0" || e.key > "9") {
                  if (e.key != "Backspace") e.preventDefault();
                }
              }}
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
            text={"Login"}
            type={"submit"}
            disabled
          />
          <p className="text-center">
            Don&apos;t have an account?{" "}
            <Link
              className="text-green-500 font-semibold hover:underline"
              to={"/signup"}
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
