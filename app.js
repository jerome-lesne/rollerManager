const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const pagesRouter = require("./src/routes/pagesRoutes");
const membersRouter = require("./src/routes/membersRoutes");
const teamsRouter = require("./src/routes/teamsRoutes");
const clubsRouter = require("./src/routes/clubsRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.secretKey,
        resave: true,
        saveUninitialized: true,
    }),
);

app.use(pagesRouter);
app.use(membersRouter);
app.use(teamsRouter);
app.use(clubsRouter);

app.listen(process.env.PORT, (e) => {
    if (e) {
        console.log(e);
    } else {
        console.log(`server connected on PORT: ${process.env.PORT}`);
    }
});

mongoose.connect(process.env.dbURI);
