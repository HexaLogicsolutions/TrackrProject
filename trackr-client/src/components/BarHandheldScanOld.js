import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
// import   'chartjs-plugin-datalabels';
// import { Pie } from 'react-chartjs-2'

function BarHandheldScanOld() {
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
    let API_Call = `http://localhost:5000/api/handheld/handheld-scan?fromDt=2021-01-12T00:00:00.000Z&toDt=2021-01-12T23:59:59.000Z`;
    // console.log("APi:" + API_Call);

    fetch(API_Call)
      .then(function (response) {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      })
      .then(function (data) {
        // console.log(data);

        let xVals = [];
        let totalVals = [];
        let missingVals = [];
        let scannedVals = [];

        let x = 0;
        for (const dataObj of data) {
          var dt = new Date(dataObj._id);
          var hh = dt.getHours();
          if (hh < 10) hh = "0" + hh;
          var mm = dt.getMinutes();
          // console.log(dataObj._id+ " -- "+ mm.lengt;
          if (mm < 10) mm = "0" + mm;

          // let dt= new Date (dataObj._id);
          xVals.push(hh + ":" + mm);
          totalVals.push(dataObj.total);
          missingVals.push(dataObj.missing);
          scannedVals.push(dataObj.scanned);
          x = x + 1;
        }

        const myData = {
          labels: xVals,
          datasets: [
            {
              label: "Total",
              data: totalVals,
              borderWidth: 1,

              backgroundColor: "rgba(0, 0, 255, 1)",
              //   pointBackgroundColor: 'rgba(255, 42, 86, 0.2)',
              //   pointBorderColor: 'rgba(255, 200, 1, 1)'
            },
            {
              label: "Scanned",
              data: scannedVals,
              borderWidth: 1,

              backgroundColor: "rgba(0, 255, 0, 1)",
              //   pointBackgroundColor: 'rgba(255, 42, 86, 0.2)',
              //   pointBorderColor: 'rgba(255, 200, 1, 1)'
            },
            {
              label: "Missing",
              data: missingVals,
              borderWidth: 1,

              backgroundColor: "rgba(255, 0, 0, 1)",
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
    // tooltips:false,
    maintainAspectRatio: false,
    legend: {
      display: true,
    },
    // tooltips:false,
    // plugins: {
    //     datalabels: {
    //        display: true,
    //        color: 'white'
    //     }
    //  },

    title: {
      display: true,
      text: "Bar Chart",
    },
    scales: {
      yAxes: [
        {
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
          //   type: "time",
          //   time: {
          //     // unit: "minute",
          //     // unitStepSize: 1,
          //     displayFormats: {
          //       month: "HH:mm",
          //     },
          //   },
          scaleLabel: {
            display: true,
            labelString: "Date/Time",
            fontColor: "black",
          },
        },
      ],
    },
  };

  return (
    <div className=" chartContainer w900 Chart" style={{ height: "250px" }}>
      <Bar data={Data} options={options} />
    </div>
  );
}

export default BarHandheldScanOld;
