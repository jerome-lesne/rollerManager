const mongoose = require("mongoose");

const matchesSchema = new mongoose.Schema({
    club: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "clubs",
        required: [true, "Le club est requis"],
    },
    start: {
        type: Date,
        required: [true, "La date et l'heure de début est requise"],
    },
    end: {
        type: Date,
        required: [true, "La date et l'heure de fin est requise"],
        validate: {
            validator: function(value) {
                return value > this.start;
            },
            message:
                "La date et l'heure de fin doivent être après la date et l'heure de début",
        },
    },
    allDay: {
        type: Boolean,
    },
    matchType: {
        type: String,
        required: [true, "Le type de match est requis"],
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teams",
        required: [true, "Veuillez spécifier une équipe"],
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
        type: mongoose.Schema.Types.Mixed,
        required: [true, "Un lien google map est requis"],
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
                type: Array,
            },
        },
    ],
});

const matchesModel = mongoose.model("matches", matchesSchema);
module.exports = matchesModel;
