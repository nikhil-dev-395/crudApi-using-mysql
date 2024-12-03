const mysql = require("mysql2/promise");
const mysqlPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
});

module.exports = mysqlPool;
