const clubsModel = require("../models/clubsModel");
const trialAttendeesModel = require("../models/trialAttendeesModel");
const crypto = require("crypto");
const sendMail = require("../services/mailerService");
require("dotenv").config();
const fs = require("fs");
const bcrypt = require("bcrypt");
const membersModel = require("../models/membersModel");

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
                membersModel.schema.path(req.headers["hx-trigger-name"])
            ) {
                membersModel.schema
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
                const club = await clubsModel.findOne({
                    trialAttendees: attendee.id,
                });
                const member = new membersModel(req.body);
                if (req.file) {
                    member.picture = req.file.filename;
                }
                member.validateSync();
                await member.save();
                await clubsModel.updateOne(
                    { _id: club.id },
                    { $push: { members: member.id } },
                );
                await clubsModel.updateOne(
                    { trialAttendees: attendee.id },
                    { $pull: { trialAttendees: attendee.id } },
                );
                await trialAttendeesModel.deleteOne({ _id: attendee.id });
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
        if (req.file) {
            fs.unlink(
                "public/images/idPictures/" + req.file.filename,
                (err) => {
                    console.log(err);
                },
            );
        }
        res.render("subscribe/index.html.twig", {
            errorMulter: req.errorMulter,
            error: e,
            token: req.body.token,
            val: req.body,
        });
    }
};

const memberConnect = async (req, res) => {
    try {
        const member = await membersModel.findOne({ mail: req.body.mail });
        if (member) {
            if (await bcrypt.compare(req.body.password, member.password)) {
                req.session.memberId = member.id;
                res.redirect("/dashboard");
            } else {
                throw { password: "Wrong password" };
            }
        } else {
            throw { mail: "email not found" };
        }
    } catch (e) {
        res.render("login/index.html.twig", {
            error: e,
        });
    }
};

const memberDisconnect = async (req, res) => {
    try {
        req.session.destroy();
        res.redirect("/login");
    } catch (e) {
        res.json(e);
    }
};

const trialAttendeeSet = async (req, res) => {
    try {
        const trialAttendee = new trialAttendeesModel(req.body);
        trialAttendee.validateSync();
        await trialAttendee.save();
        await clubsModel.updateOne(
            { _id: "66168500208d28d672b5efed" }, // A MODIFIER ?
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

const memberFormEdit = async (req, res) => {
    try {
        const club = await clubsModel
            .findOne({
                members: req.session.memberId,
            })
            .populate("teams");
        const member = await membersModel
            .findById(req.params.id)
            .populate("team");
        res.render("dashboard/_editMemberForm.html.twig", {
            club: club,
            member: member,
        });
    } catch (e) {
        res.json(e);
    }
};

const cancelMemberEdit = async (req, res) => {
    try {
        const member = await membersModel
            .findById(req.params.id)
            .populate("team");
        const connectedMember = await membersModel.findById(
            req.session.memberId,
        );
        res.render("dashboard/_memberListElmt.html.twig", {
            member: member,
            roles: connectedMember.role,
            unfolded: true,
        });
    } catch (e) {
        res.json(e);
    }
};

const editMember = async (req, res) => {
    try {
        const data = req.body;
        if (!data.acceptsMixedGender) {
            data.acceptsMixedGender = "off";
        }
        if (data.team == "no_team") {
            delete data.team;
            await membersModel.updateOne(
                { _id: req.params.id },
                { $unset: { team: "" } },
            );
        }
        if (data.role) {
            if (data.role == "no_role") {
                delete data.role;
                await membersModel.updateOne(
                    { _id: req.params.id },
                    { $unset: { role: "" } },
                );
            } else if (data.role.includes("no_role")) {
                data.role = data.role.filter((role) => role !== "no_role");
            }
        }

        console.log(data);
        await membersModel.updateOne({ _id: req.params.id }, data);
        const member = await membersModel
            .findById(req.params.id)
            .populate("team");
        const connectedMember = await membersModel.findById(
            req.session.memberId,
        );
        res.render("dashboard/_memberListElmt.html.twig", {
            member: member,
            roles: connectedMember.role,
            unfolded: true,
        });
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
    memberConnect,
    memberDisconnect,
    memberFormEdit,
    cancelMemberEdit,
    editMember,
};
