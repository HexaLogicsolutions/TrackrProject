import React, { Component } from "react";
import { Form, Alert } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { addLocationArea } from "../actions/auth";
import { updateLocationArea } from "../actions/auth";

class LocationArea extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
    // this.inputRef= React.createRef();
    this.myRefs = [];

    this.state = {
      types: [],
      title: "",
      buttonText: "",
      name: "",
      code: "",
      color: "",
      type: "0",
      variant: "",
      msg: "",
      active: false,
      editLocationArea: false,
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

  resetForm() {
    this.setState({
      name: "",
      code: "",
      type: "",
      active: false,
    });
  }

  handleBack() {
    this.props.history.goBack();
  }

  async componentDidMount() {
    console.log(this.myRefs);

    const LocationAreaCode = this.context.currentObject
      ? this.context.currentObject
      : "";
    this.state.editLocationArea = this.context.currentObject ? true : false;

    if (this.state.editLocationArea) {
      this.myRefs[1].focus();
      this.state.title = "Edit LocationArea";
      this.state.buttonText = "Update";

      //   console.log("entittysubtype Code: " + userCode);

      const url = "/api/locationarea/" + LocationAreaCode;

      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.lar_name);
          this.setState({
            code: data.lar_code,
            // type: data.lar_type,
            name: data.lar_name,
            active: data.lar_active,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.myRefs[1].focus();
      this.state.title = "New LocationArea";
      this.state.buttonText = "Add LocationArea";
    }
  }

  onSubmit = (e) => {
    console.log("submit");
    setTimeout(() => this.setState({ msg: "" }), 2000);
    e.preventDefault();
    const { name, code, type, active } = this.state;

    console.log("name " + name.trim());
    console.log("active " + active);
    if (this.state.editLocationArea) {
      console.log("in edit user");
      const newLocationArea = {
        code: code,
        type: type,
        name: name.trim(),
        active,
      };

      updateLocationArea(newLocationArea, (res) => {
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
      const newLocationArea = {
        code: code,
        type: type.trim(),
        name: name.trim(),
        active: true,
      };

      // Register
      addLocationArea(newLocationArea, (res) => {
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
            <br></br>
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
                <div className="form-group ">
                  <label
                    className={
                      !this.state.editLocationArea ? "hidden" : "labelstd"
                    }
                  >
                    Code:
                  </label>
                  <span className="myspan ">
                    <div className="form__div ">
                      <input
                        className="detail__input textsmall"
                        id="myInput"
                        name="code"
                        type={!this.state.editLocationArea ? "hidden" : "text"}
                        autoFocus={this.state.editLocationArea ? false : true}
                        // ref={this.state.editUser ? 'this.inputRef': ''}
                        disabled={this.state.editLocationArea ? true : false}
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

                <div className="form-group ">
                  <label
                    className={
                      !this.state.editLocationArea ? "hidden" : "labelstd"
                    }
                  >
                    Active:
                  </label>
                  <span className="myspan ">
                    <div className="form__div ">
                      <input
                        // className=" fadeIn second cm-toggle"

                        name="active"
                        type={
                          !this.state.editLocationArea ? "hidden" : "checkbox"
                        }
                        // type={this.state.editUser ? 'hidden': 'text'}
                        value={this.state.active ? true : false}
                        checked={this.state.active ? true : false}
                        ref={(el) => (this.myRefs[2] = el)}
                        onChange={(event) => {
                          this.setState({ active: event.target.checked });
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
                      marginBottom: "20px",
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

export default LocationArea;
