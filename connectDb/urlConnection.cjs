const mongoose = require('mongoose');

async function connectMongodb (url){
    try {
        const conn = await mongoose.connect(url);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit the process on failure
    }
};

module.exports = connectMongodb;
