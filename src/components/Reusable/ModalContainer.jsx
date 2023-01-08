import React from "react";

const ModalContainer = ({ children }) => {
  return <div className="modal-container" style={{ zIndex: 999999999999 }}>{children}</div>;
};

export default ModalContainer;
