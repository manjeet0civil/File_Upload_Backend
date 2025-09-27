const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Initialize cloudinary configuration
try {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Verify configuration
    if (!process.env.CLOUDINARY_CLOUD_NAME || 
        !process.env.CLOUDINARY_API_KEY || 
        !process.env.CLOUDINARY_API_SECRET) {
        throw new Error("Missing required Cloudinary configuration variables");
    }
} catch (err) {
    console.error("Cloudinary configuration error:", err.message);
    process.exit(1); // Exit if configuration fails
}

module.exports = cloudinary;