const pagesRouter = require("express").Router();
const {
    home,
    login,
    tryReq,
    dashboard,
    management,
    subscribe,
} = require("../controllers/pagesControllers");
const authguard = require("../services/authguardService");

pagesRouter.get("/", home);
pagesRouter.get("/login", login);
pagesRouter.get("/try", tryReq);
pagesRouter.get("/dashboard", authguard(), dashboard);
pagesRouter.get("/management", authguard("Bureau"), management);
pagesRouter.get("/subscribe/:token", subscribe);

module.exports = pagesRouter;
