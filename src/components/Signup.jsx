import React, { useEffect, useState } from "react";
import { Google } from "./icons/icons";
import Button from "./Button";
import {
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { account } from "../api/index";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const { TOKEN } = useOutletContext();
  const [isAgree, setAgree] = useState(false);
  const [error, setError] = useState(null);
  const [userInfo, setInfo] = useState({
    fName: "",
    email: "",
    pass: "",
  });

  useEffect(() => {
    if (TOKEN) {
      console.log(TOKEN);
      console.log(location.state);

      navigate("/dashboard");
    } else localStorage.removeItem("TOKEN");
  }, [TOKEN]);

  function toggleAgree() {
    if (userInfo.email.length == 0 || userInfo.fName.length == 0) return;
    setAgree((p) => !p);
  }
  function handleInput(e) {
    setInfo((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  }
  async function handleSignUp(e) {
    e.preventDefault();
    const fname = userInfo.fName.split(" ", 2);

    account
      .register({
        username: userInfo.email.split("@")[0],
        email: userInfo.email,
        password: userInfo.pass,
        first_name: fname[0],
        last_name: fname[1] || ", ",
      })
      .then((res) => res.json())
      .then((data) => {
        const token = data.token;
        if (token) {
          localStorage.setItem("TOKEN", `Token ${token}`);
          alert("Registration successful");
          if (location.state?.type === "vendor")
            account
              .setType("vendor", token)
              .then((res) => res.json())
              .then((res) => console.log(res))
              .catch((err) => {
                console.log(err);
              })
              .finally(() => {
                navigate("/dashboard");
              });
        } else {
          alert("Registration failed");
          console.log(data);
          setError(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
        <form className="signup grid gap-5" onSubmit={handleSignUp}>
          <div className="input">
            <label htmlFor="f_name">Full Name</label>
            <input
              type="text"
              id="f_name"
              placeholder="Enter your full name"
              value={userInfo.fName}
              maxLength={150}
              required
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
              required
              name="email"
              onChange={handleInput}
            />
            {error && error?.username && <p className="text-sm text-rose-500 px-5">{error?.username[0]}</p>}
            {error && error?.email && <p className="text-sm text-rose-500 px-5">{error?.email[0]}</p>}
          </div>
          <div className="input">
            <label htmlFor="pass">Password</label>
            <input
              type="password"
              id="pass"
              placeholder="Enter new password"
              value={userInfo.pass}
              minLength={8}
              required
              name="pass"
              onChange={handleInput}
            />
            <div className="py-0">
              <p className="text-sm">Tips:</p>
              <ol className="px-5 list-decimal text-green-700 text-sm">
                <li>length a least 8 </li>
                <li>contains capital case[A-Z]</li>
                <li>contains small case[a-z]</li>
                <li>contains numbers[0-9]</li>
              </ol>
            </div>
          </div>
          <div className="agreement flex items-center gap-3">
            <div
              className={`${
                !isAgree ? "bg-gray-300/70" : "bg-default-green"
              } border rounded-lg p-1 w-8 h-8 transition-colors duration-300`}
              onClick={toggleAgree}
              title={
                userInfo.email.length == 0 || userInfo.fName.length == 0
                  ? "Fill up all info first."
                  : ""
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
              userInfo.email.length == 0 ||
              !userInfo.email.includes("@") ||
              userInfo.email.indexOf("@") == userInfo.email.length - 1 ||
              userInfo.email[userInfo.email.length - 1] == "."
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
