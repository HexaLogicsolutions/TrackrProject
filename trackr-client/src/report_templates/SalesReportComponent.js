import React from "react";
import { Link } from "react-router-dom";

const SalesReportComponent = ({ sales }) => {

  return (
    <div className="container">
      {
        <table className="table">
          <thead>
            <tr>
              {/* <th scope="col">#</th> */}
              <th scope="col">Warehouse</th>
              <th scope="col">Entity</th>
              <th scope="col">Serial</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale._id}>
                <td>{sale.sal_warehouse}</td>
                <td>{sale.sal_entity}</td>
                <td>{sale.sal_serial}</td>
                <td>{sale.sal_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
};

export default SalesReportComponent;
