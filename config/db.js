const mongoose = require('mongoose');
require('dotenv').config();

const URI = process.env.MONGODB_URI;

const connectDB = async (dbName) => {
    const dbURI = `${URI}/${dbName}`; // Construct the database URI with the provided dbName

    try {
        await mongoose.connect(dbURI, {

        });
        console.log(`Connected to database: ${dbName}`);
    } catch (error) {
        console.error(`Failed to connect to database: ${dbName}`);
        console.error('Error:', error);
    }
}

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