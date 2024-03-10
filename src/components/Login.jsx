import React, { useState } from "react";
import { Google } from "./icons/icons";
import Button from "./Button";
const Input = ({
  type,
  id,
  value,
  onChange,
  title,
  placeholder,
  required = false,
}) => {
  return (
    <section className="grid grid-cols-1 text-left mb-4 text-sm">
      <label className="text-title font-medium mb-1" htmlFor={id}>
        {title}
      </label>
      <input
        className={`font-normal border p-5 rounded-2xl placeholder:text-place ${
          value.length > 0 ? "border-default-black" : "border-light-gray"
        } outline-none`}
        type={type ? type : "text"}
        name={id}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder ? placeholder : "Type a text..."}
        required={required}
      />
    </section>
  );
};
const Login = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });
  const [error, setError] = useState(false);
  const handleState = (e) => {
    setFormData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email.length == 0 || formData.fullName.length == 0) {
      setError(true);
    } else {
      // call login method()
    }
  };
  return (
    <div className="py-32 px-4 font-poppins w-auto h-screen overflow-y-auto bg-white">
      <div className="header grid grid-cols-1 gap-5">
        <h2 className="font-bold text-left text-3xl">Sign in</h2>
        <button className="flex justify-center items-center border border-default-black w-full my-4 p-4 rounded-full hover:bg-default-gray/10 transition-colors ease-out duration-200">
          <Google />{" "}
          <span className="px-2 font-medium">Continue with Google</span>
        </button>
        <div className="separator relative w-3/4 mx-auto">
          <hr className="border-horizon" />
          <span className="w-fit h-fit absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-default-gray font-medium px-3">
            Or,
          </span>
        </div>
      </div>

      <div className="my-10">
        <form onSubmit={handleSubmit}>
          <Input
            id={"fullName"}
            placeholder={"Enter your full name"}
            title={"Full name"}
            onChange={handleState}
            value={formData.fullName}
            required={true}
          />
          <Input
            id={"email"}
            placeholder={"Enter your email address"}
            title={"Email address"}
            onChange={handleState}
            value={formData.email}
            required={true}
            type={"email"}
          />
          <Button
            text={"Sign up"}
            classes={"w-full py-3 font-semibold"}
            // icon={<Google />}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
