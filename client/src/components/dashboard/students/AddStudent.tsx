import React, { useState } from "react";
import { IoAddOutline, IoCloseOutline } from "react-icons/io5";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "css/popup.css";
import axios from "axios";
import { useAuth } from "hooks/authHook";

type formDataType = {
  address: string;
  faculty: string;
  first_name: string;
  grade: string;
  last_name: string;
  middle_name: string;
  semester: string;
};

const AddStudent = () => {
  const [formData, setFormData] = useState({} as formDataType);
  const [formHasBeenSumbited, setFormHasBeenSumbited] = useState(false);
  const auth = useAuth();

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
          <IoAddOutline />
          <span className="button-component-text">Añadir estudiante</span>
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
                <h2 className="popup-title">Añadir Estudiante</h2>
                <div className="input-container">
                  <div className="input-item">
                    <label htmlFor="first_name" className="popup-label">
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      id="first_name"
                      max={10}
                      min={0}
                      autoComplete="off"
                      className="popup-input"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="input-container">
                  <div className="input-item">
                    <label htmlFor="middle_name" className="popup-label">
                      Apellido paterno
                    </label>
                    <input
                      type="text"
                      name="middle_name"
                      id="middle_name"
                      max={10}
                      autoComplete="off"
                      className="popup-input"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-item">
                    <label htmlFor="last_name" className="popup-label">
                      Apellido materno
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      id="last_name"
                      autoComplete="off"
                      className="popup-input"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="input-container">
                  <div className="input-item">
                    <label htmlFor="birth_date" className="popup-label">
                      Fecha de nacimiento
                    </label>
                    <input
                      type="date"
                      name="birth_date"
                      id="birth_date"
                      max={10}
                      min={0}
                      autoComplete="off"
                      className="popup-input"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-item">
                    <label htmlFor="gender" className="popup-label">
                      Género
                    </label>
                    <input
                      type="text"
                      name="gender"
                      id="gender"
                      max={10}
                      min={0}
                      autoComplete="off"
                      className="popup-input"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="input-container">
                  <div className="input-item">
                    <label htmlFor="address" className="popup-label">
                      Dirección
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      autoComplete="off"
                      className="popup-input"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="input-container">
                  <div className="input-item">
                    <label htmlFor="faculty" className="popup-label">
                      Facultad
                    </label>
                    <select
                      name="faculty"
                      id="faculty"
                      className="popup-input"
                      value={formData.faculty}
                      onChange={handleChange}
                    >
                      <option value="History Faculty of Arts">
                        History Faculty of Arts
                      </option>
                      <option value="Faculty of Classics">
                        Faculty of Classics
                      </option>
                      <option value="Faculty of Commerce ">
                        Faculty of Commerce
                      </option>
                      <option value="Faculty of Economics">
                        Faculty of Economics
                      </option>
                      <option value="Faculty of Education ">
                        Faculty of Education
                      </option>
                      <option value="Other faculties">Other faculties</option>
                      <option value="Faculty of Engineering">
                        Faculty of Engineering
                      </option>
                      <option value="Faculty of Graduate Studies">
                        Faculty of Graduate Studies
                      </option>
                      <option value="Faculty of Humanities">
                        Faculty of Humanities
                      </option>
                      <option value="Faculty of Information Technology">
                        Faculty of Information Technology
                      </option>
                      <option value="Faculty of Law">Faculty of Law</option>
                      <option value="Faculty of Management Studies">
                        Faculty of Management Studies
                      </option>
                      <option value="Faculty of Music">Faculty of Music</option>
                      <option value="Faculty of Natural Sciences">
                        Faculty of Natural Sciences
                      </option>
                      <option value="Faculty of Philosophy">
                        Faculty of Philosophy
                      </option>
                      <option value="Faculty of Political Science">
                        Faculty of Political Science
                      </option>
                      <option value="Notes and References">
                        Notes and References
                      </option>
                      <option value="Others">Others</option>
                    </select>
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
                      max={12}
                      min={0}
                      autoComplete="off"
                      placeholder="0 - 12"
                      className="popup-input"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-item">
                    <label htmlFor="grade" className="popup-label">
                      Calificación
                    </label>
                    <input
                      type="number"
                      name="grade"
                      id="grade"
                      max={10}
                      min={0}
                      autoComplete="off"
                      placeholder="0 - 10"
                      className="popup-input"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="popup-form-submit">
                  Registrar
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

export default AddStudent;
