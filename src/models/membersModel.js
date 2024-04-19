const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
        required: [true, "Champ requis"],
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
        validate: [
            {
                validator: (v) => {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/g.test(v);
                },
                message: "Svp insérez un Email valide",
            },
            {
                validator: async function (v) {
                    const membersModel = mongoose.model("members");
                    const duplicatedMember = await membersModel.findOne({
                        mail: v,
                    });
                    return !duplicatedMember;
                },
                message: "Cet Email est déjà enregistré",
            },
        ],
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
        validate: {
            validator: (v) => {
                return /^\d{5}$/g.test(v);
            },
            message: "Entrez un code postale valide (5 chiffres)",
        },
    },
    city: {
        type: String,
        required: [true, "Champ requis"],
    },
    birthday: {
        type: Date,
        required: [true, "Champ requis"],
    },
    birthplace: {
        type: String,
        required: [true, "Champ requis"],
    },
    password: {
        type: String,
        required: [true, "Champ requis"],
        validate: {
            validator: (v) => {
                return /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/g.test(v);
            },
            message: "Ce mot de passe n'est pas valide",
        },
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

membersSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    bcrypt.hash(this.password, 10, (error, hash) => {
        if (error) {
            return next(error);
        }
        this.password = hash;
        next();
    });
});

const membersModel = mongoose.model("members", membersSchema);
module.exports = membersModel;
