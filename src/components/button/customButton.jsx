import React from "react";
import classes from "./button.module.css";

const CustomButton = (props) => {
  // destructured classes
  const { custom__button, custom_button_dark } = classes;

  // destructured props
  const { onclick, type, disabled, label, styleChanger } = props;
  return (
    <button
      className={styleChanger ? custom_button_dark : custom__button}
      type={"button" || type}
      disabled={disabled}
      onClick={onclick}
    >
      {label}
    </button>
  );
};

export default CustomButton;
