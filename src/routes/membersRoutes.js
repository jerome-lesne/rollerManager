const { memberSet } = require("../controllers/membersControllers");
const membersRouter = require("express").Router();

membersRouter.post("/new-member", memberSet);

module.exports = membersRouter;
