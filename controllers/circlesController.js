const Circles = require("../models/circlesModel");

async function getAllCircles(req, res, next) {
  const circles = await Circles.find();

  if (!circles || circles.length <= 0) {
    return res.status(404).json({
      status: "fail",
      message: "no circles were found",
    });
  }

  res.status(200).json({
    status: "success",
    message: `${circles.length} circle(s) found.`,
    circles,
  });
}

async function getCircle(req, res, next) {
  const circle = await Circles.findById(req.params.id);

  if (!circle) {
    return res.status(404).json({
      status: "fail",
      message: "no circle were found with that id",
    });
  }

  res.status(200).json({
    status: "success",
    message: `'${circle.firstName}'s is found in the circle`,
    circle,
  });
}

async function createNewCircle(req, res, next) {
  const newCircle = await Circles.create(req.body);

  if (!newCircle) {
    return res.status(400).json({
      status: "fail",
      message: "Failed to create new circle",
    });
  }

  res.status(201).json({
    status: "successfully created new circle",
    newCircle,
  });
}

async function updateCircle(req, res, next) {
  const updatedCircle = await Circles.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedCircle) {
    return res.status(400).json({
      status: "fail",
      message: "Error happened while trying to update circle",
    });
  }

  res.status(200).json({
    status: "successfully updated circle",
    updatedCircle,
  });
}

async function getCircleReportForTG() {
  const today = new Date();

  console.log(today);

  const circle = await Circles.aggregate([
    {
      $match: {
        $expr: {
          $and: [
            {
              $eq: [
                {
                  $dayOfMonth: "$birthDay",
                },
                {
                  $dayOfMonth: today,
                },
              ],
            },
            {
              $eq: [
                {
                  $month: "$birthDay",
                },
                {
                  $month: today,
                },
              ],
            },
          ],
        },
      },
    },
  ]);

  if (!circle || circle.length <= 0) {
    return "No birthday's today chill out...😅🤣🤣";
  }

  return circle;
}

module.exports = {
  getAllCircles,
  getCircle,
  createNewCircle,
  updateCircle,
  getCircleReportForTG,
};
