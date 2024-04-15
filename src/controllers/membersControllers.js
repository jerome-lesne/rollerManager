const clubsModel = require("../models/clubsModel");
const memberModel = require("../models/membersModel");
const trialAttendeesModel = require("../models/trialAttendeesModel");
const crypto = require("crypto");

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

// const clubSet = async (req, res) => {
//     try {
//         const member = new clubsModel(req.body);
//         member.validateSync();
//         await member.save();
//         res.send("New club saved");
//     } catch (e) {
//         res.json(e);
//     }
// };

const trialAttendeeSet = async (req, res) => {
    try {
        const trialAttendee = new trialAttendeesModel(req.body);
        trialAttendee.validateSync();
        await trialAttendee.save();
        await clubsModel.updateOne(
            { _id: "66168500208d28d672b5efed" }, // A MODIFIER AVEC LA SESSION
            { $push: { trialAttendees: trialAttendee.id } },
        );
        res.render("try/index.html.twig", {
            sentSuccess: true,
        });
    } catch (e) {
        res.render("try/index.html.twig", {
            error: e,
        });
    }
};

const trialAttendeeDelete = async (req, res) => {
    try {
        const clubId = "66168500208d28d672b5efed"; // A MODIFIER REQ SESSION (findOne())
        if (clubId) {
            await clubsModel.updateOne(
                { trialAttendees: req.params.id },
                { $pull: { trialAttendees: req.params.id } },
            );
            await trialAttendeesModel.deleteOne({ _id: req.params.id });
            res.send();
        } else {
            res.json("club not found");
        }
    } catch (e) {
        res.json(e);
    }
};

const generateSubLink = async (req, res) => {
    try {
        const attendee = await trialAttendeesModel.findById(req.params.id);
        if (!attendee.subToken) {
            await trialAttendeesModel.updateOne(
                { _id: req.params.id },
                { subToken: crypto.randomBytes(32).toString("hex") },
            );
            res.status(200);
        } else {
            res.status(200);
        }
    } catch (e) {
        res.json(e);
    }
};

module.exports = {
    memberSet,
    trialAttendeeSet,
    trialAttendeeDelete,
    generateSubLink,
};
