import React, { useState } from "react";
import "../../css/popup.css"

const Popup = ({ children, isCalled }) => {

  return (
    <div className={isCalled ? "popup popup-active" : "popup-inactive"}>
      {children}
    </div>
  );
};

export default Popup;
