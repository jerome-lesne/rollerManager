const mongoose = require("mongoose");

const teamsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Le nom de l'équipe est requis"],
    },
    logo: {
        type: String,
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "members",
        },
    ],
});

const teamsModel = mongoose.model("teams", teamsSchema);

module.exports = teamsModel;
