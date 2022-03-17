import React from "react";
import Table from "../Table";
import AddStudent from "./AddStudent";
import GetAverage from "./GetAverage";
import "../../../css/students.css";
import { IconContext } from "react-icons";

const Students = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Expediente",
        accessor: "id",
      },
      {
        Header: "Nombre",
        accessor: "name",
      },
      {
        Header: "Apellidos",
        accessor: "lastName",
      },
      {
        Header: "Sexo",
        accessor: "sex",
      },
    ],
    []
  );

  const data = React.useMemo(
    () => [
      {
        id: Math.floor(Math.random() * 100000),
        name: "Alfredo",
        lastName: "Vanegas Arcega",
        sex: "Hombre",
      },
      {
        id: Math.floor(Math.random() * 100000),
        name: "Juan Carlos",
        lastName: "Santana",
        sex: "Mujer",
      },
      {
        id: Math.floor(Math.random() * 100000),
        name: "Alejandro",
        lastName: "Linares Figueroa",
        sex: "No binario",
      },
      {
        id: Math.floor(Math.random() * 100000),
        name: "Carlos",
        lastName: "Orduña",
        sex: "No binario",
      },
      {
        id: Math.floor(Math.random() * 100000),
        name: "Eroth",
        lastName: "Aválos Guerra",
        sex: "Hombre",
      },
      {
        id: Math.floor(Math.random() * 100000),
        name: "Erika",
        lastName: "Constantino Pulido",
        sex: "Mujer",
      },
      {
        id: Math.floor(Math.random() * 100000),
        name: "Carlos",
        lastName: "Orduña",
        sex: "No binario",
      },
      {
        id: Math.floor(Math.random() * 100000),
        name: "Raymundo",
        lastName: "García García",
        sex: "Hombre",
      },
    ],
    []
  );

  return (
    <div className="component-container">
      <h2 className="component-title">Alumnos</h2>
      <div className="component-grid">
        <div className="grid-item">
          <div className="buttons-container">
            <IconContext.Provider
              value={{ className: "button-icons", size: "1.5rem" }}
            >
              <AddStudent />
              <GetAverage />
            </IconContext.Provider>
          </div>
        </div>
        <div className="grid-item">
          <Table data={data} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default Students;
