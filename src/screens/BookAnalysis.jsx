import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import { colors } from "../utils/contants";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import BookDetailsCard from "../components/BookDetailsCard";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function BookAnalysis() {
  const location = useLocation();
  const bookDetails = location.state.bookDetails;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleBookAnalysis = async () => {
    try {
      setLoading(true); 
      const response = await fetch(
        "http://localhost:8000/sentiment-analyser/analyse-book/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: bookDetails.bookId }), 
        }
      );
      const data = await response.json();


      navigate("/book-or-actor-analysis-retsult", {
        state: { analysisDetails:  data  },
      });


      // navigate("/book-or-actor-analysis-retsult", {
      //   state: {
      //     analysisDetails: {
      //       title: "lorem Ipsum",
      //       authors: "John Doe",
      //       NLTK_analysis: {
      //         pos: 0.0,
      //         neg: 100.0,
      //         neu: 0.0,
      //         com:0.60
      //       },
      //       TextBlob_analysis: {
      //         polarity: 0.19444444444444445,
      //         subjectivity: 0.2888888888888889,
      //       },
      //     },
      //   },
      // });
    } catch (error) {
      console.error("Error analyzing book:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <main>
      <Header title={"Book sentiment analyser"} />
      <BookDetailsCard
        title={bookDetails.title}
        author={bookDetails.author}
        bgColor={colors.highlight}
      />
      {loading ? (
        <div style={styles.spinnerContainer}>
          <ClipLoader color="#36D7B7" loading={loading} size={50} />
          <p>Loading Books</p>
        </div>
      ) : (
        <div style={styles.container}>
          <div style={styles.column}>
            <h2 style={styles.subtitle}>Analyse Book</h2>
            <Button
              label="Analyse"
              style={{ marginTop: "108px" }}
              onClick={() => {
                handleBookAnalysis();
                console.log(
                  "Analysing books with the ID: " + bookDetails.bookId
                );
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
              onClick={() => {
                console.log("Analysing books...");
                navigate("/book-comparison-result", {
                  state: {
                    analysisDetails: {
                      book1: {
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
                      book2: {
                        author: "Balzac, Honoré de",
                        title: "Ursula",
                        NLTK_analysis: {
                          positive: 0.124,
                          negative: 0.66,
                          neutral: 0.211,
                        },
                        TextBlob_analysis: {
                          polarity: 0.10446607204135443,
                          subjectivity: 0.4895505824932801,
                        },
                      },
                    },
                  },
                });
                console.log("Compare");
              }}
            />
          </div>
        </div>
      )}
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
  spinnerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "50vh",
  },
};

export default BookAnalysis;
