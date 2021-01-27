import React, { useState, useEffect, useContext } from "react";
import Datatable from "./Datatable";
import { AuthContext } from "../contexts/AuthContext";
require("es6-promise").polyfill();
require("isomorphic-fetch");
export default function Sale() {
  const contextType = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");
  const input = (e) => {
    const data = e.target.value;
    console.log(data);
    setQ(data);
  };

  useEffect(() => {
    function search(rows) {
      return rows.filter(
        (row) =>
          row.act_material.toString().toLowerCase().indexOf(q) > -1 ||
          row.act_code.toString().toLowerCase().indexOf(q) > -1 ||
          row.act_name.toString().toLowerCase().indexOf(q) > -1
      );
    }
    search();
    fetch(contextType.dbUrl + "actiongroup")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, [q, setData, contextType]);

  return (
    <div>
      <div>
        <br></br>
        <center>
          <div>
            <input
              type="text"
              placeholder="Search Anything"
              value={q}
              onChange={input}
            ></input>
          </div>
        </center>

        <Datatable data={data} />
      </div>
    </div>
  );
}
