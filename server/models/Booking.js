const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    branchId: {
        type: String,
        required: true,
    },
    consoleId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'confirmed'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
