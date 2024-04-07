import React from "react";
import { colors } from "../utils/contants";

const Header = ({ title }) => {
  return (
    <div style={styles.header}>
      <h1>{title}</h1>
    </div>
  );
};

const styles = {
  header: {
    textAlign: "center",
    backgroundColor: colors.background,
    color: colors.highlight,
    padding: "20px 0",
  },
};

export default Header;

