const clubsRouter = require("express").Router();
const {
    addMatchRole,
    deleteMatchRole,
} = require("../controllers/clubsControllers");

clubsRouter.post("/add-match-role", addMatchRole);
clubsRouter.delete("/delete-match-role/:role", deleteMatchRole);

module.exports = clubsRouter;
