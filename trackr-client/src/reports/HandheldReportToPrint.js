import React, { useState } from "react";
import Moment from "moment";

export class HandheldReportToPrint extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // data: [],
      data: JSON.parse(localStorage.getItem("rptData")),
      heading: localStorage.getItem("rptHeading"),
    };
  }
  totalsum() {
    var i = 0;
    if (!this.state.data) return "";
    this.state.data.forEach(function (data) {
      i += data.total;
    });
    return i;
  }
  totalscan() {
    var i = 0;
    if (!this.state.data) return "";

    this.state.data.forEach(function (data) {
      i += data.scanned;
    });
    return i;
  }
  totalmissing() {
    var i = 0;
    if (!this.state.data) return "";

    this.state.data.forEach(function (data) {
      i += data.missing;
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
      <div className="container header  ">
        <center>
          <h1>{this.state.heading}</h1>
        </center>
        <table
          className="table table-sm border "
          style={{ fontFamily: "Segoe UI", fontSize: "0.9em" }}
        >
          <thead className="thead-dark">
            <tr className="tablerow">
              <th>Date</th>
              <th>User</th>
              <th>Act Group</th>
              <th>Opr</th>
              <th>Exp</th>
              <th>Msg</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data &&
              this.state.data.map((myList) => (
                <tr>
                  {/* format(new Date(hhRec._id.dateTime), "yyyy-MM-dd"),
      // hhRec._id.dateTime,
      // hhRec._id.userCode + " - "+ hhRec._id.userName,
      hhRec._id.userCode,
      hhRec._id.actionGroup,
      hhRec._id.operation,
      hhRec.scanned,
      hhRec.missing, */}
                  <td>
                    {Moment.utc(myList._id.dateTime).format("DD-MM-YYYY")}
                  </td>
                  <td>{myList._id.userCode} </td>
                  <td>{myList._id.actionGroup} </td>
                  <td>{myList._id.operation} </td>
                  <td>{myList.scanned} </td>
                  <td>{myList.missing} </td>
                  <td>{myList.total} </td>
                  <td></td>
                </tr>
              ))}

            <tr>
              <td></td>
              <td></td>
              <td></td>
              <th>Total:</th>
              <td>{this.totalscan().toLocaleString("en-IN")}</td>
              <td>{this.totalmissing().toLocaleString("en-IN")}</td>
              <td> {this.totalsum().toLocaleString("en-IN")}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
