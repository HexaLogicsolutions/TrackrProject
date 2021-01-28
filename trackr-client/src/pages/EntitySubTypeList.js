import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { Alert } from "react-bootstrap";
import HashMap from "hashmap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTrashAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { AddDepModal } from "../components/AddDepModal";

const EntitySubTypeList = () => {
  let history = useHistory();
  const contextType = useContext(AuthContext);
  const [EntitySubType, setUser] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState();
  const [variant, setVariant] = useState();
  const [currentUser, setCurrentUser] = useState("");
  const [entityTypeMap, setEntityTypeMap] = useState(new HashMap());

  let closeModal = () => {
    setShowModal(false);
  };

  const loadEntitySubType = async () => {
    const result = await axios.get(contextType.dbUrl + "entitysubtype");
    setUser(result.data);
  };

  useEffect(() => {
    console.log("UserList - Mount -");

    let url = "/api/entitytype";

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        var map = new HashMap();

        let entityFromAPI = data.map((ett) => {
          map.set(ett.ett_code, ett.ett_name);
          return { key: ett.ett_code, display: ett.ett_name };
        });
        console.log("groupsFromAPI:" + entityFromAPI[0].value);
        // console.log("map :"+ map.size);
        // console.log("map :"+ map.get("SAL"));
        setEntityTypeMap(map);
      })
      .catch((error) => {
        console.log(error);
      });

    if (contextType.currentMsg) {
      setMsg(contextType.currentMsg);
      setVariant(contextType.currentVariant);
      setColor(contextType.currentColor);
      contextType.setCurrentMsg("");
      contextType.setCurrentVariant();
      contextType.setCurrentColor();
    } else {
      setMsg("");
      setVariant(null);
      setColor(null);
    }
    loadEntitySubType();
    const timer = setTimeout(() => {
      setMsg("");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const editEntitySubType = async (est_code) => {
    console.log(`Edit ${est_code}`);
    contextType.setCurrentObject(est_code);
    history.push("/EntitySubType");

    //this.props.history.push("/User");
  };

  const delEntitySubType = async (est_code) => {
    console.log(`Del ${est_code}`);
    //contextType.setSelectedUser(usr_code);
    setCurrentUser(est_code);
    setShowModal(true);
  };

  const addEntitySubType = async () => {
    contextType.setCurrentObject(null);
    history.push("/EntitySubType");
  };

  const deleteEntitySubType = async (code) => {
    console.log("in deleteUser " + code);
    setShowModal(false);
    await axios.delete(contextType.dbUrl +`entitysubtype/${code}`);
    loadEntitySubType();
  };

  return (
    <div style={{ overflowX: "auto" }}>
      {console.log("entitysubtype - Render")}
      {/* {msg ? <Alert variant={variant}>{msg}</Alert> : null} */}
      {msg ? (
        // <Alert variant={variant}>{msg}</Alert>
        <div class={color}>
          <button
            className="alert"
            type="button"
            class="close"
            data-dismiss="alert"
            aria-hidden="true"
          >
            &times;
          </button>
          <h4>
            <center>{msg}</center>
          </h4>
        </div>
      ) : null}

      <div className="   ">
        {/* <center>
          <h3>EntitySubType List</h3>
        </center> */}
        <div
          className="container header scroll list "
          style={{
            height: "65px",
            marginBottom: "-35px",
            backgroundColor: "#34444c",
            color: "white",
            borderRadius: "20px 20px 0px 0px",
          }}
        >
          <center>
            <h4
              style={{ paddingTop: "5px", fontSize: "20px" }}
              className="heading"
            >
              Entity Subtype List
            </h4>
          </center>
        </div>
        <div
          className="container header  list scroll"
          style={{ borderRadius: "0px 0px 20px 20px", marginBottom: "45px" }}
        >
          <table
            className="table table-sm border    "
            style={{ fontFamily: "Segoe UI", fontSize: "0.9em" }}
          >
            <thead className="thead-dark">
              <tr style={{ height: "30px" }}>
                <th scope="col">#</th>
                {/* <th scope="col">Compnay</th> */}
                <th scope="col" style={{ width: "200px" }}>
                  Code
                </th>
                <th scope="col" style={{ width: "400px" }}>
                  Type
                </th>
                <th scope="col" style={{ width: "400px" }}>
                  Name
                </th>
                {/* <th scope="col">password</th> */}
                <th scope="col" style={{ width: "100px" }}>
                  Active
                </th>
                <th scope="col" style={{ width: "10px" }}></th>
                <th scope="col" style={{ width: "10px" }}></th>
              </tr>
            </thead>
            <tbody>
              {EntitySubType.map((entity_subtype, index) => (
                <tr key={index} style={{ height: "30px", valign: "middle" }}>
                  <th scope="row" style={{ verticalAlign: "middle" }}>
                    {index + 1}
                  </th>
                  {/* <td>{user.usr_company}</td> */}
                  <td style={{ verticalAlign: "middle" }}>
                    {entity_subtype.est_code}
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    {entityTypeMap.get(entity_subtype.est_type)}
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    {" "}
                    {entity_subtype.est_name}
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    <input
                      type="checkbox"
                      checked={entity_subtype.est_active ? true : false}
                      readOnly
                    ></input>
                  </td>

                  <td>
                    <button
                      // style={{padding:"2px"}}
                      className="btn btn-primary"
                      onClick={() => editEntitySubType(entity_subtype.est_code)}
                    >
                      {/* <i class="fas fa-user-edit fa-xs"></i> */}
                      <FontAwesomeIcon icon={faUserEdit} size="xs" />
                    </button>
                  </td>
                  <td>
                    {/* <button
                  
                    className="btn btn-danger"
                  
                    onClick={() => delEntitySubType(entity_subtype.est_code)}
                  >
                    
                    <FontAwesomeIcon icon={faTrashAlt} size="xs" />
                  </button> */}
                    <button
                      // type="button"
                      class="btn btn-danger"
                      data-toggle="modal"
                      data-target="#modal-danger"
                      onClick={() => delEntitySubType(entity_subtype.est_code)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} size="xs" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="rj">
            <button
              className="btn btn-primary"
              style={{ width: "200px", height: "35px", marginBottom: "25px" }}
              onClick={() => addEntitySubType()}
            >
              Add Entity Subtype
            </button>
          </div>
          <AddDepModal
            show={showModal}
            onHide={closeModal}
            onBtn1={deleteEntitySubType}
            onBtn2={closeModal}
            currentObject={currentUser}
            heading="Delete EntitySubType"
            msg="Are you sure you want to delete EntitySubtype?"
            btn1Text="Ok"
            btn2Text="Cancel"
          />
        </div>
      </div>
    </div>
  );
};
export default EntitySubTypeList;
