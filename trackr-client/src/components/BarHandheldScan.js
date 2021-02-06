import React, { useState, useEffect, useContext } from "react";
import { Bar } from "react-chartjs-2";
import { AuthContext } from "../contexts/AuthContext";
import BarCurrentStockBySubtype from "./BarCurrentStockBySubtype";

const BarHandheldScan = ({ labels, totalVals, missingVals, scannedVals }) => {
  const contextType = useContext(AuthContext);
  const [chartData, setChartData] = useState({});
  const [total, setTotal] = useState(0);
  const [missing, setMissing] = useState(0);
  const [scanned, setScanned] = useState(0);
  const chart = () => {
    // console.log("inside BarHandheldScanNew");
    // console.log("Labels: "+labels);
    // console.log("totalVals:"+totalVals);
    // console.log("scannedVals:"+scannedVals);
    // console.log("missingVals:"+missingVals);
    if(totalVals){
      var x=0;
      for (const dataObj of totalVals) {
        x=x+dataObj;
      }
      setTotal(x);
    }
    if(missingVals){
      var y=0;
      for (const dataObj of missingVals) {
        y=y+dataObj;
      }
      setMissing(y);
    }
    if(scannedVals){
      var z=0;
      for (const dataObj of scannedVals) {
        z=z+dataObj;
      }
      setScanned(z);
    }

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Total",
          data: totalVals,

          backgroundColor: "blue",
        },
        {
          label: "Scanned",
          data: scannedVals,

          backgroundColor: "#00C49F",
        },
        {
          label: "Missing",
          data: missingVals,
          backgroundColor: "red",
        },
      ],
    });
    // console.log(labels, chartData);
  };

  useEffect(() => {
    chart();
  }, [labels, totalVals, missingVals, scannedVals]);
  // }, [labels, totalVals, missingVals, scannedVals]);

  const options = {
    responsive: true,
    // tooltips:false,
    maintainAspectRatio: false,
    legend: {
      display: true,
    },
  //   tooltips: {
  //     enabled: true
  // },
  // hover: {
  //     animationDuration: 1
  // },
  // animation: {
  // duration: 1,
  // onComplete: function () {
  //     var chartInstance = this.chart,
  //         ctx = chartInstance.ctx;
  //         ctx.textAlign = 'center';
  //         ctx.fillStyle = "rgba(0, 0, 0, 1)";
  //         ctx.textBaseline = 'bottom';
  //         // Loop through each data in the datasets
  //         this.data.datasets.forEach(function (dataset, i) {
  //             var meta = chartInstance.controller.getDatasetMeta(i);
  //             meta.data.forEach(function (bar, index) {
  //                 var data = dataset.data[index];
  //                 ctx.fillText(data, bar._model.x, bar._model.y - 5);
  //             });
  //         });
  //     }
  // },
    // tooltips:false,
    // plugins: {
    //     datalabels: {
    //        display: true,
    //        color: 'white'
    //     }
    //  },
    responsive: true,
    title: {
      display: true,
      text: "Handheld Inventory Scan (Tot: "+total+", Scn: "+scanned+", Msg: "+missing+")",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            
          },
          scaleLabel: {
            display: true,
            labelString: "Count",
            fontColor: "black",
          },
        },
      ],
      xAxes: [
        {
          // barPercentage: 0.8,
          //   type: "time",
          //   time: {
          //     // unit: "minute",
          //     // unitStepSize: 1,
          //     displayFormats: {
          //       month: "HH:mm",
          //     },
          //   },
          maxBarThickness: 75,
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
    <div className="chartContainer Chart Chartres  ">
      <Bar data={chartData}   options={options} />
    </div>
  );
};

export default BarHandheldScan;
