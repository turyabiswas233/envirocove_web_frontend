import React, { useEffect, useState } from "react";
import { Google } from "./icons/icons";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { account } from "../api/index";
import { useAuth } from "../context/auth";
function Login() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [resentOTP, setOTPtimer] = useState(0);
  const [btnStatus, setbtnStatus] = useState("Login");
  const [userInfo, setInfo] = useState({
    phone: "",
    otp: "",
  });
  useEffect(() => {
    if (!loading) {
      if (!user) {
        console.warn("user is not logged in");
        return;
      }
      // navigate("/dashboard");
    }
  }, [user, loading]);
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

  function handleSubmit(e) {
    e.preventDefault();
    setbtnStatus("loading...");
    account
      .login({
        username: userInfo.phone || "",
        password: userInfo.otp || "",
      })
      .then((res) => res.json())
      .then((res) => {
        console.warn(res?.detail);
        if (res?.detail) alert(res?.detail);

        if (res.token) {
          localStorage.setItem("TOKEN", `Token ${res.token}`);

          alert(`You have logged in as ${res.username}`);
          setbtnStatus("wait a moment...");
          if (!res.is_active) {
            alert(
              "But your account may be disabled for a while. So you are going to be logged out"
            );
            localStorage.clear();
            navigate("/");
          }
          const loop = setTimeout(() => {
            clearTimeout(loop);
            setbtnStatus("Login");
            localStorage.setItem("TOKEN", `Token ${res.token}`);
            navigate("/dashboard");
          }, 2000);
        }
      })
      .catch((er) => console.log("er", er))
      .finally(() => {
        setbtnStatus("Login");
      });
  }
  if (user)
    return (
      <div className="p-5 font-bold text-center">
        User is logged in as {user?.username}
      </div>
    );
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
        <form className="signup grid gap-5" onSubmit={handleSubmit}>
          <div className="input">
            <label htmlFor="phone">{"Phone number/Username"}</label>
            <div className="border border-neutral-400 placeholder:text-neutral-400 px-5 py-3 rounded-3xl focus-within:outline outline-offset-0 focus-within:border-transparent focus-within:outline-green-500 outline-none flex items-center overflow-x-hidden">
              <span>+880</span>
              <span className="px-[.75px] h-10 bg-gray-700 mx-4"></span>
              <input
                className="outline-none flex-1"
                type="text"
                id="phone"
                required
                placeholder="1768952448 | username"
                name="phone"
                value={userInfo.phone}
                onChange={handleInput}
                onKeyDown={(e) => {
                  // if (e.key < "0" || e.key > "9") {
                  //   if (e.key != "Backspace") e.preventDefault();
                  // }
                }}
              />
            </div>
          </div>
          <div className="input relative">
            <label htmlFor="otp">Password</label>
            <input
              type="text"
              id="otp"
              required
              placeholder="Enter your password"
              name="otp"
              minLength={6}
              value={userInfo.otp}
              onChange={handleInput}
              onKeyDown={(e) => {
                // if (e.key < "0" || e.key > "9") {
                //   if (e.key != "Backspace") e.preventDefault();
                // }
              }}
            />
            {/* ## otp sender ## */}
            <span
              hidden
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
            text={btnStatus}
            type={"submit"}
            disabled={
              userInfo.phone.length <= 3 ||
              userInfo.otp.length < 6 ||
              btnStatus !== "Login"
            }
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
