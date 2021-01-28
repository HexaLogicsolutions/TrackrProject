import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTrashAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { AddDepModal } from "../components/AddDepModal";

const WarehouseList = () => {
  let history = useHistory();
  const contextType = useContext(AuthContext);

  const [warehouse, setWarehouse] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState();
  const [variant, setVariant] = useState();
  const [currentGroup, setCurrentGroup] = useState("");

  let closeModal = () => {
    setShowModal(false);
  };
  const loadLocation = async () => {
    const result = await axios.get(contextType.dbUrl + "warehouse");
    setWarehouse(result.data);
  };

  useEffect(() => {
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
    loadLocation();
    const timer = setTimeout(() => {
      setMsg("");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const addWarehouse = async () => {
    contextType.setCurrentObject(null);
    history.push("/Warehouse");
  };

  const editlocation = async (whs_code) => {
    console.log(`Edit ${whs_code}`);
    contextType.setCurrentObject(whs_code);
    history.push("/Warehouse");

    //this.props.history.push("/User");
  };

  const delloc = async (whs_code) => {
    console.log(`Del ${whs_code}`);
    //contextType.setSelectedUser(usr_code);
    setCurrentGroup(whs_code);
    setShowModal(true);
  };

  const deletlocaitontype = async (code) => {
    console.log("in deleteLoacation " + code);
    setShowModal(false);
    await axios.delete(contextType.dbUrl +`warehouse/${code}`);
    loadLocation();
  };

  return (
    <React.Fragment>
      <div className="scroll" style={{ overflowX: "auto" }}>
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
        <h3>Warehouse List</h3></center> */}
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
                Warehouse List
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
                    Name
                  </th>

                  <th scope="col" style={{ width: "150px" }}>
                    Enabled
                  </th>

                  <th scope="col" style={{ width: "10px" }}></th>
                  <th scope="col" style={{ width: "10px" }}></th>
                </tr>
              </thead>
              <tbody>
                {warehouse.map((location_type, index) => (
                  <tr key={index} style={{ height: "30px", valign: "middle" }}>
                    <th scope="row" style={{ verticalAlign: "middle" }}>
                      {index + 1}
                    </th>
                    {/* <td>{user.usr_company}</td> */}
                    <td style={{ verticalAlign: "middle" }}>
                      {location_type.whs_code}
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      {location_type.whs_name}
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      <input
                        type="checkbox"
                        checked={location_type.whs_active}
                        readOnly
                      ></input>
                    </td>
                    {/* <td style={{ verticalAlign: "middle" }}> {user.usr_group}</td> */}
                    <td>
                      <button
                        // style={{padding:"2px"}}
                        className="btn btn-primary"
                        onClick={() => editlocation(location_type.whs_code)}
                      >
                        {/* <i class="fas fa-user-edit fa-xs"></i> */}
                        <FontAwesomeIcon icon={faUserEdit} size="xs" />
                      </button>
                    </td>
                    <td>
                      {/* <button
                   
                    className="btn btn-danger"
                   
                    onClick={() => delloc(location_type.whs_code)}
                  >
                    
                    <FontAwesomeIcon icon={faTrashAlt} size="xs" />
                  </button> */}
                      <button
                        // type="button"
                        class="btn btn-danger"
                        data-toggle="modal"
                        data-target="#modal-danger"
                        onClick={() => delloc(location_type.whs_code)}
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
                onClick={() => addWarehouse()}
              >
                Add Warehouse
              </button>
            </div>
            <AddDepModal
              show={showModal}
              onHide={closeModal}
              onBtn1={deletlocaitontype}
              onBtn2={closeModal}
              currentObject={currentGroup}
              heading="Delete Warehouse"
              msg="Are you sure you want to delete this warehouse?"
              btn1Text="Ok"
              btn2Text="Cancel"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default WarehouseList;
