import React from "react";
import { colors } from "../utils/contants";

const Button = ({ label, onClick, style }) => {
  const buttonStyle = {
    ...styles.button,
    ...style,
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {label}
    </button>
  );
};

const styles = {
  button: {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: colors.primary,
    color: colors.background,
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default Button;
