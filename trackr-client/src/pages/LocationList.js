import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { AddDepModal } from "../components/AddDepModal";
import HashMap from "hashmap";

const LocationList = () => {
  let history = useHistory();
  const contextType = useContext(AuthContext);

  const [Location, setUser] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [variant, setVariant] = useState();
  const [color, setColor] = useState();
  const [currentUser, setCurrentUser] = useState("");
  const [locationAreaMap, setLocationAreaMap] = useState(new HashMap());

  let closeModal = () => {
    setShowModal(false);
  };

  const loadLocations = async () => {
    const result = await axios.get(contextType.dbUrl + "location");
    setUser(result.data);
  };

  useEffect(() => {
    console.log("UserList - Mount -");

    let url = "/api/locationarea";
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        var map = new HashMap();

        let locationAreaFromAPI = data.map((locArea) => {
          map.set(locArea.lar_code, locArea.lar_name);
          return { key: locArea.whs_code, display: locArea.whs_name };
        });
        console.log("groupsFromAPI:" + locationAreaFromAPI[0].value);
        // console.log("map :"+ map.size);
        // console.log("map :"+ map.get("SAL"));
        setLocationAreaMap(map);
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

    loadLocations();

    const timer = setTimeout(() => {
      setMsg("");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const editLocation = async (loc_code) => {
    console.log(`Edit ${loc_code}`);
    contextType.setCurrentObject(loc_code);
    history.push("/Location");

    //this.props.history.push("/User");
  };

  const delLocation = async (loc_code) => {
    console.log(`Del ${loc_code}`);
    //contextType.setSelectedUser(usr_code);
    setCurrentUser(loc_code);
    setShowModal(true);
  };

  const addLocation = async () => {
    contextType.setCurrentObject(null);
    history.push("/Location");
  };

  const deleteLocation = async (code) => {
    console.log("in deleteUser " + code);
    setShowModal(false);
    await axios.delete(`http://localhost:5000/api/location/${code}`);
    loadLocations();
  };

  return (
    <div className="scroll" style={{ overflowX: "auto" }}>
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
          <h3>Location List</h3>
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
              Location List
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
                  Area
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
              {Location.map((location, index) => (
                <tr key={index} style={{ height: "30px", valign: "middle" }}>
                  <th scope="row" style={{ verticalAlign: "middle" }}>
                    {index + 1}
                  </th>
                  {/* <td>{user.usr_company}</td> */}
                  <td style={{ verticalAlign: "middle" }}>
                    {location.loc_code}
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    {locationAreaMap.get(location.loc_area)}
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    {" "}
                    {location.loc_name}
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    <input
                      type="checkbox"
                      checked={location.loc_enable ? true : false}
                      readOnly
                    ></input>
                  </td>

                  <td>
                    <button
                      // style={{padding:"2px"}}
                      className="btn btn-primary"
                      onClick={() => editLocation(location.loc_code)}
                    >
                      {/* <i class="fas fa-user-edit fa-xs"></i> */}
                      <FontAwesomeIcon icon={faUserEdit} size="xs" />
                    </button>
                  </td>
                  <td>
                    {/* <button
                   
                    className="btn btn-danger"
                  
                    onClick={() => delLocation(location.loc_code)}
                  >
                   
                    <FontAwesomeIcon icon={faTrashAlt} size="xs" />
                  </button> */}
                    <button
                      // type="button"
                      class="btn btn-danger"
                      data-toggle="modal"
                      data-target="#modal-danger"
                      onClick={() => delLocation(location.loc_code)}
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
              onClick={() => addLocation()}
            >
              Add Location
            </button>
          </div>
          <AddDepModal
            show={showModal}
            onHide={closeModal}
            onBtn1={deleteLocation}
            onBtn2={closeModal}
            currentObject={currentUser}
            heading="Delete Location "
            msg="Are you sure you want to delete  this Location ?"
            btn1Text="Ok"
            btn2Text="Cancel"
          />
        </div>
      </div>
    </div>
  );
};

export default LocationList;
