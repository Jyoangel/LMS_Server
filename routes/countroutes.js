const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const StudentDetail = require('../Models/StudentDetails');
const Teacher = require('../Models/TeacherDetails');
const Staff = require('../Models/StaffDetails');
const Attendance = require('../Models/Attendance')
const ReportCard = require('../Models/Reportcard');
const Homework = require('../Models/HomeWork');
// router.get('/count', async (req, res) => {
//     try {
//         const count = await StudentDetail.countDocuments();
//         const presentCount = await Attendance.countDocuments({ present: true });
//         const teacher = await Teacher.countDocuments();
//         const teacherpresent = await Teacher.countDocuments({ isPresent: true });
//         const staffCount = await Staff.countDocuments();
//         const staffpresentCount = await Staff.countDocuments({ isPresent: true });
//         res.status(200).json({ count, presentCount, teacher, teacherpresent, staffCount, staffpresentCount });
//     } catch (error) {
//         res.status(500).json(error);
//     }
// });


// route to get count data 
const moment = require('moment-timezone');

// GET request to count attendance and other metrics
router.get('/count', async (req, res) => {
    try {
        const userId = req.query.userId;  // Get userId from query parameters

        if (!userId) {
            return res.status(400).json({ message: 'userId query parameter is required' });
        }

        // Get the current date in IST (India Standard Time)
        const todayIST = moment.tz("Asia/Kolkata").format("YYYY-MM-DD");

        // Debug: Log today's IST date and userId
        console.log('Today\'s Date in IST:', todayIST);
        console.log('Fetching count for userId:', userId);

        // Count students present today based on userId
        const result = await Attendance.aggregate([
            {
                $match: { userId: userId } // Match documents by userId
            },
            {
                $unwind: "$dates" // Flatten the dates array
            },
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: [{ $dateToString: { format: "%Y-%m-%d", date: { $toDate: "$dates.date" } } }, todayIST] },
                            { $eq: ["$dates.present", true] }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: null, // Grouping by null to get a single result
                    presentCount: { $sum: 1 } // Counting present students
                }
            }
        ]);

        // Extract presentCount from the result
        const presentCount = result.length > 0 ? result[0].presentCount : 0;

        // Count teachers present today based on userId
        const teacherPresentCount = await Teacher.countDocuments({
            userId: userId,  // Filter by userId
            isPresent: true,
            'attendance.date': todayIST
        });

        // Count staff present today based on userId
        const staffPresentCount = await Staff.countDocuments({
            userId: userId,  // Filter by userId
            isPresent: true,
            'attendance.date': todayIST
        });

        // Fetch report cards based on userId
        const reportCards = await ReportCard.find({ userId: userId });

        // Initialize counters for struggling and excellence students
        let excellenceCount = 0;
        let strugglingCount = 0;

        // Iterate through the report cards and count based on percentage
        reportCards.forEach(reportCard => {
            const percentage = reportCard.percentage;

            if (percentage > 85) {
                excellenceCount++;
            } else if (percentage < 60) {
                strugglingCount++;
            }
        });

        // Total counts for students, teachers, and staff based on userId
        const count = await StudentDetail.countDocuments({ userId: userId });
        const teacherCount = await Teacher.countDocuments({ userId: userId });
        const staffCount = await Staff.countDocuments({ userId: userId });
        const homeworkCount = await Homework.countDocuments({ userId: userId });

        // Respond with the updated counts
        res.status(200).json({
            count,
            presentCount,
            teacherCount,
            teacherPresentCount,
            staffCount,
            staffPresentCount,
            excellenceCount,
            strugglingCount,
            homeworkCount
        });
    } catch (error) {
        console.error("Error fetching counts:", error);
        res.status(500).json({ message: error.message });
    }
});



// Route to get all students, teachers, and staff using userId
router.get('/all', async (req, res) => {
    try {
        const { userId } = req.query; // Extract userId from query parameters

        if (!userId) {
            return res.status(400).json({ message: 'userId is required' });
        }

        // Use Promise.all to fetch all data filtered by userId
        const [students, teachers, staff] = await Promise.all([
            StudentDetail.find({ userId: userId }),  // Fetch students by userId
            Teacher.find({ userId: userId }),        // Fetch teachers by userId
            Staff.find({ userId: userId })           // Fetch staff by userId
        ]);

        // Combine the results into a single object
        res.status(200).json({
            students,
            teachers,
            staff
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});


module.exports = router;

module.exports = router;