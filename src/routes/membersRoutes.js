const {
    memberSet,
    trialAttendeeSet,
    trialAttendeeDelete,
    generateSubLink,
    memberConnect,
    memberDisconnect,
    memberFormEdit,
    cancelMemberEdit,
    editMember,
    deleteMember,
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
membersRouter.get("/edit-member-form/:id", memberFormEdit);
membersRouter.get("/cancel-member-form/:id", cancelMemberEdit);
membersRouter.put("/edit-member/:id", editMember);
membersRouter.delete("/delete-member/:id", deleteMember);

module.exports = membersRouter;
