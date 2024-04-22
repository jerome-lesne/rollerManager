const teamsRouter = require("express").Router();
const { teamSet, teamSetForm } = require("../controllers/teamsControllers");
const upload = require("../services/multerService");

teamsRouter.post(
    "/add-team",
    upload("./public/images/teamsLogos").single("logo"),
    teamSet,
);
teamsRouter.get("/get-team-form", teamSetForm);

module.exports = teamsRouter;
