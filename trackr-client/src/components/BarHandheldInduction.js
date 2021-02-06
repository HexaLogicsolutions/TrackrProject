import React, { useState, useEffect, useContext } from "react";
import { Bar } from "react-chartjs-2";
import { AuthContext } from "../contexts/AuthContext";
import BarCurrentStockBySubtype from "./BarCurrentStockBySubtype";

const BarHandheldInduction = ({ labels, data }) => {
  const contextType = useContext(AuthContext);
  const [chartData, setChartData] = useState({});
  const [total, setTotal] = useState(0);
  const chart = () => {
    // console.log("inside BarHandheldScanNew");
    // console.log("Labels: "+labels);
    // console.log("totalVals:"+totalVals);
    // console.log("scannedVals:"+scannedVals);
    // console.log("missingVals:"+missingVals);
    if(data){
      var x=0;
      for (const dataObj of data) {
        x=x+dataObj;
      }
      setTotal(x);
    }

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Inducted",
          data: data,

          backgroundColor: "steelblue",
        },
      ],
    });
    // console.log(labels, chartData);
  };

  useEffect(() => {
    chart();
  }, [labels, data]);
  // }, [labels, totalVals, missingVals, scannedVals]);

  const options = {
    responsive: true,
    // tooltips:false,
    
    maintainAspectRatio: false,
  //   tooltips: {
  //     enabled: true
  // },
  //   legend: {
  //     display: true,
  //   },
  //   animation: {
  //     duration: 1,
  //     onComplete: function () {
  //         var chartInstance = this.chart,
  //             ctx = chartInstance.ctx;
  //             ctx.textAlign = 'center';
  //             ctx.fillStyle = "rgba(0, 0, 0, 1)";
  //             ctx.textBaseline = 'bottom';
  //             // Loop through each data in the datasets
  //             this.data.datasets.forEach(function (dataset, i) {
  //                 var meta = chartInstance.controller.getDatasetMeta(i);
  //                 meta.data.forEach(function (bar, index) {
  //                     var data = dataset.data[index];
  //                     ctx.fillText(data, bar._model.x, bar._model.y - 5);
  //                 });
  //             });
  //         }
  //     },

    // tooltips:false,
    // plugins: {
    //     datalabels: {
    //        display: true,
    //        color: 'white'
    //     }
    //  },

    title: {
      display: true,
      text: "Handheld Inventory Induction (Total: "+total+")",
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
          // barPercentage: 0.2,
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
    <div className="chartContainer Chart  Chartres  ">
      <Bar data={chartData}  options={options} />
    </div>
  );
};

export default BarHandheldInduction;
