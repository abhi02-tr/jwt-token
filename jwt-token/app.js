require("dotenv").config();
require("./config/db").connect();

// routes
const userRouter = require("./routes/user.route.js");
const auth = require("./middleware/auth");

const express = require("express");

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// routes
app.use("/api/user", userRouter);
app.get("/api/welcome", auth, (req, res) => {
    return res.status(200).json({message: "Welcome to page.."});
});


module.exports = app;