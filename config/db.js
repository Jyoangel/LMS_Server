const mongoose = require('mongoose');
require('dotenv').config();

const URI = process.env.MONGODB_URI

const connectDB = async () => {

    try {
        await mongoose.connect(URI);
        console.log('Connected to database');
    } catch (error) {
        console.error("database is  not connected successfully")
        handleError(error);
    }


}
module.exports = connectDB;