const mongoose = require("mongoose");

const teamsSchema = new mongoose.Schema({});

const teamModel = mongoose.model("teams", teamsSchema);
