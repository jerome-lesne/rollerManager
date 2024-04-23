const teamsRouter = require("express").Router();
const { teamSet, teamDelete } = require("../controllers/teamsControllers");
const upload = require("../services/multerService");

teamsRouter.post(
    "/add-team",
    upload("./public/images/teamsLogos").single("logo"),
    teamSet,
);
teamsRouter.delete("/delete-team/:id", teamDelete);

module.exports = teamsRouter;
