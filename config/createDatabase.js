const express = require('express');
const connectDB = require('./db'); // Adjust the path accordingly

const router = express.Router();

router.post('/create-database', async (req, res) => {
    const { dbName } = req.body;

    if (!dbName) {
        return res.status(400).json({ error: 'Database name is required' });
    }

    try {
        await connectDB(dbName); // Connect to the new database
        res.status(200).json({ message: `Database ${dbName} created successfully` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create database', details: error.message });
    }
});

module.exports = router;
