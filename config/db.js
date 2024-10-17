


const mongoose = require('mongoose');
require('dotenv').config();

const URI = process.env.MONGODB_URI;

let isConnected; // Track connection status

const connectDB = async (dbName) => {
    try {
        // Check if already connected to the desired database
        if (isConnected && mongoose.connection.name === dbName) {
            console.log(`Already connected to database: ${dbName}`);
            return;
        }

        // If connected to a different DB, disconnect first
        if (isConnected) {
            console.log(`Disconnecting from current database: ${mongoose.connection.name}`);
            await mongoose.disconnect();
        }

        // Establish a new connection
        await mongoose.connect(URI, {
            dbName
        });
        isConnected = true; // Set connection status to true
        console.log(`Connected to database: ${dbName}`);

        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
            isConnected = false; // Set connection status to false on error
        });

        mongoose.connection.on('disconnected', () => {
            console.log(`Disconnected from database: ${dbName}`);
            isConnected = false; // Update connection status
        });
    } catch (error) {
        console.error(`Failed to connect to database: ${dbName}`);
        console.error('Error:', error);
        isConnected = false; // Update connection status on error
    }
};

module.exports = connectDB;




// const mongoose = require('mongoose');
// require('dotenv').config();

// const URI = process.env.MONGODB_URI;

// const connectDB = async (dbName) => {
//     const dbURI = `${URI}/${dbName}`; // Construct the database URI with the provided dbName

//     try {
//         await mongoose.connect(dbURI, {

//         });
//         console.log(`Connected to database: ${dbName}`);
//     } catch (error) {
//         console.error(`Failed to connect to database: ${dbName}`);
//         console.error('Error:', error);
//     }
// }

module.exports = connectDB;

// const mongoose = require('mongoose');
// require('dotenv').config();

// const URI = process.env.MONGODB_URI

// const connectDB = async () => {

//     try {
//         await mongoose.connect(URI);
//         console.log('Connected to database');
//     } catch (error) {
//         console.error("database is  not connected successfully")
//         handleError(error);
//     }


// }
// module.exports = connectDB;
