import React, { Component } from "react";
import { Button } from "react-bootstrap";
//import { AuthContext } from "../contexts/AuthContext";

export class AddDepModal extends Component {
  //static contextType = AuthContext;

  render() {
    return (
      //   show={this.props.show}
      //   onHide={this.props.onHide}

      //   // {...this.props}
      //   // size="xsm"
      //   // aria-labelledby="contained-modal-title-vcenter"
      //   centered
      //   dialogClassName="my-modal"
      // >

      //   <Modal.Header closeButton className="tittle2" style={{height:'40px', padding:'10px'}}>

      //     <h5  style={{color:'white'}}>
      //     {this.props.heading} {this.props.currentObject}
      //     </h5>
      //   </Modal.Header>

      //   <Modal.Body className="mbody"  >
      //     <div className="container">{this.props.msg}</div>
      //   </Modal.Body>
      //   <Modal.Footer className="footer">
      //     <Button className="modalButton"
      //       variant="primary"
      //       onClick={() => this.props.onBtn1(this.props.currentObject)}
      //     >
      //       {this.props.btn1Text}
      //     </Button>
      //     <Button className="modalButton" variant="danger" onClick={this.props.onBtn2}>
      //       {this.props.btn2Text}
      //     </Button>
      //   </Modal.Footer>

      // </Modal>

      // <div class="portfolio-modal modal fade" id="portfolioModal1" tabindex="-1" role="dialog" aria-hidden="true">
      <div className="modal modal-danger fade" id="modal-danger">
        <div className="modal-dialog" style={{ top: "35%" }}>
          <div
            className="modal-content"
            show={this.props.show}
            onHide={this.props.onHide}
            {...this.props}
            // size="xsm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="my-modal"
          >
            <div
              className="modal-header"
              closeButton
              className="tittle2"
              style={{ height: "40px", padding: "10px" }}
            >
              <h5 style={{ color: "white" }}>
                {this.props.heading} {this.props.currentObject}
              </h5>
            </div>
            <div
              className="modal-body"
              className="mbody"
              style={{ height: "90px" }}
            >
              <div className="container">
                <h4>{this.props.msg}</h4>
              </div>
            </div>
            <div className="modal-footer">
              <Button
                className="modalButton"
                variant="primary"
                data-dismiss="modal"
                onClick={() => this.props.onBtn1(this.props.currentObject)}
              >
                {this.props.btn1Text}
              </Button>

              <button
                type="button"
                className="btn btn-outline pull-right"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
