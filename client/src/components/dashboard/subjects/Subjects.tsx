import React, { useEffect, useState } from "react";
import Table from "../Table";
import { IconContext } from "react-icons";
import { students, studentsAPIResponse, subjects } from "types/types";
import { useAuth } from "hooks/authHook";
import axios from "axios";
import "types/types";
import "css/students.css";
import AddStudent from "../students/AddStudent";
import DeleteSubject from "./DeleteSubject";
import EditSubject from "./EditSubject";
import AddSubject from "./AddSubject";

const Subjects = () => {
  const [data, setData] = useState<Array<subjects> | null>(null);
  const [selectedRows, setSelectedRows] = useState([{}]);
  const auth = useAuth();

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },

      {
        Header: "Materia",
        accessor: "subject_name",
      },
      {
        Header: "Maestro",
        accessor: "teacher_name",
      },

      {
        Header: "Email del maestro",
        accessor: "teacher_email",
      },
      {
        Header: "Semestre",
        accessor: "semester",
      },
      {
        Header: "Descripción",
        accessor: "description",
      },
    ],
    []
  );

  const studentData = React.useMemo(() => data, [data]);

  const handleSetSelectedRows = (rows: Array<{}>) => {
    setSelectedRows(rows);
  };


  const handleDeleteRow = (id: string) => {
    if (auth.accessToken) {
      axios({
        method: "DELETE",
        url: `http://localhost:3000/subjects/${id}`,
        headers: { authorization: auth.accessToken },
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

  useEffect(() => {
    if (auth.accessToken) {
      axios({
        method: "GET",
        url: "http://localhost:3000/subjects",
        headers: { authorization: auth.accessToken },
      })
        .then((response) => {
          const students = response.data.message as Array<subjects>;
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

  return (
    <div className="component-container">
      <h2 className="component-title">Materias</h2>
      <div className="component-grid">
        <div className="grid-item">
          <div className="buttons-container">
            <IconContext.Provider
              value={{ className: "button-icons", size: "1.5rem" }}
            >
              <AddSubject />
              <DeleteSubject subjects={data} />
              <EditSubject />
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

export default Subjects;
