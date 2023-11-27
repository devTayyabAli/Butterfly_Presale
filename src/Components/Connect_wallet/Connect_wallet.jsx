import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import metamask from "../Assets/metamask.png";

function Connect_wallet(props) {
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="connect_to_wallet_bg" closeButton>
          <Modal.Title id="contained-modal-title-vcenter text-center">
            Choose a wallet to connect
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center justify-content-center">
            <img src={metamask} className="metamask_pic" alt="" />
            <h6 className="text-dark text-bold fw-bold fs-3 ">Meta mask</h6>
          </div>
        </Modal.Body>
        <Modal.Footer className="footer">
          {/* <Button onClick={props.onHide}>Close</Button> */}
          <div className="d-flex justify-content-center">
            <button onClick={props.onHide} className="connect_to_wallet_home">
              Connect
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Connect_wallet;
