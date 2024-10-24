const express = require('express');
const connectDB = require('./db'); // Adjust the path accordingly

const router = express.Router();

router.post('/create-database', async (req, res) => {
    let { dbName } = req.body;

    // Decode the dbName in case it's URL encoded (useful for query params)
    dbName = decodeURIComponent(dbName);

    console.log("Res", dbName); // Should log the decoded dbName

    if (!dbName) {
        return res.status(400).json({ error: 'Database name is required' });
    }

    try {
        await connectDB(dbName);
        res.status(200).json({ message: `Database ${dbName} connected successfully` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to connect to database', details: error.message });
    }
});


module.exports = router;
