import React, { useState, useEffect, useContext } from "react";
// import { useHistory } from "react-router";
import { updateStatus } from "../actions/auth";
import { addStatus } from "../actions/auth";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

import { Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faTimes,
  faTrashAlt,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";
import { AddDepModal } from "../components/AddDepModal";

const EntityStatus = () => {
  // let history = useHistory();
  const contextType = useContext(AuthContext);

  const [status, setstatus] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [variant, setVariant] = useState();
  // const [timeout, setTimeout] = useState();
  const [reload, setReload] = useState(false);

  const [currentGroup, setCurrentGroup] = useState("");
  const [code, setCode] = useState("");
  const [desc, setDesc] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [buttonText, setButtonText] = useState("ADD");
  const [editMode, setEditMode] = useState(false);

  let closeModal = () => {
    setShowModal(false);
  };

  const loadStatus = async () => {
    const result = await axios.get(contextType.dbUrl + "entitystatus");
    setstatus(result.data);
  };

  // const onChange = (e) => {
  //   if (e.target.name === "code") {
  //     this.setState({
  //       [e.target.name]: e.target.value.toUpperCase(),
  //     });
  //   } else {
  //     this.setState({
  //       [e.target.name]: e.target.value,
  //     });
  //   }
  // };

  useEffect(
    (e) => {
      if (contextType.currentMsg) {
        setMsg(contextType.currentMsg);
        setVariant(contextType.currentVariant);
        contextType.setCurrentMsg("");
        contextType.setCurrentVariant();
      } else {
        setMsg("");
        setVariant(null);
      }

      loadStatus();
    },
    [reload]
  );

  //   const addStatus = async () => {
  //     contextType.setCurrentObject(null);

  //   };

  const addOrUpdateStatus = async (e) => {
    const newStatus = {
      code,
      desc,
      enabled,
    };

    e.preventDefault();

    if (editMode) {
      // updateStatus
      updateStatus(newStatus, (res) => {
        if (res.data.success) {
          contextType.setCurrentMsg(res.data.msg);
          contextType.setCurrentVariant("success");
        } else {
          contextType.setCurrentMsg(res.data.msg);
          contextType.setCurrentVariant("danger");
        }
      });
    } else {
      addStatus(newStatus, (res) => {
        if (res.data.success) {
          contextType.setCurrentMsg(res.data.msg);
          contextType.setCurrentVariant("success");
        } else {
          contextType.setCurrentMsg(res.data.msg);
          contextType.setCurrentVariant("danger");
        }
      });
    }
    setReload(!reload);
  };

  const clearForm = async (e) => {
    e.preventDefault();
    console.log("Clear form clicked");
    setCode("");
    setDesc("");
    setEnabled(true);
    setButtonText("ADD");
    setEditMode(false);
  };

  const editStatus = async (status) => {
    console.log(`Edit ${status.sta_code}`);
    setButtonText("UPDATE");

    setEditMode(true);
    setCode(status.sta_code);
    setDesc(status.sta_desc);
    setEnabled(status.sta_enabled);
  };

  const delS = async (sta_code) => {
    console.log(`Del ${sta_code}`);
    //contextType.setSelectedUser(usr_code);
    setCurrentGroup(sta_code);
    setShowModal(true);
  };

  const deleteStatus = async (code) => {
    setShowModal(false);
    await axios.delete(`http://localhost:5000/api/entitystatus/${code}`);
    loadStatus();
  };

  return (
    <React.Fragment>
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
          <h4 style={{ paddingTop: "5px", fontSize: "20px" }}>
            Entity Status List
          </h4>
        </center>
      </div>

      <div
        className="container header detail"
        style={{ borderRadius: "0px 0px 20px 20px" }}
      >
        {/* <center>
            <h3>EntityStatus List</h3>
          </center> */}
        <hr></hr>
        <div className="status">
          <form class="form-inline" style={{ margin: "-2%" }}>
            <div class="form-group " style={{ marginLeft: "50px" }}>
              <label for="text">Code:</label>
              <input
                type="text"
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                class="form-control"
                style={{ width: "60px", height: "30px" }}
              ></input>
            </div>
            &nbsp;
            <div class="form-group ml-4" style={{ marginLeft: "100px" }}>
              <label for="text">Description:</label>
              <input
                type="text"
                name="desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                class="form-control"
                // style={{ width: "300px", height: "30px" }}
              ></input>
            </div>
            &nbsp;
            <div class="form-group ml-4" style={{ marginLeft: "100px" }}>
              <label for="Checkbox ">Enabled:</label>
              &nbsp;
              <input
                type="Checkbox"
                onChange={(e) => setEnabled(e.target.checked)}
                // class="form-control"
                name="enabled"
                value={enabled}
                checked={enabled}
              ></input>
            </div>
            <div class="form-group ml-4">
              <button
                style={{ width: "80px", marginLeft: "100px" }}
                className="btn btn-primary"
                onClick={(e) => addOrUpdateStatus(e)}
              >
                {buttonText}
              </button>
              &nbsp;
              <button
                style={{ width: "50px" }}
                className="btn btn-danger"
                onClick={(e) => clearForm(e)}
              >
                {" "}
                <FontAwesomeIcon icon={faTimes} size="xs" />
              </button>
            </div>
          </form>
          <br></br>
        </div>

        {/* mobile screen */}
        <div className="mobile">
          <table
            className="table table-sm border    "
            style={{ fontFamily: "Segoe UI", fontSize: "0.9em" }}
          >
            <tr style={{ height: "30px", valign: "middle" }}>
              <td>
                <input
                  type="text"
                  name="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  class="form-control"
                  placeholder="code"
                  style={{ width: "60px", height: "30px", marginLeft: "-15px" }}
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  name="desc"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  class="form-control"
                  placeholder="Description"
                  style={{ height: "30px", width: "150px", marginLeft: "-9px" }}
                ></input>
              </td>
              <td>
                <input
                  type="Checkbox"
                  onChange={(e) => setEnabled(e.target.checked)}
                  // class="form-control"
                  name="enabled"
                  style={{ marginLeft: "-9px" }}
                  value={enabled}
                  checked={enabled}
                ></input>
              </td>
              <td>
                <button
                  style={{ width: "80px", marginLeft: "-9px" }}
                  className="btn btn-primary"
                  onClick={(e) => addOrUpdateStatus(e)}
                >
                  {buttonText}
                </button>
              </td>
              <td>
                <button
                  style={{ width: "50px", marginLeft: "-9px" }}
                  className="btn btn-danger"
                  onClick={(e) => clearForm(e)}
                >
                  {" "}
                  <FontAwesomeIcon icon={faTimes} size="xs" />
                </button>
              </td>
            </tr>
          </table>
        </div>
        {/*  */}

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
                Description
              </th>

              <th scope="col" style={{ width: "150px" }}>
                Enabled
              </th>

              <th scope="col" style={{ width: "10px" }}></th>
              <th scope="col" style={{ width: "10px" }}></th>
            </tr>
          </thead>
          <tbody>
            {status.map((entity_status, index) => (
              <tr key={index} style={{ height: "30px", valign: "middle" }}>
                <th scope="row" style={{ verticalAlign: "middle" }}>
                  {index + 1}
                </th>
                {/* <td>{user.usr_company}</td> */}
                <td style={{ verticalAlign: "middle" }}>
                  {entity_status.sta_code}
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  {entity_status.sta_desc}
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  <input
                    type="checkbox"
                    checked={entity_status.sta_enabled}
                    readOnly
                  ></input>
                </td>
                {/* <td style={{ verticalAlign: "middle" }}> {user.usr_group}</td> */}
                <td>
                  <button
                    // style={{padding:"2px"}}
                    className="btn btn-primary"
                    onClick={() => editStatus(entity_status)}
                  >
                    {/* <i class="fas fa-user-edit fa-xs"></i> */}
                    <FontAwesomeIcon icon={faUserEdit} size="xs" />
                  </button>
                </td>
                <td>
                  {/* <button
                    
                      className="btn btn-danger"
                      
                      onClick={() => delS(entity_status.sta_code)}
                    >
                   
                      <FontAwesomeIcon icon={faTrashAlt} size="xs" />
                    </button> */}
                  <button
                    // type="button"
                    class="btn btn-danger"
                    data-toggle="modal"
                    data-target="#modal-danger"
                    onClick={() => delS(entity_status.sta_code)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} size="xs" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <AddDepModal
          show={showModal}
          onHide={closeModal}
          onBtn1={deleteStatus}
          onBtn2={closeModal}
          currentObject={currentGroup}
          heading="Delete Status"
          msg="Are you sure you want to delete Status?"
          btn1Text="Ok"
          btn2Text="Cancel"
        />
      </div>
    </React.Fragment>
  );
};
export default EntityStatus;
