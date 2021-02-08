import React, { Component } from "react";
import { Form, Alert } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { addEntity } from "../actions/auth";
import { updateEntity } from "../actions/auth";

class Entity extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
    // this.inputRef= React.createRef();
    this.myRefs = [];

    this.state = {
      types: [],
      allSubtypes: [],
      selectedSubtypes: [{ id: "0", value: "", display: "", type: "" }],
      locations: [],
      brands: [],
      statuss: [],
      materials: [],
      title: "",
      buttonText: "",
      desc: "",
      serial: "",
      price: "",
      material: "",
      code: "",
      color: "",
      extcode: "",
      epc: "",
      type: "",
      subtype: "",
      brand: "",
      status: "",
      location: "",
      weight: "",
      purity: "",
      lastseen: "",
      duration: "",
      variant: "",
      msg: "",
      editEntity: false,
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

  populateSelectedSubtype = () => {
    this.setState({
      selectedSubtypes: [{ id: "0", value: "", display: "", type: "" }],
    });
    this.state.allSubtypes.map((subType) => {
      if (subType.type == this.state.type) {
        this.setState((previousState) => ({
          selectedSubtypes: [...previousState.selectedSubtypes, subType],
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
      this.populateSelectedSubtype();
    });

    // refresh areas
  };

  resetForm() {
    this.setState({
      desc: "",
      serial: "",
      price: "",
      code: "",
      extcode: "",
      epc: "",
      type: "",
      subtype: "",
      brand: "",
      selectedSubtypes: [],
      status: "",
      material: "",
      location: "",
      weight: "",
      purity: "",
      lastseen: "",
      duration: "",
    });
  }

  validation() {
    this.props.history.goBack();
  }

  handleBack() {
    this.props.history.goBack();
  }

  async componentDidMount() {
    // //subtype
    // console.log(this.myRefs);
    //  const url1 = "/api/entitysubtype";
    // fetch(url1)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     let subtypeAPI = data.map((etsub) => {
    //       return { value: etsub.est_code, display: etsub.est_name, id: etsub._id };
    //     });
    //     this.setState({
    //       subtypes: [{ id: "0", value: "", display: "" }].concat(subtypeAPI),
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    //Brand
    console.log(this.myRefs);
    const url5 = "/api/brand";
    fetch(url5)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let brandsFromAPI = data.map((brn) => {
          return { value: brn.brn_code, display: brn.brn_name, id: brn._id };
        });
        this.setState({
          brands: [{ id: "0", value: "", display: "" }].concat(brandsFromAPI),
        });
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(this.myRefs);
    //   //location
    console.log(this.myRefs);
    const url4 = "/api/location";
    fetch(url4)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let locationFromAPI = data.map((loc) => {
          return { value: loc.loc_code, display: loc.loc_name, id: loc._id };
        });
        this.setState({
          locations: [{ id: "0", value: "", display: "" }].concat(
            locationFromAPI
          ),
        });
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(this.myRefs);
    // get Groups
    const url = "/api/entitytype";
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let EntityTypeFromAPI = data.map((ett) => {
          return { value: ett.ett_code, display: ett.ett_name, id: ett._id };
        });
        this.setState({
          types: [{ id: "0", value: "", display: "" }].concat(
            EntityTypeFromAPI
          ),
        });
      })
      .catch((error) => {
        console.log(error);
      });
    const url2 = "/api/entitysubtype";
    fetch(url2)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let SubtypeFromAPI = data.map((est) => {
          return {
            value: est.est_code,
            display: est.est_name,
            id: est._id,
            type: est.est_type,
          };
        });
        this.setState({
          allSubtypes: [{ id: "0", value: "", display: "", type: "" }].concat(
            SubtypeFromAPI
          ),
        });
      })
      .catch((error) => {
        console.log(error);
      });
    //status
    console.log(this.myRefs);
    const url3 = "/api/entitystatus";
    fetch(url3)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let statusFromAPI = data.map((sta) => {
          return { value: sta.sta_code, display: sta.sta_desc, id: sta._id };
        });
        this.setState({
          statuss: [{ id: "0", value: "", display: "" }].concat(statusFromAPI),
        });
      })
      .catch((error) => {
        console.log(error);
      });

    //material
    console.log(this.myRefs);
    const url6 = "/api/material";
    fetch(url6)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let materialFromAPI = data.map((mat) => {
          return { value: mat.mat_code, display: mat.mat_name, id: mat._id };
        });
        this.setState({
          materials: [{ id: "0", value: "", display: "" }].concat(
            materialFromAPI
          ),
        });
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(this.context.currentObject);

    const EntityCode = this.context.currentObject
      ? this.context.currentObject
      : "";
    this.state.editEntity = this.context.currentObject ? true : false;

    if (this.state.editEntity) {
      this.myRefs[1].focus();
      this.state.title = "Edit Entity";
      this.state.buttonText = "Update";

      console.log("User Code: " + EntityCode);

      const url = "/api/entity/" + EntityCode;

      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.ent_desc);
          this.setState(
            {
              code: data.ent_code,
              extcode: data.ent_extcode,
              epc: data.ent_epc,
              desc: data.ent_desc,
              serial: data.ent_serial,
              price: data.ent_price,
              type: data.ent_type,
              subtype: data.ent_subtype,
              brand: data.ent_brand,
              status: data.ent_status,
              material: data.ent_material,
              location: data.ent_location,
              weight: data.ent_weight,
              purity: data.ent_purity,
              lastseen: data.ent_lastseen,
              duration: data.ent_duration,
            },
            () => {
              this.populateSelectedSubtype();
            }
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.myRefs[0].focus();
      this.state.title = "New Entity";
      this.state.buttonText = "Add Entity";
    }
  }

  validate = () => {
    if (isNaN(this.state.weight)) {
      this.setState({
        msg: "Weight should always be a number",
        variant: "danger",
      });
      return false;
    }
   
    if (isNaN(this.state.purity)) {
      this.setState({
        msg: "Purity should always be a number",
        variant: "danger",
      });
      return false;
    }
    return true;
  };

  onSubmit = (e) => {
    console.log("submit");
    setTimeout(() => this.setState({ msg: "" }), 2000);
    e.preventDefault();
    const {
      code,
      extcode,
      epc,
      desc,
      serial,
      price,
      material,
      type,
      subtype,
      brand,
      status,
      location,
      weight,
      purity,
      lastseen,
      duration,
    } = this.state;

    console.log(this.state.editEntity);
    console.log("desc " + desc.trim());

    if (!this.validate()) {
      return;
    }

    if (this.state.editEntity) {
      const newEntity = {
        // code:code.trim(),
        // name:name.trim(),
        // email:email.trim(),
        // group:group.trim(),
        // active
        code: code,
        extcode: extcode,
        epc: epc,
        desc: desc,
        serial: serial,
        price: price,
        type: type,
        subtype: subtype,
        brand: brand,
        status: status,
        material: material,
        location: location,
        weight: weight,
        purity: purity,
        lastseen: lastseen,
        duration: duration,
      };

      updateEntity(newEntity, (res) => {
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
      const newEntity = {
        // code:code.trim(),
        // name:name.trim(),
        // password:password.trim(),
        // email:email.trim(),
        // group:group.trim(),
        // active
        code: code,
        extcode: extcode,
        epc: epc,
        desc: desc,
        serial: serial,
        price: price,
        material: material,
        type: type,
        subtype: subtype,
        brand: brand,
        status: status,
        location: location,
        weight: weight,
        purity: purity,
        lastseen: lastseen,
        duration: duration,
      };

      // Register
      addEntity(newEntity, (res) => {
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
              {/* 
            <Form.Group>
              <center>
                <h4>{this.state.title}</h4>
              </center>
            </Form.Group> */}

              <form-group>
                <div>
                  <div className="two">
                    <div className="form-group ">
                      <label className="labelstd">Code:</label>
                      <span className="myspan ">
                        <div className="form__div ">
                          <input
                            className="detail__input textsmall"
                            id="myInput"
                            type="text"
                            name="code"
                            autoFocus={this.state.editEntity ? false : true}
                            ref={this.state.editUser ? "this.inputRef" : ""}
                            disabled={this.state.editEntity ? true : false}
                            ref={(el) => (this.myRefs[0] = el)}
                            value={this.state.code}
                            onChange={this.onChange}
                            required
                          />
                        </div>
                      </span>
                    </div>
                  </div>
                  <div className="form-group ">
                    <label className="labelright">CustomerCode:</label>
                    <span className="myspan ">
                      <div className="form__div">
                        <input
                          className="detail__input textsmall"
                          type="text"
                          name="extcode"
                          value={this.state.extcode}
                          ref={(el) => (this.myRefs[1] = el)}
                          onChange={(event) => {
                            this.setState({ extcode: event.target.value });
                          }}
                          required 
                        />
                      </div>
                    </span>
                  </div>
                  <div className="two">
                    <div className="form-group">
                      <label className="labelstd">Epc:</label>
                      <span className="myspan">
                        <div className="form__div">
                          <input
                            className="detail__input textsmall"
                            type="text"
                            name="epc"
                            // type={this.state.editUser ? 'hidden': 'text'}
                            value={this.state.epc}
                            ref={(el) => (this.myRefs[2] = el)}
                            onChange={(event) => {
                              this.setState({ epc: event.target.value });
                            }}
                            
                          />
                        </div>
                      </span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="labelright">Serial:</label>
                    <span className="myspan">
                      <div className="form__div">
                        <input
                          className="detail__input textsmall"
                          type="text"
                          name="serial"
                          // type={this.state.editUser ? 'hidden': 'text'}
                          value={this.state.serial}
                          onChange={(event) => {
                            this.setState({ serial: event.target.value });
                          }}
                        />
                      </div>
                    </span>
                  </div>
                  {/* <div className="form-group">
                    <label className="labelstd">Serial:</label>
                    <span className="myspan">
                      <div className="form__div">
                        <input
                          className="detail__input"
                          type="text"
                          name="serial"
                          // type={this.state.editUser ? 'hidden': 'text'}
                          value={this.state.serial}
                          onChange={(event) => {
                            this.setState({ serial: event.target.value });
                          }}
                        />
                      </div>
                    </span>
                  </div> */}

                  <div className="form-group">
                    <label className="labelstd">Name:</label>
                    <span className="myspan">
                      <div className="form__div">
                        <input
                          className="detail__input"
                          type="text"
                          name="desc"
                          // type={this.state.editUser ? 'hidden': 'text'}
                          value={this.state.desc}
                          ref={(el) => (this.myRefs[3] = el)}
                          onChange={(event) => {
                            this.setState({ desc: event.target.value });
                          }}
                          required
                        />
                      </div>
                    </span>
                  </div>
                  <div className="form-group">
                    <label className="labelstd">Epc:</label>
                    <span className="myspan">
                      <div className="form__div">
                        <input
                          className="detail__input"
                          type="text"
                          name="epc"
                          value={this.state.epc}
                          ref={(el) => (this.myRefs[2] = el)}
                          onChange={(event) => {
                            this.setState({ epc: event.target.value });
                          }}
                          
                        />
                      </div>
                    </span>
                  </div>
                  <div className="form-group">
                    <label className="labelstd">Material:</label>
                    <span className="myspan">
                      <div className="form__div">
                        <select
                          className="detail__input"
                          name="material"
                          value={this.state.material}
                          onChange={this.onChange}
                        >
                          {this.state.materials.map((mat) => (
                            <option key={mat.id} value={mat.value}>
                              {mat.display}
                            </option>
                          ))}
                        </select>
                      </div>
                    </span>
                  </div>

                  <div className="form-group">
                    <label className="labelstd">EntityType:</label>
                    <span className="myspan">
                      <div className="form__div">
                        <select
                          className="detail__input"
                          name="type"
                          value={this.state.type}
                          onChange={this.onTypeChange}
                          
                        >
                          {this.state.types.map((ett) => (
                            <option key={ett.id} value={ett.value}>
                              {ett.display}
                            </option>
                          ))}
                        </select>
                      </div>
                    </span>
                  </div>
                  <div className="form-group">
                    <label className="labelstd">SubType:</label>
                    <span className="myspan">
                      <div className="form__div">
                        <select
                          className="detail__input"
                          name="subtype"
                          value={this.state.subtype}
                          onChange={this.onChange}
                          
                        >
                          {this.state.selectedSubtypes.map((est) => (
                            <option key={est.id} value={est.value}>
                              {est.display}
                            </option>
                          ))}
                        </select>
                      </div>
                    </span>
                  </div>

                  {/* <div className="form-group">
                    <label className="labelstd">Warhouse:</label>
                    <span className="myspan">
                      <div className="form__div">
                        <select
                          className="detail__input"
                          name="brand"
                          value={this.state.brand}
                          onChange={this.onChange}
                        >
                          {this.state.brands.map((brn) => (
                            <option key={brn.id} value={brn.value}>
                              {brn.display}
                            </option>
                          ))}
                        </select>
                      </div>
                    </span>
                  </div> */}
                  <div className="form-group">
                    <label className="labelstd">Status:</label>
                    <span className="myspan">
                      <div className="form__div">
                        <select
                          className="detail__input"
                          name="status"
                          value={this.state.status}
                          onChange={this.onChange}
                        >
                          {this.state.statuss.map((status) => (
                            <option key={status.id} value={status.value}>
                              {status.display}
                            </option>
                          ))}
                        </select>
                      </div>
                    </span>
                  </div>
                  
                  <div className="form-group">
                    <label className="labelstd">Location:</label>
                    <span className="myspan">
                      <div className="form__div">
                        <select
                          className="detail__input"
                          name="location"
                          value={this.state.location}
                          onChange={this.onChange}
                        >
                          {this.state.locations.map((loc) => (
                            <option key={loc.id} value={loc.value}>
                              {loc.display}
                            </option>
                          ))}
                        </select>
                      </div>
                    </span>
                  </div>

                  <div className="two">
                    <div className="form-group ">
                      <label className="labelstd">Weight:</label>
                      <span className="myspan ">
                        <div className="form__div ">
                          <input
                            className="detail__input textsmall"
                            type="text"
                            name="weight"
                            value={this.state.weight}
                            ref={(el) => (this.myRefs[6] = el)}
                            onChange={(event) => {
                              this.setState({ weight: event.target.value });
                            }}
                            
                          />
                        </div>
                      </span>
                    </div>
                  </div>

                  <div className="form-group ">
                    <label className="labelright">Purity:</label>
                    <span className="myspan ">
                      <div className="form__div">
                        <input
                          className="myinput fadeIn second"
                          type="text"
                          name="purity"
                          className="detail__input textsmall"
                          value={this.state.purity}
                          ref={(el) => (this.myRefs[6] = el)}
                          onChange={(event) => {
                            this.setState({ purity: event.target.value });
                          }}
                          
                        />
                      </div>
                    </span>
                  </div>
                  <div className="form-group">
                    <label className="labelstd">Price(₹):</label>
                    <span className="myspan">
                      <div className="form__div">

                        <input
                          className="detail__input text150"
                          type="text"
                          name="price"
                          // type={this.state.editUser ? 'hidden': 'text'}
                       
                          value={this.state.price.toLocaleString('en-IN')}
                          onChange={(event) => {
                            this.setState({ price: event.target.value });
                          }}
                        />
                      </div>
                    </span>
                  </div>
                  <div className="form-group">
                    <label
                      className={!this.state.editEntity ? "hidden" : "labelstd"}
                    >
                      Lastseen:
                    </label>
                    <span className="myspan">
                      <div className="form__div">
                        <input
                          className="detail__input"
                          type={!this.state.editEntity ? "hidden" : "text"}
                          name="lastseen"
                          value={this.state.lastseen}
                          ref={(el) => (this.myRefs[6] = el)}
                          onChange={(event) => {
                            this.setState({ lastseen: event.target.value });
                          }}
                          
                          readOnly
                        />
                      </div>
                    </span>
                  </div>

                  <div className="form-group">
                    <label
                      className={!this.state.editEntity ? "hidden" : "labelstd"}
                    >
                      Duration:
                    </label>
                    <span className="myspan ">
                      <div className="form__div">
                        <input
                          className="detail__input textsmall"
                          name="duration"
                          type={!this.state.editEntity ? "hidden" : "text"}
                          value={this.state.duration}
                          ref={(el) => (this.myRefs[7] = el)}
                          onChange={(event) => {
                            this.setState({ duration: event.target.value });
                          }}
                          
                          readOnly
                        />
                      </div>
                    </span>
                  </div>
                  <br></br>
                </div>
                <center>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      width: "110px",
                      height: "35px",
                      marginBottom: "20px",
                      marginRight: "145px",
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

export default Entity;
