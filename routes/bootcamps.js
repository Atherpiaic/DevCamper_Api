const express = require("express");
const Bootcamp = require("../models/Bootcamp");
const advancedResults = require("../middleware/advancedResult");
const {
  getBootCamps,
  getBootCamp,
  createBootCamp,
  updateBootCamp,
  deleteBootCamps,
  getBootCampInRadius,
  bootcampPhotoUpload
} = require("../controllers/bootcamps.js");
const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

// Include other resource routers
const courseRouter = require("./courses");
const reviewsRouter = require("./reviews");

// Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);
router.use("/:bootcampId/reviews", reviewsRouter);

router.route("/radius/:zipcode/:distance").get(getBootCampInRadius);
router
  .route("/:id/photo")
  .put(protect, authorize("admin", "publisher"), bootcampPhotoUpload);
router
  .route("/")
  .get(advancedResults(Bootcamp, "Courses"), getBootCamps)
  .post(protect, createBootCamp);

router
  .route("/:id")
  .get(getBootCamp)
  .put(protect, authorize("admin", "publisher"), updateBootCamp)
  .delete(protect, authorize("admin", "publisher"), deleteBootCamps);

module.exports = router;
