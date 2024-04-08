import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import { colors } from "../utils/contants";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import BookDetailsCard from "../components/BookDetailsCard";
import { useNavigate } from "react-router-dom";
import { CircleLoader } from "react-spinners";

function BookAnalysis() {
  const location = useLocation();
  const bookDetails = location.state.bookDetails;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [actorName, setActorName] = useState("");
  const [compareBookId, setCompareBookId] = useState(null);
  const [loadingText, setLoadingText] = useState(null);
  const [comparabeButtonDisabled, setCompareButtonDisabled] = useState(true);

  const handleInputChange = (event) => {
    setActorName(event.target.value);
  };

  const handleBookAnalysis = async () => {
    try {
      setLoading(true);
      setLoadingText("Analysing book...");
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
        state: { analysisDetails: data },
      });
    } catch (error) {
      console.error("Error analyzing book:", error);
    } finally {
      setLoading(false);
      setLoadingText(null);
    }
  };

  const handleActorAnalysis = async () => {
    try {
      setLoading(true);
      setLoadingText("Analysing book actor");

      const response = await fetch(
        "http://localhost:8000/sentiment-analyser/actor-sentiment-analyser/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: bookDetails.bookId,
            character: actorName,
          }),
        }
      );
      const data = await response.json();

      console.log(data);

      navigate("/book-or-actor-analysis-retsult", {
        state: { analysisDetails: data },
      });
    } catch (error) {
      console.error("Error analyzing book:", error);
    } finally {
      setLoading(false);
      setLoadingText(null);
    }
  };

  const handleSearchButton = async (bookName) => {
    try {
      setLoading(true);
      setLoadingText("Checking if book exists in the database...");

      const response = await fetch(
        "http://localhost:8000/sentiment-analyser/get-book-id/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: bookName,
          }),
        }
      );
      const data = await response.json();

      if (data.id) {
        console.log("Selected book for comparison id " + data);

        setCompareButtonDisabled(false);
        setCompareBookId(data.id);
        alert("Book exists, please click the compare button to proceed.");
      } else {
        alert("Book doesnt exists!");
      }
    } catch (error) {
      console.error("Error analyzing book:", error);
    } finally {
      setLoading(false);
      setLoadingText(false);
    }
  };

  const handleCompareBookButton = async () => {
    try {
      setLoading(true);
      setLoadingText("Comparing books...");

      const response = await fetch(
        "http://localhost:8000/sentiment-analyser/compare-books/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id1: bookDetails.bookId,
            id2: compareBookId,
          }),
        }
      );
      const data = await response.json();
      // console.log(data);
      navigate("/book-comparison-result", {
        state: {
          analysisDetails: { data },
        },
      });
    } catch (error) {
      console.error("Error analyzing book:", error);
    } finally {
      setLoading(false);
      setLoadingText(null);
      setCompareButtonDisabled(true);
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
          <CircleLoader color="#36D7B7" loading={loading} size={50} />
          <h2 style={{ marginTop: "20px" }}>{loadingText}</h2>
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
              onChange={handleInputChange}
              placeholder="Enter actor name"
              style={styles.input}
            />
            <Button
              label="Analyse"
              style={{ marginTop: "50px" }}
              onClick={() => {
                handleActorAnalysis();
              }}
            />
          </div>
          <div style={styles.separator} />
          <div style={styles.column}>
            <h2 style={styles.subtitle}>Compare with</h2>
            <div style={styles.searchBar}>
              <SearchBar
                onSearch={(query) => {
                  console.log("Search:", query);
                  handleSearchButton(query);
                }}
              />
            </div>
            <Button
              label="Compare"
              style={{ marginTop: "30px" }}
              onClick={() => {
                console.log("Comparing books...");
                handleCompareBookButton();
              }}
              disabled={comparabeButtonDisabled}
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
