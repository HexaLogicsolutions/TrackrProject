import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTrashAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { AddDepModal } from "../components/AddDepModal";

const EntityTypeList = () => {
  let history = useHistory();
  const contextType = useContext(AuthContext);

  const [entitytype, setGroup] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState();
  const [variant, setVariant] = useState();
  const [currentGroup, setCurrentGroup] = useState("");

  let closeModal = () => {
    setShowModal(false);
  };
  const loadGroups = async () => {
    const result = await axios.get(contextType.dbUrl + "entitytype");
    setGroup(result.data);
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
    loadGroups();
    const timer = setTimeout(() => {
      setMsg("");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const addEntitytype = async () => {
    contextType.setCurrentObject(null);
    history.push("/EntityType");
  };

  const editentity = async (ett_code) => {
    console.log(`Edit ${ett_code}`);
    contextType.setCurrentObject(ett_code);
    history.push("/EntityType");

    //this.props.history.push("/User");
  };

  const delett = async (ett_code) => {
    console.log(`Del ${ett_code}`);
    //contextType.setSelectedUser(usr_code);
    setCurrentGroup(ett_code);
    setShowModal(true);
  };

  const deleteentitytype = async (code) => {
    console.log("in deleteUser " + code);
    setShowModal(false);
    await axios.delete(contextType.dbUrl +`entitytype/${code}`);
    loadGroups();
  };

  return (
    <React.Fragment>
      <div style={{ overflowX: "auto" }}>
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

        {/* {msg ? (
              <Alert variant={variant}>{msg}</Alert>
            ) : null} */}

        <div className="   ">
          {/* <center>
        <h3>EntityType List</h3></center> */}
          <div
            className="container header  list "
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
                Entity Type List
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
                {entitytype.map((entity_type, index) => (
                  <tr key={index} style={{ height: "30px", valign: "middle" }}>
                    <th scope="row" style={{ verticalAlign: "middle" }}>
                      {index + 1}
                    </th>
                    {/* <td>{user.usr_company}</td> */}
                    <td style={{ verticalAlign: "middle" }}>
                      {entity_type.ett_code}
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      {entity_type.ett_name}
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      <input
                        type="checkbox"
                        checked={entity_type.ett_active}
                        readOnly
                      ></input>
                    </td>
                    {/* <td style={{ verticalAlign: "middle" }}> {user.usr_group}</td> */}
                    <td>
                      <button
                        // style={{padding:"2px"}}
                        className="btn btn-primary"
                        onClick={() => editentity(entity_type.ett_code)}
                      >
                        {/* <i class="fas fa-user-edit fa-xs"></i> */}
                        <FontAwesomeIcon icon={faUserEdit} size="xs" />
                      </button>
                    </td>
                    <td>
                      {/* <button
                   
                    className="btn btn-danger"
                   
                    onClick={() => delett(entity_type.ett_code)}
                  >
                   
                    <FontAwesomeIcon icon={faTrashAlt} size="xs" />
                  </button> */}
                      <button
                        // type="button"
                        class="btn btn-danger"
                        data-toggle="modal"
                        data-target="#modal-danger"
                        onClick={() => delett(entity_type.ett_code)}
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
                onClick={() => addEntitytype()}
              >
                Add Entity Type
              </button>
            </div>
            <AddDepModal
              show={showModal}
              onHide={closeModal}
              onBtn1={deleteentitytype}
              onBtn2={closeModal}
              currentObject={currentGroup}
              heading="Delete EntityType"
              msg="Are you sure you want to delete this entity type?"
              btn1Text="Ok"
              btn2Text="Cancel"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default EntityTypeList;
