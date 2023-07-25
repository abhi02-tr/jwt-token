const mongoose = require("mongoose");

const { MONGO_URI } =    process.env;

exports.connect = () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useunifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log("Connected to database.");
    })
    .catch((err) => {
        console.log("db connection failed..");
        console.error(err);
        process.exit(1);
    });
}