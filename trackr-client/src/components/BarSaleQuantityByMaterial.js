import React, { useState, useEffect, useContext } from "react";
import { Bar } from "react-chartjs-2";
import { AuthContext } from "../contexts/AuthContext";

const BarSaleQuantityByMaterial = ({ labels, data }) => {
  const contextType = useContext(AuthContext);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const chart = () => {
      // console.log("BarSaleQuantityByMaterial");
      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Total Quantity",
            data: data,
            backgroundColor: contextType.colors,
          },
        ],
      });
      // console.log(labels, chartData);
    };

    chart();
  }, [labels, data, contextType]);

  return (
    <div className="chartContainer Chart  Chartres  ">
      <Bar
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
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
          responsive: true,
          title: { text: "Sale Quantity by Material", display: true },
          scales: {
            xAxes: [
              {
                // barPercentage: 0.2,
                maxBarThickness: 75,
                scaleLabel: {
                  display: true,
                  labelString: "Material",
                  fontColor: "black",
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
                  // max: 10,

                },
                scaleLabel: {
                  display: true,
                  labelString: "Quantity",
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

export default BarSaleQuantityByMaterial;
