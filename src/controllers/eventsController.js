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
            res.render("calendar/_newMatchForm.html.twig", {
                start_select: req.body.start_select,
                end_select: req.body.end_select,
                allDay_select: req.body.allDay_select,
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
        const training = new trainingsModel(data);
        training.validateSync();
        await training.save();
        res.status(201).render("calendar/_newEventForm.html.twig");
    } catch (e) {
        res.status(500).send("server error");
    }
};

const getTrainingsEvents = async (req, res) => {
    try {
        const { start, end } = req.query;
        const events = await trainingsModel.find({
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

module.exports = {
    getEventForm,
    cancelCreateEvent,
    addTraining,
    getTrainingsEvents,
};
