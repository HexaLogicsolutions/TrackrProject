import React, { Component } from 'react'
import ReactToExcel from 'react-html-table-to-excel';
 class Reports extends Component {
    render() {
        return (
            <div className="compomargin">
                <table border="2" id="table-to-xls">
                    <thead>
                        <tr>
                            <th>first Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Virat</td>
                            <td>Smith</td>
                            <td>56</td>
                        </tr>
                        <tr>
                            <td>Rohit</td>
                            <td>Smith</td>
                            <td>45</td>
                        </tr>
                        <tr>
                            <td>Dhoni</td>
                            <td>Smith</td>
                            <td>75</td>
                        </tr>
                    </tbody>
                </table>
                <ReactToExcel
                className="btn-btn-primary"
                table="table-to-xls"
                filename="myfile"
                sheet="sheet 1"
                buttonText="export"
                
                
                />
            </div>
        )
    }
}
export default Reports;