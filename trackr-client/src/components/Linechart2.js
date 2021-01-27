import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
// import { Pie } from "react-chartjs-2";

function Linechart2() {
  const [Data, setData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });

  useEffect(() => {
    fetchStock();
  }, []);

  // useEffect(() => {

  // }, [Data]);

  const fetchStock = async () => {
    const API_KEY = "HGJWFG4N8AQ66ICD";
    let StockSymbol = "AMZN";
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;

    fetch(API_Call)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let Xvals = [];
        let Yvals = [];
        let highVals = [];
        let lowVals = [];
        let x = 0;
        for (var key in data["Time Series (Daily)"]) {
          if (x % 4 === 0) {
            Xvals.push(key);
            Yvals.push(data["Time Series (Daily)"][key]["1. open"]);
            highVals.push(data["Time Series (Daily)"][key]["2. high"]);
            lowVals.push(data["Time Series (Daily)"][key]["3. low"]);
          }
          x = x + 1;
        }

        const myData = {
          labels: Xvals,
          datasets: [
            {
              label: "Value",
              data: Yvals,
              borderWidth: 2,
              borderColor: "blue",
              fill: false,
              backgroundColor: "lightBlue",
              // pointBackgroundColor: 'rgba(255, 42, 86, 0.2)',
              //   pointBorderColor: 'rgba(255, 200, 1, 1)'
            },
            {
              label: "High",
              data: highVals,
              borderWidth: 2,
              borderColor: "red",
              fill: false,
              backgroundColor: "pink",
              //   pointBackgroundColor: 'rgba(255, 42, 86, 0.2)',
              //   pointBorderColor: 'rgba(255, 200, 1, 1)'
            },
            {
              label: "Low",
              data: lowVals,
              borderWidth: 2,
              borderColor: "orange",
              fill: false,
              backgroundColor: "lime",
              //   pointBackgroundColor: 'rgba(255, 42, 86, 0.2)',
              //   pointBorderColor: 'rgba(255, 200, 1, 1)'
            },
          ],
        };

        setData(myData);
      });
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: true,
    },
    title: {
      display: true,
      text: "Line Chart",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 2400,
            max: 3600,
            stepSize: 300,
          },
          scaleLabel: {
            display: true,
            labelString: "Amount(Rs)",
            fontColor: "black",
            // fontSize:"13"
          },
        },
      ],
      xAxes: [
        {
          type: "time",
          time: {
            unit: "month",
            unitStepSize: 1,
            displayFormats: {
              month: "MMM",
            },
          },
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
    <div className=" chartContainer  Chart" style={{ height: "250px" }}>
      <Line data={Data} options={options} />
    </div>
  );
}

export default Linechart2;
