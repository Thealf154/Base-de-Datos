import React, { useEffect, useState } from "react";
import Table from "../Table";
import AddStudent from "./AddStudent";
import GetAverage from "./GetAverage";
import EditStudent from "./EditStudent";
import { IconContext } from "react-icons";
import { students, studentsAPIResponse } from "types/types";
import { useAuth } from "hooks/authHook";
import axios from "axios";
import "types/types";
import "css/students.css";
import DeleteStudent from "./DeleteStudent";

const Students = () => {
  const [data, setData] = useState<Array<students> | null>(null);
  const [selectedRows, setSelectedRows] = useState([{}]);
  const auth = useAuth();

  const columns = React.useMemo(
    () => [
      {
        Header: "Expediente",
        accessor: "id",
      },
      {
        Header: "Nombre",
        accessor: "first_name",
      },
      {
        Header: "Apellidos",
        accessor: "middle_and_last_name",
      },
      {
        Header: "Género",
        accessor: "gender",
      },
      {
        Header: "Dirección",
        accessor: "address",
      },
      {
        Header: "Facultad",
        accessor: "faculty",
      },
      {
        Header: "Semestre",
        accessor: "semester",
      },
      {
        Header: "Calificación",
        accessor: "grade",
      },
    ],
    []
  );

  const studentData = React.useMemo(() => data, [data]);

  const handleSetSelectedRows = (rows: Array<{}>) => {
    setSelectedRows(rows);
  };

  useEffect(() => {
    if (auth.accessToken) {
      axios({
        method: "GET",
        url: "http://localhost:3000/students",
        headers: { authorization: auth.accessToken },
      })
        .then((response) => {
          const students = response.data.message as Array<students>;
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
    }
    return () => {};
  }, []);

  const handleDeleteRow = (id: string) => {
    if (auth.accessToken) {
      axios({
        method: "DELETE",
        url: "http://localhost:3000/students",
        headers: { authorization: auth.accessToken },
        data: {
          id: id,
        },
      })
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
          if (error.response.data.message === "login_error") {
          } else {
          }
        });
    }
  };

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
              <EditStudent />
              <DeleteStudent />
              <GetAverage students={studentData} />
            </IconContext.Provider>
          </div>
        </div>
        <div className="grid-item">
          {studentData ? (
            <Table
              data={studentData}
              columns={columns}
              onDeleteRow={handleDeleteRow}
              onSelectedRows={handleSetSelectedRows}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Students;
