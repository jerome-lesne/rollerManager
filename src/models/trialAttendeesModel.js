const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const trialAttendeesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Champ obligatoire"],
    },
    firstName: {
        type: String,
        required: [true, "Champ obligatoire"],
    },
    mail: {
        type: String,
        required: [true, "Champ obligatoire"],
        validate: {
            validator: (v) => {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/g.test(v);
            },
            message: "Svp insérez un Email valide",
        },
    },
    phone: {
        type: String,
        required: [true, "Champ obligatoire"],
        validate: {
            validator: (v) => {
                return /^0\d{9}$/g.test(v);
            },
            message:
                "Entrez un numéro de téléphone valide (10 chiffres commençant par 0)",
        },
    },
    age: {
        type: Number,
        required: [true, "Champ obligatoire"],
        validate: {
            validator: (v) => {
                return /\b(?:[1-9]|[1-9][0-9])\b/g.test(v);
            },
            message: "Entrez un age valide",
        },
    },
    shoeSize: {
        type: Number,
        required: [true, "Champ obligatoire"],
        validate: {
            validator: (v) => {
                return /\b(?:3[0-9]|4[0-9]|50)\b/g.test(v);
            },
            message: "Entrez une pointure valide",
        },
    },
    subToken: {
        type: String,
    },
});

const trialAttendeesModel = mongoose.model(
    "trialAttendees",
    trialAttendeesSchema,
);

module.exports = trialAttendeesModel;
