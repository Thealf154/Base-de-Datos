import {
  IoCloseOutline,
  IoPencilOutline,
  IoTrashOutline,
} from "react-icons/io5";
import Popup from "reactjs-popup";
import React, { useEffect, useState } from "react";
import { subjects } from "types/types";
import "types/types";
import "reactjs-popup/dist/index.css";
import "css/popup.css";
import { useAuth } from "hooks/authHook";
import axios from "axios";

const DeleteSubject = ({ subjects }: { subjects: subjects[] | null }) => {
  const [formData, setFormData] = useState({});
  const [formHasBeenSumbited, setFormHasBeenSumbited] = useState(false);
  const auth = useAuth();

  const options = subjects
    ? subjects.map((element) => {
        return (
          <option key={element.id} value={element.id}>
            {element.id +
              ": " +
              element.teacher_name +
              " " +
              element.subject_name}
          </option>
        );
      })
    : null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (auth.accessToken) {
      axios({
        method: "POST",
        url: "http://localhost:3000/subjects",
        headers: { authorization: auth.accessToken },
        data: formData,
      })
        .then((response) => {
          setFormHasBeenSumbited(true);
          window.location.reload();
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
          <IoTrashOutline />
          <span className="button-component-text">Eliminar materia</span>
        </button>
      }
      position="right center"
      arrow={false}
      modal
    >
      {(close: VoidFunction) => (
        <>
          {!formHasBeenSumbited ? (
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
                <h2 className="popup-title">Eliminar Materia</h2>
                <div className="input-container">
                  <div className="input-item">
                    <label htmlFor="subject_name" className="popup-label">
                      ID de la materia
                    </label>
                    <select
                      name="subject_name"
                      id="subject_name"
                      className="popup-input"
                      required
                    >
                      {options}
                    </select>
                  </div>
                </div>
                <button type="submit" className="popup-form-submit">
                  Eliminar
                </button>
              </form>
            </div>
          ) : (
            close()
          )}
        </>
      )}
    </Popup>
  );
};

export default DeleteSubject;
