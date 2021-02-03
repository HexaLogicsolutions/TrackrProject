import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import {
  FaWarehouse,
  FaSearch,
  FaListAlt,
  FaFileArchive,
  FaMobileAlt,
  FaRegUser,
  FaBuilding,
} from "react-icons/fa";
import {
  BiAddToQueue,
  BiArea,
  BiCurrentLocation,
  BiGroup,
} from "react-icons/bi";
import { BsSubtract, BsSearch } from "react-icons/bs";
import { TiExport } from "react-icons/ti";
import { GrStatusCriticalSmall } from "react-icons/gr";
import { MdAssignmentReturn } from "react-icons/md";
import { AiFillAppstore } from "react-icons/ai";
import { CgShutterstock } from "react-icons/cg";

export default class menu extends Component {
  static contextType = AuthContext;

  componentDidMount() {
    // setTimeout(function () {
    //   if (!localStorage["reloaded"]) {
    //     localStorage["reloaded"] = true;
    //     window.location.reload();
    //   }
    // }, 100);
    (function()
{
  if( window.localStorage )
  {
    if( !localStorage.getItem('firstLoad') )
    {
      localStorage['firstLoad'] = true;
      window.location.reload();
    }  
    else 
      localStorage.removeItem('firstLoad');
  }
})();

  }

  render() {
    console.log(this.context.currentUser);

    return (
      <div className="sticky">
        <aside className="main-sidebar">
          {/* sidebar: style can be found in sidebar.less */}
          <section className="sidebar">
            {/* Sidebar user panel */}
            <div className="user-panel">
              <div className="pull-left image">
                <img
                  src="dist/img/user2-160x160.jpg"
                  className="img-circle"
                  alt="User Image"
                />
              </div>
              <div className="pull-left info">
                <p>
                  {this.context.currentUser == null
                    ? ""
                    : this.context.currentUser.usr_name}
                </p>
                <a href="#">
                  <i className="fa fa-circle text-success" /> Online
                </a>
              </div>
            </div>
            {/* search form */}
            <form action="#" method="get" className="sidebar-form">
              <div className="input-group"></div>
            </form>
            {/* /.search form */}
            {/* sidebar menu: : style can be found in sidebar.less */}
            <ul className="sidebar-menu" data-widget="tree">
              {/* <li>
        <Link to="/Home">
          <i className="fa fa-dashboard" /> <span>Dashboard</span>
          <span className="pull-right-container">
         
          </span>
        </Link>
        
      </li> */}
              <li>
                <Link to="/Home">
                  <i className="fa fa-dashboard" /> <span>Dashboard</span>
                </Link>
              </li>
              {/* <li className="treeview">
        <a href="#">
          <i className="fa fa-files-o" />
          <span>Layout Options</span>
          <span className="pull-right-container">
            <span className="label label-primary pull-right">4</span>
          </span>
        </a>
        <ul className="treeview-menu">
          <li><a href="pages/layout/top-nav.html"><i className="fa fa-circle-o" /> Top Navigation</a></li>
          <li><a href="pages/layout/boxed.html"><i className="fa fa-circle-o" /> Boxed</a></li>
          <li><a href="pages/layout/fixed.html"><i className="fa fa-circle-o" /> Fixed</a></li>
          <li><a href="pages/layout/collapsed-sidebar.html"><i className="fa fa-circle-o" /> Collapsed Sidebar</a></li>
        </ul>
      </li>
      <li>
        <a href="pages/widgets.html">
          <i className="fa fa-th" /> <span>Widgets</span>
          <span className="pull-right-container">
            <small className="label pull-right bg-green">new</small>
          </span>
        </a>
      </li> */}

              {/* Gaurang mishra */}
              <li className="treeview">
                <Link to="#">
                  <i className="fa fa-pie-chart" />
                  <span> Config</span>
                  <span className="pull-right-container">
                    <i className="fa fa-angle-left pull-right" />
                  </span>
                </Link>
                <ul className="treeview-menu">
                  <li>
                    <Link to="/Userlist">
                      <FaRegUser /> Users
                    </Link>
                  </li>
                  <li>
                    <Link to="/Grouplist">
                      <BiGroup /> Groups
                    </Link>
                  </li>
                  <li>
                    <a href="/Demo">
                      <FaBuilding /> Company
                    </a>
                  </li>
                </ul>
              </li>
              <li className="treeview">
                <a href="#">
                  <i className="fa fa-laptop" />
                  <span>Maintenance</span>
                  <span className="pull-right-container">
                    <i className="fa fa-angle-left pull-right" />
                  </span>
                </a>
                <ul className="treeview-menu">
                  <li>
                    <Link to="/Entitytypelist">
                      <BiAddToQueue />
                      Entity Type
                    </Link>
                  </li>
                  <li>
                    <Link to="/EntitySubTypeList">
                      <BsSubtract /> Entity Subtype
                    </Link>
                  </li>
                  <li>
                    <Link to="/Warehouselist">
                      <FaWarehouse /> Warehouse
                    </Link>
                  </li>
                  <li>
                    <Link to="/LocationArealist">
                      <BiArea /> Location Area
                    </Link>
                  </li>
                  <li>
                    <Link to="/Locationlist">
                      <BiCurrentLocation /> Location
                    </Link>
                  </li>
                  <li>
                    <Link to="/EntityStatus">
                      <GrStatusCriticalSmall /> Entity Status
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link to="/ActionGroupList">
                  <i className="fa fa-dashboard" /> <span>Action Groups</span>
                </Link>
              </li>
              {/* <li>
                <Link to="/EntityList">
                  <i className="fa fa-edit" /> <span>Entity</span>
               
                </Link>
              </li> */}
              <li className="treeview">
                <a href="#">
                  <i className="fa fa-edit" /> <span>Entity</span>
                  <span className="pull-right-container">
                    <i className="fa fa-angle-left pull-right" />
                  </span>
                </a>
                <ul className="treeview-menu">
                  <li>
                    <Link to="/Search">
                      <FaSearch /> Search
                    </Link>
                  </li>
                  <li>
                    <Link to="/EntityList">
                      <FaListAlt /> List
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="treeview">
                <a href="#">
                  <i className="fa fa-table" /> <span>Sales</span>
                  <span className="pull-right-container">
                    <i className="fa fa-angle-left pull-right" />
                  </span>
                </a>
                <ul className="treeview-menu">
                  <li>
                    <a href="pages/tables/simple.html">
                      <TiExport /> Sale
                    </a>
                  </li>
                  <li>
                    <a href="pages/tables/data.html">
                      <MdAssignmentReturn /> Returns
                    </a>
                  </li>
                </ul>
              </li>

              <li className="treeview">
                <a href="#">
                  <CgShutterstock /> <span>Stock</span>
                  <span className="pull-right-container">
                    <i className="fa fa-angle-left pull-right" />
                  </span>
                </a>
                <ul className="treeview-menu">
                  <li>
                    <a href="pages/tables/simple.html">
                      <BsSearch /> Search
                    </a>
                  </li>
                  <li>
                    <a href="pages/tables/data.html">Add / Remove</a>
                  </li>
                </ul>
              </li>

              <li className="treeview">
                <a href="#">
                  <FaFileArchive /> <span>Reports</span>
                  <span className="pull-right-container">
                    <i className="fa fa-angle-left pull-right" />
                  </span>
                </a>
                <ul className="treeview-menu">
                  <li>
                    <a href="pages/tables/simple.html">
                      <AiFillAppstore /> Current Stock
                    </a>
                  </li>
                  <li>
                    <a href="/Sale">
                      <TiExport /> Sales
                    </a>
                  </li>
                  <li>
                    <a href="pages/tables/data.html">
                      <FaMobileAlt /> HH Trasaction
                    </a>
                  </li>
                </ul>
              </li>

              <li>
                <a href="https://adminlte.io/docs">
                  <i className="fa fa-book" /> <span>About</span>
                </a>
              </li>
            </ul>
          </section>
          {/* /.sidebar */}
        </aside>
      </div>
    );
  }
}
