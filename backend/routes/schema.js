const mongoose = require("mongoose");

// Create database schema using mongoose based on MongoDB collection
var nameSchema = new mongoose.Schema({
    TWITTER_CONSUMER_API_KEY: { type: String, required: true },
    TWITTER_CONSUMER_API_SECRET: { type: String, required: true },
    TWITTER_ACCESS_TOKEN: { type: String, required: true },
    TWITTER_ACCESS_SECRET: { type: String, required: true }
});

module.exports = mongoose.model("credentials", nameSchema);