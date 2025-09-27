const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log('✅ Database connected');
  } catch (err) {
    console.error('❌ Database connection error:', err);
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = connectDB;
