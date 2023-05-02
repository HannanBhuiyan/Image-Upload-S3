const express = require("express");
const app = express();
const port  = 8080;
const AWS = require('aws-sdk');
const db_url = 'mongodb://127.0.0.1:27017/s3imageupload';
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const multerS3 = require('multer-s3');
const fileupload = require("express-fileupload");
const UploadImage = require("./models/UplodaModel");


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'))
app.use(fileupload())
 
mongoose.connect(db_url).then( () => console.log("Connected "));
 


app.post('/upload', async (req, res) => {

    AWS.config.update({
        accessKeyId: "AKIA2OHOXSEUNSVD27P6",
        secretAccessKey: "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", 
    })
    const fileContent = Buffer.from(req.files.data.data, 'binary')
    const params = {
        Bucket: "beige-asset",
        Key: "profile/"+req.files.data.name,
        Body: fileContent,
        ContentType: 'image/jpeg',
    }
    const s3 = new AWS.S3()
      s3.upload(params, async (error, data) => {
        if(error){
            throw error 
        }
        const newImage = new UploadImage({
            image: data.key
        })
        await newImage.save();
        res.status(201).send("image upload success")
    })

})
 

 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})