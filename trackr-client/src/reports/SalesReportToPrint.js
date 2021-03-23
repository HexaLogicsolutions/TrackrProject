import React, { useState } from "react";
import Moment from "moment";
export class SalesReportToPrint extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // data: [],
      // data: JSON.parse(localStorage.getItem("rptData")),
      // heading: localStorage.getItem("rptHeading"),
      data:this.props.params.rptData,
  
    };
  }
  sum() {
    var i = 0;
    if (!this.state.data) return "";

    this.state.data.forEach(function (data) {
      i += data.sal_price;
    });
    return i;
  }

  componentDidMount() {
    // this.setState({
    //   data: JSON.parse(localStorage.getItem("rptData"))
    // });
  }

  render() {
    return (
      <div className="container  header  ">
        <center>
          {" "}
          <h1>{this.props.params.rptHeading}</h1>
        </center>
        <br></br>
     <div className="container">
      <table  className="mytable">
            <tr>
              <td className="td-50">
                <b>Warehouse: </b>
                {this.props.params.warehouse}
              </td>
              <td className="td-50" >
                <b>Date: </b>
                {this.props.params.fromDt}
                <b>-</b>
                {this.props.params.toDt}
              </td>
            </tr>
            <tr>
              <td className="td-50"><b>Material:</b>
              {this.props.params.material}
              </td>
              <td className="td-50" ><b>Subtype:</b>
              {this.props.params.subtype}
              </td>
              
            </tr>
          </table>
          </div>
      <hr></hr>
        <table
          className="table table-sm border "
          style={{ fontFamily: "Segoe UI", fontSize: "0.9em" }}
        >
          <thead className="thead-dark">
            <tr className="tablerow">
              <th>Date</th>
              <th>Warehouse</th>
              <th>Serial</th>
              <th>Subtype</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data &&
              this.state.data.map((myList) => (
                <tr>
                  <td>{Moment.utc(myList.sal_date).format("DD-MM-YYYY")}</td>
                  <td>{myList.sal_warehouse} </td>
                  <td>{myList.sal_serial} </td>
                  <td>{myList.sal_subtype} </td>
                  <td>
                    {" "}
                    {"₹ "}
                    {myList.sal_price.toLocaleString("en-IN")}{" "}
                  </td>
                </tr>
              ))}

            <tr>
              <td></td>
              <td></td>
              <td></td>
              <th>Total:</th>
              <td>
                {"₹ "}
                {this.sum().toLocaleString("en-IN")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
