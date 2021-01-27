import React, { useState, useEffect, useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import { AuthContext } from "../contexts/AuthContext";

const PieCurrentItemByStatus = ({ labels, data }) => {
  const contextType = useContext(AuthContext);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const chart = () => {
      // console.log("Labels: " + labels);
      // console.log("Data: " + data);
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
    <div className="chartContainer Chart  ">
      <Doughnut
        data={chartData}
        // height="140px"
        options={{
          legend: {
            display: true,
            position: "right",

            align: "start",
          },

          responsive: true,
          title: { text: "Item Quantity by Status", display: true },

          scales: {},
          hover: {
            scales: "1",
          },
        }}
      />
    </div>
  );
};

export default PieCurrentItemByStatus;
