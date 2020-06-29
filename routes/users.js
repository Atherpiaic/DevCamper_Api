const express = require("express");
const User = require("../models/User");

const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser
} = require("../controllers/Users");

const router = express.Router({ mergeParams: true });
const advancedResults = require("../middleware/advancedResult");
const { protect, authorize } = require("../middleware/auth");
router.use(protect);
router.use(authorize("admin"));
router
  .route("/")
  .get(advancedResults(User), getUsers)
  .post(createUser);

router
  .route("/:id")
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
