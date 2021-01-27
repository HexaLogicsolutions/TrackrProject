import React, { Component } from "react";
import { Form, Alert } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { addEntitySubType } from "../actions/auth";
import { updateEntitySubType } from "../actions/auth";

class EntitySubType extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
    // this.inputRef= React.createRef();
    // this.myRefs = [];

    this.state = {
      types: [],
      title: "",
      buttonText: "",
      name: "",
      code: "",
      type: "",
      color: "",
      variant: "",
      msg: "",
      active: false,
      editEntitySubType: false,
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
    // console.log(this.myRefs);

    // get Groups
    const url = "/api/entitytype";
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let entitytypeFromAPI = data.map((ett) => {
          return { value: ett.ett_code, display: ett.ett_name, id: ett._id };
        });
        this.setState({
          types: [{ id: "0", value: "", display: "" }].concat(
            entitytypeFromAPI
          ),
        });
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(this.context.currentObject);

    const EntitySubTypeCode = this.context.currentObject
      ? this.context.currentObject
      : "";
    this.state.editEntitySubType = this.context.currentObject ? true : false;

    if (this.state.editEntitySubType) {
      // this.myRefs[1].focus();
      this.state.title = "Edit EntitySubType";
      this.state.buttonText = "Update";

      //   console.log("entittysubtype Code: " + userCode);

      const url = "/api/entitysubtype/" + EntitySubTypeCode;

      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.est_name);
          this.setState({
            code: data.est_code,
            type: data.est_type,
            name: data.est_name,
            active: data.est_active,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // this.myRefs[1].focus();
      this.state.title = "New Entitysubtype";
      this.state.buttonText = "Add Entitysubtype";
    }
  }

  onSubmit = (e) => {
    console.log("submit");
    setTimeout(() => this.setState({ msg: "" }), 2000);
    e.preventDefault();
    const { name, code, type, active } = this.state;

    console.log(this.state.editUser);
    console.log("name " + name.trim());
    console.log("active " + active);
    if (this.state.editEntitySubType) {
      console.log("in edit user");
      const newEntitySubType = {
        code: code,
        type: type,
        name: name.trim(),
        active,
      };

      updateEntitySubType(newEntitySubType, (res) => {
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
          this.context.setCurrentColor("alert alert-danger");

          this.setState({
            msg: res.data.msg,
            variant: "danger",
            color: "alert alert-danger",
          });
          // setTimeout(() => this.setState({msg:''}), 2000);
        }
      });
    } else {
      const newEntitySubType = {
        code: code,
        type: type.trim(),
        name: name.trim(),
        active: true,
      };

      // Register
      addEntitySubType(newEntitySubType, (res) => {
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
          <Form onSubmit={this.onSubmit} id="register">
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
            {/* {this.state.msg ? (
              <Alert variant={this.state.variant}>{this.state.msg}</Alert>
            ) : null} */}

            <form-group>
              <br></br>
              <div className="form-group ">
                <label
                  className={
                    !this.state.editEntitySubType ? "hidden" : "labelstd"
                  }
                >
                  Code:
                </label>
                <span className="myspan ">
                  <div className="form__div ">
                    <input
                      // autocomplete="false"
                      className="detail__input textsmall"
                      id="myInput"
                      name="code"
                      type={!this.state.editEntitySubType ? "hidden" : "text"}
                      // autoFocus={this.state.editEntitySubType ? false : true}
                      // ref={this.state.editUser ? 'this.inputRef': ''}
                      disabled={this.state.editEntitySubType ? true : false}
                      // ref={(el) => (this.myRefs[0] = el)}
                      value={this.state.code}
                      onChange={this.onChange}
                    />
                  </div>
                </span>
              </div>

              <div className="form-group ">
                <span className="myspan ">
                  <div className="form__div">
                    <label className="labelstd">Name:</label>
                    <input
                      // autoFocus="true"
                      className="detail__input"
                      type="text"
                      name="name"
                      // type={this.state.editUser ? 'hidden': 'text'}
                      value={this.state.name}
                      // ref={(el) => (this.myRefs[1] = el)}
                      onChange={(event) => {
                        this.setState({ name: event.target.value });
                      }}
                      required
                    />
                  </div>
                </span>
              </div>

              <div className="form-group">
                <label className="labelstd">Type:</label>
                <span className="myspan">
                  <div className="form__div">
                    <select
                      className="detail__input"
                      name="type"
                      value={this.state.type}
                      onChange={this.onChange}
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
              </div>
              <div className="form-group">
                <label
                  className={
                    !this.state.editEntitySubType ? "hidden" : "labelstd"
                  }
                >
                  Active:
                </label>
                <span className="myspan">
                  <div className="form__div">
                    <input
                      // className=""
                      name="active"
                      type={
                        !this.state.editEntitySubType ? "hidden" : "checkbox"
                      }
                      // type={this.state.editUser ? 'hidden': 'text'}
                      value={this.state.active ? true : false}
                      checked={this.state.active ? true : false}
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
    );
  }
}

export default EntitySubType;
