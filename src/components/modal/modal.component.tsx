import React from 'react'
import Modal, { ModalProps } from "react-bootstrap/Modal";
import './modal.styles.scss'

export const CommonModal:React.FC<ModalProps> = (props)=> {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="w-100">
          {props.heading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
          <Modal.Footer>{props.footer}</Modal.Footer>
    </Modal>
  );
}

