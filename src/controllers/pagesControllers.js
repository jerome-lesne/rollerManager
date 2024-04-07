const home = (req, res) => {
    try {
        res.render("home/index.html.twig", {});
    } catch (e) {
        res.json(e);
    }
};

const login = (req, res) => {
    try {
        res.render("login/index.html.twig", {});
    } catch (e) {
        res.json(e);
    }
};

const tryReq = (req, res) => {
    try {
        res.render("try/index.html.twig", {});
    } catch (e) {
        res.json(e);
    }
};

module.exports = { home, login, tryReq };
