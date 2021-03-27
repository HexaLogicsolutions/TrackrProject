import React, { Component } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { login } from "../actions/auth";
import Login from "../pages/Login";
import Home from "../pages/Home";
import About from "../pages/About";
import {Helmet} from "react-helmet";

import UserList from "../pages/UserList";
import User from "../pages/User";
import AppNavbar from "./Navbar";
import Menu from "./Menu";

import PrivateRoute from "./PrivateRoute";
import GroupList from "../pages/GroupList";
import Group from "../pages/Group";
import WarehouseList from "../pages/WarehouseList";
import LocationList from "../pages/LocationList";
import LocationAreaList from "../pages/LocationAreaList";
import EntityTypeList from "../pages/EntityTypeList";
import EntityList from "../pages/EntityList";
import EntitySubTypeList from "../pages/EntitySubTypeList";
import EntityType from "../pages/EntityType";
import EntityStatus from "../pages/EntityStatus";
import Location from "../pages/Location";
import EntitySubType from "../pages/EntitySubType";
import Warehouse from "../pages/Warehouse";
import LocationArea from "../pages/LocationArea";
import ActionGroup from "../pages/ActionGroup";
import ActionGroupList from "../pages/ActionGroupList";
import Entity from "../pages/Entity";
// import Reports from "../pages/Reports";
import Demo from "../pages/Demo";
import pdfdemo from "../pages/pdfdemo";
import ReportFilter from "../pages/ReportFilter";
import SalesRepRedirect from "../redirects/SalesRepRedirect";
import StockRepRedirect from "../redirects/StockRepRedirect";
import HandheldRepRedirect from "../redirects/HandheldRepRedirect";


import Search from "../pages/Search";
import Sale from "../components/Sale";
import ActionDemo from "../pages/ActionDemo";
import { ReportViewer } from "../pages/ReportViewer";

// import TicketsComponent from "../pages/TicketComponent";

const Route = require("react-router-dom").Route;

class Routes extends Component {
  static contextType = AuthContext;

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token && !this.context.isAuthenticated) {
      const data = { token, email: null, password: null };
      login(data, (res) => {
        if (res.data.success) {
          this.context.login(res);
        } else {
          localStorage.removeItem("token");
          console.log(res.data.msg);
        }
      });
    }
  }

  render() {
    return (
      <Router>
        <AppNavbar />
        <div>
        <Helmet>
            <title>TrackR (Ver:{this.context. APP_VERSION})</title>
            <meta name="description" content="Nested component" />
        </Helmet>
          <Switch>
            <Route exact path="/" component={Login} />
            <Menu />
          </Switch>
          <PrivateRoute exact path="/Sale" component={Sale} />
          <PrivateRoute exact path="/pdfdemo" component={pdfdemo} />
          <PrivateRoute exact path="/ReportViewer" component={ReportViewer} />
          <PrivateRoute exact path="/SalesRepRedirect" component={SalesRepRedirect} />
          <PrivateRoute exact path="/StockRepRedirect" component={StockRepRedirect} />
          <PrivateRoute exact path="/HandheldRepRedirect" component={HandheldRepRedirect} />
          <PrivateRoute exact path="/Search" component={Search} />
          <PrivateRoute exact path="/Demo" component={Demo} />
          <PrivateRoute exact path="/ActionDemo" component={ActionDemo} />
          {/* <PrivateRoute exact path="/showReport" component={ShowReport} /> */}
          <PrivateRoute exact path="/ReportFilter" component={ReportFilter} />
          {/* <PrivateRoute exact path="/TicketsComponent" component={TicketsComponent} /> */}
          <PrivateRoute exact path="/Home" component={Home} />
          <PrivateRoute exact path="/about" component={About} />
          <PrivateRoute exact path="/UserList" component={UserList} />
          <PrivateRoute exact path="/User" component={User} />
          <PrivateRoute exact path="/GroupList" component={GroupList} />
          <PrivateRoute exact path="/Group" component={Group} />
          <PrivateRoute
            exact
            path="/EntityTypeList"
            component={EntityTypeList}
          />
          <PrivateRoute exact path="/EntityType" component={EntityType} />
          <PrivateRoute
            exact
            path="/EntitySubTypeList"
            component={EntitySubTypeList}
          />
          <PrivateRoute exact path="/EntitySubType" component={EntitySubType} />
          <PrivateRoute exact path="/WarehouseList" component={WarehouseList} />
          <PrivateRoute exact path="/Warehouse" component={Warehouse} />
          <PrivateRoute
            exact
            path="/LocationAreaList"
            component={LocationAreaList}
          />
          <PrivateRoute exact path="/LocationArea" component={LocationArea} />
          <PrivateRoute exact path="/LocationList" component={LocationList} />
          <PrivateRoute exact path="/Location" component={Location} />
          <PrivateRoute
            exact
            path="/ActionGroupList"
            component={ActionGroupList}
          />
          <PrivateRoute exact path="/ActionGroup" component={ActionGroup} />
          <PrivateRoute exact path="/EntityStatus" component={EntityStatus} />
          <PrivateRoute exact path="/EntityList" component={EntityList} />
          <PrivateRoute exact path="/Entity" component={Entity} />
          {/* <PrivateRoute exact path="/Reports" component={Reports} /> */}
          {/* <Route exact path="/user" render={(props) => (<PrivateRoute component={User} />)} /> */}
          {/* <PrivateRoute exact path="/user" render={(props) => (<User {...props} userCode={'GM03'} />  )} /> */}
        </div>
      </Router>
    );
  }
}

export default Routes;
