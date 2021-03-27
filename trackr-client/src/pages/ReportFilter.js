import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Moment from "moment";
import { SalesReportToPrint } from "../reports/SalesReportToPrint";
import { useHistory } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
// import generatePDF from "./services/SaleReportGenerator";
import {
  generateSalesReportPDF,
  generateHandheldReportPDF,
} from "../services/ReportGenerator";
// import ShowReport from "./ShowReport";
// import axios from "axios";
import { Alert } from "react-bootstrap";
import HashMap from "hashmap";
import { components } from "react-select";
import Select from "react-select";
import SalesReportComponent from "../report_templates/SalesReportComponent";
import { ReportViewer } from "./ReportViewer";
require("es6-promise").polyfill();
require("isomorphic-fetch");

const ReportFilter = () => {
  const [isSalesReport, setIsSalesReport] = useState(false);
  const [isStockReport, setIsStockReport] = useState(false);
  const [isHandheldReport, setIsHandheldReport] = useState(false);
  const contextType = useContext(AuthContext);
  const history = useHistory();
  const [data, setData] = useState([]);
  const [sales, setSales] = useState([]);
  const [stock, setStock] = useState([]);
  const [hh, setHH] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [myFromDate, setMyFromDate] = useState("");
  const [myToDate, setMyToDate] = useState("");
  const [repType, setRepType] = useState("");
  const [repTitle, setRepTitle] = useState("");
  // const [d, setD] = useState(true);
  // general
  useEffect(() => {
    console.log("1st");
    setRepType(localStorage.getItem("reportType"));
    async function loadLists() {
      await loadWarehouses();
      await loadMaterial();
      await loadSubType();
      await loadEntityStatus();
    }
    loadLists();
  }, []);
  useEffect(() => {
    console.log("2nd");
    async function setDefaultDate() {
      var date = new Date();
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      var today = year + "-" + month + "-" + day;
      await setFromDate(today + "T00:00:00.000Z");
      await setToDate(today + "T23:59:59.000Z");
      await setMyFromDate(today);
      setMyToDate(today);
    }
    setDefaultDate();
  }, []);
  useEffect(() => {
    showTitle();
  }, [repType]);
  function showTitle() {
    if (repType === "SR") {
      setRepTitle("Sales Report");
      setIsSalesReport(true);
    } else if (repType === "HHR") {
      setRepTitle("Handheld Report");
      setIsHandheldReport(true);
    } else if (repType === "CSR") {
      setRepTitle("Stock Report");
      console.log("yes this is stock");
      setIsStockReport(true);
    } else {
      setRepTitle("Unknown Report");
    }
  }
  function salesReportClicked() {
    // setButtonClicked("COUNT")
    // salesReport();
    salesReportNew();
  }
  function RunClicked() {
    // setButtonClicked("COUNT")
    // salesReport();
    console.log("runclicked");
    RunReport();
  }
  function hhReportClicked() {
    console.log("hhReportClicked");
    hhReport();
  }
  function updateToDate(e) {
    setToDate(e.target.value + "T23:59:59.000Z");
  }
  function updateFromDate(e) {
    setFromDate(e.target.value + "T00:00:00.000Z");
  }
  const salesReportNew = async () => {
    let qs = "";
    if (selectedMaterials.length > 0) {
      qs = qs + "&material=" + selectedMaterials;
    }
    if (fromDate) {
      qs = qs + "&fromDt=" + fromDate.trim();
    }
    if (toDate) {
      qs = qs + "&toDt=" + toDate.trim();
    }
    if (selectedSubTypes.length > 0) {
      qs = qs + "&subtype=" + selectedSubTypes;
    }
    if (selectedWarehouses.length > 0) {
      qs = qs + "&warehouse=" + selectedWarehouses;
    }
    const url = contextType.dbUrl + "sales/sale-report?" + qs.substr(1);
    console.log("newurl:" + url);
    var Fdate = Moment.utc(fromDate).format("DD-MM-YYYY");
    var Tdate = Moment.utc(toDate).format("DD-MM-YYYY");
    // console.log("MYmoment:"+date) z
    console.log("getAllSales");
    // const response = await axios.get("http://localhost:5000/api/sales");
    const response = await axios.get(url);
    // console.log("resp: "+response.data.sales);
    console.log("resp1: " + response.data);

    // setSales(response.data);
    console.log("mydata:", contextType.rptdata);
    // generateSalesReportPDF(response.data, Fdate, Tdate);

    // conbtext type
    // rptHeading
    // rptData
    // contextType.rptHeading="Sales Report";
    // localStorage.setItem("rptHeading", "Sales Report ");
    // localStorage.setItem("rptData", JSON.stringify(response.data));
    // contextType.rptData =response.data;
    history.push({
      pathname: "/ReportViewer",
      state: {
        rptData: response.data,
        rptHeading: "Sales Report",
        fromDt: Fdate,
        toDt: Tdate,
        warehouse: selectedWarehousesNames,
        material: selectedMaterialsName,
        subtype: selectedSubTypesName,
      },
    });
    // contextType.rptdata =response.data;
    // open Page2 => data= qs, heading="Sales Report"
  };

  const RunReport = async () => {
    console.log("run report");
    console.log("run REp Type:" + contextType.RepType);
    if (isSalesReport) {
      salesReportNew();
    } else if (isHandheldReport) {
      hhReport();
    } else if (isStockReport) {
      stockReport();
    }
  };

  const hhReport = async () => {
    let qs = "";
    if (fromDate) {
      qs = qs + "&fromDt=" + fromDate.trim();
    }
    if (toDate) {
      qs = qs + "&toDt=" + toDate.trim();
    }
    if (selectedWarehouses.length > 0) {
      qs = qs + "&warehouse=" + selectedWarehouses;
    }
    const url = contextType.dbUrl + "handheld/hh-report?" + qs.substr(1);
    // const url = contextType.dbUrl + "sales/sale-report?" + qs.substr(1);
    console.log("hh-report url:" + url);
    var Fdate = Moment.utc(fromDate).format("DD-MM-YYYY");
    var Tdate = Moment.utc(toDate).format("DD-MM-YYYY");
    // console.log("MYmoment:"+date);

    console.log("getAllHandheld");
    // const response = await axios.get("http://localhost:5000/api/sales");
    const response = await axios.get(url);
    // console.log("resp: "+response.data.sales);
    console.log("resp1: " + response.data);
    if (!response.data) {
      console.log("No Data received");
    }

    setHH(response.data);
    // generateHandheldReportPDF(response.data, Fdate, Tdate);

    // contextType.rptheading="Handheld Report";
    const params = {
      fromDate: fromDate.trim(),
      toDate: toDate.trim(),
    };
    localStorage.setItem("rptHeading", "Handheld Report");

    localStorage.setItem("rptData", JSON.stringify(response.data));
    localStorage.setItem("rptParams", JSON.stringify(params));
    // contextType.rptData =response.data;
    // console.log("WHx:"+selectedWarehouseOptions[0]);

    history.push({
      pathname: "/ReportViewer",
      state: {
        rptData: response.data,
        rptHeading: "Handheld Report",
        fromDt: Fdate,
        toDt: Tdate,
        warehouse: selectedWarehousesNames,
      },
    });
    // console.log( window.GLOBAL_DATA[value]);
  };

  const stockReport = async () => {
    let qs = "";
    if (selectedMaterials.length > 0) {
      qs = qs + "&material=" + selectedMaterials;
    }
    if (fromDate) {
      qs = qs + "&fromDt=" + fromDate.trim();
    }
    if (toDate) {
      qs = qs + "&toDt=" + toDate.trim();
    }
    if (selectedSubTypes.length > 0) {
      qs = qs + "&subtype=" + selectedSubTypes;
    }
    if (selectedWarehouses.length > 0) {
      qs = qs + "&warehouse=" + selectedWarehouses;
    }
    if (selectedEntityStatuses.length > 0) {
      qs = qs + "&status=" + selectedEntityStatuses;
    }

    const url = contextType.dbUrl + "reports/stocktest?" + qs.substr(1);
    console.log("newurl:" + url);
    var Fdate = Moment.utc(fromDate).format("DD-MM-YYYY");
    var Tdate = Moment.utc(toDate).format("DD-MM-YYYY");
    // console.log("MYmoment:"+date) z
    console.log("getAllstocks");
    // const response = await axios.get("http://localhost:5000/api/sales");
    const response = await axios.get(url);
    // console.log("resp: "+response.data.sales);
    console.log("resp1: " + response.data);

    // setSales(response.data);
    console.log("mydata:", contextType.rptdata);
    // generateSalesReportPDF(response.data, Fdate, Tdate);

    // conbtext type
    // rptHeading
    // rptData
    // contextType.rptHeading="Sales Report";
    // localStorage.setItem("rptHeading", "Sales Report ");
    // localStorage.setItem("rptData", JSON.stringify(response.data));
    // contextType.rptData =response.data;
    history.push({
      pathname: "/ReportViewer",
      state: {
        rptData: response.data,
        rptHeading: "Stock Report",
        fromDt: Fdate,
        toDt: Tdate,
        warehouse: selectedWarehousesNames,
        material: selectedMaterialsName,
        subtype: selectedSubTypesName,
        status: selectedStatusName,
      },
    });
    // contextType.rptdata =response.data;
    // open Page2 => data= qs, heading="Sales Report"
  };
  //////////////////////////////////////////////// Warehouses/////////////////////////////////////////////////////////////
  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const [selectedWarehouseOptions, setSelectedWarehouseOptions] = useState([]);
  const [selectedWarehouses, setSelectedWarehouse] = useState("");
  const [selectedWarehousesNames, setSelectedWarehouseNames] = useState("");
  const loadWarehouses = async () => {
    const result = await axios.get(contextType.dbUrl + "warehouse");
    let warehousesFromAPI = result.data.map((whs) => {
      return { value: whs.whs_code, label: whs.whs_name, id: whs._id };
    });
    console.log("Warehouse", +warehousesFromAPI);
    setWarehouseOptions(
      [{ id: "0", value: "", label: "" }].concat(warehousesFromAPI)
    );
  };

  useEffect(() => {
    let myCode = "";
    let myName = "";
    if (selectedWarehouseOptions != null) {
      let codes = selectedWarehouseOptions.map((whs) => {
        myCode = myCode + "|" + whs.value;
        myName = myName + "," + whs.label;
        console.log(myCode);
        console.log(myName);
      });
      setSelectedWarehouse(myCode.substr(1));
      setSelectedWarehouseNames(myName.substr(1));
    } else {
      setSelectedWarehouse("");
      setSelectedWarehouseNames("");
    }
  }, [selectedWarehouseOptions]);

  function handleWarehouseChange(event) {
    setSelectedWarehouseOptions(event);
  }
  //////////////////////////////////////////////// material//////////////////////////////////////////////////////////
  const [materialOptions, setMaterialOptions] = useState([]);
  const [selectedMaterialOptions, setSelectedMaterialOptions] = useState([]);
  const [selectedMaterials, setSelectedMaterial] = useState("");
  const [selectedMaterialsName, setSelectedMaterialsName] = useState("");
  const loadMaterial = async () => {
    const result = await axios.get(contextType.dbUrl + "material");
    let materialFromAPI = result.data.map((mat) => {
      return { value: mat.mat_code, label: mat.mat_name, id: mat._id };
    });
    console.log("Material", +materialFromAPI);
    setMaterialOptions(
      [{ id: "0", value: "", label: "" }].concat(materialFromAPI)
    );
  };
  useEffect(() => {
    let myCode = "";
    let myName = "";
    if (selectedMaterialOptions != null) {
      let codes = selectedMaterialOptions.map((mat) => {
        myCode = myCode + "|" + mat.value;
        myName = myName + "," + mat.label;
        console.log(myCode);
      });
      setSelectedMaterial(myCode.substr(1));
      setSelectedMaterialsName(myName.substr(1));
    } else {
      setSelectedMaterial("");
      setSelectedMaterialsName("");
    }
  }, [selectedMaterialOptions]);
  function handleMaterialChange(event) {
    setSelectedMaterialOptions(event);
  }
  //////////////////////////////////////////subType////////////////////////////////////////////////////////////
  const [subtypeOptions, setSubTypeOptions] = useState([]);
  const [selectedSubTypeOptions, setSelectedSubTypeOptions] = useState([]);
  const [selectedSubTypes, setSelectedSubType] = useState("");
  const [selectedSubTypesName, setSelectedSubTypeName] = useState("");
  const loadSubType = async () => {
    const result = await axios.get(contextType.dbUrl + "entitysubtype");
    let subtypeFromAPI = result.data.map((est) => {
      return { value: est.est_code, label: est.est_name, id: est._id };
    });
    setSubTypeOptions(
      [{ id: "0", value: "", label: "" }].concat(subtypeFromAPI)
    );
  };
  useEffect(() => {
    let myCode = "";
    let myName = "";
    if (selectedSubTypeOptions != null) {
      let codes = selectedSubTypeOptions.map((est) => {
        myCode = myCode + "|" + est.value;
        myName = myName + "," + est.label;
        console.log(myCode);
      });
      setSelectedSubType(myCode.substr(1));
      setSelectedSubTypeName(myName.substr(1));
    } else {
      setSelectedSubType("");
      setSelectedSubTypeName("");
    }
  }, [selectedSubTypeOptions]);
  function handleSubTypeChange(event) {
    setSelectedSubTypeOptions(event);
  }
  //////////////////////////////status//////////////////////////////////////////
  const [entityStatusOptions, setEntityStatusOptions] = useState([]);
  const [ selectedEntityStatusOptions, setSelectedEntityStatusOptions] = useState([]);
  const [selectedEntityStatuses, setSelectedEntityStatus] = useState("");
  const [selectedStatusName, setSelectedStatusName] = useState("");

  const loadEntityStatus = async () => {
    const result = await axios.get(contextType.dbUrl + "entitystatus");

    var map = new HashMap();
    let entitystatusFromAPI = result.data.map((sta) => {
      map.set(sta.sta_code, sta.sta_desc);
      return { value: sta.sta_code, label: sta.sta_desc, id: sta._id };
    });
    // setEntityStatusMap(map);
    setEntityStatusOptions(
      [{ id: "0", value: "", label: "" }].concat(entitystatusFromAPI)
    );
  };
  useEffect(() => {
    let myCode = "";
    let myName = "";
    if (selectedEntityStatusOptions != null) {
      let codes = selectedEntityStatusOptions.map((sta) => {
        myCode = myCode + "|" + sta.value;
        myName = myName + "," + sta.label;
        //console.log(myCode);
      });
      setSelectedEntityStatus(myCode.substr(1));
      setSelectedStatusName(myName.substr(1));
    } else {
      setSelectedEntityStatus("");
      setSelectedStatusName("");
    }
  }, [selectedEntityStatusOptions]);

  function handleEntityStatusChange(event) {
    setSelectedEntityStatusOptions(event);
  }

  ///////////////////////////////////////////entitytype//////////////////////////////////
  // render page
  return (
    <div>
      <React.Fragment>
        <div
          className="container header detail scroll"
          style={{
            height: "65px",
            marginBottom: "-35px",
            backgroundColor: "#34444c",
            color: "white",
            borderRadius: "20px 20px 0px 0px",
          }}
        >
          <center>
            <h4 style={{ paddingTop: "5px", fontSize: "20px" }}>{repTitle}</h4>
          </center>
        </div>
        <div
          className="container header detail scroll "
          style={{ borderRadius: "0px 0px 20px 20px" }}
        >
          <br></br>
          <div style={{ marginBottom: "120px" }}>
          <div>
              {!isHandheldReport && !isStockReport&& (<div style={{ display: "flex", marginBottom: "10px" }}>
                  <label className="label100 mlabel">Warehouse:</label>
                  <Select
                    className="width300"
                    value={selectedWarehouseOptions}
                    // isDisabled={isHandheldReport ? true : false}
                    onChange={handleWarehouseChange}
                    options={warehouseOptions}
                    placeholder="None Selected"
                    isMulti
                    // components={{
                    //   ValueContainer,
                    // }}
                    hideSelectedOptions={false}
                  />
                </div>
              )}
              </div>
          
               {!isHandheldReport && !isSalesReport && (
              <div className="rows">
                <div style={{ display: "flex", marginBottom: "10px" }}>
                  <label className="label100 mlabel">Warehouse:</label>
                  <Select
                    className="width300"
                    value={selectedWarehouseOptions}
                    // isDisabled={isHandheldReport ? true : false}
                    onChange={handleWarehouseChange}
                    options={warehouseOptions}
                    placeholder="None Selected"
                    isMulti
                    // components={{
                    //   ValueContainer,
                    // }}
                    hideSelectedOptions={false}
                  />
                </div>
              </div>
             )}
             {!isHandheldReport && !isSalesReport &&(
              <div style={{ display: "flex", marginBottom: "10px" }}>
              <label
                className=" report-label"
                // style={{ width: "120px", marginLeft: "50px" }}
              >
                Status:
              </label>
              <Select
                    className="width300"
                    value={selectedEntityStatusOptions}
                    onChange={handleEntityStatusChange}
                    options={entityStatusOptions}
                    // isDisabled={isHandheldReport ? true : false}
                    placeholder="None Selected"
                    isMulti
                    // components={{
                    //   ValueContainer,
                    // }}
                    hideSelectedOptions={false}
                  />
            </div>
             )}
             {!isHandheldReport && (
              <div className="rows">
                <div style={{ display: "flex", marginBottom: "10px" }}>
                  <label className="label100 mlabel">Material:</label>
                  <Select
                    className="width300"
                    value={selectedMaterialOptions}
                    onChange={handleMaterialChange}
                    // isDisabled={isHandheldReport ? true : false}
                    options={materialOptions}
                    placeholder="None Selected"
                    isMulti
                    // components={{
                    //   ValueContainer,
                    // }}
                    hideSelectedOptions={false}
                  />
                </div>
              </div>
             )}
             {!isHandheldReport && (
              <div style={{ display: "flex", marginBottom: "10px" }}>
              <label
                className=" report-label"
                // style={{ width: "120px", marginLeft: "50px" }}
              >
                Subtype:
              </label>
              <Select
                className="width300"
                value={selectedSubTypeOptions}
                onChange={handleSubTypeChange}
                options={subtypeOptions}
                // isDisabled={isHandheldReport ? true : false}
                placeholder="None Selected"
                isMulti
                // components={{
                //   ValueContainer,
                // }}
                hideSelectedOptions={false}
              />
            </div>
             )}
              {!isStockReport && (
            <div style={{}}>
              <div className="rows">
                <div style={{ display: "flex", marginBottom: "10px" }}>
                  <label className="label100 mlabel"> From:</label>
                  <input
                    type="date"
                    id="theDate"
                    style={{ border: "none", borderRadius: "2px" }}
                    className="width300"
                    defaultValue={myFromDate}
                    onChange={updateFromDate}
                    //  value={fromDate}
                    required
                  />
                </div>
              </div>
            </div>
              )}
               {!isStockReport && (
            <div className="rows">
              <div style={{ display: "flex", marginBottom: "10px" }}>
                <label
                  className="report-label"
                  // style={{ width: "120px", marginLeft: "50px" }}
                >
                  To:
                </label>
                <input
                  type="date"
                  // id="theDate1"
                  style={{ border: "none", borderRadius: "2px" }}
                  className="width300"
                  // value={toDate}
                  defaultValue={myToDate}
                  onChange={updateToDate}
                  required
                />
              </div>
            </div>
               )}
            {/* <div style={{marginLeft:'190px'}}>
                <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "110px", height: "35px", marginLeft: "250px" }}
            onClick={updateCountClicked}
          >
          Refresh
          </button>
        </div> */}
            <center>
              <div className="oneline">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "110px", height: "35px" }}
                  onClick={RunClicked}
                >
                  Run Report
                </button>
              </div>
            </center>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
};

export default ReportFilter;
