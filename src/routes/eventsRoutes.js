const eventsRouter = require("express").Router();
const {
    getEventForm,
    cancelCreateEvent,
    addTraining,
    getTrainingsEvents,
} = require("../controllers/eventsController");

eventsRouter.post("/get-event-form", getEventForm);
eventsRouter.get("/cancel-create-event", cancelCreateEvent);
eventsRouter.post("/add-training", addTraining);
eventsRouter.get("/get-trainings-events", getTrainingsEvents);

module.exports = eventsRouter;
