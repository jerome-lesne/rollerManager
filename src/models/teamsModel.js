const mongoose = require("mongoose");

const teamsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Le nom de l'équipe est requis"],
    },
    logo: {
        type: String,
    },
});

const teamsModel = mongoose.model("teams", teamsSchema);

module.exports = teamsModel;
