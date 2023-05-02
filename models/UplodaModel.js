const { Schema, model } = require("mongoose");



const uploadSchema = new Schema({
    image: {
        type: String,
        required: [true, 'image field is required']
    }
})

const UploadImage = model('UploadImage', uploadSchema)
module.exports = UploadImage