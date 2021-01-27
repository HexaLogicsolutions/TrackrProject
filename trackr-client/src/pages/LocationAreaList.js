import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { Alert } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTrashAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { AddDepModal } from "../components/AddDepModal";
// import HashMap from 'hashmap';

const LocationAreaList = () => {
  let history = useHistory();
  const contextType = useContext(AuthContext);

  const [LocationArea, setUser] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState();
  const [variant, setVariant] = useState();
  const [currentUser, setCurrentUser] = useState("");

  let closeModal = () => {
    setShowModal(false);
  };

  const loadLocationArea = async () => {
    const result = await axios.get(contextType.dbUrl + "locationarea");
    setUser(result.data);
  };

  useEffect(() => {
    console.log("UserList - Mount -");

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
    loadLocationArea();
    const timer = setTimeout(() => {
      setMsg("");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const editLocationArea = async (lar_code) => {
    console.log(`Edit ${lar_code}`);
    contextType.setCurrentObject(lar_code);
    history.push("/LocationArea");

    //this.props.history.push("/User");
  };

  const delLocationArea = async (lar_code) => {
    console.log(`Del ${lar_code}`);
    //contextType.setSelectedUser(usr_code);
    setCurrentUser(lar_code);
    setShowModal(true);
  };

  const addLocationArea = async () => {
    contextType.setCurrentObject(null);
    history.push("/LocationArea");
  };

  const deleteLocationArea = async (code) => {
    console.log("in deleteUser " + code);
    setShowModal(false);
    await axios.delete(`http://localhost:5000/api/locationarea/${code}`);
    loadLocationArea();
  };

  return (
    <div className="scroll" style={{ overflowX: "auto" }}>
      {console.log("entitysubtype - Render")}
      {/* {msg ? (
              <Alert variant={variant}>{msg}</Alert>
            ) : null} */}
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
        <h3>LocationArea List</h3></center> */}
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
              Location Area List
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
                {/* <th scope="col" style={{ width: "400px" }}>
                Type
              </th> */}
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
              {LocationArea.map((location_area, index) => (
                <tr key={index} style={{ height: "30px", valign: "middle" }}>
                  <th scope="row" style={{ verticalAlign: "middle" }}>
                    {index + 1}
                  </th>
                  {/* <td>{user.usr_company}</td> */}
                  <td style={{ verticalAlign: "middle" }}>
                    {location_area.lar_code}
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    {" "}
                    {location_area.lar_name}
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    <input
                      type="checkbox"
                      checked={location_area.lar_active ? true : false}
                      readOnly
                    ></input>
                  </td>

                  <td>
                    <button
                      // style={{padding:"2px"}}
                      className="btn btn-primary"
                      onClick={() => editLocationArea(location_area.lar_code)}
                    >
                      {/* <i class="fas fa-user-edit fa-xs"></i> */}
                      <FontAwesomeIcon icon={faUserEdit} size="xs" />
                    </button>
                  </td>
                  <td>
                    {/* <button
                   
                    className="btn btn-danger"
                   
                    onClick={() => delLocationArea(location_area.lar_code)}
                  >
                    
                    <FontAwesomeIcon icon={faTrashAlt} size="xs" />
                  </button> */}
                    <button
                      // type="button"
                      class="btn btn-danger"
                      data-toggle="modal"
                      data-target="#modal-danger"
                      onClick={() => delLocationArea(location_area.lar_code)}
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
              onClick={() => addLocationArea()}
            >
              Add Location Area
            </button>
          </div>
          <AddDepModal
            show={showModal}
            onHide={closeModal}
            onBtn1={deleteLocationArea}
            onBtn2={closeModal}
            currentObject={currentUser}
            heading="Delete Location area"
            msg="Are you sure you want to delete  this Location area?"
            btn1Text="Ok"
            btn2Text="Cancel"
          />
        </div>
      </div>
    </div>
  );
};
export default LocationAreaList;
