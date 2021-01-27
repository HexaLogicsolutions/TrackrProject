import React, { useState, useEffect, useContext } from "react";
import { Bar } from "react-chartjs-2";
import { AuthContext } from "../contexts/AuthContext";
import BarCurrentStockBySubtype from "./BarCurrentStockBySubtype";

const BarSaleAmountBySubtype = ({ labels, data }) => {
  const contextType = useContext(AuthContext);
  const [chartData, setChartData] = useState({});
  const chart = () => {
    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Total Price",
          data: data,
          backgroundColor: contextType.colors,
        },
      ],
    });
    // console.log(labels, chartData);
  };

  useEffect(() => {
    chart();
  }, [labels, data]);
  return (
    <div className="chartContainer Chart  ">
      <Bar
        data={chartData}
        height="140px"
        options={{
          legend: {
            display: false,
          },
          responsive: true,
          title: { text: "Sale Amount by Subtype", display: true },
          scales: {
            yAxes: [
              {
                id: "y-axis-1",
                display: true,
                position: "left",
                ticks: {
                  min: 0,
                },

                scaleLabel: {
                  display: true,
                  labelString: "Amount (Rs)",
                  fontColor: "black",
                },
              },
            ],
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Subtype",
                  fontColor: "black",
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default BarSaleAmountBySubtype;
