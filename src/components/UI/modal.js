import { Fragment } from "react";

import React from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";

import "./modal.css";

const Backdrop = (props) => {
  return <div onClick={props.Onclick} className="backdrop" />;
};

const ModalOverlay = (props) => {
  return (
    <div className="modal">
      <div className="content">{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  const dispatch = useDispatch();

  const onclickHandler = () => {
    dispatch(userActions.setModalstate(false));
  };

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop Onclick={onclickHandler} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
