const pagesRouter = require("express").Router();
const {
    home,
    login,
    tryReq,
    dashboard,
    management,
} = require("../controllers/pagesControllers");

pagesRouter.get("/", home);
pagesRouter.get("/login", login);
pagesRouter.get("/try", tryReq);
pagesRouter.get("/dashboard", dashboard);
pagesRouter.get("/management", management);

module.exports = pagesRouter;
