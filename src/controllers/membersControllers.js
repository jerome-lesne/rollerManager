const clubsModel = require("../models/clubsModel");
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
            res.status(200).send(
                `Employee id: ${req.params.id} deleted succesfully`,
            );
        } else {
            res.json("club not found");
        }
    } catch (e) {}
};

module.exports = { memberSet, trialAttendeeSet, trialAttendeeDelete };
