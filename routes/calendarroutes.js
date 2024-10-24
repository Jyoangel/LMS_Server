const express = require('express');
const router = express.Router();
const Calendar = require('../Models/Calendar');


// Add new calendar event
router.post('/add', async (req, res) => {
    const { userId, type, title, date, startTime, endTime, duration, description } = req.body;
    try {
        // Validate that userId is present
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Create a new calendar event with userId
        const newEvent = new Calendar({ userId, type, title, date, startTime, endTime, duration, description });
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Get all calendar events
// Get all calendar events for a specific user
router.get('/get', async (req, res) => {
    const { userId } = req.query;
    try {
        // Validate that userId is present
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Find calendar events for the specific user
        const events = await Calendar.find({ userId });
        res.status(200).json(events);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Get calendar event by ID
router.get('/get/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Calendar.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update calendar event by ID
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { type, title, date, startTime, endTime, duration } = req.body;
    try {
        const updatedEvent = await Calendar.findByIdAndUpdate(
            id,
            { type, title, date, startTime, endTime, duration },
            { new: true, runValidators: true }
        );
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete calendar event by ID
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedEvent = await Calendar.findByIdAndDelete(id);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
