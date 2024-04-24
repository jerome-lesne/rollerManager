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
        } else {
            team.validateSync();
            await team.save();
            await clubsModel.updateOne(
                { _id: club.id },
                { $push: { teams: team.id } },
            );
            res.render("management/_teamListElmt.html.twig", { team: team });
        }
    } catch (e) {
        if (req.file) {
            fs.unlink(
                "public/images/teamsLogos/" + req.file.filename,
                (err) => {
                    if (err) {
                        console.log(err);
                    }
                },
            );
        }
        res.setHeader("HX-Retarget", "this");
        res.setHeader("HX-Reswap", "outerHTML");
        res.render("management/_teamsForm.html.twig", {
            error: e.errors,
            errorMulter: req.errorMulter,
        });
    }
};

const teamDelete = async (req, res) => {
    try {
        await clubsModel.updateOne(
            { teams: req.params.id },
            { $pull: { teams: req.params.id } },
        );
        const team = await teamsModel.findById(req.params.id);
        if (team.logo) {
            fs.unlink("public/images/teamsLogos/" + team.logo, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
        await teamsModel.deleteOne({ _id: req.params.id });
        res.status(200).send();
    } catch (e) {
        res.send(e);
    }
};

const getInlineTeamForm = async (req, res) => {
    try {
        const team = await teamsModel.findById(req.params.id);
        res.render("management/_teamFormInline.html.twig", {
            idTeam: req.params.id,
            team: team,
        });
    } catch (e) {
        console.log(e);
    }
};

const getInlineTeam = async (req, res) => {
    try {
        const team = await teamsModel.findById(req.params.id);
        res.render("management/_teamListElmt.html.twig", { team: team });
    } catch (e) {
        console.log(e);
    }
};

const teamEdit = async (req, res) => {
    try {
        const team = await teamsModel.findById(req.params.id);
        const data = req.body;
        console.log(req.file);
        if (req.file) {
            if (req.errorMulter) {
                throw new Error();
            } else {
                data.logo = req.file.filename;
                fs.unlink("public/images/teamsLogos/" + team.logo, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        }
        await teamsModel.updateOne({ _id: req.params.id }, data);
        res.render("management/_teamListElmt.html.twig", {
            team: await teamsModel.findById(req.params.id),
        });
    } catch (e) {
        fs.unlink("public/images/teamsLogos/" + req.file.filename, (err) => {
            if (err) {
                console.log(err);
            }
        });
        res.render("management/_teamFormInline.html.twig", {
            idTeam: req.params.id,
            team: team,
            error: e.errors,
            errorMulter: e.errorMulter,
        });
        console.log(e);
    }
};

module.exports = {
    teamSet,
    teamDelete,
    getInlineTeamForm,
    getInlineTeam,
    teamEdit,
};
