import React, { Component, Fragment } from "react";
import AppNavbar from "../components/Navbar";
import Menu from "../components/Menu";

import{BrowserRouter as Router,Switch} from
'react-router-dom';
import { Route } from "react-router";
import { Form } from "react-bootstrap";
class Product extends Component {


  render() {
    return (
      <Fragment>
        <AppNavbar />
        <Menu/>
        <div><center><h1>Report Component</h1></center></div>
      </Fragment>
    );
  }
}

export default Report;