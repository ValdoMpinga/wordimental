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
  const [NLKTData, setNLKTData] = useState(null);

  useEffect(() => {
    if (analysisDetails)
    {
      console.log(analysisDetails);
      console.log(analysisDetails.TextBlob_analysis);
      console.log(analysisDetails.NLKT_analysis);
      setTextBlobData(generatePieChartData(analysisDetails.TextBlob_analysis));
      setNLKTData(generateBarChartData(analysisDetails.NLKT_analysis));
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
    return <div>Loading...</div>; // Render a loading indicator if analysisDetails is null or undefined
  }

  return (
    <main>
      <Header title={"Book sentiment analyser"} />
      <BookDetailsCard
        title={analysisDetails.title}
        author={analysisDetails.authors}
        bgColor={colors.secundary}
        personagemAvaliado={"OG guy"}
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
        {NLKTData && (
          <ChartContainer
            title={`NLKT Analysis - ${analysisDetails.title}`}
            chartData={NLKTData}
            chartType="bar"
          />
        )}
      </div>
    </main>
  );
};

export default BookOrActorAnalysisResult;
