import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { addUser } from "../actions/auth";
import { updateUser } from "../actions/auth";

class User extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
    // this.inputRef= React.createRef();
    this.myRefs = [];

    this.state = {
      groups: [],
      title: "",
      buttonText: "",
      name: "",
      code: "",
      email: "",
      group: "",
      password: "",
      confirmpassword: "",
      variant: "",
      color: "",
      msg: "",
      active: false,
      editUser: false,
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
      email: "",
      group: "",
      password: "",
      confirmpassword: "",
      active: false,
    });
  }

  handleBack() {
    this.props.history.goBack();
  }

  async componentDidMount() {
    console.log(this.myRefs);
    // this.inputRef.current.focus()
    // console.log(this.inputRef)
    // get Groups
    const url = "/api/groups";
    // const resp = await fetch(url);
    // const data= await resp.json();
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let groupsFromAPI = data.map((grp) => {
          return { value: grp.grp_code, display: grp.grp_name, id: grp._id };
        });
        this.setState({
          groups: [{ id: "0", value: "", display: "" }].concat(groupsFromAPI),
        });
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(this.context.currentObject);

    const userCode = this.context.currentObject
      ? this.context.currentObject
      : "";
    this.state.editUser = this.context.currentObject ? true : false;

    if (this.state.editUser) {
      this.myRefs[1].focus();
      this.state.title = "Edit User";
      this.state.buttonText = "Update";

      console.log("User Code: " + userCode);

      const url = "/api/users/" + userCode;

      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.usr_name);
          this.setState({
            code: data.usr_code,
            name: data.usr_name,
            email: data.usr_email,
            group: data.usr_group,
            active: data.usr_active,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.myRefs[0].focus();
      this.state.title = "New User";
      this.state.buttonText = "Add User";
    }
  }

  onSubmit = (e) => {
    console.log("submit");
    setTimeout(() => this.setState({ msg: "" }), 2000);
    e.preventDefault();
    const {
      name,
      email,
      password,
      code,
      group,
      active,
      confirmpassword,
    } = this.state;

    console.log(this.state.editUser);
    console.log("name " + name.trim());
    console.log("active " + active);
    if (this.state.editUser) {
      console.log("in edit user");
      const newUser = {
        code: code.trim(),
        name: name.trim(),
        email: email.trim(),
        group: group.trim(),
        active,
      };

      updateUser(newUser, (res) => {
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
      const newUser = {
        code: code.trim(),
        name: name.trim(),
        password: password.trim(),
        email: email.trim(),
        group: group.trim(),
        active,
      };

      // validation

      if (password !== confirmpassword) {
        this.setState({
          msg: "Passwords do not match.",
          variant: "danger",
          color: "alert alert-danger",
        });
        // setTimeout(() => this.setState({msg:''}), 2000);
        return;
      }

      // Register
      addUser(newUser, (res) => {
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
          this.context.setCurrentVariant("alert");
          this.setState({
            msg: res.data.msg,
            variant: res.data.variant,
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

              {/* <Form.Group>
                <div>
                <center>
                  <h4>{this.state.title}</h4>
                </center>
                <hr className="hor"></hr>
                </div>
              </Form.Group> */}

              <form-group>
                <div className="myform ">
                  {/* <label className="mylabel1">Code:</label>
              <input
                className="myinput fadeIn second"
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
              /> */}
                  <br></br>

                  <div className="form-group ">
                    <label className="labelstd">Code:</label>
                    <span className="myspan ">
                      <div className="form__div ">
                        <input
                          class="detail__input textsmall "
                          type="text"
                          // className="form__input"
                          placeholder="Code"
                          ref={(el) => (this.myRefs[0] = el)}
                          // className="myinput fadeIn second"

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

                    {/*  */}
                  </div>

                  {/* <label className="mylabel">Name:</label>
              <input
                className="myinput fadeIn second"
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

                  <div className="form-group">
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
                  </div>

                  <div
                    style={{
                      display: this.state.editUser ? "none" : "",
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    {/* <br></br> */}
                    {/* <label className={this.state.editUser ? "ey" : "mylabel"}>
                  Password:
                </label>
                <input
                  className="myinput fadeIn second"
                  type="password"
                  
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  required={!this.state.editUser}
                /> */}
                    <div className="form-group">
                      <label className="labelstd">Password1:</label>
                      <span className="myspan">
                        <div className="form__div">
                          <input
                            className="detail__input textstd"
                            placeholder="Password "
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            required={!this.state.editUser}
                          />
                          {/* <label htmlFor className="form__label mylabel">
                          Password
                        </label> */}
                        </div>
                      </span>
                    </div>
                    {/* <label className={this.state.editUser ? "ey" : "mylabel"}>
                  {" "}
                  Confirm password:
                </label>
                <input
                  className="myinput fadeIn second"
                  type="password"
        
                  name="confirmpassword"
                  value={this.state.confirmpassword}
                  onChange={this.onChange}
                 
                /> */}
                    <div className="form-group">
                      <label className="labelstd">password2:</label>
                      <span className="myspan">
                        <div className="form__div">
                          <input
                            className="detail__input textstd"
                            placeholder=" Confirm Password"
                            type="password"
                            name="confirmpassword"
                            value={this.state.confirmpassword}
                            onChange={this.onChange}
                          />
                          {/* <label htmlFor className="form__label mylabel">
                          confirm password
                        </label> */}
                        </div>
                      </span>
                    </div>
                  </div>
                  {/* <label className="mylabel">Email:</label>
              <input
                className="myinput fadeIn second"
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
              /> */}

                  <div className="form-group">
                    <label className="labelstd">Email:</label>
                    <span className="myspan">
                      <div className="form__div">
                        <input
                          className="detail__input textstd"
                          placeholder="Email "
                          type="email"
                          name="email"
                          value={this.state.email}
                          onChange={this.onChange}
                        />
                        {/* <label htmlFor className="form__label mylabel">
                        Email
                      </label> */}
                      </div>
                    </span>
                  </div>
                  {/*  */}

                  {/* <label className="mylabel">Group:</label>
              <select
                className="myselect myinput fadeIn second"
                name="group"
                value={this.state.group}
                onChange={this.onChange}
                required
              >
                {this.state.groups.map((group) => (
                  <option key={group.id} value={group.value}>
                    {group.display}
                  </option>
                ))}
              </select> */}
                  <div className="form-group">
                    <label className="labelstd">Group:</label>
                    <span className="myspan">
                      <div className="form__div">
                        {/* <input type="text" className="form__input" placeholder=" " /> */}
                        <select
                          className="detail__input textstd"
                          placeholder="Group"
                          // style={{ height: "58px" }}
                          name="group"
                          value={this.state.group}
                          onChange={this.onChange}
                     
                        >
                          {this.state.groups.map((group) => (
                            <option key={group.id} value={group.value}>
                              {group.display}
                            </option>
                          ))}
                        </select>

                        {/* <label htmlFor className="form__label mylabel">
                        Group
                      </label> */}
                      </div>
                    </span>
                  </div>
                  <div className="form-group">
                    <label className="labelstd">Active:</label>
                    <input
                      // className=" fadeIn second cm-toggle"
                      type="checkbox"
                      style={{ marginLeft: "9px" }}
                      // className="form-control"

                      name="active"
                      // type={this.state.editUser ? 'hidden': 'text'}
                      value={this.state.active ? true : false}
                      checked={this.state.active ? true : false}
                      ref={(el) => (this.myRefs[2] = el)}
                      onChange={(event) => {
                        this.setState({ active: event.target.checked });
                      }}
                    ></input>
                  </div>

                  <br></br>
                  <br></br>
                  <br></br>

                  <center>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{
                        borderRadius: "5px",
                        width: "110px",
                        height: "35px",
                      }}
                    >
                      {this.state.buttonText}
                    </button>
                    {/*  */}
                  </center>
                  <br></br>
                </div>
              </form-group>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
