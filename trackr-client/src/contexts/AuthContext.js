import React, { Component, createContext } from "react";

export const AuthContext = createContext();

class AuthContextProvider extends Component {
  state = {
    APP_VERSION:"0.02",
    isAuthenticated: false,
    currentUser: null,
    dbUrl: "https://hls-trackr1.herokuapp.com/api/",
    // dbUrl: "http://localhost:5000/api/",
    // selectedUser: null,
    // selectedGroup:null,
    currentMsg: null,
    rptHeading:null,
    rptData:null,
    RepType:null,
    currentVariant: null,
    currentColor: null,
    currentObject: null,
    dateFrom: null,
    dateTo: null,
    colors: [
      "#0088FE",
      "#00C49F",
      "#FFBB28",
      "#FF8042",
      "#2F9042",
      "#669999",//"#FF2",
      "#FF0000",
      "#2Fe9",
      "#2F1042",
    ],
  };

  
  setCurrentObject = (obj) => {
    this.setState({
      currentObject: obj,
    });
  };
  
  setCurrentRptHeading= (obj) => {
    this.setState({
      rptheading: obj,
    });
  };

  setCurrentRptData= (obj) => {
    this.setState({
      rptdata: obj,
    });
  };
  setCurrentRepType = (obj) => {
    this.setState({
      RepType: obj,
    });
  };
  setCurrentVerion = (msg) => {
    this.setState({
      APP_VERSION: msg,
    });
  };
  setCurrentMsg = (msg) => {
    this.setState({
      currentMsg: msg,
    });
  };
  setCurrentVariant = (variant) => {
    this.setState({
      currentVariant: variant,
    });
  };
  setCurrentColor = (color) => {
    this.setState({
      currentColor: color,
    });
  };
  setDateFrom = (dt) => {
    this.setState({
      dateFrom: dt,
    });
  };

  setDateTo = (dt) => {
    this.setState({
      dateTo: dt,
    });
  };

  login = (res) => {
    if (res.data.success) {
      this.setState({
        isAuthenticated: true,
        currentUser: res.data.user,
      });
    }
  };

  logout() {
    localStorage.clear();
    window.location.href = "/";
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          logout: this.logout,
          // setSelectedUser: this.setSelectedUser,
          // setSelectedGroup: this.setSelectedGroup,
          setCurrentMsg: this.setCurrentMsg,
          setCurrentVariant: this.setCurrentVariant,
          setCurrentColor: this.setCurrentColor,
          setCurrentVerion: this.setCurrentVerion,
          setCurrentObject: this.setCurrentObject,
          setCurrentRepType: this.setCurrentRepType,
          setCurrentRptData:this.setCurrentRptData,
          setCurrentRptHeading:this.setCurrentRptHeading,
          setDateFrom: this.setDateFrom,
          setDateTo: this.setDateTo,
          login: this.login,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContextProvider;
