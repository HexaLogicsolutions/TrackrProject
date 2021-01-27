import React, { useState, useEffect, useContext } from "react";
// import { useHistory } from "react-router";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { Alert } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from 'react-select';

const About = () => {
  // let history = useHistory();
  const contextType = useContext(AuthContext);
  // const [groups, setGroups] = useState([]);
  // const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [variant, setVariant] = useState();
  // const [currentGroup, setCurrentGroup] = useState("");
  // const [selectedClient, setSelectedClient] = useState([]);

  const [groupOptions, setGroupOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState();

  
  const loadGroups = async () => {
    const result = await axios.get(contextType.dbUrl + "groups");

    let groupsFromAPI = result.data.map((grp) => {

      return { value: grp.grp_code, label: grp.grp_name, id: grp._id };
    });
    setGroupOptions([{ id: "0", value: "", label: "" }].concat(groupsFromAPI));
  };

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
    loadGroups();
    const timer = setTimeout(() => {
      setMsg("");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    console.log("Option selected:", selectedOption);
  }, [selectedOption]);
  
  function handleSelectChange(event) {
    setSelectedOption(event);
    // alert(`your code is`+event.target.value);
  }
  function showGroupCodes(event) {
    let myCode="";
    let codes = selectedOption.map((grp)=>{
      myCode= myCode+","+grp.value;
      console.log(myCode);
      console.log(codes);
    });
    console.log("final codes are : "+ myCode.substr(1) );
  }

  return (
    <React.Fragment>
      <div className="container rj2 compomargin ">
        {msg ? <Alert variant={variant}>{msg}</Alert> : null}

        <div className="   ">
          <center>
            <h3>code List</h3>
          </center>

          <Select
        value={selectedOption}
        onChange={handleSelectChange}
        options={groupOptions}
        isMulti
      />


          {/* <select
          name="selectedClient"
          
             value={selectedClient}
            onChange={handleSelectChange}
            multiple="multiple"
            style={{
              width: "200px",
              height: "145px",
              fontSize: "20px",
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
            }}
          >
            {groups.map((user_group, index) => (
              <option value={user_group.grp_code}>
                {user_group.grp_name}{" "}
              </option>
            ))}
          </select> */}

          <br></br>
          <button
            className="btn btn-primary"
            style={{ width: "110px", height: "35px" }}
            onClick={() => showGroupCodes()}
          >
            Add Area
          </button>
          <p id="demo"></p>
          
        </div>
      </div>
    </React.Fragment>
  );
};
export default About;
