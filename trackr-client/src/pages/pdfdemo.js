import React from "react";
import ReactToPrint from "react-to-print";
import PropTypes from "prop-types";


const tabStyle = {
  height: 500,
  maxHeight: 300,
  overflow: "scroll"
  //backgroundColor: "blue"
};

class ComponentToPrint extends React.Component {
  render() {
    return (
      <div style={tabStyle}>
        <div ref={this.props.propsRef}>
          <table className="printElement1">
            <thead>
              <th>column 1</th>
              <th>column 2</th>
              <th>column 3</th>
            </thead>
            <tbody>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>

              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>

              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
            </tbody>
          </table>
          <table className="printElement1">
            <thead>
              <th>column 1</th>
              <th>column 2</th>
              <th>column 3</th>
            </thead>
            <tbody>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

class Example extends React.Component {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => <a href="#">Print this out!</a>}
          content={() => this.componentRef}
          bodyClass={"printElement1"}
        />
        <ComponentToPrint propsRef={el => (this.componentRef = el)} />
      </div>
    );
  }
}

export default Example;
