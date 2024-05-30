const eventsRouter = require("express").Router();
const {
    getEventForm,
    cancelCreateEvent,
    addTraining,
    getTrainingsEvents,
    addMatch,
    getMatchesEvents,
    getEvent,
    attendMatch,
    withdrawFromMatch,
} = require("../controllers/eventsController");

eventsRouter.post("/get-event-form", getEventForm);
eventsRouter.get("/cancel-create-event", cancelCreateEvent);
eventsRouter.post("/add-training", addTraining);
eventsRouter.post("/add-match", addMatch);
eventsRouter.get("/get-trainings-events", getTrainingsEvents);
eventsRouter.get("/get-matches-events", getMatchesEvents);
eventsRouter.get("/get-event/:id", getEvent);
eventsRouter.get("/attend-match/:id", attendMatch);
eventsRouter.get("/withdraw-from-match/:id", withdrawFromMatch);

module.exports = eventsRouter;
