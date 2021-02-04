import React from "react";
import { Line } from "react-chartjs-2";

function Linechart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "April", "May"],
    datasets: [
      {
        label: "Sales 2020 (M)",
        data: [3, 2, 2, 1, 5],
        borderColor: ["rgba(255, 206, 86, 1)"],
        backgroundColor: ["rgba(250, 250,250, 0)"],
        pointBackgroundColor: "rgba(255, 42, 86, 0.2)",
        pointBorderColor: "rgba(255, 200, 1, 10)",
      },
      {
        label: "Sales 2019 (M)",
        data: [1, 3, 2, 4, 3],
        borderColor: ["rgba(54, 162, 235, 1)"],
        backgroundColor: ["rgba(250, 250,250, 0)"],
        pointBackgroundColor: "rgba(54, 162, 235, 0.2)",
        pointBorderColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: "Line Chart",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 6,
            stepSize: 1,
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
          maxBarThickness: 75,
          scaleLabel: {
            display: true,
            labelString: "Months",
            fontColor: "black",
            // fontSize:"13"
          },
        },
      ],
    },
  };

  return (
    <div className=" chartContainer w900 Chart Chartres ">
      <Line data={data} options={options} />
    </div>
  );
}

export default Linechart;
