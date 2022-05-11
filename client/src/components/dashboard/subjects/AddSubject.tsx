import React, { useState } from "react";
import { IoAddOutline, IoCloseOutline } from "react-icons/io5";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "css/popup.css";
import axios from "axios";
import { useAuth } from "hooks/authHook";


type formDataType = {
  subject_name: string;
  semester: string;
  teacher_name: string;
  teacher_email: string;
  description: string;
};

const AddSubject = () => {
  const [formData, setFormData] = useState({} as formDataType);
  const auth = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (auth.accessToken) {
      axios({
        method: "POST",
        url: "http://localhost:3000/students",
        headers: { authorization: auth.accessToken },
        data: formData,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Popup
      trigger={
        <button className="button-component">
          <IoAddOutline />
          <span className="button-component-text">Añadir estudiante</span>
        </button>
      }
      position="right center"
      arrow={false}
      modal
    >
      {(close: VoidFunction) => (
        
<div className="popup-container">
              <button className="popup-close-button">
                <IoCloseOutline
                  onClick={() => close()}
                  className="close-popup"
                />
              </button>
              <form
                className="popup-form"
                spellCheck="false"
                onSubmit={handleSubmit}
              >
                <h2 className="popup-title">Añadir Materia</h2>
                <div className="input-container">
                  <div className="input-item">
                    <label htmlFor="subject_name" className="popup-label">
                      Nombre de la materia
                    </label>
                    <input
                      type="text"
                      name="subject_name"
                      id="subject_name"
                      maxLength={120}
                      autoComplete="off"
                      className="popup-input"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="input-container">
                  <div className="input-item">
                    <label htmlFor="teacher_name" className="popup-label">
                      Nombre del maestro
                    </label>
                    <input
                      type="text"
                      name="teacher_name"
                      id="teacher_name"
                      max={10}
                      autoComplete="off"
                      className="popup-input"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="input-container">
                  <div className="input-item">
                    <label htmlFor="teacher_email" className="popup-label">
                      Correo del maestro
                    </label>
                    <input
                      type="text"
                      name="teacher_email"
                      id="teacher_email"
                      autoComplete="off"
                      className="popup-input"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="input-container">
                  <div className="input-item">
                    <label htmlFor="semester" className="popup-label">
                      Semestre
                    </label>
                    <input
                      type="number"
                      name="semester"
                      id="semester"
                      autoComplete="off"
                      className="popup-input"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="input-container">
                  <div className="input-item">
                    <label htmlFor="description" className="popup-label">
                      Descripción de la materia (150 caracteres)
                    </label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      maxLength={150}
                      autoComplete="off"
                      className="popup-input"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <button type="submit" className="popup-form-submit">
                  Registrar
                </button>
              </form>
            </div>
      )}
    </Popup>
  );
};

export default AddSubject;
