const mongoose = require("mongoose");

const membersSchema = new mongoose.Schema({
    pronoun: {
        type: String,
        required: [true, "Champ requis"],
    },
    name: {
        type: String,
        required: [true, "Champ requis"],
    },
    firstName: {
        type: String,
        required: [true, "Champ requis"],
    },
    picture: {
        type: String,
    },
    derbyName: {
        type: String,
    },
    playerNumber: {
        type: String,
        validate: {
            validator: (v) => {
                return /^\d{1,4}$/g.test(v);
            },
            message: "Insérez un nombre de 1 à 4 chiffres maximum",
        },
    },
    acceptsMixedGender: {
        type: String,
    },
    phone: {
        type: String,
        required: [true, "Champ requis"],
        validate: {
            validator: (v) => {
                return /^0\d{9}$/g.test(v);
            },
            message:
                "Entrez un numéro de téléphone valide (10 chiffres commençant par 0)",
        },
    },
    mail: {
        type: String,
        required: [true, "Champ requis"],
        validate: {
            validator: (v) => {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/g.test(v);
            },
            message: "Svp insérez un Email valide",
        },
    },
    emergencyContactName: {
        type: String,
        required: [
            true,
            "Une personne à contacter en cas d'urgence est requise",
        ],
    },
    emergencyContactPhone: {
        type: String,
        required: [true, "Champ requis"],
        validate: {
            validator: (v) => {
                return /^0\d{9}$/g.test(v);
            },
            message:
                "Entrez un numéro de téléphone valide (10 chiffres commençant par 0)",
        },
    },
    medicalInfos: {
        type: String,
    },
    address: {
        type: String,
        required: [true, "Champ requis"],
    },
    zipCode: {
        type: String,
        required: [true, "Champ requis"],
    },
    city: {
        type: String,
        required: [true, "Champ requis"],
    },
    birthyday: {
        type: Date,
        required: [true, "Champ requis"],
    },
    birthplace: {
        type: String,
        required: [true, "Champ requis"],
    },
    medicalCertificat: {
        type: Date,
    },
    licenceNumber: {
        type: Number,
    },
    role: {
        type: Array,
    },
    coachedTeam: {
        type: String,
    },
    theoreticalMS: {
        type: Date,
    },
    practicalMS: {
        type: Date,
    },
});

const membersModel = mongoose.model("members", membersSchema);
module.exports = membersModel;
