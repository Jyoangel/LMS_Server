const mongoose = require('mongoose');
require('dotenv').config();

const URI = process.env.MONGODB_URI;

const connectDB = async (dbName) => {
    try {
        
        // If already connected to the desired database, skip reconnection
        if (mongoose.connection.readyState === 1 && mongoose.connection.name === dbName) {
            console.log(`Already connected to database: ${dbName}`);
            return;
        }

        // If a connection exists but to a different DB, disconnect first
        if (mongoose.connection.readyState === 1 && mongoose.connection.name !== dbName) {
            console.log(`Disconnecting from current database: ${mongoose.connection.name}`);
            await mongoose.disconnect();
        }

        // Establish a new connection
        await mongoose.connect(URI, { dbName });
        console.log(`Connected to database: ${dbName}`);
    } catch (error) {
        console.error(`Failed to connect to database: ${dbName}`);
        console.error('Error:', error);
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
