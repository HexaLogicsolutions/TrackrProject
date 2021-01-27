import React, { useState, useEffect, useContext } from "react";
import { Bar } from "react-chartjs-2";
import { AuthContext } from "../contexts/AuthContext";

const BarCurrentStockByMaterial = ({ labels, data }) => {
  const contextType = useContext(AuthContext);
  const [chartData, setChartData] = useState({});
  // const chart = () => {
  //   setChartData({
  //     labels: labels,
  //     datasets: [
  //       {
  //         label: "Total Material",
  //         data: data,
  //         backgroundColor: contextType.colors,
  //       },
  //     ],
  //   });
  // };

  useEffect(() => {
    const chart = () => {
      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Total Material",
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
          legend: {
            display: false,
          },
          responsive: true,
          title: { text: "Current Stock by Material", display: true },
          scales: {
            yAxes: [
              {
                ticks: {
                  min: 0,
                  // max: 30,
                },
                scaleLabel: {
                  display: true,
                  labelString: "Quantity",
                  fontColor: "black",
                  // fontSize:"13"
                },
              },
            ],
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Material",
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

export default BarCurrentStockByMaterial;
