import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import BookDetailsCard from "../components/BookDetailsCard";
import { colors } from "../utils/contants";
import ChartContainer from "../components/ChartContainer";

const BookOrActorAnalysisResult = () => {
  const location = useLocation();
  const analysisDetails = location.state?.analysisDetails;
  const [textBlobData, setTextBlobData] = useState(null);
  const [NLTKData, setNLTKData] = useState(null);
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    if (analysisDetails) {
      if (analysisDetails.sentiment_analysis)
      {
        setCharacter(analysisDetails.character);
        setTextBlobData(
          generatePieChartData(
            analysisDetails.sentiment_analysis.TextBlob_analysis
          )
        );
        setNLTKData(
          generateBarChartData(analysisDetails.sentiment_analysis.NLTK_analysis)
        );
      } else {
        setTextBlobData(
          generatePieChartData(analysisDetails.TextBlob_analysis)
        );
        setNLTKData(generateBarChartData(analysisDetails.NLTK_analysis));
      }
    }
  }, [analysisDetails]);

  const generatePieChartData = (analysis) => {
    return Object.entries(analysis).map(([name, value], index) => ({
      id: index,
      value,
      label: name,
    }));
  };

  const generateBarChartData = (analysis) => {
    return Object.entries(analysis).map(([name, value]) => ({
      name,
      value,
    }));
  };

  if (!analysisDetails) {
    return <div>Loading...</div>; 
  }

  return (
    <main>
      <Header title={"Book sentiment analyser"} />
      <BookDetailsCard
        title={analysisDetails.title}
        author={analysisDetails.authors}
        bgColor={colors.secundary}
        personagemAvaliado={character}
      />
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        {textBlobData && (
          <ChartContainer
            title={`TextBlob Analysis - ${analysisDetails.title}`}
            chartData={textBlobData}
            chartType="pie"
          />
        )}
        {NLTKData && (
          <ChartContainer
            title={`NLTK Analysis - ${analysisDetails.title}`}
            chartData={NLTKData}
            chartType="bar"
          />
        )}
      </div>
    </main>
  );
};

export default BookOrActorAnalysisResult;
