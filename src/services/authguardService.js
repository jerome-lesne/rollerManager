const membersModel = require("../models/membersModel");

const authguard = async (req, res, next) => {
    try {
        if (req.session.memberId) {
            let member = await membersModel.findOne({
                _id: req.session.memberId,
            });
            if (member) {
                return next();
            }
        }
        throw new Error("member not connected");
    } catch (e) {
        console.log(e.message);
        res.status(401).render("login/index.html.twig");
    }
};

module.exports = authguard;
