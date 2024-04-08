import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import { colors } from "../utils/contants";
import ChartContainer from "../components/ChartContainer";

function BookComparisonResult() {
  const location = useLocation();
  const analysisDetails = location.state?.analysisDetails;

  useEffect(() => {
    console.log("Inside comparison display");
    console.log(analysisDetails.data);
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
              title={`NLTK Analysis - ${analysisDetails.data.book1.title}`}
              chartData={generateChartData(analysisDetails.data.book1).NLTK}
              chartType="bar"
            />
            <ChartContainer
              title={`TextBlob Analysis - ${analysisDetails.data.book1.title}`}
              chartData={generateChartData(analysisDetails.data.book1).TextBlob}
              chartType="pie"
            />
            <ChartContainer
              title={`NLTK Analysis - ${analysisDetails.data.book2.title}`}
              chartData={generateChartData(analysisDetails.data.book2).NLTK}
              chartType="bar"
            />
            <ChartContainer
              title={`TextBlob Analysis - ${analysisDetails.data.book2.title}`}
              chartData={generateChartData(analysisDetails.data.book2).TextBlob}
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
