import React, { Component } from "react";
import { Form, Alert } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { addWarehouse, updateWarehouse } from "../actions/auth";

class Warehouse extends Component {
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
      active: false,
      editWarehouse: false,
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
    const url = "/api/warehouse";
    // const resp = await fetch(url);
    // const data= await resp.json();
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let warehouseFromAPI = data.map((loc) => {
          return { value: loc.whs_code, display: loc.whs_name };
        });
        this.setState({
          groups: [{ id: "0", value: "", display: "" }].concat(
            warehouseFromAPI
          ),
        });
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(this.context.currentObject);

    const loccode = this.context.currentObject
      ? this.context.currentObject
      : "";
    this.state.editWarehouse = this.context.currentObject ? true : false;

    if (this.state.editWarehouse) {
      this.myRefs[1].focus();
      this.state.title = "Edit Warehouses Type";
      this.state.buttonText = "Update";

      const url = "/api/warehouse/" + loccode;

      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.whs_name);
          this.setState({
            code: data.whs_code,
            name: data.whs_name,
            action: data.whs_action,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // this.myRefs[0].focus();
      this.state.title = "New Warehouses Type";
      this.state.buttonText = "Add";
    }
  }

  onSubmit = (e) => {
    console.log("submit");

    // this.goBack();

    setTimeout(() => this.setState({ msg: "" }), 2000);
    e.preventDefault();
    const { name, active, code } = this.state;

    console.log(this.state.editWarehouse);
    console.log("active " + active);
    console.log("code " + code);

    if (this.state.editWarehouse) {
      console.log("in location ");
      const newloc = {
        // code:code.trim(),
        code,
        name: name.trim(),
        active,
      };

      updateWarehouse(newloc, (res) => {
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
      const newloc = {
        code,
        name: name.trim(),
        active: true,
      };

      //Register
      addWarehouse(newloc, (res) => {
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
            <Form onSubmit={this.onSubmit} id="ettedit">
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
                    className={
                      !this.state.editWarehouse ? "hidden" : "labelstd"
                    }
                  >
                    Code:
                  </label>
                  <span className="myspan ">
                    <div className="form__div ">
                      <input
                        className="detail__input textsmall "
                        id="myInput"
                        type={!this.state.editWarehouse ? "hidden" : "text"}
                        name="code"
                        ref={this.state.editWarehouse ? "this.inputRef" : ""}
                        disabled={this.state.editWarehouse ? true : false}
                        // ref={(el) => (this.myRefs[0] = el)}
                        value={this.state.code}
                        onChange={this.onChange}
                      />
                    </div>
                  </span>
                </div>
                <div className="form-group">
                  <label className="labelstd">Name:</label>
                  <span className="myspan">
                    <div className="form__div">
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
                <div className="form-group">
                  <label
                    className={
                      !this.state.editWarehouse ? "hidden" : "labelstd"
                    }
                  >
                    Active:
                  </label>
                  <span className="myspan">
                    <div className="form__div">
                      <input
                        // className=" fadeIn second cm-toggle"
                        // type="checkbox"
                        name="active"
                        type={!this.state.editWarehouse ? "hidden" : "checkbox"}
                        // value={this.state.enabled}
                        checked={this.state.active}
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
                      width: "110px",
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

export default Warehouse;
