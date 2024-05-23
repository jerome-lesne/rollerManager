const clubsModel = require("../models/clubsModel");
const matchesModel = require("../models/matchesModel");
const trainingsModel = require("../models/trainingsModel");

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
        let data = req.body;
        if (data.allDay === "on") {
            data.allDay = true;
        } else {
            data.allDay = false;
        }
        data.club = await clubsModel.findOne({ members: req.session.memberId });
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
        let data = req.body;
        if (data.allDay === "on") {
            data.allDay = true;
        } else {
            data.allDay = false;
        }
        data.club = await clubsModel.findOne({ members: req.session.memberId });
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
        }));
        res.json(calendarMatchesEvents);
    } catch (e) {
        res.status(500).send(e.message);
    }
};

module.exports = {
    getEventForm,
    cancelCreateEvent,
    addTraining,
    getTrainingsEvents,
    addMatch,
    getMatchesEvents,
};
