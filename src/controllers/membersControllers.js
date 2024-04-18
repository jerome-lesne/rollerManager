const clubsModel = require("../models/clubsModel");
const memberModel = require("../models/membersModel");
const trialAttendeesModel = require("../models/trialAttendeesModel");
const crypto = require("crypto");
const sendMail = require("../services/mailerService");
require("dotenv").config();

const memberSet = async (req, res) => {
    try {
        if (req.headers["hx-trigger-name"]) {
            if (Object.values(req.body)[0] == "") {
                res.send();
            } else if (req.headers["hx-trigger-name"] == "confirmPassword") {
                if (req.body.password == req.body.confirmPassword) {
                    res.send();
                } else {
                    res.send("Les mots de passes ne correspondent pas");
                }
            } else if (
                memberModel.schema.path(req.headers["hx-trigger-name"])
            ) {
                memberModel.schema
                    .path(req.headers["hx-trigger-name"])
                    .doValidate(Object.values(req.body)[0], (e) => {
                        if (e) {
                            res.status(200).send(e.message);
                        } else {
                            res.send();
                        }
                    });
            }
        } else {
            const attendee = await trialAttendeesModel.findOne({
                subToken: req.body.token,
            });

            if (!attendee) {
                throw {
                    wrongToken: "wrong token",
                };
            }

            if (req.body.password == req.body.confirmPassword) {
                const member = new memberModel(req.body);
                member.validateSync();
                await member.save();
                res.status(200).render("subscribe/index.html.twig", {
                    sentSuccess: true,
                });
            } else {
                throw {
                    confirmPassword: "Les mots de passes ne correspondent pas",
                };
            }
        }
    } catch (e) {
        res.render("subscribe/index.html.twig", {
            error: e,
            token: req.body.token,
        });
    }
};

const trialAttendeeSet = async (req, res) => {
    try {
        const trialAttendee = new trialAttendeesModel(req.body);
        trialAttendee.validateSync();
        await trialAttendee.save();
        await clubsModel.updateOne(
            { _id: "66168500208d28d672b5efed" }, // A MODIFIER AVEC LA SESSION
            { $push: { trialAttendees: trialAttendee.id } },
        );
        res.render("try/index.html.twig", {
            sentSuccess: true,
        });
    } catch (e) {
        res.render("try/index.html.twig", {
            error: e,
        });
    }
};

const trialAttendeeDelete = async (req, res) => {
    try {
        const clubId = "66168500208d28d672b5efed"; // A MODIFIER REQ SESSION (findOne())
        if (clubId) {
            await clubsModel.updateOne(
                { trialAttendees: req.params.id },
                { $pull: { trialAttendees: req.params.id } },
            );
            await trialAttendeesModel.deleteOne({ _id: req.params.id });
            res.send();
        } else {
            res.json("club not found");
        }
    } catch (e) {
        res.json(e);
    }
};

const generateSubLink = async (req, res) => {
    try {
        const attendee = await trialAttendeesModel.findById(req.params.id);
        if (!attendee.subToken) {
            const token = crypto.randomBytes(32).toString("hex");
            const link =
                process.env.URL +
                ":" +
                process.env.PORT +
                "/subscribe/" +
                token;
            const mailContent = `<h1>Vous trouverez ci-dessous le lien pour vous inscrire au club de Roller Derby d'Aix en Provence :</h1><p>${link}</p>`;
            await trialAttendeesModel.updateOne(
                { _id: req.params.id },
                { subToken: token },
            );
            await sendMail(
                attendee.mail,
                "Votre lien d'inscription",
                mailContent,
            );
            res.status(200);
        } else {
            res.status(200);
        }
    } catch (e) {
        res.json(e);
    }
};

// const clubSet = async (req, res) => {
//     try {
//         const member = new clubsModel(req.body);
//         member.validateSync();
//         await member.save();
//         res.send("New club saved");
//     } catch (e) {
//         res.json(e);
//     }
// };

module.exports = {
    memberSet,
    trialAttendeeSet,
    trialAttendeeDelete,
    generateSubLink,
};
