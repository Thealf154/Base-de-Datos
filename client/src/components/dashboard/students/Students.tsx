import React, { useEffect, useState } from "react";
import Table from "../Table";
import AddStudent from "./AddStudent";
import GetAverage from "./GetAverage";
import { IconContext } from "react-icons";
import { students, studentsAPIResponse } from "types/types";
import { useAuth } from "hooks/authHook";
import axios from "axios";
import "types/types";
import "css/students.css";

const Students = () => {
  const [data, setData] = useState<Array<students> | null>(null);
  const auth = useAuth();

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
        accessor: "last_name",
      },
      {
        Header: "Sexo",
        accessor: "sex",
      },
      {
        Header: "Grade",
        accessor: "grade",
      },
    ],
    []
  );

  const studentData = React.useMemo(() => data, [data]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:3000/students",
      data: { accessToken: auth.accessToken },
    })
      .then((response) => {
        const students = response.data.students as Array<students>;
        /*students.map((element) => {
          element['lastAndMiddleName'] = element.last_name + element.middle_name;
        });*/
        setData(students);
      })
      .catch((error) => {
        if (error.response.data.message === "login_error") {
        } else {
        }
      });
    return () => {};
  });

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
              <GetAverage students={studentData}/>
            </IconContext.Provider>
          </div>
        </div>
        <div className="grid-item">
          {studentData ? <Table data={studentData} columns={columns} /> : null}
        </div>
      </div>
    </div>
  );
};

export default Students;
