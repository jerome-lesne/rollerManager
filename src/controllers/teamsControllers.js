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
                    console.log(err);
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

module.exports = { teamSet };
