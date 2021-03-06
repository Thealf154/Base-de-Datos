const mysql = require("mysql");
const util = require("util");

//This will create multiple connections
const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "base_datos_2"
});

//All the database requests wil be JS promises
pool.query = util.promisify(pool.query);

module.exports = pool;