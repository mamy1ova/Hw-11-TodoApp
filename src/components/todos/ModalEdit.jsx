import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const ModalEdit = ({ active, setActive, children }) => {
  return ReactDOM.createPortal(
    <>
      <ModalActive
        className={active ? "modal_active" : "modal"}
        onClick={() => setActive(false)}
      >
        <div
          className={active ? "modal_content" : "modal"}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </ModalActive>
    </>,
    document.getElementById("portal")
  );
};

export default ModalEdit;

const ModalActive = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.7);
  z-index: 1000;
`
