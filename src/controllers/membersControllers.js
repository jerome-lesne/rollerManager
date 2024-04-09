const memberModel = require("../models/membersModel");

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

module.exports = { memberSet };
