const express = require('express');

const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
const fileUpload = require('express-fileupload');
app.use(
  fileUpload({
    useTempFiles: true,        // ✅ required if you want file.tempFilePath
    tempFileDir: "/tmp/",      // ✅ temporary folder for uploads
  })
);


// CONNECT TO DATABASE
const connectDB = require('./Config/database');
connectDB();
// CONNECT TO CLOUDINARY
const cloudinary = require('./Config/cloudinary');


// ROUTES
const FileUpload = require('./Routes/FileUpload');

app.use('/api/v1',FileUpload);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);

})
