import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

const BookOrActorAnalysisResult = () => {
  const location = useLocation();
  const analysisDetails = location.state?.analysisDetails;
  const [textBlobData, setTextBlobData] = useState(null);
  const [nltkData, setNLTKData] = useState(null);

  useEffect(() => {
    if (analysisDetails) {
      setTextBlobData(generatePieChartData(analysisDetails.TextBlob_analysis));
      setNLTKData(generateBarChartData(analysisDetails.NLTK_analysis));
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

  return (
    <main style={{ display: "flex" }}>
      {textBlobData && (
        <div style={{ width: "50%", marginTop: "50px" }}>
          <PieChart
            series={[
              {
                data: textBlobData,
              },
            ]}
            width={400}
            height={200}
          />
        </div>
      )}
      {nltkData && (
        <div style={{ width: "50%" }}>
          <BarChart
            xAxis={[
              {
                id: "barCategories",
                data: nltkData.map((item) => item.name),
                scaleType: "band",
              },
            ]}
            series={[
              {
                data: nltkData.map((item) => item.value),
              },
            ]}
            width={500}
            height={300}
          />
        </div>
      )}
    </main>
  );
};

export default BookOrActorAnalysisResult;
