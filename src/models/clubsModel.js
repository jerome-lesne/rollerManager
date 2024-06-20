const mongoose = require("mongoose");

const clubsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "club's name is required"],
    },
    matchRoles: {
        type: Array,
    },
    teams: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "teams",
        },
    ],
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "members",
        },
    ],
    trialAttendees: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "trialAttendees",
        },
    ],
    roles: {
        type: Array,
    },
});

const clubsModel = mongoose.model("clubs", clubsSchema);
module.exports = clubsModel;
