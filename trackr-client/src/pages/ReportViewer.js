import React, { useState, useEffect, useRef, useContext } from "react";
import { useReactToPrint } from "react-to-print";
import { SalesReportToPrint } from "../reports/SalesReportToPrint"
import { HandheldReportToPrint } from "../reports/HandheldReportToPrint"
import {FaPrint } from "react-icons/fa";
export const ReportViewer = () => {
  const [isSalesReport, setIsSalesReport] = useState(false);
  const [isHandheldReport, setIsHandheldReport] = useState(false);  
  const componentRef = useRef();

  useEffect(() => {
    setIsSalesReport(localStorage.getItem("rptHeading")==="Sales Report New");
    setIsHandheldReport(localStorage.getItem("rptHeading")==="Handheld Report");
  }, []);


  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    bodyClass: "printElement1"
    
  });
  
  const back = ()=>
  {
    window.history.back();
  }
  return (
    
    <div>
      <center>
        <button onClick={handlePrint} style={{marginTop:'23px',marginLeft:'800px',color:'green'.length}}><FaPrint /></button>
        &nbsp;    &nbsp;    &nbsp;
        <button onClick={back} style={{marginTop:'23px',color:'red'}}>Back</button>
      </center>
      {isSalesReport && <SalesReportToPrint ref={componentRef} />}
      {isHandheldReport && <HandheldReportToPrint ref={componentRef} printableId='printme'/>}
     
    </div>
  );
};
