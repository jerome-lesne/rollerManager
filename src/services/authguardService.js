const membersModel = require("../models/membersModel");

const authguard = (role = undefined) => {
    return async (req, res, next) => {
        try {
            if (req.session.memberId) {
                let member = await membersModel.findOne({
                    _id: req.session.memberId,
                });
                if (member) {
                    if (!role) {
                        return next();
                    } else if (member.role.includes(role)) {
                        return next();
                    }
                }
            }
            throw new Error("no access granted");
        } catch (e) {
            console.log(e.message);
            res.status(401).redirect("/");
        }
    };
};

module.exports = authguard;
