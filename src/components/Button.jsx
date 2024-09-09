import React from "react";

function Button({ text, icon, type, classes, disabled = false, onclick }) {
  return (
    <button
      type={type ? type : "button"}
      className={`rounded-full hover:bg-green-500 transition-colors duration-200 flex justify-center items-center bg-default-green text-white disabled:opacity-50 disabled:pointer-events-none ${classes}`}
      disabled={disabled}
      onClick={onclick}
    >
      {text}
      {disabled && icon && <span className="mx-2">{icon}</span>}
    </button>
  );
}

export default Button;
