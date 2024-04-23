const teamsRouter = require("express").Router();
const { teamSet } = require("../controllers/teamsControllers");
const upload = require("../services/multerService");

teamsRouter.post(
    "/add-team",
    upload("./public/images/teamsLogos").single("logo"),
    teamSet,
);
teamsRouter.delete("/delete-team");

module.exports = teamsRouter;
