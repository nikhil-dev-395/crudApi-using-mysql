/* controllers */

const mysqlPool = require("../config/db.config");

/*
 * get all users
 */

const allUsers = async (req, res) => {
  try {
    let data = await mysqlPool.query("SELECT * FROM user");
    if (data[0].length === 0) {
      res.status(404).json({
        success: false,
        message: "all users not found",
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "all users",
      data: data[0],
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/*get user by id*/

const getUserById = async (req, res) => {
  try {
    let userId = req.params.id;
    if (!userId) {
      res.send("userid not find");
    }
    let data = await mysqlPool.query(`SELECT * FROM user WHERE id=?`, [userId]);

    if (data[0].length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "user found successfully",
      data: data[0],
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error at getUserById",
      error: error.message,
    });
  }
};

/* register user controller , from here we are going register the user to our app */
const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(500).json({
        success: false,
        message: "please provide username or password",
      });
    }

    let data = await mysqlPool.query(
      "INSERT INTO user (username , password) VALUES(?,?)",
      [username, password]
    );
    if (!data) {
      res.status(400).json({
        success: false,
        message: "user not created",
      });
    }

    res.status(201).json({
      success: true,
      message: "user created successfully",
      data: data[0],
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* login - is a post method which will helps us to login the user */
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide username and password",
      });
    }

    const data = await mysqlPool.query(
      "SELECT * FROM user WHERE username = ?  ",
      [username]
    );

    if (data[0].affectedRows === 0) {
      res.status(400).json({
        success: false,
        message: "user data not found",
      });
    }

    res.status(201).json({
      success: true,
      message: "user logged in successfully",
      data: data[0],
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* update user by using id , username and  password*/
const updateUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userId = req.params.id;
    if (!username || !password) {
      res.status(404).json({
        success: false,
        message: "please provide username or password",
      });
    }

    if (!userId) {
      res.status(404).json({
        success: false,
        message: "please provide username or password",
      });
    }

    const data = await mysqlPool.query(
      "UPDATE user SET username = ? , password = ? WHERE id = ? ",
      [username, password, userId]
    );

    if (data[0].affectedRows === 0) {
      res.status(400).json({
        success: false,
        message: "data not found",
      });
    }

    res.status(201).json({
      success: true,
      message: "user updated successfully...",
      data: data[0],
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/*  deleteUser - delete the user using id from params */
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Please provide the userId",
      });
    }

    const data = await mysqlPool.query("DELETE FROM user WHERE id = ?", [
      userId,
    ]);

    if (data[0].affectedRows === 0) {
      console.log("delete data not found");
      return res.status(400).json({
        success: false,
        message: "delete data not found",
      });
    }

    console.log("user deleted successfully");
    res.status(201).json({
      success: true,
      message: "user deleted successfully",
      data: data[0],
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  allUsers,
  getUserById,
  register,
  login,
  updateUser,
  deleteUser,
};
