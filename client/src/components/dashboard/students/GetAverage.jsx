import React from "react";
import { IoCalculatorOutline, IoCloseOutline } from "react-icons/io5";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "../../../css/popup.css";

const GetAverage = () => {
  return (
    <Popup
      trigger={
        <button className="button-component">
          <IoCalculatorOutline />
          <span className="button-component-text">Calcular promedio</span>
        </button>
      }
      position="right center"
      arrow={false}
      modal
    >
      {(close) => (
        <div className="popup-container">
          <button className="popup-close-button">
            <IoCloseOutline onClick={() => close()} className="close-popup" />
          </button>
          <form action="popup-title" className="popup-form" spellCheck="false">
            <h2 className="popup-title">Calcular Promedio</h2>
            <div className="input-container">
              <label htmlFor="first-partial" className="popup-label">
                Primer parcial
              </label>
              <input
                type="number"
                name="first-partial"
                id="first-partial"
                max={10}
                min={0}
                autoComplete="off"
                className="popup-input"
                placeholder="10"
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="name" className="popup-label">
                Segundo Parcial
              </label>
              <input
                type="number"
                name="name"
                id="name"
                max={10}
                min={0}
                placeholder="10"
                autoComplete="off"
                className="popup-input"
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="last-name" className="popup-label">
                Tercer parcial
              </label>
              <input
                type="number"
                name="last-name"
                id="last-name"
                max={10}
                min={0}
                autoComplete="off"
                placeholder="10"
                className="popup-input"
                required
              />
            </div>
            <button type="submit" className="popup-form-submit">
              Calcular
            </button>
          </form>
        </div>
      )}
    </Popup>
  );
};

export default GetAverage;
