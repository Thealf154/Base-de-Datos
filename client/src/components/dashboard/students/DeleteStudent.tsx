import { IoCloseOutline, IoPencilOutline } from "react-icons/io5";
import Popup from "reactjs-popup";
import React, { useEffect, useState } from "react";
import { students } from "types/types";
import "types/types";
import "reactjs-popup/dist/index.css";
import "css/popup.css";

const DeleteStudent = () => {
  return (
    <Popup
      trigger={
        <button className="button-component">
          <IoPencilOutline />
          <span className="button-component-text">Editar estudiante</span>
        </button>
      }
      position="right center"
      arrow={false}
      modal
    >
      {(close: VoidFunction) => (
        <div className="popup-container">
          <button className="popup-close-button" onClick={() => close()}>
            <IoCloseOutline  className="close-popup"/>
          </button>
          <form
            action="popup-title"
            className="popup-form"
            spellCheck="false"
          >
            <h2 className="popup-title">Añadir estudiante</h2>
            <div className="input-container">
              <label htmlFor="id" className="popup-label">
                Expediente
                <span className="required">*</span>
              </label>
              <input
                type="text"
                name="id"
                id="id"
                className="popup-input"
                placeholder="xxxxxxxxx"
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="name" className="popup-label">
                Nombre
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="popup-input"
                placeholder="Jhon"
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="last-name" className="popup-label">
                Apellidos
              </label>
              <input
                type="text"
                name="last-name"
                id="last-name"
                className="popup-input"
                placeholder="Smith"
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="id" className="popup-label">
                Sexo
              </label>
              <input
                list="sex"
                name="id"
                id="id"
                className="popup-input"
                placeholder="Seleccione sexo"
                required
              />
            </div>
            <datalist id="sex">
              <option value="Masculino"></option>
              <option value="Femenino"></option>
              <option value="No especificado"></option>
            </datalist>
            <button type="submit" className="popup-form-submit">
              Añadir
            </button>
          </form>
        </div>
      )}
    </Popup>
  );
};

export default DeleteStudent;              