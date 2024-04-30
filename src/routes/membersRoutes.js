const {
    memberSet,
    trialAttendeeSet,
    trialAttendeeDelete,
    generateSubLink,
    memberConnect,
    memberDisconnect,
} = require("../controllers/membersControllers");
const authguard = require("../services/authguardService");
const upload = require("../services/multerService");
const membersRouter = require("express").Router();

membersRouter.post(
    "/new-member",
    upload("./public/images/idPictures").single("picture"),
    memberSet,
);
membersRouter.post("/new-trial", trialAttendeeSet);
membersRouter.delete(
    "/delete-trial/:id",
    authguard("Bureau"),
    trialAttendeeDelete,
);
membersRouter.get(
    "/generate-sub-link/:id",
    authguard("Bureau"),
    generateSubLink,
);
membersRouter.post("/connect", memberConnect);
membersRouter.get("/disconnect", memberDisconnect);

module.exports = membersRouter;
