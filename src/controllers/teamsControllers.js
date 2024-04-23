const teamsModel = require("../models/teamsModel");
const clubsModel = require("../models/clubsModel");
const fs = require("fs");

const teamSet = async (req, res) => {
    try {
        const team = new teamsModel(req.body);
        const club = await clubsModel.findOne({
            members: req.session.memberId,
        });
        if (req.file) {
            team.logo = req.file.filename;
        }
        if (req.errorMulter) {
            throw new Error();
        }
        team.validateSync();
        await team.save();
        await clubsModel.updateOne(
            { _id: club.id },
            { $push: { teams: team.id } },
        );
        res.send();
    } catch (e) {
        if (req.file) {
            fs.unlink(
                "public/images/teamsLogos/" + req.file.filename,
                (err) => {
                    console.log(err);
                },
            );
        }
        res.render("management/_teamsForm.html.twig", {
            errorMulter: req.errorMulter,
            error: e.errors,
        });
    }
};

const teamSetForm = async (req, res) => {
    try {
        res.render("management/_teamsForm.html.twig");
    } catch (e) {
        res.json(e);
    }
};

module.exports = { teamSet, teamSetForm };
