const mongoose = require("mongoose");

const trainingsSchema = new mongoose.Schema({
    club: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "clubs",
        required: [true, "Le club est requis"],
    },
    place: {
        type: String,
        required: [true, "Le lieu est requis"],
    },
    start: {
        type: Date,
        required: [true, "La date et l'heure de début est requise"],
    },
    end: {
        type: Date,
        required: [true, "La date et l'heure de fin est requise"],
        validate: {
            validator: function (value) {
                return value > this.get("start");
            },
            message:
                "La date et l'heure de fin doivent être après la date et l'heure de début",
        },
    },
    allDay: {
        type: Boolean,
    },
    attendees: [
        {
            member: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "members",
            },
            coachedTeam: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "teams",
            },
        },
    ],
});

const trainingsModel = mongoose.model("trainings", trainingsSchema);
module.exports = trainingsModel;
