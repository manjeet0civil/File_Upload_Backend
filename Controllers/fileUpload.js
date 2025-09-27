const express = require('express');
const user = require('../Models/user');
const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload');

exports.uploadFile = async (req, res) => {
    try{

        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(400).json({success: false, message: "No file uploaded"});
        }

        const file=req.files.file;
        console.log(file);

        if(!file){
            return res.status(400).json({success: false, message: "No file uploaded"});
        }

        const path= __dirname + "/files/" +Date.now() + `.${file.name.split('.')[1]}`;
        console.log(path);
        
        await file.mv(path)
            

            res.status(200).json({
                success: true,
                message: "File uploaded successfully", });

    }catch(err){
        console.log("File upload error", err);
        res.status(500).json({
                 success: false,
            message: "File upload failed", error: err.message});
    }
}

// upload file in cloudinary


async function UploadtoCloudinary(file){

    const options={folder:"manjeet",use_filename: true, resource_type: "auto"};
    console.log(" options ke andar "+ options);

    

    

    const result= await cloudinary.uploader.upload(file.tempFilePath,options)
    console.log("cloudinary result "+ file.tempFilePath);
    return result;

}

exports.uploadImagefile = async (req, res) => {
    try{

        const {name,email,tag}= req.body;
        if(!name || !email || !tag){
            return res.status(400).json({success: false, message: "Please provide all details"});
        }

        const file=req.files.file;
        console.log(file);

        if(!file){
            return res.status(400).json({success: false, message: "No file uploaded"});
        }
        
        const supportedFormats = ['jpg', 'jpeg', 'png', 'gif'];

        const type= file.name.split('.')[1].toLowerCase();
        console.log( "filetype "+ type);

        if(!supportedFormats.includes(type)){
            return res.status(400).json({success: false, message: "File format not supported"});
        }

       const result= await UploadtoCloudinary(file);

        const newUser= new user({name, email, tag, imageUrl: result.secure_url});
        await newUser.save();
    
            res.status(200).json({
                success: true,
                message: "File uploaded to cloudinary successfully", 
                imageUrl: result.secure_url,
                user: newUser
            });

    }catch(err){
        console.log("Cloudinary upload error", err);
        res.status(500).json({
                 success: false,
            message: "Cloudinary upload failed", error: err.message});
    }
}

// upload video file in cloudinary size less then 5mb
exports.uploadVideofile = async (req, res) => {
    try{

        const {name,email,tag}= req.body;
        if(!name || !email || !tag){
            return res.status(400).json({success: false, message: "Please provide all details"});
        }

        const file=req.files.file;
        console.log(file);

        if(!file){
            return res.status(400).json({success: false, message: "No file uploaded"});
        }
        
        const supportedFormats = ['mp4', 'mov', 'gif'];

        const type= file.name.split('.')[1].toLowerCase();
        console.log( "filetype "+ type);

        if(!supportedFormats.includes(type)){
            return res.status(400).json({success: false, message: "File format not supported"});
        }

       const result= await UploadtoCloudinary(file);

        const newUser= new user({name, email, tag, imageUrl: result.secure_url});
        await newUser.save();
    
            res.status(200).json({
                success: true,
                message: "File uploaded to cloudinary successfully", 
                imageUrl: result.secure_url,
                user: newUser
            });

    }catch(err){
        console.log("Cloudinary upload error", err);
        res.status(500).json({
                 success: false,
            message: "Cloudinary upload failed", error: err.message});
    }
}