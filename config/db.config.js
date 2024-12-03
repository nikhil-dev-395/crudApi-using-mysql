const mysql = require("mysql2/promise");
const mysqlPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "nike@2997",
  database: "user_db",
});
module.exports = mysqlPool;
