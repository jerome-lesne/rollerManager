const mongoose = require("mongoose");

const matchesSchema = new mongoose.Schema({
    start: {
        type: Date,
        required: [true, "La date et l'heure de début est requise"],
    },
    end: {
        type: Date,
        required: [true, "La date et l'heure de fin est requise"],
    },
    allDay: {
        type: Boolean,
    },
    matchType: {
        type: String,
        required: [true, "Le type de match est requis"],
    },
    opponent: {
        type: String,
        required: [true, "L'équipe adverse est requise"],
    },
    place: {
        type: String,
        required: [true, "Le lieu est requis"],
    },
    mapLink: {
        type: String,
    },
    registrationDeadline: {
        type: Date,
        required: [true, "Une date de fin d'enregistrement est requise"],
    },
    instructions: {
        type: String,
    },
    attendees: [
        {
            member: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "members",
            },
            matchRole: {
                type: String,
            },
        },
    ],
});

const matchesModel = mongoose.model("matches", matchesSchema);
module.exports = matchesModel;
