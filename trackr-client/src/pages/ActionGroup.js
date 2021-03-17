import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { Alert } from "react-bootstrap";
import {
  addActionGroup,
  updateActionGroup,
  updateStatus,
} from "../actions/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import { faTrashAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { AddDepModal } from "../components/AddDepModal";
import context from "react-bootstrap/esm/AccordionContext";
const ActionGroup = () => {
  let history = useHistory();
  const contextType = useContext(AuthContext);
  const [msg, setMsg] = useState("");
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [color, setColor] = useState("");
  const [name, setName] = useState("");
  const [timeout, settimeout] = useState("");
  const [entityCount, setEntityCount] = useState("");
  const [enabled, setEnabled] = useState(0);
  const [buttonText, setButtonText] = useState("");
  const [editActionGroup, setEditActionGroup] = useState(false);
  const [buttonClicked, setButtonClicked] = useState("");
  const [variant, setVariant] = useState();
  
  // general
  useEffect(() => {
    if (contextType.currentMsg) {
      setMsg(contextType.currentMsg);
      setVariant(contextType.currentVariant);
      setVariant(contextType.currentColor);
      contextType.setCurrentMsg("");
      contextType.setCurrentVariant();
      contextType.setCurrentColor();
    } else {
      setMsg("");
      setVariant(null);
      setColor(null);
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
      setTitle("New Action Group");
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
  function resetForm() {
    setName("");
    setEntityCount("");
    setButtonClicked("");
  }
  function handleBack() {
    history.goBack();
  }
  function updateCountClicked() {
    // setButtonClicked("COUNT");
    updateCount();
  }
  const submit = (e) => {
    e.preventDefault();
    // console.log("submit " + selectedLocations);
    // setButtonClicked("UPDATE");
    updateCount();
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
     contextType.setCurrentMsg(res.data.msg);
    contextType.setCurrentVariant("success");
    contextType.setCurrentColor("alert alert-success");
          handleBack();
          settimeout(() => setMsg(""), 2000);
          resetForm();
        } else {
          contextType.setCurrentMsg(res.data.msg);
          contextType.setCurrentVariant("danger");
          contextType.setCurrentColor("alert alert-success");

          setMsg(res.data.msg);
          setVariant("danger");
          setColor("alert alert-danger")
          setTimeout(() => setMsg(""), 2000);
        }
      });
    } else {
      // Register
      addActionGroup(newActionGroup, (res) => {
        console.log("in add action Group");
        if (res.data.success) {
          console.log("data is success");
          contextType.setCurrentMsg(res.data.msg);
          contextType.setCurrentVariant("success");
          contextType.setCurrentColor("alert alert-success")
          handleBack();
          settimeout(() => setMsg(""), 2000);
          resetForm();
        } else {
          console.log("not success");
          contextType.setCurrentColor(res.data.msg);
          contextType.setCurrentVariant("alert");
          setMsg(res.data.msg);
          setColor("alert alert-danger");
          setVariant("danger");
          setTimeout(() => setMsg(""), 2000);
        }
      });
    }
  };
  const updateCount = () => {
    let qs = "";
    let count = 0;
    if (selectedMaterials.length > 0) {
      qs = qs + "&material=" + selectedMaterials;
    }
    // console.log(selectedEntityTypes+":"+selectedEntityTypes.length);
    if (selectedEntityTypes.length > 0) {
      qs = qs + "&entitytype=" + selectedEntityTypes;
    }
    if (selectedEntitySubTypes.length > 0) {
      qs = qs + "&subtype=" + selectedEntitySubTypes;
    }
    if (selectedLocations.length > 0) {
      qs = qs + "&location=" + selectedLocations;
    }
    if (selectedWarehouses.length > 0) {
      qs = qs + "&warehouse=" + selectedWarehouses;
    }
    if (selectedLocationAreas.length > 0) {
      qs = qs + "&locationarea=" + selectedLocationAreas;
    }
    if (selectedEntityStatuses.length > 0) {
      qs = qs + "&status=" + selectedEntityStatuses;
    }
    const url = "/api/actiongroup/find?" + qs.substr(1);
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        console.log(data);
        count = data.length;
        // console.log("datalength:" + count);
        setEntityCount(count);
      })
      .catch((err) => {
        setEntityCount("");
      });
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
    let entitysubtypesFromAPI = result.data.map((etsub) => {
      return { value: etsub.est_code, label: etsub.est_name, id: etsub._id };
    });
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

    let warehousesFromAPI = result.data.map((whs) => {
      return { value: whs.whs_code, label: whs.whs_name, id: whs._id };
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
        //console.log(myCode);
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

    let locationFromAPI = result.data.map((loc) => {
      return { value: loc.loc_code, label: loc.loc_name, id: loc._id };
    });
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
        // console.log(etsub.value + " Code not found !");
      }
      //return { value: etsub.est_code, label: etsub.est_name, id: etsub._id };
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

    let entitystatusFromAPI = result.data.map((sta) => {
      return { value: sta.sta_code, label: sta.sta_desc, id: sta._id };
    });
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
      <div
        className="container header detail"
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
      {/* {msg ? <Alert variant={variant}>{msg}</Alert> : null} */}

      <div
        className="container header detail "
        style={{ borderRadius: "0px 0px 20px 20px" }}
      >
          {msg ? (
                // <Alert variant={this.state.variant}>{this.state.msg}</Alert>
                <div class={color}>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="alert"
                    aria-hidden="true"
                    color={variant}
                  >
                    &times;
                  </button>
                  <h4>
                    <i class="icon fa fa-info"></i> {msg}
                  </h4>
                </div>
              ) : null}
        {/* <center>
        
          <h4 style={{ paddingTop: "5px", fontSize: "20px" }}>
              {title}
              </h4>

            <hr></hr>
          </center> */}
        <br></br>
        <div className="form-group ">
          <label className="labelstd">Code:</label>
          <span className="myspan ">
            <div className="form__div ">
              <input
                type="text"
                name="code"
                value={code}
                disabled={setEditActionGroup ? true : false}
                className="detail__input textsmall"
                onChange={onChange}
                required
              />
            </div>
          </span>
        </div>
          <div className="form-group ">
          <label className="labelstd">Description:</label>
          <span className="myspan ">
            <div className="form__div ">
           
              <input
                type="text"
                name="name"
                value={name}
                className="detail__input "
               
                onChange={onChange}
                required
              >
                </input>
               
            </div>
          </span>
        </div>
       

        <div style={{ display: "flex", marginBottom: "10px" }}>
          {/* <div style={{display:'flex', flexDirection: ''}}> */}
          <label className="labelstd">Material:</label>

          <Select
            className="detail__input"
            value={selectedMaterialOptions}
            onChange={handleMaterialChange}
            options={materialOptions}
            placeholder="None Selected"
            isMulti
          />
        </div>

        <div style={{ display: "flex", marginBottom: "10px" }}>
          {/* <div style={{display:'flex', flexDirection: ''}}> */}
          <label className="labelstd">Entity Types:</label>

          <Select
            className="detail__input"
            value={selectedEntityTypeOptions}
            onChange={handleEntityTypeChange}
            options={entityTypeOptions}
            placeholder="None Selected"
            isMulti
          />
        </div>

        <div style={{ display: "flex", marginBottom: "10px" }}>
          {/* <div style={{display:'flex', flexDirection: ''}}> */}
          <label className="labelstd">Entity Sub Type:</label>
          <Select
            className="detail__input"
            value={selectedEntitySubTypeOptions}
            onChange={handleEntitySubTypeChange}
            options={entitySubTypeOptions}
            placeholder="None Selected"
            isMulti
          />
        </div>
        <div style={{ display: "flex", marginBottom: "10px" }}>
          {/* <div style={{display:'flex', flexDirection: ''}}> */}
          <label className="labelstd">Warehouse:</label>
          <Select
            className="detail__input"
            value={selectedWarehouseOptions}
            onChange={handleWarehouseChange}
            options={warehouseOptions}
            placeholder="None Selected"
            isMulti
          />
        </div>
        <div style={{ display: "flex", marginBottom: "10px" }}>
          {/* <div style={{display:'flex', flexDirection: ''}}> */}
          <label className="labelstd">Location Area:</label>
          <Select
            className="detail__input"
            value={selectedLocationAreaOptions}
            onChange={handleLocationAreaChange}
            options={locationAreaOptions}
            placeholder="None Selected"
            isMulti
          />
        </div>
        <div style={{ display: "flex", marginBottom: "10px" }}>
          {/* <div style={{display:'flex', flexDirection: ''}}> */}
          <label className="labelstd">Location:</label>
          <Select
            className="detail__input"
            value={selectedLocationOptions}
            onChange={handleLocationChange}
            options={locationOptions}
            placeholder="None Selected"
            isMulti
          />
        </div>
        <div style={{ display: "flex", marginBottom: "10px" }}>
          {/* <div style={{display:'flex', flexDirection: ''}}> */}
          <label className="labelstd">Entity Status:</label>
          <Select
            className="detail__input"
            value={selectedEntityStatusOptions}
            onChange={handleEntityStatusChange}
            options={entityStatusOptions}
            placeholder="None Selected"
            isMulti
          />
        </div>
        <label className="labelstd">Enabled:</label>
        <input
          // className=" fadeIn second cm-toggle"
          type="checkbox"
          name="enabled"
          // type={!editActionGroup ? "hidden" : "text"}
          checked={enabled}
          // ref={(el) => (this.myRefs[2] = el)}
          onChange={(event) => {
            setEnabled(event.target.checked);
          }}
        ></input>
        <br></br>
        <br></br>
        <br></br>
        <center>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "110px", height: "35px" }}
            onClick={submit}
          >
            {buttonText}
          </button>
        </center>
        <br></br>
        <div style={{ marginBottom: "5px" }}>
          <label className="labelstd">Entity Count:</label>
          <input
            type="text"
            name="entitycount"
            value={entityCount}
            className="detail__input textsmall"
            readOnly
          />
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "110px", height: "35px", marginLeft: "250px" }}
            onClick={updateCountClicked}
          >
            Refresh
          </button>
        </div>
        <br></br>
      </div>
    </div>
  );
};

export default ActionGroup;
