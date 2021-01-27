import React, { useState, useEffect, useContext } from "react";
import { Bar } from "react-chartjs-2";

import { AuthContext } from "../contexts/AuthContext";

const BarCurrentStockBySubtype = ({ labels, data }) => {
  const contextType = useContext(AuthContext);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const chart = () => {
      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Total Subtype",
            data: data,
            backgroundColor: contextType.colors,
          },
        ],
      });
    };
    chart();
  }, [labels, data, contextType]);
  return (
    <div className="chartContainer Chart ">
      <Bar
        data={chartData}
        // height="140px"

        options={{
          responsive: true,
          legend: {
            display: false,
          },

          title: { text: "Current Stock by Subtype", display: true },
          scales: {
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Subtypes",
                  fontColor: "black",
                  // fontSize:"13"
                },
              },
            ],
            yAxes: [
              {
                id: "y-axis-1",
                display: true,
                position: "left",
                ticks: {
                  min: 0,
                  // max: 20,
                },

                scaleLabel: {
                  display: true,
                  labelString: "Quantity",
                  fontColor: "black",
                  // fontSize:"13"
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default BarCurrentStockBySubtype;
