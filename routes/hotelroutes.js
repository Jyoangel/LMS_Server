const express = require('express');
const router = express.Router();
const Hotel = require('../Models/Hotel'); // Adjust the path as necessary

const getHotelCountByUserId = async (userId) => {
    return await Hotel.countDocuments({ userId }); // Count documents that match userId
};
// Add a new hotel
router.post('/add', async (req, res) => {
    try {
        const hotel = new Hotel(req.body);
        await hotel.save();
        res.status(201).send(hotel);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all hotels
router.get('/get', async (req, res) => {
    const { userId } = req.query; // Get userId from query parameters

    try {
        // Find hotels based on userId
        const hotels = await Hotel.find({ userId }); // Assuming Hotel schema has a userId field
        const count = await getHotelCountByUserId(userId); // Get count specific to userId

        res.status(200).send({ hotels, count });
    } catch (error) {
        console.error("Error fetching hotels:", error); // Log the error for debugging
        res.status(500).send({ message: 'Database error', error: error.message }); // Include error message
    }
});


// Get a hotel by ID
router.get('/get/:id', async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).send();
        }
        res.status(200).send(hotel);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a hotel by ID
router.put('/update/:id', async (req, res) => {
    try {
        const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!hotel) {
            return res.status(404).send();
        }
        res.status(200).send(hotel);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a hotel by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const hotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!hotel) {
            return res.status(404).send();
        }
        res.status(200).send(hotel);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get hotel data by studentID
router.get('/:studentID', async (req, res) => {
    const { studentID } = req.params;
    try {
        const hotelData = await Hotel.findOne({ studentID });
        if (!hotelData) {
            return res.status(404).json({ message: "Hotel data not found for the given studentID" });
        }
        res.status(200).json(hotelData);
    } catch (error) {
        res.status(500).json({ message: "Error fetching hotel data", error });
    }
});

// Update hotel data by studentID
router.put('/:studentID', async (req, res) => {
    const { studentID } = req.params;
    const updatedData = req.body; // Data to update
    try {
        const hotelData = await Hotel.findOneAndUpdate(
            { studentID },
            updatedData,
            { new: true, runValidators: true }
        );
        if (!hotelData) {
            return res.status(404).json({ message: "Hotel data not found for the given studentID" });
        }
        res.status(200).json(hotelData);
    } catch (error) {
        res.status(500).json({ message: "Error updating hotel data", error });
    }
});

// Delete hotel data by studentID
router.delete('/:studentID', async (req, res) => {
    const { studentID } = req.params;
    try {
        const hotelData = await Hotel.findOneAndDelete({ studentID });
        if (!hotelData) {
            return res.status(404).json({ message: "Hotel data not found for the given studentID" });
        }
        res.status(200).json({ message: "Hotel data deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting hotel data", error });
    }
});

module.exports = router;
