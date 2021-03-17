import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Moment from "moment";
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
  const contextType = useContext(AuthContext);
  const history = useHistory();
  const [data, setData] = useState([]);
  const [sales, setSales] = useState([]);
  const [hh, setHH] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [myFromDate, setMyFromDate] = useState("");
  const [myToDate, setMyToDate] = useState("");
  const [repType, setRepType] = useState("");
  const [repTitle, setRepTitle] = useState("");

  // general

  useEffect(() => {
    console.log("1st");
    setRepType(localStorage.getItem("reportType"));

    async function loadLists() {
      await loadWarehouses();
      await loadMaterial();
      await loadSubType();
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
    } else if (repType === "HHR") {
      setRepTitle("Handheld Report");
    }
    else{
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
  const salesReport = async () => {
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
    console.log("url:" + url);
    var Fdate = Moment.utc(fromDate).format("DD-MM-YYYY");
    var Tdate = Moment.utc(toDate).format("DD-MM-YYYY");
    // console.log("MYmoment:"+date);
    const getAllSales = async () => {
      try {
        console.log("getAllSales");
        // const response = await axios.get("http://localhost:5000/api/sales");
        const response = await axios.get(url);
        // console.log("resp: "+response.data.sales);
        console.log("resp1: " + response.data);

        setSales(response.data);
        generateSalesReportPDF(response.data, Fdate, Tdate);
      } catch (err) {
        console.log("error", +err);
      }
    };
    getAllSales();
    function myDate() {
      console.log("mydate:" + myFromDate);
    }
    myDate();
    window.GLOBAL_DATA = { value: 1 };

    // console.log( window.GLOBAL_DATA[value]);
  };

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
    // console.log("MYmoment:"+date);
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
    localStorage.setItem("rptHeading", "Sales Report New");
    localStorage.setItem("rptData", JSON.stringify(response.data));
    // contextType.rptData =response.data;
    history.push({
      pathname: "/ReportViewer",
    });
    // contextType.rptdata =response.data;
    // open Page2 => data= qs, heading="Sales Report"
  };

  const RunReport = async () => {
    console.log("run report");
    console.log("run REp Type:" + contextType.RepType);

    if (repType == "SR") {
      salesReportNew();
    } else if (repType == "HHR") {
      hhReport();
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

    setHH(response.data);
    // generateHandheldReportPDF(response.data, Fdate, Tdate);

    // contextType.rptheading="Handheld Report";
    localStorage.setItem("rptHeading", "Handheld Report");
    localStorage.setItem("rptData", JSON.stringify(response.data));
    // contextType.rptData =response.data;
    history.push({
      pathname: "/ReportViewer",
    });
    // console.log( window.GLOBAL_DATA[value]);
  };

  //////////////////////////////////////////////// Warehouses/////////////////////////////////////////////////////////////
  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const [selectedWarehouseOptions, setSelectedWarehouseOptions] = useState([]);
  const [selectedWarehouses, setSelectedWarehouse] = useState("");
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
    if (selectedWarehouseOptions != null) {
      let codes = selectedWarehouseOptions.map((whs) => {
        myCode = myCode + "|" + whs.value;
        console.log(myCode);
      });
      setSelectedWarehouse(myCode.substr(1));
    } else {
      setSelectedWarehouse("");
    }
  }, [selectedWarehouseOptions]);
  function handleWarehouseChange(event) {
    setSelectedWarehouseOptions(event);
  }
  //////////////////////////////////////////////// material//////////////////////////////////////////////////////////
  const [materialOptions, setMaterialOptions] = useState([]);
  const [selectedMaterialOptions, setSelectedMaterialOptions] = useState([]);
  const [selectedMaterials, setSelectedMaterial] = useState("");
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
    if (selectedMaterialOptions != null) {
      let codes = selectedMaterialOptions.map((mat) => {
        myCode = myCode + "|" + mat.value;
        console.log(myCode);
      });
      setSelectedMaterial(myCode.substr(1));
    } else {
      setSelectedMaterial("");
    }
  }, [selectedMaterialOptions]);
  function handleMaterialChange(event) {
    setSelectedMaterialOptions(event);
  }
  //////////////////////////////////////////subType////////////////////////////////////////////////////////////
  const [subtypeOptions, setSubTypeOptions] = useState([]);
  const [selectedSubTypeOptions, setSelectedSubTypeOptions] = useState([]);
  const [selectedSubTypes, setSelectedSubType] = useState("");
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
    if (selectedSubTypeOptions != null) {
      let codes = selectedSubTypeOptions.map((est) => {
        myCode = myCode + "|" + est.value;
        console.log(myCode);
      });
      setSelectedSubType(myCode.substr(1));
    } else {
      setSelectedSubType("");
    }
  }, [selectedSubTypeOptions]);
  function handleSubTypeChange(event) {
    setSelectedSubTypeOptions(event);
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
            <h4 style={{ paddingTop: "5px", fontSize: "20px" }}>
              {repTitle}
            </h4>
          </center>
        </div>
        <div
          className="container header detail scroll "
          style={{ borderRadius: "0px 0px 20px 20px" }}
        >
          <br></br>
          <div style={{ marginBottom: "120px" }}>
            <div>
              <div>
                <div style={{ display: "flex", marginBottom: "10px" }}>
                  <label className="label100 mlabel">Warehouse:</label>
                  <Select
                    className="width300"
                    value={selectedWarehouseOptions}
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
              {/* <input type="date" id="theDate"></input> */}
              <div className="rows">
                <div style={{ display: "flex", marginBottom: "10px" }}>
                  <label className="label100 mlabel">Material:</label>
                  <Select
                    className="width300"
                    value={selectedMaterialOptions}
                    onChange={handleMaterialChange}
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
            </div>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <label
                className="label100 mlabel"
                style={{ width: "120px", marginLeft: "50px" }}
              >
                Ent Subtype:
              </label>
              <Select
                className="width300"
                value={selectedSubTypeOptions}
                onChange={handleSubTypeChange}
                options={subtypeOptions}
                placeholder="None Selected"
                isMulti
                // components={{
                //   ValueContainer,
                // }}
                hideSelectedOptions={false}
              />
            </div>
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
            <div className="rows">
              <div style={{ display: "flex", marginBottom: "10px" }}>
                <label
                  className="label100 mlabel"
                  style={{ width: "120px", marginLeft: "50px" }}
                >
                  Last seen To:
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
              <div class="oneline">
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
            <div className="row">
              {
                // <button
                //   className="btn btn-primary"
                //   onClick={() => generateSalesReportPDF(sales)}
                // >Generate monthly report
                // </button>
              }
            </div>
          </div>
          {/* <SalesReportComponent sales={sales} /> */}
        </div>

        {/* <hr style=
          {{borderTop: '1px solid black',marginTop:'-5px'}}></hr> */}
      </React.Fragment>
    </div>
  );
};

export default ReportFilter;
