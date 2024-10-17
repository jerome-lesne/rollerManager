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
    deleteTraining,
    editMatchForm,
    editMatch,
    deleteMatch,
    coachTraining,
    cancelCoachTraining,
    addCoachTraining,
    getRoleMatchForm,
    editMatchRole,
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
eventsRouter.delete("/delete-training/:id", deleteTraining);
eventsRouter.get("/edit-match-form/:id", editMatchForm);
eventsRouter.post("/edit-match/:id", editMatch);
eventsRouter.delete("/delete-match/:id", deleteMatch);
eventsRouter.get("/coach-training/:id", coachTraining);
eventsRouter.get("/cancel-coach-training/:id", cancelCoachTraining);
eventsRouter.post("/add-coach-training/:id", addCoachTraining);
eventsRouter.get("/get-matchRole-form/:idMatch/:idAttendee", getRoleMatchForm);
eventsRouter.post("/edit-matchRole/:idMatch/:idAttendee", editMatchRole);

module.exports = eventsRouter;
