const express = require('express');
const connectDB = require('./db'); // Adjust the path accordingly

const router = express.Router();

router.post('/create-database', async (req, res) => {
    const { dbName } = req.body;
    console.log("Res", dbName);// Connect to the new database

    if (!dbName) {
        return res.status(400).json({ error: 'Database name is required' });
    }

    try {

        const response = await connectDB(dbName);
        console.log("Resss", response);// Connect to the new database
        res.status(200).json({ message: `Database ${dbName} created successfully` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create database', details: error.message });
    }
});

module.exports = router;

// const mongoose = require('mongoose'); // Require Mongoose at the top
// const express = require('express');
// const router = express.Router();
// const connectDB = require('./db'); // Assuming you have a separate connectDB function

// // POST route for creating and switching databases
// router.post('/create-database', async (req, res) => {
//     const { dbName } = req.body; // Get the dbName from the request body
//     console.log("Received dbName:", dbName);  // Log dbName for clarity

//     if (!dbName) {
//         console.log('No dbName provided.');
//         return res.status(400).json({ error: 'Database name is required' });
//     }

//     try {
//         // Disconnect the current (default) database connection if one exists
//         if (mongoose.connection.readyState === 1) { // 1 means connected
//             await mongoose.disconnect();
//             console.log(`Disconnected from current database: ${mongoose.connection.name}`);
//         }

//         // Connect to the new database using the provided dbName
//         await connectDB(dbName);
//         console.log(`Connected to new database: ${dbName}`);

//         res.status(200).json({ message: `Database ${dbName} created and connected successfully` });
//     } catch (error) {
//         console.error('Error occurred while connecting to database:', error.message);
//         res.status(500).json({ error: 'Failed to create database', details: error.message });
//     }
// });

// module.exports = router;


// const express = require('express');
// const connectDB = require('./db'); // Adjust the path accordingly

// const router = express.Router();

// router.post('/create-database', async (req, res) => {
//     const { dbName } = req.body;

//     if (!dbName) {
//         return res.status(400).json({ error: 'Database name is required' });
//     }

//     try {
//         await connectDB(dbName); // Connect to the new database
//         res.status(200).json({ message: `Database ${dbName} created successfully` });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to create database', details: error.message });
//     }
// });

// module.exports = router;
