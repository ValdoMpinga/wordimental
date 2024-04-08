import React from "react";
import { colors } from "../utils/contants";

const Button = ({ label, onClick, style, disabled = false }) => {
  const buttonStyle = {
    ...styles.button,
    ...(disabled ? styles.disabled : {}),
    ...style,
  };

  return (
    <button style={buttonStyle} onClick={onClick} disabled={disabled}>
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
  disabled: {
    backgroundColor: colors.disabled,
    cursor: "not-allowed",
  },
};

export default Button;
