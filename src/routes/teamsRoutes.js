const teamsRouter = require("express").Router();
const {
    teamSet,
    teamDelete,
    getInlineTeamForm,
    getInlineTeam,
    teamEdit,
} = require("../controllers/teamsControllers");
const upload = require("../services/multerService");

teamsRouter.post(
    "/add-team",
    upload("./public/images/teamsLogos").single("logo"),
    teamSet,
);
teamsRouter.delete("/delete-team/:id", teamDelete);
teamsRouter.get("/inline-team-form/:id", getInlineTeamForm);
teamsRouter.get("/inline-team/:id", getInlineTeam);
teamsRouter.post(
    "/edit-team/:id",
    upload("./public/images/teamsLogos").single("logo"),
    teamEdit,
);

module.exports = teamsRouter;
