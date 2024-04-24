const clubsRouter = require("express").Router();
const { addMatchRole } = require("../controllers/clubsControllers");

clubsRouter.post("/add-match-role", addMatchRole);

module.exports = clubsRouter;
