import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { Alert } from "react-bootstrap";
import HashMap from "hashmap";
import { components } from "react-select";
import ReactToExcel from "react-html-table-to-excel";
import { addActionGroup, updateActionGroup } from "../actions/auth";

import Select from "react-select";

require("es6-promise").polyfill();
require("isomorphic-fetch");

const Search = () => {
  let history = useHistory();
  const contextType = useContext(AuthContext);

  const [msg, setMsg] = useState("");
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [serial, setSerial] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [custCode, setCustCode] = useState("");
  const [name, setName] = useState("");
  const [settimeout] = useState("");
  const [entityCount, setEntityCount] = useState("");
  const [entitylabel, setEntitylabel] = useState("Record(s): 0");
  const [enabled, setEnabled] = useState(0);
  const [buttonText, setButtonText] = useState("");
  const [editActionGroup, setEditActionGroup] = useState(false);
  const [buttonClicked, setButtonClicked] = useState("");
  const [variant, setVariant] = useState();
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");
  const [users, setUser] = useState([]);

  const [Entity, setEntity] = useState([]);
  const [EntitySubTypeMap, setEntitySubTypeMap] = useState(new HashMap());
  const [EntityStatusMap, setEntityStatusMap] = useState(new HashMap());
  const [LocationMap, setLocationMap] = useState(new HashMap());

  const input = (e) => {
    const data = e.target.value;
    console.log(data);
    setQ(data);
  };

  useEffect(() => {
    fetch(contextType.dbUrl + "search")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  useEffect(() => {
    console.log("ToDate:" + toDate);
  }, [toDate]);

  function search(rows) {
    return rows.filter(
      (row) =>
        row.act_material.toString().toLowerCase().indexOf(q) > -1 ||
        row.act_code.toString().toLowerCase().indexOf(q) > -1 ||
        row.act_name.toString().toLowerCase().indexOf(q) > -1
    );
  }

  const loadEntity = async () => {
    const result = await axios.get(contextType.dbUrl + "entity");
    setEntity(result.data);
  };

  const updateCount = () => {
    let qs = " ";
    let count = 0;
    if (code.length > 0) {
      qs = qs + "&entitycode=" + code.trim();
    }
    if (serial.length > 0) {
      qs = qs + "&serial=" + serial.trim();
    }

    if (fromDate) {
      qs = qs + "&fromDt=" + fromDate.trim();
    }
    if (toDate) {
      qs = qs + "&toDt=" + toDate.trim();
    }
    if (custCode.length > 0) {
      qs = qs + "&custcode=" + custCode.trim();
    }
    if (selectedMaterials.length > 0) {
      qs = qs + "&material=" + selectedMaterials;
    }
    if (selectedEntityTypes.length > 0) {
      qs = qs + "&entitytype=" + selectedEntityTypes;
    }

    if (selectedEntitySubTypes.length > 0) {
      qs = qs + "&subtype=" + selectedEntitySubTypes;
    }

    if (selectedLocations.length > 0) {
      qs = qs + "&location=" + selectedLocations;
    }

    if (selectedEntityStatuses.length > 0) {
      qs = qs + "&status=" + selectedEntityStatuses;
    }

    console.log("QueryString " + qs.substr(1));

    const url = "/api/actiongroup/find?" + qs.substr(1);
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        count = data.length;
        setEntityCount(count);
        setEntitylabel("Record(s): " + count);
        setEntity(data);
      })
      .catch((err) => {
        setEntityCount("");
        setEntitylabel("");
      });
  };

  // general
  useEffect(() => {
    if (contextType.currentMsg) {
      setMsg(contextType.currentMsg);
      setVariant(contextType.currentVariant);
      contextType.setCurrentMsg("");
      contextType.setCurrentVariant();
    } else {
      setMsg("");
      setVariant(null);
    }

    const actionGroupCode = contextType.currentObject
      ? contextType.currentObject
      : "";

    async function loadLists() {
      await loadMaterial();
      await loadEntityTypes();
      await loadEntitySubTypes();
      await loadWarehouses();
      await loadLocationAreas();
      await loadLocation();
      await loadEntityStatus();
      setEditActionGroup(actionGroupCode ? true : false);
    }
    loadLists();

    const timer = setTimeout(() => {
      setMsg("");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    console.log("editActionGroup after:" + editActionGroup);
    if (editActionGroup) {
      console.log("editable");
      // this.myRefs[1].focus();
      setTitle("Edit Action Group");
      setButtonText("Update");

      const actionGroupCode = contextType.currentObject;
      const url = "/api/actiongroup/" + actionGroupCode;

      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then(async (data) => {
          setCode(data.act_code);

          setName(data.act_name);
          setEnabled(data.act_enabled);
          setEntityCount(data.act_entity_count);
          await loadSelectedEntitySubTypes(data.act_entity_subtype);
          await loadSelectedEntityTypes(data.act_entity_type);
          await loadSelectedEntityStatuses(data.act_status);
          await loadSelectedMaterials(data.act_material);
          await loadSelectedLocations(data.act_location);
          await loadSelectedLocationAreas(data.act_location_area);
          await loadSelectedWarehouses(data.act_warehouse);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // this.myRefs[0].focus();
      console.log("new action group");
      setTitle("Search Entity");
      setButtonText("Add");
    }
  }, [editActionGroup]);

  function onChange(e) {
    if (e.target.name === "code") {
      setCode(e.target.value.toUpperCase());
    } else {
      setName(e.target.value);
    }
  }
  function onChange1(e) {
    if (e.target.name === "extcode") {
      setCustCode(e.target.value.toUpperCase());
    } else {
      setName(e.target.value);
    }
  }

  function onChange2(e) {
    setSerial(e.target.value);
  }

  function updateToDate(e) {
    setToDate(e.target.value + "T23:59:59.000Z");
  }

  function updateFromDate(e) {
    setFromDate(e.target.value + "T00:00:00.000Z");
  }

  function resetForm() {
    setName("");
    setEntityCount(data);
    setButtonClicked("");
  }

  function handleBack() {
    history.goBack();
  }

  function updateCountClicked() {
    // setButtonClicked("COUNT");
    // updateCount();
    // loadEntity();
    updateCount();
  }

  const submit = (e) => {
    e.preventDefault();
    // console.log("submit " + selectedLocations);
    // setButtonClicked("UPDATE");
    // updateCount();

    console.log("updating");
    const newActionGroup = {
      code,
      name,
      material: selectedMaterials,
      entitytype: selectedEntityTypes,
      entitysubtype: selectedEntitySubTypes,
      warehouse: selectedWarehouses,
      locationarea: selectedLocationAreas,
      location: selectedLocations,
      status: selectedEntityStatuses,
      enabled,
      entitycount: entityCount,
    };

    if (editActionGroup) {
      console.log("in edit Group");

      updateActionGroup(newActionGroup, (res) => {
        if (res.data.success) {
          setMsg(res.data.msg);
          setVariant("success");
          handleBack();
          settimeout(() => setMsg(""), 2000);
          resetForm();
        } else {
          setMsg(res.data.msg);
          setVariant("danger");
          setTimeout(() => setMsg(""), 2000);
        }
      });
    } else {
      // Register
      addActionGroup(newActionGroup, (res) => {
        if (res.data.success) {
          setMsg(res.data.msg);
          setVariant("success");
          handleBack();
          settimeout(() => setMsg(""), 2000);
          resetForm();
        } else {
          setMsg(res.data.msg);
          setVariant("danger");
          setTimeout(() => setMsg(""), 2000);
        }
      });
    }
  };

  //
  const ValueContainer = ({ children, getValue, ...props }) => {
    var values = getValue();
    var valueLabel = "";

    if (values.length > 0)
      valueLabel += props.selectProps.getOptionLabel(values[0]);
    if (values.length > 1) valueLabel += ` & ${values.length - 1}`;

    // Keep standard placeholder and input from react-select
    var childsToRender = React.Children.toArray(children).filter(
      (child) =>
        ["Input", "DummyInput", "Placeholder"].indexOf(child.type.name) >= 0
    );

    return (
      <components.ValueContainer {...props}>
        {!props.selectProps.inputValue && valueLabel}
        {childsToRender}
      </components.ValueContainer>
    );
  };

  // entity subtypes
  const [entitySubTypeOptions, setEntitySubTypeOptions] = useState([]);
  const [
    selectedEntitySubTypeOptions,
    setSelectedEntitySubTypeOptions,
  ] = useState([]);
  const [selectedEntitySubTypes, setSelectedEntitySubTypes] = useState("");

  const loadEntitySubTypes = async () => {
    const result = await axios.get(contextType.dbUrl + "entitysubtype");

    var map = new HashMap();
    let entitysubtypesFromAPI = result.data.map((etsub) => {
      map.set(etsub.est_code, etsub.est_name);
      return { value: etsub.est_code, label: etsub.est_name, id: etsub._id };
    });
    setEntitySubTypeMap(map);
    setEntitySubTypeOptions(
      [{ id: "0", value: "", label: "" }].concat(entitysubtypesFromAPI)
    );
  };

  useEffect(() => {
    let myCode = "";
    if (selectedEntitySubTypeOptions != null) {
      let codes = selectedEntitySubTypeOptions.map((etsub) => {
        myCode = myCode + "|" + etsub.value;
        //console.log(myCode);
      });
      setSelectedEntitySubTypes(myCode.substr(1));
    } else {
      setSelectedEntitySubTypes("");
    }
  }, [selectedEntitySubTypeOptions]);

  function handleEntitySubTypeChange(event) {
    setSelectedEntitySubTypeOptions(event);
  }

  const loadSelectedEntitySubTypes = async (selValues) => {
    console.log("loadSelectedEntitySubTypes:" + selValues);
    if (selValues.trim().length == 0) return;
    //let selValues = "12|13";
    let selArray = selValues.split("|");
    console.log("SelArray: " + selArray);
    let selectedValues = [];
    console.log("EntitySubTypeOptions: " + entitySubTypeOptions);

    entitySubTypeOptions.map((etsub) => {
      if (selArray.includes(etsub.value + "")) {
        // console.log(etsub.value + " Code found !");
        selectedValues.push({
          value: etsub.value,
          label: etsub.label,
          id: etsub.id,
        });
      } else {
        // console.log(etsub.value + " Code not found !");
      }
      //return { value: etsub.est_code, label: etsub.est_name, id: etsub._id };
    });
    console.log("Selected values: " + selectedValues);
    setSelectedEntitySubTypeOptions(selectedValues);
  };

  // entity types
  const [entityTypeOptions, setEntityTypeOptions] = useState([]);
  const [selectedEntityTypeOptions, setSelectedEntityTypeOptions] = useState(
    []
  );
  const [selectedEntityTypes, setSelectedEntityTypes] = useState("");

  const loadEntityTypes = async () => {
    const result = await axios.get(contextType.dbUrl + "entitytype");

    let entitytypesFromAPI = result.data.map((ett) => {
      return { value: ett.ett_code, label: ett.ett_name, id: ett._id };
    });
    setEntityTypeOptions(
      [{ id: "0", value: "", label: "" }].concat(entitytypesFromAPI)
    );
  };

  useEffect(() => {
    let myCode = "";
    if (selectedEntityTypeOptions != null) {
      let codes = selectedEntityTypeOptions.map((ett) => {
        myCode = myCode + "|" + ett.value;
        //console.log(myCode);
      });
      setSelectedEntityTypes(myCode.substr(1));
    } else {
      setSelectedEntityTypes("");
    }
  }, [selectedEntityTypeOptions]);

  function handleEntityTypeChange(event) {
    setSelectedEntityTypeOptions(event);
  }

  const loadSelectedEntityTypes = async (selValues) => {
    console.log("loadSelectedEntityTypes:" + selValues);
    if (selValues.trim().length == 0) return;
    let selArray = selValues.split("|");
    console.log("SelArray: " + selArray);
    let selectedValues = [];
    console.log("EntityTypeOptions: " + entityTypeOptions);

    entityTypeOptions.map((ett) => {
      if (selArray.includes(ett.value + "")) {
        selectedValues.push({
          value: ett.value,
          label: ett.label,
          id: ett.id,
        });
      } else {
        // console.log(etsub.value + " Code not found !");
      }
      //return { value: etsub.est_code, label: etsub.est_name, id: etsub._id };
    });
    console.log("Selected values: " + selectedValues);
    setSelectedEntityTypeOptions(selectedValues);
  };

  // Warehouses
  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const [selectedWarehouseOptions, setSelectedWarehouseOptions] = useState([]);
  const [selectedWarehouses, setSelectedWarehouses] = useState("");

  const loadWarehouses = async () => {
    const result = await axios.get(contextType.dbUrl + "warehouse");

    let warehousesFromAPI = result.data.map((lat) => {
      return { value: lat.lat_code, label: lat.lat_name, id: lat._id };
    });
    setWarehouseOptions(
      [{ id: "0", value: "", label: "" }].concat(warehousesFromAPI)
    );
  };

  useEffect(() => {
    let myCode = "";
    if (selectedWarehouseOptions != null) {
      let codes = selectedWarehouseOptions.map((lat) => {
        myCode = myCode + "|" + lat.value;
        //console.log(myCode);
      });
      setSelectedWarehouses(myCode.substr(1));
    } else {
      setSelectedWarehouses("");
    }
  }, [selectedWarehouseOptions]);

  function handleWarehouseChange(event) {
    setSelectedWarehouseOptions(event);
  }

  const loadSelectedWarehouses = async (selValues) => {
    console.log("loadSelectedWarehouses:" + selValues);
    if (selValues.trim().length == 0) return;
    let selArray = selValues.split("|");
    console.log("SelArray: " + selArray);
    let selectedValues = [];
    console.log("WarehouseOptions: " + warehouseOptions);

    warehouseOptions.map((lct) => {
      if (selArray.includes(lct.value + "")) {
        selectedValues.push({
          value: lct.value,
          label: lct.label,
          id: lct.id,
        });
      } else {
        // console.log(etsub.value + " Code not found !");
      }
      //return { value: etsub.est_code, label: etsub.est_name, id: etsub._id };
    });
    console.log("Selected values: " + selectedValues);
    setSelectedWarehouseOptions(selectedValues);
  };

  //location Area
  const [locationAreaOptions, setLocationAreaOptions] = useState([]);
  const [
    selectedLocationAreaOptions,
    setSelectedLocationAreaOptions,
  ] = useState([]);
  const [selectedLocationAreas, setSelectedLocationAreas] = useState("");

  const loadLocationAreas = async () => {
    const result = await axios.get(contextType.dbUrl + "locationarea");

    let locationareasFromAPI = result.data.map((lar) => {
      return { value: lar.lar_code, label: lar.lar_name, id: lar._id };
    });
    setLocationAreaOptions(
      [{ id: "0", value: "", label: "" }].concat(locationareasFromAPI)
    );
  };

  useEffect(() => {
    let myCode = "";
    if (selectedLocationAreaOptions != null) {
      let codes = selectedLocationAreaOptions.map((lar) => {
        myCode = myCode + "|" + lar.value;
        console.log(myCode);
      });
      setSelectedLocationAreas(myCode.substr(1));
    } else {
      setSelectedLocationAreas("");
    }
  }, [selectedLocationAreaOptions]);

  function handleLocationAreaChange(event) {
    setSelectedLocationAreaOptions(event);
  }

  const loadSelectedLocationAreas = async (selValues) => {
    console.log("loadSelectedLocationAreas:" + selValues);
    if (selValues.trim().length == 0) return;
    let selArray = selValues.split("|");
    console.log("SelArray: " + selArray);
    let selectedValues = [];
    console.log("LocationAreaOptions: " + locationAreaOptions);

    locationAreaOptions.map((lar) => {
      if (selArray.includes(lar.value + "")) {
        selectedValues.push({
          value: lar.value,
          label: lar.label,
          id: lar.id,
        });
      } else {
        // console.log(etsub.value + " Code not found !");
      }
      //return { value: etsub.est_code, label: etsub.est_name, id: etsub._id };
    });
    console.log("Selected values: " + selectedValues);
    setSelectedLocationAreaOptions(selectedValues);
  };

  //Location
  const [locationOptions, setLocationOptions] = useState([]);
  const [selectedLocationOptions, setSelectedLocationOptions] = useState([]);
  const [selectedLocations, setSelectedLocation] = useState("");

  const loadLocation = async () => {
    const result = await axios.get(contextType.dbUrl + "location");

    var map = new HashMap();
    let locationFromAPI = result.data.map((loc) => {
      map.set(loc.loc_code, loc.loc_name);
      return { value: loc.loc_code, label: loc.loc_name, id: loc._id };
    });
    setLocationMap(map);
    setLocationOptions(
      [{ id: "0", value: "", label: "" }].concat(locationFromAPI)
    );
  };

  useEffect(() => {
    let myCode = "";
    if (selectedLocationOptions != null) {
      let codes = selectedLocationOptions.map((loc) => {
        myCode = myCode + "|" + loc.value;
        //console.log(myCode);
      });
      // console.log("selectedLocations: "+myCode);
      setSelectedLocation(myCode.substr(1));
    } else {
      setSelectedLocation("");
    }
  }, [selectedLocationOptions]);

  function handleLocationChange(event) {
    setSelectedLocationOptions(event);
  }

  const loadSelectedLocations = async (selValues) => {
    console.log("loadSelectedLocations:" + selValues);
    if (selValues.trim().length == 0) return;
    let selArray = selValues.split("|");
    console.log("SelArray: " + selArray);
    let selectedValues = [];
    console.log("LocationOptions: " + locationOptions);

    locationOptions.map((loc) => {
      if (selArray.includes(loc.value + "")) {
        selectedValues.push({
          value: loc.value,
          label: loc.label,
          id: loc.id,
        });
      } else {
      }
    });
    console.log("Selected values: " + selectedValues);
    setSelectedLocationOptions(selectedValues);
  };

  //entity status
  const [entityStatusOptions, setEntityStatusOptions] = useState([]);
  const [
    selectedEntityStatusOptions,
    setSelectedEntityStatusOptions,
  ] = useState([]);
  const [selectedEntityStatuses, setSelectedEntityStatus] = useState("");

  const loadEntityStatus = async () => {
    const result = await axios.get(contextType.dbUrl + "entitystatus");

    var map = new HashMap();
    let entitystatusFromAPI = result.data.map((sta) => {
      map.set(sta.sta_code, sta.sta_desc);
      return { value: sta.sta_code, label: sta.sta_desc, id: sta._id };
    });
    setEntityStatusMap(map);
    setEntityStatusOptions(
      [{ id: "0", value: "", label: "" }].concat(entitystatusFromAPI)
    );
  };

  useEffect(() => {
    let myCode = "";
    if (selectedEntityStatusOptions != null) {
      let codes = selectedEntityStatusOptions.map((sta) => {
        myCode = myCode + "|" + sta.value;
        //console.log(myCode);
      });
      setSelectedEntityStatus(myCode.substr(1));
    } else {
      setSelectedEntityStatus("");
    }
  }, [selectedEntityStatusOptions]);

  function handleEntityStatusChange(event) {
    setSelectedEntityStatusOptions(event);
  }

  const loadSelectedEntityStatuses = async (selValues) => {
    console.log("loadSelectedEntityStatuses:" + selValues);
    if (selValues.trim().length == 0) return;
    let selArray = selValues.split("|");
    console.log("SelArray: " + selArray);
    let selectedValues = [];
    console.log("EntityStatusOptions: " + entityStatusOptions);

    entityStatusOptions.map((est) => {
      if (selArray.includes(est.value + "")) {
        selectedValues.push({
          value: est.value,
          label: est.label,
          id: est.id,
        });
      } else {
        // console.log(etsub.value + " Code not found !");
      }
      //return { value: etsub.est_code, label: etsub.est_name, id: etsub._id };
    });
    console.log("Selected values: " + selectedValues);
    setSelectedEntityStatusOptions(selectedValues);
  };

  //material
  const [materialOptions, setMaterialOptions] = useState([]);
  const [selectedMaterialOptions, setSelectedMaterialOptions] = useState([]);
  const [selectedMaterials, setSelectedMaterial] = useState("");

  const loadMaterial = async () => {
    const result = await axios.get(contextType.dbUrl + "material");

    let materialFromAPI = result.data.map((mat) => {
      return { value: mat.mat_code, label: mat.mat_name, id: mat._id };
    });
    console.log(materialFromAPI);
    setMaterialOptions(
      [{ id: "0", value: "", label: "" }].concat(materialFromAPI)
    );
  };

  useEffect(() => {
    let myCode = "";
    console.log("useEffect -01");
    if (selectedMaterialOptions != null) {
      let codes = selectedMaterialOptions.map((mat) => {
        myCode = myCode + "|" + mat.value;
        console.log(mat);
      });
      setSelectedMaterial(myCode.substr(1));
      console.log("not null");
    } else {
      setSelectedMaterial("");
      console.log("null");
    }
  }, [selectedMaterialOptions]);

  function handleMaterialChange(event) {
    setSelectedMaterialOptions(event);
  }

  const loadSelectedMaterials = async (selValues) => {
    console.log("loadSelectedMaterials:" + selValues);
    if (selValues.trim().length == 0) return;
    let selArray = selValues.split("|");
    console.log("SelArray: " + selArray);
    let selectedValues = [];
    console.log("MaterialOptions: " + materialOptions);

    materialOptions.map((mat) => {
      if (selArray.includes(mat.value + "")) {
        selectedValues.push({
          value: mat.value,
          label: mat.label,
          id: mat.id,
        });
      } else {
        // console.log(etsub.value + " Code not found !");
      }
      //return { value: etsub.est_code, label: etsub.est_name, id: etsub._id };
    });
    console.log("Selected values: " + selectedValues);
    setSelectedMaterialOptions(selectedValues);
  };

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
            <h4 style={{ paddingTop: "5px", fontSize: "20px" }}>{title}</h4>
          </center>
        </div>
        {msg ? <Alert variant={variant}>{msg}</Alert> : null}

        <div
          className="container header detail scroll "
          style={{ borderRadius: "0px 0px 20px 20px" }}
        >
          <br></br>
          {/* <div className="rows">
              <div className="form-group ">
          
          <label className="label100" >Code:</label>
          <span className="myspan ">
                          <div className="form__div ">
            <input
              type="text"
              name="code"
              value={code}
              className="detail__input textsmall"
              onChange={onChange}
              required
             
            />
            
            </div>
            </span>
            </div>
           </div>
           <div >
                <div className="form-group ">
          
          <label className="label100" style={{marginLeft:'240px'}}>CustCode:</label>
          <span className="myspan ">
                          <div className="form__div ">
            <input
              type="text"
              name="code"
              value={code}
              className="detail__input textsmall"
              onChange={onChange}
              required 
            />
            
            </div>
            </span>
            </div>
             </div> */}
          {/* <div className="rows">
    <div style={{ display: "flex", marginBottom:'10px' }}>
            
            <label className="label100">Material:</label>

            <Select
              className="select"
              value={selectedMaterialOptions}
              onChange={handleMaterialChange}
              options={materialOptions}
              placeholder="None Selected"
              isMulti
            />
          </div>
  </div>
    <div style={{ display: "flex" , marginBottom:'10px'}}>
          
            <label className="label100" >Entity Types:</label>

            <Select
              className="select"
              value={selectedEntityTypeOptions}
              onChange={handleEntityTypeChange}
              options={entityTypeOptions}
              placeholder="None Selected"
              isMulti
            />
          </div> */}
          <div>
            <div style={{ marginBottom: "5px" }}>
              <div className="rows">
                <div>
                  <div style={{ display: "flex", marginBottom: "10px" }}>
                    <label className="label100 mlabel">Material:</label>

                    <Select
                      className="selectnew"
                      value={selectedMaterialOptions}
                      onChange={handleMaterialChange}
                      options={materialOptions}
                      placeholder="None Selected"
                      isMulti
                      components={{
                        ValueContainer,
                      }}
                      hideSelectedOptions={false}
                    />
                  </div>
                </div>
              </div>

              <div className="rows">
                <div style={{ display: "flex", marginBottom: "10px" }}>
                  <label className="label100 mlabel">Entity Status:</label>

                  <Select
                    className="selectnew"
                    value={selectedEntityStatusOptions}
                    onChange={handleEntityStatusChange}
                    options={entityStatusOptions}
                    placeholder="None Selected"
                    isMulti
                    components={{
                      ValueContainer,
                    }}
                    hideSelectedOptions={false}
                  />
                </div>
              </div>

              <div className="form-group  ">
                <label className="label100 mlabel" style={{ width: "85px" }}>
                  Code:
                </label>
                <span className="myspan ">
                  <div className="form__div ">
                    <input
                      type="text"
                      name="code"
                      value={code}
                      className="textsmallnew"
                      onChange={onChange}
                      required
                      placeholder="Code"
                    />
                  </div>
                </span>
              </div>
            </div>
            <div style={{ marginBottom: "5px" }}>
              <div className="rows">
                <div>
                  <div style={{ display: "flex", marginBottom: "10px" }}>
                    <label className="label100 mlabel">Loc Area:</label>

                    <Select
                      className="selectnew"
                      value={selectedLocationAreaOptions}
                      onChange={handleLocationAreaChange}
                      options={locationAreaOptions}
                      placeholder="None Selected"
                      isMulti
                      components={{
                        ValueContainer,
                      }}
                      hideSelectedOptions={false}
                    />
                  </div>
                </div>
              </div>

              <div className="rows">
                <div style={{ display: "flex", marginBottom: "10px" }}>
                  <label className="label100 mlabel">Location:</label>

                  <Select
                    className="selectnew"
                    value={selectedLocationOptions}
                    onChange={handleLocationChange}
                    options={locationOptions}
                    placeholder="None Selected"
                    isMulti
                    components={{
                      ValueContainer,
                    }}
                    hideSelectedOptions={false}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="label100 mlabel" style={{ width: "86px" }}>
                  CustCode:
                </label>
                <span className="myspan ">
                  <div className="form__div ">
                    <input
                      type="text"
                      name="extcode"
                      value={custCode}
                      className=" textsmallnew"
                      onChange={onChange1}
                      required
                      placeholder="Cust Code"
                    />
                  </div>
                </span>
              </div>
            </div>
            <div style={{ marginBottom: "5px" }}>
              <div className="rows">
                <div style={{ display: "flex", marginBottom: "10px" }}>
                  <label className="label100 mlabel">Entity Types:</label>

                  <Select
                    className="selectnew"
                    value={selectedEntityTypeOptions}
                    onChange={handleEntityTypeChange}
                    options={entityTypeOptions}
                    placeholder="None Selected"
                    isMulti
                    components={{
                      ValueContainer,
                    }}
                    hideSelectedOptions={false}
                  />
                </div>
              </div>

              <div className="rows">
                <div style={{ display: "flex", marginBottom: "10px" }}>
                  <label className="label100 mlabel">Ent subtype:</label>

                  <Select
                    className="selectnew"
                    value={selectedEntitySubTypeOptions}
                    onChange={handleEntitySubTypeChange}
                    options={entitySubTypeOptions}
                    placeholder="None Selected"
                    isMulti
                    components={{
                      ValueContainer,
                    }}
                    hideSelectedOptions={false}
                  />
                </div>
              </div>

              <div className="form-group ">
                <label className="label100 mlabel" style={{ width: "86px" }}>
                  Serial:
                </label>
                <span className="myspan ">
                  <div className="form__div ">
                    <input
                      type="text"
                      name="serial"
                      value={serial}
                      className=" textsmallnew"
                      onChange={onChange2}
                      required
                      placeholder="serial"
                    />
                  </div>
                </span>
              </div>
            </div>
            <div style={{}}>
              <div className="rows">
                <div style={{ display: "flex", marginBottom: "10px" }}>
                  <label className="label100 mlabel"> From:</label>

                  <input
                    type="date"
                    style={{ border: "none", borderRadius: "2px" }}
                    className="selectnew"
                    onChange={updateFromDate}
                    //  value={fromDate}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="rows">
              <div style={{ display: "flex", marginBottom: "10px" }}>
                <label className="label100 mlabel">Last seen To:</label>

                <input
                  type="date"
                  style={{ border: "none", borderRadius: "2px" }}
                  className="selectnew"
                  // value={toDate}
                  onChange={updateToDate}
                  required
                />
              </div>
            </div>
            <div className="">
              <label className="label100 mlabel" style={{ width: "86px" }}>
                Warehouse:
              </label>
              <span className="myspan ">
                <div className="form__div ">
                  <input
                    type="text"
                    name="extcode"
                    value={custCode}
                    className=" textsmallnew"
                    onChange={onChange1}
                    required
                    placeholder="Cust Code"
                  />
                </div>
              </span>
            </div>

            {/* <div className="form-group ">
            <label className="label100 mlabel" style={{width:'80px'}}>Enabled:</label>
            <input
              type="checkbox"
              name="enabled"
              class="largerCheckbox"
              style={{marginTop:'9px'}}
              // type={!editActionGroup ? "hidden" : "text"}
              checked={enabled}
              // ref={(el) => (this.myRefs[2] = el)}
              onChange={(event) => {
                setEnabled(event.target.checked);
              }}
            ></input>
          </div> */}

            {/*  */}

            <div></div>
          </div>
          {/* <center>
          <h4 style={{ paddingTop: "5px", fontSize: "20px" }}>
              {title}
              </h4>

            <hr></hr>
          </center> */}
          <center>
            <div class="oneline">
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "110px", height: "35px" }}
                onClick={updateCountClicked}
              >
                Refresh
              </button>
            </div>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            {/* <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "110px", height: "35px" }}
            onClick={updateCountClicked}
          >
            Export
            
          </button> */}
            <div class="oneline">
              <div class="dropdown ">
                <button
                  class="btn btn-primary dropdown-toggle "
                  type="button"
                  data-toggle="dropdown"
                  style={{ width: "110px", height: "35px" }}
                >
                  Export
                </button>
                <ul
                  class="dropdown-menu"
                  style={{ width: "70px", height: "78px" }}
                >
                  <center>
                    <li>
                      <ReactToExcel
                        className="btn  excel"
                        table="tabel-to-xls"
                        filename="excelfile"
                        sheet="sheet 1"
                        buttonText="EXCEL"
                      ></ReactToExcel>
                    </li>

                    <li>
                      {" "}
                      <button
                        className="btn"
                        style={{
                          width: "150px",
                          height: "30px",
                          backgroundColor: "lightgreen",
                        }}
                        id="pdf"
                      >
                        PDF
                      </button>
                    </li>
                  </center>
                </ul>
              </div>
            </div>
          </center>
          <div style={{ marginBottom: "5px", marginLeft: "-20px" }}>
            <label className="label100">
              <b>{entitylabel}</b>
            </label>
            {/* <input
            type="text"
            name="entitycount"
            value={entityCount}
            className="detail__input textsmall"
            readOnly
          /> */}
          </div>
          {/* <ReactToExcel
            className="btn btn-success"
            table="tabel-to-xls"
            filename="excelfile"
            sheet="sheet 1"
            buttonText="EXCEL"
          ></ReactToExcel> */}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {/* <button
            className="btn btn-warning"
            style={{ width: "110px", height: "35px" }}
            id="pdf"
          >
        PDF
          </button> */}
          <div>
            <br></br>
            <center>
              <div id="invoice">
                <table
                  className="table table-sm border    "
                  style={{ fontFamily: "Segoe UI", fontSize: "0.9em" }}
                  id="tabel-to-xls"
                >
                  <thead className="thead-dark">
                    <tr style={{ height: "30px" }}>
                      <th scope="col">#</th>
                      {/* <th scope="col">Compnay</th> */}
                      <th scope="col" style={{ width: "150px" }}>
                        Code
                      </th>
                      <th scope="col" style={{ width: "150px" }}>
                        Extcode
                      </th>
                      <th scope="col" style={{ width: "400px" }}>
                        Name
                      </th>
                      <th scope="col" style={{ width: "200px" }}>
                        EntSubtype
                      </th>
                      {/* <th scope="col">password</th> */}
                      <th scope="col" style={{ width: "200px" }}>
                        Location
                      </th>
                      <th scope="col" style={{ width: "200px" }}>
                        Status
                      </th>
                      <th scope="col" style={{ width: "10px" }}></th>
                      <th scope="col" style={{ width: "10px" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {Entity.map((entity, index) => (
                      <tr
                        key={index}
                        style={{ height: "30px", valign: "middle" }}
                      >
                        <th scope="row" style={{ verticalAlign: "middle" }}>
                          {index + 1}
                        </th>
                        {/* <td>{user.usr_company}</td> */}
                        <td style={{ verticalAlign: "middle" }}>
                          {entity.ent_code}
                        </td>
                        <td style={{ verticalAlign: "middle" }}>
                          {" "}
                          {entity.ent_extcode}
                        </td>
                        <td style={{ verticalAlign: "middle" }}>
                          {entity.ent_desc}
                        </td>
                        <td style={{ verticalAlign: "middle" }}>
                          {EntitySubTypeMap.get(entity.ent_subtype)}
                        </td>
                        <td style={{ verticalAlign: "middle" }}>
                          {LocationMap.get(entity.ent_location)}
                        </td>
                        <td style={{ verticalAlign: "middle" }}>
                          {EntityStatusMap.get(entity.ent_status)}
                        </td>
                        {/* <td style={{ verticalAlign: "middle" }}>
                  <input
                    type="checkbox"
                    checked={location.loc_enable ? true : false}
                    readOnly
                  ></input>
                </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* <input
                type="text"
                className="selectnew"
                value={q}
                onChange={input}
              ></input>
              <table>
                <tr>
                  <td>{q}</td>
                </tr>
              </table> */}

                {/* <Select
  className="selectnew"
  value={selectedMaterialOptions}
  onChange={handleMaterialChange}
  options={materialOptions}
  placeholder="None Selected"
  isMulti
/> */}
              </div>
            </center>

            {/* <Datatable data={search(data)} /> */}
          </div>
        </div>

        {/* <hr style=
          {{borderTop: '1px solid black',marginTop:'-5px'}}></hr> */}
      </React.Fragment>
    </div>
  );
};

export default Search;
