const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransportationSchema = new Schema({
    studentID: {
        type: Schema.Types.ObjectId,
        ref: 'StudentDetail',
        required: true
    },
    pickupLocation: {
        type: String,
        required: true
    },
    dropLocation: {
        type: String,
        required: true
    },
    transportationFee: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Transportation', TransportationSchema);
