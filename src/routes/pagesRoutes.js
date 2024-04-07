const pagesRouter = require("express").Router();
const { home, login, tryReq } = require("../controllers/pagesControllers");

pagesRouter.get("/", home);
pagesRouter.get("/login", login);
pagesRouter.get("/try", tryReq);

module.exports = pagesRouter;
