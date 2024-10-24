// routes/enquiryRoutes.js
const express = require('express');
const router = express.Router();
const Enquiry = require('../Models/Enquiry');

const getEnquiryCount = async () => {
    return await Enquiry.countDocuments();
};
// Add a new enquiry
router.post('/add', async (req, res) => {
    try {
        const enquiry = new Enquiry(req.body);
        await enquiry.save();
        res.status(201).json(enquiry);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all enquiries
// Get all enquiries for a specific user
router.get('/get', async (req, res) => {
    const { userId } = req.query; // Extract userId from query parameters

    try {
        // Validate that userId is provided
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Fetch enquiries based on userId
        const enquiries = await Enquiry.find({ userId });

        // Get the count of enquiries for the specific user
        const count = await Enquiry.countDocuments({ userId });

        res.status(200).json({ enquiries, count });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Get an enquiry by ID
router.get('/get/:id', async (req, res) => {
    try {
        const enquiry = await Enquiry.findById(req.params.id);
        if (!enquiry) {
            return res.status(404).json({ error: 'Enquiry not found' });
        }
        res.status(200).json(enquiry);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update an enquiry by ID
router.put('/update/:id', async (req, res) => {
    try {
        const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!enquiry) {
            return res.status(404).json({ error: 'Enquiry not found' });
        }
        res.status(200).json(enquiry);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete an enquiry by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
        if (!enquiry) {
            return res.status(404).json({ error: 'Enquiry not found' });
        }
        res.status(200).json({ message: 'Enquiry deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
