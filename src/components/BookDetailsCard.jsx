import React from "react";
import { colors } from "../utils/contants";

const BookDetailsCard = ({ title, author, bgColor, personagemAvaliado }) => {
  return (
    <div style={{ ...styles.bookDetails, backgroundColor: bgColor }}>
      <p style={styles.bookInfo}>
        <span style={styles.label}>Livro:</span> {title} <br />
        <span style={styles.label}>Autor:</span> {author} <br />
        {personagemAvaliado && (
          <span>
            <span style={styles.label}>Personagem Avaliado:</span>{" "}
            {personagemAvaliado}
          </span>
        )}
      </p>
    </div>
  );
};

const styles = {
  bookDetails: {
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    margin: "20px auto",
    maxWidth: "600px",
    textAlign: "center",
  },
  bookInfo: {
    fontSize: "1.2rem",
    lineHeight: "1.6",
    margin: "0",
  },
  label: {
    fontWeight: "bold",
    marginRight: "3px",
  },
};

export default BookDetailsCard;
