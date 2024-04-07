import React from "react";
import Header from "../components/Header";
import "../styles/global.css";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <main style={styles.container}>
      <Header title={"Book sentiment analyser"} />
      <SearchBar
        onSearch={() => {
          console.log("Searching...");
        }}
      />
      <div style={styles.cardContainer}>
        <BookCard
          author="James"
          title="lorem Ipsum"
          onAnalyze={() => {
            navigate("/book-analysis", {
              state: {
                bookDetails: {
                  author: "John Doe",
                  title: "lorem Ipsum",
                },
              },
            });

            console.log("analysing");
          }}
        />
        <BookCard
          author="John"
          title="Dolor Sit Amet"
          onAnalyze={() => {
            console.log("analysing");
          }}
        />
        <BookCard
          author="Jane"
          title="Consectetur Adipiscing"
          onAnalyze={() => {
            console.log("analysing");
          }}
        />
      </div>
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
};

export default Home;
