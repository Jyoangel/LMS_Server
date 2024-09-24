const mongoose = require('mongoose');
const moment = require('moment-timezone');

// Function to get the current date in IST (Asia/Kolkata)
// const getCurrentDateIST = () => {
//     return moment.tz('Asia/Kolkata').toDate(); // Get current date as a Date object in IST
// };
const attendanceSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudentDetail',
        required: true
    },
    present: {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: Date,

    },
    dates: [{
        date: {
            type: Date,
            required: true
        },
        present: {
            type: Boolean,
            required: true
        }
    }]
});

// Define a static method to fetch attendance with populated student details
attendanceSchema.statics.findWithStudentDetails = async function (studentId = null) {
    const query = studentId ? { studentId: studentId } : {};
    return this.find(query).populate('studentId').exec();
};

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;



// const mongoose = require('mongoose');

// const attendanceSchema = new mongoose.Schema({
//     studentId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'StudentDetail',
//         required: true
//     },
//     present: {
//         type: Boolean,
//         required: true,
//         default: false
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     }
// });

// // Define a static method to fetch attendance with populated student details
// attendanceSchema.statics.findWithStudentDetails = async function (studentId = null) {
//     const query = studentId ? { studentId: studentId } : {};
//     return this.find(query).populate('studentId').exec();
// };


// const Attendance = mongoose.model('Attendance', attendanceSchema);

// module.exports = Attendance;
