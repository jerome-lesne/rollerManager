const eventsRouter = require("express").Router();
const {
    getEventForm,
    cancelCreateEvent,
    addTraining,
    getTrainingsEvents,
    addMatch,
    getMatchesEvents,
    getEvent,
} = require("../controllers/eventsController");

eventsRouter.post("/get-event-form", getEventForm);
eventsRouter.get("/cancel-create-event", cancelCreateEvent);
eventsRouter.post("/add-training", addTraining);
eventsRouter.post("/add-match", addMatch);
eventsRouter.get("/get-trainings-events", getTrainingsEvents);
eventsRouter.get("/get-matches-events", getMatchesEvents);
eventsRouter.get("/get-event/:id", getEvent);

module.exports = eventsRouter;
