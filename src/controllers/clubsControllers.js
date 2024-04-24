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

module.exports = { addMatchRole };
