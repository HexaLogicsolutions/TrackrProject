import React from "react";
import { Bar } from "react-chartjs-2";
function Barchart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "April", "May"],
    datasets: [
      {
        label: "Sale 2020 (M)",
        data: [3, 4, 2, 1, 4],
        borderWidth: 1,

        backgroundColor: "rgba(255, 99, 132, 1)",
        //   pointBackgroundColor: 'rgba(255, 42, 86, 0.2)',
        //   pointBorderColor: 'rgba(255, 200, 1, 1)'
      },
      {
        label: "Sale 2020(M)",
        data: [5, 2, 4, 2.5, 1],
        borderWidth: 1,

        backgroundColor: "rgba(54, 162, 235, 1)",
        //   pointBackgroundColor: 'rgba(255, 42, 86, 0.2)',
        //   pointBorderColor: 'rgba(255, 200, 1, 1)'
      },
      {
        label: "Sale 2021(M)",
        data: [8, 9, 8, 7, 3],
        borderWidth: 1,

        backgroundColor: "rgba(54, 162, 235, 1)",
        //   pointBackgroundColor: 'rgba(255, 42, 86, 0.2)',
        //   pointBorderColor: 'rgba(255, 200, 1, 1)'
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: "Bar Chart",
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
    <div className="chartContainer  w900 Chart Chartres" style={{ height: "250px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default Barchart;
