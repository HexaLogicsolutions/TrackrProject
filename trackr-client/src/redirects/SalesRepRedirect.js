import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useHistory } from "react-router";
export default function SalesRepRedirect() {
    const contextType = useContext(AuthContext);
    const history = useHistory();
    useEffect(() => {
     const Type =   contextType.RepType ="SR"
     localStorage.setItem('reportType', Type);
        history.push({
            pathname:"/ReportFilter"
          });
         console.log("localstorage:"+localStorage.getItem('reportType'));
      }, []);
    return (
        <div>
            
        </div>
    )
}
