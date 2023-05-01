const express = require("express");
const app = express();
const port  = 8080;
const AWS = require('aws-sdk');
const fileUpload = require("express-fileupload");

app.use(fileUpload())

const BUCKET= "beige-asset";
const s3 = new AWS.S3({httpOptions: {timeout: 1800000}})

app.get('/list', (req, res) => {
    s3.listObjects({ Bucket: BUCKET })
        .promise()
        .then(data => {
            console.log(data)
            const currentUrl = `https://s3.aws.amazon.com/${BUCKET}/`;
            const urlArray = data.Contents.map(e => currentUrl + e.Key)
            console.log(urlArray)
        })
        .catch(error => {
            console.log(error)
        })
             

})



app.post('/upload', async (req, res) => {
    AWS.config.update({
        accessKeyId: "AKIA2OHOXSEUNSVD27P6",
        secretAccessKey: "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", 
    })

   

    const fileContent = Buffer.from(req.files.data.data, 'binary')


    const params = {
        Bucket: "beige-asset",
        Key: req.files.data.name,
        Body: fileContent 
    }

    s3.upload(params, (error, data) => {
        if(error){
            throw error
        }

        res.send({
            "success" : "File upload success"
        })
    })


})
 

 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})