import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTrashAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { AddDepModal } from "../components/AddDepModal";

const GroupList = () => {
  let history = useHistory();
  const contextType = useContext(AuthContext);

  const [groups, setGroup] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState();
  const [variant, setVariant] = useState();
  const [currentGroup, setCurrentGroup] = useState("");

  let closeModal = () => {
    setShowModal(false);
  };
  const loadGroups = async () => {
    // const result = await axios.get(contextType.dbUrl + "groups");
    const result = await axios.get(contextType.dbUrl + "groups");
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

  const addGroup = async () => {
    contextType.setCurrentObject(null);
    history.push("/Group");
  };

  const editGroup = async (grp_code) => {
    console.log(`Edit ${grp_code}`);
    contextType.setCurrentObject(grp_code);
    history.push("/Group");

    //this.props.history.push("/User");
  };

  const delG = async (grp_code) => {
    console.log(`Del ${grp_code}`);
    //contextType.setSelectedUser(usr_code);
    setCurrentGroup(grp_code);
    setShowModal(true);
  };

  const deleteGroup = async (code) => {
    console.log("in deleteUser " + code);
    setShowModal(false);
    await axios.delete(contextType.dbUrl +`groups/${code}`);
    loadGroups();
  };

  return (
    
      <div style={{ overflowX: "auto"  }}>
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
        {/* {msg ? <Alert variant={variant}>{msg}</Alert> : null} */}

        <div className="   ">
          {/* <center>
        <h3>Group List</h3></center> */}

          <div
            className="container header scroll list"
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
                Group List
              </h4>
            </center>
          </div>
          <div
            className="container header scroll list  "
            style={{ borderRadius: "0px 0px 20px 20px" }}
          >
            <table
              className="table table-sm border    "
              style={{ fontFamily: "Segoe UI", fontSize: "0.9em" }}
            >
              <thead className="thead-dark">
                <tr style={{ height: "30px" }}>
                  <th scope="col">#</th>
                  {/* <th scope="col">Compnay</th> */}

                  <th scope="col" style={{ width: "200px" }} className="gcode">
                    Code
                  </th>

                  <th scope="col" style={{ width: "400px" }} className="gname">
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
                {groups.map((user_group, index) => (
                  <tr key={index} style={{ height: "30px", valign: "middle" }}>
                    <th scope="row" style={{ verticalAlign: "middle" }}>
                      {index + 1}
                    </th>
                    {/* <td>{user.usr_company}</td> */}
                    <td style={{ verticalAlign: "middle" }} className="gcode">
                      {user_group.grp_code}
                    </td>
                    <td style={{ verticalAlign: "middle" }} className="gname">
                      {user_group.grp_name}
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      <input
                        type="checkbox"
                        checked={user_group.grp_enabled}
                        readOnly
                      ></input>
                    </td>
                    {/* <td style={{ verticalAlign: "middle" }}> {user.usr_group}</td> */}
                    <td>
                      <button
                        // style={{padding:"2px"}}
                        className="btn btn-primary"
                        onClick={() => editGroup(user_group.grp_code)}
                      >
                        {/* <i class="fas fa-user-edit fa-xs"></i> */}
                        <FontAwesomeIcon icon={faUserEdit} size="xs" />
                      </button>
                    </td>
                    <td>
                      {/* <button
              
                      className="btn btn-danger"
                  
                      onClick={() => delG(user_group.grp_code)}
                    >
                     
                      <FontAwesomeIcon icon={faTrashAlt} size="xs" />
                    </button> */}
                      <button
                        // type="button"
                        class="btn btn-danger"
                        data-toggle="modal"
                        data-target="#modal-danger"
                        onClick={() => delG(user_group.grp_code)}
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
                style={{ width: "110px", height: "35px", marginBottom: "23px" }}
                onClick={() => addGroup()}
              >
                Add Group
              </button>
            </div>

            <AddDepModal
              show={showModal}
              onHide={closeModal}
              onBtn1={deleteGroup}
              onBtn2={closeModal}
              currentObject={currentGroup}
              heading="Delete Group"
              msg="Are you sure you want to delete Group?"
              btn1Text="Ok"
              btn2Text="Cancel"
            />
          </div>
        </div>
      </div>
   
  );
};
export default GroupList;
