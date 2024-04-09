const memberModel = require("../models/membersModel");
const trialAttendeesModel = require("../models/trialAttendeesModel");

const memberSet = async (req, res) => {
    try {
        const member = new memberModel(req.body);
        member.validateSync();
        await member.save();
        res.send("New member saved");
    } catch (e) {
        res.json(e);
    }
};

const trialAttendeeSet = async (req, res) => {
    try {
        const trialAttendee = new trialAttendeesModel(req.body);
        trialAttendee.validateSync();
        await trialAttendee.save();
        res.redirect("/");
    } catch (e) {
        res.json(e);
    }
};

module.exports = { memberSet, trialAttendeeSet };
