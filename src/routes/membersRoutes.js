const {
    memberSet,
    trialAttendeeSet,
    trialAttendeeDelete,
    generateSubLink,
} = require("../controllers/membersControllers");
const membersRouter = require("express").Router();

membersRouter.post("/new-member", memberSet);
membersRouter.post("/new-trial", trialAttendeeSet);
membersRouter.delete("/delete-trial/:id", trialAttendeeDelete);
membersRouter.get("/generate-sub-link/:id", generateSubLink);

module.exports = membersRouter;
