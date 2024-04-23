const { MulterError } = require("multer");
const teamsModel = require("../models/teamsModel");

const teamSet = async (req, res) => {
    try {
        console.log(req.body);
        const team = new teamsModel(req.body);
        if (req.file) {
            team.logo = req.file.filename;
        }
        if (req.errorMulter) {
            throw new Error();
        }
        team.validateSync();
        await team.save();
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
