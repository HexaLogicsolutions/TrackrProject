import React, { useState, useContext, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { AuthContext } from "../contexts/AuthContext";

const BarSaleAmountByMaterial = ({ labels, data }) => {
  const [chartData, setChartData] = useState({});

  const contextType = useContext(AuthContext);

  useEffect(() => {
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
    };
    chart();
  }, [labels, data, contextType]);

  return (
    <div className="chartContainer Chart  ">
      <Bar
        data={chartData}
        // height={"140px"}
        options={{
          legend: {
            display: false,
          },
          responsive: true,
          title: { text: "Sale Amount by Material", display: true },
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
                  labelString: "Material",
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

export default BarSaleAmountByMaterial;
