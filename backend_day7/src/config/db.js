const mongoose = require("mongoose");

const connectDb = async ()=> {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("db has been connected")
    } catch (error) {
        console.log("db uri has been not found",error)
    }
};

module.exports = connectDb;