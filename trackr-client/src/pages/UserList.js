import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { Alert } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTrashAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { AddDepModal } from "../components/AddDepModal";
import HashMap from "hashmap";

const UserList = () => {
  let history = useHistory();
  const contextType = useContext(AuthContext);

  const [users, setUser] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [variant, setVariant] = useState();
  const [color, setColor] = useState();
  const [currentUser, setCurrentUser] = useState("");
  const [groupMap, setGroupMap] = useState(new HashMap());

  let closeModal = () => {
    setShowModal(false);
  };

  const loadUsers = async () => {
    const result = await axios.get(contextType.dbUrl + "users");
    setUser(result.data);
  };

  useEffect(() => {
    console.log("UserList - Mount -");

    let url = "/api/groups";

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        var map = new HashMap();
        let groupsFromAPI = data.map((grp) => {
          map.set(grp.grp_code, grp.grp_name);
          return { key: grp.grp_code, display: grp.grp_name };
        });
        console.log("groupsFromAPI:" + groupsFromAPI[0].value);
        console.log("map :" + map.size);
        console.log("map :" + map.get("SAL"));
        setGroupMap(map);
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
    loadUsers();
    const timer = setTimeout(() => {
      setMsg("");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    console.log("mymap: " + groupMap.size);
  }, [groupMap]);

  const editUser = async (usr_code) => {
    console.log(`Edit ${usr_code}`);
    contextType.setCurrentObject(usr_code);
    history.push("/User");

    //this.props.history.push("/User");
  };

  const delUser = async (usr_code) => {
    console.log(`Del ${usr_code}`);
    //contextType.setSelectedUser(usr_code);
    setCurrentUser(usr_code);
    setShowModal(true);
  };

  const addUser = async () => {
    contextType.setCurrentObject(null);
    history.push("/User");
  };

  const deleteUser = async (code) => {
    console.log("in deleteUser " + code);
    setShowModal(false);
    // await axios.delete(`http://localhost:5000/api/users/${code}`);
    
    await axios.delete(contextType.dbUrl +`users/${code}`);
    loadUsers();
  };

  return (
    <div style={{ overflowX: "auto" }}>
      {console.log("UserList - Render")}
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

      <div className="">
        {/* <center>
        <h3>User List</h3>
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
              User List
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
                {/* <th scope="col">password</th> */}
                <th scope="col" style={{ width: "350px" }}>
                  Email
                </th>
                <th scope="col" style={{ width: "100px" }}>
                  Group
                </th>
                <th scope="col" style={{ width: "100px" }}>
                  Active
                </th>
                <th scope="col" style={{ width: "10px" }}></th>
                <th scope="col" style={{ width: "10px" }}></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} style={{ height: "30px", valign: "middle" }}>
                  <th scope="row" style={{ verticalAlign: "middle" }}>
                    {index + 1}
                  </th>
                  {/* <td>{user.usr_company}</td> */}
                  <td style={{ verticalAlign: "middle" }}>{user.usr_code}</td>
                  <td style={{ verticalAlign: "middle" }}>{user.usr_name}</td>
                  <td style={{ verticalAlign: "middle" }}> {user.usr_email}</td>
                  <td style={{ verticalAlign: "middle" }}>
                    {" "}
                    {groupMap.get(user.usr_group)}
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    <input
                      type="checkbox"
                      checked={user.usr_active ? true : false}
                      readOnly
                    ></input>
                  </td>

                  <td>
                    <button
                      // style={{padding:"2px"}}
                      className="btn btn-primary"
                      onClick={() => editUser(user.usr_code)}
                    >
                      {/* <i class="fas fa-user-edit fa-xs"></i> */}
                      <FontAwesomeIcon icon={faUserEdit} size="xs" />
                    </button>
                  </td>
                  <td>
                    {/* <button
                   
                    className="btn btn-danger"
                  
                    onClick={() => delUser(user.usr_code)}
                  >
               
                    <FontAwesomeIcon icon={faTrashAlt} size="xs" />
                  </button> */}

                    <button
                      // type="button"
                      class="btn btn-danger"
                      data-toggle="modal"
                      data-target="#modal-danger"
                      onClick={() => delUser(user.usr_code)}
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
              style={{ width: "110px", height: "35px", marginBottom: "15px" }}
              onClick={() => addUser()}
            >
              Add User
            </button>
          </div>
          <AddDepModal
            show={showModal}
            onHide={closeModal}
            onBtn1={deleteUser}
            onBtn2={closeModal}
            currentObject={currentUser}
            heading="Delete User"
            msg="Are you sure you want to delete user?"
            btn1Text="Ok"
            btn2Text="Cancel"
          />
        </div>
      </div>
    </div>

    /////////////////////////////////////////////////////////////////////
  );
};
export default UserList;
