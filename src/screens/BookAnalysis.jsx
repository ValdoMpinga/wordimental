import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import { colors } from "../utils/contants";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function BookAnalysis() {
  const location = useLocation();
  const bookDetails = location.state.bookDetails;
  const navigate = useNavigate();

  return (
    <main>
      <Header title={"Book sentiment analyser"} />
      <div className="book-details" style={styles.bookDetails}>
        <p style={styles.bookInfo}>
          <span style={styles.label}>Livro:</span> {bookDetails.title} <br />
          <span style={styles.label}>Autor:</span> {bookDetails.author}
        </p>
      </div>

      <div style={styles.container}>
        <div style={styles.column}>
          <h2 style={styles.subtitle}>Analyse Book</h2>
          <Button
            label="Analyse"
            style={{ marginTop: "108px" }}
            onClick={() => {
              console.log("Analysing books...");
              navigate("/book-or-actor-analysis-retsult", {
                state: {
                  analysisDetails: {
                    author: "John Doe",
                    title: "lorem Ipsum",
                      NLTK_analysis: {
                        positive: 0.0,
                        negative: 100.0,
                        neutral: 0.0,
                    },
                      TextBlob_analysis: {
                        polarity: 0.19444444444444445,
                        subjectivity: 0.2888888888888889,
                    },
                  },
                },
              });
            }}
          />
        </div>
        <div style={styles.separator} />
        <div style={styles.column}>
          <h2 style={styles.subtitle}>Analyse Actor</h2>
          <input
            type="text"
            placeholder="Enter actor name"
            style={styles.input}
          />
          <Button
            label="Analyse"
            style={{ marginTop: "50px" }}
            onClick={() => console.log("Analyse actor")}
          />
        </div>
        <div style={styles.separator} />
        <div style={styles.column}>
          <h2 style={styles.subtitle}>Compare with</h2>
          <div style={styles.searchBar}>
            <SearchBar onSearch={(query) => console.log("Search:", query)} />
          </div>
          <Button
            label="Compare"
            style={{ marginTop: "30px" }}
            onClick={() => console.log("Compare")}
          />
        </div>
      </div>
    </main>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: "1000px",
    margin: "0 auto",
    marginTop: "80px",
  },
  bookDetails: {
    backgroundColor: colors.highlight,
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    margin: "20px auto",
    maxWidth: "600px",
    textAlign: "center",
  },
  column: {
    flex: 1,
    textAlign: "center",
  },
  subtitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  separator: {
    width: "2px",
    backgroundColor: colors.text,
    alignSelf: "stretch",
  },
  input: {
    width: "80%",
    padding: "8px",
    borderRadius: "5px",
    border: `1px solid ${colors.text}`,
    marginTop: "25px",
  },
  searchBar: {
    marginTop: "32px",
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

export default BookAnalysis;
