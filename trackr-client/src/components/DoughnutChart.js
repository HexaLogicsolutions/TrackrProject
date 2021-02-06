import React, { useState, useEffect, useContext } from "react";
import { Bar } from "react-chartjs-2";
import { AuthContext } from "../contexts/AuthContext";

const BarSaleQuantityByMaterial = ({ labels, data }) => {
  const contextType = useContext(AuthContext);
  const [chartData, setChartData] = useState({});
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const chart = () => {
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
        height="140px"
        options={{
          legend: {
            display: false,
          },
          
          responsive: true,
          title: { text: "Sale Quantity by Material (Total: "+total+")", display: true },
          scales: {
            xAxes: [
              {
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
                  max: 10,
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
