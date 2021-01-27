import React, { Component } from "react";

// import Plot from 'react-plotly.js';

import createPlotlyComponent from "react-plotly.js/factory";
const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

class Plotlyline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: [],
    };
  }

  componentDidMount() {
    this.fetchStock();
  }

  fetchStock() {
    const pointerToThis = this;
    console.log(pointerToThis);
    const API_KEY = "HGJWFG4N8AQ66ICD";
    let StockSymbol = "AMZN";
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    fetch(API_Call)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //console.log(data);

        for (var key in data["Time Series (Daily)"]) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(
            data["Time Series (Daily)"][key]["1. open"]
          );
          // console.log("key: "+key+ " - value: "+data["Time Series (Daily)"][key]["1. open"]);
        }

        // console.log(stockChartXValuesFunction);
        pointerToThis.setState({
          stockChartXValues: stockChartXValuesFunction,
          stockChartYValues: stockChartYValuesFunction,
        });
      });
  }

  render() {
    return (
      <div className=" rj2">
        {/*         
        <div className="leftfloat">
          <Plot
            data={[
              {
                x: this.state.stockChartXValues,
                y: this.state.stockChartYValues,
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "red" },
              },
            ]}
            layout={{ width: 400, height: 250 }}
          />
        </div>
        <div className="rightfloat">
          <Plot
            data={[
              {
                x: this.state.stockChartXValues,
                labels: ["Residential", "Non-Residential", "Utility"],
                type: "pie",
              },
            ]}
            layout={{ width: 400, height: 250 }}
          />
        </div>
         */}

        <div className="centerfloat">
          <Plot
            data={[
              {
                x: this.state.stockChartXValues,
                y: this.state.stockChartYValues,
                type: "scatter",
                mode: "lines",
                // autosize:'False',
                marker: { color: "green" },
              },
            ]}
            layout={{ width: 820, height: 550 }}
          />
        </div>
      </div>
    );
  }
}

export default Plotlyline;
