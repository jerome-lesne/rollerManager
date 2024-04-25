const clubsModel = require("../models/clubsModel");

const addMatchRole = async (req, res) => {
    try {
        await clubsModel.findOneAndUpdate(
            { members: req.session.memberId },
            { $addToSet: { matchRoles: req.body.name } },
            { new: true },
        );
        res.render("management/_matchRolesListElmt.html.twig", {
            matchRole: req.body.name,
        });
    } catch (e) {
        res.send(e);
    }
};

const deleteMatchRole = async (req, res) => {
    try {
        await clubsModel.findOneAndUpdate(
            { members: req.session.memberId },
            { $pull: { matchRoles: req.params.role } },
            { new: true },
        );
        res.status(200).send();
    } catch (e) {
        res.send(e);
    }
};

module.exports = { addMatchRole, deleteMatchRole };
