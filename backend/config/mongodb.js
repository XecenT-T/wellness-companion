const mongoose = require("mongoose");
const config = require("./config.js");

const connectDb = async () => {
    try {
        if (!config.database.connectionString) {
            console.error("MongoDB connection string is missing. Please check your .env file.");
            process.exit(1);
        }
        const connect = await mongoose.connect(config.database.connectionString);
        console.log("Database connected:", connect.connection.host, connect.connection.name);
    } catch (err) {
        console.error("Database connection failed:", err);
        process.exit(1);
    }
};

module.exports = connectDb;