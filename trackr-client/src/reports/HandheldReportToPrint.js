import React, { useState } from "react";
import Moment from "moment";

export class HandheldReportToPrint extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // data:[...JSON.parse(localStorage.getItem("rptData"))],
      data: this.props.params.rptData,
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
  componentDidMount() {}
  render() {
    return (
      <div className="container header  ">
        <center>
          <h1>{this.props.params.rptHeading}</h1>
        </center>
        {/* <h3>{this.props.params.toDt}</h3>
          <h3>{this.props.params.fromDt}</h3> */}
          <br>
          </br>
        <div>
          <table>
            <tr>
              <td className="td-50">
                <b>Warehouse: </b>
                {this.props.params.warehouse}
              </td>
              <td className="td-50">
                <b>Date: </b>
                {this.props.params.fromDt}
                &nbsp;<b>-</b> &nbsp;
                {this.props.params.toDt}
              </td>
              {/* <td><b>-:</b>{this.props.params.toDt}</td> */}
            </tr>
          </table>
        </div>
        <hr></hr>
        {/* <div>
          <h4 style={{float:'left'}}>From: &nbsp;&nbsp;{this.props.params.fromDt}</h4>
          <h4 style={{float:'right'}}>To: &nbsp;&nbsp;{this.props.params.fromDt}</h4>
        </div> */}
        <br></br>
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
              this.state.data.map((myList, index) => (
                <tr key={index}>
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
