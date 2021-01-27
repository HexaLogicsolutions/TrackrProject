import React, { Component } from "react";
import { Form, Alert } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { addLocation } from "../actions/auth";
import { updateLocation } from "../actions/auth";

class Location extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
    // this.inputRef= React.createRef();
    this.myRefs = [];

    this.state = {
      types: [],
      allAreas: [],
      selectedAreas: [{ id: "0", value: "", display: "", type: "" }],
      title: "",
      buttonText: "",
      name: "",
      code: "",
      type: "0",
      color: "",
      area: "",
      variant: "",
      msg: "",
      enable: false,
      editLocation: false,
      token: localStorage.getItem("token"),
    };
  }

  onChange = (e) => {
    if (e.target.name === "code") {
      this.setState({
        [e.target.name]: e.target.value.toUpperCase(),
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  populateSelectedAreas = () => {
    this.setState({
      selectedAreas: [{ id: "0", value: "", display: "", type: "" }],
    });
    this.state.allAreas.map((locArea) => {
      if (locArea.type == this.state.type) {
        // console.log("Equal: "+locType.type);
        this.setState((previousState) => ({
          selectedAreas: [...previousState.selectedAreas, locArea],
        }));
      }
      // else{
      //   console.log("Not Equal: "+locType.type);
      // }
    });
  };

  onTypeChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log("TypeChange: " + this.state.type);
      this.populateSelectedAreas();
    });

    // refresh areas
  };

  resetForm() {
    this.setState({
      name: "",
      code: "",
      type: "0",
      area: "",
      selectedAreas: [],
      enable: false,
    });
  }

  handleBack() {
    this.props.history.goBack();
  }

  async componentDidMount() {
    const url2 = "/api/locationarea";
    fetch(url2)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let LocationAreaFromAPI = data.map((loc) => {
          return {
            value: loc.lar_code,
            display: loc.lar_name,
            id: loc._id,
            // type: loc.lar_type,
          };
        });
        this.setState({
          allAreas: [{ id: "0", value: "", display: "", type: "" }].concat(
            LocationAreaFromAPI
          ),
        });
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(this.context.currentObject);

    const LocationCode = this.context.currentObject
      ? this.context.currentObject
      : "";
    this.state.editLocation = this.context.currentObject ? true : false;

    if (this.state.editLocation) {
      this.myRefs[1].focus();
      this.state.title = "Edit Location";
      this.state.buttonText = "Update";

      //   console.log("entittysubtype Code: " + userCode);

      const url = "/api/location/" + LocationCode;

      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.loc_name);
          this.setState(
            {
              code: data.loc_code,
              // type: data.loc_type,
              area: data.loc_area,
              name: data.loc_name,
              enable: data.loc_enable,
            },
            () => {
              console.log("Location fetched from server");
              console.log("AllAreas size: " + this.state.allAreas.length);
              console.log("type: " + this.state.type);
              this.populateSelectedAreas();
            }
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.myRefs[1].focus();
      this.state.title = "New Location";
      this.state.buttonText = "Add Location";
    }
  }

  onSubmit = (e) => {
    console.log("submit");
    setTimeout(() => this.setState({ msg: "" }), 2000);
    e.preventDefault();
    const { name, code, type, area, enable } = this.state;

    console.log("name " + name.trim());
    console.log("enable " + enable);
    if (this.state.editLocation) {
      const newLocation = {
        code: code,
        type: type,
        area: area,
        name: name.trim(),
        enable,
      };

      updateLocation(newLocation, (res) => {
        if (res.data.success) {
          this.context.setCurrentMsg(res.data.msg);
          this.context.setCurrentVariant("success");
          this.context.setCurrentColor("alert alert-success");
          this.handleBack();
          // this.setState({
          //   msg: res.data.msg,

          //   variant: "success",
          // });
          this.resetForm();
          // setTimeout(() => this.setState({msg:''}), 2000);
        } else {
          this.context.setCurrentMsg(res.data.msg);
          this.context.setCurrentVariant("danger");
          this.context.setCurrentColor("alert alert-success");

          this.setState({
            msg: res.data.msg,
            variant: "danger",
            color: "alert alert-danger",
          });
          // setTimeout(() => this.setState({msg:''}), 2000);
        }
      });
    } else {
      const newLocation = {
        code: code,
        type: type.trim(),
        name: name.trim(),
        area: area.trim(),
        enable: true,
      };

      // Register
      addLocation(newLocation, (res) => {
        if (res.data.success) {
          this.context.setCurrentMsg(res.data.msg);
          this.context.setCurrentVariant("success");
          this.context.setCurrentColor("alert alert-success");
          this.handleBack();
          // this.setState({
          //   msg: res.data.msg,
          //   variant: "success",
          // });

          // setTimeout(() => this.setState({msg:''}), 2000);
          this.resetForm();
        } else {
          this.context.setCurrentMsg(res.data.msg);
          this.context.setCurrentVariant("danger");
          this.setState({
            msg: res.data.msg,
            variant: "danger",
            color: "alert alert-danger",
          });
          // setTimeout(() => this.setState({msg:''}), 2000);
        }
      });
    }
  };

  render() {
    //console.log(this.state.groups);
    return (
      <div>
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
              {this.state.title}
            </h4>
          </center>
        </div>
        <div
          className="container header detail"
          style={{ borderRadius: "0px 0px 20px 20px" }}
        >
          <div>
            <Form onSubmit={this.onSubmit} id="register">
              {/* {this.state.msg ? (
              <Alert variant={this.state.variant}>{this.state.msg}</Alert>
            ) : null} */}
              {this.state.msg ? (
                // <Alert variant={this.state.variant}>{this.state.msg}</Alert>
                <div class={this.state.color}>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="alert"
                    aria-hidden="true"
                    color={this.state.variant}
                  >
                    &times;
                  </button>
                  <h4>
                    <i class="icon fa fa-info"></i> {this.state.msg}
                  </h4>
                </div>
              ) : null}

              <form-group>
                <br></br>
                <div className="form-group ">
                  <label
                    className={!this.state.editLocation ? "hidden" : "labelstd"}
                  >
                    Code:
                  </label>
                  <span className="myspan ">
                    <div className="form__div ">
                      <input
                        className="detail__input textsmall"
                        id="myInput"
                        name="code"
                        type={!this.state.editLocation ? "hidden" : "text"}
                        autoFocus={this.state.editLocation ? false : true}
                        // ref={this.state.editUser ? 'this.inputRef': ''}
                        disabled={this.state.editLocation ? true : false}
                        value={this.state.code}
                        onChange={this.onChange}
                        required
                      />
                    </div>
                  </span>
                </div>
                <div className="form-group ">
                  <label className="labelstd">Name:</label>
                  <span className="myspan ">
                    <div className="form__div ">
                      <input
                        className="detail__input"
                        type="text"
                        name="name"
                        // type={this.state.editUser ? 'hidden': 'text'}
                        value={this.state.name}
                        ref={(el) => (this.myRefs[1] = el)}
                        onChange={(event) => {
                          this.setState({ name: event.target.value });
                        }}
                        required
                      />
                    </div>
                  </span>
                </div>
                {/* <div className="form-group ">
              
              <label className="labelstd">Type:</label>
              <span className="myspan ">
                        <div className="form__div ">
              <select
                className="detail__input"
                name="type"
                value={this.state.type}
                // onChange={this.onTypeChange}
                required
              >
                {this.state.types.map((type) => (
                  <option key={type.id} value={type.value}>
                    {type.display}
                  </option>
                ))}
              </select>
              </div>
              </span>
              </div> */}
                <div className="form-group ">
                  <label className="labelstd">Area:</label>
                  <span className="myspan ">
                    <div className="form__div ">
                      <select
                        className="detail__input"
                        name="area"
                        value={this.state.area}
                        onChange={this.onChange}
                        required
                      >
                        {this.state.allAreas.map((area) => (
                          <option key={area.id} value={area.value}>
                            {area.display}
                          </option>
                        ))}
                      </select>
                    </div>
                  </span>
                </div>
                <div className="form-group ">
                  <label
                    className={!this.state.editLocation ? "hidden" : "labelstd"}
                  >
                    Enable:
                  </label>
                  <span className="myspan ">
                    <div className="form__div ">
                      <input
                        // className=" fadeIn second cm-toggle"
                        // type="checkbox"
                        name="enable"
                        type={!this.state.editLocation ? "hidden" : "checkbox"}
                        // type={this.state.editUser ? 'hidden': 'text'}
                        value={this.state.enable ? true : false}
                        checked={this.state.enable ? true : false}
                        ref={(el) => (this.myRefs[2] = el)}
                        onChange={(event) => {
                          this.setState({ enable: event.target.checked });
                        }}
                      ></input>
                    </div>
                  </span>
                </div>

                <center>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      width: "200px",
                      height: "35px",
                      marginBottom: "35px",
                    }}
                  >
                    {this.state.buttonText}
                  </button>
                </center>
              </form-group>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Location;
