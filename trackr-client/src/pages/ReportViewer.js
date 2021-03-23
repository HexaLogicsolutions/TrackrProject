import React, { useState, useEffect, useRef, useContext } from "react";
import { useReactToPrint } from "react-to-print";
import { SalesReportToPrint } from "../reports/SalesReportToPrint";
import { HandheldReportToPrint } from "../reports/HandheldReportToPrint";
import { FaPrint } from "react-icons/fa";
import { useLocation } from "react-router-dom";
export const ReportViewer = () => {
  const location = useLocation();
  console.log("From--" + location.state.fromDt);
  console.log("To--" + location.state.toDt);
  const [isSalesReport, setIsSalesReport] = useState(false);
  const [isHandheldReport, setIsHandheldReport] = useState(false);
  const componentRef = useRef();
  useEffect(() => {
    // setIsSalesReport(localStorage.getItem("rptHeading") === "Sales Report ");
    // setIsHandheldReport(
    //   localStorage.getItem("rptHeading") === "Handheld Report"
    // );
    setIsSalesReport(location.state.rptHeading === "Sales Report");
    setIsHandheldReport(location.state.rptHeading === "Handheld Report");
  }, []);
  // useEffect(() => {
  //   console.log(location.pathname); // result: '/secondpage'
  //   console.log(location.search); // result: '?query=abc'
  //   console.log(location.state.detail); // result: 'some_value'
  // }, [location]);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    bodyClass: "printElement1",
  });
  const back = () => {
    window.history.back();
  };
  return (
    <div>
      {/* <center> */}
      <div className="center-container">
        <button onClick={handlePrint} className="mybutton">
          <FaPrint />
        </button>
        &nbsp; &nbsp; &nbsp;
        <button onClick={back} style={{ color: "red" }} className="mybutton">
          Back
        </button>
      </div>
      {/* </center> */}
      {isSalesReport && <SalesReportToPrint ref={componentRef} params={location.state} />}
      {isHandheldReport && (
        <HandheldReportToPrint ref={componentRef} params={location.state} />
      )}
    </div>
  );
};
