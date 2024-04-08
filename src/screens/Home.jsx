import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../styles/global.css";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function Home() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/sentiment-analyser/list-books/"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBooks(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <main style={styles.container}>
      <Header title={"Book sentiment analyser"} />
      <SearchBar
        onSearch={() => {
          console.log("Searching...");
        }}
      />
      {loading ? ( 
        <div style={styles.spinnerContainer}>
          <ClipLoader color="#36D7B7" loading={loading} size={50} />
          <p>Loading Books</p>
        </div>
      ) : (
        <div style={styles.cardContainer}>
          {books.map((book) => (
            <BookCard
              key={book.id}
              author={book.authors}
              title={book.title}
              onAnalyze={() => {
                navigate("/book-analysis", {
                  state: {
                    bookDetails: {
                      bookId: book.id,
                      author: book.authors,
                      title: book.title,
                    },
                  },
                });

                console.log("analysing");
              }}
            />
          ))}
        </div>
      )}
    </main>
  );
}

const styles = {
  container: {
    maxWidth: "1200px", // Limiting container width for better readability
    margin: "0 auto", // Centering the content horizontally
    padding: "20px",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap", // Allows cards to wrap to the next row
    justifyContent: "space-between", // Distribute space between cards
    gap: "20px", // Margin between cards
  },
  spinnerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "50vh",
  },
};


export default Home;
