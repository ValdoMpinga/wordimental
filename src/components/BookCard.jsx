import React from "react";
import { colors } from "../utils/contants";

const BookCard = ({ title, author, onAnalyze }) => {
  return (
    <div style={styles.card}>
      <div style={styles.content}>
        <div style={styles.title}>{title}</div>
        <div style={styles.author}>Author: {author}</div>
      </div>
      <div style={styles.buttonContainer}>
        <button onClick={onAnalyze} style={styles.button}>
          Analyze
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: colors.primary,
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)", // Enhanced shadow effect
    marginBottom: "20px",
    width: "100%", // Adjusted width for responsiveness
    boxSizing: "border-box",
    height: "auto", // Adjusted height for responsiveness
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "transform 0.3s ease", // Added animation transition
    cursor: "pointer", // Added cursor pointer for better usability
  },
  content: {
    textAlign: "center",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  author: {
    marginBottom: "10px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: colors.background,
    color: colors.text,
    cursor: "pointer",
    transition: "background-color 0.3s ease", // Added transition for button hover effect
  },
  cardHover: {
    transform: "scale(1.05)", // Enlarges the card on hover
  },
};

export default BookCard;
