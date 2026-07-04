const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
});

module.exports = db;
