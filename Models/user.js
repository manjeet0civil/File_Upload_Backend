const moonoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();
const userSchema = new moonoose.Schema({
    name:{
        type: String,
    },
    imageUrl:{
        type: String,
    },
    tag:{
        type: String,
    },
    email:{
        type: String,
    }
}); 

// all node mailer post and pre requrest writen brefore export

//post middleware

userSchema.post("save", async function(doc) {
    try{
        console.log("after saving in db", doc);
        // create a transporter for sending mail
        let transporter = nodemailer.createTransport({
            host: process.env.USER_HOST,
            // port: process.env.USER_PORT ||2525,
            auth: {
                user: process.env.USER_NAME,
                pass: process.env.USER_PASS
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from:`"try Hard" <manjeet@test-2p0347z2yp7lzdrn.mlsender.net>`, // sender address
            to: doc.email,
            subject: "File Uploaded Successfully",
            text: `Your file is uploaded successfully. Your file tag is ${doc.tag} and file url is ${doc.imageUrl}`,
            html: `<b>Your file is uploaded successfully. Your file tag is ${doc.tag} and file url is ${doc.imageUrl}</b>`,
        });
        console.log("Message sent: %s", info);
        console.log("message sent successfully"); ;

    }
    catch(err){
        console.log(err);
        console.log("error in mail sending");
    }
    
})

module.exports = moonoose.model('user', userSchema);