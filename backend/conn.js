const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        mongoose.connect('mongodb://localhost:27017/training-record-DB', { 
            //useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        console.log(`DB connected: ${mongoose.connection.host}`);
        console.log(mongoose.connection.client.s.options.host);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;
// Use the User model to perform CRUD operations