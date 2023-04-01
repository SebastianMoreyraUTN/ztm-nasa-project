const {
  getAllLaunches,
  addNewLaunch,
  deleteLaunch,
  existsLaunchWithId,
} = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpPostLaunch(req, res) {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.launchDate ||
    !launch.rocket ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }
  launch.destination = launch.target;

  addNewLaunch(launch);
  return res.status(201).json(launch);
}

function httpDeleteLaunch(req, res) {
  const launchId = Number(req.params.id);
  if (existsLaunchWithId(launchId)) {
    res.status(404).json({
      error: "Launch not found",
    });
  }
  const aborted = deleteLaunch(launchId);
  return res.status(202).json(aborted);
}

module.exports = {
  httpGetAllLaunches,
  httpPostLaunch,
  httpDeleteLaunch,
};
