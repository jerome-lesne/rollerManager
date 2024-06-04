const membersModel = require("../models/membersModel");
const trialAttendeesModel = require("../models/trialAttendeesModel");
const teamsModel = require("../models/teamsModel");
const clubsModel = require("../models/clubsModel");
const trainingsModel = require("../models/trainingsModel");
const matchesModel = require("../models/matchesModel");
const moment = require("moment");

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

const members = async (req, res) => {
    try {
        if (req.headers["hx-request"]) {
            const connectedMember = await membersModel.findById(
                req.session.memberId,
            );
            const searchTerm = req.query.search;
            const regex = new RegExp(searchTerm, "i");

            const query = {
                $or: [
                    { name: { $regex: regex } },
                    { firstName: { $regex: regex } },
                    { derbyName: { $regex: regex } },
                ],
            };

            if (req.query.team !== "") {
                query.team = req.query.team;
            }

            if (req.query.role !== "") {
                query.role = req.query.role;
            }

            const club = await clubsModel
                .findOne({
                    members: req.session.memberId,
                })
                .populate({
                    path: "members",
                    populate: {
                        path: "team",
                    },
                    match: query,
                })
                .populate("teams");

            res.render("members/_memberList.html.twig", {
                club: club,
                roles: connectedMember.role,
                connectedMember: connectedMember,
            });
        } else {
            const connectedMember = await membersModel.findById(
                req.session.memberId,
            );
            const club = await clubsModel
                .findOne({
                    members: req.session.memberId,
                })
                .populate({
                    path: "members",
                    populate: {
                        path: "team",
                    },
                })
                .populate("teams");
            res.render("members/index.html.twig", {
                title: "Membres",
                connectedHeader: true,
                roles: connectedMember.role,
                connectedMember: connectedMember,
                club: club,
            });
        }
    } catch (e) {
        res.json(e);
    }
};

const management = async (req, res) => {
    try {
        const connectedMember = await membersModel.findById(
            req.session.memberId,
        );
        const club = await clubsModel
            .findOne({
                members: req.session.memberId,
            })
            .populate("members")
            .populate("trialAttendees")
            .populate("teams");
        res.render("management/index.html.twig", {
            connectedHeader: true,
            trialAttendees: club.trialAttendees,
            teams: club.teams,
            roles: connectedMember.role,
            matchRoles: club.matchRoles,
            connectedMember: connectedMember,
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

const calendar = async (req, res) => {
    try {
        const connectedMember = await membersModel.findById(
            req.session.memberId,
        );
        const trainings = await trainingsModel.find();
        res.render("calendar/index.html.twig", {
            title: "Calendrier",
            connectedHeader: true,
            roles: connectedMember.role,
            connectedMember: connectedMember,
            trainings: trainings,
        });
    } catch (e) {
        console.log(e);
        res.json(e);
    }
};

const dashboard = async (req, res) => {
    try {
        const nextMatch = await matchesModel
            .findOne({ start: { $gte: new Date() } })
            .sort({ start: 1 });
        const today = moment();
        const startDate = moment(nextMatch.start);
        const daysToNextMatch = startDate.diff(today, "days");
        const upcomingMatchesNb = await matchesModel
            .find({
                club: await clubsModel.findOne({
                    members: req.session.memberId,
                }),
                start: { $gte: new Date() },
            })
            .countDocuments();
        const club = await clubsModel.findOne({
            members: req.session.memberId,
        });
        const connectedMember = await membersModel.findById(
            req.session.memberId,
        );
        res.render("dashboard/index.html.twig", {
            title: "Acceuil",
            connectedHeader: true,
            roles: connectedMember.role,
            connectedMember: connectedMember,
            membersNb: club.members.length,
            teamsNb: club.teams.length,
            trialNb: club.trialAttendees.length,
            upcomingMatchesNb: upcomingMatchesNb,
            daysToNextMatch: daysToNextMatch,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send("server error");
    }
};

module.exports = {
    home,
    login,
    tryReq,
    members,
    management,
    subscribe,
    calendar,
    dashboard,
};
