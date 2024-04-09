const mongoose = require("mongoose");

const clubsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "club's name is required"],
    },
    matchRoles: {
        type: Array,
    },
    trainingRoles: {
        type: Array,
    },
});

const clubsModel = mongoose.model("clubs", clubsSchema);
module.exports = clubsModel;
