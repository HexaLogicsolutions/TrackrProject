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

const ActionDemo = () => {
  let history = useHistory();
  const contextType = useContext(AuthContext);

  const [msg, setMsg] = useState("");
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
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
      contextType.setCurrentMsg("");
      contextType.setCurrentVariant();
    } else {
      setMsg("");
      setVariant(null);
    }

    const actionGroupCode = contextType.currentObject ? contextType.currentObject : "";

    async function loadLists() {
      await loadEntitySubTypes();
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
    // updateCount();

    console.log("updating");
    const newActionGroup = {
      code,
      name,
     
      entitysubtype: selectedEntitySubTypes,
     
      enabled,
    
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

  const updateCount = () => {
    let qs = "";
    let count = 0;
   
    if (selectedEntitySubTypes.length > 0) {
      qs = qs + "&subtype=" + selectedEntitySubTypes;
    }

    const url = "/api/actiongroup/find?" + qs.substr(1);
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        // console.log(data);
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
      {msg ? <Alert variant={variant}>{msg}</Alert> : null}

      <div
        className="container header detail "
        style={{ borderRadius: "0px 0px 20px 20px" }}
      >
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
              />
            </div>
          </span>
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

export default ActionDemo;
