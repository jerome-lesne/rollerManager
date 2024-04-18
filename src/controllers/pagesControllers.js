const trialAttendeesModel = require("../models/trialAttendeesModel");

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

const dashboard = (req, res) => {
    try {
        res.render("dashboard/index.html.twig", {
            connectedHeader: true,
        });
    } catch (e) {
        res.json(e);
    }
};

const management = async (req, res) => {
    try {
        const trialAttendees = await trialAttendeesModel.find();
        res.render("management/index.html.twig", {
            connectedHeader: true,
            trialAttendees: trialAttendees,
        });
    } catch (e) {
        res.json(e);
    }
};

const subscribe = async (req, res) => {
    try {
        const attendee = await trialAttendeesModel.findOne({
            subToken: req.params.token,
        });
        if (attendee) {
            res.render("subscribe/index.html.twig", {
                token: req.params.token,
            });
        } else {
            res.redirect("/");
        }
    } catch (e) {
        res.json(e);
    }
};

module.exports = { home, login, tryReq, dashboard, management, subscribe };
