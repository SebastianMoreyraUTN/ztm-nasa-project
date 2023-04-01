const { getAllPlanets } = require("../../models/planets.model");

function httpGetAllPlanets(req, res) {
  return res.status(200).send(getAllPlanets());
}

module.exports = { httpGetAllPlanets };
