import React, { useState, useEffect, useContext } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

const SaleChart = () => {
  const contextType = useContext(AuthContext);
  const [chartData, setChartData] = useState({});
  const chart = () => {
    let empid = [];
    let empmat = [];
    axios
      .get(contextType.dbUrl + "sales/price/price")
      .then((res) => {
        console.log(res);
        for (const dataObj of res.data) {
          empid.push(dataObj._id);
          empmat.push(dataObj.TotalMaterial);
          // data["Time Series (Daily)"][key]["1. open"]
        }
        setChartData({
          labels: empid,
          datasets: [
            {
              label: "Total Price",
              data: empmat,
              backgroundColor: contextType.colors,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(empid, empmat);
  };

  useEffect(() => {
    chart();
  }, []);
  return (
    <div className="chartContainer  w900 " style={{ height: "330px" }}>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          title: { text: "Price Chart", display: true },
          scales: {},
        }}
      />
    </div>
  );
};

export default SaleChart;
