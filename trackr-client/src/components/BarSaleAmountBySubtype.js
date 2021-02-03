import React, { useState, useEffect, useContext } from "react";
import { Bar } from "react-chartjs-2";
import { AuthContext } from "../contexts/AuthContext";
import BarCurrentStockBySubtype from "./BarCurrentStockBySubtype";
// import ChartDataLabels from 'chartjs-plugin-datalabels';
// Chart.plugins.unregister(ChartDataLabels);
const BarSaleAmountBySubtype = ({ labels, data }) => {
  const contextType = useContext(AuthContext);
  const [chartData, setChartData] = useState({});
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
    // console.log(labels, chartData);
  };

  useEffect(() => {
    chart();
  }, [labels, data]);
  return (
    <div className="chartContainer Chart  ">
      <Bar
      
        data={chartData}
        height="140px"
        
        options={{
          legend: {
            display: true,
          },
        //   plugins: {
            
        //     // Change options for ALL labels of THIS CHART
        //     datalabels: {
        //         color: 'white'
        //     }
        // },
          tooltips: {
            enabled: true
        },
        hover: {
            animationDuration: 1
        },
        animation: {
        duration: 1,
        onComplete: function () {
            var chartInstance = this.chart,
                ctx = chartInstance.ctx;
                ctx.textAlign = 'center';
                ctx.fillStyle = "rgba(0, 0, 0, 1)";
                ctx.textBaseline = 'bottom';
                // Loop through each data in the datasets
                this.data.datasets.forEach(function (dataset, i) {
                    var meta = chartInstance.controller.getDatasetMeta(i);
                    meta.data.forEach(function (bar, index) {
                        var data = dataset.data[index];
                        ctx.fillText(data, bar._model.x, bar._model.y - 5);
                    });
                });
            }
        },
          responsive: true,
          title: { text: "Sale Amount by Subtype", display: true },
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
                maxBarThickness: 75,
                scaleLabel: {
                  display: true,
                  labelString: "Subtype",
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

export default BarSaleAmountBySubtype;
