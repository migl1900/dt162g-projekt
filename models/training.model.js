const mongoose = require("mongoose");

// Create mongoose schema for training sessions
const Schema = mongoose.Schema;

const trainingSchema = new Schema( {
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
}, {
    timestamps: true,
});

const Training = mongoose.model("Training", trainingSchema);
module.exports = Training;