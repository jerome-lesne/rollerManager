const teamsModel = require("../models/teamsModel");

const teamSet = async (req, res) => {
    try {
        console.log(req.body);
        const team = new teamsModel(req.body);
        if (req.file) {
            team.logo = req.file.filename;
        }
        team.validateSync();
        await team.save();
        res.send();
    } catch (e) {
        res.json();
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
