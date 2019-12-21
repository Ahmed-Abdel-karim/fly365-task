import React from "react";
import "./button.scss";

const Button = props => {
  const { onClick, value, active, children, className, ...otherProps } = props;
  return (
    <button
      value={value}
      onClick={onClick}
      className={`button ${active ? "active" : ""} ${className}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
