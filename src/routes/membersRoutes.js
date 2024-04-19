const {
    memberSet,
    trialAttendeeSet,
    trialAttendeeDelete,
    generateSubLink,
} = require("../controllers/membersControllers");
const upload = require("../services/multerService");
const membersRouter = require("express").Router();

membersRouter.post("/new-member", upload.single("picture"), memberSet);
membersRouter.post("/new-trial", trialAttendeeSet);
membersRouter.delete("/delete-trial/:id", trialAttendeeDelete);
membersRouter.get("/generate-sub-link/:id", generateSubLink);

module.exports = membersRouter;
