const getEventForm = async (req, res) => {
    try {
        if (req.body.eventType === "training") {
            res.render("calendar/_newTrainingForm.html.twig");
        } else if (req.body.eventType === "match") {
            res.render("calendar/_newMatchForm.html.twig");
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

module.exports = { getEventForm, cancelCreateEvent };
