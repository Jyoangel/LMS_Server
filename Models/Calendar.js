const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calendarSchema = new Schema({
    type: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Calendar', calendarSchema);
