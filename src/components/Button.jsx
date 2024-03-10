import React from "react";

function Button({ text, icon, type, classes, disabled = false }) {
  return (
    <button
      type={type ? type : "button"}
      className={`rounded-full hover:bg-green-500 transition-colors duration-200 flex justify-center items-center bg-default-green text-white ${classes} disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-default-green`}
      disabled={disabled}
    >
      {icon && <span className="mx-2">{icon}</span>}
      {text}
    </button>
  );
}

export default Button;
