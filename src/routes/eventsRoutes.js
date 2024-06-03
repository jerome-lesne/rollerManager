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
    attendTraining,
    withdrawFromTraining,
    editTrainingForm,
    editTraining,
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
eventsRouter.get("/attend-training/:id", attendTraining);
eventsRouter.get("/withdraw-from-training/:id", withdrawFromTraining);
eventsRouter.get("/edit-training-form/:id", editTrainingForm);
eventsRouter.post("/edit-training/:id", editTraining);

module.exports = eventsRouter;
