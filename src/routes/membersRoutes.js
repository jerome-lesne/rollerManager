const {
    memberSet,
    trialAttendeeSet,
} = require("../controllers/membersControllers");
const membersRouter = require("express").Router();

membersRouter.post("/new-member", memberSet);
membersRouter.post("/new-trial", trialAttendeeSet);

module.exports = membersRouter;
