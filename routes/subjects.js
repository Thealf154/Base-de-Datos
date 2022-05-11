const express = require("express");
const subjects = express.Router();
const db = require("../config/database");
const auth = require("../middleware/auth");

subjects.get("/", auth, async (req, res, next) => {
  //This will wait for the database and won't execute
  //anything else until a response
  const sbjct = await db.query("SELECT * FROM subjects");
  //Sends the database as a json, but only if the format is already in a json
  return res.status(200).json({ code: 200, message: sbjct });
});

//Expresión regular que acepta un grupo de tres números
subjects.get("/:id([0-9]{1,3})", async (req, res, next) => {
  const pokemon = await db.query("SELECT * FROM pokemon");
  const id = req.params.id - 1;
  if (id >= 0 && id < 722) {
    return res.status(200).json({ code: 200, message: pokemon[id] });
  }
  return res.status(404).json({ code: 404, message: "Student not found" });
});

//This only receives text requests
subjects.get("/:name([A-Za-z]+)", async (req, res, next) => {
  const name = req.params.name;
  let pokemon = await db.query(
    `SELECT pok_name FROM pokemon WHERE pok_name LIKE '%${name}%'`
  );
  if (pokemon.length > 0)
    return res.status(404).json({ code: 404, message: "Student not found" });
  return res.status(200).send(pokemon);
});

/* Post, Delete, and other routes*/
subjects.post("/", auth, async (req, res, next) => {
  const { subject_name, semester, teacher_name, teacher_email, description } =
    req.body;

  if (subject_name && semester && teacher_name && teacher_email) {
    let query =
      "INSERT INTO `subjects`(`subject_name`, `semester`, `teacher_name`, `teacher_email`, `description`) ";
    if (description) {
      query += `VALUES ('${subject_name}','${semester}','${teacher_name}','${teacher_email}','${description}')`;
    } else {
      query += `VALUES ('${subject_name}','${semester}','${teacher_name}','${teacher_email}', '')`;
    }
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

subjects.delete("/:id([0-9]{1,3})", auth , async (req, res, next) => {
  const query = `DELETE FROM subjects WHERE id=${req.params.id}`;
  console.log('xd');
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
subjects.put("/:id([0-9]{1,3})", async (req, res, next) => {
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

subjects.patch("/:id([0-9]{1,3})", async (req, res, next) => {
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

module.exports = subjects;
