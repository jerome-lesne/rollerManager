const getEventForm = async (req, res) => {
    try {
        if (req.body.eventType === "training") {
            res.render("calendar/_newTrainingForm.html.twig", {
                start_select: req.body.start_select,
                end_select: req.body.end_select,
            });
        } else if (req.body.eventType === "match") {
            res.render("calendar/_newMatchForm.html.twig", {
                start_select: req.body.start_select,
                end_select: req.body.end_select,
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
        console.log(req.body);
        res.render("calendar/_newEventForm.html.twig");
    } catch (e) {
        res.status(500).send("server error");
    }
};

module.exports = { getEventForm, cancelCreateEvent, addTraining };
