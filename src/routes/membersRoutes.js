const {
    memberSet,
    trialAttendeeSet,
    trialAttendeeDelete,
} = require("../controllers/membersControllers");
const membersRouter = require("express").Router();

membersRouter.post("/new-member", memberSet);
membersRouter.post("/new-trial", trialAttendeeSet);
membersRouter.delete("/delete-trial/:id", trialAttendeeDelete);

module.exports = membersRouter;
