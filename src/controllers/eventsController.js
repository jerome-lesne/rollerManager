const clubsModel = require("../models/clubsModel");
const matchesModel = require("../models/matchesModel");
const membersModel = require("../models/membersModel");
const trainingsModel = require("../models/trainingsModel");
const checkMapsLink = require("../utils/mapsLinkHandler");
const { tryReq } = require("./pagesControllers");

const getEventForm = async (req, res) => {
    try {
        if (req.body.eventType === "training") {
            res.render("calendar/_newTrainingForm.html.twig", {
                start_select: req.body.start_select,
                end_select: req.body.end_select,
                allDay_select: req.body.allDay_select,
            });
        } else if (req.body.eventType === "match") {
            const club = await clubsModel
                .findOne({
                    members: req.session.memberId,
                })
                .populate("teams");
            res.render("calendar/_newMatchForm.html.twig", {
                start_select: req.body.start_select,
                end_select: req.body.end_select,
                allDay_select: req.body.allDay_select,
                teams: club.teams,
            });
        } else {
            res.status(500).send("server error");
        }
    } catch (e) {
        res.status(500).send("server error");
    }
};

const cancelCreateEvent = async (req, res) => {
    try {
        res.render("calendar/_newEventForm.html.twig");
    } catch (e) {
        res.status(500).send("server error");
    }
};

const addTraining = async (req, res) => {
    try {
        let data = JSON.parse(JSON.stringify(req.body));
        if (data.allDay === "on") {
            data.allDay = true;
        } else {
            data.allDay = false;
        }
        data.club = await clubsModel
            .findOne({ members: req.session.memberId })
            .select("_id");
        const training = new trainingsModel(data);
        training.validateSync();
        await training.save();
        res.status(201).render("calendar/_newEventForm.html.twig");
    } catch (e) {
        if (e.errors) {
            res.setHeader("HX-Retarget", "#modal-box");
            res.render("calendar/_newTrainingForm.html.twig", {
                error: e.errors,
                values: req.body,
            });
        } else {
            res.status(500).send("server error");
        }
    }
};

const addMatch = async (req, res) => {
    try {
        let data = JSON.parse(JSON.stringify(req.body));
        if (data.allDay === "on") {
            data.allDay = true;
        } else {
            data.allDay = false;
        }
        data.club = await clubsModel
            .findOne({ members: req.session.memberId })
            .select("_id");
        const mapLink = checkMapsLink(data.mapLink);
        if (mapLink) {
            data.mapLink = mapLink;
        }
        const match = new matchesModel(data);
        match.validateSync();
        await match.save();
        res.status(201).render("calendar/_newEventForm.html.twig");
    } catch (e) {
        if (e.errors) {
            const club = await clubsModel
                .findOne({
                    members: req.session.memberId,
                })
                .populate("teams");
            res.setHeader("HX-Retarget", "#modal-box");
            res.render("calendar/_newMatchForm.html.twig", {
                error: e.errors,
                values: req.body,
                teams: club.teams,
            });
        } else {
            res.status(500).send("server error");
        }
    }
};

const getTrainingsEvents = async (req, res) => {
    try {
        const { start, end } = req.query;
        const events = await trainingsModel.find({
            club: await clubsModel.findOne({ members: req.session.memberId }),
            start: { $gte: new Date(start) },
            end: { $lte: new Date(end) },
        });
        const calendarTrainingsEvents = events.map((event) => ({
            id: event._id,
            title: "Entrainement",
            start: event.start,
            end: event.end,
            allDay: event.allDay,
            extendedProps: {
                type: "training",
            },
        }));
        res.json(calendarTrainingsEvents);
    } catch (e) {
        res.status(500).send(e.message);
    }
};

const getMatchesEvents = async (req, res) => {
    try {
        const { start, end } = req.query;
        const events = await matchesModel
            .find({
                club: await clubsModel.findOne({
                    members: req.session.memberId,
                }),
                start: { $gte: new Date(start) },
                end: { $lte: new Date(end) },
            })
            .populate("team");
        const calendarMatchesEvents = events.map((event) => ({
            id: event._id,
            title: "Match | " + event.team.name + " VS " + event.opponent,
            start: event.start,
            end: event.end,
            allDay: event.allDay,
            extendedProps: {
                type: "match",
            },
        }));
        res.json(calendarMatchesEvents);
    } catch (e) {
        res.status(500).send(e.message);
    }
};

const getEvent = async (req, res) => {
    try {
        switch (req.headers.eventtype) {
            case "training":
                const currentUserInTraining = await trainingsModel.findOne({
                    _id: req.params.id,
                    "attendees.member": req.session.memberId,
                });
                let userInTraining;
                currentUserInTraining
                    ? (userInTraining = true)
                    : (userInTraining = false);
                const training = await trainingsModel
                    .findById(req.params.id)
                    .populate({
                        path: "attendees.member",
                        populate: {
                            path: "team",
                        },
                    });
                res.render("calendar/_displayTraining.html.twig", {
                    training: training,
                    userInTraining: userInTraining,
                    connectedMember: req.session.memberId,
                });
                break;
            case "match":
                const currentUserInMatch = await matchesModel.findOne({
                    _id: req.params.id,
                    "attendees.member": req.session.memberId,
                });
                let userInMatch;
                currentUserInMatch
                    ? (userInMatch = true)
                    : (userInMatch = false);
                const match = await matchesModel
                    .findById(req.params.id)
                    .populate("team")
                    .populate({
                        path: "attendees.member",
                        populate: {
                            path: "team",
                        },
                    });
                res.render("calendar/_displayMatch.html.twig", {
                    match: match,
                    userInMatch: userInMatch,
                    connectedMember: req.session.memberId,
                });
                break;
            default:
                break;
        }
    } catch (e) {
        console.log(e);
    }
};

const attendMatch = async (req, res) => {
    try {
        const memberAttend = req.session.memberId;
        const match = await matchesModel.findOne({
            _id: req.params.id,
            "attendees.member": memberAttend,
        });
        if (!match) {
            await matchesModel.updateOne(
                { _id: req.params.id },
                { $push: { attendees: { member: memberAttend } } },
            );
            const member = await membersModel
                .findById(memberAttend)
                .populate("team");
            res.render("calendar/_matchAttendeeElmt.html.twig", {
                attendee: { member: member },
                swapBtn: `<button id="withdraw" class="btn btn-error btn-sm md:btn-md" type="button"
                    hx-get="/withdraw-from-match/${req.params.id}" hx-target="#id_${memberAttend}"
                    hx-swap="outerHTML swap:1s" hx-confirm="Confirmez-vous votre désinscription ?" hx-swap-oob='outerHTML:#attend'>Se
                    désinscrire</button>`,
            });
        } else {
            res.send("le membre participe déjà à l'événement");
        }
    } catch (e) {
        console.log(e);
        res.status(500).send("Erreur serveur");
    }
};

const withdrawFromMatch = async (req, res) => {
    try {
        await matchesModel.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { attendees: { member: req.session.memberId } } },
        );
        const response = `<button id='attend' class='btn btn-primary btn-sm md:btn-md' type='button'
                        hx-swap-oob='outerHTML:#withdraw' hx-get='/attend-match/${req.params.id}' 
                        hx-target='next tbody' hx-swap='afterbegin' hx-confirm='Confirmez-vous votre participation ?'>Participer !</button>`;
        res.status(200).send(response);
    } catch (e) {
        console.log(e);
        res.status(500).send("Erreur serveur");
    }
};

const attendTraining = async (req, res) => {
    try {
        const memberAttend = req.session.memberId;
        const training = await trainingsModel.findOne({
            _id: req.params.id,
            "attendees.member": memberAttend,
        });
        if (!training) {
            await trainingsModel.updateOne(
                { _id: req.params.id },
                { $push: { attendees: { member: memberAttend } } },
            );
            const member = await membersModel
                .findById(memberAttend)
                .populate("team");
            res.render("calendar/_trainingAttendeeElmt.html.twig", {
                attendee: { member: member },
                swapBtn: `<button id="withdraw" class="btn btn-error btn-sm md:btn-md" type="button"
                    hx-get="/withdraw-from-training/${req.params.id}" hx-target="#id_${memberAttend}"
                    hx-swap="outerHTML swap:1s" hx-confirm="Confirmez-vous votre désinscription ?" hx-swap-oob='outerHTML:#attend'>Se
                    désinscrire</button>`,
            });
        } else {
            res.send("le membre participe déjà à l'événement");
        }
    } catch (e) {
        console.log(e);
        res.status(500).send("Erreur serveur");
    }
};

const withdrawFromTraining = async (req, res) => {
    try {
        await trainingsModel.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { attendees: { member: req.session.memberId } } },
        );
        const response = `<button id='attend' class='btn btn-primary btn-sm md:btn-md' type='button'
                        hx-swap-oob='outerHTML:#withdraw' hx-get='/attend-training/${req.params.id}' 
                        hx-target='next tbody' hx-swap='afterbegin' hx-confirm='Confirmez-vous votre participation ?'>Participer !</button>`;
        res.status(200).send(response);
    } catch (e) {
        console.log(e);
        res.status(500).send("Erreur serveur");
    }
};

const editTrainingForm = async (req, res) => {
    try {
        const training = await trainingsModel.findById(req.params.id);
        res.render("calendar/_editTrainingForm.html.twig", {
            values: training,
            trainingId: req.params.id,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send("Erreur serveur");
    }
};

const editTraining = async (req, res) => {
    try {
        let data = JSON.parse(JSON.stringify(req.body));
        await trainingsModel.updateOne({ _id: req.params.id }, data, {
            runValidators: true,
            context: "query",
        });
        res.status(201).render("calendar/_newEventForm.html.twig");
    } catch (e) {
        if (e.errors) {
            res.setHeader("HX-Retarget", "#modal-box");
            res.render("calendar/_editTrainingForm.html.twig", {
                error: e.errors,
                values: req.body,
                trainingId: req.params.id,
            });
        } else {
            res.status(500).send("server error");
        }
    }
};

module.exports = {
    getEventForm,
    cancelCreateEvent,
    addTraining,
    getTrainingsEvents,
    addMatch,
    getMatchesEvents,
    getEvent,
    attendMatch,
    withdrawFromMatch,
    attendTraining,
    withdrawFromTraining,
    editTrainingForm,
    editTraining,
};
