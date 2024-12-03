const router = require("express").Router();
/*files*/
const {
  allUsers,
  getUserById,
  register,
  updateUser,
  deleteUser,
  login,
} = require("../controllers/user.controllers");

/*routes*/
router.get("/allusers", allUsers);
router.get("/user/:id", getUserById);
router.post("/register", register);
router.post("/login", login);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);

module.exports = { userRouter: router };
