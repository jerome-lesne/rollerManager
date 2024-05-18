const eventsRouter = require("express").Router();
const {
    getEventForm,
    cancelCreateEvent,
} = require("../controllers/eventsController");

eventsRouter.post("/get-event-form", getEventForm);
eventsRouter.get("/cancel-create-event", cancelCreateEvent);

module.exports = eventsRouter;
