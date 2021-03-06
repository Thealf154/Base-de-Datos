const express = require("express");
const students = express.Router();
const db = require("../config/database");
const auth = require("../middleware/auth");

students.get("/", auth, async (req, res, next) => {
  //This will wait for the database and won't execute
  //anything else until a response
  const stdnt = await db.query(
    "SELECT students.*, CONCAT(students.middle_name, ' ', students.last_name) as 'middle_and_last_name' FROM students"
  );
  //Sends the database as a json, but only if the format is already in a json
  return res.status(200).json({ code: 200, message: stdnt });
});

//Expresión regular que acepta un grupo de tres números
students.get("/:id([0-9]{1,3})", async (req, res, next) => {
  const pokemon = await db.query("SELECT * FROM pokemon");
  const id = req.params.id - 1;
  if (id >= 0 && id < 722) {
    return res.status(200).json({ code: 200, message: pokemon[id] });
  }
  return res.status(404).json({ code: 404, message: "Student not found" });
});

//This only receives text requests
students.get("/:name([A-Za-z]+)", async (req, res, next) => {
  const name = req.params.name;
  let pokemon = await db.query(
    `SELECT pok_name FROM pokemon WHERE pok_name LIKE '%${name}%'`
  );
  if (pokemon.length > 0)
    return res.status(404).json({ code: 404, message: "Student not found" });
  return res.status(200).send(pokemon);
});

/* Post, Delete, and other routes*/
students.post("/", async (req, res, next) => {
  const {
    first_name,
    middle_name,
    last_name,
    birth_date,
    gender,
    address,
    faculty,
    semester,
    grade,
  } = req.body;

  if (
    first_name &&
    middle_name &&
    last_name &&
    birth_date &&
    gender &&
    address &&
    faculty &&
    semester &&
    grade
  ) {
    let query =
      "INSERT INTO `students`(`first_name`, `middle_name`, `last_name`, `birth_date`, `gender`, `address`, `faculty`, `semester`, `grade`)";
    query += ` VALUES ('${first_name}','${middle_name}','${last_name}','${birth_date}','${gender}','${address}','${faculty}','${semester}','${grade}')`;
    console.log(query);
    const rows = await db.query(query);
    if (rows.affectedRows == 1) {
      return res
        .status(200)
        .json({ code: 201, message: "Student added correctly" });
    }
    return res.status(500).json({ code: 500, message: "Data incomplete" });
  }
  return res
    .status(500)
    .json({ code: 500, message: "Pokemon insertado sin éxito" });
});

students.delete("/:id([0-9]{1,3})", async (req, res, next) => {
  const query = `DELETE FROM students WHERE pok_id=${req.params.id}`;
  const rows = await db.query(query);

  //This checks if only ONE column is affected
  if (rows.affectedRows == 1) {
    return res
      .status(200)
      .json({ code: 200, message: "Student deleted correctly" });
  }
  return res.status(404).json({ code: 404, message: "Student not found" });
});

//PUT is for changing all the values of datacell
students.put("/:id([0-9]{1,3})", async (req, res, next) => {
  const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;

  if (pok_name && pok_height && pok_base_experience && pok_weight) {
    let query = `UPDATE pokemon SET pok_name='${pok_name}', pok_height='${pok_height}', `;
    query += `pok_weight='${pok_weight}', pok_base_experience='${pok_base_experience}' WHERE pok_id='${req.params.id}' `;
    const rows = await db.query(query);
    if (rows.affectedRows == 1) {
      return res
        .status(200)
        .json({ code: 200, message: "Pokemon actualizado correctamente" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
  }

  return res
    .status(500)
    .json({ code: 500, message: "Pokemon actulizado sin éxito" });
});

students.patch("/:id([0-9]{1,3})", async (req, res, next) => {
  const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;

  if (req.body.pok_name) {
    let query = `UPDATE pokemon SET pok_name='${pok_name}' WHERE pok_id=${req.params.id}`;

    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
      return res
        .status(200)
        .json({ code: 200, message: "Pokemon actualizado correctamente" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
  }

  return res.status(500).json({ code: 500, message: "No existe el Pokemon" });
});

module.exports = students;
