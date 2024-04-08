import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

const ChartContainer = ({ title, chartData, chartType }) => {
  return (
    <div style={{ marginRight: "20px", textAlign: "center" }}>
      <h2>{title}</h2>
      {chartType === "pie" && (
        <PieChart
          series={[
            {
              data: chartData,
            },
          ]}
          width={400}
          height={200}
        />
      )}
      {chartType === "bar" && (
        <BarChart
          xAxis={[
            {
              id: "barCategories",
              data: chartData.map((item) => item.name),
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: chartData.map((item) => item.value),
            },
          ]}
          width={500}
          height={300}
        />
      )}
    </div>
  );
};

export default ChartContainer;
