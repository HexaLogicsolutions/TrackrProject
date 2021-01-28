import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { AddDepModal } from "../components/AddDepModal";
import HashMap from "hashmap";

const EntityList = () => {
  let history = useHistory();
  const contextType = useContext(AuthContext);

  const [Entity, setEntity] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [variant, setVariant] = useState();
  const [currentUser, setCurrentUser] = useState("");
  const [color, setColor] = useState();
  const [EntitySubTypeMap, setEntitySubTypeMap] = useState(new HashMap());
  const [EntityStatusMap, setEntityStatusMap] = useState(new HashMap());
  const [LocationMap, setLocationMap] = useState(new HashMap());
  // const [locationAreaMap, setLocationAreaMap] = useState(new HashMap());

  let closeModal = () => {
    setShowModal(false);
  };

  const loadEntity = async () => {
    const result = await axios.get(contextType.dbUrl + "entity");
    setEntity(result.data);
  };

  useEffect(() => {
    // console.log("UserList - Mount -");

    let url = "/api/entitysubtype";

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        var map = new HashMap();

        let entitysubtypeFromAPI = data.map((etsub) => {
          map.set(etsub.est_code, etsub.est_name);
          return { key: etsub.est_code, display: etsub.est_name };
        });
        setEntitySubTypeMap(map);
      })
      .catch((error) => {
        console.log(error);
      });
    //entity status
    let url1 = "/api/entitystatus";

    fetch(url1)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        var map = new HashMap();

        let entitystatusFromAPI = data.map((sta) => {
          map.set(sta.sta_code, sta.sta_desc);
          return { key: sta.sta_code, display: sta.sta_desc };
        });
        setEntityStatusMap(map);
      })
      .catch((error) => {
        console.log(error);
      });
    //location
    let url2 = "/api/location";

    fetch(url2)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        var map = new HashMap();

        let locationFromAPI = data.map((loc) => {
          map.set(loc.loc_code, loc.loc_name);
          return { key: loc.loc_code, display: loc.loc_name };
        });
        setLocationMap(map);
      })
      .catch((error) => {
        console.log(error);
      });
    //   url = "/api/locationarea";
    //   fetch(url)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     var map = new HashMap();

    //     let locationAreaFromAPI = data.map((locArea) => {
    //       map.set(locArea.lar_code, locArea.lar_name);
    //       return { key: locArea.whs_code, display: locArea.whs_name };
    //     });
    //     console.log("groupsFromAPI:"+ locationAreaFromAPI[0].value);
    //     // console.log("map :"+ map.size);
    //     // console.log("map :"+ map.get("SAL"));
    //     setLocationAreaMap(map);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

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

    loadEntity();

    const timer = setTimeout(() => {
      setMsg("");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const editEntity = async (ent_code) => {
    console.log(`Edit ${ent_code}`);
    contextType.setCurrentObject(ent_code);
    history.push("/Entity");

    //this.props.history.push("/User");
  };

  const delEntity = async (ent_code) => {
    console.log(`Del ${ent_code}`);
    //contextType.setSelectedUser(usr_code);
    setCurrentUser(ent_code);
    setShowModal(true);
  };

  const addEntity = async () => {
    contextType.setCurrentObject(null);
    history.push("/Entity");
  };

  const deleteEntity = async (code) => {
    console.log("in deleteUser " + code);
    setShowModal(false);
    await axios.delete(contextType.dbUrl +`entity/${code}`);
    loadEntity();
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
          <h3>Entity  List</h3>
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
              Entity List
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
                <th scope="col" style={{ width: "150px" }}>
                  Code
                </th>
                <th scope="col" style={{ width: "150px" }}>
                  Extcode
                </th>
                <th scope="col" style={{ width: "150px" }}>
                  Serial
                </th>
                <th scope="col" style={{ width: "400px" }}>
                  Name
                </th>
                <th scope="col" style={{ width: "200px" }}>
                  Subtype
                </th>
                {/* <th scope="col">password</th> */}
                <th scope="col" style={{ width: "200px" }}>
                  Location
                </th>
                <th scope="col" style={{ width: "200px" }}>
                  Status
                </th>
                <th scope="col" style={{ width: "10px" }}></th>
                <th scope="col" style={{ width: "10px" }}></th>
              </tr>
            </thead>
            <tbody>
              {Entity.map((entity, index) => (
                <tr key={index} style={{ height: "30px", valign: "middle" }}>
                  <th scope="row" style={{ verticalAlign: "middle" }}>
                    {index + 1}
                  </th>
                  {/* <td>{user.usr_company}</td> */}
                  <td style={{ verticalAlign: "middle" }}>{entity.ent_code}</td>
                  <td style={{ verticalAlign: "middle" }}>
                    {" "}
                    {entity.ent_extcode}
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    {" "}
                    {entity.ent_serial}
                  </td>
                  <td style={{ verticalAlign: "middle" }}>{entity.ent_desc}</td>

                  <td style={{ verticalAlign: "middle" }}>
                    {EntitySubTypeMap.get(entity.ent_subtype)}
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    {LocationMap.get(entity.ent_location)}
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    {EntityStatusMap.get(entity.ent_status)}
                  </td>
                  {/* <td style={{ verticalAlign: "middle" }}>
                  <input
                    type="checkbox"
                    checked={location.loc_enable ? true : false}
                    readOnly
                  ></input>
                </td> */}

                  <td>
                    <button
                      // style={{padding:"2px"}}
                      className="btn btn-primary"
                      onClick={() => editEntity(entity.ent_code)}
                    >
                      {/* <i class="fas fa-user-edit fa-xs"></i> */}
                      <FontAwesomeIcon icon={faUserEdit} size="xs" />
                    </button>
                  </td>
                  <td>
                    {/* <button
                  
                    className="btn btn-danger"
                  
                    onClick={() => delEntity(entity.ent_code)}
                  >
                   
                    <FontAwesomeIcon icon={faTrashAlt} size="xs" />
                  </button> */}
                    <button
                      // type="button"
                      class="btn btn-danger"
                      data-toggle="modal"
                      data-target="#modal-danger"
                      onClick={() => delEntity(entity.ent_code)}
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
              style={{ width: "200px", height: "35px", marginBottom: "20px" }}
              onClick={() => addEntity()}
            >
              Add Entity
            </button>
          </div>
          <AddDepModal
            show={showModal}
            onHide={closeModal}
            onBtn1={deleteEntity}
            onBtn2={closeModal}
            currentObject={currentUser}
            heading="Delete Entity"
            msg="Are you sure you want to delete  this Entity ?"
            btn1Text="Ok"
            btn2Text="Cancel"
          />
        </div>
      </div>
    </div>
  );
};

export default EntityList;
