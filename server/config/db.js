const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Admin@123",
  database: "fintrack",
});

module.exports = db;