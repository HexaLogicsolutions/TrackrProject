import React, { Component } from "react";
import {Helmet} from "react-helmet";
import { login } from "../actions/auth";
import { AuthContext } from "../contexts/AuthContext";

class Login extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();

    this.state = {
      msg: null,
      variant: "",
      color: "",
      password: "",
      code: "",
      token: localStorage.getItem("token"),
    };
  }
   disableScrolling(){
    var x=window.scrollX;
    var y=window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y);};
}

 enableScrolling(){
    window.onscroll=function(){};
}
  componentDidMount() {
    // this.inputRef.current.focus()
    console.log(this.inputRef);
    this.disableScrolling();
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

  componentDidUpdate() {
    if (this.context.isAuthenticated) {
      this.props.history.push("/Home");
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { password, code, token } = this.state;
    const data = { password, code, token };

    //Attempt to login
    login(data, (res) => {
      console.log(res);
      if (res.data.success) {
        // this.context.setSelectedUser("GM03");

        this.setState({
          msg: res.data.msg,
          variant: "success",
          color: "alert alert-success",
        });
        this.context.login(res);
      } else {
        setTimeout(() => this.setState({ msg: "" }), 2000);
        this.setState({
          msg: res.data.msg,
          variant: "danger",
          color: "alert alert-danger",
        });
      }
    });
  };

  showAlert() {
    //setTimeout(() => this.setState({msg:''}), 2000);
    return this.state.msg ? (
      // <div class="alert alert-success">
      //   <a href="#" class="close" data-dismiss="alert">
      //     &times;
      //   </a>
      //   {this.state.msg}
      // </div>
      <div
        class={this.state.color}
        style={{ borderRadius: "50px", padding: "5px" }}
      >
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
          <center> {this.state.msg}</center>
        </h4>
      </div>
    ) : null;
  }

  // showAlert() {
  //   //setTimeout(() => this.setState({msg:''}), 2000);
  //   return this.state.msg ? (
  //     <Alert variant={this.state.variant}>{this.state.msg}</Alert>
  //   ) : null;
  // }

  render() {
    return (
      
      // <div>
      // <nav className="navbar navbar-light bg-light ">
      //   <a className="navbar-brand" href="/">
      //     <img
      //       src="images/logopng.png"
      //       width="47"
      //       height="60"
      //       className="d-inline-block align-top"
      //       alt=""
      //     />
      //   </a>
      // </nav>

      //   <div className="wrapper fadeInDown">
      //     <div id="formContent">
      //       <div className="fadeIn first">
      //         <br></br>

      //         <img
      //           src="images/logopng.png"
      //           width="55"
      //           height="70"
      //           className="logo"
      //           alt="pic"
      //         ></img>
      //       </div>

      //       <form onSubmit={this.onSubmit} id="login">
      //         {this.showAlert()}

      //         <label className="loglabel">Code:</label>
      //         <input
      //           type="text"

      //           className="newinput inp200w fadeIn second"
      //           name="code"
      //           ref={this.inputRef}
      //           value={this.state.code}
      //           placeholder="User Code"
      //           onChange={this.onChange}
      //         />
      //         <br></br>
      //         <label className="loglabel">Password:</label>
      //         <input
      //           type="password"
      //           id="password"
      //           className="newinput inp200w fadeIn third"
      //           name="password"
      //           value={this.state.password}
      //           placeholder="Password"
      //           onChange={this.onChange}
      //         />

      //         <br></br>
      //         <br></br>
      //         <div className="rj">
      //           <button
      //             type="submit"
      //             className="btn btn-primary fadeIn fourth"
      //             style={{ width: "120px", height: "35px" }}
      //           >
      //             Login
      //           </button>
      //         </div>
      //       </form>
      //     </div>
      //   </div>
      // </div>

      // //

      //
      //
      //
      //
      //
      //
      //
      //
      //final product///////////////////////////////////////////////////////
      // <div>
      //   <nav
      //     className="navbar navbar-light bg-light "
      //     style={{ paddingBottom: "10px" }}
      //   >
      //     <a className="navbar-brand" href="/">
      //       <img
      //         src="images/logopng.png"
      //         width="47"
      //         height="60"
      //         className="d-inline-block align-top"
      //         alt=""
      //       />
      //     </a>
      //   </nav>
      //   <body class="hold-transition">
      //     <div className="login-box">
      //       <div className="login-logo">
      //         <a href="../../index2.html">
      //           <b>Hexa</b>Logic
      //         </a>
      //       </div>

      //       <div className="login-box-body">
      //         <div style={{ paddingBottom: "7px" }}>
      //           <center>
      //             <img
      //               src="images/logopng.png"
      //               width="55"
      //               height="70"
      //               className=""
      //               alt="pic"
      //             ></img>
      //           </center>

      //         </div>
      //           <form onSubmit={this.onSubmit} id="login">
      //       {this.showAlert()}

      //           <div className="form-group1 has-feedback">

      //             <input

      //               type="text"
      //               className="form-control"
      //               placeholder="Usercode"

      //                         name="code"
      //                         ref={this.inputRef}
      //                         value={this.state.code}
      //                         placeholder="User Code"
      //                         onChange={this.onChange}
      //             />
      //             <span className="	glyphicon glyphicon-user form-control-feedback" />
      //           </div>
      //           <div className="form-group1 has-feedback">
      //             <input
      //               type="password"
      //               className="form-control"
      //               placeholder="Password"

      //                         id="password"

      //                         name="password"
      //                         value={this.state.password}
      //                         placeholder="Password"
      //                         onChange={this.onChange}
      //             />
      //             <span className="glyphicon glyphicon-lock form-control-feedback" />
      //           </div>
      //           <div className="row">
      //             <div className="col-xs-8">
      //               <div className="checkbox icheck"></div>
      //             </div>

      //             <div className="col-xs-4">
      //           <button
      //                 type="submit"
      //                 className="btn btn-primary btn-block btn-flat "
      //               >
      //                 Sign In
      //               </button>

      //             </div>

      //           </div>
      //         </form>
      //         <div className="social-auth-links text-center"></div>

      //       </div>

      //     </div>
      //   </body>
      // </div>
      //
      // //////////////////////////////////////////////////////////
      // /////
      // // <div class="col-md-6">
      // //   <form className="form-horizontal">
      // //     <div className="box-body ">

      // //       <div className="form-group ">
      // //         <label htmlFor="inputEmail3" className="col-sm-1 control-label mylabel">Email:</label>
      // //         <div className="col-sm-7">

      // //           <input type="email" className="form-control" id="inputEmail3" placeholder="Email" />
      // //         </div>
      // //       </div>
      // //       <div className="form-group">
      // //         <label htmlFor="inputPassword3" className="col-sm-1 control-label">Password:</label>
      // //         <div className="col-sm-7">

      // //           <input type="password" className="form-control" id="inputPassword3" placeholder="Password" />
      // //           <br></br>
      // //           <button type="submit" className="btn btn-info pull-right">Sign in</button>
      // //         </div>
      // //       </div>
      // //   </div>

      //   </form>
      // </div>
      //////////////////////////////////////////////////////////////////////////////////ss/////////////////////////sss/////////
      // <div>
      //   <nav
      //     className="navbar navbar-light bg-light "
      //     style={{ paddingBottom: "10px" }}
      //   >
      //     <a className="navbar-brand" href="/">
      //       <img
      //         src="images/logopng.png"
      //         width="47"
      //         height="60"
      //         className="d-inline-block align-top"
      //         alt=""
      //       />
      //     </a>
      //   </nav>
      //   <div className="top">
      //     <div className="l-form">
      //       <form action className="form">
      //         <div style={{ paddingBottom: "10px" }}>
      //           <center>
      //             <img
      //               src="images/logopng.png"
      //               width="45"
      //               height="56"
      //               className=""
      //               alt="pic"
      //             ></img>
      //           </center>
      //         </div>

      //         <div className="mainlog">
      //           <label className="loglabel" style={{ width: "85px" }}>
      //             User Code:
      //           </label>
      //           <span className="myspan">
      //             <div className="form__log">
      //               <input
      //                 type="text"
      //                 className="form-control"
      //                 placeholder=" "

      //                                         name="code"
      //                                         ref={this.inputRef}
      //                                         value={this.state.code}

      //                                         onChange={this.onChange}
      //               />
      //               <label htmlFor className="form__label mylabel  ">
      //                 UserCode
      //               </label>
      //               <span
      //                 className="	glyphicon glyphicon-user form-control-feedback"
      //                 style={{ width: "30px" }}
      //               />
      //             </div>
      //           </span>
      //         </div>
      //         <div style={{ marginRight: "10px", marginLeft: "-20px" }}>
      //           <label className="loglabel" style={{ width: "85px" }}>
      //             Password:
      //           </label>
      //           <span className="myspan">
      //             <div className="form__log">
      //               <input
      //                 type="password"
      //                 className="form-control"
      //                 placeholder=" "
      //                 type="password"

      //                                         id="password"

      //                                         name="password"
      //                                         value={this.state.password}

      //                                         onChange={this.onChange}
      //               />
      //               <label htmlFor className="form__label  mylabel ">
      //                 Password
      //               </label>
      //               <span
      //                 className="glyphicon glyphicon-lock form-control-feedback"
      //                 style={{ width: "30px" }}
      //               />
      //             </div>
      //           </span>
      //         </div>

      //         <input
      //           type="submit"
      //           className="form__button "
      //           value="Login"
      //           style={{
      //             backgroundColor: "steelblue",
      //             float: "right",
      //             marginRight: "14px",
      //             borderRadius: "54px",
      //           }}
      //         />
      //       </form>
      //     </div>
      //   </div>
      // </div>
      <div>
        <Helmet>
            <title>TrackR (Ver:{this.context. APP_VERSION})</title>
            <meta name="description" content="Nested component" />
        </Helmet>
        <nav
          className="navbar navbar-light bg-light "
          style={{ paddingBottom: "10px" }}
        >
          <a className="navbar-brand" href="/">
            <img
              src="images/logopng.png"
              width="47"
              height="60"
              className="d-inline-block align-top"
              alt=""
            />
          </a>
        </nav>
        <div className="top">
          <div className="l-form">
            <form onSubmit={this.onSubmit} id="login" className="form">
              {this.showAlert()}
              <div style={{ paddingBottom: "10px" }}>
                <center>
                  <img
                    src="images/logopng.png"
                    width="45"
                    height="56"
                    className=""
                    alt="pic"
                  ></img>
                </center>
              </div>

              <div className="mainlog ">
                <label className="loglabel">User Code:</label>
                <span className="myspan">
                  <div className="form__log">
                    <input
                      type="text"
                      //  className="form-control "
                      className="form-control "
                      placeholder="Usercode"
                      name="code"
                      ref={this.inputRef}
                      value={this.state.code}
                      placeholder="User Code"
                      onChange={this.onChange}
                    />

                    <span className="	glyphicon glyphicon-user form-control-feedback" />
                  </div>
                </span>
              </div>
              <div style={{ marginRight: "10px", marginLeft: "-16px" }}>
                <label className="loglabel">Password:</label>
                <span className="myspan">
                  <div className="form__log">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      id="password"
                      name="password"
                      value={this.state.password}
                      placeholder="Password"
                      onChange={this.onChange}
                    />

                    <span className="glyphicon glyphicon-lock form-control-feedback" />
                  </div>
                </span>
              </div>

              <input
                type="submit"
                className="form__button "
                value="Login"
                style={{
                  backgroundColor: "steelblue",
                  float: "right",
                  marginRight: "14px",
                  borderRadius: "3px",
                }}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
