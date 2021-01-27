import React, { Component } from "react";
import { Form, Alert } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { addGroup, updateGroup } from "../actions/auth";

class Group extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
    // this.inputRef= React.createRef();
    this.myRefs = [];

    this.state = {
      title: "",
      buttonText: "",
      name: "",
      code: "",
      color: "",
      variant: null,
      msg: "",
      enabled: false,
      editGroup: false,
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
      enabled: false,
    });
  }

  handleBack() {
    this.props.history.goBack();
  }

  async componentDidMount() {
    console.log(this.myRefs);

    // const url = "/api/groups";
    // fetch(url)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     let groupsFromAPI = data.map((grp) => {
    //       return { value: grp.grp_code, display: grp.grp_name };
    //     });
    //     this.setState({
    //       groups: [{ id: "0", value: "", display: "" }].concat(groupsFromAPI),
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    console.log(this.context.currentObject);

    const groupCode = this.context.currentObject
      ? this.context.currentObject
      : "";
    this.state.editGroup = this.context.currentObject ? true : false;

    if (this.state.editGroup) {
      this.myRefs[1].focus();
      this.state.title = "Edit Group";
      this.state.buttonText = "Update";

      console.log("User Code: " + groupCode);

      const url = "/api/groups/" + groupCode;

      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.grp_name);
          this.setState({
            code: data.grp_code,
            name: data.grp_name,
            enabled: data.grp_enabled,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.myRefs[0].focus();
      this.state.title = "New Group";
      this.state.buttonText = "Add";
    }
  }

  onSubmit = (e) => {
    console.log("submit");

    // this.goBack();

    setTimeout(() => this.setState({ msg: "" }), 2000);
    e.preventDefault();
    const { name, enabled, code } = this.state;

    console.log(this.state.editGroup);
    console.log("group " + code);

    const newGroup = {
      code: code.trim(),
      name: name.trim(),
      enabled,
    };

    if (this.state.editGroup) {
      console.log("in edit Group");

      updateGroup(newGroup, (res) => {
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
            variant: res.data.variant,
            color: "alert alert-danger",
          });
          // setTimeout(() => this.setState({msg:''}), 2000);
        }
      });
    } else {
      // Register
      addGroup(newGroup, (res) => {
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
            <Form onSubmit={this.onSubmit} id="Groupregister">
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
              <div style={{ marginBottom: "34px" }}>
                <div className="form-group ">
                  {/* <label className="labelstd">Code:</label>
              
              <input
                // className="myinput fadeIn second"
                className="detail__input"
                id="myInput"
                type="text"
                name="code"
                autoFocus={this.state.editUser ? false : true}
                // ref={this.state.editUser ? 'this.inputRef': ''}
                disabled={this.state.editUser ? true : false}
                ref={(el) => (this.myRefs[0] = el)}
                value={this.state.code}
                onChange={this.onChange}
                required
              />
              <br></br> */}
                  <label className="labelstd">Code:</label>
                  <span className="myspan ">
                    <div className="form__div ">
                      <input
                        class="detail__input textsmall "
                        type="text"
                        // className="form__input"
                        placeholder="Code"
                        ref={(el) => (this.myRefs[0] = el)}
                        id="myInput"
                        name="code"
                        autoFocus={this.state.editUser ? false : true}
                        // ref={this.state.editUser ? 'this.inputRef': ''}
                        disabled={this.state.editUser ? true : false}
                        // ref={(el) => (this.myRefs[0] = el)}
                        value={this.state.code}
                        onChange={this.onChange}
                        required
                      />
                    </div>
                  </span>

                  {/* <label className="labelstd">Name:</label>
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
              /> */}

                  <div className="form-group" style={{ marginTop: "-19px" }}>
                    <label className="labelstd">Name:</label>
                    <span className="myspan">
                      <div className="form__div">
                        <input
                          class="detail__input"
                          type="text"
                          placeholder="Name "
                          ref={(el) => (this.myRefs[1] = el)}
                          name="name"
                          value={this.state.name}
                          onChange={(event) => {
                            this.setState({ name: event.target.value });
                          }}
                          required
                        />
                      </div>
                    </span>

                    <div className="form-group" style={{ marginTop: "-19px" }}>
                      <label className="labelstd">Enabled:</label>
                      <input
                        // className="detail__input"
                        type="checkbox"
                        name="enabled"
                        // type={this.state.editUser ? 'hidden': 'text'}
                        // value={this.state.enabled}
                        checked={this.state.enabled}
                        ref={(el) => (this.myRefs[2] = el)}
                        onChange={(event) => {
                          this.setState({ enabled: event.target.checked });
                        }}
                      ></input>

                      <br></br>
                      <br></br>
                      <center>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          style={{
                            width: "110px",
                            height: "35px",
                            marginRight: "20px",
                          }}
                        >
                          {this.state.buttonText}
                        </button>
                      </center>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Group;
