import { IoCalculatorOutline, IoCloseOutline } from "react-icons/io5";
import Popup from "reactjs-popup";
import React, { useEffect, useState } from "react";
import { students } from "types/types";
import "types/types";
import "reactjs-popup/dist/index.css";
import "css/popup.css";

const GetAverage = ({ students }: { students: students[] | null }) => {
  const [average, setAverage] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    studentID: "",
    firstPartial: 0,
    secondPartial: 0,
    thirdPartial: 0,
    fourthPartial: 0,
  });

  const options = students
    ? students.map((element) => {
        return (
          <option key={element.id} value={element.id}>
            {element.id + ": " + element.first_name + " " + element.last_name}
          </option>
        );
      })
    : null;

  const getAlertMessage = (): string => {
    const student = students?.filter(
      (student) => student.id === parseInt(formData.studentID)
    );

    const status = average
      ? average > 6
        ? "Ha aprobado"
        : "Ha reprobado"
      : "Error";

    if (student)
      return `El estudiante: "${
        student[0].first_name + " " + student[0].last_name
      }" de la facultad "${student[0].faculty_name}" en semestre ${
        student[0].semester
      }, obtuvo un promedio ${average}. ${status}`;
    else return "No se encontró el alumno señalado";
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    calculateAverage();
    const value = document.getElementById("studentID") as HTMLSelectElement;
    setFormData({
      ...formData,
      studentID: value.value,
    });
    if (average === 0) {
      alert("No se puede ingresar solo 0 en calificaciones");
    } else {
      alert(getAlertMessage());
    }
  };

  const handleInputGradeChange = (event: React.BaseSyntheticEvent) => {
    // console.log(event.target.name)
    // console.log(event.target.value)
    setFormData({
      ...formData,
      [event.target.name]: isNaN(parseFloat(event.target.value))
        ? 0
        : parseFloat(event.target.value),
    });
  };

  useEffect(() => {
    calculateAverage();
    return () => {};
  }, [formData]);

  const calculateAverage = () => {
    const average =
      (formData.firstPartial +
        formData.secondPartial +
        formData.thirdPartial +
        formData.fourthPartial) /
      4;

    setAverage(average);
  };

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
      {(close: VoidFunction) => (
        <div className="popup-container">
          <button className="popup-close-button">
            <IoCloseOutline onClick={() => close()} className="close-popup" />
          </button>
          <form
            className="popup-form"
            spellCheck="false"
            onSubmit={handleSubmit}
          >
            <h2 className="popup-title">Calcular Promedio</h2>
            <div className="input-container">
              <div className="input-item">
                <label htmlFor="studentID" className="popup-label">
                  Expediente
                </label>
                <select
                  name="studentID"
                  id="studentID"
                  className="popup-input"
                  required
                >
                  {options}
                </select>
              </div>
            </div>
            <div className="input-container">
              <div className="input-item">
                <label htmlFor="firstPartial" className="popup-label">
                  Primer parcial
                </label>
                <input
                  onChange={handleInputGradeChange}
                  type="number"
                  name="firstPartial"
                  id="firstPartial"
                  max={10}
                  min={0}
                  autoComplete="off"
                  className="popup-input"
                  placeholder="10"
                  required
                />
              </div>
              <div className="input-item">
                <label htmlFor="secondPartial" className="popup-label">
                  Segundo Parcial
                </label>
                <input
                  onChange={handleInputGradeChange}
                  type="number"
                  name="secondPartial"
                  id="secondPartial"
                  max={10}
                  min={0}
                  placeholder="10"
                  autoComplete="off"
                  className="popup-input"
                  required
                />
              </div>
            </div>
            <div className="input-container">
              <div className="input-item">
                <label htmlFor="thirdPartial" className="popup-label">
                  Tercer parcial
                </label>
                <input
                  onChange={handleInputGradeChange}
                  type="number"
                  name="thirdPartial"
                  id="thirdPartial"
                  max={10}
                  min={0}
                  autoComplete="off"
                  placeholder="10"
                  className="popup-input"
                  required
                />
              </div>
              <div className="input-item">
                <label htmlFor="fourthPartial" className="popup-label">
                  Cuarto parcial
                </label>
                <input
                  onChange={handleInputGradeChange}
                  type="number"
                  name="fourthPartial"
                  id="fouthPartial"
                  max={10}
                  min={0}
                  autoComplete="off"
                  placeholder="10"
                  className="popup-input"
                  required
                />
              </div>
            </div>
            <span>El promedio calculado es: {average}</span>
            <button type="submit" className="popup-form-submit">
              Registrar
            </button>
          </form>
        </div>
      )}
    </Popup>
  );
};

export default GetAverage;
