const pagesRouter = require("express").Router();
const {
    home,
    login,
    tryReq,
    dashboard,
    management,
    subscribe,
} = require("../controllers/pagesControllers");

pagesRouter.get("/", home);
pagesRouter.get("/login", login);
pagesRouter.get("/try", tryReq);
pagesRouter.get("/dashboard", dashboard);
pagesRouter.get("/management", management);
pagesRouter.get("/subscribe/:token", subscribe);

module.exports = pagesRouter;
