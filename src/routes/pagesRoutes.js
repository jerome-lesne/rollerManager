const pagesRouter = require("express").Router();
const {
    home,
    login,
    tryReq,
    members,
    management,
    subscribe,
    calendar,
} = require("../controllers/pagesControllers");
const authguard = require("../services/authguardService");

pagesRouter.get("/", home);
pagesRouter.get("/login", login);
pagesRouter.get("/try", tryReq);
pagesRouter.get("/members", authguard(), members);
pagesRouter.get("/management", authguard("Bureau"), management);
pagesRouter.get("/subscribe/:token", subscribe);
pagesRouter.get("/calendar", authguard(), calendar);

module.exports = pagesRouter;
