const mongoose = require('mongoose');
require('dotenv').config();

const URI = process.env.MONGODB_URI;

// In-memory connection cache
const connectionCache = {};

const connectDB = async (dbName) => {
    try {
        // Check if a connection to this database already exists in the cache
        if (connectionCache[dbName] && connectionCache[dbName].readyState === 1) {
            console.log(`Using existing connection to database: ${dbName}`);
            return connectionCache[dbName];
        }

        // If a connection exists but to a different DB, we disconnect first
        if (mongoose.connection.readyState === 1 && mongoose.connection.name !== dbName) {
            console.log(`Disconnecting from current database: ${mongoose.connection.name}`);
            await mongoose.disconnect();
        }

        // Establish a new connection and store it in the cache
        const connection = await mongoose.createConnection(URI, { dbName });
        connectionCache[dbName] = connection;

        console.log(`Connected to database: ${dbName}`);
        return connection;
    } catch (error) {
        console.error(`Failed to connect to database: ${dbName}`);
        console.error('Error:', error);
        throw error;
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
