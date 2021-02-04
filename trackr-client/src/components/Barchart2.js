import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
// import { Pie } from 'react-chartjs-2'

function Barchart2() {
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
    //console.log(users);
  }, []);

  // useEffect(() => {
  //   console.log("ChartData: " + Data);
  // }, [Data]);

  const fetchStock = async () => {
    const API_KEY = "HGJWFG4N8AQ66ICD";
    let StockSymbol = "AMZN";
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
    console.log("APi:" + API_Call);

    fetch(API_Call)
      .then(function (response) {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      })
      .then(function (data) {
        console.log(data);

        let xVals = [];
        let yVals = [];
        let highVals = [];
        let lowVals = [];

        let x = 0;
        for (var key in data["Time Series (Daily)"]) {
          if (x % 10 === 0) {
            xVals.push(key);
            yVals.push(data["Time Series (Daily)"][key]["1. open"]);

            highVals.push(data["Time Series (Daily)"][key]["2. high"]);

            lowVals.push(data["Time Series (Daily)"][key]["3. low"]);
          }
          x = x + 1;
        }

        const myData = {
          labels: xVals,
          datasets: [
            {
              label: "Value",
              data: yVals,
              borderWidth: 1,

              backgroundColor: "rgba(255, 99, 132, 1)",
              //   pointBackgroundColor: 'rgba(255, 42, 86, 0.2)',
              //   pointBorderColor: 'rgba(255, 200, 1, 1)'
            },
            {
              label: "High",
              data: highVals,
              borderWidth: 1,

              backgroundColor: "rgba(54, 162, 235, 1)",
              //   pointBackgroundColor: 'rgba(255, 42, 86, 0.2)',
              //   pointBorderColor: 'rgba(255, 200, 1, 1)'
            },
            {
              label: "Low",
              data: lowVals,
              borderWidth: 1,

              backgroundColor: "rgba(255, 159, 64, 1)",
              //   pointBackgroundColor: 'rgba(255, 42, 86, 0.2)',
              //   pointBorderColor: 'rgba(255, 200, 1, 1)'
            },
          ],
        };
        // console.log("myData: "+ myData);
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
      text: "Bar Chart",
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
            labelString: "Amount (Rs)",
            fontColor: "black",
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
          maxBarThickness: 75,
          scaleLabel: {
            display: true,
            labelString: "Months",
            fontColor: "black",
          },
        },
      ],
    },
  };

  return (
    <div className=" chartContainer w900 Chart Chartres " >
      <Bar data={Data} options={options} />
    </div>
  );
}

export default Barchart2;
