import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import { colors } from "../utils/contants";
import ChartContainer from "../components/ChartContainer";

function BookComparisonResult() {
  const location = useLocation();
  const analysisDetails = location.state?.analysisDetails;

  useEffect(() => {
    console.log(analysisDetails);
  }, [analysisDetails]);

  const generateChartData = (analysis) => {
    return {
      NLTK: generateBarChartData(analysis.NLTK_analysis),
      TextBlob: generatePieChartData(analysis.TextBlob_analysis),
    };
  };

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

  return (
    <main>
      <Header title={"Book Comparison"} />
      <div className="charts-container">
        {analysisDetails && (
          <>
            <ChartContainer
              title={`NLTK Analysis - ${analysisDetails.book1.title}`}
              chartData={generateChartData(analysisDetails.book1).NLTK}
              chartType="bar"
            />
            <ChartContainer
              title={`TextBlob Analysis - ${analysisDetails.book1.title}`}
              chartData={generateChartData(analysisDetails.book1).TextBlob}
              chartType="pie"
            />
            <ChartContainer
              title={`NLTK Analysis - ${analysisDetails.book2.title}`}
              chartData={generateChartData(analysisDetails.book2).NLTK}
              chartType="bar"
            />
            <ChartContainer
              title={`TextBlob Analysis - ${analysisDetails.book2.title}`}
              chartData={generateChartData(analysisDetails.book2).TextBlob}
              chartType="pie"
            />
          </>
        )}
      </div>
      <style jsx>{`
        .charts-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 50px;
        }

        @media screen and (max-width: 768px) {
          .charts-container {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </main>
  );
}

export default BookComparisonResult;
