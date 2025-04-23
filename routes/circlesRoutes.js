const router = require("express").Router();

const {
  getAllCircles,
  createNewCircle,
  getCircle,
  updateCircle,
} = require("../controllers/circlesController");

router.route("/").get(getAllCircles).post(createNewCircle);

router.route("/:id").get(getCircle).patch(updateCircle);

module.exports = router;
