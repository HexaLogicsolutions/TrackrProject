import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTrashAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { AddDepModal } from "../components/AddDepModal";

const ActionGroupList = () => {
  let history = useHistory();
  const contextType = useContext(AuthContext);

  const [actions, setActionGroup] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [variant, setVariant] = useState();
  const [currentGroup, setCurrentGroup] = useState("");

  let closeModal = () => {
    setShowModal(false);
  };
  const loadActionGroups = async () => {
    const result = await axios.get(contextType.dbUrl + "actiongroup");
    setActionGroup(result.data);
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
    loadActionGroups();
    const timer = setTimeout(() => {
      setMsg("");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const addActionGroup = async () => {
    contextType.setCurrentObject(null);
    history.push("/ActionGroup");
  };

  const editActionGroup = async (act_code) => {
    console.log(`Edit ${act_code}`);
    contextType.setCurrentObject(act_code);
    history.push("/ActionGroup");
  };
  const delG = async (act_code) => {
    console.log(`Del ${act_code}`);
    //contextType.setSelectedUser(usr_code);
    setCurrentGroup(act_code);
    setShowModal(true);
  };

  const deleteActionGroup = async (code) => {
    console.log("in deleteUser " + code);
    setShowModal(false);
    await axios.delete(contextType.dbUrl +`actiongroup/${code}`);
    loadActionGroups();
  };

  return (
    <React.Fragment>
      <div className="scroll" style={{ overflowX: "auto" }}>
        {msg ? <Alert variant={variant}>{msg}</Alert> : null}

        <div className="   ">
          {/* <center>
        <h3>Action Group List</h3></center> */}
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
                Action Group List
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
                  <th scope="col" style={{ width: "50px" }}>
                    #
                  </th>
                  {/* <th scope="col">Compnay</th> */}
                  <th scope="col" style={{ width: "150px" }}>
                    Code
                  </th>
                  <th scope="col" style={{ width: "450px" }}>
                    Name
                  </th>

                  <th scope="col" style={{ width: "150px" }}>
                    Enabled
                  </th>
                  <th scope="col" style={{ width: "150px" }}>
                    EntityCount
                  </th>

                  <th scope="col" style={{ width: "10px" }}></th>
                  <th scope="col" style={{ width: "10px" }}></th>
                </tr>
              </thead>
              <tbody>
                {actions.map((action_group, index) => (
                  <tr key={index} style={{ height: "30px", valign: "middle" }}>
                    <th scope="row" style={{ verticalAlign: "middle" }}>
                      {index + 1}
                    </th>
                    {/* <td>{user.usr_company}</td> */}
                    <td style={{ verticalAlign: "middle" }}>
                      {action_group.act_code}
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      {action_group.act_name}
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      <input
                        type="checkbox"
                        checked={action_group.act_enabled}
                        readOnly
                      ></input>
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      {action_group.act_entity_count}
                    </td>
                    {/* <td style={{ verticalAlign: "middle" }}> {user.usr_group}</td> */}
                    <td>
                      <button
                        // style={{padding:"2px"}}
                        className="btn btn-primary"
                        onClick={() => editActionGroup(action_group.act_code)}
                      >
                        {/* <i class="fas fa-user-edit fa-xs"></i> */}
                        <FontAwesomeIcon icon={faUserEdit} size="xs" />
                      </button>
                    </td>
                    <td>
                      {/* <button
                   
                    className="btn btn-danger"
                  
                    onClick={() => delG(action_group.act_code)}
                  >
                 
                    <FontAwesomeIcon icon={faTrashAlt} size="xs" />
                  </button> */}
                      <button
                        // type="button"
                        class="btn btn-danger"
                        data-toggle="modal"
                        data-target="#modal-danger"
                        onClick={() => delG(action_group.act_code)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} size="xs" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginBottom: "20px" }}>
              <center>
                <button
                  className="btn btn-primary"
                  style={{
                    width: "200px",
                    height: "35px",
                    marginRight: "10px",
                  }}
                  onClick={() => addActionGroup()}
                >
                  Add Action Group
                </button>
                <button
                  className="btn btn-primary"
                  style={{ width: "200px", height: "35px", marginLeft: "10px" }}
                  onClick={() => addActionGroup()}
                >
                  Update Entity Count
                </button>
              </center>
            </div>
          </div>
          <AddDepModal
            show={showModal}
            onHide={closeModal}
            onBtn1={deleteActionGroup}
            onBtn2={closeModal}
            currentObject={currentGroup}
            heading="Delete  Action Group"
            msg="Are you sure you want to delete Action Group?"
            btn1Text="Ok"
            btn2Text="Cancel"
          />
        </div>
      </div>
    </React.Fragment>
  );
};
export default ActionGroupList;
