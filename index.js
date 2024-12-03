const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mysqlPool = require("./config/db.config");
const { userRouter } = require("./routes/user.routes");
require("dotenv").config();
const app = express();

/* middleware */
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); /*for development mode only*/

/*routes*/
app.use("/", userRouter);

/* server */
const port = process.env.PORT || 5670;
(async () => {
  try {
    await mysqlPool.query("SELECT 1");
    console.log("mysql connected");
    app.listen(port, () => {
      console.log("server is listening on http://localhost:" + port);
    });
  } catch (error) {
    console.log("Failed to connect to MySQL or start the server:", error);
  }
})();
