const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const URI = "mongodb+srv://ahmed:ahmed123@cluster0.i5myq.mongodb.net/?retryWrites=true&w=majority";
    //Docker
    // const DB_USER = 'root';
    // const DB_PASSWORD = 'example';
    // const DB_PORT = 27017
    // const DB_HOST = 'mongo'
    // const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB...');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    console.log('ERROR');
  }
};

module.exports = connectDB;
