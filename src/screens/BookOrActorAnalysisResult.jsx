import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BookOrActorAnalysisResult = () => {
  const location = useLocation();
  const analysisDetails = location.state?.analysisDetails;
  const [textBlobData, setTextBlobData] = useState(null);
  const [nltkData, setNLTKData] = useState(null);

  useEffect(() => {
    if (analysisDetails) {
      // Prepare data for TextBlob analysis
      const textBlobChartData = [
        { name: "Polarity", value: analysisDetails.TextBlob_analysis.polarity },
        {
          name: "Subjectivity",
          value: analysisDetails.TextBlob_analysis.subjectivity,
        },
      ];

      // Prepare data for NLTK analysis
      const nltkChartData = [
        { name: "Positive", value: analysisDetails.NLTK_analysis.positive },
        { name: "Negative", value: analysisDetails.NLTK_analysis.negative },
        { name: "Neutral", value: analysisDetails.NLTK_analysis.neutral },
      ];

      setTextBlobData(textBlobChartData);
      setNLTKData(nltkChartData);
    }
  }, [analysisDetails]);

  // Helper function to generate colors for pie chart sectors
  const getColor = (index) => {
    const colors = ["#36A2EB", "#FF6384", "#FFCE56"];
    return colors[index % colors.length];
  };

  return (
    <div>
      <div>
        {textBlobData && (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              width={500}
              height={300}
              data={textBlobData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
      <div>
        {nltkData && (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              width={500}
              height={300}
              data={nltkData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#FF6384" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default BookOrActorAnalysisResult;
