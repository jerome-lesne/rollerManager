const membersModel = require("../models/membersModel");
const trialAttendeesModel = require("../models/trialAttendeesModel");
const teamsModel = require("../models/teamsModel");
const clubsModel = require("../models/clubsModel");

const home = (req, res) => {
    try {
        if (req.session.memberId) {
            res.redirect("/dashboard");
        } else {
            res.render("home/index.html.twig", {});
        }
    } catch (e) {
        res.json(e);
    }
};

const login = (req, res) => {
    try {
        if (req.session.memberId) {
            res.redirect("/dashboard");
        } else {
            res.render("login/index.html.twig", {});
        }
    } catch (e) {
        res.json(e);
    }
};

const tryReq = (req, res) => {
    try {
        if (req.session.memberId) {
            res.redirect("/dashboard");
        } else {
            res.render("try/index.html.twig", {});
        }
    } catch (e) {
        res.json(e);
    }
};

const dashboard = async (req, res) => {
    try {
        const member = await membersModel.findById(req.session.memberId);
        res.render("dashboard/index.html.twig", {
            connectedHeader: true,
            roles: member.role,
        });
    } catch (e) {
        res.json(e);
    }
};

const management = async (req, res) => {
    try {
        const teams = await teamsModel.find();
        const trialAttendees = await trialAttendeesModel.find();
        const member = await membersModel.findById(req.session.memberId);
        const club = await clubsModel.findOne({
            members: req.session.memberId,
        });
        res.render("management/index.html.twig", {
            connectedHeader: true,
            trialAttendees: trialAttendees,
            teams: teams,
            roles: member.role,
            matchRoles: club.matchRoles,
        });
    } catch (e) {
        console.log(e);
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

module.exports = {
    home,
    login,
    tryReq,
    dashboard,
    management,
    subscribe,
};
